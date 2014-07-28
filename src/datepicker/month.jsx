var React = require('react')
  , Week  = require('./week.jsx')
  , cx = require('react/lib/cx')
  , dates = require('../util/dates')
  , chunk = require('../util/chunk')
  , moment = require('moment')
  , _ = require('lodash')


module.exports = React.createClass({

  propTypes: {
    culture:      React.PropTypes.array,
    date:         dates.PropTypes.moment,
    selected:     dates.PropTypes.moment,
    min:          dates.PropTypes.moment,
    max:          dates.PropTypes.moment,

    format:       React.PropTypes.string,
  },

  render: function(){
    return (
      <table>
        <thead>
          <tr>{ this._headers() }</tr>
        </thead>
        <tbody tabIndex='-1' onKeyUp={this._keyUp}>
          { this._body() }
        </tbody>
      </table>
    )
  },

  _onClick: function(date, idx){
    console.log(date, idx)
  },

  _body: function(){
    var month = dates.visibleDays(this.props.date)
      , rows  = chunk(month, 7 );

    return _.map(rows, week => (
      <Week 
        days={week} 
        selected={this.props.selected}
        month={moment(this.props.date).month()}
        year={moment(this.props.date).year()}
        min={this.props.min}
        max={this.props.max}
        onClick={this._onClick}/>))
  },


  _headers: function(format){
    var days = dates.daysOfWeek(this.props.date, format);

    return _.map(days, function(day){
      return (<th>{day}</th>)
    })
  }

});
