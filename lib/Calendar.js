'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _VIEW, _OPPOSITE_DIRECTION, _MULTIPLIER;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

var _Header = require('./Header');

var _Header2 = babelHelpers.interopRequireDefault(_Header);

var _Footer = require('./Footer');

var _Footer2 = babelHelpers.interopRequireDefault(_Footer);

var _Month = require('./Month');

var _Month2 = babelHelpers.interopRequireDefault(_Month);

var _Year = require('./Year');

var _Year2 = babelHelpers.interopRequireDefault(_Year);

var _Decade = require('./Decade');

var _Decade2 = babelHelpers.interopRequireDefault(_Decade);

var _Century = require('./Century');

var _Century2 = babelHelpers.interopRequireDefault(_Century);

var _utilConfiguration = require('./util/configuration');

var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

var _SlideTransition = require('./SlideTransition');

var _SlideTransition2 = babelHelpers.interopRequireDefault(_SlideTransition);

var _utilDates = require('./util/dates');

var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

var _utilConstants = require('./util/constants');

var _utilConstants2 = babelHelpers.interopRequireDefault(_utilConstants);

var _util_ = require('./util/_');

var _util_2 = babelHelpers.interopRequireDefault(_util_);

//values, omit

var _utilWidgetHelpers = require('./util/widgetHelpers');

var _utilInteraction = require('./util/interaction');

var dir = _utilConstants2['default'].directions,
    values = function values(obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
},
    invert = function invert(obj) {
  return _util_2['default'].transform(obj, function (o, val, key) {
    o[val] = key;
  }, {});
};

var localizers = _utilConfiguration2['default'].locale,
    views = _utilConstants2['default'].calendarViews,
    VIEW_OPTIONS = values(views),
    ALT_VIEW = invert(_utilConstants2['default'].calendarViewHierarchy),
    NEXT_VIEW = _utilConstants2['default'].calendarViewHierarchy,
    VIEW_UNIT = _utilConstants2['default'].calendarViewUnits,
    VIEW = (_VIEW = {}, _VIEW[views.MONTH] = _Month2['default'], _VIEW[views.YEAR] = _Year2['default'], _VIEW[views.DECADE] = _Decade2['default'], _VIEW[views.CENTURY] = _Century2['default'], _VIEW);

var ARROWS_TO_DIRECTION = {
  ArrowDown: dir.DOWN,
  ArrowUp: dir.UP,
  ArrowRight: dir.RIGHT,
  ArrowLeft: dir.LEFT
};

var OPPOSITE_DIRECTION = (_OPPOSITE_DIRECTION = {}, _OPPOSITE_DIRECTION[dir.LEFT] = dir.RIGHT, _OPPOSITE_DIRECTION[dir.RIGHT] = dir.LEFT, _OPPOSITE_DIRECTION);

var MULTIPLIER = (_MULTIPLIER = {}, _MULTIPLIER[views.YEAR] = 1, _MULTIPLIER[views.DECADE] = 10, _MULTIPLIER[views.CENTURY] = 100, _MULTIPLIER);

var format = function format(props, f) {
  return props[f + 'Format'] || localizers.date.formats[f];
};

