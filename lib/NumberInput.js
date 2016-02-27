'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var _utilLocalizers = require('./util/localizers');

var getFormat = function getFormat(props) {
  return _utilLocalizers.number.getFormat('default', props.format);
};

exports['default'] = _react2['default'].createClass({

  displayName: 'NumberPickerInput',

  propTypes: {
    value: _react2['default'].PropTypes.number,
    placeholder: _react2['default'].PropTypes.string,

    format: _utilPropTypes2['default'].numberFormat,

    parse: _react2['default'].PropTypes.func,
    culture: _react2['default'].PropTypes.string,

    min: _react2['default'].PropTypes.number,

    onChange: _react2['default'].PropTypes.func.isRequired,
    onKeyDown: _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      value: null,
      editing: false
    };
  },

  getDefaultState: function getDefaultState() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

    var value = props.value,
        decimal = _utilLocalizers.number.decimalChar(null, props.culture),
        format = getFormat(props);

    this._beginningWithSign = false;

    if (value == null || isNaN(props.value)) value = '';else value = props.editing ? ('' + value).replace('.', decimal) : _utilLocalizers.number.format(value, format, props.culture);

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

    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
      type: 'text',
      className: 'rw-input',
      onChange: this._change,
      onBlur: this._finish,
      onKeyPress: this._typing,
      'aria-disabled': this.props.disabled,
      'aria-readonly': this.props.readOnly,
      disabled: this.props.disabled,
      readOnly: this.props.readOnly,
      placeholder: this.props.placeholder,
      value: value }));
  },

  _typing: function _typing(e) {
    var current = e.target.value,
        newVal = e.key;

    this._beginningWithSign = current.trim() === '' && this.isSign(newVal);

    this.props.onKeyPress && this.props.onKeyPress(e);
  },

  _change: function _change(e) {
    var val = e.target.value,
        number = this._parse(e.target.value),
        atSign = this.isSign(val.trim()),
        startingWithSign = this._beginningWithSign;

    this._beginningWithSign = false;

    if (val == null || val.trim() === '' || atSign && !startingWithSign) {
      this.current('');
      return this.props.onChange(null);
    }

    if (this.isFlushable(number, val)) {
      if (number !== this.props.value) return this.props.onChange(number);else this.setState(this.getDefaultState()); // 5. -> 5
    }

    if (number < this.props.min || atSign && startingWithSign || this.isAtDelimiter(number, val)) this.current(e.target.value);
  },

  _finish: function _finish() {
    var str = this.state.stringValue,
        number = this._parse(str);

    // if number is below the min
    // we need to flush low values and decimal stops, onBlur means i'm done inputing
    if (!isNaN(number) && (number < this.props.min || this.isAtDelimiter(number, str))) {
      this.props.onChange(number);
    }
  },

  _parse: function _parse(strVal) {
    var culture = this.props.culture,
        delimChar = _utilLocalizers.number.decimalChar(null, culture),
        userParse = this.props.parse;

    if (userParse) return userParse(strVal, culture);

    strVal = strVal.replace(delimChar, '.');
    strVal = parseFloat(strVal);

    return strVal;
  },

  isFlushable: function isFlushable(num, str) {
    return this.isValid(num) && !this.isAtDelimiter(num, str) && !this.isSign(str);
  },

  isSign: function isSign(val) {
    return (val || '').trim() === '-';
  },

  isAtDelimiter: function isAtDelimiter(num, str) {
    var props = arguments.length <= 2 || arguments[2] === undefined ? this.props : arguments[2];

    var localeChar = _utilLocalizers.number.decimalChar(null, props.culture),
        lastIndex = str.length - 1,
        char;

    if (str.length <= 1) return false;

    char = str[lastIndex];

    return char === localeChar && str.indexOf(char) === lastIndex;
  },

  isValid: function isValid(num) {
    if (typeof num !== 'number' || isNaN(num)) return false;
    return num >= this.props.min;
  },

  //this intermediate state is for when one runs into the decimal or are typing the number
  current: function current(val) {
    this.setState({ stringValue: val });
  }

});
module.exports = exports['default'];