import invariant from 'invariant'
import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'
import activeElement from 'dom-helpers/activeElement'
import cn from 'classnames'
import deprecated from 'react-prop-types/lib/deprecated'
import uncontrollable from 'uncontrollable'

import Widget from './Widget'
import WidgetPicker from './WidgetPicker'
import Popup from './Popup'
import Button from './Button'
import BaseCalendar from './Calendar'
import DateTimePickerInput from './DateTimePickerInput'
import Select from './Select'
import TimeList from './TimeList'
import { getMessages } from './messages'

import * as Props from './util/Props'
import * as CustomPropTypes from './util/PropTypes'
import focusManager from './util/focusManager'
import scrollManager from './util/scrollManager'
import withRightToLeft from './util/withRightToLeft'
import { widgetEditable } from './util/interaction'
import dates from './util/dates'
import { date as dateLocalizer } from './util/localizers'
import { calendarViews as views, datePopups as popups } from './util/constants'
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers'


let viewEnum = Object.keys(views).map(k => views[k])

let NEXT_VIEW = {
  [popups.DATE]: popups.TIME,
  [popups.TIME]: popups.DATE,
}

let isBothOrNeither = (a, b) => (a && b) || (!a && !b)

let propTypes = {
  //-- controlled props -----------
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func,
  open: PropTypes.oneOf([false, popups.TIME, popups.DATE]),
  onToggle: PropTypes.func,
  currentDate: PropTypes.instanceOf(Date),
  onCurrentDateChange: PropTypes.func,

  //------------------------------------

  onSelect: PropTypes.func,

  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  step: PropTypes.number,

  culture: PropTypes.string,

  format: CustomPropTypes.dateFormat,
  timeFormat: CustomPropTypes.dateFormat,
  editFormat: CustomPropTypes.dateFormat,

  date: PropTypes.bool,
  time: PropTypes.bool,
  calendar: deprecated(PropTypes.bool, 'Use `date` instead'),

  timeComponent: CustomPropTypes.elementType,

  dropUp: PropTypes.bool,
  popupTransition: CustomPropTypes.elementType,

  placeholder: PropTypes.string,
  name: PropTypes.string,

  initialView: PropTypes.oneOf(viewEnum),
  finalView: PropTypes.oneOf(viewEnum),

  autoFocus: PropTypes.bool,
  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled,

  parse: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
    PropTypes.func,
  ]),

  tabIndex: PropTypes.any,
  'aria-labelledby': PropTypes.string,
  'aria-describedby': PropTypes.string,

  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,

  inputProps: PropTypes.object,
  messages: PropTypes.shape({
    dateButton: PropTypes.string,
    timeButton: PropTypes.string,
  }),
}

@withRightToLeft class DateTimePicker extends React.Component {
  static displayName = 'DateTimePicker'

  static propTypes = propTypes

  static defaultProps = {
    value: null,
    min: new Date(1900, 0, 1),
    max: new Date(2099, 11, 31),
    date: true,
    time: true,
    open: false,
  }

  constructor(...args) {
    super(...args)

    this.messages = getMessages(this.props.messages)

    this.inputId = instanceId(this, '_input')
    this.dateId = instanceId(this, '_date')
    this.listId = instanceId(this, '_listbox')
    this.activeCalendarId = instanceId(this, '_calendar_active_cell')
    this.activeOptionId = instanceId(this, '_listbox_active_option')

    this.handleScroll = scrollManager(this)
    this.focusManager = focusManager(this, {
      didHandle: focused => {
        if (!focused) this.close()
      },
    })

    this.state = {
      focused: false,
    }
  }

  componentWillReceiveProps({ messages }) {
    this.messages = getMessages(messages)
  }

  @widgetEditable
  handleChange = (date, str, constrain) => {
    let { onChange, value } = this.props

    if (constrain) date = this.inRangeValue(date)

    if (onChange) {
      if (date == null || value == null) {
        if (
          date != value //eslint-disable-line eqeqeq
        )
          onChange(date, str)
      } else if (!dates.eq(date, value)) {
        onChange(date, str)
      }
    }
  }

