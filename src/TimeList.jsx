
import React from 'react';
import PropTypes from 'prop-types';
import dates from './util/dates';
import List from './List';
import { date as dateLocalizer } from './util/localizers';
import CustomPropTypes from './util/propTypes';
import _ from './util/_';

var format = props => dateLocalizer.getFormat('time', props.format)

export default React.createClass({

  displayName: 'TimeList',

  propTypes: {
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
  },

  mixins: [
    require('./mixins/TimeoutMixin')
  ],

  getDefaultProps(){
    return {
      step: 30,
      onSelect: () => {},
      min: new Date(1900,  0,  1),
      max: new Date(2099, 11, 31),
      preserveDate: true,
      delay: 300,
      ariaActiveDescendantKey: 'timelist'
    }
  },

  getInitialState(){
    var data = this._dates(this.props)
      , focusedItem = this._closestDate(data, this.props.value || this.props.currentDate);

    return {
      focusedItem: focusedItem || data[0],
      dates: data
    }
  },

  componentWillReceiveProps(nextProps) {
    var data = this._dates(nextProps)
      , focusedItem = this._closestDate(data, nextProps.value || this.props.currentDate)
      , valChanged  = !dates.eq(nextProps.value, this.props.value, 'minutes')
      , minChanged  = !dates.eq(nextProps.min, this.props.min, 'minutes')
      , maxChanged  = !dates.eq(nextProps.max, this.props.max, 'minutes')
      , localeChanged = this.props.format !== nextProps.format
                     || this.props.culture !== nextProps.culture;

    if (valChanged || minChanged || maxChanged || localeChanged){
      this.setState({
        focusedItem: focusedItem || data[0],
        dates: data
      })
    }
  },

  render(){
    let { value, onSelect, itemComponent } = this.props;

    var times = this.state.dates
      , date  = this._closestDate(times, value);

    return (
      <List
        {..._.omitOwnProps(this)}
        ref="list"
        data={times}
        textField='label'
        valueField='date'
        selected={date}
        onSelect={onSelect}
        focused={this.state.focusedItem}
        itemComponent={itemComponent}
      />
    )
  },

  _closestDate(times, date) {
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
  },

  _data(){
    return this.state.dates
  },

  _dates(props){
    var times  = [], i = 0
      , values = this._dateValues(props)
      , start  = values.min
      , startDay = dates.date(start);

    while (dates.date(start) === startDay && dates.lte(start, values.max)) {
      i++
      times.push({ date: start, label: dateLocalizer.format(start, format(props), props.culture) })
      start = dates.add(start, props.step || 30, 'minutes')
    }
    return times
  },

  _dateValues(props){
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
  },

  handleKeyDown(e) {
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
  },

  handleKeyPress(e) {
    e.preventDefault();

    this.search(String.fromCharCode(e.which), item => {
      this.isMounted() &&
        this.setState({ focusedItem: item })
    })
  },

  scrollTo() {
    this.refs.list.move
      && this.refs.list.move()
  },

  search(character, cb){
    var word = ((this._searchTerm || '') + character).toLowerCase();

    this._searchTerm = word

    this.setTimeout('search', () => {
      var list = this.refs.list
        , item = list.next(this.state.focusedItem, word);

      this._searchTerm = ''
      if (item) cb(item)

    }, this.props.delay)
  }

});
