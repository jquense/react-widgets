'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _localizers = require('./util/localizers');

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getFormat = function getFormat(props) {
  return _localizers.number.getFormat('default', props.format);
};

var isSign = function isSign(val) {
  return (val || '').trim() === '-';
};

function isPaddedZeros(str, culture) {
  var localeChar = _localizers.number.decimalChar(null, culture);

  var _str$split = str.split(localeChar);

  var _ = _str$split[0];
  var decimals = _str$split[1];


  return !!(decimals && decimals.match(/0+$/));
}

function isAtDelimiter(num, str, culture) {
  var localeChar = _localizers.number.decimalChar(null, culture),
      lastIndex = str.length - 1,
      char = void 0;

  if (str.length < 1) return false;

  char = str[lastIndex];

  return !!(char === localeChar && str.indexOf(char) === lastIndex);
}

var NumberPickerInput = (_temp = _class = function (_React$Component) {
  _inherits(NumberPickerInput, _React$Component);

  function NumberPickerInput() {
    _classCallCheck(this, NumberPickerInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.handleChange = function (_ref) {
      var target = _ref.target;
      var _this$props = _this.props;
      var value = _this$props.value;
      var onChange = _this$props.onChange;


      var stringValue = target.value,
          numberValue = _this.parseNumber(stringValue);

      var isIntermediate = _this.isIntermediateValue(numberValue, stringValue);

      if (stringValue == null || stringValue.trim() === '') {
        _this.setStringValue('');
        onChange(null);

        return;
      }

      if (isIntermediate) _this.setStringValue(stringValue);else if (numberValue !== value) onChange(numberValue);
    };

    _this.handleBlur = function () {
      var str = _this.state.stringValue,
          number = _this.parseNumber(str);

      // if number is below the min
      // we need to flush low values and decimal stops, onBlur means i'm done inputing
      if (_this.isIntermediateValue(number, str)) {
        if (isNaN(number)) {
          number = null;
        }
        _this.props.onChange(number);
      }
    };

    _this.state = _this.getDefaultState();
    return _this;
  }

  NumberPickerInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState(this.getDefaultState(nextProps));
  };

  NumberPickerInput.prototype.getDefaultState = function getDefaultState() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
    var value = props.value;
    var culture = props.culture;
    var editing = props.editing;


    var decimal = _localizers.number.decimalChar(null, culture),
        format = getFormat(props);

    if (value == null || isNaN(value)) value = '';else value = editing ? ('' + value).replace('.', decimal) : _localizers.number.format(value, format, culture);

    return {
      stringValue: '' + value
    };
  };

  NumberPickerInput.prototype.parseNumber = function parseNumber(strVal) {
    var _props = this.props;
    var culture = _props.culture;
    var userParse = _props.parse;


    var delimChar = _localizers.number.decimalChar(null, culture);

    if (userParse) return userParse(strVal, culture);

    strVal = strVal.replace(delimChar, '.');
    strVal = parseFloat(strVal);

    return strVal;
  };

  NumberPickerInput.prototype.isIntermediateValue = function isIntermediateValue(num, str) {
    var _props2 = this.props;
    var culture = _props2.culture;
    var min = _props2.min;


    return !!(num < min || isSign(str) || isAtDelimiter(num, str, culture) || isPaddedZeros(str, culture));
  };

  // this intermediate state is for when one runs into
  // the decimal or are typing the number


  NumberPickerInput.prototype.setStringValue = function setStringValue(stringValue) {
    this.setState({ stringValue: stringValue });
  };

  NumberPickerInput.prototype.render = function render() {
    var _props3 = this.props;
    var disabled = _props3.disabled;
    var readOnly = _props3.readOnly;
    var placeholder = _props3.placeholder;
    var min = _props3.min;
    var max = _props3.max;


    var value = this.state.stringValue;
    var props = _3.default.omitOwnProps(this);

    return _react2.default.createElement(_Input2.default, _extends({}, props, {
      className: 'rw-widget-input',
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      'aria-valuenow': value,
      'aria-valuemin': isFinite(min) ? min : null,
      'aria-valuemax': isFinite(max) ? max : null,
      disabled: disabled,
      readOnly: readOnly,
      placeholder: placeholder,
      value: value
    }));
  };

  return NumberPickerInput;
}(_react2.default.Component), _class.propTypes = {
  value: _react2.default.PropTypes.number,
  editing: _react2.default.PropTypes.bool,
  placeholder: _react2.default.PropTypes.string,

  format: _propTypes2.default.numberFormat,

  parse: _react2.default.PropTypes.func,
  culture: _react2.default.PropTypes.string,

  min: _react2.default.PropTypes.number,
  max: _react2.default.PropTypes.number,

  disabled: _propTypes2.default.disabled,
  readOnly: _propTypes2.default.readOnly,

  onChange: _react2.default.PropTypes.func.isRequired,
  onKeyDown: _react2.default.PropTypes.func
}, _class.defaultProps = {
  value: null,
  editing: false
}, _temp);
exports.default = NumberPickerInput;
module.exports = exports['default'];