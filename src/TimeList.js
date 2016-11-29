import React from 'react';
import { timeoutManager } from 'react-component-managers';

import dates from './util/dates';
import List from './List';
import { date as dateLocalizer } from './util/localizers';
import * as CustomPropTypes from './util/PropTypes';
import * as Props from './util/Props';

var format = props => dateLocalizer.getFormat('time', props.format)

class TimeList extends React.Component {

  static propTypes = {
    value: React.PropTypes.instanceOf(Date),
    step: React.PropTypes.number,
    min: React.PropTypes.instanceOf(Date),
    max: React.PropTypes.instanceOf(Date),
    currentDate: React.PropTypes.instanceOf(Date),

    itemComponent: CustomPropTypes.elementType,
    format: CustomPropTypes.dateFormat,
    onSelect: React.PropTypes.func,
    preserveDate: React.PropTypes.bool,
    culture: React.PropTypes.string,
    delay: React.PropTypes.number
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

    this.timeouts = timeoutManager(this)

    let { value, currentDate } = this.props;
    let data = this.getDates()
    let focusedItem = this.getClosestDate(data, value || currentDate)

    this.state = {
      focusedItem: focusedItem || data[0],
      dates: data,
    }
  }

  componentWillReceiveProps(nextProps) {
    let data = this.getDates(nextProps)
    let focusedItem = this.getClosestDate(
      data,
      nextProps.value || nextProps.currentDate
    )

    let valChanged  = !dates.eq(nextProps.value, this.props.value, 'minutes')
    let minChanged  = !dates.eq(nextProps.min, this.props.min, 'minutes')
    let maxChanged  = !dates.eq(nextProps.max, this.props.max, 'minutes')

    let localeChanged = this.props.format !== nextProps.format
                     || this.props.culture !== nextProps.culture;

    if (valChanged || minChanged || maxChanged || localeChanged) {
      this.setState({
        focusedItem: focusedItem || data[0],
        dates: data
      })
    }
  }

  handleKeyDown = (e) => {
    var key = e.key
      , focusedItem  = this.state.focusedItem
      , list = this.refs.list;

    if (key === 'End') {
      e.preventDefault()
      this.setState({ focusedItem: list.last() })
    }
    else if ( key === 'Home' ) {
      e.preventDefault()
      this.setState({ focusedItem: list.first() })
    }
    else if ( key === 'Enter' )
      this.props.onSelect(focusedItem)

    else if ( key === 'ArrowDown' ) {
      e.preventDefault()
      this.setState({ focusedItem: list.next(focusedItem) })
    }
    else if ( key === 'ArrowUp' ) {
      e.preventDefault()
      this.setState({ focusedItem: list.prev(focusedItem) })
    }
  }

  handleKeyPress = (e) => {
    e.preventDefault();

    this.search(String.fromCharCode(e.which), item => {
      this.isMounted() &&
        this.setState({ focusedItem: item })
    })
  }

  render() {
    let { value, onSelect, itemComponent } = this.props;

    var times = this.state.dates
      , date  = this.getClosestDate(times, value);

    return (
      <List
        {...Props.omitOwn(this)}
        ref="list"
        data={times}
        onSelect={onSelect}
        textAccessor={item => item.label}
        valueAccessor={item => item.date}
        selectedItem={date}
        focusedItem={this.state.focusedItem}
        itemComponent={itemComponent}
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
      var list = this.refs.list
        , item = list.next(this.state.focusedItem, word);

      this._searchTerm = ''
      if (item) cb(item)

    }, this.props.delay)
  }
}

export default TimeList
