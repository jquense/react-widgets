'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactLibInvariant = require('react/lib/invariant');

var _reactLibInvariant2 = babelHelpers.interopRequireDefault(_reactLibInvariant);

var _reactLibGetActiveElement = require('react/lib/getActiveElement');

var _reactLibGetActiveElement2 = babelHelpers.interopRequireDefault(_reactLibGetActiveElement);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

var _util_ = require('./util/_');

var _util_2 = babelHelpers.interopRequireDefault(_util_);

//pick, omit, has

var _utilDates = require('./util/dates');

var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

var _utilConfiguration = require('./util/configuration');

var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

var _utilConstants = require('./util/constants');

var _utilConstants2 = babelHelpers.interopRequireDefault(_utilConstants);

var _Popup = require('./Popup');

var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

var _Calendar2 = require('./Calendar');

var _Calendar3 = babelHelpers.interopRequireDefault(_Calendar2);

var _TimeList = require('./TimeList');

var _TimeList2 = babelHelpers.interopRequireDefault(_TimeList);

var _DateInput = require('./DateInput');

var _DateInput2 = babelHelpers.interopRequireDefault(_DateInput);

var _WidgetButton = require('./WidgetButton');

var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

var views = _utilConstants2['default'].calendarViews;
var popups = _utilConstants2['default'].datePopups;

var Calendar = _Calendar3['default'].BaseCalendar;
var localizers = _utilConfiguration2['default'].locale;
var viewEnum = Object.keys(views).map(function (k) {
  return views[k];
});

var omit = _util_2['default'].omit;
var pick = _util_2['default'].pick;
var result = _util_2['default'].result;

var propTypes = babelHelpers._extends({}, _utilCompat2['default'].type(Calendar).propTypes, {

  //-- controlled props -----------
  value: _react2['default'].PropTypes.instanceOf(Date),
  onChange: _react2['default'].PropTypes.func,
  open: _react2['default'].PropTypes.oneOf([false, popups.TIME, popups.CALENDAR]),
  onToggle: _react2['default'].PropTypes.func,
  //------------------------------------

  onSelect: _react2['default'].PropTypes.func,

  min: _react2['default'].PropTypes.instanceOf(Date),
  max: _react2['default'].PropTypes.instanceOf(Date),

  culture: _react2['default'].PropTypes.string,

  format: _utilPropTypes2['default'].dateFormat,
  timeFormat: _utilPropTypes2['default'].dateFormat,
  editFormat: _utilPropTypes2['default'].dateFormat,

  calendar: _react2['default'].PropTypes.bool,
  time: _react2['default'].PropTypes.bool,

  timeComponent: _utilPropTypes2['default'].elementType,

  //popup
  dropUp: _react2['default'].PropTypes.bool,
  duration: _react2['default'].PropTypes.number,

  placeholder: _react2['default'].PropTypes.string,
  name: _react2['default'].PropTypes.string,

  initialView: _react2['default'].PropTypes.oneOf(viewEnum),
  finalView: _react2['default'].PropTypes.oneOf(viewEnum),

  disabled: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.oneOf(['disabled'])]),

  readOnly: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.oneOf(['readOnly'])]),

  parse: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string), _react2['default'].PropTypes.string, _react2['default'].PropTypes.func]),

  'aria-labelledby': _react2['default'].PropTypes.string,

  messages: _react2['default'].PropTypes.shape({
    calendarButton: _react2['default'].PropTypes.string,
    timeButton: _react2['default'].PropTypes.string
  })
});

