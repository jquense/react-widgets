import React  from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import activeElement from 'dom-helpers/activeElement';
import cn from 'classnames';
import compat from './util/compat';
import _      from './util/_'; //pick, omit, has

import dates  from './util/dates';
import { date as dateLocalizer } from './util/localizers';
import {
  calendarViews as views,
  datePopups as popups }  from './util/constants';

import Widget from './Widget';
import Popup from './Popup';
import BaseCalendar from './Calendar';
import TimeList from './TimeList';
import DateTimePickerInput from './DateTimePickerInput';
import Button from './Button';
import CustomPropTypes from './util/propTypes';
import createUncontrolledWidget from 'uncontrollable';
import { widgetEditable } from './util/interaction';
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers';

let Calendar = BaseCalendar.ControlledComponent;

let viewEnum  = Object.keys(views).map( k => views[k] );

let propTypes = {

    ...Calendar.propTypes,

    //-- controlled props -----------
    value:          PropTypes.instanceOf(Date),
    onChange:       PropTypes.func,
    open:           PropTypes.oneOf([false, popups.TIME, popups.CALENDAR]),
    onToggle:       PropTypes.func,
    currentDate:    PropTypes.instanceOf(Date),
    onCurrentDateChange: PropTypes.func,
    //------------------------------------

    onSelect:       PropTypes.func,

    min:            PropTypes.instanceOf(Date),
    max:            PropTypes.instanceOf(Date),

    culture:        PropTypes.string,

    format:         CustomPropTypes.dateFormat,
    timeFormat:     CustomPropTypes.dateFormat,
    editFormat:     CustomPropTypes.dateFormat,

    calendar:       PropTypes.bool,
    time:           PropTypes.bool,

    timeComponent:  CustomPropTypes.elementType,

    //popup
    dropUp:         PropTypes.bool,
    duration:       PropTypes.number,

    placeholder:    PropTypes.string,
    name:           PropTypes.string,

    initialView:    PropTypes.oneOf(viewEnum),
    finalView:      PropTypes.oneOf(viewEnum),

    autoFocus:      PropTypes.bool,
    disabled:       CustomPropTypes.disabled,
    readOnly:       CustomPropTypes.readOnly,

    parse:          PropTypes.oneOfType([
                      PropTypes.arrayOf(PropTypes.string),
                      PropTypes.string,
                      PropTypes.func
                    ]),

    'aria-labelledby': PropTypes.string,

    messages:      PropTypes.shape({
      calendarButton: PropTypes.string,
      timeButton:     PropTypes.string
    })
  }


