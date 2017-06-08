'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _desc, _value, _obj;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _propTypes3 = require('./util/propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _constants = require('./util/constants');

var _repeater = require('./util/repeater');

var _repeater2 = _interopRequireDefault(_repeater);

var _localizers = require('./util/localizers');

var _NumberInput = require('./NumberInput');

var _NumberInput2 = _interopRequireDefault(_NumberInput);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _interaction = require('./util/interaction');

var _widgetHelpers = require('./util/widgetHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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

var propTypes = {

  // -- controlled props -----------
  value: _propTypes2.default.number,
  onChange: _propTypes2.default.func,
  //------------------------------------

  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  step: _propTypes2.default.number,

  precision: _propTypes2.default.number,

  culture: _propTypes2.default.string,

  format: _propTypes4.default.numberFormat,

  name: _propTypes2.default.string,

  parse: _propTypes2.default.func,

  autoFocus: _propTypes2.default.bool,
  disabled: _propTypes4.default.disabled,
  readOnly: _propTypes4.default.readOnly,

  messages: _propTypes2.default.shape({
    increment: _propTypes2.default.string,
    decrement: _propTypes2.default.string
  }),

  placeholder: _propTypes2.default.string
};

var NumberPicker = (0, _createReactClass2.default)((_obj = {

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
      focused: false,
      active: false
    };
  },
  render: function render() {
    var _this = this;

    var _$omitOwnProps = _3.default.omitOwnProps(this),
        className = _$omitOwnProps.className,
        onKeyPress = _$omitOwnProps.onKeyPress,
        onKeyUp = _$omitOwnProps.onKeyUp,
        props = _objectWithoutProperties(_$omitOwnProps, ['className', 'onKeyPress', 'onKeyUp']);

    var val = this.constrainValue(this.props.value);

    return _react2.default.createElement(
      'div',
      _extends({}, props, {
        ref: 'element',
        onKeyDown: this._keyDown,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        tabIndex: '-1',
        className: (0, _classnames2.default)(className, 'rw-numberpicker', 'rw-widget', {
          'rw-state-focus': this.state.focused,
          'rw-state-disabled': this.props.disabled,
          'rw-state-readonly': this.props.readOnly,
          'rw-rtl': this.isRtl()
        }) }),
      _react2.default.createElement(
        'span',
        { className: 'rw-select' },
        _react2.default.createElement(_Button2.default, {
          icon: 'caret-up',
          onClick: this.handleFocus,
          label: this.props.messages.increment,
          active: this.state.active === _constants.directions.UP,
          disabled: val === this.props.max || this.props.disabled,
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
          label: this.props.messages.decrement,
          active: this.state.active === _constants.directions.DOWN,
          disabled: val === this.props.min || this.props.disabled,
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
      ),
      _react2.default.createElement(_NumberInput2.default, {
        ref: 'input',
        tabIndex: props.tabIndex,
        placeholder: this.props.placeholder,
        value: val,
        autoFocus: this.props.autoFocus,
        editing: this.state.focused,
        format: this.props.format,
        parse: this.props.parse,
        name: this.props.name,
        role: 'spinbutton',
        min: this.props.min,
        'aria-valuenow': val,
        'aria-valuemin': isFinite(this.props.min) ? this.props.min : null,
        'aria-valuemax': isFinite(this.props.max) ? this.props.max : null,
        'aria-disabled': this.props.disabled,
        'aria-readonly': this.props.readonly,
        disabled: this.props.disabled,
        readOnly: this.props.readOnly,
        onChange: this.change,
        onKeyPress: onKeyPress,
        onKeyUp: onKeyUp })
    );
  },
  handleMouseDown: function handleMouseDown(dir) {
    var method = dir === _constants.directions.UP ? this.increment : this.decrement;

    this.setState({ active: dir });

    var val = method.call(this);

    if (!(dir === _constants.directions.UP && val === this.props.max || dir === _constants.directions.DOWN && val === this.props.min)) {
      if (!this._cancelRepeater) this._cancelRepeater = (0, _repeater2.default)(this.handleMouseDown.bind(null, dir));
    } else this.handleMouseUp();
  },
  handleMouseUp: function handleMouseUp() {
    this.setState({ active: false });
    this._cancelRepeater && this._cancelRepeater();
    this._cancelRepeater = null;
  },
  _keyDown: function _keyDown(e) {
    var key = e.key;

    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);

    if (e.defaultPrevented) return;

    if (key === 'End' && isFinite(this.props.max)) this.change(this.props.max);else if (key === 'Home' && isFinite(this.props.min)) this.change(this.props.min);else if (key === 'ArrowDown') {
      e.preventDefault();
      this.decrement();
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      this.increment();
    }
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

    this.change(decimals != null ? round(value, decimals) : value);

    return value;
  },
  change: function change(val) {
    val = this.constrainValue(val);

    if (this.props.value !== val) (0, _widgetHelpers.notify)(this.props.onChange, val);
  },
  constrainValue: function constrainValue(value) {
    var max = this.props.max == null ? Infinity : this.props.max,
        min = this.props.min == null ? -Infinity : this.props.min;

    if (value == null || value === '') return null;

    return Math.max(Math.min(value, max), min);
  }
}, (_applyDecoratedDescriptor(_obj, 'handleMouseDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleMouseDown'), _obj), _applyDecoratedDescriptor(_obj, 'handleMouseUp', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleMouseUp'), _obj), _applyDecoratedDescriptor(_obj, '_keyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_keyDown'), _obj)), _obj));

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