import React from 'react';

import CalendarView from './CalendarView';
import dates from './util/dates';
import { date as dateLocalizer } from './util/localizers';
import _  from './util/_';
import CustomPropTypes from './util/propTypes';

class DecadeView extends React.Component {

  static propTypes = {
    activeId: React.PropTypes.string,
    culture:      React.PropTypes.string,
    today:        React.PropTypes.instanceOf(Date),
    value:        React.PropTypes.instanceOf(Date),
    focused:      React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),
    onChange:     React.PropTypes.func.isRequired,

    yearFormat:   CustomPropTypes.dateFormat
  };

  render(){
    let { focused, activeId } = this.props;

    return (
      <CalendarView
        {..._.omitOwnProps(this)}
        activeId={activeId}
      >
        <CalendarView.Body>
          {_.chunk(getDecadeYears(focused), 4)
            .map(this.renderRow)
          }
        </CalendarView.Body>
      </CalendarView>
    )
  }

  renderRow = (row, rowIdx) => {
    let {
        focused
      , activeId
      , disabled
      , onChange
      , yearFormat
      , value
      , today
      , culture
      , min
      , max } = this.props

    return (
      <CalendarView.Row key={rowIdx}>
        {row.map((date, colIdx) => {
          let label = dateLocalizer.format(
              date
            , dateLocalizer.getFormat('year', yearFormat)
            , culture
          )

          return (
            <CalendarView.Cell
              key={colIdx}
              unit="year"
              activeId={activeId}
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
}

function getDecadeYears(_date){
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    , date = dates.add(dates.startOf(_date, 'decade'), -2, 'year')

  return days.map(() => date = dates.add(date, 1, 'year'))
}

export default DecadeView;