  @widgetEditable
  handleKeyDown = e => {
    let { open, onKeyDown } = this.props

    notify(onKeyDown, [e])

    if (e.defaultPrevented) return

    if (e.key === 'Escape' && open) this.close()
    else if (e.altKey) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        this.open()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        this.close()
      }
    } else if (open) {
      if (open === popups.DATE) this.refs.calPopup.refs.inner.handleKeyDown(e)
      if (open === popups.TIME) this.refs.timePopup.handleKeyDown(e)
    }
  }

  @widgetEditable
  handleKeyPress = e => {
    notify(this.props.onKeyPress, [e])

    if (e.defaultPrevented) return

    if (this.props.open === popups.TIME) this.refs.timePopup.handleKeyPress(e)
  }

  @widgetEditable
  handleDateSelect = date => {
    var format = getFormat(this.props),
      dateTime = dates.merge(date, this.props.value, this.props.currentDate),
      dateStr = formatDate(date, format, this.props.culture)

    this.close()
    notify(this.props.onSelect, [dateTime, dateStr])
    this.handleChange(dateTime, dateStr, true)
    this.focus()
  }

  @widgetEditable
  handleTimeSelect = datum => {
    var format = getFormat(this.props),
      dateTime = dates.merge(
        this.props.value,
        datum.date,
        this.props.currentDate
      ),
      dateStr = formatDate(datum.date, format, this.props.culture)

    this.close()
    notify(this.props.onSelect, [dateTime, dateStr])
    this.handleChange(dateTime, dateStr, true)
    this.focus()
  }

  @widgetEditable
  handleCalendarClick = () => {
    this.focus()
    this.toggle(popups.DATE)
  }

  @widgetEditable
  handleTimeClick = () => {
    this.focus()
    this.toggle(popups.TIME)
  }

  renderInput(owns) {
    let {
      open,
      value,
      editFormat,
      culture,
      placeholder,
      disabled,
      readOnly,
      name,
      tabIndex,
      autoFocus,
      inputProps,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
    } = this.props

    let { focused } = this.state

    let activeId = null
    if (open === popups.TIME) {
      activeId = this.activeOptionId
    } else if (open === popups.DATE) {
      activeId = this.activeCalendarId
    }

    return (
      <DateTimePickerInput
        {...inputProps}
        id={this.inputId}
        ref="valueInput"
        role="combobox"
        name={name}
        tabIndex={tabIndex}
        autoFocus={autoFocus}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        value={value}
        format={getFormat(this.props)}
        editFormat={editFormat}
        editing={focused}
        culture={culture}
        parse={this.parse}
        onChange={this.handleChange}
        aria-haspopup
        aria-activedescendant={activeId}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-expanded={!!open}
        aria-owns={owns}
      />
    )
  }

  renderButtons() {
    let { date, time, disabled, readOnly } = this.props

    if (!date && !time) {
      return null
    }
    let messages = this.messages

    return (
      <Select bordered>
        {date &&
          <Button
            icon="calendar"
            label={messages.dateButton()}
            disabled={disabled || readOnly}
            onClick={this.handleCalendarClick}
          />}
        {time &&
          <Button
            icon="clock-o"
            label={messages.timeButton()}
            disabled={disabled || readOnly}
            onClick={this.handleTimeClick}
          />}
      </Select>
    )
  }

  renderCalendar() {
    let { activeCalendarId, inputId, dateId } = this
    let {
      open,
      value,
      popupTransition,
      dropUp,
      onCurrentDateChange,
      currentDate } = this.props

    let calendarProps = Props.pick(this.props, BaseCalendar.ControlledComponent)

    return (
      <Popup
        dropUp={dropUp}
        open={open === popups.DATE}
        className="rw-calendar-popup"
        transition={popupTransition}
      >
        <BaseCalendar
          {...calendarProps}
          ref="calPopup"
          id={dateId}
          activeId={activeCalendarId}
          tabIndex="-1"
          value={value}
          autoFocus={false}
          onChange={this.handleDateSelect}
          // #75: need to aggressively reclaim focus from the calendar otherwise
          // disabled header/footer buttons will drop focus completely from the widget
          onNavigate={() => this.focus()}
          currentDate={currentDate}
          onCurrentDateChange={onCurrentDateChange}
          aria-hidden={!open}
          aria-live="polite"
          aria-labelledby={inputId}
        />
      </Popup>
    )
  }

  renderTimeList() {
    let { activeOptionId, inputId, listId } = this
    let {
      open,
      value,
      min,
      max,
      step,
      currentDate,
      dropUp,
      date,
      culture,
      timeFormat,
      timeComponent,
      popupTransition,
    } = this.props

    return (
      <Popup
        dropUp={dropUp}
        transition={popupTransition}
        open={open === popups.TIME}
        onEntering={() => this.refs.timePopup.forceUpdate()}
      >
        <div>
          <TimeList
            ref="timePopup"
            id={listId}
            min={min}
            max={max}
            step={step}
            currentDate={currentDate}
            activeId={activeOptionId}
            format={timeFormat}
            culture={culture}
            value={dateOrNull(value)}
            onMove={this.handleScroll}
            onSelect={this.handleTimeSelect}
            preserveDate={!!date}
            itemComponent={timeComponent}
            aria-labelledby={inputId}
            aria-live={open && 'polite'}
            aria-hidden={!open}
            messages={this.messages}
          />
        </div>
      </Popup>
    )
  }

  render() {
    let { className, date, time, open, disabled, readOnly, dropUp } = this.props

    let { focused } = this.state

    let elementProps = Props.pickElementProps(this)

    let shouldRenderList = open || isFirstFocusedRender(this)

    let owns = ''
    if (date) owns += this.dateId
    if (time) owns += ' ' + this.listId

    return (
      <Widget
        {...elementProps}
        open={!!open}
        dropUp={dropUp}
        focused={focused}
        disabled={disabled}
        readOnly={readOnly}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        className={cn(className, 'rw-datetime-picker')}
      >
        <WidgetPicker>
          {this.renderInput(owns.trim())}

          {this.renderButtons()}
        </WidgetPicker>

        {!!(shouldRenderList && time) && this.renderTimeList()}
        {!!(shouldRenderList && date) && this.renderCalendar()}
      </Widget>
    )
  }

  focus() {
    let { valueInput } = this.refs

    if (valueInput && activeElement() !== findDOMNode(valueInput))
      valueInput.focus()
  }

  parse = string => {
    const { parse, culture, editFormat } = this.props
    const format = getFormat(this.props, true)

    const parsers = parse == null ? [] : [].concat(parse)

    if (typeof format === 'string') parsers.push(format)
    if (typeof editFormat === 'string') parsers.push(editFormat)

    invariant(
      parsers.length,
      'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' +
        'the DateTimePicker is unable to parse `%s` into a dateTime, ' +
        'please provide either a parse function or Globalize.js compatible string for `format`',
      string
    )

    parsers.sort(sortFnsFirst)

    let date
    for (var i = 0; i < parsers.length; i++) {
      date = parseDate(string, parsers[i], culture)
      if (date) return date
    }
    return null
  }

  toggle(view) {
    const { open } = this.props

    if (!open || open !== view) this.open(view)
    else this.close()
  }

  open(view) {
    const { open, date, time, onToggle } = this.props

    if (!view) {
      if (time) view = popups.TIME
      if (date) view = popups.DATE
      if (isBothOrNeither(date, time)) view = NEXT_VIEW[open] || popups.DATE
    }

    if (open !== view) notify(onToggle, view)
  }

  close() {
    if (this.props.open) notify(this.props.onToggle, false)
  }

  inRangeValue(value) {
    if (value == null) return value

    return dates.max(dates.min(value, this.props.max), this.props.min)
  }
}

export default uncontrollable(
  DateTimePicker,
  {
    open: 'onToggle',
    value: 'onChange',
    currentDate: 'onCurrentDateChange',
  },
  ['focus']
)

function parseDate(string, parser, culture) {
  return typeof parser === 'function'
    ? parser(string, culture)
    : dateLocalizer.parse(string, parser, culture)
}

function getFormat(props) {
  var isDate = props[popups.DATE] != null ? props[popups.DATE] : true,
    isTime = props[popups.TIME] != null ? props[popups.TIME] : true

  return props.format
    ? props.format
    : (isDate && isTime) || (!isDate && !isTime)
        ? dateLocalizer.getFormat('default')
        : dateLocalizer.getFormat(isDate ? 'date' : 'time')
}

function formatDate(date, format, culture) {
  var val = ''

  if (date instanceof Date && !isNaN(date.getTime()))
    val = dateLocalizer.format(date, format, culture)

  return val
}

function sortFnsFirst(a, b) {
  let aFn = typeof a === 'function'
  let bFn = typeof b === 'function'

  if (aFn && !bFn) return -1
  if (!aFn && bFn) return 1
  if ((aFn && bFn) || (!aFn && !bFn)) return 0
}

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt
  return null
}
