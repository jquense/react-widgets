var React = require('react/addons')
  , cx    = React.addons.classSet
  , dates = require('../util/dates')
  , chunk = require('../util/chunk')
  , directions = require('../util/constants').directions
  , transferProps = require('../util/transferProps')
  , _ = require('lodash')

var opposite = {
  LEFT: directions.RIGHT,
  RIGHT: directions.LEFT
};

module.exports = React.createClass({

  displayName: 'YearView',
  
  mixins: [
    require('../mixins/RtlChildContextMixin'),
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

    return transferProps(
      _.omit(this.props, 'max', 'min', 'value', 'onChange'),
      <table tabIndex='0' 
        ref='table'
        role='grid' 
        className='rw-calendar-grid rw-nav-view' 
        aria-labeledby={this.props['aria-labeledby']}
        onKeyUp={this._keyUp}>
        <tbody >
          { _.map(rows, this._row)}
        </tbody>
      </table>
    )
  },

  _row: function(row){
    // if (this.isRtl()) row.reverse()

    return (
      <tr>
      {_.map(row, date => {
        var focused  = dates.eq(date, this.state.focusedDate,  'month')
          , selected = dates.eq(date, this.props.value,  'month')
          , id = this.props.id && this.props.id + '_selected_item';

        return dates.inRange(date, this.props.min, this.props.max, 'month') 
          ? (<td >
              <btn onClick={_.partial(this.props.onChange, date)} tabIndex='-1'
                id={focused ? id : undefined}
                aria-selected={selected}
                className={cx({ 
                  'rw-state-focus':    focused,
                  'rw-state-selected': selected
                })}>
                { dates.format(date, dates.formats.MONTH_NAME_ABRV) }
              </btn>
            </td>)
          : <td className='rw-empty-cell'>&nbsp;</td>
      })}
    </tr>)
  },

  focus: function(){
    this.refs.table.getDOMNode().focus();
  },

  move: function(date, direction){
    if ( this.isRtl() && opposite[direction])
      direction =  opposite[direction]

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