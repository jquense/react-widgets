'use strict';

exports.__esModule = true;

var _desc, _value, _obj;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //pick, omit, has

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _activeElement = require('dom-helpers/activeElement');

var _activeElement2 = _interopRequireDefault(_activeElement);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _dates = require('./util/dates');

var _dates2 = _interopRequireDefault(_dates);

var _localizers = require('./util/localizers');

var _constants = require('./util/constants');

var _constants2 = _interopRequireDefault(_constants);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _Calendar2 = require('./Calendar');

var _Calendar3 = _interopRequireDefault(_Calendar2);

var _TimeList = require('./TimeList');

var _TimeList2 = _interopRequireDefault(_TimeList);

var _DateInput = require('./DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _WidgetButton = require('./WidgetButton');

var _WidgetButton2 = _interopRequireDefault(_WidgetButton);

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _interaction = require('./util/interaction');

var _widgetHelpers = require('./util/widgetHelpers');

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

var views = _constants2.default.calendarViews;
var popups = _constants2.default.datePopups;

var Calendar = _Calendar3.default.ControlledComponent;
var viewEnum = Object.keys(views).map(function (k) {
  return views[k];
});

var omit = _3.default.omit;
var pick = _3.default.pick;


var propTypes = _extends({}, Calendar.propTypes, {

  //-- controlled props -----------
  value: _react2.default.PropTypes.instanceOf(Date),
  onChange: _react2.default.PropTypes.func,
  open: _react2.default.PropTypes.oneOf([false, popups.TIME, popups.CALENDAR]),
  onToggle: _react2.default.PropTypes.func,
  currentDate: _react2.default.PropTypes.instanceOf(Date),
  onCurrentDateChange: _react2.default.PropTypes.func,
  //------------------------------------

  onSelect: _react2.default.PropTypes.func,

  min: _react2.default.PropTypes.instanceOf(Date),
  max: _react2.default.PropTypes.instanceOf(Date),

  culture: _react2.default.PropTypes.string,

  format: _propTypes2.default.dateFormat,
  timeFormat: _propTypes2.default.dateFormat,
  editFormat: _propTypes2.default.dateFormat,

  calendar: _react2.default.PropTypes.bool,
  time: _react2.default.PropTypes.bool,

  timeComponent: _propTypes2.default.elementType,

  //popup
  dropUp: _react2.default.PropTypes.bool,
  duration: _react2.default.PropTypes.number,

  placeholder: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string,

  initialView: _react2.default.PropTypes.oneOf(viewEnum),
  finalView: _react2.default.PropTypes.oneOf(viewEnum),

  autoFocus: _react2.default.PropTypes.bool,
  disabled: _propTypes2.default.disabled,
  readOnly: _propTypes2.default.readOnly,

  parse: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string), _react2.default.PropTypes.string, _react2.default.PropTypes.func]),

  'aria-labelledby': _react2.default.PropTypes.string,

  messages: _react2.default.PropTypes.shape({
    calendarButton: _react2.default.PropTypes.string,
    timeButton: _react2.default.PropTypes.string
  })
});

