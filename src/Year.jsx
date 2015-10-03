import React from 'react';
import cn from 'classnames';
import dates from './util/dates';
import config from './util/configuration';
import _  from './util/_';
import CustomPropTypes from './util/propTypes';
import { instanceId } from './util/widgetHelpers';

var localizers = config.locale
var format = props => props.monthFormat || localizers.date.formats.month

let propTypes = {
  optionID:     React.PropTypes.func,
  culture:      React.PropTypes.string,
  value:        React.PropTypes.instanceOf(Date),
  focused:      React.PropTypes.instanceOf(Date),
  min:          React.PropTypes.instanceOf(Date),
  max:          React.PropTypes.instanceOf(Date),
  onChange:     React.PropTypes.func.isRequired,

  monthFormat:  CustomPropTypes.dateFormat
};

let isEqual = (dateA, dateB) => dates.eq(dateA, dateB, 'month')
let optionId = (id, date) => `${id}__year_${dates.year(date)}-${dates.month(date)}`;

let YearView = React.createClass({

  displayName: 'YearView',

  mixins: [
    require('./mixins/RtlChildContextMixin'),
    require('./mixins/AriaDescendantMixin')()
  ],

  propTypes,

  componentDidUpdate() {
    let activeId = optionId(instanceId(this), this.props.focused);
    this.ariaActiveDescendant(activeId)
  },

  render(){
    let { className, focused } = this.props
      , months = dates.monthsInYear(dates.year(focused))
      , rows = _.chunk(months, 4);

    var elementProps = _.omit(this.props, Object.keys(propTypes));

    return (
      <table { ...elementProps}
        role='grid'
        className={cn(className, 'rw-nav-view')}
      >
        <tbody >
          { rows.map(this._row)}
        </tbody>
      </table>
    )
  },

  _row(row, rowIdx){
    let {
        focused, disabled, onChange
      , value, today, culture, min, max } = this.props
      , id = instanceId(this)
      , labelFormat = localizers.date.formats.header;

    return (
      <tr key={rowIdx} role='row'>
        { row.map( (date, colIdx) => {
          var isFocused  = isEqual(date, focused)
            , isSelected = isEqual(date, value)
            , currentMonth = isEqual(date, today)
            , label = localizers.date.format(date, labelFormat, culture);

          var currentID = optionId(id, date);
          var emptyCellClass = !dates.inRange(date, min, max, 'month') ? "rw-empty-cell" : "";
          return (
              <td
                key={colIdx}
                role='gridcell'
                id={currentID}
                title={label}
                aria-selected={isSelected}
                aria-readonly={disabled}
                aria-label={label}
                className={emptyCellClass}
              >
                <span
                  aria-labelledby={currentID}
                  onClick={onChange.bind(null, date)}
                  className={cn('rw-btn', {
                    'rw-state-focus':    isFocused,
                    'rw-state-selected': isSelected,
                    'rw-now':            currentMonth
                  })}
                >
                  {localizers.date.format(date, format(this.props), culture) }
                </span>
              </td>
            )
        })}
    </tr>)
  }

});

export default YearView;
