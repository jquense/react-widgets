'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var _VIEW, _OPPOSITE_DIRECTION, _MULTIPLIER;

var React = require('react'),
    cx = require('classnames'),
    compat = require('./util/compat'),
    Header = require('./Header'),
    Footer = require('./Footer'),
    Month = require('./Month'),
    Year = require('./Year'),
    Decade = require('./Decade'),
    Century = require('./Century'),
    localizers = require('./util/configuration').locale,
    CustomPropTypes = require('./util/propTypes'),
    createUncontrolledWidget = require('uncontrollable'),
    SlideTransition = require('./SlideTransition'),
    dates = require('./util/dates'),
    constants = require('./util/constants'),
    _ = require('./util/_'); //values, omit

var dir = constants.directions,
    values = function values(obj) {
  return Object.keys(obj).map(function (k) {
    return obj[k];
  });
},
    invert = function invert(obj) {
  return _.transform(obj, function (o, val, key) {
    o[val] = key;
  }, {});
};

var views = constants.calendarViews,
    VIEW_OPTIONS = values(views),
    ALT_VIEW = invert(constants.calendarViewHierarchy),
    NEXT_VIEW = constants.calendarViewHierarchy,
    VIEW_UNIT = constants.calendarViewUnits,
    VIEW = (_VIEW = {}, _VIEW[views.MONTH] = Month, _VIEW[views.YEAR] = Year, _VIEW[views.DECADE] = Decade, _VIEW[views.CENTURY] = Century, _VIEW);

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

  onChange: React.PropTypes.func,
  value: React.PropTypes.instanceOf(Date),

  min: React.PropTypes.instanceOf(Date),
  max: React.PropTypes.instanceOf(Date),

  initialView: React.PropTypes.oneOf(VIEW_OPTIONS),

  finalView: function finalView(props, propname, componentName) {
    var err = React.PropTypes.oneOf(VIEW_OPTIONS)(props, propname, componentName);

    if (err) return err;
    if (VIEW_OPTIONS.indexOf(props[propname]) < VIEW_OPTIONS.indexOf(props.initialView)) return new Error(('The `' + propname + '` prop: `' + props[propname] + '` cannot be \'lower\' than the `initialView`\n                        prop. This creates a range that cannot be rendered.').replace(/\n\t/g, ''));
  },

  disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(['disabled'])]),

  readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(['readOnly'])]),

  culture: React.PropTypes.string,

  footer: React.PropTypes.bool,

  dayComponent: CustomPropTypes.elementType,
  headerFormat: CustomPropTypes.dateFormat,
  footerFormat: CustomPropTypes.dateFormat,

  dayFormat: CustomPropTypes.dateFormat,
  dateFormat: CustomPropTypes.dateFormat,
  monthFormat: CustomPropTypes.dateFormat,
  yearFormat: CustomPropTypes.dateFormat,
  decadeFormat: CustomPropTypes.dateFormat,
  centuryFormat: CustomPropTypes.dateFormat,

  messages: React.PropTypes.shape({
    moveBack: React.PropTypes.string,
    moveForward: React.PropTypes.string
  })
};

