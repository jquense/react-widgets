'use strict';

exports.__esModule = true;

var _desc, _value, _obj;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //pick, omit, has

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

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

var _Widget = require('./Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _TimeList = require('./TimeList');

var _TimeList2 = _interopRequireDefault(_TimeList);

var _DateTimePickerInput = require('./DateTimePickerInput');

var _DateTimePickerInput2 = _interopRequireDefault(_DateTimePickerInput);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _propTypes3 = require('./util/propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

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

var Calendar = _Calendar2.default.ControlledComponent;

var viewEnum = Object.keys(_constants.calendarViews).map(function (k) {
  return _constants.calendarViews[k];
});

var propTypes = _extends({}, Calendar.propTypes, {

  //-- controlled props -----------
  value: _propTypes2.default.instanceOf(Date),
  onChange: _propTypes2.default.func,
  open: _propTypes2.default.oneOf([false, _constants.datePopups.TIME, _constants.datePopups.CALENDAR]),
  onToggle: _propTypes2.default.func,
  currentDate: _propTypes2.default.instanceOf(Date),
  onCurrentDateChange: _propTypes2.default.func,
  //------------------------------------

  onSelect: _propTypes2.default.func,

  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),

  culture: _propTypes2.default.string,

  format: _propTypes4.default.dateFormat,
  timeFormat: _propTypes4.default.dateFormat,
  editFormat: _propTypes4.default.dateFormat,

  calendar: _propTypes2.default.bool,
  time: _propTypes2.default.bool,

  timeComponent: _propTypes4.default.elementType,

  //popup
  dropUp: _propTypes2.default.bool,
  duration: _propTypes2.default.number,

  placeholder: _propTypes2.default.string,
  name: _propTypes2.default.string,

  initialView: _propTypes2.default.oneOf(viewEnum),
  finalView: _propTypes2.default.oneOf(viewEnum),

  autoFocus: _propTypes2.default.bool,
  disabled: _propTypes4.default.disabled,
  readOnly: _propTypes4.default.readOnly,

  parse: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.string, _propTypes2.default.func]),

  'aria-labelledby': _propTypes2.default.string,
  'aria-describedby': _propTypes2.default.string,

  messages: _propTypes2.default.shape({
    calendarButton: _propTypes2.default.string,
    timeButton: _propTypes2.default.string
  })
});

