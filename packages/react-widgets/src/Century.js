import React from 'react'

import PropTypes from 'prop-types'

import CalendarView from './CalendarView'
import dates from './util/dates'
import { chunk } from './util/_'
import * as Props from './util/Props'

class CenturyView extends React.Component {
  static propTypes = {
    activeId: PropTypes.string,
    today: PropTypes.instanceOf(Date),
    value: PropTypes.instanceOf(Date),
    focusedItem: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,
    localizer: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
  }

  renderRow = (row, rowIdx) => {
    let {
      focusedItem,
      activeId,
      disabled,
      onChange,
      value,
      today,
      localizer,
      min,
      max,
    } = this.props

    return (
      <CalendarView.Row key={rowIdx}>
        {row.map((date, colIdx) => {
          let label = localizer.formatDate(
            dates.startOf(date, 'decade'),
            'decade'
          )

          return (
            <CalendarView.Cell
              key={colIdx}
              unit="decade"
              activeId={activeId}
              label={label}
              date={date}
              now={today}
              min={min}
              max={max}
              onChange={onChange}
              focusedItem={focusedItem}
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

  render() {
    let { focusedItem, activeId, onChange } = this.props

    return (
      <CalendarView
        {...Props.omitOwn(this)}
        focusedItem={focusedItem}
        onChange={onChange}
        activeId={activeId}
      >
        <CalendarView.Body>
          {chunk(getCenturyDecades(focusedItem), 4).map(this.renderRow)}
        </CalendarView.Body>
      </CalendarView>
    )
  }
}

function getCenturyDecades(_date) {
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    date = dates.add(dates.startOf(_date, 'century'), -20, 'year')

  return days.map(() => (date = dates.add(date, 10, 'year')))
}

export default CenturyView
