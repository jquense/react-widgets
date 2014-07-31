var React = require('react/addons')
  , cx    = React.addons.classSet
  , dates = require('../util/dates')
  , chunk = require('../util/chunk')
  , _ = require('lodash')


module.exports = React.createClass({

  propTypes: {
    value:        React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),
    onCHange:     React.PropTypes.func.isRequired
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
          : (<td className={cx({ 'rw-off-range': !inDecade(date, this.props.value) })}>
              <btn onClick={_.partial(this.props.onChange, date)}>
                { dates.format(date, dates.formats.YEAR) }
              </btn>
            </td>)
      })}
    </tr>)
  },

  _onClick: function(date, idx){
    console.log(date, idx)
  },


});

function inDecade(date, start){
  return dates.gte(date, dates.firstOfDecade(start), 'year') 
      && dates.lte(date, dates.lastOfDecade(start),  'year')
}

function getDecadeYears(date){
  var date = dates.add(dates.firstOfDecade(date), -2, 'year')

  return _.map(_.range(12), function(i){
    return date = dates.add(date, 1, 'year')
  })
}

var btn = require('../common/btn.jsx')