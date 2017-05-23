'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _propTypes3 = require('./util/propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _localizers = require('./util/localizers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFormat = function getFormat(props) {
  return _localizers.number.getFormat('default', props.format);
};

var propTypes = {
  value: _propTypes2.default.number,
  editing: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,

  format: _propTypes4.default.numberFormat,

  parse: _propTypes2.default.func,
  culture: _propTypes2.default.string,

  min: _propTypes2.default.number,

  onChange: _propTypes2.default.func.isRequired,
  onKeyDown: _propTypes2.default.func
};

exports.default = _react2.default.createClass({

  displayName: 'NumberPickerInput',

  propTypes: propTypes,

  getDefaultProps: function getDefaultProps() {
    return {
      value: null,
      editing: false
    };
  },
  getDefaultState: function getDefaultState() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

    var value = props.value,
        decimal = _localizers.number.decimalChar(null, props.culture),
        format = getFormat(props);

    if (value == null || isNaN(props.value)) value = '';else value = props.editing ? ('' + value).replace('.', decimal) : _localizers.number.format(value, format, props.culture);

    return {
      stringValue: '' + value
    };
  },
  getInitialState: function getInitialState() {
    return this.getDefaultState();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState(this.getDefaultState(nextProps));
  },
  render: function render() {
    var value = this.state.stringValue;
    var props = _3.default.omitOwnProps(this);

    return _react2.default.createElement('input', _extends({}, props, {
      type: 'text',
      className: 'rw-input',
      onChange: this._change,
      onBlur: this._finish,
      'aria-disabled': this.props.disabled,
      'aria-readonly': this.props.readOnly,
      disabled: this.props.disabled,
      readOnly: this.props.readOnly,
      placeholder: this.props.placeholder,
      value: value
    }));
  },
  _change: function _change(e) {
    var val = e.target.value,
        number = this._parse(e.target.value);

    var isIntermediate = this.isIntermediateValue(number, val);

    if (val == null || val.trim() === '') {
      this.current('');
      return this.props.onChange(null);
    }

    if (!isIntermediate) {
      if (number !== this.props.value) {
        return this.props.onChange(number);
      }
    } else {
      this.current(e.target.value);
    }
  },
  _finish: function _finish() {
    var str = this.state.stringValue,
        number = this._parse(str);

    // if number is below the min
    // we need to flush low values and decimal stops, onBlur means i'm done inputing
    if (this.isIntermediateValue(number, str)) {
      if (isNaN(number)) {
        number = null;
      }
      this.props.onChange(number);
    }
  },
  _parse: function _parse(strVal) {
    var culture = this.props.culture,
        delimChar = _localizers.number.decimalChar(null, culture),
        userParse = this.props.parse;

    if (userParse) return userParse(strVal, culture);

    strVal = strVal.replace(delimChar, '.');
    strVal = parseFloat(strVal);

    return strVal;
  },
  isIntermediateValue: function isIntermediateValue(num, str) {
    return !!(num < this.props.min || this.isSign(str) || this.isAtDelimiter(num, str) || this.isPaddedZeros(str));
  },
  isSign: function isSign(val) {
    return (val || '').trim() === '-';
  },
  isPaddedZeros: function isPaddedZeros(str) {
    var localeChar = _localizers.number.decimalChar(null, this.props.culture);

    var _str$split = str.split(localeChar),
        _ = _str$split[0],
        decimals = _str$split[1];

    return !!(decimals && decimals.match(/0+$/));
  },
  isAtDelimiter: function isAtDelimiter(num, str) {
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props;

    var localeChar = _localizers.number.decimalChar(null, props.culture),
        lastIndex = str.length - 1,
        char;

    if (str.length < 1) return false;

    char = str[lastIndex];

    return !!(char === localeChar && str.indexOf(char) === lastIndex);
  },
  isValid: function isValid(num) {
    if (typeof num !== 'number' || isNaN(num)) return false;
    return num >= this.props.min;
  },


  //this intermediate state is for when one runs into the decimal or are typing the number
  current: function current(stringValue) {
    this.setState({ stringValue: stringValue });
  }
});
module.exports = exports['default'];