var DateTimePicker = _react2.default.createClass((_obj = {

  displayName: 'DateTimePicker',

  mixins: [require('./mixins/TimeoutMixin'), require('./mixins/PureRenderMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/FocusMixin')({
    didHandle: function didHandle(focused) {
      if (!focused) this.close();
    }
  }), require('./mixins/AriaDescendantMixin')('valueInput', function (key, id) {
    var open = this.props.open;
    var current = this.ariaActiveDescendant();
    var calIsActive = open === popups.CALENDAR && key === 'calendar';
    var timeIsActive = open === popups.TIME && key === 'timelist';

    if (!current || timeIsActive || calIsActive) return id;
  })],

  propTypes: propTypes,

  getInitialState: function getInitialState() {
    return {
      focused: false
    };
  },
  getDefaultProps: function getDefaultProps() {

    return {
      value: null,

      min: new Date(1900, 0, 1),
      max: new Date(2099, 11, 31),
      calendar: true,
      time: true,
      open: false,

      //calendar override
      footer: true,

      messages: {
        calendarButton: 'Select Date',
        timeButton: 'Select Time'
      },

      ariaActiveDescendantKey: 'dropdownlist'
    };
  },
  render: function render() {
    var _cx,
        _this = this;

    var _props = this.props;
    var className = _props.className;
    var calendar = _props.calendar;
    var time = _props.time;
    var open = _props.open;
    var tabIndex = _props.tabIndex;
    var value = _props.value;
    var editFormat = _props.editFormat;
    var timeFormat = _props.timeFormat;
    var culture = _props.culture;
    var duration = _props.duration;
    var step = _props.step;
    var messages = _props.messages;
    var min = _props.min;
    var max = _props.max;
    var busy = _props.busy;
    var placeholder = _props.placeholder;
    var disabled = _props.disabled;
    var readOnly = _props.readOnly;
    var name = _props.name;
    var dropUp = _props.dropUp;
    var timeComponent = _props.timeComponent;
    var autoFocus = _props.autoFocus;
    var ariaLabelledby = _props['aria-labelledby'];
    var ariaDescribedby = _props['aria-describedby'];
    var focused = this.state.focused;


    var inputID = (0, _widgetHelpers.instanceId)(this, '_input'),
        timeListID = (0, _widgetHelpers.instanceId)(this, '_time_listbox'),
        dateListID = (0, _widgetHelpers.instanceId)(this, '_cal'),
        owns = '';

    var elementProps = omit(this.props, Object.keys(propTypes)),
        calProps = pick(this.props, Object.keys(Calendar.propTypes));

    var shouldRenderList = (0, _widgetHelpers.isFirstFocusedRender)(this) || open,
        disabledOrReadonly = disabled || readOnly,
        calendarIsOpen = open === popups.CALENDAR,
        timeIsOpen = open === popups.TIME;

    if (calendar) owns += dateListID;
    if (time) owns += ' ' + timeListID;

    value = dateOrNull(value);

    return _react2.default.createElement(
      'div',
      _extends({}, elementProps, {
        ref: 'element',
        tabIndex: '-1',
        onKeyDown: this._keyDown,
        onKeyPress: this._keyPress,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        className: (0, _classnames2.default)(className, 'rw-datetimepicker', 'rw-widget', (_cx = {
          'rw-state-focus': focused,
          'rw-state-disabled': disabled,
          'rw-state-readonly': readOnly,
          'rw-has-both': calendar && time,
          'rw-has-neither': !calendar && !time,
          'rw-rtl': this.isRtl()

        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx))
      }),
      _react2.default.createElement(_DateInput2.default, {
        ref: 'valueInput',
        id: inputID,
        autoFocus: autoFocus,
        tabIndex: tabIndex || 0,
        role: 'combobox',
        autoComplete: 'off',
        'aria-labelledby': ariaLabelledby,
        'aria-describedby': ariaDescribedby,
        'aria-expanded': !!open,
        'aria-busy': !!busy,
        'aria-owns': owns.trim(),
        'aria-haspopup': true,
        placeholder: placeholder,
        name: name,
        disabled: disabled,
        readOnly: readOnly,
        value: value,
        format: getFormat(this.props),
        editFormat: editFormat,
        editing: focused,
        culture: culture,
        parse: this._parse,
        onChange: this._change
      }),
      (calendar || time) && _react2.default.createElement(
        'span',
        { className: 'rw-select' },
        calendar && _react2.default.createElement(
          _WidgetButton2.default,
          {
            tabIndex: '-1',
            className: 'rw-btn-calendar',
            disabled: disabledOrReadonly,
            'aria-disabled': disabledOrReadonly,
            'aria-label': messages.calendarButton,
            onClick: this._click.bind(null, popups.CALENDAR)
          },
          _react2.default.createElement('i', { className: 'rw-i rw-i-calendar',
            'aria-hidden': 'true'
          })
        ),
        time && _react2.default.createElement(
          _WidgetButton2.default,
          {
            tabIndex: '-1',
            className: 'rw-btn-time',
            disabled: disabledOrReadonly,
            'aria-disabled': disabledOrReadonly,
            'aria-label': messages.timeButton,
            onClick: this._click.bind(null, popups.TIME)
          },
          _react2.default.createElement('i', { className: 'rw-i rw-i-clock-o',
            'aria-hidden': 'true'
          })
        )
      ),
      _react2.default.createElement(
        _Popup2.default,
        {
          dropUp: dropUp,
          open: timeIsOpen,
          duration: duration,
          onOpening: function onOpening() {
            return _this.refs.timePopup.forceUpdate();
          }
        },
        _react2.default.createElement(
          'div',
          null,
          shouldRenderList && _react2.default.createElement(_TimeList2.default, { ref: 'timePopup',
            id: timeListID,
            ariaActiveDescendantKey: 'timelist',
            'aria-labelledby': inputID,
            'aria-live': open && 'polite',
            'aria-hidden': !open,
            value: value,
            format: timeFormat,
            step: step,
            min: min,
            max: max,
            currentDate: this.props.currentDate,
            culture: culture,
            onMove: this._scrollTo,
            preserveDate: !!calendar,
            itemComponent: timeComponent,
            onSelect: this._selectTime
          })
        )
      ),
      _react2.default.createElement(
        _Popup2.default,
        {
          className: 'rw-calendar-popup',
          dropUp: dropUp,
          open: calendarIsOpen,
          duration: duration
        },
        shouldRenderList && _react2.default.createElement(Calendar, _extends({}, calProps, {
          ref: 'calPopup',
          tabIndex: '-1',
          id: dateListID,
          value: value,
          'aria-hidden': !open,
          'aria-live': 'polite',
          ariaActiveDescendantKey: 'calendar',
          onChange: this._selectDate
          // #75: need to aggressively reclaim focus from the calendar otherwise
          // disabled header/footer buttons will drop focus completely from the widget
          , onNavigate: function onNavigate() {
            return _this.focus();
          },
          currentDate: this.props.currentDate,
          onCurrentDateChange: this.props.onCurrentDateChange
        }))
      )
    );
  },
  _change: function _change(date, str, constrain) {
    var _props2 = this.props;
    var onChange = _props2.onChange;
    var value = _props2.value;


    if (constrain) date = this.inRangeValue(date);

    if (onChange) {
      if (date == null || value == null) {
        if (date != value) //eslint-disable-line eqeqeq
          onChange(date, str);
      } else if (!_dates2.default.eq(date, value)) onChange(date, str);
    }
  },
  _keyDown: function _keyDown(e) {
    var _props3 = this.props;
    var open = _props3.open;
    var calendar = _props3.calendar;
    var time = _props3.time;


    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);

    if (e.defaultPrevented) return;

    if (e.key === 'Escape' && open) this.close();else if (e.altKey) {
      e.preventDefault();

      if (e.key === 'ArrowDown') {
        if (calendar && time) this.open(open === popups.CALENDAR ? popups.TIME : popups.CALENDAR);else if (time) this.open(popups.TIME);else if (calendar) this.open(popups.CALENDAR);
      } else if (e.key === 'ArrowUp') this.close();
    } else if (open) {
      if (open === popups.CALENDAR) this.refs.calPopup._keyDown(e);
      if (open === popups.TIME) this.refs.timePopup._keyDown(e);
    }
  },
  _keyPress: function _keyPress(e) {
    (0, _widgetHelpers.notify)(this.props.onKeyPress, [e]);

    if (e.defaultPrevented) return;

    if (this.props.open === popups.TIME) this.refs.timePopup._keyPress(e);
  },
  focus: function focus() {
    if ((0, _activeElement2.default)() !== _compat2.default.findDOMNode(this.refs.valueInput)) this.refs.valueInput.focus();
  },
  _selectDate: function _selectDate(date) {
    var format = getFormat(this.props),
        dateTime = _dates2.default.merge(date, this.props.value, this.props.currentDate),
        dateStr = formatDate(date, format, this.props.culture);

    this.close();
    (0, _widgetHelpers.notify)(this.props.onSelect, [dateTime, dateStr]);
    this._change(dateTime, dateStr, true);
    this.focus();
  },
  _selectTime: function _selectTime(datum) {
    var format = getFormat(this.props),
        dateTime = _dates2.default.merge(this.props.value, datum.date, this.props.currentDate),
        dateStr = formatDate(datum.date, format, this.props.culture);

    this.close();
    (0, _widgetHelpers.notify)(this.props.onSelect, [dateTime, dateStr]);
    this._change(dateTime, dateStr, true);
    this.focus();
  },
  _click: function _click(view, e) {
    this.focus();
    this.toggle(view, e);
  },
  _parse: function _parse(string) {
    var format = getFormat(this.props, true),
        editFormat = this.props.editFormat,
        parse = this.props.parse,
        formats = [];

    if (typeof parse === 'function') return parse(string, this.props.culture);

    if (typeof format === 'string') formats.push(format);

    if (typeof editFormat === 'string') formats.push(editFormat);

    if (parse) formats = formats.concat(this.props.parse);

    (0, _invariant2.default)(formats.length, 'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' + 'the DateTimePicker is unable to parse `%s` into a dateTime, ' + 'please provide either a parse function or Globalize.js compatible string for `format`', string);

    return formatsParser(formats, this.props.culture, string);
  },
  toggle: function toggle(view) {
    this.props.open ? this.props.open !== view ? this.open(view) : this.close(view) : this.open(view);
  },
  open: function open(view) {
    if (this.props.open !== view && this.props[view] === true) (0, _widgetHelpers.notify)(this.props.onToggle, view);
  },
  close: function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  },
  inRangeValue: function inRangeValue(value) {
    if (value == null) return value;

    return _dates2.default.max(_dates2.default.min(value, this.props.max), this.props.min);
  }
}, (_applyDecoratedDescriptor(_obj, '_change', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_change'), _obj), _applyDecoratedDescriptor(_obj, '_keyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_keyDown'), _obj), _applyDecoratedDescriptor(_obj, '_keyPress', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_keyPress'), _obj), _applyDecoratedDescriptor(_obj, '_selectDate', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_selectDate'), _obj), _applyDecoratedDescriptor(_obj, '_selectTime', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_selectTime'), _obj), _applyDecoratedDescriptor(_obj, '_click', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_click'), _obj)), _obj));

exports.default = (0, _uncontrollable2.default)(DateTimePicker, { open: 'onToggle', value: 'onChange', currentDate: 'onCurrentDateChange' }, ['focus']);


function getFormat(props) {
  var cal = props[popups.CALENDAR] != null ? props.calendar : true,
      time = props[popups.TIME] != null ? props.time : true;

  return props.format ? props.format : cal && time || !cal && !time ? _localizers.date.getFormat('default') : _localizers.date.getFormat(cal ? 'date' : 'time');
}

function formatDate(date, format, culture) {
  var val = '';

  if (date instanceof Date && !isNaN(date.getTime())) val = _localizers.date.format(date, format, culture);

  return val;
}

function formatsParser(formats, culture, str) {
  var date;

  for (var i = 0; i < formats.length; i++) {
    date = _localizers.date.parse(str, formats[i], culture);
    if (date) return date;
  }
  return null;
}

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt;
  return null;
}
module.exports = exports['default'];