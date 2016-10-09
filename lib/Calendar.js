'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _VIEW, _OPPOSITE_DIRECTION, _MULTIPLIER, _class, _desc, _value2, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class3, _temp; //values, omit


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

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

var _SlideTransition = require('./SlideTransition');

var _SlideTransition2 = _interopRequireDefault(_SlideTransition);

var _localizers = require('./util/localizers');

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dates = require('./util/dates');

var _dates2 = _interopRequireDefault(_dates);

var _constants = require('./util/constants');

var constants = _interopRequireWildcard(_constants);

var _autoFocus = require('./util/autoFocus');

var _autoFocus2 = _interopRequireDefault(_autoFocus);

var _focusManager = require('./util/focusManager');

var _focusManager2 = _interopRequireDefault(_focusManager);

var _withRightToLeft = require('./util/withRightToLeft');

var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _widgetHelpers = require('./util/widgetHelpers');

var _interaction = require('./util/interaction');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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

var propTypes = _extends({}, _autoFocus2.default.propTypes, {

  activeId: _react2.default.PropTypes.string,
  disabled: _propTypes2.default.disabled,
  readOnly: _propTypes2.default.readOnly,

  onChange: _react2.default.PropTypes.func,
  value: _react2.default.PropTypes.instanceOf(Date),

  min: _react2.default.PropTypes.instanceOf(Date),
  max: _react2.default.PropTypes.instanceOf(Date),

  currentDate: _react2.default.PropTypes.instanceOf(Date),
  onCurrentDateChange: _react2.default.PropTypes.func,

  view: _react2.default.PropTypes.oneOf(VIEW_OPTIONS),
  initialView: _react2.default.PropTypes.oneOf(VIEW_OPTIONS),

  finalView: function finalView(props, propName, componentName) {
    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      args[_key - 3] = arguments[_key];
    }

    var err = _react2.default.PropTypes.oneOf(VIEW_OPTIONS).apply(undefined, [props, propName, componentName].concat(args));

    if (err) return err;
    if (VIEW_OPTIONS.indexOf(props[propName]) < VIEW_OPTIONS.indexOf(props.initialView)) return new Error(('The `' + propName + '` prop: `' + props[propName] + '` cannot be \'lower\' than the `initialView`\n        prop. This creates a range that cannot be rendered.').replace(/\n\t/g, ''));
  },


  onViewChange: _react2.default.PropTypes.func,
  onNavigate: _react2.default.PropTypes.func,
  culture: _react2.default.PropTypes.string,
  footer: _react2.default.PropTypes.bool,

  dayComponent: _propTypes2.default.elementType,
  headerFormat: _propTypes2.default.dateFormat,
  footerFormat: _propTypes2.default.dateFormat,

  dayFormat: _propTypes2.default.dateFormat,
  dateFormat: _propTypes2.default.dateFormat,
  monthFormat: _propTypes2.default.dateFormat,
  yearFormat: _propTypes2.default.dateFormat,
  decadeFormat: _propTypes2.default.dateFormat,
  centuryFormat: _propTypes2.default.dateFormat,

  messages: _react2.default.PropTypes.shape({
    moveBack: _react2.default.PropTypes.string,
    moveForward: _react2.default.PropTypes.string
  })
});

