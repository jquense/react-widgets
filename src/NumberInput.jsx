import React from 'react';
import ReactDOM from 'react-dom';
import CustomPropTypes from './util/propTypes';
import { number as numberLocalizer } from './util/localizers';

let getFormat = props => numberLocalizer.getFormat('default', props.format)

// http://stackoverflow.com/a/32598826/25507
const canUseDOM = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

export default React.createClass({

  displayName: 'NumberPickerInput',

  propTypes: {
    value:       React.PropTypes.number,
    placeholder: React.PropTypes.string,

    format:      CustomPropTypes.numberFormat,

    parse:       React.PropTypes.func,
    culture:     React.PropTypes.string,

    min:         React.PropTypes.number,

    onChange:    React.PropTypes.func.isRequired,
    onKeyDown:   React.PropTypes.func
  },

  getDefaultProps() {
    return {
      value: null,
      editing: false
    }
  },

  getDefaultState(props = this.props){
    var value = props.value
      , decimal = numberLocalizer.decimalChar(null, props.culture)
      , format = getFormat(props);

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

  componentWillUpdate(nextProps, nextState) {
    if (canUseDOM) {
      // Check if we need to restore text selection after pending update.
      let node = ReactDOM.findDOMNode(this.refs.input);
      this._selectAll = document.activeElement === node
        && this.state.stringValue !== nextState.stringValue
        && node.selectionStart === 0
        && node.selectionEnd === this.refs.input.value.length;
    }
  },

  componentDidUpdate() {
    if (this._selectAll) {
      ReactDOM.findDOMNode(this.refs.input).select();
    }
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
        placeholder={this.props.placeholder}
        value={value}
        ref='input'
      />
    )
  },

  _change(e) {
    var val = e.target.value
      , number = this._parse(e.target.value)

    let isIntermediate = this.isIntermediateValue(number, val);

    if (val == null || val.trim() === '') {
      this.current('')
      return this.props.onChange(null)
    }

    if (!isIntermediate) {
      if (number !== this.props.value) {
        return this.props.onChange(number)
      }
    }
    else {
      this.current(e.target.value)
    }
  },

  _finish() {
    var str = this.state.stringValue
      , number = this._parse(str);

    // if number is below the min
    // we need to flush low values and decimal stops, onBlur means i'm done inputing
    if (this.isIntermediateValue(number, str)) {
      if (isNaN(number)) {
        number = null;
      }
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

  isIntermediateValue(num, str) {
    return !!(
      num < this.props.min ||
      this.isSign(str) ||
      this.isAtDelimiter(num, str) ||
      this.isPaddedZeros(str)
    );
  },

  isSign(val) {
    return (val || '').trim() === '-';
  },

  isPaddedZeros(str) {
    let localeChar = numberLocalizer.decimalChar(null, this.props.culture)
    let [_, decimals] = str.split(localeChar);

    return !!(
      decimals &&
      decimals.match(/0+$/)
    )
  },

  isAtDelimiter(num, str, props = this.props) {
    var localeChar = numberLocalizer.decimalChar(null, props.culture)
      , lastIndex = str.length - 1
      , char;

    if (str.length < 1) return false

    char = str[lastIndex]

    return !!(
      char === localeChar &&
      str.indexOf(char) === lastIndex
    )
  },

  isValid(num) {
    if (typeof num !== 'number' || isNaN(num))
      return false
    return num >= this.props.min
  },

  //this intermediate state is for when one runs into the decimal or are typing the number
  current(stringValue) {
    this.setState({ stringValue })
  }

});
