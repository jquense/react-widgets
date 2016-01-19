import React from 'react';
import CustomPropTypes from './util/propTypes';
import { number as numberLocalizer }  from './util/localizers';

let getFormat = props => numberLocalizer.getFormat('default', props.format)

export default React.createClass({

  displayName: 'NumberPickerInput',

  propTypes: {
    value:        React.PropTypes.number,
    placeholder: React.PropTypes.string,

    format:       CustomPropTypes.numberFormat,

    parse:        React.PropTypes.func,
    culture:      React.PropTypes.string,

    min:          React.PropTypes.number,

    onChange:     React.PropTypes.func.isRequired,
    onKeyDown:    React.PropTypes.func
  },

  getDefaultProps(){
    return {
      value: null,
      editing: false
    }
  },

  getDefaultState(props = this.props){
    var value = props.value
      , decimal = numberLocalizer.decimalChar(null, props.culture)
      , format = getFormat(props);

    this._beginningWithSign = false;

    if (value == null || isNaN(props.value))
      value = ''
    else
      value = props.editing
        ? ('' + value).replace('.', decimal)
        : numberLocalizer.format(value, format, props.culture)

    return {
      stringValue: '' + value
    }
  },

  getInitialState() {
    return this.getDefaultState()
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

    this.props.onKeyPress
      && this.props.onKeyPress(e)
  },

  _change(e) {
    var val = e.target.value
      , number = this._parse(e.target.value)
      , atSign = this.isSign(val.trim())
      , startingWithSign = this._beginningWithSign;

    this._beginningWithSign = false;

    if (val == null || val.trim() === '' || (atSign && !startingWithSign)) {
      this.current('')
      return this.props.onChange(null)
    }

    if (this.isFlushable(number, val)) {
      if (number !== this.props.value)
        return this.props.onChange(number)
      else
        this.setState(this.getDefaultState()) // 5. -> 5
    }

    if (number < this.props.min || (atSign && startingWithSign) || this.isAtDelimiter(number, val))
      this.current(e.target.value)
  },

  _finish() {
    var str = this.state.stringValue
      , number = this._parse(str);

    // if number is below the min
    // we need to flush low values and decimal stops, onBlur means i'm done inputing
    if (!isNaN(number) && (number < this.props.min || this.isAtDelimiter(number, str)) ) {
      this.props.onChange(number)
    }
  },

  _parse(strVal) {
    let culture = this.props.culture
      , delimChar = numberLocalizer.decimalChar(null, culture)
      , userParse = this.props.parse;

    if (userParse)
      return userParse(strVal, culture)

    strVal = strVal.replace(delimChar, '.')
    strVal = parseFloat(strVal);

    return strVal
  },

  isFlushable(num, str) {
    return (
          this.isValid(num)
      && !this.isAtDelimiter(num, str)
      && !this.isSign(str)
    )
  },

  isSign(val) {
    return (val || '').trim() === '-';
  },

  isAtDelimiter(num, str, props = this.props) {
    var localeChar = numberLocalizer.decimalChar(null, props.culture)
      , lastIndex = str.length - 1
      , char;

    if (str.length <= 1) return false

    char = str[lastIndex]

    return char === localeChar
      && str.indexOf(char) === lastIndex
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
