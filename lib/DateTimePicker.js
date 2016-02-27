'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = babelHelpers.interopRequireDefault(_invariant);

var _domHelpersActiveElement = require('dom-helpers/activeElement');

var _domHelpersActiveElement2 = babelHelpers.interopRequireDefault(_domHelpersActiveElement);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

var _util_ = require('./util/_');

var _util_2 = babelHelpers.interopRequireDefault(_util_);

//pick, omit, has

var _utilDates = require('./util/dates');

var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

var _utilLocalizers = require('./util/localizers');

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

var _utilInteraction = require('./util/interaction');

var _utilWidgetHelpers = require('./util/widgetHelpers');

var views = _utilConstants2['default'].calendarViews;
var popups = _utilConstants2['default'].datePopups;

var Calendar = _Calendar3['default'].ControlledComponent;
var viewEnum = Object.keys(views).map(function (k) {
  return views[k];
});

var omit = _util_2['default'].omit;
var pick = _util_2['default'].pick;

var propTypes = babelHelpers._extends({}, Calendar.propTypes, {

  //-- controlled props -----------
  value: _react2['default'].PropTypes.instanceOf(Date),
  onChange: _react2['default'].PropTypes.func,
  open: _react2['default'].PropTypes.oneOf([false, popups.TIME, popups.CALENDAR]),
  onToggle: _react2['default'].PropTypes.func,
  currentDate: _react2['default'].PropTypes.instanceOf(Date),
  onCurrentDateChange: _react2['default'].PropTypes.func,
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

  autoFocus: _react2['default'].PropTypes.bool,
  disabled: _utilPropTypes2['default'].disabled,
  readOnly: _utilPropTypes2['default'].readOnly,

  parse: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string), _react2['default'].PropTypes.string, _react2['default'].PropTypes.func]),

  'aria-labelledby': _react2['default'].PropTypes.string,

  messages: _react2['default'].PropTypes.shape({
    calendarButton: _react2['default'].PropTypes.string,
    timeButton: _react2['default'].PropTypes.string
  })
});

