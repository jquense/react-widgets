'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var React = require('react'),
    cx = require('classnames'),
    compat = require('./util/compat'),
    localizers = require('./util/configuration').locale,
    CustomPropTypes = require('./util/propTypes');

module.exports = React.createClass({

  displayName: 'DatePickerInput',

  propTypes: {
    format: CustomPropTypes.dateFormat.isRequired,
    editFormat: CustomPropTypes.dateFormat,
    parse: React.PropTypes.func.isRequired,

    value: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func.isRequired,
    culture: React.PropTypes.string
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

    return React.createElement('input', babelHelpers._extends({}, this.props, {
      type: 'text',
      className: cx({ 'rw-input': true }),
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
    compat.findDOMNode(this).focus();
  }

});

function isValid(d) {
  return !isNaN(d.getTime());
}

function formatDate(date, format, culture) {
  var val = '';

  if (date instanceof Date && isValid(date)) val = localizers.date.format(date, format, culture);

  return val;
}

function chain(a, b, thisArg) {
  return function () {
    a && a.apply(thisArg, arguments);
    b && b.apply(thisArg, arguments);
  };
}