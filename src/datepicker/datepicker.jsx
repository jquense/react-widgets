var React = require('react/addons')
  , SlideDown = require('../common/slideup-transition.jsx')
  , cx  = React.addons.classSet
  , _   = require('lodash')
  , globalize = require('globalize')
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
      format:           'd',
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

  render: function(){
    var self = this
      , isCal = this.state.openPopup === 'calendar' 
      , key = (new Date()).getTime()
      
    return (
      <div ref="element"
           tabIndex="-1"
           className={cx({
              'rw-date-picker': true,
              'rw-widget':      true,
              'rw-open':        this.state.open,
              'rw-has-both':    this.props.calendar && this.props.time
            })}>
        <DateInput value={this.props.value} format={this.props.format} parse={this._parse} onChange={this._change} />
        <span className='rw-select'>
          { this.props.calendar &&
            <btn onClick={this.toggle.bind(null, 'calendar')}>
              <i className="rw-i rw-i-calendar"><span className="rw-sr">{ this.props.messages.calendarButton }</span></i>
            </btn>
          }
          { this.props.time &&
            <btn onClick={this.toggle.bind(null, 'time')}>
              <i className="rw-i rw-i-clock-o"><span className="rw-sr">{ this.props.messages.timeButton }</span></i>
            </btn>
          }
        </span>
        <Popup getAnchor={ this._getAnchor } open={this.state.open} height={isCal ? 'auto' : 200 } onClose={closed.bind(this)} onRequestClose={this.close}>
          { isCal
            ? <Calendar ref="popup" value={this.props.value} min={this.props.min} max={this.props.max} onChange={this._select}/>
            : <Time     ref="popup" value={this.props.value} min={this.props.min} max={this.props.max} onChange={this._select}/>
          }
        </Popup>
      </div>
    )

    function closed(){
      this.refs.element.getDOMNode().focus()
    }
  },

  _select: function(date){
    this.close()
    this.props.onChange(date)
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
      ? this.close(view) 
      : this.open(view)
  },

  open: function(view){
    this.setState({ open: true, openPopup: view }, function(){
      this.refs.popup.getDOMNode().focus()
    })
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

