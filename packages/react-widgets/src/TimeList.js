import React from 'react';
import PropTypes from 'prop-types';
import { timeoutManager } from 'react-component-managers';

import List from './List';
import dates from './util/dates';
import listDataManager from './util/listDataManager';
import { date as dateLocalizer } from './util/localizers';
import * as CustomPropTypes from './util/PropTypes';
import * as Props from './util/Props';

var format = props => dateLocalizer.getFormat('time', props.format)

class TimeList extends React.Component {

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
    delay: PropTypes.number
  }

  static defaultProps = {
    step: 30,
    onSelect: () => {},
    min: new Date(1900,  0,  1),
    max: new Date(2099, 11, 31),
    preserveDate: true,
    delay: 300,
  }

  constructor(...args) {
    super(...args)

    this.accessors = {
      text: item => item.label,
      value: item => item.date,
    };

    this.timeouts = timeoutManager(this)
    this.list = listDataManager(this, {
      getListDataState: List.getListDataState,
      accessors: this.accessors
    })

    this.state = this.getStateFromProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps))
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  getStateFromProps(props = this.props) {
    let { value, currentDate } = props;
    let data = this.getDates(props)
    let selectedItem = this.getClosestDate(data, value || currentDate)

    this.list.setData(data)

    return {
      dates: data,
      selectedItem: this.list.nextEnabled(selectedItem),
      focusedItem: this.list.nextEnabled(selectedItem || data[0]),
    }
  }

  handleKeyDown = (e) => {
    let key = e.key
    let focusedItem  = this.state.focusedItem
    let list = this.list;

    if (key === 'End') {
      e.preventDefault()
      this.setState({ focusedItem: list.last() })
    }
    else if (key === 'Home') {
      e.preventDefault()
      this.setState({ focusedItem: list.first() })
    }
    else if (key === 'Enter') {
      this.props.onSelect(focusedItem)
    }
    else if (key === 'ArrowDown') {
      e.preventDefault()
      this.setState({ focusedItem: list.next(focusedItem) })
    }
    else if (key === 'ArrowUp') {
      e.preventDefault()
      this.setState({ focusedItem: list.prev(focusedItem) })
    }
  }

  handleKeyPress = (e) => {
    e.preventDefault();

    this.search(String.fromCharCode(e.which), item => {
      !this.unmounted &&
        this.setState({ focusedItem: item })
    })
  }

  render() {
    let { onSelect } = this.props;
    let { selectedItem, focusedItem } = this.state;

    let props = Props.omitOwn(this)
    let listProps = this.list.defaultProps();

    return (
      <List
        ref="list"
        {...props}
        {...listProps}
        onSelect={onSelect}
        textAccessor={this.accessors.text}
        valueAccessor={this.accessors.value}
        selectedItem={selectedItem}
        focusedItem={focusedItem}
      />
    )
  }

  scrollTo = () => {
    this.refs.list.move
      && this.refs.list.move()
  }

  getClosestDate(times, date) {
    var roundTo = 1000 * 60 * this.props.step
      , inst = null
      , label;

    if( !date) return null

    date  = new Date(Math.floor(date.getTime() / roundTo) * roundTo)
    label = dateLocalizer.format(date, format(this.props), this.props.culture)

    times.some( time => {
      if( time.label === label )
        return (inst = time)
    })

    return inst
  }

  getDates(props = this.props) {
    let times  = [];
    let values = this.getBounds(props)
    let start  = values.min
    let startDay = dates.date(start);

    while (dates.date(start) === startDay && dates.lte(start, values.max)) {
      times.push({
        date: start,
        label: dateLocalizer.format(start, format(props), props.culture)
      })
      start = dates.add(start, props.step || 30, 'minutes')
    }
    return times
  }

  getBounds(props) {
    var value = props.value || props.currentDate || dates.today()
      , useDate = props.preserveDate
      , min = props.min
      , max = props.max
      , start, end;

    //compare just the time regradless of whether they fall on the same day
    if(!useDate) {
      start = dates.startOf(dates.merge(new Date(), min, props.currentDate), 'minutes')
      end   = dates.startOf(dates.merge(new Date(), max, props.currentDate), 'minutes')

      if( dates.lte(end, start) && dates.gt(max, min, 'day'))
        end = dates.tomorrow()

      return {
        min: start,
        max: end
      }
    }

    start = dates.today()
    end = dates.tomorrow()
    //date parts are equal
    return {
      min: dates.eq(value, min, 'day') ? dates.merge(start, min, props.currentDate) : start,
      max: dates.eq(value, max, 'day') ? dates.merge(start, max, props.currentDate) : end
    }
  }

  search(character, cb) {
    var word = ((this._searchTerm || '') + character).toLowerCase();

    this._searchTerm = word
    this.timeouts.set('search', () => {
      var item = this.list.next(this.state.focusedItem, word);

      this._searchTerm = ''
      if (item) cb(item)

    }, this.props.delay)
  }
}

export default TimeList
