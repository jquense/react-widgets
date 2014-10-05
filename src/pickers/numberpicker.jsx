var React  = require('react')
  , cx = require('../util/cx')
  , _      = require('lodash')
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , directions = require('../util/constants').directions
  , Input = require('./number-input.jsx');

var btn = require('../common/btn.jsx')
  , propTypes = {

      value:          React.PropTypes.number,
      onChange:       React.PropTypes.func,

      min:            React.PropTypes.number,
      max:            React.PropTypes.number,
      step:           React.PropTypes.number,

      culture:        React.PropTypes.string,
      format:         React.PropTypes.string,
      
      parse:          React.PropTypes.oneOfType([
                        React.PropTypes.arrayOf(React.PropTypes.string),
                        React.PropTypes.string,
                        React.PropTypes.func
                      ]),

      messages:       React.PropTypes.shape({
        increment:    React.PropTypes.string,
        decrement:    React.PropTypes.string
      })
    };

module.exports = React.createClass({

  displayName: 'NumberPicker',

  mixins: [ 
    require('../mixins/PureRenderMixin'),
    require('../mixins/RtlParentContextMixin'),  
  ],

  propTypes: propTypes,

  getDefaultProps: function(){
    return {
      format: 'd',

      min: -Infinity,
      max:  Infinity,
      step: 1,

      messages: {
        increment: 'increment value',
        decrement:  'decrement value'
      }
    }
  },

  getInitialState: function(){
    return { 
      focused: false,
      active: false,
    }
  },


  render: function(){ 
    var self = this
      , val = this.inRangeValue(this.props.value)

    //console.log('render', this.state.focused)

    return mergeIntoProps(
      _.omit(this.props, _.keys(propTypes)),
      <div ref="element"
           onKeyDown={this._maybeHandle(this._keyDown)}
           onFocus={this._maybeHandle(_.partial(this._focus, true), true)} 
           onBlur ={_.partial(this._focus, false)}
           tabIndex="-1"
           className={cx({
              'rw-number-picker': true,
              'rw-widget':       true,
              'rw-state-focus':  this.state.focused,
              'rw-rtl':          this.isRtl()
            })}>

        <span className='rw-select'>
          <btn 
            tabIndex='-1'
            className={cx({ 'rw-state-active': this.state.active === directions.UP})}
            onMouseDown={this._maybeHandle(_.partial(self._mouseDown, directions.UP))} 
            onMouseUp={this._maybeHandle(_.partial(this._mouseUp, directions.UP))} 
            onClick={this._maybeHandle(_.partial(this._focus, true))} 
            disabled={val === this.props.min || this.props.disabled}
            aria-disabled={val === this.props.max || this.props.disabled}>

            <i className="rw-i rw-i-caret-up"><span className="rw-sr">{ this.props.messages.increment }</span></i>
          </btn>
          <btn 
            tabIndex='-1'
            className={cx({ 'rw-state-active': this.state.active === directions.DOWN})}
            onMouseDown={this._maybeHandle(_.partial(self._mouseDown, directions.DOWN))} 
            onMouseUp={this._maybeHandle(_.partial(this._mouseUp, directions.DOWN))} 
            onClick={this._maybeHandle(_.partial(this._focus, true))}
            disabled={val === this.props.min || this.props.disabled}
            aria-disabled={val === this.props.min || this.props.disabled}>

            <i className="rw-i rw-i-caret-down"><span className="rw-sr">{ this.props.messages.decrement }</span></i>
          </btn>
        </span>
        <Input
          ref='input'
          value={val}
          editing={this.state.focused}
          format={this.props.format}
          role='spinbutton'
          aria-valuenow={val}
          aria-valuemin={_.isFinite(this.props.min) ? this.props.min : '' }
          aria-valuemax={_.isFinite(this.props.max) ? this.props.max : '' }
          aria-disabled={ this.props.disabled }
          aria-readonly={ this.props.readonly }
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          onChange={this.change}
          onKeyDown={this.props.onKeyDown}/>
      </div>
    )
  },

  //allow for styling, focus stealing keeping me from the normal what have you
  _mouseDown: function(direction, e) {
    var self = this
      , method = direction === directions.UP ? this.increment : this.decrement
    
    this.setState({ active: direction })

    method()
    this.interval = setInterval(method, 800)
  },

  _mouseUp: function(direction, e ){
    this.setState({ active: false })
    clearInterval(this.interval)
  },

  _focus: function(focused, e){
    var self = this;

    clearTimeout(self.timer)

    self.timer = setTimeout(function(){
      var el = self.refs.input.getDOMNode()

      focused && el.focus()

      if( focused !== self.state.focused)
        self.setState({ focused: focused })

    }, 0)
  },

  _keyDown: function(e){
    var key = e.key;

    if ( key === 'End'  && _.isFinite(this.props.max)) 
      this.change(this.props.max)
    
    else if ( key === 'Home' && _.isFinite(this.props.min)) 
      this.change(this.props.min)

    else if ( key === 'ArrowDown' ){
      e.preventDefault()
      this.decrement()
    }
    else if ( key === 'ArrowUp' ){
      e.preventDefault()
      this.increment()
    }

  },

  _maybeHandle: function(handler, disabledOnly){
    if ( !(this.props.disabled || (!disabledOnly &&this.props.readOnly)))
      return handler
  },

  increment: function() {
    this.change(this.props.value + this.props.step)
  },

  decrement: function(){
    this.change(this.props.value - this.props.step)
  },

  change: function(val){
    var change = this.props.onChange 

    val = this.inRangeValue(val)

    if ( change && this.props.value !== val ) 
      change(val)
  },

  inRangeValue: function(value){
    return Math.max(
        Math.min(value, this.props.max)
      , this.props.min)
  }
})
