var React = require('react/addons')
  , Week  = require('./week.jsx')
  , cx    = React.addons.classSet
  , dates = require('../util/dates')
  , chunk = require('../util/chunk')
  , _ = require('lodash')


module.exports = React.createClass({

  propTypes: {
    culture:      React.PropTypes.array,
    value:        React.PropTypes.instanceOf(Date),
    selected:     React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),

    format:       React.PropTypes.string,
    onChange:     React.PropTypes.func.isRequired
  },

  render: function(){
    return (
      <table className='rw-calendar-grid'>
        <thead>
          <tr>{ this._headers() }</tr>
        </thead>
        <tbody tabIndex='-1' onKeyUp={this._keyUp}>
          { this._body() }
        </tbody>
      </table>
    )
  },


  _body: function(){
    var month = dates.visibleDays(this.props.value)
      , rows  = chunk(month, 7 );

    return _.map(rows, week => (
      <Week 
        days={week} 
        selected={this.props.selected}
        month={dates.month(this.props.value)}
        year ={dates.year(this.props.value)}
        min={this.props.min}
        max={this.props.max}
        onClick={this.props.onChange}/>))
  },


  _headers: function(format){
    var days = dates.shortDaysOfWeek(format);

    return _.map(days, function(day){
      return (<th>{day}</th>)
    })
  }

});
