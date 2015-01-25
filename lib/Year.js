'use strict';
var React      = require('react')
  , cx         = require('./util/cx')
  , dates      = require('./util/dates')
  , directions = require('./util/constants').directions
  , Btn        = require('./WidgetButton')
  , _          = require('./util/_')

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
    onChange:     React.PropTypes.func.isRequired
  },


  render: function(){
    var props =  _.omit(this.props, ['max', 'min', 'value', 'onChange'])
      , months = dates.monthsInYear(dates.year(this.props.value))
      , rows = _.chunk(months, 4);

    return (
      React.createElement("table", React.__spread({},   props , 
        {tabIndex: this.props.disabled ? '-1' : "0", 
        ref: "table", 
        role: "grid", 
        className: "rw-calendar-grid rw-nav-view", 
        'aria-activedescendant': this._id('_selected_item'), 
        onKeyUp: this._keyUp}), 
        React.createElement("tbody", null, 
           rows.map(this._row)
        )
      )
    )
  },

  _row: function(row, i){
    var id = this._id('_selected_item');
    
    return (
      React.createElement("tr", {key: i}, 
       row.map( function(date, i)  {
        var focused  = dates.eq(date, this.state.focusedDate,  'month')
          , selected = dates.eq(date, this.props.value,  'month');

        return dates.inRange(date, this.props.min, this.props.max, 'month')
          ? (React.createElement("td", {key: i}, 
              React.createElement(Btn, {onClick: this.props.onChange.bind(null, date), tabIndex: "-1", 
                id: focused ? id : undefined, 
                'aria-selected': selected, 
                'aria-disabled': this.props.disabled, 
                disabled: this.props.disabled, 
                className: cx({
                  'rw-state-focus':    focused,
                  'rw-state-selected': selected
                })}, 
                 dates.format(date, dates.formats.MONTH_NAME_ABRV, this.props.culture) 
              )
            ))
          : React.createElement("td", {key: i, className: "rw-empty-cell"}, " ")
      }.bind(this))
    ))
  },

  focus: function(){
    this.refs.table.getDOMNode().focus();
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