var DateTimePicker = React.createClass({

  displayName: 'DateTimePicker',

  mixins: [
    require('./mixins/TimeoutMixin'),
    require('./mixins/PureRenderMixin'),
    require('./mixins/PopupScrollToMixin'),
    require('./mixins/RtlParentContextMixin'),
    require('./mixins/FocusMixin')({
      didHandle(focused) {
        if (!focused) this.close()
      }
    }),
    require('./mixins/AriaDescendantMixin')('valueInput', function(key, id){
      var { open } = this.props
        , current = this.ariaActiveDescendant()
        , calIsActive = open === popups.CALENDAR && key === 'calendar'
        , timeIsActive = open === popups.TIME && key === 'timelist';

      if (!current || (timeIsActive || calIsActive))
        return id
    })
  ],

  propTypes,

  getInitialState() {
    return {
      focused: false
    }
  },

  getDefaultProps() {

    return {
      value: null,
      currentDate: new Date(),
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

      ariaActiveDescendantKey: 'dropdownlist'
    }
  },

  renderInput(id, owns) {
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

    return (
      <DateTimePickerInput
        id={id}
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
        parse={this._parse}
        onChange={this.handleChange}
        aria-haspopup
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        aria-expanded={!!open}
        aria-busy={!!busy}
        aria-owns={owns}
      />
    )
  },

  renderButtons(messages) {
    let { calendar, time, disabled, readOnly } = this.props;

    if (!calendar && !time) {
      return null;
    }

    return (
      <span className='rw-select'>
        {calendar &&
          <Button
            icon="calendar"
            className='rw-btn-calendar'
            label={messages.calendarButton}
            disabled={!!(disabled || readOnly)}
            onClick={this._click.bind(null, popups.CALENDAR)}
          />
        }
        {time &&
          <Button
            icon="clock-o"
            className='rw-btn-time'
            label={messages.timeButton}
            disabled={!!(disabled || readOnly)}
            onClick={this._click.bind(null, popups.TIME)}
          />
        }
      </span>
    )
  },

  renderCalendar(id, inputID) {
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
        <Calendar
          {...calendarProps}
          ref="calPopup"
          id={id}
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
          aria-labelledby={inputID}
          ariaActiveDescendantKey='calendar'
        />
      </Popup>
    )
  },

  renderTimeList(id, inputID) {
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
            id={id}
            format={timeFormat}
            value={dateOrNull(value)}
            onMove={this._scrollTo}
            onSelect={this.handleTimeSelect}
            preserveDate={!!calendar}
            itemComponent={timeComponent}
            aria-labelledby={inputID}
            aria-live={open && 'polite'}
            aria-hidden={!open}
            ariaActiveDescendantKey='timelist'
          />
        </div>
      </Popup>
    )
  },

  render() {
    let {
        className
      , calendar
      , time
      , open
      , messages
      , disabled
      , readOnly
      , dropUp} = this.props;

    let { focused } = this.state;

    let inputID = instanceId(this, '_input')
      , timeListID = instanceId(this, '_time_listbox')
      , dateListID = instanceId(this, '_cal')
      , owns = '';

    let elementProps = _.omitOwnProps(this, Calendar, TimeList)

    let shouldRenderList = open || isFirstFocusedRender(this);

    if (calendar) owns += dateListID
    if (time)     owns += ' ' + timeListID

    return (
      <Widget
        {...elementProps}
        open={!!open}
        dropUp={dropUp}
        focused={focused}
        disabled={disabled}
        readOnly={readOnly}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
        className={cn(
          className,
          'rw-datetimepicker',
          calendar && time && 'rw-has-both',
          !calendar && !time && 'rw-has-neither',
        )}
      >
        {this.renderInput(inputID, owns.trim())}

        {this.renderButtons(messages)}

        {shouldRenderList &&
          this.renderTimeList(timeListID, inputID)
        }
        {shouldRenderList &&
          this.renderCalendar(dateListID, inputID)
        }
      </Widget>
    )
  },

  @widgetEditable
  handleChange(date, str, constrain){
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
  },

  @widgetEditable
  handleKeyDown(e){
    let { open, calendar, time } = this.props;

    notify(this.props.onKeyDown, [e])

    if (e.defaultPrevented)
      return

    if (e.key === 'Escape' && open)
      this.close()

    else if (e.altKey) {
      e.preventDefault()

      if (e.key === 'ArrowDown'){
        if (calendar && time)
          this.open(open === popups.CALENDAR
                ? popups.TIME
                : popups.CALENDAR)
        else if (time)     this.open(popups.TIME)
        else if (calendar) this.open(popups.CALENDAR)
      }
      else if (e.key === 'ArrowUp')
        this.close()
    }
    else if (open) {
      if (open === popups.CALENDAR )
        this.refs.calPopup.handleKeyDown(e)
      if (open === popups.TIME )
        this.refs.timePopup.handleKeyDown(e)
    }
  },

  @widgetEditable
  handleKeyPress(e) {
    notify(this.props.onKeyPress, [e])

    if (e.defaultPrevented)
      return

    if (this.props.open === popups.TIME )
      this.refs.timePopup.handleKeyPress(e)
  },

  focus() {
    let { valueInput } = this.refs;

    if (valueInput && activeElement() !== compat.findDOMNode(valueInput))
      valueInput.focus()
  },

  @widgetEditable
  handleDateSelect(date){
    var format   = getFormat(this.props)
      , dateTime = dates.merge(date, this.props.value, this.props.currentDate)
      , dateStr  = formatDate(date, format, this.props.culture);

    this.close()
    notify(this.props.onSelect, [dateTime, dateStr])
    this.handleChange(dateTime, dateStr, true)
    this.focus()
  },

  @widgetEditable
  handleTimeSelect(datum){
    var format   = getFormat(this.props)
      , dateTime = dates.merge(this.props.value, datum.date, this.props.currentDate)
      , dateStr  = formatDate(datum.date, format, this.props.culture);

    this.close()
    notify(this.props.onSelect, [dateTime, dateStr])
    this.handleChange(dateTime, dateStr, true)
    this.focus()
  },

  @widgetEditable
  _click(view, e){
    this.focus()
    this.toggle(view, e)
  },

  _parse(string){
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
  },

  toggle(view) {
    this.props.open
      ? this.props.open !== view
          ? this.open(view)
          : this.close(view)
      : this.open(view)
  },

  open(view){
    if (this.props.open !== view && this.props[view] === true)
      notify(this.props.onToggle, view)
  },

  close(){
    if (this.props.open)
      notify(this.props.onToggle, false)
  },

  inRangeValue(value){
    if (value == null) return value

    return dates.max(
        dates.min(value, this.props.max)
      , this.props.min)
  }

});


export default  createUncontrolledWidget(
    DateTimePicker
  , {
    open: 'onToggle',
    value: 'onChange',
    currentDate: 'onCurrentDateChange'
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
