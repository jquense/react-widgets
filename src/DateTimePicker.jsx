import React  from 'react';
import invariant from 'invariant';
import activeElement from 'dom-helpers/activeElement';
import cx     from 'classnames';
import compat from './util/compat';
import _      from './util/_'; //pick, omit, has

import dates  from './util/dates';
import { date as dateLocalizer } from './util/localizers';
import constants  from './util/constants';

import Popup     from './Popup';
import _Calendar  from './Calendar';
import Time      from './TimeList';
import DateInput from './DateInput';
import Btn       from './WidgetButton';
import CustomPropTypes from './util/propTypes';
import createUncontrolledWidget from 'uncontrollable';
import { widgetEditable } from './util/interaction';
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers';

let { calendarViews: views, datePopups: popups } = constants;
let Calendar = _Calendar.ControlledComponent;
let viewEnum  = Object.keys(views).map( k => views[k] );

let { omit, pick } = _;

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
      value:            null,

      min:              new Date(1900,  0,  1),
      max:              new Date(2099, 11, 31),
      calendar:         true,
      time:             true,
      open:             false,

      //calendar override
      footer:           true,

      messages: {
        calendarButton: 'Select Date',
        timeButton:     'Select Time'
      },

      ariaActiveDescendantKey: 'dropdownlist'
    }
  },

  render() {
    let {
        className, calendar, time, open
      , tabIndex, value,  editFormat, timeFormat
      , culture, duration, step, messages, min, max, busy
      , placeholder, disabled, readOnly, name, dropUp
      , timeComponent, autoFocus
      , 'aria-labelledby': ariaLabelledby
      , 'aria-describedby': ariaDescribedby } = this.props;

    let { focused } = this.state;

    let inputID = instanceId(this, '_input')
      , timeListID = instanceId(this, '_time_listbox')
      , dateListID = instanceId(this, '_cal')
      , owns = '';

    let elementProps = omit(this.props, Object.keys(propTypes))
      , calProps = pick(this.props, Object.keys(Calendar.propTypes))

    let shouldRenderList = isFirstFocusedRender(this) || open
      , disabledOrReadonly = disabled || readOnly
      , calendarIsOpen = open === popups.CALENDAR
      , timeIsOpen = open === popups.TIME;

    if (calendar) owns += dateListID
    if (time)     owns += ' ' + timeListID

    value = dateOrNull(value)

    return (
      <div {...elementProps}
        ref="element"
        tabIndex={'-1'}
        onKeyDown={this._keyDown}
        onKeyPress={this._keyPress}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        className={cx(className, 'rw-datetimepicker', 'rw-widget', {
          'rw-state-focus':     focused,
          'rw-state-disabled':  disabled,
          'rw-state-readonly':  readOnly,
          'rw-has-both':         calendar && time,
          'rw-has-neither':     !calendar && !time,
          'rw-rtl':             this.isRtl(),

          ['rw-open' + (dropUp ? '-up' : '')]: open
        })}
      >
        <DateInput
          ref='valueInput'
          id={inputID}
          autoFocus={autoFocus}
          tabIndex={tabIndex || 0}
          role='combobox'
          autoComplete='off'
          aria-labelledby={ariaLabelledby}
          aria-describedby ={ariaDescribedby}
          aria-expanded={!!open}
          aria-busy={!!busy}
          aria-owns={owns.trim()}
          aria-haspopup={true}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          format={getFormat(this.props)}
          editFormat={editFormat}
          editing={focused}
          culture={culture}
          parse={this._parse}
          onChange={this._change}
        />

        { (calendar || time) &&
        <span className='rw-select'>
        {
          calendar &&
            <Btn
              tabIndex='-1'
              className='rw-btn-calendar'
              disabled={disabledOrReadonly}
              aria-disabled={disabledOrReadonly}
              aria-label={messages.calendarButton}
              onClick={this._click.bind(null, popups.CALENDAR)}
            >
              <i className="rw-i rw-i-calendar"
                aria-hidden='true'
              />
            </Btn>
        }
        { time &&
            <Btn
              tabIndex='-1'
              className='rw-btn-time'
              disabled={disabledOrReadonly}
              aria-disabled={disabledOrReadonly}
              aria-label={messages.timeButton}
              onClick={this._click.bind(null, popups.TIME)}
            >
              <i className="rw-i rw-i-clock-o"
                aria-hidden='true'
              />
            </Btn>
        }
        </span>
        }
        <Popup
          dropUp={dropUp}
          open={timeIsOpen}
          duration={duration}
          onOpening={() => this.refs.timePopup.forceUpdate()}
        >
          <div>
            { shouldRenderList &&
              <Time ref="timePopup"
                id={timeListID}
                ariaActiveDescendantKey='timelist'
                aria-labelledby={inputID}
                aria-live={open && 'polite'}
                aria-hidden={!open}
                value={value}
                format={timeFormat}
                step={step}
                min={min}
                max={max}
                currentDate={this.props.currentDate}
                culture={culture}
                onMove={this._scrollTo}
                preserveDate={!!calendar}
                itemComponent={timeComponent}
                onSelect={this._selectTime}
              />
            }
          </div>
        </Popup>
        <Popup
          className='rw-calendar-popup'
          dropUp={dropUp}
          open={calendarIsOpen}
          duration={duration}
        >
          { shouldRenderList &&
            <Calendar
              {...calProps}
              ref="calPopup"
              tabIndex='-1'
              id={dateListID}
              value={value}
              aria-hidden={!open}
              aria-live={'polite'}
              ariaActiveDescendantKey='calendar'
              onChange={this._selectDate}
              // #75: need to aggressively reclaim focus from the calendar otherwise
              // disabled header/footer buttons will drop focus completely from the widget
              onNavigate={() => this.focus()}
              currentDate={this.props.currentDate}
              onCurrentDateChange={this.props.onCurrentDateChange}
            />
          }
        </Popup>
      </div>
    )
  },

  @widgetEditable
  _change(date, str, constrain){
    let { onChange, value } = this.props;

    if (constrain)
      date = this.inRangeValue(date)

    if (onChange) {
      if (date == null || value == null) {
        if (date != value) //eslint-disable-line eqeqeq
          onChange(date, str)
      }
      else if (!dates.eq(date, value))
        onChange(date, str)
    }
  },

  @widgetEditable
  _keyDown(e){
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
        this.refs.calPopup._keyDown(e)
      if (open === popups.TIME )
        this.refs.timePopup._keyDown(e)
    }
  },

  @widgetEditable
  _keyPress(e) {
    notify(this.props.onKeyPress, [e])

    if (e.defaultPrevented)
      return

    if (this.props.open === popups.TIME )
      this.refs.timePopup._keyPress(e)
  },

  focus(){
    if (activeElement() !== compat.findDOMNode(this.refs.valueInput))
      this.refs.valueInput.focus()
  },

  @widgetEditable
  _selectDate(date){
    var format   = getFormat(this.props)
      , dateTime = dates.merge(date, this.props.value, this.props.currentDate)
      , dateStr  = formatDate(date, format, this.props.culture);

    this.close()
    notify(this.props.onSelect, [dateTime, dateStr])
    this._change(dateTime, dateStr, true)
    this.focus()
  },

  @widgetEditable
  _selectTime(datum){
    var format   = getFormat(this.props)
      , dateTime = dates.merge(this.props.value, datum.date, this.props.currentDate)
      , dateStr  = formatDate(datum.date, format, this.props.culture);

    this.close()
    notify(this.props.onSelect, [dateTime, dateStr])
    this._change(dateTime, dateStr, true)
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
  , { open: 'onToggle', value: 'onChange', currentDate: 'onCurrentDateChange' }, ['focus']);




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
