'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CalendarView = require('./CalendarView');

var _CalendarView2 = _interopRequireDefault(_CalendarView);

var _dates = require('./util/dates');

var _dates2 = _interopRequireDefault(_dates);

var _localizers = require('./util/localizers');

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var format = function format(props) {
  return _localizers.date.getFormat('decade', props.decadeFormat);
};

var CenturyView = (_temp2 = _class = function (_React$Component) {
  _inherits(CenturyView, _React$Component);

  function CenturyView() {
    var _temp, _this, _ret;

    _classCallCheck(this, CenturyView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.renderRow = function (row, rowIdx) {
      var _this$props = _this.props;
      var focused = _this$props.focused;
      var activeId = _this$props.activeId;
      var disabled = _this$props.disabled;
      var onChange = _this$props.onChange;
      var value = _this$props.value;
      var today = _this$props.today;
      var culture = _this$props.culture;
      var min = _this$props.min;
      var max = _this$props.max;


      return _react2.default.createElement(
        _CalendarView2.default.Row,
        { key: rowIdx },
        row.map(function (date, colIdx) {

          var label = _localizers.date.format(_dates2.default.startOf(date, 'decade'), format(_this.props), culture);

          return _react2.default.createElement(
            _CalendarView2.default.Cell,
            {
              key: colIdx,
              unit: 'decade',
              activeId: activeId,
              label: label,
              date: date,
              now: today,
              min: min,
              max: max,
              onChange: onChange,
              focused: focused,
              selected: value,
              disabled: disabled
            },
            label
          );
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  CenturyView.prototype.render = function render() {
    var _props = this.props;
    var focused = _props.focused;
    var activeId = _props.activeId;


    return _react2.default.createElement(
      _CalendarView2.default,
      _extends({}, _3.default.omitOwnProps(this), {
        activeId: activeId
      }),
      _react2.default.createElement(
        _CalendarView2.default.Body,
        null,
        _3.default.chunk(getCenturyDecades(focused), 4).map(this.renderRow)
      )
    );
  };

  return CenturyView;
}(_react2.default.Component), _class.propTypes = {
  activeId: _react2.default.PropTypes.string,
  culture: _react2.default.PropTypes.string,
  today: _react2.default.PropTypes.instanceOf(Date),
  value: _react2.default.PropTypes.instanceOf(Date),
  focused: _react2.default.PropTypes.instanceOf(Date),
  min: _react2.default.PropTypes.instanceOf(Date),
  max: _react2.default.PropTypes.instanceOf(Date),
  onChange: _react2.default.PropTypes.func.isRequired,
  decadeFormat: _propTypes2.default.dateFormat,
  disabled: _react2.default.PropTypes.bool
}, _temp2);


function getCenturyDecades(_date) {
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      date = _dates2.default.add(_dates2.default.startOf(_date, 'century'), -20, 'year');

  return days.map(function () {
    return date = _dates2.default.add(date, 10, 'year');
  });
}

exports.default = CenturyView;
module.exports = exports['default'];