var Calendar = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar() {
    _classCallCheck(this, Calendar);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.handleFocusChanged = function () {
      if (+_this.props.tabIndex === -1) return false;
    };

    _initDefineProp(_this, 'handleViewChange', _descriptor, _this);

    _initDefineProp(_this, 'handleMoveBack', _descriptor2, _this);

    _initDefineProp(_this, 'handleMoveForward', _descriptor3, _this);

    _initDefineProp(_this, 'handleChange', _descriptor4, _this);

    _initDefineProp(_this, 'handleFooterClick', _descriptor5, _this);

    _initDefineProp(_this, 'handleKeyDown', _descriptor6, _this);

    _this.viewId = (0, _widgetHelpers.instanceId)(_this, '_calendar');
    _this.labelId = (0, _widgetHelpers.instanceId)(_this, '_calendar_label');
    _this.activeId = _this.props.activeId || (0, _widgetHelpers.instanceId)(_this, '_calendar_active_cell');

    (0, _autoFocus2.default)(_this);
    _this.focusManager = (0, _focusManager2.default)(_this, {
      didHandle: _this.handleFocusChanged
    });

    _this.state = {
      selectedIndex: 0,
      view: _this.props.initialView || 'month'
    };
    return _this;
  }

  Calendar.prototype.componentWillReceiveProps = function componentWillReceiveProps(_ref) {
    var initialView = _ref.initialView;
    var finalView = _ref.finalView;
    var value = _ref.value;
    var currentDate = _ref.currentDate;

    var bottom = VIEW_OPTIONS.indexOf(initialView),
        top = VIEW_OPTIONS.indexOf(finalView),
        current = VIEW_OPTIONS.indexOf(this.state.view),
        view = this.state.view,
        val = this.inRangeValue(value);

    if (current < bottom) this.setState({ view: view = initialView });else if (current > top) this.setState({ view: view = finalView });

    //if the value changes reset views to the new one
    if (!_dates2.default.eq(val, dateOrNull(this.props.value), VIEW_UNIT[view])) {
      this.setCurrentDate(val, currentDate);
    }
  };

  Calendar.prototype.render = function render() {
    var _this2 = this;

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
    var tabIndex = _props.tabIndex;
    var _state = this.state;
    var view = _state.view;
    var slideDirection = _state.slideDirection;
    var focused = _state.focused;

    var currentDate = this.getCurrentDate();

    var View = VIEW[view],
        todaysDate = new Date(),
        todayNotInRange = !_dates2.default.inRange(todaysDate, min, max, view);

    var key = view + '_' + _dates2.default[view](currentDate);

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
        onKeyDown: this.handleKeyDown,
        onBlur: this.focusManager.handleBlur,
        onFocus: this.focusManager.handleFocus,
        className: (0, _classnames2.default)(className, 'rw-calendar rw-widget-container'),
        'aria-activedescendant': this.activeId
      }),
      _react2.default.createElement(_Header2.default, {
        label: this.getHeaderLabel(),
        labelId: this.labelId,
        messages: messages,
        upDisabled: isDisabled || view === finalView,
        prevDisabled: isDisabled || !_dates2.default.inRange(this.nextDate(dir.LEFT), min, max, view),
        nextDisabled: isDisabled || !_dates2.default.inRange(this.nextDate(dir.RIGHT), min, max, view),
        onViewChange: this.handleViewChange,
        onMoveLeft: this.handleMoveBack,
        onMoveRight: this.handleMoveForward
      }),
      _react2.default.createElement(
        _SlideTransition2.default,
        {
          ref: 'animation',
          duration: duration,
          direction: slideDirection,
          onAnimate: function onAnimate() {
            return focused && _this2.focus();
          }
        },
        _react2.default.createElement(View, _extends({}, viewProps, {
          key: key,
          id: this.viewId,
          activeId: this.activeId,
          value: value,
          today: todaysDate,
          disabled: disabled,
          focused: currentDate,
          onChange: this.handleChange,
          onKeyDown: this.handleKeyDown,
          'aria-labelledby': this.labelId
        }))
      ),
      footer && _react2.default.createElement(_Footer2.default, {
        value: todaysDate,
        format: footerFormat,
        culture: culture,
        disabled: disabled || todayNotInRange,
        readOnly: readOnly,
        onClick: this.handleFooterClick
      })
    );
  };

  Calendar.prototype.navigate = function navigate(direction, date) {
    var view = this.state.view,
        slideDir = direction === dir.LEFT || direction === dir.UP ? 'right' : 'left';

    if (!date) date = [dir.LEFT, dir.RIGHT].indexOf(direction) !== -1 ? this.nextDate(direction) : this.getCurrentDate();

    if (direction === dir.DOWN) view = ALT_VIEW[view] || view;

    if (direction === dir.UP) view = NEXT_VIEW[view] || view;

    if (this.isValidView(view) && _dates2.default.inRange(date, this.props.min, this.props.max, view)) {
      (0, _widgetHelpers.notify)(this.props.onNavigate, [date, slideDir, view]);
      this.focus(true);

      this.setCurrentDate(date);

      this.setState({
        slideDirection: slideDir,
        view: view
      });
    }
  };

  Calendar.prototype.focus = function focus() {
    if (+this.props.tabIndex > -1) _compat2.default.findDOMNode(this).focus();
  };

  Calendar.prototype.getCurrentDate = function getCurrentDate() {
    return this.props.currentDate || this.props.value || new Date();
  };

  Calendar.prototype.setCurrentDate = function setCurrentDate(date) {
    var currentDate = arguments.length <= 1 || arguments[1] === undefined ? this.getCurrentDate() : arguments[1];

    var inRangeDate = this.inRangeValue(date ? new Date(date) : currentDate);

    if (_dates2.default.eq(inRangeDate, dateOrNull(currentDate), VIEW_UNIT[this.state.view])) return;
    (0, _widgetHelpers.notify)(this.props.onCurrentDateChange, inRangeDate);
  };

  Calendar.prototype.nextDate = function nextDate(direction) {
    var method = direction === dir.LEFT ? 'subtract' : 'add',
        view = this.state.view,
        unit = view === views.MONTH ? view : views.YEAR,
        multi = MULTIPLIER[view] || 1;

    return _dates2.default[method](this.getCurrentDate(), 1 * multi, unit);
  };

  Calendar.prototype.getHeaderLabel = function getHeaderLabel() {
    var _props2 = this.props;
    var culture = _props2.culture;
    var props = _objectWithoutProperties(_props2, ['culture']);
    var view = this.state.view;
    var currentDate = this.getCurrentDate();

    switch (view) {
      case views.MONTH:
        return _localizers.date.format(currentDate, format(props, 'header'), culture);

      case views.YEAR:
        return _localizers.date.format(currentDate, format(props, 'year'), culture);

      case views.DECADE:
        return _localizers.date.format(_dates2.default.startOf(currentDate, 'decade'), format(props, 'decade'), culture);
      case views.CENTURY:
        return _localizers.date.format(_dates2.default.startOf(currentDate, 'century'), format(props, 'century'), culture);
    }
  };

  Calendar.prototype.inRangeValue = function inRangeValue(_value) {
    var value = dateOrNull(_value);

    if (value === null) return value;

    return _dates2.default.max(_dates2.default.min(value, this.props.max), this.props.min);
  };

  Calendar.prototype.isValidView = function isValidView(next) {
    var bottom = VIEW_OPTIONS.indexOf(this.props.initialView),
        top = VIEW_OPTIONS.indexOf(this.props.finalView),
        current = VIEW_OPTIONS.indexOf(next);

    return current >= bottom && current <= top;
  };

  return Calendar;
}(_react2.default.Component), _class3.displayName = 'Calendar', _class3.propTypes = propTypes, _class3.defaultProps = {

  value: null,
  min: new Date(1900, 0, 1),
  max: new Date(2099, 11, 31),

  initialView: 'month',
  finalView: 'century',

  tabIndex: '0',
  footer: true,

  messages: msgs({})
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleViewChange', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function () {
      _this3.navigate(dir.UP);
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleMoveBack', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      _this4.navigate(dir.LEFT);
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'handleMoveForward', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function () {
      _this5.navigate(dir.RIGHT);
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'handleChange', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (date) {
      var isAtBottomView = _this6.state.view === _this6.props.initialView;

      if (isAtBottomView) {
        _this6.setCurrentDate(date);

        (0, _widgetHelpers.notify)(_this6.props.onChange, date);

        _this6.focus();
        return;
      }

      _this6.navigate(dir.DOWN, date);
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'handleFooterClick', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (date) {
      var _props3 = _this7.props;
      var initialView = _props3.initialView;
      var min = _props3.min;
      var max = _props3.max;
      var currentView = _this7.state.view;


      var currentDate = _this7.getCurrentDate();

      var slideDir = initialView !== currentView || _dates2.default.gt(date, currentDate) ? 'left' // move down to a the view
      : 'right';

      (0, _widgetHelpers.notify)(_this7.props.onChange, date);

      if (_this7.isValidView(initialView) && _dates2.default.inRange(date, min, max, initialView)) {
        _this7.focus();

        _this7.setCurrentDate(date);

        _this7.setState({
          slideDirection: slideDir,
          view: initialView
        });
      }
    };
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this8 = this;

    return function (e) {
      var ctrl = e.ctrlKey || e.metaKey,
          key = e.key,
          direction = ARROWS_TO_DIRECTION[key],
          currentDate = _this8.getCurrentDate(),
          view = _this8.state.view,
          unit = VIEW_UNIT[view];

      if (key === 'Enter') {
        e.preventDefault();
        return _this8.handleChange(currentDate);
      }

      if (direction) {
        if (ctrl) {
          e.preventDefault();
          _this8.navigate(direction);
        } else {
          if (_this8.isRtl() && OPPOSITE_DIRECTION[direction]) direction = OPPOSITE_DIRECTION[direction];

          var nextDate = _dates2.default.move(currentDate, _this8.props.min, _this8.props.max, view, direction);

          if (!_dates2.default.eq(currentDate, nextDate, unit)) {
            e.preventDefault();

            if (_dates2.default.gt(nextDate, currentDate, view)) _this8.navigate(dir.RIGHT, nextDate);else if (_dates2.default.lt(nextDate, currentDate, view)) _this8.navigate(dir.LEFT, nextDate);else _this8.setCurrentDate(nextDate);
          }
        }
      }

      (0, _widgetHelpers.notify)(_this8.props.onKeyDown, [e]);
    };
  }
})), _class2)) || _class;

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