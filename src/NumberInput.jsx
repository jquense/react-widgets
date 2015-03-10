'use strict';
var React   = require('react')
  , CustomPropTypes = require('./util/propTypes')
  , globalize = require('globalize');


module.exports = React.createClass({

  displayName: 'NumberPickerInput', 

  propTypes: {
    value:        React.PropTypes.number,

    format:       CustomPropTypes.localeFormat.isRequired,
    parse:        React.PropTypes.func.isRequired,
    culture:      React.PropTypes.string,

    min:          React.PropTypes.number,
    
    onChange:     React.PropTypes.func.isRequired,
    onKeyDown:    React.PropTypes.func,
  },

  getDefaultProps(){
    return {
      value: null,
      format: 'd',
      editing: false,
      parse: (number, culture) => globalize.parseFloat(number, 10, culture)
    }
  },

  getDefaultState(props){
    var value = props.editing 
          ? props.value
          : formatNumber(props.value, props.format, props.culture)

    if ( value == null || isNaN(props.value) ) 
      value = ''

    return { 
      stringValue: ""+ value
    }
  },

  getInitialState() {
    return this.getDefaultState(this.props)
  },

  componentWillReceiveProps(nextProps) {
    this.setState(
      this.getDefaultState(nextProps))
  },

  render(){
    var value = this.state.stringValue;

    return (
      <input {...this.props}
        type='text' 
        className='rw-input'
        onChange={this._change}
        onBlur={this._finish}
        aria-disabled={this.props.disabled}
        aria-readonly={this.props.readOnly}
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
        value={value}/>
    )
  },

  _change(e){
    var val = e.target.value
      , number = this.props.parse(e.target.value, this.props.culture)
      , isNull = val !== 0 && !val
      , hasMin = this.props.min && isFinite(this.props.min)

    //a null value is only possible when there is no min
    if(!hasMin && isNull)
      return this.props.onChange(null)

    if(this.isValid(number) && number !== this.props.value)
      return this.props.onChange(number)

    //console.log(val !== 0 && !val)
    this.current(e.target.value)
  },

  _finish(e){
    var number = this.props.parse(
            this.state.stringValue
          , this.props.culture);

    // if number is below the min
    // we need to flush low values eventually, onBlur means i'm done inputing
    if(!isNaN(number) && number < this.props.min) {
      this.props.onChange(number)
    }
  },

  isValid(num) {
    if(typeof num !== 'number' || isNaN(num)) 
      return false
    return num >= this.props.min
  },

  //this intermediate state is for when one runs into the decimal or are typing the number
  current(val){
    this.setState({ stringValue: val })
  }

});


function parseLocaleFloat(number, parser, culture) {
  if ( typeof format === 'function')
    return format(number, culture)

  return globalize.parseFloat(number, 10, culture)
}

function formatNumber(number, format, culture){
  if ( typeof format === 'function')
    return format(number, culture)

  return globalize.format(number, format, culture)
}