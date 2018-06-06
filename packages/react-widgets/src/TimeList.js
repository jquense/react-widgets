import React from 'react'
import { polyfill as polyfillLifecycles } from 'react-lifecycles-compat'
import PropTypes from 'prop-types'

import List from './List'
import dates from './util/dates'

import reduceToListState from './util/reduceToListState'
import { date as dateLocalizer } from './util/localizers'
import * as CustomPropTypes from './util/PropTypes'

const format = props => dateLocalizer.getFormat('time', props.format)

const accessors = {
  text: item => item.label,
  value: item => item.date,
}

const find = (arr, fn) => {
  for (let i = 0; i < arr.length; i++) if (fn(arr[i])) return arr[i]
  return null
}

function getBounds({ min, max, currentDate, value, preserveDate }) {
  //compare just the time regradless of whether they fall on the same day
  if (!preserveDate) {
    let start = dates.startOf(
      dates.merge(new Date(), min, currentDate),
      'minutes'
    )
    let end = dates.startOf(
      dates.merge(new Date(), max, currentDate),
      'minutes'
    )

    if (dates.lte(end, start) && dates.gt(max, min, 'day'))
      end = dates.tomorrow()

    return {
      min: start,
      max: end,
    }
  }

  let start = dates.today()
  let end = dates.tomorrow()
  value = value || currentDate || start
  //date parts are equal
  return {
    min: dates.eq(value, min, 'day')
      ? dates.merge(start, min, currentDate)
      : start,
    max: dates.eq(value, max, 'day')
      ? dates.merge(start, max, currentDate)
      : end,
  }
}

function getDates({ step, culture, ...props }) {
  let times = []
  let { min, max } = getBounds(props)
  let startDay = dates.date(min)

  while (dates.date(min) === startDay && dates.lte(min, max)) {
    times.push({
      date: min,
      label: dateLocalizer.format(min, format(props), culture),
    })
    min = dates.add(min, step || 30, 'minutes')
  }
  return times
}

@polyfillLifecycles
class TimeList extends React.Component {
  static defaultProps = {
    step: 30,
    currentDate: new Date(),
    min: new Date(1900, 0, 1),
    max: new Date(2099, 11, 31),
    preserveDate: true,
  }

  static propTypes = {
    value: PropTypes.instanceOf(Date),
    step: PropTypes.number,
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    currentDate: PropTypes.instanceOf(Date),

    itemComponent: CustomPropTypes.elementType,
    listProps: PropTypes.object,

    format: CustomPropTypes.dateFormat,
    onSelect: PropTypes.func,
    preserveDate: PropTypes.bool,
    culture: PropTypes.string,
  }

  state = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    let { value, currentDate, step } = nextProps
    let data = getDates(nextProps)
    let currentValue = value || currentDate
    let valueChanged =
      !prevState.lastValue ||
      !dates.eq(currentValue, prevState.lastValue, 'minutes')

    const list = reduceToListState(data, prevState.list, {
      nextProps,
    })

    let selectedItem = find(data, t =>
      dates.eq(t.date, currentValue, 'minutes')
    )
    let closestDate = find(
      data,
      t => Math.abs(dates.diff(t.date, currentValue, 'minutes')) < step
    )

    return {
      data,
      list,
      lastValue: currentValue,
      selectedItem: list.nextEnabled(selectedItem),
      focusedItem:
        valueChanged || !prevState.focusedItem
          ? list.nextEnabled(selectedItem || closestDate || data[0])
          : find(data, t =>
              dates.eq(t.date, prevState.focusedItem.date, 'minutes')
            ),
    }
  }

  componentWillUnmount() {
    this.unmounted = true
  }

  handleKeyDown = e => {
    let { key } = e
    let { focusedItem, list } = this.state

    if (key === 'End') {
      e.preventDefault()
      this.setState({ focusedItem: list.last() })
    } else if (key === 'Home') {
      e.preventDefault()
      this.setState({ focusedItem: list.first() })
    } else if (key === 'Enter') {
      this.props.onSelect(focusedItem)
    } else if (key === 'ArrowDown') {
      e.preventDefault()
      this.setState({ focusedItem: list.next(focusedItem) })
    } else if (key === 'ArrowUp') {
      e.preventDefault()
      this.setState({ focusedItem: list.prev(focusedItem) })
    }
  }

  render() {
    let { listProps, ...props } = this.props
    let { data, list, focusedItem, selectedItem } = this.state

    delete props.currentDate
    delete props.min
    delete props.max
    delete props.step
    delete props.format
    delete props.culture
    delete props.preserveDate
    delete props.value

    return (
      <List
        {...props}
        {...listProps}
        data={data}
        dataState={list.dataState}
        isDisabled={list.isDisabled}
        textAccessor={accessors.text}
        valueAccessor={accessors.value}
        selectedItem={selectedItem}
        focusedItem={focusedItem}
      />
    )
  }
}

export default TimeList
