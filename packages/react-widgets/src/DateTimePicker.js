import invariant from 'invariant'
import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'

import cn from 'classnames'
import tabTrap from './util/tabTrap'
import uncontrollable from 'uncontrollable'

import Widget from './Widget'
import WidgetPicker from './WidgetPicker'
import Popup from './Popup'
import Button from './Button'
import Calendar from './Calendar'
import DateTimePickerInput from './DateTimePickerInput'
import TimeInput from './TimeInput'
import Select from './Select'
// import TimeList from './TimeList'

import * as Props from './util/Props'
import * as CustomPropTypes from './util/PropTypes'
import focusManager from './util/focusManager'
import scrollManager from './util/scrollManager'
import { widgetEditable } from './util/interaction'
import LocalizationProvider from './LocalizationProvider'
import dates from './util/dates'
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers'
import { calendar, clock } from './Icon'

let NEXT_VIEW = {
  date: 'time',
  time: 'date',
}

let isBothOrNeither = (a, b) => (a && b) || (!a && !b)

let propTypes = {
  /**
   * @example ['valuePicker', [ ['new Date()', null] ]]
   */
  value: PropTypes.instanceOf(Date),

  /**
   * @example ['onChangePicker', [ ['new Date()', null] ]]
   */
  onChange: PropTypes.func,
  /**
   * @example ['openDateTime']
   */
  open: PropTypes.bool,
  onToggle: PropTypes.func,

  /**
   * Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).
   */
  currentDate: PropTypes.instanceOf(Date),

  /**
   * Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object.
   */
  onCurrentDateChange: PropTypes.func,
  onSelect: PropTypes.func,

  /**
   * The minimum Date that can be selected. Min only limits selection, it doesn't constrain the date values that
   * can be typed or pasted into the widget. If you need this behavior you can constrain values via
   * the `onChange` handler.
   *
   * @example ['prop', ['min', 'new Date()']]
   */
  min: PropTypes.instanceOf(Date),

  /**
   * The maximum Date that can be selected. Max only limits selection, it doesn't constrain the date values that
   * can be typed or pasted into the widget. If you need this behavior you can constrain values via
   * the `onChange` handler.
   *
   * @example ['prop', ['max', 'new Date()']]
   */
  max: PropTypes.instanceOf(Date),

  /**
   * The amount of minutes between each entry in the time list.
   *
   * @example ['prop', { step: 90 }]
   */
  step: PropTypes.number,

  formats: PropTypes.shape({
    /**
     * A formatter used to display the date value. For more information about formats
     * visit the [Localization page](/i18n)
     *
     * @example ['dateFormat', ['default', "{ raw: 'MMM dd, yyyy' }", null, { defaultValue: 'new Date()', time: 'false' }]]
     */
    value: CustomPropTypes.dateFormat,

    /**
     * A formatter used by the time dropdown to render times. For more information about formats visit
     * the [Localization page](/i18n).
     *
     * @example ['dateFormat', ['time', "{ time: 'medium' }", null, { date: 'false', open: '"time"' }]]
     */
    time: CustomPropTypes.dateFormat,

    /**
     * A formatter to be used while the date input has focus. Useful for showing a simpler format for inputing.
     * For more information about formats visit the [Localization page](/i18n)
     *
     * @example ['dateFormat', ['edit', "{ date: 'short' }", null, { defaultValue: 'new Date()', format: "{ raw: 'MMM dd, yyyy' }", time: 'false' }]]
     */
    editValue: CustomPropTypes.dateFormat,
  }),

  /**
   * Enable the calendar component of the picker.
   */
  date: PropTypes.bool,

  /**
   * Enable the time list component of the picker.
   */
  time: PropTypes.bool,

  timePrecision: PropTypes.oneOf(['minutes', 'seconds', 'milliseconds'])
    .isRequired,

  timeInputProps: PropTypes.object,

  /** Specify the element used to render the calendar dropdown icon. */
  dateIcon: PropTypes.node,

  /** Specify the element used to render the time list dropdown icon. */
  timeIcon: PropTypes.node,

  dropUp: PropTypes.bool,
  popupTransition: CustomPropTypes.elementType,

  placeholder: PropTypes.string,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  /**
   * @example ['disabled', ['new Date()']]
   */
  disabled: CustomPropTypes.disabled,
  /**
   * @example ['readOnly', ['new Date()']]
   */
  readOnly: CustomPropTypes.disabled,

  /**
   * Determines how the widget parses the typed date string into a Date object. You can provide an array of formats to try,
   * or provide a function that returns a date to handle parsing yourself. When `parse` is unspecified and
   * the `format` prop is a `string` parse will automatically use that format as its default.
   */
  parse: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
    PropTypes.func,
  ]),

  /** @ignore */
  tabIndex: PropTypes.any,
  /** @ignore */
  'aria-labelledby': PropTypes.string,
  /** @ignore */
  'aria-describedby': PropTypes.string,

  /** @ignore */
  localizer: PropTypes.any,

  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,

  /** Adds a css class to the input container element. */
  containerClassName: PropTypes.string,

  calendarProps: PropTypes.object,
  inputProps: PropTypes.object,
  isRtl: PropTypes.bool,
  messages: PropTypes.shape({
    dateButton: PropTypes.string,
    timeButton: PropTypes.string,
  }),
}

