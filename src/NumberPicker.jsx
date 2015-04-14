'use strict';
var React = require('react')
  , cx    = require('classnames')
  , _     = require('./util/_') //omit
  , compat = require('./util/compat')
  , CustomPropTypes = require('./util/propTypes')
  , createUncontrolledWidget = require('uncontrollable')
  , directions = require('./util/constants').directions
  , repeater = require('./util/repeater')
  , Input = require('./NumberInput');

var Btn = require('./WidgetButton')
  , propTypes = {

      // -- controlled props -----------
      value:          React.PropTypes.number,
      onChange:       React.PropTypes.func,
      //------------------------------------

      min:            React.PropTypes.number,
      max:            React.PropTypes.number,
      step:           React.PropTypes.number,

      culture:        React.PropTypes.string,

      format:         CustomPropTypes.localeFormat,

      name:           React.PropTypes.string,

      parse:          React.PropTypes.func,

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
    require('./mixins/TimeoutMixin'),
    require('./mixins/PureRenderMixin'),
    require('./mixins/RtlParentContextMixin'),
  ],

  propTypes: propTypes,

  getDefaultProps(){
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

  getInitialState(){
    return {
      focused: false,
      active: false,
    }
  },


  render(){
    var {
        className
      , onKeyDown
      , onKeyPress
      , onKeyUp
      , ...props } = _.omit(this.props, Object.keys(propTypes))
      , val = this.constrainValue(this.props.value)

    return (
      <div {...props }
        ref="element"
        onKeyDown={this._keyDown}
        onFocus={this._focus.bind(null, true)}
        onBlur ={this._focus.bind(null, false)}
        tabIndex="-1"
        className={cx(className, 'rw-numberpicker', 'rw-widget', {
          'rw-state-focus':     this.state.focused,
          'rw-state-disabled':  this.props.disabled,
          'rw-state-readonly':  this.props.readOnly,
          'rw-rtl':             this.isRtl()
        })}>

        <span className='rw-select'>
          <Btn
            tabIndex='-1'
            className={cx({ 'rw-state-active': this.state.active === directions.UP})}
            onMouseDown={this._mouseDown.bind(null, directions.UP)}
            onMouseUp={this._mouseUp.bind(null, directions.UP)}
            onClick={this._focus.bind(null, true)}
            disabled={val === this.props.max || this.props.disabled}
            aria-disabled={val === this.props.max || this.props.disabled}>

            <i className="rw-i rw-i-caret-up">
              <span className="rw-sr">{ this.props.messages.increment }</span>
            </i>
          </Btn> 
          <Btn
            tabIndex='-1'
            className={cx({ 'rw-state-active': this.state.active === directions.DOWN})}
            onMouseDown={this._mouseDown.bind(null, directions.DOWN)}
            onMouseUp={this._mouseUp.bind(null, directions.DOWN)}
            onClick={this._focus.bind(null, true)}
            disabled={val === this.props.min || this.props.disabled}
            aria-disabled={val === this.props.min || this.props.disabled}>

            <i className="rw-i rw-i-caret-down">
              <span className="rw-sr">{ this.props.messages.decrement }</span>
            </i>
          </Btn>
        </span>
        <Input
          ref='input'
          value={val}
          editing={this.state.focused}
          format={this.props.format}
          parse={this.props.parse}
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
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}/>
      </div>
    )
  },

  //allow for styling, focus stealing keeping me from the normal what have you
  _mouseDown: _.ifNotDisabled(function (dir) {
    var val = dir === directions.UP
        ? (this.props.value || 0) + this.props.step
        : (this.props.value || 0) - this.props.step

    val = this.constrainValue(val)

    this.setState({ active: dir })
    this.change(val);

    if( !((dir === directions.UP && val === this.props.max)
      || (dir === directions.DOWN && val === this.props.min)))
    {
      if(!this._cancelRepeater)
        this._cancelRepeater = repeater(500, this._mouseDown.bind(null, dir))
    }
    else
      this._mouseUp()
  }),

  _mouseUp: _.ifNotDisabled(function (direction, e ){
    this.setState({ active: false })
    this._cancelRepeater()
    this._cancelRepeater = null;
  }),

  _focus: _.ifNotDisabled(true, function(focused, e){

    this.setTimeout('focus', () => {
      var el = compat.findDOMNode(this.refs.input)

      focused && el.focus()

      if( focused !== this.state.focused){
        this.notify(focused ? 'onFocus' : 'onBlur', e)
        this.setState({ focused: focused })
      }

    }, 0)
  }),

  _keyDown: _.ifNotDisabled(function(e) {
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
  }),

  increment() {
    this.change(this.constrainValue((this.props.value || 0) + this.props.step))
  },

  decrement(){
    this.change(this.constrainValue((this.props.value || 0) - this.props.step))
  },

  change(val){
    val = this.constrainValue(val)

    if ( this.props.value !== val )
      this.notify('onChange', val)
  },

  constrainValue(value){
    var max = this.props.max == null ? Infinity : this.props.max
      , min = this.props.min == null ? -Infinity : this.props.min;

    if( value == null || value === '' )
      return null

    return Math.max(Math.min(value, max), min)
  }

})

module.exports = createUncontrolledWidget(
    NumberPicker, { value: 'onChange' });

module.exports.BaseNumberPicker = NumberPicker