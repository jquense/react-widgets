import React  from 'react';
import invariant from 'invariant';
import activeElement from 'dom-helpers/activeElement';
import cn from 'classnames';
import uncontrollable from 'uncontrollable';

import compat from './util/compat';
import _      from './util/_'; //pick, omit, has
import dates  from './util/dates';
import { date as dateLocalizer } from './util/localizers';
import {
  calendarViews as views,
  datePopups as popups }  from './util/constants';

import Widget from './Widget';
import WidgetPicker from './WidgetPicker';
import Popup from './Popup';
import Button from './Button';
import BaseCalendar from './Calendar';
import DateTimePickerInput from './DateTimePickerInput';
import Select  from './Select';
import TimeList from './TimeList';
import CustomPropTypes from './util/propTypes';
import createFocusManager from './util/focusManager';
import createScrollManager from './util/scrollManager';
import withRightToLeft from './util/withRightToLeft';
import { widgetEditable, isReadOnly, isDisabled } from './util/interaction';
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers';

let Calendar = BaseCalendar.ControlledComponent;

let viewEnum  = Object.keys(views).map( k => views[k] );

let propTypes = {

    ...Calendar.propTypes,

    //-- controlled props -----------
    value:          React.PropTypes.instanceOf(Date),
    onChange:       React.PropTypes.func,
    open:           React.PropTypes.oneOf([false, popups.TIME, popups.CALENDAR]),
    onToggle:       React.PropTypes.func,
    currentDate:    React.PropTypes.instanceOf(Date),
    onCurrentDateChange: React.PropTypes.func,
    //------------------------------------

    onSelect:       React.PropTypes.func,

    min:            React.PropTypes.instanceOf(Date),
    max:            React.PropTypes.instanceOf(Date),

    culture:        React.PropTypes.string,

    format:         CustomPropTypes.dateFormat,
    timeFormat:     CustomPropTypes.dateFormat,
    editFormat:     CustomPropTypes.dateFormat,

    calendar:       React.PropTypes.bool,
    time:           React.PropTypes.bool,

    timeComponent:  CustomPropTypes.elementType,

    //popup
    dropUp:         React.PropTypes.bool,
    duration:       React.PropTypes.number,

    placeholder:    React.PropTypes.string,
    name:           React.PropTypes.string,

    initialView:    React.PropTypes.oneOf(viewEnum),
    finalView:      React.PropTypes.oneOf(viewEnum),

    autoFocus:      React.PropTypes.bool,
    disabled:       CustomPropTypes.disabled,
    readOnly:       CustomPropTypes.readOnly,

    parse:          React.PropTypes.oneOfType([
                      React.PropTypes.arrayOf(React.PropTypes.string),
                      React.PropTypes.string,
                      React.PropTypes.func
                    ]),

    'aria-labelledby': React.PropTypes.string,

    messages:      React.PropTypes.shape({
      calendarButton: React.PropTypes.string,
      timeButton:     React.PropTypes.string
    })
  }

@withRightToLeft
class DateTimePicker extends React.Component {
  static displayName = 'DateTimePicker';

  static propTypes = propTypes

  static defaultProps = {
    value: null,
    min: new Date(1900,  0,  1),
    max: new Date(2099, 11, 31),
    calendar: true,
    time: true,
    open: false,

    //calendar override
    footer: true,

    messages: {
      calendarButton: 'Select Date',
      timeButton:     'Select Time'
    },
  }

  constructor(...args) {
    super(...args);

    this.inputId = instanceId(this, '_input')
    this.calendarId = instanceId(this, '_calendar')
    this.listId = instanceId(this, '_listbox')
    this.activeCalendarId = instanceId(this, '_calendar_active_cell')
    this.activeOptionId = instanceId(this, '_listbox_active_option')

    this.handleScroll = createScrollManager(this)
    this.focusManager = createFocusManager(this, {
      didHandle: focused => {
        if (!focused) this.close()
      }
    })

    this.state = {
      focused: false
    };
  }

  @widgetEditable
  handleChange = (date, str, constrain) => {
    let { onChange, value } = this.props;

    if (constrain)
      date = this.inRangeValue(date)

    if (onChange) {
      if (date == null || value == null) {
        if (date != value) //eslint-disable-line eqeqeq
          onChange(date, str)
      }
      else if (!dates.eq(date, value)) {
        onChange(date, str)

      }
    }
  };

