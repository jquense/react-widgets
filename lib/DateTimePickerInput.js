'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _localizers = require('./util/localizers');

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimePickerInput = (_temp = _class = function (_React$Component) {
  _inherits(DateTimePickerInput, _React$Component);

  function DateTimePickerInput() {
    _classCallCheck(this, DateTimePickerInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _initialiseProps.call(_this);

    var _this$props = _this.props;
    var value = _this$props.value;
    var editing = _this$props.editing;
    var editFormat = _this$props.editFormat;
    var format = _this$props.format;
    var culture = _this$props.culture;


    _this.state = {
      textValue: formatDate(value, editing && editFormat ? editFormat : format, culture)
    };
    return _this;
  }

  DateTimePickerInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var value = nextProps.value;
    var editing = nextProps.editing;
    var editFormat = nextProps.editFormat;
    var format = nextProps.format;
    var culture = nextProps.culture;


    this.setState({
      textValue: formatDate(value, editing && editFormat ? editFormat : format, culture)
    });
  };

  DateTimePickerInput.prototype.render = function render() {
    var _props = this.props;
    var disabled = _props.disabled;
    var readOnly = _props.readOnly;
    var textValue = this.state.textValue;


    var props = _3.default.omitOwnProps(this);

    return _react2.default.createElement(_Input2.default, _extends({}, props, {
      type: 'text',
      className: 'rw-widget-input',
      value: textValue,
      disabled: disabled,
      readOnly: readOnly,
      onChange: this.handleChange,
      onBlur: this.handleBlur
    }));
  };

  DateTimePickerInput.prototype.focus = function focus() {
    _compat2.default.findDOMNode(this).focus();
  };

  return DateTimePickerInput;
}(_react2.default.Component), _class.propTypes = {
  format: _propTypes2.default.dateFormat.isRequired,
  editing: _react2.default.PropTypes.bool,
  editFormat: _propTypes2.default.dateFormat,
  parse: _react2.default.PropTypes.func.isRequired,

  value: _react2.default.PropTypes.instanceOf(Date),
  onChange: _react2.default.PropTypes.func.isRequired,
  culture: _react2.default.PropTypes.string
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.handleChange = function (_ref) {
    var value = _ref.target.value;

    _this2._needsFlush = true;
    _this2.setState({ textValue: value });
  };

  this.handleBlur = function (event) {
    var _props2 = _this2.props;
    var format = _props2.format;
    var culture = _props2.culture;
    var parse = _props2.parse;
    var onChange = _props2.onChange;
    var onBlur = _props2.onBlur;


    onBlur && onBlur(event);

    if (_this2._needsFlush) {
      var date = parse(event.target.value);

      _this2._needsFlush = false;
      onChange(date, formatDate(date, format, culture));
    }
  };
}, _temp);
exports.default = DateTimePickerInput;


function isValid(d) {
  return !isNaN(d.getTime());
}

function formatDate(date, format, culture) {
  var val = '';

  if (date instanceof Date && isValid(date)) val = _localizers.date.format(date, format, culture);

  return val;
}
module.exports = exports['default'];