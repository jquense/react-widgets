'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _utilDates = require('./util/dates');

var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

var _utilLocalizers = require('./util/localizers');

var _util_ = require('./util/_');

var _util_2 = babelHelpers.interopRequireDefault(_util_);

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var _utilWidgetHelpers = require('./util/widgetHelpers');

var propTypes = {
  optionID: _react2['default'].PropTypes.func,
  culture: _react2['default'].PropTypes.string,

  value: _react2['default'].PropTypes.instanceOf(Date),
  focused: _react2['default'].PropTypes.instanceOf(Date),
  min: _react2['default'].PropTypes.instanceOf(Date),
  max: _react2['default'].PropTypes.instanceOf(Date),
  onChange: _react2['default'].PropTypes.func.isRequired,

  yearFormat: _utilPropTypes2['default'].dateFormat
};

var isEqual = function isEqual(dataA, dateB) {
  return _utilDates2['default'].eq(dataA, dateB, 'year');
};
var optionId = function optionId(id, date) {
  return id + '__decade_' + _utilDates2['default'].year(date);
};

exports['default'] = _react2['default'].createClass({

  displayName: 'DecadeView',

  mixins: [require('./mixins/PureRenderMixin'), require('./mixins/RtlChildContextMixin'), require('./mixins/AriaDescendantMixin')()],

  propTypes: propTypes,

  componentDidUpdate: function componentDidUpdate() {
    var activeId = optionId(_utilWidgetHelpers.instanceId(this), this.props.focused);
    this.ariaActiveDescendant(activeId);
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var focused = _props.focused;
    var years = getDecadeYears(focused);
    var rows = _util_2['default'].chunk(years, 4);

    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes));

    return _react2['default'].createElement(
      'table',
      babelHelpers._extends({}, elementProps, {
        role: 'grid',
        className: _classnames2['default'](className, 'rw-nav-view')
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
    var disabled = _props2.disabled;
    var onChange = _props2.onChange;
    var value = _props2.value;
    var today = _props2.today;
    var culture = _props2.culture;
    var min = _props2.min;
    var max = _props2.max;
    var id = _utilWidgetHelpers.instanceId(this);

    return _react2['default'].createElement(
      'tr',
      { key: 'row_' + rowIdx, role: 'row' },
      row.map(function (date, colIdx) {
        var isFocused = isEqual(date, focused),
            isSelected = isEqual(date, value),
            currentYear = isEqual(date, today),
            label = _utilLocalizers.date.format(date, _utilLocalizers.date.getFormat('year', _this.props.yearFormat), culture);

        var currentID = optionId(id, date);

        return !_utilDates2['default'].inRange(date, min, max, 'year') ? _react2['default'].createElement(
          'td',
          { key: colIdx, role: 'presentation', className: 'rw-empty-cell' },
          ' '
        ) : _react2['default'].createElement(
          'td',
          {
            key: colIdx,
            role: 'gridcell',
            id: currentID,
            title: label,
            'aria-selected': isSelected,
            'aria-label': label,
            'aria-readonly': disabled
          },
          _react2['default'].createElement(
            'span',
            {
              'aria-labelledby': currentID,
              onClick: onChange.bind(null, date),
              className: _classnames2['default']('rw-btn', {
                'rw-off-range': !inDecade(date, focused),
                'rw-state-focus': isFocused,
                'rw-state-selected': isSelected,
                'rw-now': currentYear
              })
            },
            label
          )
        );
      })
    );
  }
});

function inDecade(date, start) {
  return _utilDates2['default'].gte(date, _utilDates2['default'].startOf(start, 'decade'), 'year') && _utilDates2['default'].lte(date, _utilDates2['default'].endOf(start, 'decade'), 'year');
}

function getDecadeYears(_date) {
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      date = _utilDates2['default'].add(_utilDates2['default'].startOf(_date, 'decade'), -2, 'year');

  return days.map(function () {
    return date = _utilDates2['default'].add(date, 1, 'year');
  });
}
module.exports = exports['default'];