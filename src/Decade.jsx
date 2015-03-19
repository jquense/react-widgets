'use strict';
var React = require('react')
  , _ = require('./util/_')
  , cx    = require('classnames')
  , dates = require('./util/dates')
  , directions = require('./util/constants').directions
  , CustomPropTypes = require('./util/propTypes')
  , Btn = require('./WidgetButton'); 

var opposite = {
  LEFT: directions.RIGHT,
  RIGHT: directions.LEFT
};


module.exports = React.createClass({

  displayName: 'DecadeView',

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/PureRenderMixin'),
    require('./mixins/RtlChildContextMixin'),
    require('./mixins/DateFocusMixin')('decade', 'year')
  ],

  propTypes: {
    culture:      React.PropTypes.string,
    
    value:        React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),
    onChange:     React.PropTypes.func.isRequired,

    yearFormat:   CustomPropTypes.localeFormat.isRequired

  },

  render: function(){
    var props = _.omit(this.props, ['max', 'min', 'value', 'onChange'])
      , years = getDecadeYears(this.props.value)
      , rows  = _.chunk(years, 4)

    return (
      <table {...props} 
        tabIndex={this.props.disabled ? '-1' : "0"}
        role='grid'
        className='rw-calendar-grid rw-nav-view'
        aria-activedescendant={this._id('_selected_item')}
        onKeyUp={this._keyUp}>

        <tbody>
          {rows.map(this._row)}
        </tbody>
      </table>
    )
  },

  _row: function(row, i){
    var id = this._id('_selected_item')

    return (
      <tr key={'row_' + i} role='row'>
      { row.map( (date, i) => {
        var focused     = dates.eq(date, this.state.focusedDate,  'year')
          , selected    = dates.eq(date, this.props.value,  'year')
          , currentYear = dates.eq(date, this.props.today, 'year');

        return !dates.inRange(date, this.props.min, this.props.max, 'year')
          ? <td key={i} role='gridcell' className='rw-empty-cell'>&nbsp;</td>
          : (<td key={i} role='gridcell'>
              <Btn onClick={this.props.onChange.bind(null, date)} tabIndex='-1'
                id={ focused ? id : undefined }
                aria-pressed={selected}
                aria-disabled={this.props.disabled}
                disabled={this.props.disabled || undefined}
                className={cx({
                  'rw-off-range':      !inDecade(date, this.props.value),
                  'rw-state-focus':    focused,
                  'rw-state-selected': selected,
                  'rw-now':            currentYear
                })}>
                { dates.format(date, this.props.yearFormat, this.props.culture) }
              </Btn>
            </td>)
      })}
    </tr>)
  },

  move: function(date, direction){
    var min = this.props.min
      , max = this.props.max;

    if ( this.isRtl() && opposite[direction])
      direction =  opposite[direction]

    if ( direction === directions.LEFT)
      date = nextDate(date, -1, 'year', min, max)

    else if ( direction === directions.RIGHT)
      date = nextDate(date, 1, 'year', min, max)

    else if ( direction === directions.UP)
      date = nextDate(date, -4, 'year', min, max)

    else if ( direction === directions.DOWN)
      date = nextDate(date, 4, 'year', min, max)

    return date
  }

});

function inDecade(date, start){
  return dates.gte(date, dates.startOf(start, 'decade'), 'year')
      && dates.lte(date, dates.endOf(start,'decade'),  'year')
}

function getDecadeYears(_date){
  var days = [1,2,3,4,5,6,7,8,9,10,11,12]
    , date = dates.add(dates.startOf(_date, 'decade'), -2, 'year')

  return days.map( 
    i => date = dates.add(date, 1, 'year'))
}

function nextDate(date, val, unit, min, max){
  var newDate = dates.add(date, val, unit)
  return dates.inRange(newDate, min, max, 'year') ? newDate : date
}
