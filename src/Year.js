import React from 'react';

import CalendarView from './CalendarView'
import dates from './util/dates';
import { date as dateLocalizer } from './util/localizers';
import { chunk } from './util/_';
import * as Props from './util/Props';
import CustomPropTypes from './util/propTypes';

let format = props => dateLocalizer.getFormat('month', props.monthFormat)

class YearView extends React.Component {

  static propTypes = {
    activeId: React.PropTypes.string,
    culture:      React.PropTypes.string,
    today:        React.PropTypes.instanceOf(Date),
    value:        React.PropTypes.instanceOf(Date),
    focused:      React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),
    onChange:     React.PropTypes.func.isRequired,

    monthFormat:  CustomPropTypes.dateFormat,
    disabled: React.PropTypes.bool,
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
