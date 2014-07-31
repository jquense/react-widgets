var React = require('react/addons')
  , Week  = require('./week.jsx')
  , cx    = React.addons.classSet
  , dates = require('../util/dates')
  , chunk = require('../util/chunk')
  , _ = require('lodash')


module.exports = React.createClass({

  propTypes: {
    value:        React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),
    onChange:     React.PropTypes.func.isRequired
  },

  render: function(){
    var months = dates.monthsInYear(dates.year(this.props.value))
      , rows = chunk(months, 4);

    return (
      <table tabIndex='0' role='grid' className='rw-calendar-grid rw-nav-view'>
        <tbody onKeyUp={this._keyUp}>
          { _.map(rows, this._row)}
        </tbody>
      </table>
    )
  },

  _row: function(row){
    return (
      <tr>
      {_.map(row, date => {
        return dates.inRange(date, this.props.min, this.props.max, 'month') 
          ? <td><btn onClick={_.partial(this.props.onChange, date)}>{ dates.format(date, dates.formats.MONTH_NAME_ABRV) }</btn></td>
          : <td className='rw-empty-cell'>&nbsp;</td>
      })}
    </tr>)
  },

  _onClick: function(date, idx){
    console.log(date, idx)
  },


});


var btn = require('../common/btn.jsx')