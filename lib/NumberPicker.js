'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _desc, _value, _obj;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _Widget = require('./Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _WidgetPicker = require('./WidgetPicker');

var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _NumberInput = require('./NumberInput');

var _NumberInput2 = _interopRequireDefault(_NumberInput);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _interaction = require('./util/interaction');

var _widgetHelpers = require('./util/widgetHelpers');

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('./util/constants');

var _repeater = require('./util/repeater');

var _repeater2 = _interopRequireDefault(_repeater);

var _localizers = require('./util/localizers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var format = function format(props) {
  return _localizers.number.getFormat('default', props.format);
};

function clamp(value, min, max) {
  max = max == null ? Infinity : max;
  min = min == null ? -Infinity : min;

  if (value == null || value === '') return null;

  return Math.max(Math.min(value, max), min);
}

var propTypes = {

  // -- controlled props -----------
  value: _react2.default.PropTypes.number,
  onChange: _react2.default.PropTypes.func,
  //------------------------------------

  min: _react2.default.PropTypes.number,
  max: _react2.default.PropTypes.number,
  step: _react2.default.PropTypes.number,

  precision: _react2.default.PropTypes.number,

  culture: _react2.default.PropTypes.string,

  format: _propTypes2.default.numberFormat,

  name: _react2.default.PropTypes.string,

  parse: _react2.default.PropTypes.func,

  autoFocus: _react2.default.PropTypes.bool,
  disabled: _propTypes2.default.disabled,
  readOnly: _propTypes2.default.readOnly,

  messages: _react2.default.PropTypes.shape({
    increment: _react2.default.PropTypes.string,
    decrement: _react2.default.PropTypes.string
  }),

  placeholder: _react2.default.PropTypes.string
};

