import React from 'react';

import PropTypes from 'prop-types';

import CalendarView from './CalendarView';
import dates from './util/dates';
import { date as dateLocalizer } from './util/localizers';
import _  from './util/_';
import CustomPropTypes from './util/propTypes';
import { instanceId } from './util/widgetHelpers';

let propTypes = {
  culture:      PropTypes.string,
  today:        PropTypes.instanceOf(Date),
  value:        PropTypes.instanceOf(Date),
  focused:      PropTypes.instanceOf(Date),
  min:          PropTypes.instanceOf(Date),
  max:          PropTypes.instanceOf(Date),
  onChange:     PropTypes.func.isRequired,

  yearFormat:   CustomPropTypes.dateFormat
};

let optionId = (id, date) => `${id}__decade_${dates.year(date)}`;

export default React.createClass({

  displayName: 'DecadeView',

  mixins: [
    require('./mixins/PureRenderMixin'),
    require('./mixins/RtlChildContextMixin'),
    require('./mixins/AriaDescendantMixin')()
  ],

  propTypes,

  componentDidUpdate() {
    let activeId = optionId(instanceId(this), this.props.focused);
    this.ariaActiveDescendant(activeId)
  },

  render(){
    let { focused } = this.props;

    return (
      <CalendarView {..._.omitOwnProps(this)}>
        <tbody>
          {_.chunk(getDecadeYears(focused), 4)
            .map(this.renderRow)
          }
        </tbody>
      </CalendarView>
    )
  },

  renderRow(row, rowIdx) {
    let {
        focused
      , disabled
      , onChange
      , yearFormat
      , value
      , today
      , culture
      , min
      , max } = this.props

    let id = instanceId(this);

    return (
      <CalendarView.Row key={rowIdx}>
        {row.map((date, colIdx) => {
          let label = dateLocalizer.format(date, dateLocalizer.getFormat('year', yearFormat), culture)

          return (
            <CalendarView.Cell
              key={colIdx}
              unit="year"
              id={optionId(id, date)}
              label={label}
              date={date}
              now={today}
              min={min}
              max={max}
              onChange={onChange}
              focused={focused}
              selected={value}
              disabled={disabled}
            >
              {label}
            </CalendarView.Cell>
          )
        })}
      </CalendarView.Row>
    )
  }
});

function getDecadeYears(_date){
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    , date = dates.add(dates.startOf(_date, 'decade'), -2, 'year')

  return days.map(() => date = dates.add(date, 1, 'year'))
}
