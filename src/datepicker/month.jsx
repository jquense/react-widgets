var React = require('react/addons')
  , Week  = require('./week.jsx')
  , cx    = React.addons.classSet
  , dates = require('../util/dates')
  , chunk = require('../util/chunk')
  , directions = require('../util/constants').directions
  , _ = require('lodash')

var LEFT = 0, RIGHT = 1, UP = 2, DOWN = 3;

module.exports = React.createClass({

  mixins: [
    require('../mixins/DateFocusMixin')('month', 'day')
  ],

  propTypes: {
    culture:          React.PropTypes.array,
    value:            React.PropTypes.instanceOf(Date),
    selectedDate:     React.PropTypes.instanceOf(Date),
    min:              React.PropTypes.instanceOf(Date),
    max:              React.PropTypes.instanceOf(Date),

    format:           React.PropTypes.string,

    onChange:         React.PropTypes.func.isRequired, //value is chosen
    onMoveLeft:       React.PropTypes.func,
    onMoveRight:      React.PropTypes.func
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
      , focused = this.state.focusedDate
      , rows  = chunk(month, 7 );

    return _.map(rows, week => (
      <Week 
        days={week} 
        selectedDate={this.props.selectedDate}
        focusedDate={focused}
        month={dates.month(this.props.value)}
        year ={dates.year(this.props.value)}
        min={this.props.min}
        max={this.props.max}
        onKeyUp={this._keyUp}
        onClick={this.props.onChange}/>))
  },


  _headers: function(format){
    var days = dates.shortDaysOfWeek(format);

    return _.map(days, function(day){
      return (<th>{day}</th>)
    })
  },

  move: function(date, direction){

    if ( direction === directions.LEFT)
      date = dates.subtract(date, 1, 'day')

    else if ( direction === directions.RIGHT)
      date = dates.add(date, 1, 'day')

    else if ( direction === directions.UP)
      date = dates.subtract(date, 1, 'week')

    else if ( direction === directions.DOWN)
      date = dates.add(date, 1, 'week')

    return date
  }


});
