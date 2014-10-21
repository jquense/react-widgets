var React  = require('react')
  , cx     = require('../util/cx')
  , _      = require('lodash')
  , dates  = require('../util/dates')
  , views  = require('../util/constants').calViews
  , popups = require('../util/constants').datePopups

  , Popup     = require('../popup/popup.jsx')
  , Calendar  = require('../calendar/calendar.jsx')
  , Time      = require('./time.jsx')
  , DateInput = require('./date-input.jsx')

  , $ = require('../util/dom')
  , controlledInput = require('../util/controlledInput')
  , mergeIntoProps  = require('../util/transferProps').mergeIntoProps;

var viewEnum  = _.values(views)
var propTypes = {

    //-- controlled props -----------
    value:          React.PropTypes.instanceOf(Date),
    onChange:       React.PropTypes.func,
    open:           React.PropTypes.oneOf([false, popups.TIME, popups.CALENDAR]),
    onToggle:       React.PropTypes.func,
    //------------------------------------

    min:            React.PropTypes.instanceOf(Date),
    max:            React.PropTypes.instanceOf(Date),

    culture:        React.PropTypes.string,
    format:         React.PropTypes.string,
    editFormat:     React.PropTypes.string,

    calendar:       React.PropTypes.bool,
    time:           React.PropTypes.bool,

    timeComponent:  React.PropTypes.func,
    duration:       React.PropTypes.number, //popup

    placeholder:    React.PropTypes.string,

    initialView:    React.PropTypes.oneOf(viewEnum),
    finalView:      React.PropTypes.oneOf(viewEnum),

    disabled:       React.PropTypes.oneOfType([
                        React.PropTypes.bool,
                        React.PropTypes.oneOf(['disabled'])
                      ]),

    readOnly:       React.PropTypes.oneOfType([
                      React.PropTypes.bool,
                      React.PropTypes.oneOf(['readOnly'])
                    ]),

    parse:          React.PropTypes.oneOfType([
                      React.PropTypes.arrayOf(React.PropTypes.string),
                      React.PropTypes.string,
                      React.PropTypes.func
                    ]),
  }

