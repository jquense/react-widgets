var React = require('react')
  , cx = require('../util/cx')
  , _   = require('lodash')
  , dates     = require('../util/dates')
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , Popup     = require('../popup/popup.jsx')
  , Calendar  = require('../calendar/calendar.jsx')
  , Time      = require('./time.jsx')
  , DateInput = require('./date-input.jsx')
  , $  =  require('../util/dom');

var propTypes = {
    
    value:          React.PropTypes.instanceOf(Date),
    onChange:       React.PropTypes.func,

    min:            React.PropTypes.instanceOf(Date),
    max:            React.PropTypes.instanceOf(Date),

    culture:        React.PropTypes.string,
    format:         React.PropTypes.string,
    
    calendar:       React.PropTypes.bool,
    time:           React.PropTypes.bool,

    timeComponent:  React.PropTypes.func,

    parse:          React.PropTypes.oneOfType([
                      React.PropTypes.arrayOf(React.PropTypes.string),
                      React.PropTypes.string,
                      React.PropTypes.func
                    ]),
  }


module.exports = React.createClass({
  displayName: 'DateTimePicker',

  mixins: [ 
    require('../mixins/PureRenderMixin'),
    require('../mixins/RtlParentContextMixin') 
  ],
  
  propTypes: propTypes,

  getInitialState: function(){
    return {
      selectedIndex: 0,
      open:          false,
      openPopup:     null    
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
      , id   = this.props.id
      , timeListID = id && id + '_time_listbox'
      , dateListID = id && id + '_date_listbox'
      , timeOptID  = id && id + '_time_option'
      , dateOptID  = id && id + '_table_selected_item'
      , owns;

    if (dateListID && this.props.calendar ) owns = dateListID
    if (timeListID && this.props.time )     owns += ' ' + timeListID

    return mergeIntoProps(
      _.omit(this.props, _.keys(propTypes)),
      <div ref="element"
           tabIndex="-1"
           aria-expanded={ this.state.open }
           aria-haspopup={true}
           onKeyDown={this._keyDown}
           onFocus={this._focus.bind(null, true)} 
           onBlur ={this._focus.bind(null, false)}
           className={cx({
              'rw-date-picker': true,
              'rw-widget':      true,
              'rw-open':        this.state.open,
              'rw-state-focus': this.state.focused,
              'rw-has-both':    this.props.calendar && this.props.time,
              'rw-rtl':         this.isRtl()
            })}>
        <DateInput ref='valueInput' 
          aria-activedescendant={this.state.open 
            ? this.state.openPopup === 'calendar' ? dateOptID : timeOptID
            : undefined}
          aria-expanded={ this.state.open }
          aria-busy={!!this.props.busy}
          aria-owns={owns}
          role='combobox'
          value={this.props.value} 
          focused={this.state.focused} 
          format={this.props.format} 
          parse={this._parse}  
          onChange={this.props.onChange} />

        <span className='rw-select'>
          { this.props.calendar &&
            <btn onClick={this._click.bind(null, 'calendar')}>
              <i className="rw-i rw-i-calendar"><span className="rw-sr">{ this.props.messages.calendarButton }</span></i>
            </btn>
          }
          { this.props.time &&
            <btn onClick={this._click.bind(null, 'time')}>
              <i className="rw-i rw-i-clock-o"><span className="rw-sr">{ this.props.messages.timeButton }</span></i>
            </btn>
          }
        </span>
        { this.props.time &&
        <Popup open={this.state.open && this.state.openPopup === 'time'} onRequestClose={this.close}>
            <div>
              <Time ref="timePopup" 
                id={timeListID}
                optID={timeOptID}
                aria-hidden={ !this.state.open }
                style={{ maxHeight: 200, height: 'auto' }}
                value={this.props.value} 
                min={this.props.min} 
                max={this.props.max} 
                itemComponent={this.props.timeComponent}
                onChange={this._selectTime}/>
            </div>
        </Popup>
        }
        { this.props.calendar &&
          <Popup  
            className='rw-calendar-popup' 
            open={this.state.open && this.state.openPopup === 'calendar'} 
            onRequestClose={this.close}>

            { mergeIntoProps(
              _.pick(this.props, _.keys(Calendar.type.propTypes)),
              <Calendar ref="calPopup"   
                id={dateListID}
                value={this.props.value || new Date }
                maintainFocus={false}
                aria-hidden={ !this.state.open }
                onChange={this._selectDate}/>
            )}
          </Popup>
        }
      </div>
    )
  },

  _keyDown: function(e){
    
    if( e.key === 'Tab') 
      return 

    if ( e.altKey ) {
      e.preventDefault()

      if ( e.key === 'ArrowDown') 
        this.open( !this.state.open
          ? this.state.openPopup
          : this.state.openPopup === 'time' 
              ? 'calendar' 
              : 'time')
      else if ( e.key === 'ArrowUp')
        this.close()

    } else if (this.state.open ) {
      if( this.state.openPopup === 'calendar' )
        this.refs.calPopup._keyDown(e)
      if( this.state.openPopup === 'time' )
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
    this.props.onChange(
      dates.merge(date, this.props.value))
  },

  _selectTime: function(datum){
    this.close()
    this.props.onChange(
      dates.merge(this.props.value, datum.date))
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

    this.state.open 
      ? this.state.view !== view 
          ? this.open(view)
          : this.close(view) 
      : this.open(view)
  },

  open: function(view){
    this.setState({ open: true, openPopup: view }) 
  },

  close: function(){
    this.setState({ open: false })
  }

});

var btn = require('../common/btn.jsx')

function formatsParser(formats, str){
  var date;

  formats = [].concat(formats)

  for(var i=0; i < formats.length; i++ ){
    date = dates.parse(str, formats[i])
    if( date) return date
  }
  return null
}

