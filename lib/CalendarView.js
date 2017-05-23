'use strict';

exports.__esModule = true;

var _class, _temp2;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _dates = require('./util/dates');

var _dates2 = _interopRequireDefault(_dates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VIEW_UNITS = ['month', 'year', 'decade', 'century'];

function clamp(date, min, max) {
  return _dates2.default.max(_dates2.default.min(date, max), min);
}

var CalendarView = function (_React$Component) {
  _inherits(CalendarView, _React$Component);

  function CalendarView() {
    _classCallCheck(this, CalendarView);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  CalendarView.prototype.render = function render() {
    var className = this.props.className;


    return _react2.default.createElement('table', _extends({}, this.props, {
      role: 'grid',
      tabIndex: '-1',
      className: (0, _classnames2.default)(className, 'rw-nav-view', 'rw-calendar-grid')
    }));
  };

  return CalendarView;
}(_react2.default.Component);

var CalendarViewCell = (_temp2 = _class = function (_React$Component2) {
  _inherits(CalendarViewCell, _React$Component2);

  function CalendarViewCell() {
    var _temp, _this2, _ret;

    _classCallCheck(this, CalendarViewCell);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this2), _this2.handleChange = function () {
      var _this2$props = _this2.props,
          onChange = _this2$props.onChange,
          min = _this2$props.min,
          max = _this2$props.max,
          date = _this2$props.date;

      onChange(clamp(date, min, max));
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  CalendarViewCell.prototype.isEqual = function isEqual(date) {
    return _dates2.default.eq(this.props.date, date, this.props.unit);
  };

  CalendarViewCell.prototype.isEmpty = function isEmpty() {
    var _props = this.props,
        unit = _props.unit,
        min = _props.min,
        max = _props.max,
        date = _props.date;

    return !_dates2.default.inRange(date, min, max, unit);
  };

  CalendarViewCell.prototype.isNow = function isNow() {
    return this.isEqual(this.props.now);
  };

  CalendarViewCell.prototype.isFocused = function isFocused() {
    return this.isEqual(this.props.focused);
  };

  CalendarViewCell.prototype.isSelected = function isSelected() {
    return this.isEqual(this.props.selected);
  };

  CalendarViewCell.prototype.isOffView = function isOffView() {
    var _props2 = this.props,
        viewUnit = _props2.viewUnit,
        focused = _props2.focused,
        date = _props2.date;

    return viewUnit && _dates2.default[viewUnit](date) !== _dates2.default[viewUnit](focused);
  };

  CalendarViewCell.prototype.render = function render() {
    var _props3 = this.props,
        children = _props3.children,
        id = _props3.id,
        label = _props3.label,
        disabled = _props3.disabled;


    if (this.isEmpty()) {
      return _react2.default.createElement(
        'td',
        { className: 'rw-empty-cell', role: 'presentation' },
        '\xA0'
      );
    }

    return _react2.default.createElement(
      'td',
      {
        role: 'gridcell',
        id: id,
        title: label,
        'aria-label': label,
        'aria-readonly': disabled,
        'aria-selected': this.isSelected()
      },
      _react2.default.createElement(
        'span',
        {
          'aria-labelledby': id,
          onClick: this.handleChange,
          className: (0, _classnames2.default)('rw-btn', this.isNow() && 'rw-now', this.isOffView() && 'rw-off-range', this.isFocused() && 'rw-state-focus', this.isSelected() && 'rw-state-selected')
        },
        children
      )
    );
  };

  return CalendarViewCell;
}(_react2.default.Component), _class.propTypes = {
  id: _propTypes2.default.string,
  label: _propTypes2.default.string,
  today: _propTypes2.default.instanceOf(Date),
  selected: _propTypes2.default.instanceOf(Date),
  focused: _propTypes2.default.instanceOf(Date),
  min: _propTypes2.default.instanceOf(Date),
  max: _propTypes2.default.instanceOf(Date),
  unit: _propTypes2.default.oneOf(['day'].concat(VIEW_UNITS)),
  viewUnit: _propTypes2.default.oneOf(VIEW_UNITS),
  onChange: _propTypes2.default.func.isRequired
}, _temp2);


CalendarView.Row = function (props) {
  return _react2.default.createElement('tr', _extends({ role: 'row' }, props));
};
CalendarView.Cell = CalendarViewCell;

exports.default = CalendarView;
module.exports = exports['default'];