import React from 'react';
import cn from 'classnames';
import dates from './util/dates';
import { date as dateLocalizer } from './util/localizers';
import _  from './util/_';
import CustomPropTypes from './util/propTypes';
import { instanceId } from './util/widgetHelpers';

var format = props => dateLocalizer.getFormat('month', props.monthFormat)

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
      , labelFormat = dateLocalizer.getFormat('header');

    return (
      <tr key={rowIdx} role='row'>
        { row.map( (date, colIdx) => {
          var isFocused  = isEqual(date, focused)
            , isSelected = isEqual(date, value)
            , currentMonth = isEqual(date, today)
            , label = dateLocalizer.format(date, labelFormat, culture);

          var currentID = optionId(id, date);

          return dates.inRange(date, min, max, 'month')
            ? (
              <td
                key={colIdx}
                role='gridcell'
                id={currentID}
                title={label}
                aria-selected={isSelected}
                aria-readonly={disabled}
                aria-label={label}
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
                  {dateLocalizer.format(date, format(this.props), culture) }
                </span>
              </td>
            )
            : <td key={colIdx} className='rw-empty-cell' role='presentation'>&nbsp;</td>
        })}
    </tr>)
  }

});

export default YearView;
