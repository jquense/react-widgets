var React = require('react/addons')
  , cx    = React.addons.classSet
  , dates = require('../util/dates')
  , List = require('../common/list.jsx')
  , _ = require('lodash')


var ListItem = React.createClass({

  render: function(){
      return this.transferPropsTo(
        <li>{ dates.format(this.props.item, this.props.format) }</li>
      )
  }
})

module.exports = React.createClass({

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
  render: function(){
    var times = this._times()
      , format = this.props.format
      , listItem = function(props, children){
        return ListItem(_.extend(props, { format: format }), children)
      }

    return (
      <List ref="list"
        data={times} 
        listItem={listItem}
        selectedIndex={ this._selectedIndex(times, this.props.value) }
        onSelect={this._onClick}/>
    )
  },

  _selectedIndex: function(times, date){
    return _.findIndex(times, function(d){
      return dates.eq(date, d, 'hours')
    })
  },

  _times: function(){
      var times = []
        , start = dates.eq(this.props.value, this.props.min, 'day') ? this.props.min : dates.today
        , end   = dates.eq(this.props.value, this.props.max, 'day') ? this.props.max : dates.tomorrow;

    while( dates.lt(start, end, 'day') && times.length < 100 ) {
      times.push(start)
      start = dates.add(start, this.props.step || 30, 'minutes')
    }
    return times
  },

  _onClick: function(date, idx){
    console.log(date, idx)
  },


});


var btn = require('../common/btn.jsx')