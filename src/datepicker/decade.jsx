var React = require('react/addons')
  , cx    = React.addons.classSet
  , dates = require('../util/dates')
  , chunk = require('../util/chunk')
  , directions = require('../util/constants').directions
  , _ = require('lodash')


module.exports = React.createClass({

  displayName: 'DecadeView',

  mixins: [
    require('../mixins/DateFocusMixin')('decade', 'year')
  ],

  propTypes: {
    value:        React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),
    onChange:     React.PropTypes.func.isRequired
  },

  render: function(){
    var years = getDecadeYears(this.props.value)
      , rows  = chunk(years, 4);

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
        return !dates.inRange(date, this.props.min, this.props.max, 'year') 
          ? <td className='rw-empty-cell'>&nbsp;</td>
          : (<td>
              <btn onClick={_.partial(this.props.onChange, date)}
                className={cx({ 
                  'rw-off-range':   !inDecade(date, this.props.value),
                  'rw-state-focus': dates.eq(date,  this.state.focusedDate,  'year')
                })}>
                { dates.format(date, dates.formats.YEAR) }
              </btn>
            </td>)
      })}
    </tr>)
  },

  _onClick: function(date, idx){
    console.log(date, idx)
  },

  move: function(date, direction){

    if ( direction === directions.LEFT)
      date = dates.subtract(date, 1, 'year')

    else if ( direction === directions.RIGHT)
      date = dates.add(date, 1, 'year')

    else if ( direction === directions.UP)
      date = dates.subtract(date, 4, 'year')

    else if ( direction === directions.DOWN)
      date = dates.add(date, 4, 'year')

    return date
  }

});

function inDecade(date, start){
  return dates.gte(date, dates.startOf(start, 'decade'), 'year') 
      && dates.lte(date, dates.endOf(start,'decade'),  'year')
}

function getDecadeYears(date){
  var date = dates.add(dates.startOf(date, 'decade'), -2, 'year')

  return _.map(_.range(12), function(i){
    return date = dates.add(date, 1, 'year')
  })
}

var btn = require('../common/btn.jsx')