'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _util_ = require('./util/_');

var _util_2 = babelHelpers.interopRequireDefault(_util_);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

var _utilConstants = require('./util/constants');

var _utilConstants2 = babelHelpers.interopRequireDefault(_utilConstants);

var _utilRepeater = require('./util/repeater');

var _utilRepeater2 = babelHelpers.interopRequireDefault(_utilRepeater);

var _utilLocalizers = require('./util/localizers');

var _NumberInput = require('./NumberInput');

var _NumberInput2 = babelHelpers.interopRequireDefault(_NumberInput);

var _WidgetButton = require('./WidgetButton');

var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

var _utilInteraction = require('./util/interaction');

var _utilWidgetHelpers = require('./util/widgetHelpers');

var directions = _utilConstants2['default'].directions;

var format = function format(props) {
  return _utilLocalizers.number.getFormat('default', props.format);
};

var propTypes = {

  // -- controlled props -----------
  value: _react2['default'].PropTypes.number,
  onChange: _react2['default'].PropTypes.func,
  //------------------------------------

  min: _react2['default'].PropTypes.number,
  max: _react2['default'].PropTypes.number,
  step: _react2['default'].PropTypes.number,

  precision: _react2['default'].PropTypes.number,

  culture: _react2['default'].PropTypes.string,

  format: _utilPropTypes2['default'].numberFormat,

  name: _react2['default'].PropTypes.string,

  parse: _react2['default'].PropTypes.func,

  autoFocus: _react2['default'].PropTypes.bool,
  disabled: _utilPropTypes2['default'].disabled,
  readOnly: _utilPropTypes2['default'].readOnly,

  messages: _react2['default'].PropTypes.shape({
    increment: _react2['default'].PropTypes.string,
    decrement: _react2['default'].PropTypes.string
  }),

  placeholder: _react2['default'].PropTypes.string
};

