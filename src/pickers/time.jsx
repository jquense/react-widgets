var React = require('react')
  , cx = require('../util/cx')
  , dates = require('../util/dates')
  , List = require('../common/list.jsx')
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , directions = require('../util/constants').directions
  , _ = require('lodash')


module.exports = React.createClass({

  displayName: 'TimeList',

  mixins: [
    require('../mixins/TextSearchMixin'),
    require('../mixins/DataIndexStateMixin')('selectedIndex'),
    require('../mixins/DataIndexStateMixin')('focusedIndex')
  ],

  propTypes: {
    value:          React.PropTypes.instanceOf(Date),
    min:            React.PropTypes.instanceOf(Date),
    max:            React.PropTypes.instanceOf(Date),
    step:           React.PropTypes.number,
    itemComponent:  React.PropTypes.func,
    onSelect:       React.PropTypes.func,
    preserveDate:   React.PropTypes.bool,
  },

  getDefaultProps: function(){
    return {
      step:   30,
      format: 't',
      onSelect: _.noop,
      preserveDate: true,
    }
  },

  getInitialState: function(){
    var idx = this._selectedIndex(this._data(), this.props.value)

    return { focusedIndex: idx === -1 ? 0 : idx}
  },

  render: function(){
    var times = this._data()
      , idx = this._selectedIndex(times, this.props.value);

    return mergeIntoProps(
      _.omit(this.props, 'value'),
      <List ref="list"
        data={times}
        textField='label'
        valueField='date'
        selectedIndex={idx}
        focusedIndex={this.state.focusedIndex}
        listItem={this.props.itemComponent}
        onSelect={this.props.onSelect}/>
    )

  },

  _selectedIndex: function(times, date){
    var roundTo = 1000 * 60 * this.props.step;

    if( !date) return 0
    date = new Date(Math.floor(date.getTime() / roundTo) * roundTo)

    return _.findIndex(times, { label: dates.format(date, this.props.format) } )
  },

  _data: function(){
    var times  = [], i = 0
      , values = this._dateValues()
      , start  = values.min
      , startDay = dates.date(start);

    // debugger;
    while( i < 100 && (dates.date(start) === startDay && dates.lte(start, values.max) ) ) {
      i++
      times.push({ date: start, label: dates.format(start, this.props.format) })
      start = dates.add(start, this.props.step || 30, 'minutes')
    }
    return times
  },

  _dateValues: function(){
    var value = this.props.value || dates.today()
      , useDate = this.props.preserveDate
      , min = this.props.min
      , max = this.props.max
      , start, end;

    //compare just the time regradless of whether they fall on the same day
    if(!useDate) {
      start = dates.startOf(dates.merge(new Date, min), 'minutes')
      end   = dates.startOf(dates.merge(new Date, max), 'minutes')

      if( dates.lte(end, start) && dates.gt(max, min, 'day'))
        end = dates.tomorrow()

      return {
        min: start,
        max: end
      }
    }

    //date parts are equal
    return {
      min: dates.eq(value, min, 'day') ? min : dates.today(),
      max: dates.eq(value, max, 'day') ? min : dates.tomorrow()
    }

  },
  _keyDown: function(e){
    var self = this
      , key = e.key
      , character = String.fromCharCode(e.keyCode);



    if ( key === 'End' )
      this.setFocusedIndex(
        this._data().length - 1)

    else if ( key === 'Home' )
      this.setFocusedIndex(0)

    else if ( key === 'Enter' )
      this.props.onSelect(this._data()[this.state.focusedIndex])

    else if ( key === 'ArrowDown' ) {
      e.preventDefault()
      this.setFocusedIndex(
        this.nextFocusedIndex())
    }
    else if ( key === 'ArrowUp' ) {
      e.preventDefault()
      this.setFocusedIndex(
        this.prevFocusedIndex())
    }
    else {
      e.preventDefault()
      this.search(character, function(word){
        self.setFocusedIndex(
          this.findNextWordIndex(word, self.state.focusedIndex))
      })
    }
  }

});


var btn = require('../common/btn.jsx')