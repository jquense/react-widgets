import React from 'react'

import PropTypes from 'prop-types'

import CalendarView from './CalendarView'
import dates from './util/dates'
import { chunk } from './util/_'
import * as Props from './util/Props'

class YearView extends React.Component {
  static propTypes = {
    activeId: PropTypes.string,
    today: PropTypes.instanceOf(Date),
    value: PropTypes.instanceOf(Date),
    focused: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,

    localizer: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
  }

  renderRow = (row, rowIdx) => {
    let {
      focused,
      activeId,
      disabled,
      onChange,
      value,
      today,
      min,
      localizer,
      max,
    } = this.props

    return (
      <CalendarView.Row key={rowIdx}>
        {row.map((date, colIdx) => {
          let label = localizer.formatDate(date, 'header')

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
              {localizer.formatDate(date, 'month')}
            </CalendarView.Cell>
          )
        })}
      </CalendarView.Row>
    )
  }

  render() {
    let { focused, activeId } = this.props,
      months = dates.monthsInYear(dates.year(focused))

    return (
      <CalendarView {...Props.omitOwn(this)} activeId={activeId}>
        <CalendarView.Body>
          {chunk(months, 4).map(this.renderRow)}
        </CalendarView.Body>
      </CalendarView>
    )
  }
}

export default YearView
