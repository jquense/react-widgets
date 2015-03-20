'use strict';
var React      = require('react')
  , cx         = require('classnames')
  , dates      = require('./util/dates')
  , directions = require('./util/constants').directions
  , Btn        = require('./WidgetButton')
  , _          = require('./util/_')
  , compat     = require('./util/compat')
  , CustomPropTypes = require('./util/propTypes');

var opposite = {
  LEFT: directions.RIGHT,
  RIGHT: directions.LEFT
};

module.exports = React.createClass({

  displayName: 'YearView',

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/RtlChildContextMixin'),
    require('./mixins/DateFocusMixin')('year', 'month')
  ],

  propTypes: {
    culture:      React.PropTypes.string,
    value:        React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),
    onChange:     React.PropTypes.func.isRequired,

    monthFormat:  CustomPropTypes.localeFormat.isRequired
  },


  render: function(){
    var props =  _.omit(this.props, ['max', 'min', 'value', 'onChange'])
      , months = dates.monthsInYear(dates.year(this.props.value))
      , rows = _.chunk(months, 4);

    return (
      <table { ...props }
        tabIndex={this.props.disabled ? '-1' : "0"}
        ref='table'
        role='grid'
        className='rw-calendar-grid rw-nav-view'
        aria-activedescendant={this._id('_selected_item')}
        onKeyUp={this._keyUp}>
        <tbody >
          { rows.map(this._row)}
        </tbody>
      </table>
    )
  },

  _row: function(row, i){
    var id = this._id('_selected_item');
    
    return (
      <tr key={i} role='row'>
      { row.map( (date, i) => {
        var focused  = dates.eq(date, this.state.focusedDate,  'month')
          , selected = dates.eq(date, this.props.value,  'month')
          , currentMonth = dates.eq(date, this.props.today, 'month');

        return dates.inRange(date, this.props.min, this.props.max, 'month')
          ? (<td key={i} role='gridcell'>
              <Btn onClick={this.props.onChange.bind(null, date)} tabIndex='-1'
                id={focused ? id : undefined}
                aria-pressed={selected}
                aria-disabled={this.props.disabled || undefined}
                disabled={this.props.disabled}
                className={cx({
                  'rw-state-focus':    focused,
                  'rw-state-selected': selected,
                  'rw-now':            currentMonth
                })}>
                { dates.format(date, this.props.monthFormat, this.props.culture) }
              </Btn>
            </td>)
          : <td key={i} className='rw-empty-cell' role='gridcell'>&nbsp;</td>
      })}
    </tr>)
  },

  focus: function(){
    compat.findDOMNode(this.refs.table).focus();
  },

  move: function(date, direction){
    var min = this.props.min
      , max = this.props.max;

    if ( this.isRtl() && opposite[direction])
      direction =  opposite[direction]

    if ( direction === directions.LEFT)
      date = nextDate(date, -1, 'month', min, max)

    else if ( direction === directions.RIGHT)
      date = nextDate(date, 1, 'month', min, max)

    else if ( direction === directions.UP)
      date = nextDate(date, -4, 'month', min, max)

    else if ( direction === directions.DOWN)
      date = nextDate(date, 4, 'month', min, max)

    return date
  }

});

function nextDate(date, val, unit, min, max){
  var newDate = dates.add(date, val, unit)
  return dates.inRange(newDate, min, max, 'month') ? newDate : date
}