var DateTimePicker = (0, _createReactClass2.default)((_obj = {

  displayName: 'DateTimePicker',

  mixins: [require('./mixins/TimeoutMixin'), require('./mixins/PureRenderMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/FocusMixin')({
    didHandle: function didHandle(focused) {
      if (!focused) this.close();
    }
  }), require('./mixins/AriaDescendantMixin')('valueInput', function (key, id) {
    var open = this.props.open,
        current = this.ariaActiveDescendant(),
        calIsActive = open === _constants.datePopups.CALENDAR && key === 'calendar',
        timeIsActive = open === _constants.datePopups.TIME && key === 'timelist';


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
      currentDate: new Date(),
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
  renderInput: function renderInput(id, owns) {
    var _props = this.props,
        open = _props.open,
        value = _props.value,
        editFormat = _props.editFormat,
        culture = _props.culture,
        busy = _props.busy,
        placeholder = _props.placeholder,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        name = _props.name,
        tabIndex = _props.tabIndex,
        autoFocus = _props.autoFocus,
        ariaLabelledby = _props['aria-labelledby'],
        ariaDescribedby = _props['aria-describedby'];
    var focused = this.state.focused;


    return _react2.default.createElement(_DateTimePickerInput2.default, {
      id: id,
      ref: 'valueInput',
      role: 'combobox',
      name: name,
      tabIndex: tabIndex,
      autoFocus: autoFocus,
      placeholder: placeholder,
      disabled: disabled,
      readOnly: readOnly,
      value: value,
      format: getFormat(this.props),
      editFormat: editFormat,
      editing: focused,
      culture: culture,
      parse: this._parse,
      onChange: this.handleChange,
      'aria-haspopup': true,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-expanded': !!open,
      'aria-busy': !!busy,
      'aria-owns': owns
    });
  },
  renderButtons: function renderButtons(messages) {
    var _props2 = this.props,
        calendar = _props2.calendar,
        time = _props2.time,
        disabled = _props2.disabled,
        readOnly = _props2.readOnly;


    if (!calendar && !time) {
      return null;
    }

    return _react2.default.createElement(
      'span',
      { className: 'rw-select' },
      calendar && _react2.default.createElement(_Button2.default, {
        icon: 'calendar',
        className: 'rw-btn-calendar',
        label: messages.calendarButton,
        disabled: !!(disabled || readOnly),
        onClick: this._click.bind(null, _constants.datePopups.CALENDAR)
      }),
      time && _react2.default.createElement(_Button2.default, {
        icon: 'clock-o',
        className: 'rw-btn-time',
        label: messages.timeButton,
        disabled: !!(disabled || readOnly),
        onClick: this._click.bind(null, _constants.datePopups.TIME)
      })
    );
  },
  renderCalendar: function renderCalendar(id, inputID) {
    var _this = this;

    var _props3 = this.props,
        open = _props3.open,
        value = _props3.value,
        duration = _props3.duration,
        dropUp = _props3.dropUp;


    var calendarProps = _3.default.pickProps(this.props, Calendar);

    return _react2.default.createElement(
      _Popup2.default,
      {
        dropUp: dropUp,
        duration: duration,
        open: open === _constants.datePopups.CALENDAR,
        className: 'rw-calendar-popup'
      },
      _react2.default.createElement(Calendar, _extends({}, calendarProps, {
        ref: 'calPopup',
        id: id,
        tabIndex: '-1',
        value: value,
        autoFocus: false,
        onChange: this.handleDateSelect
        // #75: need to aggressively reclaim focus from the calendar otherwise
        // disabled header/footer buttons will drop focus completely from the widget
        , onNavigate: function onNavigate() {
          return _this.focus();
        },
        currentDate: this.props.currentDate,
        onCurrentDateChange: this.props.onCurrentDateChange,
        'aria-hidden': !open,
        'aria-live': 'polite',
        'aria-labelledby': inputID,
        ariaActiveDescendantKey: 'calendar'
      }))
    );
  },
  renderTimeList: function renderTimeList(id, inputID) {
    var _this2 = this;

    var _props4 = this.props,
        open = _props4.open,
        value = _props4.value,
        duration = _props4.duration,
        dropUp = _props4.dropUp,
        calendar = _props4.calendar,
        timeFormat = _props4.timeFormat,
        timeComponent = _props4.timeComponent;


    var timeListProps = _3.default.pickProps(this.props, _TimeList2.default);

    return _react2.default.createElement(
      _Popup2.default,
      {
        dropUp: dropUp,
        duration: duration,
        open: open === _constants.datePopups.TIME,
        onOpening: function onOpening() {
          return _this2.refs.timePopup.forceUpdate();
        }
      },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_TimeList2.default, _extends({}, timeListProps, {
          ref: 'timePopup',
          id: id,
          format: timeFormat,
          value: dateOrNull(value),
          onMove: this._scrollTo,
          onSelect: this.handleTimeSelect,
          preserveDate: !!calendar,
          itemComponent: timeComponent,
          'aria-labelledby': inputID,
          'aria-live': open && 'polite',
          'aria-hidden': !open,
          ariaActiveDescendantKey: 'timelist'
        }))
      )
    );
  },
  render: function render() {
    var _props5 = this.props,
        className = _props5.className,
        calendar = _props5.calendar,
        time = _props5.time,
        open = _props5.open,
        messages = _props5.messages,
        disabled = _props5.disabled,
        readOnly = _props5.readOnly,
        dropUp = _props5.dropUp;
    var focused = this.state.focused;


    var inputID = (0, _widgetHelpers.instanceId)(this, '_input'),
        timeListID = (0, _widgetHelpers.instanceId)(this, '_time_listbox'),
        dateListID = (0, _widgetHelpers.instanceId)(this, '_cal'),
        owns = '';

    var elementProps = _3.default.omitOwnProps(this, Calendar, _TimeList2.default);

    var shouldRenderList = open || (0, _widgetHelpers.isFirstFocusedRender)(this);

    if (calendar) owns += dateListID;
    if (time) owns += ' ' + timeListID;

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        open: !!open,
        dropUp: dropUp,
        focused: focused,
        disabled: disabled,
        readOnly: readOnly,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
        onKeyPress: this.handleKeyPress,
        className: (0, _classnames2.default)(className, 'rw-datetimepicker', calendar && time && 'rw-has-both', !calendar && !time && 'rw-has-neither')
      }),
      this.renderInput(inputID, owns.trim()),
      this.renderButtons(messages),
      shouldRenderList && this.renderTimeList(timeListID, inputID),
      shouldRenderList && this.renderCalendar(dateListID, inputID)
    );
  },
  handleChange: function handleChange(date, str, constrain) {
    var _props6 = this.props,
        onChange = _props6.onChange,
        value = _props6.value;


    if (constrain) date = this.inRangeValue(date);

    if (onChange) {
      if (date == null || value == null) {
        if (date != value) //eslint-disable-line eqeqeq
          onChange(date, str);
      } else if (!_dates2.default.eq(date, value)) {
        onChange(date, str);
      }
    }
  },
  handleKeyDown: function handleKeyDown(e) {
    var _props7 = this.props,
        open = _props7.open,
        calendar = _props7.calendar,
        time = _props7.time;


    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);

    if (e.defaultPrevented) return;

    if (e.key === 'Escape' && open) this.close();else if (e.altKey) {
      e.preventDefault();

      if (e.key === 'ArrowDown') {
        if (calendar && time) this.open(open === _constants.datePopups.CALENDAR ? _constants.datePopups.TIME : _constants.datePopups.CALENDAR);else if (time) this.open(_constants.datePopups.TIME);else if (calendar) this.open(_constants.datePopups.CALENDAR);
      } else if (e.key === 'ArrowUp') this.close();
    } else if (open) {
      if (open === _constants.datePopups.CALENDAR) this.refs.calPopup.handleKeyDown(e);
      if (open === _constants.datePopups.TIME) this.refs.timePopup.handleKeyDown(e);
    }
  },
  handleKeyPress: function handleKeyPress(e) {
    (0, _widgetHelpers.notify)(this.props.onKeyPress, [e]);

    if (e.defaultPrevented) return;

    if (this.props.open === _constants.datePopups.TIME) this.refs.timePopup.handleKeyPress(e);
  },
  focus: function focus() {
    var valueInput = this.refs.valueInput;


    if (valueInput && (0, _activeElement2.default)() !== _compat2.default.findDOMNode(valueInput)) valueInput.focus();
  },
  handleDateSelect: function handleDateSelect(date) {
    var format = getFormat(this.props),
        dateTime = _dates2.default.merge(date, this.props.value, this.props.currentDate),
        dateStr = formatDate(date, format, this.props.culture);

    this.close();
    (0, _widgetHelpers.notify)(this.props.onSelect, [dateTime, dateStr]);
    this.handleChange(dateTime, dateStr, true);
    this.focus();
  },
  handleTimeSelect: function handleTimeSelect(datum) {
    var format = getFormat(this.props),
        dateTime = _dates2.default.merge(this.props.value, datum.date, this.props.currentDate),
        dateStr = formatDate(datum.date, format, this.props.culture);

    this.close();
    (0, _widgetHelpers.notify)(this.props.onSelect, [dateTime, dateStr]);
    this.handleChange(dateTime, dateStr, true);
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
}, (_applyDecoratedDescriptor(_obj, 'handleChange', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleChange'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyDown'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyPress', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyPress'), _obj), _applyDecoratedDescriptor(_obj, 'handleDateSelect', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleDateSelect'), _obj), _applyDecoratedDescriptor(_obj, 'handleTimeSelect', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleTimeSelect'), _obj), _applyDecoratedDescriptor(_obj, '_click', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_click'), _obj)), _obj));

exports.default = (0, _uncontrollable2.default)(DateTimePicker, {
  open: 'onToggle',
  value: 'onChange',
  currentDate: 'onCurrentDateChange'
}, ['focus']);


function getFormat(props) {
  var cal = props[_constants.datePopups.CALENDAR] != null ? props.calendar : true,
      time = props[_constants.datePopups.TIME] != null ? props.time : true;

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