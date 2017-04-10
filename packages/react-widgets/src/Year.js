import React from 'react';

import PropTypes from 'prop-types';

import CalendarView from './CalendarView'
import dates from './util/dates';
import { date as dateLocalizer } from './util/localizers';
import { chunk } from './util/_';
import * as Props from './util/Props';
import * as CustomPropTypes from './util/PropTypes';

let format = props => dateLocalizer.getFormat('month', props.monthFormat)

class YearView extends React.Component {

  static propTypes = {
    activeId: PropTypes.string,
    culture:      PropTypes.string,
    today:        PropTypes.instanceOf(Date),
    value:        PropTypes.instanceOf(Date),
    focused:      PropTypes.instanceOf(Date),
    min:          PropTypes.instanceOf(Date),
    max:          PropTypes.instanceOf(Date),
    onChange:     PropTypes.func.isRequired,

    monthFormat:  CustomPropTypes.dateFormat,
    disabled: PropTypes.bool,
  };

  render() {
    let { focused, activeId } = this.props
      , months = dates.monthsInYear(dates.year(focused))

    return (
      <CalendarView
        {...Props.omitOwn(this)}
        activeId={activeId}
      >
        <CalendarView.Body>
          {chunk(months, 4).map(this.renderRow)}
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
      , value
      , today
      , culture
      , min
      , max } = this.props

    let labelFormat = dateLocalizer.getFormat('header');

    return (
      <CalendarView.Row key={rowIdx}>
        {row.map((date, colIdx) => {
          var label = dateLocalizer.format(date, labelFormat, culture);

          return (
            <CalendarView.Cell
              key={colIdx}
              activeId={activeId}
              label={label}
              date={date}
              now={today}
              min={min}
              max={max}
              unit="month"
              onChange={onChange}
              focused={focused}
              selected={value}
              disabled={disabled}
            >
              {dateLocalizer.format(date, format(this.props), culture)}
            </CalendarView.Cell>
          )
        })}
      </CalendarView.Row>
    )
  }
}

export default YearView;