var NumberPicker = _react2.default.createClass((_obj = {

  displayName: 'NumberPicker',

  mixins: [require('./mixins/TimeoutMixin'), require('./mixins/PureRenderMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/FocusMixin')({
    willHandle: function willHandle(focused) {
      if (focused) this.focus();
    }
  })],

  propTypes: propTypes,

  getDefaultProps: function getDefaultProps() {
    return {
      value: null,
      open: false,

      min: -Infinity,
      max: Infinity,
      step: 1,

      messages: {
        increment: 'increment value',
        decrement: 'decrement value'
      }
    };
  },
  getInitialState: function getInitialState() {
    return {
      focused: false
    };
  },
  renderInput: function renderInput(value) {
    var _props = this.props;
    var placeholder = _props.placeholder;
    var autoFocus = _props.autoFocus;
    var tabIndex = _props.tabIndex;
    var parse = _props.parse;
    var name = _props.name;
    var onKeyPress = _props.onKeyPress;
    var onKeyUp = _props.onKeyUp;
    var min = _props.min;
    var max = _props.max;
    var disabled = _props.disabled;
    var readOnly = _props.readOnly;
    var format = _props.format;


    return _react2.default.createElement(_NumberInput2.default, {
      ref: 'input',
      role: 'spinbutton',
      tabIndex: tabIndex,
      value: value,
      placeholder: placeholder,
      autoFocus: autoFocus,
      editing: this.state.focused,
      format: format,
      parse: parse,
      name: name,
      min: min,
      max: max,
      disabled: disabled,
      readOnly: readOnly,
      onChange: this.handleChange,
      onKeyPress: onKeyPress,
      onKeyUp: onKeyUp
    });
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props;
    var className = _props2.className;
    var disabled = _props2.disabled;
    var readOnly = _props2.readOnly;
    var value = _props2.value;
    var messages = _props2.messages;
    var min = _props2.min;
    var max = _props2.max;
    var focused = this.state.focused;

    var elementProps = _3.default.omitOwnProps(this);

    value = clamp(value, min, max);

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
        className: (0, _classnames2.default)(className, 'rw-number-picker')
      }),
      _react2.default.createElement(
        _WidgetPicker2.default,
        {
          focused: focused,
          disabled: disabled,
          readOnly: readOnly
        },
        this.renderInput(value),
        _react2.default.createElement(
          _Select2.default,
          { bordered: true },
          _react2.default.createElement(_Button2.default, {
            icon: 'caret-up',
            onClick: this.handleFocus,
            label: messages.increment,
            disabled: value === max || disabled,
            onMouseUp: function onMouseUp() {
              return _this.handleMouseUp(_constants.directions.UP);
            },
            onMouseDown: function onMouseDown() {
              return _this.handleMouseDown(_constants.directions.UP);
            },
            onMouseLeave: function onMouseLeave() {
              return _this.handleMouseUp(_constants.directions.UP);
            }
          }),
          _react2.default.createElement(_Button2.default, {
            icon: 'caret-down',
            onClick: this.handleFocus,
            label: messages.decrement,
            disabled: value === min || disabled,
            onMouseUp: function onMouseUp() {
              return _this.handleMouseUp(_constants.directions.DOWN);
            },
            onMouseDown: function onMouseDown() {
              return _this.handleMouseDown(_constants.directions.DOWN);
            },
            onMouseLeave: function onMouseLeave() {
              return _this.handleMouseUp(_constants.directions.DOWN);
            }
          })
        )
      )
    );
  },
  handleMouseDown: function handleMouseDown(direction) {
    var _this2 = this;

    var _props3 = this.props;
    var min = _props3.min;
    var max = _props3.max;


    var method = direction === _constants.directions.UP ? this.increment : this.decrement;

    var value = method.call(this),
        atTop = direction === _constants.directions.UP && value === max,
        atBottom = direction === _constants.directions.DOWN && value === min;

    if (atTop || atBottom) this.handleMouseUp();else if (!this._cancelRepeater) this._cancelRepeater = (0, _repeater2.default)(function () {
      return _this2.handleMouseDown(direction);
    });
  },
  handleMouseUp: function handleMouseUp() {
    this._cancelRepeater && this._cancelRepeater();
    this._cancelRepeater = null;
  },
  handleKeyDown: function handleKeyDown(event) {
    var _props4 = this.props;
    var min = _props4.min;
    var max = _props4.max;
    var onKeyDown = _props4.onKeyDown;

    var key = event.key;

    (0, _widgetHelpers.notify)(onKeyDown, [event]);

    if (event.defaultPrevented) return;

    if (key === 'End' && isFinite(max)) this.handleChange(max);else if (key === 'Home' && isFinite(min)) this.handleChange(min);else if (key === 'ArrowDown') {
      event.preventDefault();
      this.decrement();
    } else if (key === 'ArrowUp') {
      event.preventDefault();
      this.increment();
    }
  },
  handleChange: function handleChange(newValue) {
    var _props5 = this.props;
    var onChange = _props5.onChange;
    var value = _props5.value;
    var min = _props5.min;
    var max = _props5.max;


    newValue = clamp(newValue, min, max);

    if (value !== newValue) (0, _widgetHelpers.notify)(onChange, newValue);
  },
  focus: function focus() {
    _compat2.default.findDOMNode(this.refs.input).focus();
  },
  increment: function increment() {
    return this.step(this.props.step);
  },
  decrement: function decrement() {
    return this.step(-this.props.step);
  },
  step: function step(amount) {
    var value = (this.props.value || 0) + amount;

    var decimals = this.props.precision != null ? this.props.precision : _localizers.number.precision(format(this.props));

    this.handleChange(decimals != null ? round(value, decimals) : value);

    return value;
  }
}, (_applyDecoratedDescriptor(_obj, 'handleMouseDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleMouseDown'), _obj), _applyDecoratedDescriptor(_obj, 'handleMouseUp', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleMouseUp'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyDown'), _obj)), _obj));

exports.default = (0, _uncontrollable2.default)(NumberPicker, { value: 'onChange' }, ['focus']);

// thank you kendo ui core
// https://github.com/telerik/kendo-ui-core/blob/master/src/kendo.core.js#L1036

function round(value, precision) {
  precision = precision || 0;

  value = ('' + value).split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? +value[1] + precision : precision)));

  value = ('' + value).split('e');
  value = +(value[0] + 'e' + (value[1] ? +value[1] - precision : -precision));

  return value.toFixed(precision);
}
module.exports = exports['default'];