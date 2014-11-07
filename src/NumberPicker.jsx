'use strict';
var React = require('react')
  , cx    = require('./util/cx')
  , _     = require('./util/_') //omit
  , controlledInput  = require('./util/controlledInput')
  , directions = require('./util/constants').directions
  , Input = require('./NumberInput.jsx');

var Btn = require('./WidgetButton.jsx')
  , propTypes = {

      // -- controlled props -----------
      value:          React.PropTypes.number,
      onChange:       React.PropTypes.func,
      //------------------------------------

      min:            React.PropTypes.number,
      max:            React.PropTypes.number,
      step:           React.PropTypes.number,

      culture:        React.PropTypes.string,
      format:         React.PropTypes.string,

      name:           React.PropTypes.string,

      parse:          React.PropTypes.oneOfType([
                        React.PropTypes.arrayOf(React.PropTypes.string),
                        React.PropTypes.string,
                        React.PropTypes.func
                      ]),

      disabled:       React.PropTypes.oneOfType([
                        React.PropTypes.bool,
                        React.PropTypes.oneOf(['disabled'])
                      ]),

      readOnly:       React.PropTypes.oneOfType([
                        React.PropTypes.bool,
                        React.PropTypes.oneOf(['readOnly'])
                      ]),

      messages:       React.PropTypes.shape({
        increment:    React.PropTypes.string,
        decrement:    React.PropTypes.string
      })
    };

var NumberPicker = React.createClass({

  displayName: 'NumberPicker',

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/PureRenderMixin'),
    require('./mixins/RtlParentContextMixin'),
  ],

  propTypes: propTypes,

  getDefaultProps: function(){
    return {
      value: null,
      open: false,

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
    var {className, ...props} = _.omit(this.props, Object.keys(propTypes))
      , val = this.inRangeValue(this.props.value)

    //console.log('render', this.state.focused)

    return (
      <div {...props }
        ref="element"
        onKeyDown={this._maybeHandle(this._keyDown)}
        onFocus={this._maybeHandle(this._focus.bind(null, true), true)}
        onBlur ={this._focus.bind(null, false)}
        tabIndex="-1"
        className={cx(className, {
          'rw-number-picker':   true,
          'rw-widget':          true,
          'rw-state-focus':     this.state.focused,
          'rw-state-disabled':  this.props.disabled,
          'rw-state-readonly':  this.props.readOnly,
          'rw-rtl':             this.isRtl()
        })}>

        <span className='rw-select'>
          <Btn
            tabIndex='-1'
            className={cx({ 'rw-state-active': this.state.active === directions.UP})}
            onMouseDown={this._maybeHandle(this._mouseDown.bind(null, directions.UP))}
            onMouseUp={this._maybeHandle(this._mouseUp.bind(null, directions.UP))}
            onClick={this._maybeHandle(this._focus.bind(null, true))}
            disabled={val === this.props.max || this.props.disabled}
            aria-disabled={val === this.props.max || this.props.disabled}>

            <i className="rw-i rw-i-caret-up"><span className="rw-sr">{ this.props.messages.increment }</span></i>
          </Btn>
          <Btn
            tabIndex='-1'
            className={cx({ 'rw-state-active': this.state.active === directions.DOWN})}
            onMouseDown={this._maybeHandle(this._mouseDown.bind(null, directions.DOWN))}
            onMouseUp={this._maybeHandle(this._mouseUp.bind(null, directions.DOWN))}
            onClick={this._maybeHandle(this._focus.bind(null, true))}
            disabled={val === this.props.min || this.props.disabled}
            aria-disabled={val === this.props.min || this.props.disabled}>
            <i className="rw-i rw-i-caret-down"><span className="rw-sr">{ this.props.messages.decrement }</span></i>
          </Btn>
        </span>
        <Input
          ref='input'
          value={val}
          editing={this.state.focused}
          format={this.props.format}
          name={this.props.name}
          role='spinbutton'
          min={this.props.min}
          aria-valuenow={val}
          aria-valuemin={isFinite(this.props.min) ? this.props.min : null }
          aria-valuemax={isFinite(this.props.max) ? this.props.max : null }
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
  _mouseDown: function(dir) {
    var val = dir === directions.UP
        ? (this.props.value || 0) + this.props.step
        : (this.props.value || 0) - this.props.step

    val = this.inRangeValue(val)

    this.setState({ active: dir })
    this.change(val);

    if( !((dir === directions.UP && val === this.props.max)
      || (dir === directions.DOWN && val === this.props.min)))
    {
      if(!this.interval)
        this.interval = setInterval(this._mouseDown, 500, dir)
    }
    else
      this._mouseUp()
  },

  _mouseUp: function(direction, e ){
    this.setState({ active: false })
    clearInterval(this.interval)
    this.interval = null;
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

    if ( key === 'End'  && isFinite(this.props.max))
      this.change(this.props.max)

    else if ( key === 'Home' && isFinite(this.props.min))
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

  increment: function() {
    this.change(this.inRangeValue((this.props.value || 0) + this.props.step))
  },

  decrement: function(){
    this.change(this.inRangeValue((this.props.value || 0) - this.props.step))
  },

  change: function(val){
    val = this.inRangeValue(val === '' ? null : val)

    if ( this.props.value !== val )
      this.notify('onChange', val)
  },

  inRangeValue: function(value){
    var max = this.props.max == null ? Infinity : this.props.max
      , min = this.props.min == null ? -Infinity : this.props.min;

    if( !isFinite(min) && value == null )
      return value

    return Math.max(Math.min(value, max), min)
  }

})

module.exports = controlledInput.createControlledClass(
    NumberPicker, { value: 'onChange' });

module.exports.BaseNumberPicker = NumberPicker