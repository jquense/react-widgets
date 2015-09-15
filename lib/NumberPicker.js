'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var _utilInteraction = require('./util/interaction');

var _utilWidgetHelpers = require('./util/widgetHelpers');

var React = require('react'),
    cx = require('classnames'),
    _ = require('./util/_'),
    //omit
compat = require('./util/compat'),
    CustomPropTypes = require('./util/propTypes'),
    createUncontrolledWidget = require('uncontrollable'),
    directions = require('./util/constants').directions,
    repeater = require('./util/repeater'),
    localizers = require('./util/configuration').locale,
    Input = require('./NumberInput');

var Btn = require('./WidgetButton');

var format = function format(props) {
  return props.format || localizers.number.formats['default'];
};

var propTypes = {

  // -- controlled props -----------
  value: React.PropTypes.number,
  onChange: React.PropTypes.func,
  //------------------------------------

  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,

  precision: React.PropTypes.number,

  culture: React.PropTypes.string,

  format: CustomPropTypes.numberFormat,

  name: React.PropTypes.string,

  parse: React.PropTypes.func,

  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.readOnly,

  messages: React.PropTypes.shape({
    increment: React.PropTypes.string,
    decrement: React.PropTypes.string
  })
};

var NumberPicker = React.createClass(babelHelpers.createDecoratedObject([{
  key: 'displayName',
  initializer: function initializer() {
    return 'NumberPicker';
  }
}, {
  key: 'mixins',
  initializer: function initializer() {
    return [require('./mixins/TimeoutMixin'), require('./mixins/PureRenderMixin'), require('./mixins/RtlParentContextMixin')];
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
    var _$omit = _.omit(this.props, Object.keys(propTypes));

    var className = _$omit.className;
    var onKeyDown = _$omit.onKeyDown;
    var onKeyPress = _$omit.onKeyPress;
    var onKeyUp = _$omit.onKeyUp;
    var props = babelHelpers.objectWithoutProperties(_$omit, ['className', 'onKeyDown', 'onKeyPress', 'onKeyUp']);
    var val = this.constrainValue(this.props.value);

    return React.createElement(
      'div',
      babelHelpers._extends({}, props, {
        ref: 'element',
        onKeyDown: this._keyDown,
        onFocus: this._focus.bind(null, true),
        onBlur: this._focus.bind(null, false),
        tabIndex: '-1',
        className: cx(className, 'rw-numberpicker', 'rw-widget', {
          'rw-state-focus': this.state.focused,
          'rw-state-disabled': this.props.disabled,
          'rw-state-readonly': this.props.readOnly,
          'rw-rtl': this.isRtl()
        }) }),
      React.createElement(
        'span',
        { className: 'rw-select' },
        React.createElement(
          Btn,
          {
            tabIndex: '-1',
            className: cx({ 'rw-state-active': this.state.active === directions.UP }),
            onMouseDown: this._mouseDown.bind(null, directions.UP),
            onMouseUp: this._mouseUp.bind(null, directions.UP),
            onClick: this._focus.bind(null, true),
            disabled: val === this.props.max || this.props.disabled,
            'aria-disabled': val === this.props.max || this.props.disabled },
          React.createElement(
            'i',
            { className: 'rw-i rw-i-caret-up' },
            React.createElement(
              'span',
              { className: 'rw-sr' },
              this.props.messages.increment
            )
          )
        ),
        React.createElement(
          Btn,
          {
            tabIndex: '-1',
            className: cx({ 'rw-state-active': this.state.active === directions.DOWN }),
            onMouseDown: this._mouseDown.bind(null, directions.DOWN),
            onMouseUp: this._mouseUp.bind(null, directions.DOWN),
            onClick: this._focus.bind(null, true),
            disabled: val === this.props.min || this.props.disabled,
            'aria-disabled': val === this.props.min || this.props.disabled },
          React.createElement(
            'i',
            { className: 'rw-i rw-i-caret-down' },
            React.createElement(
              'span',
              { className: 'rw-sr' },
              this.props.messages.decrement
            )
          )
        )
      ),
      React.createElement(Input, {
        ref: 'input',
        tabIndex: props.tabIndex,
        value: val,
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
        onKeyDown: onKeyDown,
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
      if (!this._cancelRepeater) this._cancelRepeater = repeater(this._mouseDown.bind(null, dir));
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
  key: '_focus',
  decorators: [_utilInteraction.widgetEnabled],
  value: function _focus(focused, e) {
    var _this = this;

    focused && compat.findDOMNode(this.refs.input).focus();

    this.setTimeout('focus', function () {
      if (focused !== _this.state.focused) {
        _utilWidgetHelpers.notify(_this.props[focused ? 'onFocus' : 'onBlur'], e);
        _this.setState({ focused: focused });
      }
    }, 0);
  }
}, {
  key: '_keyDown',
  decorators: [_utilInteraction.widgetEditable],
  value: function _keyDown(e) {
    var key = e.key;

    if (key === 'End' && isFinite(this.props.max)) this.change(this.props.max);else if (key === 'Home' && isFinite(this.props.min)) this.change(this.props.min);else if (key === 'ArrowDown') {
      e.preventDefault();
      this.decrement();
    } else if (key === 'ArrowUp') {
      e.preventDefault();
      this.increment();
    }
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

    var decimals = this.props.precision != null ? this.props.precision : localizers.number.precision(format(this.props));

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

module.exports = createUncontrolledWidget(NumberPicker, { value: 'onChange' });

module.exports.BaseNumberPicker = NumberPicker;

//allow for styling, focus stealing keeping me from the normal what have you