var React = require('react')
  , cx    = require('../util/cx')
  , dates = require('../util/dates')
  , directions = require('../util/constants').directions
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , _ = require('../util/_')

var btn = require('../common/btn.jsx')

var opposite = {
  LEFT: directions.RIGHT,
  RIGHT: directions.LEFT
};

module.exports = React.createClass({

  displayName: 'MonthView',

  mixins: [
    require('../mixins/WidgetMixin'),
    require('../mixins/RtlChildContextMixin'),
    require('../mixins/DateFocusMixin')('month', 'day'),
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
    var month = dates.visibleDays(this.props.value)
      , rows  = _.chunk(month, 7 );

    return mergeIntoProps(
      _.omit(this.props, ['max', 'min', 'value', 'onChange']),
      <table
        role='grid'
        tabIndex={this.props.disabled ? '-1' : "0"}
        className='rw-calendar-grid'
        aria-activedescendant={this._id('_selected_item')}
        onKeyUp={this._keyUp}>
        <thead>
          <tr>{ this._headers() }</tr>
        </thead>
        <tbody>
          { rows.map(this._row)}
        </tbody>
      </table>
    )
  },

  _row: function(row, i){
    return (
      <tr key={'week_' + i}>
      { row.map( (day, idx) => {
        var focused  = dates.eq(day, this.state.focusedDate, 'day')
          , selected = dates.eq(day, this.props.selectedDate, 'day')
          , id = this._id('_selected_item');

        return !dates.inRange(day, this.props.min, this.props.max)
            ? <td  key={'day_' + idx} className='rw-empty-cell'>&nbsp;</td>
            : (<td key={'day_' + idx} >
                <btn
                  tabIndex='-1'
                  onClick={this.props.onChange.bind(null, day)}
                  aria-selected={selected}
                  aria-disabled={this.props.disabled}
                  disabled={this.props.disabled}
                  className={cx({
                    'rw-off-range':      dates.month(day) !== dates.month(this.state.focusedDate),
                    'rw-state-focus':    focused,
                    'rw-state-selected': selected,
                  })}
                  id={focused ? id : undefined}>
                  {dates.format(day, 'dd')}
                </btn>
              </td>)
      })}
      </tr>
    )
  },


  _headers: function(format){
    var days = dates.shortDaysOfWeek(format);

    return days.map( (day, i) => 
      <th key={"header_" + i }>{day}</th>)
  },

  move: function(date, direction){
    var min = this.props.min
      , max = this.props.max;

    if ( this.isRtl() && opposite[direction])
      direction =  opposite[direction]

    if ( direction === directions.LEFT)
      date = nextDate(date, -1, 'day', min, max)

    else if ( direction === directions.RIGHT)
      date = nextDate(date, 1, 'day',min, max)

    else if ( direction === directions.UP)
      date = nextDate(date, -1, 'week', min, max)

    else if ( direction === directions.DOWN)
      date = nextDate(date, 1, 'week', min, max)

    return date
  }

});

function nextDate(date, val, unit, min, max){
  var newDate = dates.add(date, val, unit)

  return dates.inRange(newDate, min, max, 'day') ? newDate : date
}
