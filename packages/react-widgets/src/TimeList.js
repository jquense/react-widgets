import React from 'react'
import PropTypes from 'prop-types'
import { timeoutManager } from 'react-component-managers'

import List from './List'
import dates from './util/dates'
import listDataManager from './util/listDataManager'
import { date as dateLocalizer } from './util/localizers'
import * as CustomPropTypes from './util/PropTypes'
import * as Props from './util/Props'

var format = props => dateLocalizer.getFormat('time', props.format)

const find = (arr, fn) => {
  for (let i = 0; i < arr.length; i++) if (fn(arr[i])) return arr[i]
  return null
}

class TimeList extends React.Component {
  static defaultProps = {
    step: 30,
    onSelect: () => {},
    currentDate: new Date(),
    min: new Date(1900, 0, 1),
    max: new Date(2099, 11, 31),
    preserveDate: true,
    delay: 300,
  }

  static propTypes = {
    value: PropTypes.instanceOf(Date),
    step: PropTypes.number,
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    currentDate: PropTypes.instanceOf(Date),

    itemComponent: CustomPropTypes.elementType,
    format: CustomPropTypes.dateFormat,
    onSelect: PropTypes.func,
    preserveDate: PropTypes.bool,
    culture: PropTypes.string,
    delay: PropTypes.number,
  }

  constructor(...args) {
    super(...args)

    this.accessors = {
      text: item => item.label,
      value: item => item.date,
    }

    this.timeouts = timeoutManager(this)
    this.list = listDataManager(this, {
      getListDataState: List.getListDataState,
      accessors: this.accessors,
    })

    this.state = this.getStateFromProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps))
  }

  componentWillUnmount() {
    this.unmounted = true
  }

  getBounds(props) {
    var value = props.value || props.currentDate || dates.today(),
      useDate = props.preserveDate,
      min = props.min,
      max = props.max,
      start,
      end

    //compare just the time regradless of whether they fall on the same day
    if (!useDate) {
      start = dates.startOf(
        dates.merge(new Date(), min, props.currentDate),
        'minutes'
      )
      end = dates.startOf(
        dates.merge(new Date(), max, props.currentDate),
        'minutes'
      )

      if (dates.lte(end, start) && dates.gt(max, min, 'day'))
        end = dates.tomorrow()

      return {
        min: start,
        max: end,
      }
    }

    start = dates.today()
    end = dates.tomorrow()
    //date parts are equal
    return {
      min: dates.eq(value, min, 'day')
        ? dates.merge(start, min, props.currentDate)
        : start,
      max: dates.eq(value, max, 'day')
        ? dates.merge(start, max, props.currentDate)
        : end,
    }
  }

  getDates(props = this.props) {
    let times = []
    let values = this.getBounds(props)
    let start = values.min
    let startDay = dates.date(start)

    while (dates.date(start) === startDay && dates.lte(start, values.max)) {
      times.push({
        date: start,
        label: dateLocalizer.format(start, format(props), props.culture),
      })
      start = dates.add(start, props.step || 30, 'minutes')
    }
    return times
  }

  getStateFromProps(props = this.props) {
    let { value, currentDate, step } = props
    let data = this.getDates(props)
    let currentValue = value || currentDate

    let selectedItem = find(data, t =>
      dates.eq(t.date, currentValue, 'minutes')
    )
    let closestDate = find(
      data,
      t => Math.abs(dates.diff(t.date, currentValue, 'minutes')) < step
    )

    this.list.setData(data)

    return {
      dates: data,
      selectedItem: this.list.nextEnabled(selectedItem),
      focusedItem: this.list.nextEnabled(selectedItem || closestDate || data[0]),
    }
  }

  handleKeyDown = e => {
    let key = e.key
    let focusedItem = this.state.focusedItem
    let list = this.list

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

  scrollTo = () => {
    if (this.listRef.move) this.listRef.move()
  }

  attachListRef = ref => (this.listRef = ref)

  render() {
    let { onSelect } = this.props
    let { selectedItem, focusedItem } = this.state

    let props = Props.omitOwn(this)
    let listProps = this.list.defaultProps()

    return (
      <List
        {...props}
        {...listProps}
        onSelect={onSelect}
        textAccessor={this.accessors.text}
        valueAccessor={this.accessors.value}
        selectedItem={selectedItem}
        focusedItem={focusedItem}
        ref={this.attachListRef}
      />
    )
  }
}

export default TimeList
