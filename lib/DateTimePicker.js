'use strict';

exports.__esModule = true;

var _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _class3, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //pick, omit, has


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _activeElement = require('dom-helpers/activeElement');

var _activeElement2 = _interopRequireDefault(_activeElement);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

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

var _WidgetPicker = require('./WidgetPicker');

var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _DateTimePickerInput = require('./DateTimePickerInput');

var _DateTimePickerInput2 = _interopRequireDefault(_DateTimePickerInput);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _TimeList = require('./TimeList');

var _TimeList2 = _interopRequireDefault(_TimeList);

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _focusManager = require('./util/focusManager');

var _focusManager2 = _interopRequireDefault(_focusManager);

var _scrollManager = require('./util/scrollManager');

var _scrollManager2 = _interopRequireDefault(_scrollManager);

var _withRightToLeft = require('./util/withRightToLeft');

var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);

var _interaction = require('./util/interaction');

var _widgetHelpers = require('./util/widgetHelpers');

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

var Calendar = _Calendar2.default.ControlledComponent;

var viewEnum = Object.keys(_constants.calendarViews).map(function (k) {
  return _constants.calendarViews[k];
});

var propTypes = _extends({}, Calendar.propTypes, {

  //-- controlled props -----------
  value: _react2.default.PropTypes.instanceOf(Date),
  onChange: _react2.default.PropTypes.func,
  open: _react2.default.PropTypes.oneOf([false, _constants.datePopups.TIME, _constants.datePopups.CALENDAR]),
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

var DateTimePicker = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(DateTimePicker, _React$Component);

  function DateTimePicker() {
    _classCallCheck(this, DateTimePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _initDefineProp(_this, 'handleChange', _descriptor, _this);

    _initDefineProp(_this, 'handleKeyDown', _descriptor2, _this);

    _initDefineProp(_this, 'handleKeyPress', _descriptor3, _this);

    _initDefineProp(_this, 'handleDateSelect', _descriptor4, _this);

    _initDefineProp(_this, 'handleTimeSelect', _descriptor5, _this);

    _initDefineProp(_this, 'handleCalendarClick', _descriptor6, _this);

    _initDefineProp(_this, 'handleTimeClick', _descriptor7, _this);

    _this.parse = function (string) {
      var format = getFormat(_this.props, true),
          editFormat = _this.props.editFormat,
          parse = _this.props.parse,
          formats = [];

      if (typeof parse === 'function') return parse(string, _this.props.culture);

      if (typeof format === 'string') formats.push(format);

      if (typeof editFormat === 'string') formats.push(editFormat);

      if (parse) formats = formats.concat(_this.props.parse);

      (0, _invariant2.default)(formats.length, 'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' + 'the DateTimePicker is unable to parse `%s` into a dateTime, ' + 'please provide either a parse function or Globalize.js compatible string for `format`', string);

      return formatsParser(formats, _this.props.culture, string);
    };

    _this.inputId = (0, _widgetHelpers.instanceId)(_this, '_input');
    _this.calendarId = (0, _widgetHelpers.instanceId)(_this, '_calendar');
    _this.listId = (0, _widgetHelpers.instanceId)(_this, '_listbox');
    _this.activeCalendarId = (0, _widgetHelpers.instanceId)(_this, '_calendar_active_cell');
    _this.activeOptionId = (0, _widgetHelpers.instanceId)(_this, '_listbox_active_option');

    _this.handleScroll = (0, _scrollManager2.default)(_this);
    _this.focusManager = (0, _focusManager2.default)(_this, {
      didHandle: function didHandle(focused) {
        if (!focused) _this.close();
      }
    });

    _this.state = {
      focused: false
    };
    return _this;
  }

  DateTimePicker.prototype.renderInput = function renderInput(owns) {
    var _props = this.props;
    var open = _props.open;
    var value = _props.value;
    var editFormat = _props.editFormat;
    var culture = _props.culture;
    var busy = _props.busy;
    var placeholder = _props.placeholder;
    var disabled = _props.disabled;
    var readOnly = _props.readOnly;
    var name = _props.name;
    var tabIndex = _props.tabIndex;
    var autoFocus = _props.autoFocus;
    var ariaLabelledby = _props['aria-labelledby'];
    var ariaDescribedby = _props['aria-describedby'];
    var focused = this.state.focused;


    var activeId = null;
    if (open === _constants.datePopups.TIME) {
      activeId = this.activeOptionId;
    } else if (open === _constants.datePopups.CALENDAR) {
      activeId = this.activeCalendarId;
    }

    return _react2.default.createElement(_DateTimePickerInput2.default, {
      id: this.inputId,
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
      parse: this.parse,
      onChange: this.handleChange,
      'aria-haspopup': true,
      'aria-activedescendant': activeId,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-expanded': !!open,
      'aria-busy': !!busy,
      'aria-owns': owns
    });
  };

  DateTimePicker.prototype.renderButtons = function renderButtons(messages) {
    var _props2 = this.props;
    var calendar = _props2.calendar;
    var time = _props2.time;


    if (!calendar && !time) {
      return null;
    }

    var disabled = (0, _interaction.isDisabled)(this.props);
    var readOnly = (0, _interaction.isReadOnly)(this.props);

    return _react2.default.createElement(
      _Select2.default,
      { bordered: true },
      calendar && _react2.default.createElement(_Button2.default, {
        icon: 'calendar',
        label: messages.calendarButton,
        disabled: disabled || readOnly,
        onClick: this.handleCalendarClick
      }),
      time && _react2.default.createElement(_Button2.default, {
        icon: 'clock-o',
        label: messages.timeButton,
        disabled: disabled || readOnly,
        onClick: this.handleTimeClick
      })
    );
  };

  DateTimePicker.prototype.renderCalendar = function renderCalendar() {
    var _this2 = this;

    var activeCalendarId = this.activeCalendarId;
    var inputId = this.inputId;
    var calendarId = this.calendarId;
    var _props3 = this.props;
    var open = _props3.open;
    var value = _props3.value;
    var duration = _props3.duration;
    var dropUp = _props3.dropUp;


    var calendarProps = _3.default.pickProps(this.props, Calendar);

    return _react2.default.createElement(
      _Popup2.default,
      {
        dropUp: dropUp,
        duration: duration,
        open: open === _constants.datePopups.CALENDAR,
        className: 'rw-calendar-popup'
      },
      _react2.default.createElement(_Calendar2.default, _extends({}, calendarProps, {
        ref: 'calPopup',
        id: calendarId,
        activeId: activeCalendarId,
        tabIndex: '-1',
        value: value,
        autoFocus: false,
        onChange: this.handleDateSelect
        // #75: need to aggressively reclaim focus from the calendar otherwise
        // disabled header/footer buttons will drop focus completely from the widget
        , onNavigate: function onNavigate() {
          return _this2.focus();
        },
        currentDate: this.props.currentDate,
        onCurrentDateChange: this.props.onCurrentDateChange,
        'aria-hidden': !open,
        'aria-live': 'polite',
        'aria-labelledby': inputId
      }))
    );
  };

  DateTimePicker.prototype.renderTimeList = function renderTimeList() {
    var _this3 = this;

    var activeOptionId = this.activeOptionId;
    var inputId = this.inputId;
    var listId = this.listId;
    var _props4 = this.props;
    var open = _props4.open;
    var value = _props4.value;
    var duration = _props4.duration;
    var dropUp = _props4.dropUp;
    var calendar = _props4.calendar;
    var timeFormat = _props4.timeFormat;
    var timeComponent = _props4.timeComponent;


    var timeListProps = _3.default.pickProps(this.props, _TimeList2.default);

    return _react2.default.createElement(
      _Popup2.default,
      {
        dropUp: dropUp,
        duration: duration,
        open: open === _constants.datePopups.TIME,
        onOpening: function onOpening() {
          return _this3.refs.timePopup.forceUpdate();
        }
      },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_TimeList2.default, _extends({}, timeListProps, {
          ref: 'timePopup',
          id: listId,
          activeId: activeOptionId,
          format: timeFormat,
          value: dateOrNull(value),
          onMove: this.handleScroll,
          onSelect: this.handleTimeSelect,
          preserveDate: !!calendar,
          itemComponent: timeComponent,
          'aria-labelledby': inputId,
          'aria-live': open && 'polite',
          'aria-hidden': !open
        }))
      )
    );
  };

  DateTimePicker.prototype.render = function render() {
    var _props5 = this.props;
    var className = _props5.className;
    var calendar = _props5.calendar;
    var time = _props5.time;
    var open = _props5.open;
    var messages = _props5.messages;
    var dropUp = _props5.dropUp;
    var focused = this.state.focused;


    var owns = '';

    var elementProps = _3.default.omitOwnProps(this, Calendar, _TimeList2.default);

    var shouldRenderList = open || (0, _widgetHelpers.isFirstFocusedRender)(this);

    if (calendar) owns += this.calendarId;
    if (time) owns += ' ' + this.listId;

    var disabled = (0, _interaction.isDisabled)(this.props);
    var readOnly = (0, _interaction.isReadOnly)(this.props);

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        onKeyDown: this.handleKeyDown,
        onKeyPress: this.handleKeyPress,
        onBlur: this.focusManager.handleBlur,
        onFocus: this.focusManager.handleFocus,
        className: (0, _classnames2.default)(className, 'rw-datetime-picker')
      }),
      _react2.default.createElement(
        _WidgetPicker2.default,
        {
          open: !!open,
          dropUp: dropUp,
          focused: focused,
          disabled: disabled,
          readOnly: readOnly
        },
        this.renderInput(owns.trim()),
        this.renderButtons(messages)
      ),
      shouldRenderList && time && this.renderTimeList(),
      shouldRenderList && calendar && this.renderCalendar()
    );
  };

  DateTimePicker.prototype.focus = function focus() {
    var valueInput = this.refs.valueInput;


    if (valueInput && (0, _activeElement2.default)() !== _compat2.default.findDOMNode(valueInput)) valueInput.focus();
  };

  DateTimePicker.prototype.toggle = function toggle(view) {
    this.props.open ? this.props.open !== view ? this.open(view) : this.close(view) : this.open(view);
  };

  DateTimePicker.prototype.open = function open(view) {
    if (this.props.open !== view && this.props[view] === true) (0, _widgetHelpers.notify)(this.props.onToggle, view);
  };

  DateTimePicker.prototype.close = function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  DateTimePicker.prototype.inRangeValue = function inRangeValue(value) {
    if (value == null) return value;

    return _dates2.default.max(_dates2.default.min(value, this.props.max), this.props.min);
  };

  return DateTimePicker;
}(_react2.default.Component), _class3.displayName = 'DateTimePicker', _class3.propTypes = propTypes, _class3.defaultProps = {
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
  }
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleChange', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (date, str, constrain) {
      var _props6 = _this4.props;
      var onChange = _props6.onChange;
      var value = _props6.value;


      if (constrain) date = _this4.inRangeValue(date);

      if (onChange) {
        if (date == null || value == null) {
          if (date != value) //eslint-disable-line eqeqeq
            onChange(date, str);
        } else if (!_dates2.default.eq(date, value)) {
          onChange(date, str);
        }
      }
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (e) {
      var _props7 = _this5.props;
      var open = _props7.open;
      var calendar = _props7.calendar;
      var time = _props7.time;


      (0, _widgetHelpers.notify)(_this5.props.onKeyDown, [e]);

      if (e.defaultPrevented) return;

      if (e.key === 'Escape' && open) _this5.close();else if (e.altKey) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (calendar && time) _this5.open(open === _constants.datePopups.CALENDAR ? _constants.datePopups.TIME : _constants.datePopups.CALENDAR);else if (time) _this5.open(_constants.datePopups.TIME);else if (calendar) _this5.open(_constants.datePopups.CALENDAR);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          _this5.close();
        }
      } else if (open) {
        if (open === _constants.datePopups.CALENDAR) _this5.refs.calPopup.refs.inner.handleKeyDown(e);
        if (open === _constants.datePopups.TIME) _this5.refs.timePopup.handleKeyDown(e);
      }
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyPress', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (e) {
      (0, _widgetHelpers.notify)(_this6.props.onKeyPress, [e]);

      if (e.defaultPrevented) return;

      if (_this6.props.open === _constants.datePopups.TIME) _this6.refs.timePopup.handleKeyPress(e);
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'handleDateSelect', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (date) {
      var format = getFormat(_this7.props),
          dateTime = _dates2.default.merge(date, _this7.props.value, _this7.props.currentDate),
          dateStr = formatDate(date, format, _this7.props.culture);

      _this7.close();
      (0, _widgetHelpers.notify)(_this7.props.onSelect, [dateTime, dateStr]);
      _this7.handleChange(dateTime, dateStr, true);
      _this7.focus();
    };
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'handleTimeSelect', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this8 = this;

    return function (datum) {
      var format = getFormat(_this8.props),
          dateTime = _dates2.default.merge(_this8.props.value, datum.date, _this8.props.currentDate),
          dateStr = formatDate(datum.date, format, _this8.props.culture);

      _this8.close();
      (0, _widgetHelpers.notify)(_this8.props.onSelect, [dateTime, dateStr]);
      _this8.handleChange(dateTime, dateStr, true);
      _this8.focus();
    };
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'handleCalendarClick', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this9 = this;

    return function () {
      _this9.focus();
      _this9.toggle(_constants.datePopups.CALENDAR);
    };
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'handleTimeClick', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this10 = this;

    return function () {
      _this10.focus();
      _this10.toggle(_constants.datePopups.TIME);
    };
  }
})), _class2)) || _class;

exports.default = (0, _uncontrollable2.default)(DateTimePicker, {
  open: 'onToggle',
  value: 'onChange'
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