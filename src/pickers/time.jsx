var React = require('react')
  , cx = require('../util/cx')
  , dates = require('../util/dates')
  , List = require('../common/list.jsx')
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , directions = require('../util/constants').directions
  , _ = require('lodash')


var ListItem = React.createClass({

  render: function(){
      return this.transferPropsTo(
        <li>{ dates.format(this.props.item, this.props.format) }</li>
      )
  }
})

module.exports = React.createClass({

  displayName: 'TimeList',
  
  mixins: [
    require('../mixins/TextSearchMixin'),
    require('../mixins/DataIndexStateMixin')('selectedIndex'), 
    require('../mixins/DataIndexStateMixin')('focusedIndex') 
  ],

  propTypes: {
    value:        React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),
    step:         React.PropTypes.number,
    onChange:     React.PropTypes.func.isRequired
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
      , format = this.props.format
      , idx = this._selectedIndex(times, this.props.value)
      , listItem = function(props, children){
        return ListItem(_.extend(props, { format: format }), children)
      }

    return mergeIntoProps(
      _.omit(this.props, 'value'),
      <List ref="list"
        data={times} 
        textField='label'
        valueField='date'
        selectedIndex={idx}
        focusedIndex={this.state.focusedIndex}
        onSelect={this.props.onChange}/>
    )
  },

  _selectedIndex: function(times, date){
    return _.findIndex(times, function(d){
      return dates.eq(date, d, 'hours')
    })
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