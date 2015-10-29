'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var _utilLocalizers = require('./util/localizers');

var format = function format(props) {
  return _utilLocalizers.number.getFormat('default', props.format);
};

exports['default'] = _react2['default'].createClass({

  displayName: 'NumberPickerInput',

  propTypes: {
    value: _react2['default'].PropTypes.number,
    placeholder: _react2['default'].PropTypes.string,

    format: _utilPropTypes2['default'].numberFormat,
    parse: _react2['default'].PropTypes.func.isRequired,
    culture: _react2['default'].PropTypes.string,

    min: _react2['default'].PropTypes.number,

    onChange: _react2['default'].PropTypes.func.isRequired,
    onKeyDown: _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      value: null,
      editing: false,
      parse: function parse(number, culture) {
        return _utilLocalizers.number.parse(number, culture);
      }
    };
  },

  getDefaultState: function getDefaultState(props) {
    var value = props.editing ? props.value : formatNumber(props.value, format(props), props.culture);

    if (value == null || isNaN(props.value)) value = '';

    return {
      stringValue: '' + value
    };
  },

  getInitialState: function getInitialState() {
    return this.getDefaultState(this.props);
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
      'aria-disabled': this.props.disabled,
      'aria-readonly': this.props.readOnly,
      disabled: this.props.disabled,
      readOnly: this.props.readOnly,
      placeholder: this.props.placeholder,
      value: value }));
  },

  _change: function _change(e) {
    var val = e.target.value,
        number = this.props.parse(e.target.value, this.props.culture),
        valid = this.isValid(number);

    if (val == null || val.trim() === '' || val.trim() === '-') return this.props.onChange(null);

    if (valid && number !== this.props.value && !this.isAtDelimiter(number, val)) return this.props.onChange(number);

    //console.log(val !== 0 && !val)
    if (!isNaN(number) || this.isAtDelimiter(number, val)) this.current(e.target.value);
  },

  _finish: function _finish() {
    var str = this.state.stringValue,
        number = this.props.parse(str, this.props.culture);

    // if number is below the min
    // we need to flush low values and decimal stops, onBlur means i'm done inputing
    if (!isNaN(number) && (number < this.props.min || this.isAtDelimiter(number, str))) {
      this.props.onChange(number);
    }
  },

  isAtDelimiter: function isAtDelimiter(num, str) {
    var next;

    if (str.length <= 1) return false;

    next = this.props.parse(str.substr(0, str.length - 1), this.props.culture);

    return typeof next === 'number' && !isNaN(next) && next === num;
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

// function parseLocaleFloat(number, parser, culture) {
//   if ( typeof format === 'function')
//     return format(number, culture)

//   return config.globalize.parseFloat(number, 10, culture)
// }

function formatNumber(number, format, culture) {
  return _utilLocalizers.number.format(number, format, culture);
}
module.exports = exports['default'];