var DateTimePicker = _react2['default'].createClass({

  displayName: 'DateTimePicker',

  mixins: [require('./mixins/WidgetMixin'), require('./mixins/TimeoutMixin'), require('./mixins/PureRenderMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/AriaDescendantMixin')('valueInput', function (key, id) {
    var open = this.props.open;
    var current = this.ariaActiveDescendant();
    var calIsActive = open === popups.CALENDAR && key === 'calendar';
    var timeIsActive = open === popups.TIME && key === 'timelist';

    if (!current || (timeIsActive || calIsActive)) return id;
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
    var format = _props.format;
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
    var ariaLabelledby = _props['aria-labelledby'];
    var focused = this.state.focused;

    var inputID = this._id('_input'),
        timeListID = this._id('_time_listbox'),
        dateListID = this._id('_cal'),
        owns = '';

    var elementProps = omit(this.props, Object.keys(propTypes)),
        calProps = pick(this.props, Object.keys(_utilCompat2['default'].type(Calendar).propTypes));

    var shouldRenderList = _util_2['default'].isFirstFocusedRender(this) || open,
        disabledOrReadonly = this.isDisabled() || this.isReadOnly(),
        calendarIsOpen = open === popups.CALENDAR,
        timeIsOpen = open === popups.TIME;

    if (calendar) owns += dateListID;
    if (time) owns += ' ' + timeListID;

    value = dateOrNull(value);

    return _react2['default'].createElement(
      'div',
      babelHelpers._extends({}, elementProps, {
        ref: 'element',
        tabIndex: '-1',
        onKeyDown: this._maybeHandle(this._keyDown),
        onFocus: this._maybeHandle(this._focus.bind(null, true), true),
        onBlur: this._focus.bind(null, false),
        className: (0, _classnames2['default'])(className, 'rw-datetimepicker', 'rw-widget', (_cx = {}, _cx['rw-state-focus'] = focused, _cx['rw-state-disabled'] = this.isDisabled(), _cx['rw-state-readonly'] = this.isReadOnly(), _cx['rw-has-both'] = calendar && time, _cx['rw-has-neither'] = !calendar && !time, _cx['rw-rtl'] = this.isRtl(), _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx))
      }),
      _react2['default'].createElement(_DateInput2['default'], {
        ref: 'valueInput',
        id: inputID,
        tabIndex: tabIndex || 0,
        role: 'combobox',
        'aria-expanded': !!open,
        'aria-busy': !!busy,
        'aria-owns': owns.trim(),
        'aria-haspopup': true,
        placeholder: placeholder,
        name: name,
        disabled: this.isDisabled(),
        readOnly: this.isReadOnly(),
        value: value,
        format: getFormat(this.props),
        editFormat: editFormat,
        editing: focused,
        culture: culture,
        parse: this._parse,
        onChange: this._change
      }),
      (calendar || time) && _react2['default'].createElement(
        'span',
        { className: 'rw-select' },
        calendar && _react2['default'].createElement(
          _WidgetButton2['default'],
          {
            tabIndex: '-1',
            className: 'rw-btn-calendar',
            disabled: disabledOrReadonly,
            'aria-disabled': disabledOrReadonly,
            'aria-label': messages.calendarButton,
            onClick: this._maybeHandle(this._click.bind(null, popups.CALENDAR))
          },
          _react2['default'].createElement('i', { className: 'rw-i rw-i-calendar',
            'aria-hidden': 'true'
          })
        ),
        time && _react2['default'].createElement(
          _WidgetButton2['default'],
          {
            tabIndex: '-1',
            className: 'rw-btn-time',
            disabled: disabledOrReadonly,
            'aria-disabled': disabledOrReadonly,
            'aria-label': messages.timeButton,
            onClick: this._maybeHandle(this._click.bind(null, popups.TIME))
          },
          _react2['default'].createElement('i', { className: 'rw-i rw-i-clock-o',
            'aria-hidden': 'true'
          })
        )
      ),
      _react2['default'].createElement(
        _Popup2['default'],
        {
          dropUp: dropUp,
          open: timeIsOpen,
          onRequestClose: this.close,
          duration: duration,
          onOpening: function () {
            return _this.refs.timePopup.forceUpdate();
          }
        },
        _react2['default'].createElement(
          'div',
          null,
          shouldRenderList && _react2['default'].createElement(_TimeList2['default'], { ref: 'timePopup',
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
            culture: culture,
            onMove: this._scrollTo,
            preserveDate: !!calendar,
            itemComponent: timeComponent,
            onSelect: this._maybeHandle(this._selectTime)
          })
        )
      ),
      _react2['default'].createElement(
        _Popup2['default'],
        {
          className: 'rw-calendar-popup',
          dropUp: dropUp,
          open: calendarIsOpen,
          duration: duration,
          onRequestClose: this.close
        },
        shouldRenderList && _react2['default'].createElement(Calendar, babelHelpers._extends({}, calProps, {
          ref: 'calPopup',
          tabIndex: '-1',
          id: dateListID,
          value: value,
          'aria-hidden': !open,
          'aria-live': 'polite',
          ariaActiveDescendantKey: 'calendar',
          onChange: this._maybeHandle(this._selectDate),

          onNavigate: function () {
            return _this.focus();
          }
        }))
      )
    );
  },

  _change: function _change(date, str, constrain, source) {
    var _props2 = this.props;
    var onChange = _props2.onChange;
    var value = _props2.value;

    if (constrain) date = this.inRangeValue(date);

    if (onChange) {
      if (date == null || value == null) {
        if (date != value) //eslint-disable-line eqeqeq
          onChange(date, str, source);
      } else if (!_utilDates2['default'].eq(date, value)) onChange(date, str, source);
    }
  },

  _keyDown: function _keyDown(e) {
    var _props3 = this.props;
    var open = _props3.open;
    var calendar = _props3.calendar;
    var time = _props3.time;

    if (e.key === 'Escape' && open) this.close();else if (e.altKey) {
      e.preventDefault();

      if (e.key === 'ArrowDown') {
        if (calendar && time) this.open(open === popups.CALENDAR ? popups.TIME : popups.CALENDAR);else if (time) this.open(popups.TIME);else if (calendar) this.open(popups.CALENDAR);
      } else if (e.key === 'ArrowUp') this.close();
    } else if (open) {
      if (open === popups.CALENDAR) this.refs.calPopup._keyDown(e);
      if (open === popups.TIME) this.refs.timePopup._keyDown(e);
    }

    this.notify('onKeyDown', [e]);
  },

  _focus: function _focus(focused, e) {
    var _this2 = this;

    this.setTimeout('focus', function () {
      if (!focused) _this2.close();

      if (focused !== _this2.state.focused) {
        _this2.notify(focused ? 'onFocus' : 'onBlur', e);
        _this2.setState({ focused: focused });
      }
    });
  },

  focus: function focus() {
    if ((0, _reactLibGetActiveElement2['default'])() !== _utilCompat2['default'].findDOMNode(this.refs.valueInput)) this.refs.valueInput.focus();
  },

  _selectDate: function _selectDate(date) {
    var format = getFormat(this.props),
        dateTime = _utilDates2['default'].merge(date, this.props.value),
        dateStr = formatDate(date, format, this.props.culture);

    this.close();
    this.notify('onSelect', [dateTime, dateStr]);
    this._change(dateTime, dateStr, true, popups.CALENDAR);
    this.focus();
  },

  _selectTime: function _selectTime(datum) {
    var format = getFormat(this.props),
        dateTime = _utilDates2['default'].merge(this.props.value, datum.date),
        dateStr = formatDate(datum.date, format, this.props.culture);

    this.close();
    this.notify('onSelect', [dateTime, dateStr]);
    this._change(dateTime, dateStr, true, popups.TIME);
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

    (0, _reactLibInvariant2['default'])(formats.length, 'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' + 'the DateTimePicker is unable to parse `%s` into a dateTime, ' + 'please provide either a parse function or Globalize.js compatible string for `format`', string);

    return formatsParser(formats, this.props.culture, string);
  },

  toggle: function toggle(view) {
    this.props.open ? this.props.open !== view ? this.open(view) : this.close(view) : this.open(view);
  },

  open: function open(view) {
    if (this.props.open !== view && this.props[view] === true) this.notify('onToggle', view);
  },

  close: function close() {
    if (this.props.open) this.notify('onToggle', false);
  },

  inRangeValue: function inRangeValue(value) {
    if (value == null) return value;

    return _utilDates2['default'].max(_utilDates2['default'].min(value, this.props.max), this.props.min);
  }

});

var UncontrolledDateTimePicker = (0, _uncontrollable2['default'])(DateTimePicker, { open: 'onToggle', value: 'onChange' });

UncontrolledDateTimePicker.BaseDateTimePicker = DateTimePicker;

exports['default'] = UncontrolledDateTimePicker;

function getFormat(props) {
  var cal = props[popups.CALENDAR] != null ? props.calendar : true,
      time = props[popups.TIME] != null ? props.time : true;

  return props.format ? props.format : cal && time || !cal && !time ? localizers.date.formats['default'] : localizers.date.formats[cal ? 'date' : 'time'];
}

function formatDate(date, format, culture) {
  var val = '';

  if (date instanceof Date && !isNaN(date.getTime())) val = localizers.date.format(date, format, culture);

  return val;
}

function formatsParser(formats, culture, str) {
  var date;

  for (var i = 0; i < formats.length; i++) {
    date = localizers.date.parse(str, formats[i], culture);
    if (date) return date;
  }
  return null;
}

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt;
  return null;
}
module.exports = exports['default'];
// #75: need to aggressively reclaim focus from the calendar otherwise
// disabled header/footer buttons will drop focus completely from the widget