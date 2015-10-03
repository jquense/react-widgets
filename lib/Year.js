'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _utilDates = require('./util/dates');

var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

var _utilConfiguration = require('./util/configuration');

var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

var _util_ = require('./util/_');

var _util_2 = babelHelpers.interopRequireDefault(_util_);

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var localizers = _utilConfiguration2['default'].locale;
var format = function format(props) {
  return props.monthFormat || localizers.date.formats.month;
};

var propTypes = {
  optionID: _react2['default'].PropTypes.func,
  culture: _react2['default'].PropTypes.string,
  value: _react2['default'].PropTypes.instanceOf(Date),
  focused: _react2['default'].PropTypes.instanceOf(Date),
  min: _react2['default'].PropTypes.instanceOf(Date),
  max: _react2['default'].PropTypes.instanceOf(Date),
  onChange: _react2['default'].PropTypes.func.isRequired,

  monthFormat: _utilPropTypes2['default'].dateFormat
};

var isEqual = function isEqual(dateA, dateB) {
  return _utilDates2['default'].eq(dateA, dateB, 'month');
};
var optionId = function optionId(id, date) {
  return '' + id + '__year_' + _utilDates2['default'].year(date) + '-' + _utilDates2['default'].month(date);
};

var YearView = _react2['default'].createClass({

  displayName: 'YearView',

  mixins: [require('./mixins/WidgetMixin'), require('./mixins/RtlChildContextMixin'), require('./mixins/AriaDescendantMixin')()],

  propTypes: propTypes,

  componentDidUpdate: function componentDidUpdate() {
    var activeId = optionId(this._id(), this.props.focused);
    this.ariaActiveDescendant(activeId);
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var focused = _props.focused;
    var months = _utilDates2['default'].monthsInYear(_utilDates2['default'].year(focused));
    var rows = _util_2['default'].chunk(months, 4);

    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes));

    return _react2['default'].createElement(
      'table',
      babelHelpers._extends({}, elementProps, {
        role: 'grid',
        className: (0, _classnames2['default'])(className, 'rw-nav-view')
      }),
      _react2['default'].createElement(
        'tbody',
        null,
        rows.map(this._row)
      )
    );
  },

  _row: function _row(row, rowIdx) {
    var _this = this;

    var _props2 = this.props;
    var focused = _props2.focused;
    var selected = _props2.selected;
    var disabled = _props2.disabled;
    var onChange = _props2.onChange;
    var value = _props2.value;
    var today = _props2.today;
    var culture = _props2.culture;
    var min = _props2.min;
    var max = _props2.max;
    var Day = _props2.dayComponent;
    var id = this._id();
    var labelFormat = localizers.date.formats.header;

    return _react2['default'].createElement(
      'tr',
      { key: rowIdx, role: 'row' },
      row.map(function (date, colIdx) {
        var isFocused = isEqual(date, focused),
            isSelected = isEqual(date, value),
            currentMonth = isEqual(date, today),
            label = localizers.date.format(date, labelFormat, culture);

        var currentID = optionId(id, date);
        var emptyCellClass = !_utilDates2['default'].inRange(date, min, max, 'month') ? "rw-empty-cell" : "";
        return _react2['default'].createElement(
          'td',
          {
            key: colIdx,
            role: 'gridcell',
            id: currentID,
            title: label,
            'aria-selected': isSelected,
            'aria-readonly': disabled,
            'aria-label': label,
            className: emptyCellClass
          },
          _react2['default'].createElement(
            'span',
            {
              'aria-labelledby': currentID,
              onClick: onChange.bind(null, date),
              className: (0, _classnames2['default'])('rw-btn', {
                'rw-state-focus': isFocused,
                'rw-state-selected': isSelected,
                'rw-now': currentMonth
              })
            },
            localizers.date.format(date, format(_this.props), culture)
          )
        );
      })
    );
  }

});

exports['default'] = YearView;
module.exports = exports['default'];