var propTypes = {

  disabled: _utilPropTypes2['default'].disabled,
  readOnly: _utilPropTypes2['default'].readOnly,

  onChange: _react2['default'].PropTypes.func,
  value: _react2['default'].PropTypes.instanceOf(Date),

  min: _react2['default'].PropTypes.instanceOf(Date),
  max: _react2['default'].PropTypes.instanceOf(Date),

  initialView: _react2['default'].PropTypes.oneOf(VIEW_OPTIONS),

  finalView: function finalView(props, propname, componentName) {
    var err = _react2['default'].PropTypes.oneOf(VIEW_OPTIONS)(props, propname, componentName);

    if (err) return err;
    if (VIEW_OPTIONS.indexOf(props[propname]) < VIEW_OPTIONS.indexOf(props.initialView)) return new Error(('The `' + propname + '` prop: `' + props[propname] + '` cannot be \'lower\' than the `initialView`\n        prop. This creates a range that cannot be rendered.').replace(/\n\t/g, ''));
  },

  culture: _react2['default'].PropTypes.string,

  footer: _react2['default'].PropTypes.bool,

  dayComponent: _utilPropTypes2['default'].elementType,
  headerFormat: _utilPropTypes2['default'].dateFormat,
  footerFormat: _utilPropTypes2['default'].dateFormat,

  dayFormat: _utilPropTypes2['default'].dateFormat,
  dateFormat: _utilPropTypes2['default'].dateFormat,
  monthFormat: _utilPropTypes2['default'].dateFormat,
  yearFormat: _utilPropTypes2['default'].dateFormat,
  decadeFormat: _utilPropTypes2['default'].dateFormat,
  centuryFormat: _utilPropTypes2['default'].dateFormat,

  messages: _react2['default'].PropTypes.shape({
    moveBack: _react2['default'].PropTypes.string,
    moveForward: _react2['default'].PropTypes.string
  })
};

