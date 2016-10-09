'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

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

var _focusManager = require('./util/focusManager');

var _focusManager2 = _interopRequireDefault(_focusManager);

var _withRightToLeft = require('./util/withRightToLeft');

var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);

var _localizers = require('./util/localizers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
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

var NumberPicker = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(NumberPicker, _React$Component);

  function NumberPicker() {
    _classCallCheck(this, NumberPicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _initDefineProp(_this, 'handleMouseDown', _descriptor, _this);

    _initDefineProp(_this, 'handleMouseUp', _descriptor2, _this);

    _initDefineProp(_this, 'handleKeyDown', _descriptor3, _this);

    _this.handleChange = function (newValue) {
      var _this$props = _this.props;
      var onChange = _this$props.onChange;
      var value = _this$props.value;
      var min = _this$props.min;
      var max = _this$props.max;


      newValue = clamp(newValue, min, max);

      if (value !== newValue) (0, _widgetHelpers.notify)(onChange, newValue);
    };

    _this.focusManager = (0, _focusManager2.default)(_this, {
      willHandle: function willHandle(focused) {
        if (focused) _this.focus();
      }
    });

    _this.state = {
      focused: false
    };
    return _this;
  }

  NumberPicker.prototype.renderInput = function renderInput(value) {
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
  };

  NumberPicker.prototype.render = function render() {
    var _this2 = this;

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
        onKeyDown: this.handleKeyDown,
        onBlur: this.focusManager.handleBlur,
        onFocus: this.focusManager.handleFocus,
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
              return _this2.handleMouseUp(_constants.directions.UP);
            },
            onMouseDown: function onMouseDown() {
              return _this2.handleMouseDown(_constants.directions.UP);
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.handleMouseUp(_constants.directions.UP);
            }
          }),
          _react2.default.createElement(_Button2.default, {
            icon: 'caret-down',
            onClick: this.handleFocus,
            label: messages.decrement,
            disabled: value === min || disabled,
            onMouseUp: function onMouseUp() {
              return _this2.handleMouseUp(_constants.directions.DOWN);
            },
            onMouseDown: function onMouseDown() {
              return _this2.handleMouseDown(_constants.directions.DOWN);
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.handleMouseUp(_constants.directions.DOWN);
            }
          })
        )
      )
    );
  };

  NumberPicker.prototype.focus = function focus() {
    _compat2.default.findDOMNode(this.refs.input).focus();
  };

  NumberPicker.prototype.increment = function increment() {
    return this.step(this.props.step);
  };

  NumberPicker.prototype.decrement = function decrement() {
    return this.step(-this.props.step);
  };

  NumberPicker.prototype.step = function step(amount) {
    var value = (this.props.value || 0) + amount;

    var decimals = this.props.precision != null ? this.props.precision : _localizers.number.precision(format(this.props));

    this.handleChange(decimals != null ? round(value, decimals) : value);

    return value;
  };

  return NumberPicker;
}(_react2.default.Component), _class3.propTypes = {

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
}, _class3.defaultProps = {
  value: null,
  open: false,

  min: -Infinity,
  max: Infinity,
  step: 1,

  messages: {
    increment: 'increment value',
    decrement: 'decrement value'
  }
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleMouseDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (direction) {
      var _props3 = _this3.props;
      var min = _props3.min;
      var max = _props3.max;


      var method = direction === _constants.directions.UP ? _this3.increment : _this3.decrement;

      var value = method.call(_this3),
          atTop = direction === _constants.directions.UP && value === max,
          atBottom = direction === _constants.directions.DOWN && value === min;

      if (atTop || atBottom) _this3.handleMouseUp();else if (!_this3._cancelRepeater) _this3._cancelRepeater = (0, _repeater2.default)(function () {
        return _this3.handleMouseDown(direction);
      });
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleMouseUp', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      _this4._cancelRepeater && _this4._cancelRepeater();
      _this4._cancelRepeater = null;
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (event) {
      var _props4 = _this5.props;
      var min = _props4.min;
      var max = _props4.max;
      var onKeyDown = _props4.onKeyDown;

      var key = event.key;

      (0, _widgetHelpers.notify)(onKeyDown, [event]);

      if (event.defaultPrevented) return;

      if (key === 'End' && isFinite(max)) _this5.handleChange(max);else if (key === 'Home' && isFinite(min)) _this5.handleChange(min);else if (key === 'ArrowDown') {
        event.preventDefault();
        _this5.decrement();
      } else if (key === 'ArrowUp') {
        event.preventDefault();
        _this5.increment();
      }
    };
  }
})), _class2)) || _class;

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