var NumberPicker = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
  key: 'displayName',
  initializer: function initializer() {
    return 'NumberPicker';
  }
}, {
  key: 'mixins',
  initializer: function initializer() {
    return [require('./mixins/TimeoutMixin'), require('./mixins/PureRenderMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/FocusMixin')({
      willHandle: function willHandle(focused) {
        if (focused) this.focus();
      }
    })];
  }
}, {
  key: 'propTypes',
  initializer: function initializer() {
    return propTypes;
  }
}, {
  key: 'getDefaultProps',
  value: function getDefaultProps() {
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
  }
}, {
  key: 'getInitialState',
  value: function getInitialState() {
    return {
      focused: false,
      active: false
    };
  }
}, {
  key: 'render',
  value: function render() {
    var _$omit = _util_2['default'].omit(this.props, Object.keys(propTypes));

    var className = _$omit.className;
    var onKeyPress = _$omit.onKeyPress;
    var onKeyUp = _$omit.onKeyUp;
    var props = babelHelpers.objectWithoutProperties(_$omit, ['className', 'onKeyPress', 'onKeyUp']);
    var val = this.constrainValue(this.props.value);

    return _react2['default'].createElement(
      'div',
      babelHelpers._extends({}, props, {
        ref: 'element',
        onKeyDown: this._keyDown,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        tabIndex: '-1',
        className: _classnames2['default'](className, 'rw-numberpicker', 'rw-widget', {
          'rw-state-focus': this.state.focused,
          'rw-state-disabled': this.props.disabled,
          'rw-state-readonly': this.props.readOnly,
          'rw-rtl': this.isRtl()
        }) }),
      _react2['default'].createElement(
        'span',
        { className: 'rw-select' },
        _react2['default'].createElement(
          _WidgetButton2['default'],
          {
            tabIndex: '-1',
            className: _classnames2['default']({ 'rw-state-active': this.state.active === directions.UP }),
            onMouseDown: this._mouseDown.bind(null, directions.UP),
            onMouseUp: this._mouseUp.bind(null, directions.UP),
            onMouseLeave: this._mouseUp.bind(null, directions.UP),
            onClick: this.handleFocus,
            disabled: val === this.props.max || this.props.disabled,
            'aria-disabled': val === this.props.max || this.props.disabled },
          _react2['default'].createElement(
            'i',
            { className: 'rw-i rw-i-caret-up' },
            _react2['default'].createElement(
              'span',
              { className: 'rw-sr' },
              this.props.messages.increment
            )
          )
        ),
        _react2['default'].createElement(
          _WidgetButton2['default'],
          {
            tabIndex: '-1',
            className: _classnames2['default']({ 'rw-state-active': this.state.active === directions.DOWN }),
            onMouseDown: this._mouseDown.bind(null, directions.DOWN),
            onMouseUp: this._mouseUp.bind(null, directions.DOWN),
            onMouseLeave: this._mouseUp.bind(null, directions.DOWN),
            onClick: this.handleFocus,
            disabled: val === this.props.min || this.props.disabled,
            'aria-disabled': val === this.props.min || this.props.disabled },
          _react2['default'].createElement(
            'i',
            { className: 'rw-i rw-i-caret-down' },
            _react2['default'].createElement(
              'span',
              { className: 'rw-sr' },
              this.props.messages.decrement
            )
          )
        )
      ),
      _react2['default'].createElement(_NumberInput2['default'], {
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
  }
}, {
  key: '_mouseDown',
  decorators: [_utilInteraction.widgetEditable],
  value: function _mouseDown(dir) {
    var method = dir === directions.UP ? this.increment : this.decrement;

    this.setState({ active: dir });

    var val = method.call(this);

    if (!(dir === directions.UP && val === this.props.max || dir === directions.DOWN && val === this.props.min)) {
      if (!this._cancelRepeater) this._cancelRepeater = _utilRepeater2['default'](this._mouseDown.bind(null, dir));
    } else this._mouseUp();
  }
}, {
  key: '_mouseUp',
  decorators: [_utilInteraction.widgetEditable],
  value: function _mouseUp() {
    this.setState({ active: false });
    this._cancelRepeater && this._cancelRepeater();
    this._cancelRepeater = null;
  }
}, {
  key: '_keyDown',
  decorators: [_utilInteraction.widgetEditable],
  value: function _keyDown(e) {
    var key = e.key;

    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

    if (e.defaultPrevented) return;

    if (key === 'End' && isFinite(this.props.max)) this.change(this.props.max);else if (key === 'Home' && isFinite(this.props.min)) this.change(this.props.min);else if (key === 'ArrowDown') {
      e.preventDefault();
      this.decrement();
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      this.increment();
    }
  }
}, {
  key: 'focus',
  value: function focus() {
    _utilCompat2['default'].findDOMNode(this.refs.input).focus();
  }
}, {
  key: 'increment',
  value: function increment() {
    return this.step(this.props.step);
  }
}, {
  key: 'decrement',
  value: function decrement() {
    return this.step(-this.props.step);
  }
}, {
  key: 'step',
  value: function step(amount) {
    var value = (this.props.value || 0) + amount;

    var decimals = this.props.precision != null ? this.props.precision : _utilLocalizers.number.precision(format(this.props));

    this.change(decimals != null ? round(value, decimals) : value);

    return value;
  }
}, {
  key: 'change',
  value: function change(val) {
    val = this.constrainValue(val);

    if (this.props.value !== val) _utilWidgetHelpers.notify(this.props.onChange, val);
  }
}, {
  key: 'constrainValue',
  value: function constrainValue(value) {
    var max = this.props.max == null ? Infinity : this.props.max,
        min = this.props.min == null ? -Infinity : this.props.min;

    if (value == null || value === '') return null;

    return Math.max(Math.min(value, max), min);
  }
}]));

exports['default'] = _uncontrollable2['default'](NumberPicker, { value: 'onChange' });

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

//allow for styling, focus stealing keeping me from the normal what have you