var DateTimePicker = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
  key: 'displayName',
  initializer: function initializer() {
    return 'DateTimePicker';
  }
}, {
  key: 'mixins',
  initializer: function initializer() {
    return [require('./mixins/TimeoutMixin'), require('./mixins/PureRenderMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/FocusMixin')({
      didHandle: function didHandle(focused) {
        if (!focused) this.close();
      }
    }), require('./mixins/AriaDescendantMixin')('valueInput', function (key, id) {
      var open = this.props.open;
      var current = this.ariaActiveDescendant();
      var calIsActive = open === popups.CALENDAR && key === 'calendar';
      var timeIsActive = open === popups.TIME && key === 'timelist';

      if (!current || timeIsActive || calIsActive) return id;
    })];
  }
}, {
  key: 'propTypes',
  initializer: function initializer() {
    return propTypes;
  }
}, {
  key: 'getInitialState',
  value: function getInitialState() {
    return {
      focused: false
    };
  }
}, {
  key: 'getDefaultProps',
  value: function getDefaultProps() {

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
  }
}, {
  key: 'render',
  value: function render() {
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

    var inputID = _utilWidgetHelpers.instanceId(this, '_input'),
        timeListID = _utilWidgetHelpers.instanceId(this, '_time_listbox'),
        dateListID = _utilWidgetHelpers.instanceId(this, '_cal'),
        owns = '';

    var elementProps = omit(this.props, Object.keys(propTypes)),
        calProps = pick(this.props, Object.keys(Calendar.propTypes));

    var shouldRenderList = _utilWidgetHelpers.isFirstFocusedRender(this) || open,
        disabledOrReadonly = disabled || readOnly,
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
        onKeyDown: this._keyDown,
        onKeyPress: this._keyPress,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        className: _classnames2['default'](className, 'rw-datetimepicker', 'rw-widget', (_cx = {
          'rw-state-focus': focused,
          'rw-state-disabled': disabled,
          'rw-state-readonly': readOnly,
          'rw-has-both': calendar && time,
          'rw-has-neither': !calendar && !time,
          'rw-rtl': this.isRtl()

        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx))
      }),
      _react2['default'].createElement(_DateInput2['default'], {
        ref: 'valueInput',
        id: inputID,
        autoFocus: autoFocus,
        tabIndex: tabIndex || 0,
        role: 'combobox',
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
            onClick: this._click.bind(null, popups.CALENDAR)
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
            onClick: this._click.bind(null, popups.TIME)
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
            currentDate: this.props.currentDate,
            culture: culture,
            onMove: this._scrollTo,
            preserveDate: !!calendar,
            itemComponent: timeComponent,
            onSelect: this._selectTime
          })
        )
      ),
      _react2['default'].createElement(
        _Popup2['default'],
        {
          className: 'rw-calendar-popup',
          dropUp: dropUp,
          open: calendarIsOpen,
          duration: duration
        },
        shouldRenderList && _react2['default'].createElement(Calendar, babelHelpers._extends({}, calProps, {
          ref: 'calPopup',
          tabIndex: '-1',
          id: dateListID,
          value: value,
          'aria-hidden': !open,
          'aria-live': 'polite',
          ariaActiveDescendantKey: 'calendar',
          onChange: this._selectDate,
          // #75: need to aggressively reclaim focus from the calendar otherwise
          // disabled header/footer buttons will drop focus completely from the widget
          onNavigate: function () {
            return _this.focus();
          },
          currentDate: this.props.currentDate,
          onCurrentDateChange: this.props.onCurrentDateChange
        }))
      )
    );
  }
}, {
  key: '_change',
  decorators: [_utilInteraction.widgetEditable],
  value: function _change(date, str, constrain) {
    var _props2 = this.props;
    var onChange = _props2.onChange;
    var value = _props2.value;

    if (constrain) date = this.inRangeValue(date);

    if (onChange) {
      if (date == null || value == null) {
        if (date != value) //eslint-disable-line eqeqeq
          onChange(date, str);
      } else if (!_utilDates2['default'].eq(date, value)) onChange(date, str);
    }
  }
}, {
  key: '_keyDown',
  decorators: [_utilInteraction.widgetEditable],
  value: function _keyDown(e) {
    var _props3 = this.props;
    var open = _props3.open;
    var calendar = _props3.calendar;
    var time = _props3.time;

    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

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
  }
}, {
  key: '_keyPress',
  decorators: [_utilInteraction.widgetEditable],
  value: function _keyPress(e) {
    _utilWidgetHelpers.notify(this.props.onKeyPress, [e]);

    if (e.defaultPrevented) return;

    if (this.props.open === popups.TIME) this.refs.timePopup._keyPress(e);
  }
}, {
  key: 'focus',
  value: function focus() {
    if (_domHelpersActiveElement2['default']() !== _utilCompat2['default'].findDOMNode(this.refs.valueInput)) this.refs.valueInput.focus();
  }
}, {
  key: '_selectDate',
  decorators: [_utilInteraction.widgetEditable],
  value: function _selectDate(date) {
    var format = getFormat(this.props),
        dateTime = _utilDates2['default'].merge(date, this.props.value, this.props.currentDate),
        dateStr = formatDate(date, format, this.props.culture);

    this.close();
    _utilWidgetHelpers.notify(this.props.onSelect, [dateTime, dateStr]);
    this._change(dateTime, dateStr, true);
    this.focus();
  }
}, {
  key: '_selectTime',
  decorators: [_utilInteraction.widgetEditable],
  value: function _selectTime(datum) {
    var format = getFormat(this.props),
        dateTime = _utilDates2['default'].merge(this.props.value, datum.date, this.props.currentDate),
        dateStr = formatDate(datum.date, format, this.props.culture);

    this.close();
    _utilWidgetHelpers.notify(this.props.onSelect, [dateTime, dateStr]);
    this._change(dateTime, dateStr, true);
    this.focus();
  }
}, {
  key: '_click',
  decorators: [_utilInteraction.widgetEditable],
  value: function _click(view, e) {
    this.focus();
    this.toggle(view, e);
  }
}, {
  key: '_parse',
  value: function _parse(string) {
    var format = getFormat(this.props, true),
        editFormat = this.props.editFormat,
        parse = this.props.parse,
        formats = [];

    if (typeof parse === 'function') return parse(string, this.props.culture);

    if (typeof format === 'string') formats.push(format);

    if (typeof editFormat === 'string') formats.push(editFormat);

    if (parse) formats = formats.concat(this.props.parse);

    _invariant2['default'](formats.length, 'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' + 'the DateTimePicker is unable to parse `%s` into a dateTime, ' + 'please provide either a parse function or Globalize.js compatible string for `format`', string);

    return formatsParser(formats, this.props.culture, string);
  }
}, {
  key: 'toggle',
  value: function toggle(view) {
    this.props.open ? this.props.open !== view ? this.open(view) : this.close(view) : this.open(view);
  }
}, {
  key: 'open',
  value: function open(view) {
    if (this.props.open !== view && this.props[view] === true) _utilWidgetHelpers.notify(this.props.onToggle, view);
  }
}, {
  key: 'close',
  value: function close() {
    if (this.props.open) _utilWidgetHelpers.notify(this.props.onToggle, false);
  }
}, {
  key: 'inRangeValue',
  value: function inRangeValue(value) {
    if (value == null) return value;

    return _utilDates2['default'].max(_utilDates2['default'].min(value, this.props.max), this.props.min);
  }
}]));

exports['default'] = _uncontrollable2['default'](DateTimePicker, { open: 'onToggle', value: 'onChange', currentDate: 'onCurrentDateChange' });

function getFormat(props) {
  var cal = props[popups.CALENDAR] != null ? props.calendar : true,
      time = props[popups.TIME] != null ? props.time : true;

  return props.format ? props.format : cal && time || !cal && !time ? _utilLocalizers.date.getFormat('default') : _utilLocalizers.date.getFormat(cal ? 'date' : 'time');
}

function formatDate(date, format, culture) {
  var val = '';

  if (date instanceof Date && !isNaN(date.getTime())) val = _utilLocalizers.date.format(date, format, culture);

  return val;
}

function formatsParser(formats, culture, str) {
  var date;

  for (var i = 0; i < formats.length; i++) {
    date = _utilLocalizers.date.parse(str, formats[i], culture);
    if (date) return date;
  }
  return null;
}

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt;
  return null;
}
module.exports = exports['default'];