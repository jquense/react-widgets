'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _localizers = require('./util/localizers');

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({

  displayName: 'DateTimePickerInput',

  propTypes: {
    format: _propTypes2.default.dateFormat.isRequired,
    editing: _react2.default.PropTypes.bool,
    editFormat: _propTypes2.default.dateFormat,
    parse: _react2.default.PropTypes.func.isRequired,

    value: _react2.default.PropTypes.instanceOf(Date),
    onChange: _react2.default.PropTypes.func.isRequired,
    culture: _react2.default.PropTypes.string
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var value = nextProps.value,
        editing = nextProps.editing,
        editFormat = nextProps.editFormat,
        format = nextProps.format,
        culture = nextProps.culture;


    this.setState({
      textValue: formatDate(value, editing && editFormat ? editFormat : format, culture)
    });
  },
  getInitialState: function getInitialState() {
    var _props = this.props,
        value = _props.value,
        editing = _props.editing,
        editFormat = _props.editFormat,
        format = _props.format,
        culture = _props.culture;


    return {
      textValue: formatDate(value, editing && editFormat ? editFormat : format, culture)
    };
  },
  render: function render() {
    var _props2 = this.props,
        disabled = _props2.disabled,
        readOnly = _props2.readOnly;
    var textValue = this.state.textValue;


    var props = _3.default.omitOwnProps(this);

    return _react2.default.createElement(_Input2.default, _extends({}, props, {
      type: 'text',
      value: textValue,
      disabled: disabled,
      readOnly: readOnly,
      onChange: this.handleChange,
      onBlur: this.handleBlur
    }));
  },
  handleChange: function handleChange(_ref) {
    var value = _ref.target.value;

    this._needsFlush = true;
    this.setState({ textValue: value });
  },
  handleBlur: function handleBlur(event) {
    var _props3 = this.props,
        format = _props3.format,
        culture = _props3.culture,
        parse = _props3.parse,
        onChange = _props3.onChange,
        onBlur = _props3.onBlur;


    onBlur && onBlur(event);

    if (this._needsFlush) {
      var date = parse(event.target.value);

      this._needsFlush = false;
      onChange(date, formatDate(date, format, culture));
    }
  },
  focus: function focus() {
    _compat2.default.findDOMNode(this).focus();
  }
});


function isValid(d) {
  return !isNaN(d.getTime());
}

function formatDate(date, format, culture) {
  var val = '';

  if (date instanceof Date && isValid(date)) val = _localizers.date.format(date, format, culture);

  return val;
}
module.exports = exports['default'];