  @widgetEditable
  handleKeyDown = (e) => {
    let { open, calendar, time } = this.props;

    notify(this.props.onKeyDown, [e])

    if (e.defaultPrevented)
      return

    if (e.key === 'Escape' && open)
      this.close()

    else if (e.altKey) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (calendar && time)
          this.open(open === popups.CALENDAR
                ? popups.TIME
                : popups.CALENDAR)
        else if (time)     this.open(popups.TIME)
        else if (calendar) this.open(popups.CALENDAR)
      }
      else if (e.key === 'ArrowUp') {
        e.preventDefault()
        this.close()
      }
    }
    else if (open) {
      if (open === popups.CALENDAR )
        this.refs.calPopup.refs.inner.handleKeyDown(e)
      if (open === popups.TIME )
        this.refs.timePopup.handleKeyDown(e)
    }
  };

  @widgetEditable
  handleKeyPress = (e) => {
    notify(this.props.onKeyPress, [e])

    if (e.defaultPrevented)
      return

    if (this.props.open === popups.TIME)
      this.refs.timePopup.handleKeyPress(e)
  };

  @widgetEditable
  handleDateSelect = (date) => {
    var format   = getFormat(this.props)
      , dateTime = dates.merge(date, this.props.value, this.props.currentDate)
      , dateStr  = formatDate(date, format, this.props.culture);

    this.close()
    notify(this.props.onSelect, [dateTime, dateStr])
    this.handleChange(dateTime, dateStr, true)
    this.focus()
  };

  @widgetEditable
  handleTimeSelect = (datum) => {
    var format   = getFormat(this.props)
      , dateTime = dates.merge(this.props.value, datum.date, this.props.currentDate)
      , dateStr  = formatDate(datum.date, format, this.props.culture);

    this.close()
    notify(this.props.onSelect, [dateTime, dateStr])
    this.handleChange(dateTime, dateStr, true)
    this.focus()
  };

  @widgetEditable
  handleCalendarClick = () => {
    this.focus()
    this.toggle(popups.CALENDAR)
  };

  @widgetEditable
  handleTimeClick = () => {
    this.focus()
    this.toggle(popups.TIME)
  };

  renderInput(owns) {
    let {
        open
      , value
      , editFormat
      , culture
      , busy
      , placeholder
      , disabled
      , readOnly
      , name
      , tabIndex
      , autoFocus
      , 'aria-labelledby': ariaLabelledby
      , 'aria-describedby': ariaDescribedby } = this.props;

    let { focused } = this.state;

    let activeId = null;
    if (open === popups.TIME) {
      activeId = this.activeOptionId
    }
    else if (open === popups.CALENDAR) {
      activeId = this.activeCalendarId
    }

    return (
      <DateTimePickerInput
        id={this.inputId}
        ref='valueInput'
        role='combobox'
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
        aria-busy={!!busy}
        aria-owns={owns}
      />
    )
  }

  renderButtons(messages) {
    let { calendar, time } = this.props;

    if (!calendar && !time) {
      return null;
    }

    let disabled = isDisabled(this.props)
    let readOnly = isReadOnly(this.props)

    return (
      <Select bordered>
        {calendar &&
          <Button
            icon="calendar"
            label={messages.calendarButton}
            disabled={disabled || readOnly}
            onClick={this.handleCalendarClick}
          />
        }
        {time &&
          <Button
            icon="clock-o"
            label={messages.timeButton}
            disabled={disabled || readOnly}
            onClick={this.handleTimeClick}
          />
        }
      </Select>
    )
  }

  renderCalendar() {
    let { activeCalendarId, inputId, calendarId } = this;
    let {
        open
      , value
      , duration
      , dropUp } = this.props;

    let calendarProps = _.pickProps(this.props, Calendar);

    return (
      <Popup
        dropUp={dropUp}
        duration={duration}
        open={open === popups.CALENDAR}
        className='rw-calendar-popup'
      >
        <BaseCalendar
          {...calendarProps}
          ref="calPopup"
          id={calendarId}
          activeId={activeCalendarId}
          tabIndex='-1'
          value={value}
          autoFocus={false}
          onChange={this.handleDateSelect}
          // #75: need to aggressively reclaim focus from the calendar otherwise
          // disabled header/footer buttons will drop focus completely from the widget
          onNavigate={() => this.focus()}
          currentDate={this.props.currentDate}
          onCurrentDateChange={this.props.onCurrentDateChange}
          aria-hidden={!open}
          aria-live='polite'
          aria-labelledby={inputId}
        />
      </Popup>
    )
  }

  renderTimeList() {
    let { activeOptionId, inputId, listId } = this;
    let {
        open
      , value
      , duration
      , dropUp
      , calendar
      , timeFormat
      , timeComponent } = this.props;

    let timeListProps = _.pickProps(this.props, TimeList);

    return (
      <Popup
        dropUp={dropUp}
        duration={duration}
        open={open === popups.TIME}
        onOpening={() => this.refs.timePopup.forceUpdate()}
      >
        <div>
          <TimeList
            {...timeListProps}
            ref="timePopup"
            id={listId}
            activeId={activeOptionId}
            format={timeFormat}
            value={dateOrNull(value)}
            onMove={this.handleScroll}
            onSelect={this.handleTimeSelect}
            preserveDate={!!calendar}
            itemComponent={timeComponent}
            aria-labelledby={inputId}
            aria-live={open && 'polite'}
            aria-hidden={!open}
          />
        </div>
      </Popup>
    )
  }

  render() {
    let {
        className
      , calendar
      , time
      , open
      , messages
      , dropUp} = this.props;

    let { focused } = this.state;

    let owns = '';

    let elementProps = _.omitOwnProps(this, Calendar, TimeList)

    let shouldRenderList = open || isFirstFocusedRender(this);

    if (calendar) owns += this.calendarId
    if (time)     owns += ' ' + this.listId

    let disabled = isDisabled(this.props)
    let readOnly = isReadOnly(this.props)

    return (
      <Widget
        {...elementProps}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        className={cn(className, 'rw-datetime-picker')}
      >
        <WidgetPicker
          open={!!open}
          dropUp={dropUp}
          focused={focused}
          disabled={disabled}
          readOnly={readOnly}
        >
          {this.renderInput(owns.trim())}

          {this.renderButtons(messages)}
        </WidgetPicker>

        {shouldRenderList && time &&
          this.renderTimeList()
        }
        {shouldRenderList && calendar &&
          this.renderCalendar()
        }
      </Widget>
    )
  }

  focus() {
    let { valueInput } = this.refs;

    if (valueInput && activeElement() !== compat.findDOMNode(valueInput))
      valueInput.focus()
  }

  parse = (string) => {
    var format = getFormat(this.props, true)
      , editFormat = this.props.editFormat
      , parse = this.props.parse
      , formats = [];

    if (typeof parse === 'function')
      return parse(string, this.props.culture)

    if (typeof format === 'string')
      formats.push(format)

    if (typeof editFormat === 'string')
      formats.push(editFormat)

    if (parse)
      formats = formats.concat(this.props.parse)

    invariant(formats.length,
      'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' +
      'the DateTimePicker is unable to parse `%s` into a dateTime, ' +
      'please provide either a parse function or Globalize.js compatible string for `format`', string);

    return formatsParser(formats, this.props.culture, string);
  }

  toggle(view) {
    this.props.open
      ? this.props.open !== view
          ? this.open(view)
          : this.close(view)
      : this.open(view)
  }

  open(view) {
    if (this.props.open !== view && this.props[view] === true)
      notify(this.props.onToggle, view)
  }

  close() {
    if (this.props.open)
      notify(this.props.onToggle, false)
  }

  inRangeValue(value)  {
    if (value == null) return value

    return dates.max(
        dates.min(value, this.props.max)
      , this.props.min)
  }
}


export default  uncontrollable(
    DateTimePicker
  , {
    open: 'onToggle',
    value: 'onChange'
  }, ['focus']
);




function getFormat(props){
  var cal  = props[popups.CALENDAR] != null ? props.calendar : true
    , time = props[popups.TIME] != null ? props.time : true;

  return props.format
    ? props.format
    : (cal && time) || (!cal && !time)
      ? dateLocalizer.getFormat('default')
      : dateLocalizer.getFormat(cal ? 'date' : 'time')
}

function formatDate(date, format, culture){
  var val = ''

  if ((date instanceof Date) && !isNaN(date.getTime()))
    val = dateLocalizer.format(date, format, culture)

  return val;
}

function formatsParser(formats, culture, str){
  var date;

  for (var i = 0; i < formats.length; i++ ){
    date = dateLocalizer.parse(str, formats[i], culture)
    if (date) return date
  }
  return null
}

function dateOrNull(dt){
  if (dt && !isNaN(dt.getTime())) return dt
  return null
}
