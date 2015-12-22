import React from 'react';
import CustomPropTypes from './util/propTypes';
import { number as numberLocalizer }  from './util/localizers';

var format = props => numberLocalizer.getFormat('default', props.format)

export default React.createClass({

  displayName: 'NumberPickerInput',

  propTypes: {
    value:        React.PropTypes.number,
    placeholder: React.PropTypes.string,

    format:       CustomPropTypes.numberFormat,
    parse:        React.PropTypes.func.isRequired,
    culture:      React.PropTypes.string,

    min:          React.PropTypes.number,

    onChange:     React.PropTypes.func.isRequired,
    onKeyDown:    React.PropTypes.func
  },

  getDefaultProps(){
    return {
      value: null,
      editing: false,
      parse: (number, culture) => numberLocalizer.parse(number, culture)
    }
  },

  getDefaultState(props){
    var value = props.editing
          ? props.value
          : formatNumber(props.value, format(props), props.culture)

    this._beginningWithSign = false;

    if (value == null || isNaN(props.value))
      value = ''

    return {
      stringValue: '' + value
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
        onKeyPress={this._typing}
        aria-disabled={this.props.disabled}
        aria-readonly={this.props.readOnly}
        disabled={this.props.disabled}
        readOnly={this.props.readOnly}
        placeholder={this.props.placeholder}
        value={value}/>
    )
  },

  _typing(e) {
    var current = e.target.value
      , newVal = e.key;

    this._beginningWithSign = current.trim() === '' && this.isSign(newVal)
  },

  _change(e) {
    var val = e.target.value
      , number = this.props.parse(e.target.value, this.props.culture)
      , atSign = this.isSign(val.trim())
      , startingWithSign = this._beginningWithSign;

    this._beginningWithSign = false;

    if (val == null || val.trim() === '' || (atSign && !startingWithSign)) {
      this.current('')
      return this.props.onChange(null)
    }

    if (this.isFlushable(number, val))
      return this.props.onChange(number)

    if (!isNaN(number) || (atSign && startingWithSign) || this.isAtDelimiter(number, val))
      this.current(e.target.value)
  },

  _finish() {
    var str = this.state.stringValue
      , number = this.props.parse(str, this.props.culture);

    // if number is below the min
    // we need to flush low values and decimal stops, onBlur means i'm done inputing
    if(!isNaN(number) && (number < this.props.min || this.isAtDelimiter(number, str)) ) {
      this.props.onChange(number)
    }
  },

  _parse(strVal) {
    let culture = this.props.culture
      , format = this.props.editFormat
      , userParse = this.props.parse;

    if (userParse)
      return userParse(strVal, culture)

    return format ? numberLocalizer.parse(strVal, culture) : +strVal
  },

  isFlushable(num, str) {
    return (
         this.isValid(num)
      && num !== this.props.value
      && !this.isAtDelimiter(num, str)
      && !this.isSign(str)
    )
  },

  isSign(val) {
    return (val || '').trim() === '-';
  },

  isAtDelimiter(num, str) {
    var next;

    if (str.length <= 1) return false

    next = this.props.parse(
      str.substr(0, str.length - 1), this.props.culture)

    return typeof next === 'number'
        && !isNaN(next)
        && next === num
  },

  isValid(num) {
    if (typeof num !== 'number' || isNaN(num))
      return false
    return num >= this.props.min
  },

  //this intermediate state is for when one runs into the decimal or are typing the number
  current(val) {
    this.setState({ stringValue: val })
  }

});


function formatNumber(number, format, culture){
  return numberLocalizer.format(number, format, culture)
}
