var React = require('react/addons')
  , SlideDown = require('../common/collapse-transition.jsx')
  , cx = React.addons.classSet
  , _ = require('lodash')
  , globalize = require('globalize')
  , Popup = require('../popup/popup.jsx')
  , Calendar = require('./calendar.jsx')
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
      open:          false
    }
  },

  getDefaultProps: function(){
    return {
      value:      null,
      format:     'd',
      min:        new Date(1900,  0,  1),
      max:        new Date(2099, 11, 31),
      calendar:   true,
      time:       false,
    }
  },

  render: function(){
    var self = this
      , key = (new Date()).getTime()
      
    return (
      <div ref="element"
           tabIndex="-1"
           className={cx({
              'rw-date-picker': true,
              'rw-widget':      true,
              'rw-has-both':    this.props.calendar && this.props.time
            })}>
        <DateInput value={this.props.value} format={this.props.format} parse={this._parse} onChange={this._change} />
        <span className='rw-select'>
          { this.props.calendar &&
            <btn onClick={this.toggle}>
              <i className="rw-i rw-i-calendar"><span className="rw-sr">Open Calendar</span></i>
            </btn>
          }
          { this.props.time &&
            <btn onClick={this.toggle}>
              <i className="rw-i rw-i-clock-o"><span className="rw-sr">Open Calendar</span></i>
            </btn>
          }
        </span>
        <SlideDown>
        { this.state.open && (
          <Popup getAnchor={ this._getAnchor } onShouldClose={this.close} key={key}>
            <Calendar ref="calendar"
                value={this.props.value} 
                onChange={this._select}/>
          </Popup>) || []
        }
        </SlideDown>
      </div>
    )

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

  toggle: function(){
    this.state.open 
      ? this.close() 
      : this.open()
  },

  open: function(){
    this.setState({ open: true }, function(){
      this.refs.calendar.getDOMNode().focus()
    })
  },

  close: function(){
    this.setState({ open: false }, function(){
      this.refs.element.getDOMNode().focus()
    })
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
    date = globalize.parseDate(str, formats[i])
    if( date) return date
  }
  return null
}