var DateTimePicker = React.createClass({
  displayName: 'DateTimePicker',

  mixins: [
    require('../mixins/WidgetMixin'),
    require('../mixins/PureRenderMixin'),
    require('../mixins/RtlParentContextMixin')
  ],

  propTypes: propTypes,

  getInitialState: function(){
    return {
      selectedIndex: 0,
      open:          false
    }
  },

  getDefaultProps: function(){
    var cal  = _.has(this.props, 'calendar') ? this.props.calendar : true
      , time = _.has(this.props, 'time') ? this.props.time : true
      , both = cal && time
      , neither = !cal && !time;

    return {
      value:            null,
      format:           both || neither
        ? 'M/d/yyyy h:mm tt'
        : cal ? 'M/d/yyyy' : 'h:mm tt',
      min:              new Date(1900,  0,  1),
      max:              new Date(2099, 11, 31),
      calendar:         true,
      time:             true,
      messages: {
        calendarButton: 'Select Date',
        timeButton:     'Select Time',
        next:           'Next Date',
      }
    }
  },

  render: function(){
    var self = this
      , timeListID = this._id('_time_listbox')
      , timeOptID  = this._id('_time_option')
      , dateListID = this._id('_cal')
      , owns;

    if (dateListID && this.props.calendar ) owns = dateListID
    if (timeListID && this.props.time )     owns += ' ' + timeListID

    return mergeIntoProps(
      _.omit(this.props, _.keys(propTypes)),
      <div ref="element"
           tabIndex="-1"
           onKeyDown={this._maybeHandle(this._keyDown)}
           onFocus={this._maybeHandle(_.partial(this._focus, true), true)}
           onBlur ={_.partial(this._focus, false)}
           className={cx({
              'rw-date-picker':     true,
              'rw-widget':          true,
              'rw-open':            this.props.open,
              'rw-state-focus':     this.state.focused,
              'rw-state-disabled':  this.isDisabled(),
              'rw-state-readonly':  this.isReadOnly(),
              'rw-has-both':        this.props.calendar && this.props.time,
              'rw-rtl':             this.isRtl()
            })}>
        <DateInput ref='valueInput'
          aria-activedescendant={ this.props.open
            ? this.props.open === popups.CALENDAR ? this._id('_cal_view_selected_item') : timeOptID
            : undefined }
          aria-expanded={ this.props.open }
          aria-busy={!!this.props.busy}
          aria-owns={owns}
          aria-haspopup={true}
          placeholder={this.props.placeholder}
          disabled={this.isDisabled()}
          readOnly={this.isReadOnly()}
          role='combobox'
          value={this.props.value}
          focused={this.state.focused}
          format={this.props.format}
          editFormat={this.props.editFormat}
          editing={this.state.focused}
          parse={this._parse}
          onChange={this._change} />

        <span className='rw-select'>
          { this.props.calendar &&
            <btn tabIndex='-1'
              disabled={this.isDisabled() || this.isReadOnly()}
              aria-disabled={this.isDisabled() || this.isReadOnly()}
              onClick={this._maybeHandle(_.partial(this._click, popups.CALENDAR))}>
              <i className="rw-i rw-i-calendar"><span className="rw-sr">{ this.props.messages.calendarButton }</span></i>
            </btn>
          }
          { this.props.time &&
            <btn tabIndex='-1'
              disabled={this.isDisabled() || this.isReadOnly()}
              aria-disabled={this.isDisabled() || this.isReadOnly()}
              onClick={this._maybeHandle(_.partial(this._click, popups.TIME))}>
              <i className="rw-i rw-i-clock-o"><span className="rw-sr">{ this.props.messages.timeButton }</span></i>
            </btn>
          }
        </span>
        { this.props.time &&
        <Popup
          open={ this.props.open === popups.TIME }
          onRequestClose={this.close}
          duration={this.props.duration}>
            <div>
              <Time ref="timePopup"
                id={timeListID}
                optID={timeOptID}
                aria-hidden={ !this.props.open }
                style={{ maxHeight: 200, height: 'auto' }}
                value={this.props.value}
                min={this.props.min}
                max={this.props.max}
                preserveDate={!!this.props.calendar}
                itemComponent={this.props.timeComponent}
                onSelect={this._maybeHandle(this._selectTime)}/>
            </div>
        </Popup>
        }
        { this.props.calendar &&
          <Popup
            className='rw-calendar-popup'
            open={ this.props.open === popups.CALENDAR}
            duration={this.props.duration}
            onRequestClose={this.close}>

            { mergeIntoProps(
              _.pick(this.props, _.keys(Calendar.type.propTypes)),
              <Calendar ref="calPopup"
                id={dateListID}
                value={this.props.value || new Date }
                maintainFocus={false}
                aria-hidden={ !this.props.open }
                onChange={this._maybeHandle(this._selectDate)}/>
            )}
          </Popup>
        }
      </div>
    )
  },

  _change: function(date, str, constrain){
    var change = this.props.onChange

    if(constrain)
      date = this.inRangeValue(date)

    if( change ) {
      if( date == null || this.props.value == null){
        if( date != this.props.value )
          change(date, str)
      }
      else if (!dates.eq(date, this.props.value))
        change(date, str)
    }
  },

  _keyDown: function(e){

    if( e.key === 'Tab')
      return

    if ( e.key === 'Escape' && this.props.open )
      this.close()

    else if ( e.altKey ) {
      e.preventDefault()

      if ( e.key === 'ArrowDown')
        this.open(this.props.open === popups.CALENDAR
              ? popups.TIME
              : popups.CALENDAR)
      else if ( e.key === 'ArrowUp')
        this.close()

    } else if (this.props.open ) {
      if( this.props.open === popups.CALENDAR )
        this.refs.calPopup._keyDown(e)
      if( this.props.open === popups.TIME )
        this.refs.timePopup._keyDown(e)
    }
  },

  //timeout prevents transitions from breaking focus
  _focus: function(focused, e){
    var self = this
      , input =  this.refs.valueInput;

    clearTimeout(self.timer)

    self.timer = setTimeout(function(){

      if(focused) input.getDOMNode().focus()
      else        self.close()

      if( focused !== self.state.focused)
        self.setState({ focused: focused })

    }, 0)
  },

  _selectDate: function(date){
    this.close()
    this._change(
        dates.merge(date, this.props.value)
      , formatDate(date, this.props.format)
      , true)
  },

  _selectTime: function(datum){
    this.close()
    this._change(
        dates.merge(this.props.value, datum.date)
      , formatDate(datum.date, this.props.format)
      , true)
  },

  _click: function(view, e){
    this._focus(true)
    this.toggle(view, e)
  },

  _parse: function(string){
    var parser = _.isFunction(this.props.parse)
          ? parse
          : _.partial(formatsParser, _.compact([ this.props.format ].concat(this.props.parse)) );

    return parser(string)
  },

  toggle: function(view, e) {

    this.props.open
      ? this.state.view !== view
          ? this.open(view)
          : this.close(view)
      : this.open(view)
  },

  open: function(view){
    if ( this.props.open !== view )
      this.notify('onToggle', view)
  },

  close: function(){
    if ( this.props.open)
      this.notify('onToggle', false)
  },

  inRangeValue: function(value){
    if( value == null) return value

    return dates.max(
        dates.min(value, this.props.max)
      , this.props.min)
  },

});

var btn = require('../common/btn.jsx')


module.exports = controlledInput.createControlledClass(
    'DateTimePicker', DateTimePicker
  , { open: 'onToggle', value: 'onChange' });

function formatDate(date, format){
  var val = ''

  if ( (date instanceof Date) && !isNaN(date.getTime()) )
    val = dates.format(date, format)

  return val;
}

function formatsParser(formats, str){
  var date;

  formats = [].concat(formats)

  for(var i=0; i < formats.length; i++ ){
    date = dates.parse(str, formats[i])
    if( date) return date
  }
  return null
}

