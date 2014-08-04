var React = require('react/addons')
  , Week  = require('./week.jsx')
  , cx    = React.addons.classSet
  , dates = require('../util/dates')
  , chunk = require('../util/chunk')
  , directions = require('../util/constants').directions
  , _ = require('lodash')


module.exports = React.createClass({

  mixins: [
    require('../mixins/DateFocusMixin')('year', 'month')
  ],

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
          ? (<td >
              <btn onClick={_.partial(this.props.onChange, date)}
                className={cx({ 'rw-state-focus' : dates.eq(date, this.state.focusedDate,  'month')})}>
                { dates.format(date, dates.formats.MONTH_NAME_ABRV) }
              </btn>
            </td>)
          : <td className='rw-empty-cell'>&nbsp;</td>
      })}
    </tr>)
  },

  _onClick: function(date, idx){
    console.log(date, idx)
  },

  move: function(date, direction){

    if ( direction === directions.LEFT)
      date = dates.subtract(date, 1, 'month')

    else if ( direction === directions.RIGHT)
      date = dates.add(date, 1, 'month')

    else if ( direction === directions.UP)
      date = dates.subtract(date, 4, 'month')

    else if ( direction === directions.DOWN)
      date = dates.add(date, 4, 'month')

    return date
  }

});


var btn = require('../common/btn.jsx')