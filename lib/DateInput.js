'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

var _utilLocalizers = require('./util/localizers');

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

exports['default'] = _react2['default'].createClass({

  displayName: 'DatePickerInput',

  propTypes: {
    format: _utilPropTypes2['default'].dateFormat.isRequired,
    editFormat: _utilPropTypes2['default'].dateFormat,
    parse: _react2['default'].PropTypes.func.isRequired,

    value: _react2['default'].PropTypes.instanceOf(Date),
    onChange: _react2['default'].PropTypes.func.isRequired,
    culture: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      textValue: ''
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var text = formatDate(nextProps.value, nextProps.editing && nextProps.editFormat ? nextProps.editFormat : nextProps.format, nextProps.culture);

    this.startValue = text;

    this.setState({
      textValue: text
    });
  },

  getInitialState: function getInitialState() {
    var text = formatDate(this.props.value, this.props.editing && this.props.editFormat ? this.props.editFormat : this.props.format, this.props.culture);

    this.startValue = text;

    return {
      textValue: text
    };
  },

  render: function render() {
    var value = this.state.textValue;

    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
      type: 'text',
      className: _classnames2['default']({ 'rw-input': true }),
      value: value,
      'aria-disabled': this.props.disabled,
      'aria-readonly': this.props.readOnly,
      disabled: this.props.disabled,
      readOnly: this.props.readOnly,
      onChange: this._change,
      onBlur: chain(this.props.blur, this._blur, this) }));
  },

  _change: function _change(e) {
    this.setState({ textValue: e.target.value });
    this._needsFlush = true;
  },

  _blur: function _blur(e) {
    var val = e.target.value,
        date;

    if (this._needsFlush) {
      this._needsFlush = false;
      date = this.props.parse(val);

      this.props.onChange(date, formatDate(date, this.props.format, this.props.culture));
    }
  },

  focus: function focus() {
    _utilCompat2['default'].findDOMNode(this).focus();
  }

});

function isValid(d) {
  return !isNaN(d.getTime());
}

function formatDate(date, format, culture) {
  var val = '';

  if (date instanceof Date && isValid(date)) val = _utilLocalizers.date.format(date, format, culture);

  return val;
}

function chain(a, b, thisArg) {
  return function () {
    a && a.apply(thisArg, arguments);
    b && b.apply(thisArg, arguments);
  };
}
module.exports = exports['default'];