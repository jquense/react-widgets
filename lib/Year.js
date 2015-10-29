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

var format = function format(props) {
  return _utilLocalizers.date.getFormat('month', props.monthFormat);
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
  return id + '__year_' + _utilDates2['default'].year(date) + '-' + _utilDates2['default'].month(date);
};

var YearView = _react2['default'].createClass({

  displayName: 'YearView',

  mixins: [require('./mixins/RtlChildContextMixin'), require('./mixins/AriaDescendantMixin')()],

  propTypes: propTypes,

  componentDidUpdate: function componentDidUpdate() {
    var activeId = optionId(_utilWidgetHelpers.instanceId(this), this.props.focused);
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
    var labelFormat = _utilLocalizers.date.getFormat('header');

    return _react2['default'].createElement(
      'tr',
      { key: rowIdx, role: 'row' },
      row.map(function (date, colIdx) {
        var isFocused = isEqual(date, focused),
            isSelected = isEqual(date, value),
            currentMonth = isEqual(date, today),
            label = _utilLocalizers.date.format(date, labelFormat, culture);

        var currentID = optionId(id, date);

        return _utilDates2['default'].inRange(date, min, max, 'month') ? _react2['default'].createElement(
          'td',
          {
            key: colIdx,
            role: 'gridcell',
            id: currentID,
            title: label,
            'aria-selected': isSelected,
            'aria-readonly': disabled,
            'aria-label': label
          },
          _react2['default'].createElement(
            'span',
            {
              'aria-labelledby': currentID,
              onClick: onChange.bind(null, date),
              className: _classnames2['default']('rw-btn', {
                'rw-state-focus': isFocused,
                'rw-state-selected': isSelected,
                'rw-now': currentMonth
              })
            },
            _utilLocalizers.date.format(date, format(_this.props), culture)
          )
        ) : _react2['default'].createElement(
          'td',
          { key: colIdx, className: 'rw-empty-cell', role: 'presentation' },
          ' '
        );
      })
    );
  }

});

exports['default'] = YearView;
module.exports = exports['default'];