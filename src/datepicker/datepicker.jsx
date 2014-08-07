var React = require('react/addons')
  , cx  = React.addons.classSet
  , _   = require('lodash')
  , dates     = require('../util/dates')
  , Popup     = require('../popup/popup.jsx')
  , Calendar  = require('./calendar.jsx')
  , Time      = require('./time.jsx')
  , DateInput = require('./date-input.jsx')


module.exports = React.createClass({

  propTypes: {
    
    value:        React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),

    culture:      React.PropTypes.string,
    format:       React.PropTypes.string,
    onChange:     React.PropTypes.func.isRequired,

    parse:        React.PropTypes.oneOfType([
                    React.PropTypes.arrayOf(React.PropTypes.string),
                    React.PropTypes.string,
                    React.PropTypes.func
                  ]),
  },

  getInitialState: function(){
    return {
      selectedIndex: 0,
      open:          false,
      openPopup:     null    
    }
  },

  getDefaultProps: function(){
    return {
      value:            null,
      format:           'M/d/yyyy h:mm tt',
      min:              new Date(1900,  0,  1),
      max:              new Date(2099, 11, 31),
      calendar:         true,
      time:             true,
      messages: {
        calendarButton: 'Select Date',
        timeButton:     'Select Time'
      }
    }
  },

  componentDidMount: function() {
    this.setTimeDimensions()
  },

  render: function(){
    var self = this
      , key = (new Date()).getTime()
      , popupStyle = { 
          width:  this.state.timeWidth, 
          height: this.state.timeHeight }
      
    return (
      <div ref="element"
           tabIndex="-1"
           onKeyDown={this._keyDown}
           className={cx({
              'rw-date-picker': true,
              'rw-widget':      true,
              'rw-open':        this.state.open,
              'rw-state-focus': this.state.focused,
              'rw-has-both':    this.props.calendar && this.props.time
            })}>
        <DateInput ref='valueInput' 
          value={this.props.value} 
          focused={this.state.focused} 
          format={this.props.format} 
          parse={this._parse} 
          onFocus={this._focus.bind(null, true)} 
          onBlur ={this._focus.bind(null, false)}
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
        <Popup 
          getAnchor={ this._getAnchor } 
          style={popupStyle}
          open={this.state.open && this.state.openPopup === 'time'} 
          onClose={closed.bind(this)} 
          onRequestClose={this.close}>

            <Time ref="timePopup" 
              value={this.props.value} 
              min={this.props.min} 
              max={this.props.max} 
              onChange={this._selectTime}/>
        </Popup>
        }
        { this.props.calendar &&
          <Popup 
            getAnchor={ this._getAnchor } 
            style={{ width: 200 }} 
            open={this.state.open && this.state.openPopup === 'calendar'} 
            onClose={closed.bind(this)} 
            onRequestClose={this.close}>

              <Calendar ref="calPopup" 
                value={this.props.value} 
                min={this.props.min} 
                max={this.props.max} 
                onChange={this._selectDate}/>
          </Popup>
        }
      </div>
    )

    function closed(){
      //this.refs.element.getDOMNode().focus()
    }
  },

  setTimeDimensions: function() {
    if( !this.refs.timePopup) return

    var el = $(this.refs.timePopup.getDOMNode())
      , ht = el.height() > 200 ? 200 : el.height()
      , width = $(this.getDOMNode()).width()
      , changed = width !== this.state.timeWidth || ht !== this.state.timeHeight;

    if ( changed ){
      this.setState({
        timeHeight: ht,
        timeWidth:  width
      })
    }
  },

  _keyDown: function(e){
    
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

  _focus: function(focused){
    this.setState({
      focused: focused
    })
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

  _change: function(date, text){
    console.log(date, text)
  },

  _parse: function(string){
    var parser = _.isFunction(this.props.parse)
          ? parse 
          : _.partial(formatsParser, _.compact([ this.props.format ].concat(this.props.parse)) );

    return parser(string)    
  },

  toggle: function(view, e){
    e && e.nativeEvent.stopImmediatePropagation();

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
  },

  _getAnchor: function(){
    return this.refs.element.getDOMNode()
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

