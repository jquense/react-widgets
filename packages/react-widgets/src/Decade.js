import React from 'react';

import PropTypes from 'prop-types';

import CalendarView from './CalendarView';
import dates from './util/dates';
import { date as dateLocalizer } from './util/localizers';
import { chunk }  from './util/_';
import * as Props from './util/Props';
import * as CustomPropTypes from './util/PropTypes';

class DecadeView extends React.Component {
  static propTypes = {
    activeId: PropTypes.string,
    culture:      PropTypes.string,
    today:        PropTypes.instanceOf(Date),
    value:        PropTypes.instanceOf(Date),
    focused:      PropTypes.instanceOf(Date),
    min:          PropTypes.instanceOf(Date),
    max:          PropTypes.instanceOf(Date),
    onChange:     PropTypes.func.isRequired,

    yearFormat:   CustomPropTypes.dateFormat,
    disabled: PropTypes.bool,
  };

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

  render(){
    let { focused, activeId } = this.props;

    return (
      <CalendarView
        {...Props.omitOwn(this)}
        activeId={activeId}
      >
        <CalendarView.Body>
          {chunk(getDecadeYears(focused), 4)
            .map(this.renderRow)
          }
        </CalendarView.Body>
      </CalendarView>
    )
  }
}

function getDecadeYears(_date){
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    , date = dates.add(dates.startOf(_date, 'decade'), -2, 'year')

  return days.map(() => date = dates.add(date, 1, 'year'))
}

export default DecadeView;
