var React = require('react/addons')
  , cx = React.addons.classSet
  , dates = require('../util/dates')
  , chunk = require('../util/chunk')
  , directions = require('../util/constants').directions
  , _ = require('lodash')


module.exports = React.createClass({

  mixins: [
    require('../mixins/DateFocusMixin')('century', 'decade')
  ],

  propTypes: {
    value:         React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),

    onChange:     React.PropTypes.func.isRequired
  },

  render: function(){
    var years = getCenturyDecades(this.props.value)
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
        return !inRange(date, this.props.min, this.props.max) 
          ? <td className='rw-empty-cell'>&nbsp;</td>
          : (<td>
              <btn onClick={_.partial(this.props.onChange, date)}
                className={cx({ 
                  'rw-off-range':  !inCentury(date, this.props.value),
                  'rw-state-focus': dates.eq(date, this.state.focusedDate, 'decade')
                 })}>
                { label(date) }
              </btn>
            </td>)
      })}
    </tr>)
  },

  move: function(date, direction){

    if ( direction === directions.LEFT)
      date = dates.subtract(date, 1, 'decade')

    else if ( direction === directions.RIGHT)
      date = dates.add(date, 1, 'decade')

    else if ( direction === directions.UP)
      date = dates.subtract(date, 4, 'decade')

    else if ( direction === directions.DOWN)
      date = dates.add(date, 4, 'decade')

    return date
  }

});

function label(date){
  return dates.format(dates.startOf(date, 'decade'),    dates.formats.YEAR) 
    + ' - ' + dates.format(dates.endOf(date, 'decade'), dates.formats.YEAR)
}

function inRange(decade, min, max){
  return dates.gte(decade, dates.startOf(min, 'decade'), 'year') 
      && dates.lte(decade, dates.endOf(max, 'decade'),  'year')
}

function inCentury(date, start){
  return dates.gte(date, dates.startOf(start, 'century'), 'year') 
      && dates.lte(date, dates.endOf(start, 'century'),  'year')
}

function getCenturyDecades(date){
  var date = dates.add(dates.startOf(date, 'century'), -20, 'year')

  return _.map(_.range(12), function(i){
    return date = dates.add(date, 10, 'year')
  })
}

var btn = require('../common/btn.jsx')