'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _VIEW, _OPPOSITE_DIRECTION, _MULTIPLIER, _desc, _value2, _obj; //values, omit


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _Widget = require('./Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Month = require('./Month');

var _Month2 = _interopRequireDefault(_Month);

var _Year = require('./Year');

var _Year2 = _interopRequireDefault(_Year);

var _Decade = require('./Decade');

var _Decade2 = _interopRequireDefault(_Decade);

var _Century = require('./Century');

var _Century2 = _interopRequireDefault(_Century);

var _localizers = require('./util/localizers');

var _propTypes3 = require('./util/propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _SlideTransition = require('./SlideTransition');

var _SlideTransition2 = _interopRequireDefault(_SlideTransition);

var _dates = require('./util/dates');

var _dates2 = _interopRequireDefault(_dates);

var _constants = require('./util/constants');

var constants = _interopRequireWildcard(_constants);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _widgetHelpers = require('./util/widgetHelpers');

var _interaction = require('./util/interaction');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

var dir = constants.directions,
    values = function values(obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
},
    invert = function invert(obj) {
  return _3.default.transform(obj, function (o, val, key) {
    o[val] = key;
  }, {});
};

var views = constants.calendarViews,
    VIEW_OPTIONS = values(views),
    ALT_VIEW = invert(constants.calendarViewHierarchy),
    NEXT_VIEW = constants.calendarViewHierarchy,
    VIEW_UNIT = constants.calendarViewUnits,
    VIEW = (_VIEW = {}, _VIEW[views.MONTH] = _Month2.default, _VIEW[views.YEAR] = _Year2.default, _VIEW[views.DECADE] = _Decade2.default, _VIEW[views.CENTURY] = _Century2.default, _VIEW);

var ARROWS_TO_DIRECTION = {
  ArrowDown: dir.DOWN,
  ArrowUp: dir.UP,
  ArrowRight: dir.RIGHT,
  ArrowLeft: dir.LEFT
};

var OPPOSITE_DIRECTION = (_OPPOSITE_DIRECTION = {}, _OPPOSITE_DIRECTION[dir.LEFT] = dir.RIGHT, _OPPOSITE_DIRECTION[dir.RIGHT] = dir.LEFT, _OPPOSITE_DIRECTION);

var MULTIPLIER = (_MULTIPLIER = {}, _MULTIPLIER[views.YEAR] = 1, _MULTIPLIER[views.DECADE] = 10, _MULTIPLIER[views.CENTURY] = 100, _MULTIPLIER);

var format = function format(props, f) {
  return _localizers.date.getFormat(f, props[f + 'Format']);
};

var propTypes = {

  disabled: _propTypes4.default.disabled,
  readOnly: _propTypes4.default.readOnly,

  onChange: _propTypes2.default.func,
  value: _propTypes2.default.instanceOf(Date),

  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),

  currentDate: _propTypes2.default.instanceOf(Date),
  onCurrentDateChange: _propTypes2.default.func,

  view: _propTypes2.default.oneOf(VIEW_OPTIONS),
  initialView: _propTypes2.default.oneOf(VIEW_OPTIONS),

  finalView: function finalView(props, propName, componentName) {
    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    var err = _propTypes2.default.oneOf(VIEW_OPTIONS).apply(undefined, [props, propName, componentName].concat(args));

    if (err) return err;
    if (VIEW_OPTIONS.indexOf(props[propName]) < VIEW_OPTIONS.indexOf(props.initialView)) return new Error(('The `' + propName + '` prop: `' + props[propName] + '` cannot be \'lower\' than the `initialView`\n        prop. This creates a range that cannot be rendered.').replace(/\n\t/g, ''));
  },


  onViewChange: _propTypes2.default.func,
  onNavigate: _propTypes2.default.func,
  culture: _propTypes2.default.string,
  footer: _propTypes2.default.bool,

  dayComponent: _propTypes4.default.elementType,
  headerFormat: _propTypes4.default.dateFormat,
  footerFormat: _propTypes4.default.dateFormat,

  dayFormat: _propTypes4.default.dateFormat,
  dateFormat: _propTypes4.default.dateFormat,
  monthFormat: _propTypes4.default.dateFormat,
  yearFormat: _propTypes4.default.dateFormat,
  decadeFormat: _propTypes4.default.dateFormat,
  centuryFormat: _propTypes4.default.dateFormat,

  messages: _propTypes2.default.shape({
    moveBack: _propTypes2.default.string,
    moveForward: _propTypes2.default.string
  })
};

var Calendar = (0, _createReactClass2.default)((_obj = {

  displayName: 'Calendar',

  mixins: [require('./mixins/TimeoutMixin'), require('./mixins/AutoFocusMixin'), require('./mixins/PureRenderMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/AriaDescendantMixin')(), require('./mixins/FocusMixin')({
    willHandle: function willHandle() {
      if (+this.props.tabIndex === -1) return false;
    }
  })],

  propTypes: propTypes,

  getInitialState: function getInitialState() {
    return {
      selectedIndex: 0,
      view: this.props.initialView || 'month'
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {

      value: null,
      min: new Date(1900, 0, 1),
      max: new Date(2099, 11, 31),
      currentDate: new Date(),

      initialView: 'month',
      finalView: 'century',

      tabIndex: '0',
      footer: false,

      ariaActiveDescendantKey: 'calendar',
      messages: msgs({})
    };
  },
  componentWillMount: function componentWillMount() {
    this.changeCurrentDate(this.props.value);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var bottom = VIEW_OPTIONS.indexOf(nextProps.initialView),
        top = VIEW_OPTIONS.indexOf(nextProps.finalView),
        current = VIEW_OPTIONS.indexOf(this.state.view),
        view = this.state.view,
        val = this.inRangeValue(nextProps.value);

    if (current < bottom) this.setState({ view: view = nextProps.initialView });else if (current > top) this.setState({ view: view = nextProps.finalView });

    //if the value changes reset views to the new one
    if (!_dates2.default.eq(val, dateOrNull(this.props.value), VIEW_UNIT[view])) {
      this.changeCurrentDate(val, nextProps.currentDate);
    }
  },
  render: function render() {
    var _this = this;

    var _props = this.props,
        className = _props.className,
        value = _props.value,
        footerFormat = _props.footerFormat,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        finalView = _props.finalView,
        footer = _props.footer,
        messages = _props.messages,
        min = _props.min,
        max = _props.max,
        culture = _props.culture,
        duration = _props.duration,
        tabIndex = _props.tabIndex,
        currentDate = _props.currentDate;
    var _state = this.state,
        view = _state.view,
        slideDirection = _state.slideDirection,
        focused = _state.focused;


    var View = VIEW[view],
        unit = VIEW_UNIT[view],
        todaysDate = new Date(),
        todayNotInRange = !_dates2.default.inRange(todaysDate, min, max, view);

    unit = unit === 'day' ? 'date' : unit;

    var viewID = (0, _widgetHelpers.instanceId)(this, '_calendar'),
        labelID = (0, _widgetHelpers.instanceId)(this, '_calendar_label'),
        key = view + '_' + _dates2.default[view](currentDate);

    var elementProps = _3.default.omitOwnProps(this),
        viewProps = _3.default.pickProps(this.props, View);

    var isDisabled = disabled || readOnly;

    messages = msgs(this.props.messages);

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        role: 'group',
        focused: focused,
        disabled: disabled,
        readOnly: readOnly,
        tabIndex: tabIndex || 0,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
        className: (0, _classnames2.default)(className, 'rw-calendar')
      }),
      _react2.default.createElement(_Header2.default, {
        label: this._label(),
        labelId: labelID,
        messages: messages,
        upDisabled: isDisabled || view === finalView,
        prevDisabled: isDisabled || !_dates2.default.inRange(this.nextDate(dir.LEFT), min, max, view),
        nextDisabled: isDisabled || !_dates2.default.inRange(this.nextDate(dir.RIGHT), min, max, view),
        onViewChange: this.navigate.bind(null, dir.UP, null),
        onMoveLeft: this.navigate.bind(null, dir.LEFT, null),
        onMoveRight: this.navigate.bind(null, dir.RIGHT, null)
      }),
      _react2.default.createElement(
        _SlideTransition2.default,
        {
          ref: 'animation',
          duration: duration,
          direction: slideDirection,
          onAnimate: function onAnimate() {
            return focused && _this.focus();
          }
        },
        _react2.default.createElement(View, _extends({}, viewProps, {
          key: key,
          id: viewID,
          value: value,
          today: todaysDate,
          focused: currentDate,
          onChange: this.change,
          onKeyDown: this.handleKeyDown,
          'aria-labelledby': labelID,
          ariaActiveDescendantKey: 'calendarView'
        }))
      ),
      footer && _react2.default.createElement(_Footer2.default, {
        value: todaysDate,
        format: footerFormat,
        culture: culture,
        disabled: disabled || todayNotInRange,
        readOnly: readOnly,
        onClick: this.select
      })
    );
  },
  navigate: function navigate(direction, date) {
    var view = this.state.view,
        slideDir = direction === dir.LEFT || direction === dir.UP ? 'right' : 'left';

    if (!date) date = [dir.LEFT, dir.RIGHT].indexOf(direction) !== -1 ? this.nextDate(direction) : this.props.currentDate;

    if (direction === dir.DOWN) view = ALT_VIEW[view] || view;

    if (direction === dir.UP) view = NEXT_VIEW[view] || view;

    if (this.isValidView(view) && _dates2.default.inRange(date, this.props.min, this.props.max, view)) {
      (0, _widgetHelpers.notify)(this.props.onNavigate, [date, slideDir, view]);
      this.focus(true);

      this.changeCurrentDate(date);

      this.setState({
        slideDirection: slideDir,
        view: view
      });
    }
  },
  focus: function focus() {
    if (+this.props.tabIndex > -1) _compat2.default.findDOMNode(this).focus();
  },
  change: function change(date) {
    if (this.state.view === this.props.initialView) {
      this.changeCurrentDate(date);
      (0, _widgetHelpers.notify)(this.props.onChange, date);
      this.focus();
      return;
    }

    this.navigate(dir.DOWN, date);
  },
  changeCurrentDate: function changeCurrentDate(date) {
    var currentDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.currentDate;

    var inRangeDate = this.inRangeValue(date ? new Date(date) : currentDate);
    if (_dates2.default.eq(inRangeDate, dateOrNull(currentDate), VIEW_UNIT[this.state.view])) return;
    (0, _widgetHelpers.notify)(this.props.onCurrentDateChange, inRangeDate);
  },
  select: function select(date) {
    var view = this.props.initialView,
        slideDir = view !== this.state.view || _dates2.default.gt(date, this.state.currentDate) ? 'left' // move down to a the view
    : 'right';

    (0, _widgetHelpers.notify)(this.props.onChange, date);

    if (this.isValidView(view) && _dates2.default.inRange(date, this.props.min, this.props.max, view)) {
      this.focus();

      this.changeCurrentDate(date);

      this.setState({
        slideDirection: slideDir,
        view: view
      });
    }
  },
  nextDate: function nextDate(direction) {
    var method = direction === dir.LEFT ? 'subtract' : 'add',
        view = this.state.view,
        unit = view === views.MONTH ? view : views.YEAR,
        multi = MULTIPLIER[view] || 1;

    return _dates2.default[method](this.props.currentDate, 1 * multi, unit);
  },
  handleKeyDown: function handleKeyDown(e) {
    var ctrl = e.ctrlKey,
        key = e.key,
        direction = ARROWS_TO_DIRECTION[key],
        current = this.props.currentDate,
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

        currentDate = _dates2.default.move(currentDate, this.props.min, this.props.max, view, direction);

        if (!_dates2.default.eq(current, currentDate, unit)) {
          e.preventDefault();

          if (_dates2.default.gt(currentDate, current, view)) this.navigate(dir.RIGHT, currentDate);else if (_dates2.default.lt(currentDate, current, view)) this.navigate(dir.LEFT, currentDate);else this.changeCurrentDate(currentDate);
        }
      }
    }

    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);
  },
  _label: function _label() {
    var _props2 = this.props,
        culture = _props2.culture,
        props = _objectWithoutProperties(_props2, ['culture']),
        view = this.state.view,
        dt = this.props.currentDate;

    if (view === 'month') return _localizers.date.format(dt, format(props, 'header'), culture);else if (view === 'year') return _localizers.date.format(dt, format(props, 'year'), culture);else if (view === 'decade') return _localizers.date.format(_dates2.default.startOf(dt, 'decade'), format(props, 'decade'), culture);else if (view === 'century') return _localizers.date.format(_dates2.default.startOf(dt, 'century'), format(props, 'century'), culture);
  },
  inRangeValue: function inRangeValue(_value) {
    var value = dateOrNull(_value);

    if (value === null) return value;

    return _dates2.default.max(_dates2.default.min(value, this.props.max), this.props.min);
  },
  isValidView: function isValidView(next) {
    var bottom = VIEW_OPTIONS.indexOf(this.props.initialView),
        top = VIEW_OPTIONS.indexOf(this.props.finalView),
        current = VIEW_OPTIONS.indexOf(next);

    return current >= bottom && current <= top;
  }
}, (_applyDecoratedDescriptor(_obj, 'navigate', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'navigate'), _obj), _applyDecoratedDescriptor(_obj, 'change', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'change'), _obj), _applyDecoratedDescriptor(_obj, 'select', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'select'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyDown'), _obj)), _obj));

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt;
  return null;
}

function msgs(msgs) {
  return _extends({
    moveBack: 'navigate back',
    moveForward: 'navigate forward'
  }, msgs);
}

exports.default = (0, _uncontrollable2.default)(Calendar, {
  value: 'onChange',
  currentDate: 'onCurrentDateChange',
  view: 'onViewChange'
}, ['focus']);
module.exports = exports['default'];