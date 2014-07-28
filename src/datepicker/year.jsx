var React = require('react')
  , Week  = require('./week.jsx')
  , cx = require('react/lib/cx')
  , dates = require('../util/dates')
  , chunk = require('../util/chunk')
  , globalize = require('globalize')
  , _ = require('lodash')


module.exports = React.createClass({

  propTypes: {
    culture:      React.PropTypes.array,
    year:         React.PropTypes.number,
    selected:     React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),

    format:       React.PropTypes.string,
  },

  render: function(){
    var months = dates.monthsInYear(this.props.year)
      , rows = chunk(months, 4);

    return (
      <table tabIndex='0' role='grid'>
        <tbody onKeyUp={this._keyUp}>
          { _.map(rows, this._row)}
        </tbody>
      </table>
    )
  },

  _row: function(dates){
    return (
      <tr>
      {_.map(dates, function(date){
        return <td>{ globalize.format(date, 'MMM') }</td>
      })}
    </tr>)
  },

  _onClick: function(date, idx){
    console.log(date, idx)
  },


});


