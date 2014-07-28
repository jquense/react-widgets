var React = require('react')
  , Header  = require('./header.jsx')
  , Month = require('./month.jsx')
  , Year = require('./year.jsx')
  , cx = require('react/lib/cx')
  , dates = require('../util/dates')
  , transferProps = require('../util/transferProps')
  , globalize = require('globalize')
  , _ = require('lodash')

var RIGHT = 'right'
  , LEFT  = 'left'
  , MULTIPLIER = {
    'year': 1,
    'decade': 10,
    'century': 100
  },
  VIEW = {
    'month':    Month,
    'year':     Year,
    'decade':   null,
    'century':  null
  }
  NEXT_VIEW = {
    'month':  'year',
    'year':   'decade',
    'decade': 'century'
  };

module.exports = React.createClass({

  propTypes: {
    culture:      React.PropTypes.array,
    date:         React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),

    format:       React.PropTypes.string,
    initialView:  React.PropTypes.oneOf(['month', 'year', 'decade'])
  },

  getInitialState: function(){
    return {
      selectedIndex: 0,
      open:          false,
      view:          this.props.initialView || 'month',
      currentDate:   new Date(this.props.date)
    }
  },

  getDefaultProps: function(){
    return {
      date: new Date,
      min:  new Date(2014,5, 14),
      max:  new Date(2099,11, 31),
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      currentDate: new Date(nextProps.date)
    })
  },

  render: function(){
    var View = VIEW[this.state.view];

    return (
      <div className='rw-calendar rw-widget'>
        <Header 
          label={this._label()}
          onViewChange={this.view}
          onMoveLeft ={_.partial(this.navigate, LEFT)}
          onMoveRight={_.partial(this.navigate, RIGHT)}/>
        <View 
          selected={this.props.date} 
          date={this.state.currentDate}
          min={this.props.min}
          max={this.props.max}/>
      </div>
    )
  },

  navigate: function(direction){
    var nextDate = this.nextDate(direction)

    if ( dates.inRange(nextDate, this.props.min, this.props.max))
      this.setState({
        currentDate: nextDate
      })
  },


  view: function(){
    this.setState({
      view: NEXT_VIEW[this.state.view]
    })
  },

  nextDate: function(direction){
    var method = direction === LEFT ? 'subtract' : 'add'
      , view   = this.state.view
      , unit   = view === 'month' ? view : 'year'
      , multi  = MULTIPLIER[view] || 1;

    return dates[method](this.state.currentDate, 1 * multi, unit)
  },

  _label: function(){
    var view = this.state.view
      , dt   = this.state.currentDate;

    if ( view === 'month')
      return globalize.format(dt, 'MMMM YYYY')

    else if ( view === 'year')
      return globalize.format(dt, 'YYYY')

    else if ( view === 'decade')
      return globalize.format(dates.firstOfDecade(dt), 'YYYY') 
        + ' - ' + globalize.format(dates.lastOfDecade(dt), 'YYYY')

    else if ( view === 'century')
      return globalize.format(dates.firstOfCentury(dt), 'YYYY') 
        + ' - ' + globalize.format(dates.lastOfCentury(dt), 'YYYY')
  } 

});