var Calendar = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
  key: 'displayName',
  initializer: function initializer() {
    return 'Calendar';
  }
}, {
  key: 'mixins',
  initializer: function initializer() {
    return [require('./mixins/TimeoutMixin'), require('./mixins/PureRenderMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/AriaDescendantMixin')()];
  }
}, {
  key: 'propTypes',
  initializer: function initializer() {
    return propTypes;
  }
}, {
  key: 'getInitialState',
  value: function getInitialState() {
    var value = this.inRangeValue(this.props.value);

    return {
      selectedIndex: 0,
      view: this.props.initialView || 'month',
      currentDate: value ? new Date(value) : this.inRangeValue(new Date())
    };
  }
}, {
  key: 'getDefaultProps',
  value: function getDefaultProps() {
    return {

      value: null,
      min: new Date(1900, 0, 1),
      max: new Date(2099, 11, 31),

      initialView: 'month',
      finalView: 'century',

      tabIndex: '0',
      footer: false,

      ariaActiveDescendantKey: 'calendar',
      messages: msgs({})
    };
  }
}, {
  key: 'componentWillReceiveProps',
  value: function componentWillReceiveProps(nextProps) {
    var bottom = VIEW_OPTIONS.indexOf(nextProps.initialView),
        top = VIEW_OPTIONS.indexOf(nextProps.finalView),
        current = VIEW_OPTIONS.indexOf(this.state.view),
        view = this.state.view,
        val = this.inRangeValue(nextProps.value);

    if (current < bottom) this.setState({ view: view = nextProps.initialView });else if (current > top) this.setState({ view: view = nextProps.finalView });

    //if the value changes reset views to the new one
    if (!_utilDates2['default'].eq(val, dateOrNull(this.props.value), VIEW_UNIT[view])) this.setState({
      currentDate: val ? new Date(val) : new Date()
    });
  }
}, {
  key: 'render',
  value: function render() {
    var _this = this;

    var _props = this.props;
    var className = _props.className;
    var value = _props.value;
    var footerFormat = _props.footerFormat;
    var disabled = _props.disabled;
    var readOnly = _props.readOnly;
    var finalView = _props.finalView;
    var footer = _props.footer;
    var messages = _props.messages;
    var min = _props.min;
    var max = _props.max;
    var culture = _props.culture;
    var duration = _props.duration;
    var _state = this.state;
    var view = _state.view;
    var currentDate = _state.currentDate;
    var slideDirection = _state.slideDirection;
    var focused = _state.focused;

    var View = VIEW[view],
        unit = VIEW_UNIT[view],
        todaysDate = new Date(),
        todayNotInRange = !_utilDates2['default'].inRange(todaysDate, min, max, view);

    unit = unit === 'day' ? 'date' : unit;

    var viewID = _utilWidgetHelpers.instanceId(this, '_calendar'),
        labelID = _utilWidgetHelpers.instanceId(this, '_calendar_label'),
        key = view + '_' + _utilDates2['default'][view](currentDate);

    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes)),
        viewProps = _util_2['default'].pick(this.props, Object.keys(_utilCompat2['default'].type(View).propTypes));

    var isDisabled = disabled || readOnly;

    messages = msgs(this.props.messages);

    return _react2['default'].createElement(
      'div',
      babelHelpers._extends({}, elementProps, {
        role: 'group',
        onKeyDown: this._keyDown,
        onFocus: this._focus.bind(null, true),
        onBlur: this._focus.bind(null, false),
        className: _classnames2['default'](className, 'rw-calendar', 'rw-widget', {
          'rw-state-focus': focused,
          'rw-state-disabled': disabled,
          'rw-state-readonly': readOnly,
          'rw-rtl': this.isRtl()
        })
      }),
      _react2['default'].createElement(_Header2['default'], {
        label: this._label(),
        labelId: labelID,
        messages: messages,
        upDisabled: isDisabled || view === finalView,
        prevDisabled: isDisabled || !_utilDates2['default'].inRange(this.nextDate(dir.LEFT), min, max, view),
        nextDisabled: isDisabled || !_utilDates2['default'].inRange(this.nextDate(dir.RIGHT), min, max, view),
        onViewChange: this.navigate.bind(null, dir.UP, null),
        onMoveLeft: this.navigate.bind(null, dir.LEFT, null),
        onMoveRight: this.navigate.bind(null, dir.RIGHT, null)
      }),
      _react2['default'].createElement(
        _SlideTransition2['default'],
        {
          ref: 'animation',
          duration: duration,
          direction: slideDirection,
          onAnimate: function () {
            return _this.focus(true);
          }
        },
        _react2['default'].createElement(View, babelHelpers._extends({}, viewProps, {
          tabIndex: '-1',
          key: key,
          id: viewID,
          className: 'rw-calendar-grid',
          'aria-labelledby': labelID,
          today: todaysDate,
          value: value,
          focused: currentDate,
          onChange: this.change,
          onKeyDown: this._keyDown,
          ariaActiveDescendantKey: 'calendarView'
        }))
      ),
      footer && _react2['default'].createElement(_Footer2['default'], {
        value: todaysDate,
        format: footerFormat,
        culture: culture,
        disabled: disabled || todayNotInRange,
        readOnly: readOnly,
        onClick: this.select
      })
    );
  }
}, {
  key: 'navigate',
  decorators: [_utilInteraction.widgetEditable],
  value: function navigate(direction, date) {
    var view = this.state.view,
        slideDir = direction === dir.LEFT || direction === dir.UP ? 'right' : 'left';

    if (!date) date = [dir.LEFT, dir.RIGHT].indexOf(direction) !== -1 ? this.nextDate(direction) : this.state.currentDate;

    if (direction === dir.DOWN) view = ALT_VIEW[view] || view;

    if (direction === dir.UP) view = NEXT_VIEW[view] || view;

    if (this.isValidView(view) && _utilDates2['default'].inRange(date, this.props.min, this.props.max, view)) {
      _utilWidgetHelpers.notify(this.props.onNavigate, [date, slideDir, view]);
      this.focus(true);

      this.setState({
        currentDate: date,
        slideDirection: slideDir,
        view: view
      });
    }
  }
}, {
  key: 'focus',
  value: function focus() {
    if (+this.props.tabIndex > -1) _utilCompat2['default'].findDOMNode(this).focus();

    //console.log(document.activeElement)
  }
}, {
  key: '_focus',
  decorators: [_utilInteraction.widgetEnabled],
  value: function _focus(focused, e) {
    var _this2 = this;

    if (+this.props.tabIndex === -1) return;

    this.setTimeout('focus', function () {
      if (focused !== _this2.state.focused) {
        _utilWidgetHelpers.notify(_this2.props[focused ? 'onFocus' : 'onBlur'], e);
        _this2.setState({ focused: focused });
      }
    });
  }
}, {
  key: 'change',
  decorators: [_utilInteraction.widgetEditable],
  value: function change(date) {
    if (this.state.view === this.props.initialView) {
      _utilWidgetHelpers.notify(this.props.onChange, date);
      this.focus();
      return;
    }

    this.navigate(dir.DOWN, date);
  }
}, {
  key: 'select',
  decorators: [_utilInteraction.widgetEditable],
  value: function select(date) {
    var view = this.props.initialView,
        slideDir = view !== this.state.view || _utilDates2['default'].gt(date, this.state.currentDate) ? 'left' // move down to a the view
    : 'right';

    _utilWidgetHelpers.notify(this.props.onChange, date);

    if (this.isValidView(view) && _utilDates2['default'].inRange(date, this.props.min, this.props.max, view)) {
      this.focus();

      this.setState({
        currentDate: date,
        slideDirection: slideDir,
        view: view
      });
    }
  }
}, {
  key: 'nextDate',
  value: function nextDate(direction) {
    var method = direction === dir.LEFT ? 'subtract' : 'add',
        view = this.state.view,
        unit = view === views.MONTH ? view : views.YEAR,
        multi = MULTIPLIER[view] || 1;

    return _utilDates2['default'][method](this.state.currentDate, 1 * multi, unit);
  }
}, {
  key: '_keyDown',
  decorators: [_utilInteraction.widgetEditable],
  value: function _keyDown(e) {
    var ctrl = e.ctrlKey,
        key = e.key,
        direction = ARROWS_TO_DIRECTION[key],
        current = this.state.currentDate,
        view = this.state.view,
        unit = VIEW_UNIT[view],
        currentDate = current;

    if (key === 'Enter') {
      e.preventDefault();
      return this.change(current);
    }

    if (direction) {
      if (ctrl) {
        e.preventDefault();
        this.navigate(direction);
      } else {
        if (this.isRtl() && OPPOSITE_DIRECTION[direction]) direction = OPPOSITE_DIRECTION[direction];

        currentDate = _utilDates2['default'].move(currentDate, this.props.min, this.props.max, view, direction);

        if (!_utilDates2['default'].eq(current, currentDate, unit)) {
          e.preventDefault();

          if (_utilDates2['default'].gt(currentDate, current, view)) this.navigate(dir.RIGHT, currentDate);else if (_utilDates2['default'].lt(currentDate, current, view)) this.navigate(dir.LEFT, currentDate);else this.setState({ currentDate: currentDate });
        }
      }
    }

    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);
  }
}, {
  key: '_label',
  value: function _label() {
    var _props2 = this.props;
    var culture = _props2.culture;
    var props = babelHelpers.objectWithoutProperties(_props2, ['culture']);
    var view = this.state.view;
    var dt = this.state.currentDate;

    if (view === 'month') return localizers.date.format(dt, format(props, 'header'), culture);else if (view === 'year') return localizers.date.format(dt, format(props, 'year'), culture);else if (view === 'decade') return localizers.date.format(_utilDates2['default'].startOf(dt, 'decade'), format(props, 'decade'), culture);else if (view === 'century') return localizers.date.format(_utilDates2['default'].startOf(dt, 'century'), format(props, 'century'), culture);
  }
}, {
  key: 'inRangeValue',
  value: function inRangeValue(_value) {
    var value = dateOrNull(_value);

    if (value === null) return value;

    return _utilDates2['default'].max(_utilDates2['default'].min(value, this.props.max), this.props.min);
  }
}, {
  key: 'isValidView',
  value: function isValidView(next) {
    var bottom = VIEW_OPTIONS.indexOf(this.props.initialView),
        top = VIEW_OPTIONS.indexOf(this.props.finalView),
        current = VIEW_OPTIONS.indexOf(next);

    return current >= bottom && current <= top;
  }
}]));

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt;
  return null;
}

function msgs(msgs) {
  return babelHelpers._extends({
    moveBack: 'navigate back',
    moveForward: 'navigate forward'
  }, msgs);
}

var UncontrolledCalendar = _uncontrollable2['default'](Calendar, { value: 'onChange' });

UncontrolledCalendar.BaseCalendar = Calendar;

exports['default'] = UncontrolledCalendar;
module.exports = exports['default'];