/**
 * ---
 * subtitle: DatePicker, TimePicker
 * localized: true
 * shortcuts:
 *   - { key: alt + down arrow, label:  open calendar or time }
 *   - { key: alt + up arrow, label: close calendar or time }
 *   - { key: down arrow, label: move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * @public
 * @extends Calendar
 */
class DateTimePicker extends React.Component {
  static displayName = 'DateTimePicker'

  static propTypes = propTypes

  static defaultProps = {
    ...Calendar.ControlledComponent.defaultProps,
    value: null,
    min: new Date(1900, 0, 1),
    max: new Date(2099, 11, 31),
    date: true,
    time: true,
    open: false,
    dateIcon: calendar,
    timeIcon: clock,
    formats: {},
  }

  constructor(...args) {
    super(...args)

    this.inputId = instanceId(this, '_input')
    this.dateId = instanceId(this, '_date')
    this.listId = instanceId(this, '_listbox')
    this.activeCalendarId = instanceId(this, '_calendar_active_cell')
    this.activeOptionId = instanceId(this, '_listbox_active_option')

    this.handleScroll = scrollManager(this)
    this.focusManager = focusManager(this, {
      didHandle: focused => {
        if (!focused) {
          this.close()
          this.tabTrap.stop()
        }
      },
    })

    this.state = {
      focused: false,
    }
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
    }
  }

  @widgetEditable
  handleKeyPress = e => {
    notify(this.props.onKeyPress, [e])

    if (e.defaultPrevented) return
  }

  @widgetEditable
  handleDateSelect = date => {
    const { value, time, currentDate, onSelect } = this.props
    let dateTime = dates.merge(date, value, currentDate)
    let dateStr = this.formatDate(date)

    !time && this.close()
    notify(onSelect, [dateTime, dateStr])
    this.handleChange(dateTime, dateStr, true)
    this.focus()
  }

  @widgetEditable
  handleTimeChange = date => {
    this.handleChange(date, this.formatDate(date), true)
  }

  @widgetEditable
  handleCalendarClick = () => {
    // this.focus()
    this.toggle()
  }

  handleOpening = () => {
    this.tabTrap.start()
    requestAnimationFrame(() => {
      this.calRef?.focus()
    })
  }

  handleClosing = () => {
    this.tabTrap.stop()
    this.state.focused && this.focus()
  }

  attachCalRef = ref => {
    this.calRef = ref

    if (ref === null) this.tabTrap?.stop()
    else this.tabTrap = tabTrap(findDOMNode(ref)?.parentNode)
  }

  attachInputRef = ref => (this.inputRef = ref)

  renderInput(owns) {
    let {
      open,
      value,
      formats,
      localizer,
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
    let inputReadOnly = inputProps ? inputProps.readOnly : null

    let activeId = null
    if (open) {
      activeId = this.activeCalendarId
    }

    return (
      <DateTimePickerInput
        {...inputProps}
        id={this.inputId}
        ref={this.attachInputRef}
        role="combobox"
        name={name}
        value={value}
        tabIndex={tabIndex}
        autoFocus={autoFocus}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={inputReadOnly != null ? inputReadOnly : readOnly}
        format={this.getValueFormat()}
        editFormat={formats.editFormat}
        editing={focused}
        localizer={localizer}
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
    let { date, dateIcon, time, disabled, readOnly, localizer } = this.props

    if (!date && !time) {
      return null
    }
    return (
      <Select bordered>
        {(date || time) && (
          <Button
            icon={dateIcon}
            label={localizer.messages.dateButton()}
            disabled={disabled || readOnly}
            onClick={this.handleCalendarClick}
          />
        )}
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
      currentDate,
      min,
      max,
      time,
      timePrecision,
      calendarProps,
      timeInputProps,
    } = this.props

    return (
      <Popup
        dropUp={dropUp}
        open={open}
        role="dialog"
        className="rw-calendar-popup"
        transition={popupTransition}
        onEntering={this.handleOpening}
        onExited={this.handleClosing}
      >
        <div>
          <Calendar
            id={dateId}
            min={min}
            max={max}
            {...calendarProps}
            activeId={activeCalendarId}
            tabIndex="-1"
            value={value}
            autoFocus={false}
            onChange={this.handleDateSelect}
            currentDate={currentDate}
            onCurrentDateChange={onCurrentDateChange}
            aria-hidden={!open}
            aria-live="polite"
            aria-labelledby={inputId}
            ref={this.attachCalRef}
          />
          {time && (
            <TimeInput
              {...timeInputProps}
              value={value}
              precision={timePrecision}
              onChange={this.handleTimeChange}
              datePart={this.props.currentDate}
            />
          )}
        </div>
      </Popup>
    )
  }

  render() {
    let {
      className,
      date,
      time,
      open,
      disabled,
      readOnly,
      dropUp,
      containerClassName,
    } = this.props

    let { focused } = this.state

    let elementProps = Props.pickElementProps(this)
    let shouldRenderList = isFirstFocusedRender(this)

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
        <WidgetPicker className={containerClassName}>
          {this.renderInput(owns.trim())}

          {this.renderButtons()}
        </WidgetPicker>

        {!!(shouldRenderList && (date || time)) && this.renderCalendar()}
      </Widget>
    )
  }

  focus() {
    if (this.props.open) this.calRef?.focus()
    else this.inputRef?.focus()
  }

  parse = string => {
    const { parse, formats, localizer } = this.props
    const format = this.getValueFormat()

    invariant(
      parse || format || formats.editValue,
      'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' +
        'the DateTimePicker is unable to parse `%s` into a dateTime, ' +
        'please provide either a parse function or localizer compatible `format` prop',
      string,
    )

    let date
    let checkFormats = [format, formats.editValue]

    if (typeof parse == 'function') {
      date = parse(string)
      if (date) return date
    } else {
      // parse is a string format or array of string formats
      checkFormats = checkFormats.concat(parse).filter(Boolean)
    }

    for (let f of checkFormats) {
      date = localizer.parseDate(string, f)
      if (date) return date
    }
    return null
  }

  toggle() {
    const { open } = this.props

    if (!open) this.open()
    else this.close()
  }

  open() {
    const { open, onToggle } = this.props

    if (!open) notify(onToggle, true)
  }

  close() {
    if (this.props.open) notify(this.props.onToggle, false)
  }

  inRangeValue(value) {
    if (value == null) return value

    return dates.max(dates.min(value, this.props.max), this.props.min)
  }

  formatDate(date) {
    return date instanceof Date && !isNaN(date.getTime())
      ? this.props.localizer.formatDate(date, this.getValueFormat())
      : ''
  }

  getValueFormat() {
    const { date, time } = this.props
    let isDate = date != null ? date : true
    let isTime = time != null ? time : true

    return (isDate && isTime) || (!isDate && !isTime)
      ? 'datetime'
      : isDate
        ? 'date'
        : 'time'
  }
}

export default uncontrollable(
  LocalizationProvider.withLocalizer(DateTimePicker),
  {
    open: 'onToggle',
    value: 'onChange',
    currentDate: 'onCurrentDateChange',
  },
)