var Calendar = React.createClass({

  displayName: 'Calendar',

  mixins: [require('./mixins/WidgetMixin'), require('./mixins/TimeoutMixin'), require('./mixins/PureRenderMixin'), require('./mixins/RtlParentContextMixin')],

  propTypes: propTypes,

  getInitialState: function getInitialState() {
    var value = this.inRangeValue(this.props.value);

    return {
      selectedIndex: 0,
      view: this.props.initialView || 'month',
      currentDate: value ? new Date(value) : this.inRangeValue(new Date())
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {

      value: null,
      min: new Date(1900, 0, 1),
      max: new Date(2099, 11, 31),

      initialView: 'month',
      finalView: 'century',

      tabIndex: '0',
      footer: false,

      messages: msgs({})
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var bottom = VIEW_OPTIONS.indexOf(nextProps.initialView),
        top = VIEW_OPTIONS.indexOf(nextProps.finalView),
        current = VIEW_OPTIONS.indexOf(this.state.view),
        view = this.state.view,
        val = this.inRangeValue(nextProps.value);

    if (current < bottom) this.setState({ view: view = nextProps.initialView });else if (current > top) this.setState({ view: view = nextProps.finalView });

    //if the value changes reset views to the new one
    if (!dates.eq(val, dateOrNull(this.props.value), VIEW_UNIT[view])) this.setState({
      currentDate: val ? new Date(val) : new Date()
    });
  },

  render: function render() {
    var _this = this;

    var _$omit = _.omit(this.props, Object.keys(propTypes));

    var className = _$omit.className;
    var props = babelHelpers.objectWithoutProperties(_$omit, ['className']);
    var View = VIEW[this.state.view];
    var viewProps = _.pick(this.props, Object.keys(compat.type(View).propTypes));
    var unit = this.state.view;
    var messages = msgs(this.props.messages);

    var disabled = this.props.disabled || this.props.readOnly;
    var date = this.state.currentDate;
    var todaysDate = new Date();
    var todayNotInRange = !dates.inRange(todaysDate, this.props.min, this.props.max, unit);
    var labelId = this._id('_view_label');
    var key = this.state.view + '_' + dates[this.state.view](date);
    var id = this._id('_view');

    return React.createElement(
      'div',
      babelHelpers._extends({}, props, {
        onKeyDown: this._keyDown,
        onFocus: this._maybeHandle(this._focus.bind(null, true), true),
        onBlur: this._focus.bind(null, false),
        className: cx(className, 'rw-calendar', 'rw-widget', {
          'rw-state-focus': this.state.focused,
          'rw-state-disabled': this.props.disabled,
          'rw-state-readonly': this.props.readOnly,
          'rw-rtl': this.isRtl()
        }) }),
      React.createElement(Header, {
        label: this._label(),
        labelId: labelId,
        messages: messages,
        upDisabled: disabled || this.state.view === this.props.finalView,
        prevDisabled: disabled || !dates.inRange(this.nextDate(dir.LEFT), this.props.min, this.props.max, unit),
        nextDisabled: disabled || !dates.inRange(this.nextDate(dir.RIGHT), this.props.min, this.props.max, unit),
        onViewChange: this._maybeHandle(this.navigate.bind(null, dir.UP, null)),
        onMoveLeft: this._maybeHandle(this.navigate.bind(null, dir.LEFT, null)),
        onMoveRight: this._maybeHandle(this.navigate.bind(null, dir.RIGHT, null)) }),
      React.createElement(
        SlideTransition,
        {
          ref: 'animation',
          duration: props.duration,
          direction: this.state.slideDirection,
          onAnimate: function () {
            return _this._focus(true);
          } },
        React.createElement(View, babelHelpers._extends({}, viewProps, {
          tabIndex: '-1', key: key, id: id,
          'aria-labelledby': labelId,
          today: todaysDate,
          value: this.props.value,
          focused: this.state.currentDate,
          onChange: this._maybeHandle(this.change),
          onKeyDown: this._maybeHandle(this._keyDown) }))
      ),
      this.props.footer && React.createElement(Footer, {
        value: todaysDate,
        format: this.props.footerFormat,
        culture: this.props.culture,
        disabled: this.props.disabled || todayNotInRange,
        readOnly: this.props.readOnly,
        onClick: this._maybeHandle(this.select)
      })
    );
  },

  navigate: function navigate(direction, date) {
    var view = this.state.view,
        slideDir = direction === dir.LEFT || direction === dir.UP ? 'right' : 'left';

    if (!date) date = [dir.LEFT, dir.RIGHT].indexOf(direction) !== -1 ? this.nextDate(direction) : this.state.currentDate;

    if (direction === dir.DOWN) view = ALT_VIEW[view] || view;

    if (direction === dir.UP) view = NEXT_VIEW[view] || view;

    if (this.isValidView(view) && dates.inRange(date, this.props.min, this.props.max, view)) {
      this.notify('onNavigate', [date, slideDir, view]);
      this._focus(true, 'nav');

      this.setState({
        currentDate: date,
        slideDirection: slideDir,
        view: view
      });
    }
  },

  _focus: function _focus(focused, e) {
    var _this2 = this;

    if (+this.props.tabIndex === -1) return;

    this.setTimeout('focus', function () {

      if (focused) compat.findDOMNode(_this2).focus();

      if (focused !== _this2.state.focused) {
        _this2.notify(focused ? 'onFocus' : 'onBlur', e);
        _this2.setState({ focused: focused });
      }
    });
  },

  change: function change(date) {
    var _this3 = this;

    setTimeout(function () {
      return _this3._focus(true);
    });

    if (this.props.onChange && this.state.view === this.props.initialView) return this.notify('onChange', date);

    this.navigate(dir.DOWN, date);
  },

  select: function select(date) {
    var view = this.props.initialView,
        slideDir = view !== this.state.view || dates.gt(date, this.state.currentDate) ? 'left' // move down to a the view
    : 'right';

    this.notify('onChange', date);

    if (this.isValidView(view) && dates.inRange(date, this.props.min, this.props.max, view)) {
      this._focus(true, 'nav');

      this.setState({
        currentDate: date,
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

    return dates[method](this.state.currentDate, 1 * multi, unit);
  },

  _keyDown: function _keyDown(e) {
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

        currentDate = dates.move(currentDate, this.props.min, this.props.max, view, direction);

        if (!dates.eq(current, currentDate, unit)) {
          e.preventDefault();

          if (dates.gt(currentDate, current, view)) this.navigate(dir.RIGHT, currentDate);else if (dates.lt(currentDate, current, view)) this.navigate(dir.LEFT, currentDate);else this.setState({ currentDate: currentDate });
        }
      }
    }

    this.notify('onKeyDown', [e]);
  },

  _label: function _label() {
    var _props = this.props;
    var culture = _props.culture;
    var props = babelHelpers.objectWithoutProperties(_props, ['culture']);
    var view = this.state.view;
    var dt = this.state.currentDate;

    if (view === 'month') return localizers.date.format(dt, format(props, 'header'), culture);else if (view === 'year') return localizers.date.format(dt, format(props, 'year'), culture);else if (view === 'decade') return localizers.date.format(dates.startOf(dt, 'decade'), format(props, 'decade'), culture);else if (view === 'century') return localizers.date.format(dates.startOf(dt, 'century'), format(props, 'century'), culture);
  },

  inRangeValue: function inRangeValue(_value) {
    var value = dateOrNull(_value);

    if (value === null) return value;

    return dates.max(dates.min(value, this.props.max), this.props.min);
  },

  isValidView: function isValidView(next) {
    var bottom = VIEW_OPTIONS.indexOf(this.props.initialView),
        top = VIEW_OPTIONS.indexOf(this.props.finalView),
        current = VIEW_OPTIONS.indexOf(next);

    return current >= bottom && current <= top;
  }
});

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt;
  return null;
}

function msgs(msgs) {
  return babelHelpers._extends({
    moveBack: 'navigate back',
    moveForward: 'navigate forward' }, msgs);
}

module.exports = createUncontrolledWidget(Calendar, { value: 'onChange' });

module.exports.BaseCalendar = Calendar;