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
    onChange:       React.PropTypes.func.isRequired
  },

  getDefaultProps: function(){
    return {
      step:   30,
      format: 't'
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
        onSelect={this.props.onChange}/>
    )

  },

  _selectedIndex: function(times, date){
    var roundTo = 1000 * 60 * this.props.step;
    
    if( !date) return 0
    date = new Date(Math.floor(date.getTime() / roundTo) * roundTo)

    return _.findIndex(times, { label: dates.format(date, this.props.format) } )
  },

  _data: function(){
      var times = []
        , start = dates.eq(this.props.value, this.props.min, 'day') ? this.props.min : dates.today
        , end   = dates.eq(this.props.value, this.props.max, 'day') ? this.props.max : dates.tomorrow;

    while( dates.lt(start, end, 'day') ) {
      times.push({ date: start, label: dates.format(start, this.props.format) })
      start = dates.add(start, this.props.step || 30, 'minutes')
    }
    return times
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
      this.props.onChange(this._data()[this.state.focusedIndex])

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
          this.findIndex(word, self.state.focusedIndex))
      })
    }
  }

});


var btn = require('../common/btn.jsx')