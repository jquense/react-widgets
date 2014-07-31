var React = require('react/addons')
  , Header  = require('./header.jsx')
  , Month = require('./month.jsx')
  , Year = require('./year.jsx')
  , Decade = require('./decade.jsx')
  , Century = require('./century.jsx')
  , cx = React.addons.classSet
  , CSSTransitionGroup  = require('../common/slide-transition.jsx')
  , dates = require('../util/dates')
  , _ = require('lodash');

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
    'decade':   Decade,
    'century':  Century,
  }
  NEXT_VIEW = {
    'month':  'year',
    'year':   'decade',
    'decade': 'century'
  };

module.exports = React.createClass({

  propTypes: {
    culture:      React.PropTypes.array,
    value:        React.PropTypes.instanceOf(Date),
    min:          React.PropTypes.instanceOf(Date),
    max:          React.PropTypes.instanceOf(Date),

    format:       React.PropTypes.string,
    initialView:  React.PropTypes.oneOf(['month', 'year', 'decade']),

    onChange:     React.PropTypes.func.isRequired
  },

  getInitialState: function(){
    return {
      selectedIndex: 0,
      open:          false,
      view:          this.props.initialView || 'month',
      currentDate:   new Date(this.props.value)
    }
  },

  getDefaultProps: function(){
    return {
      value: new Date,
      min:  new Date(2014,5, 14),
      max:  new Date(2099,11, 31),
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      currentDate: new Date(nextProps.value)
    })
  },

  render: function(){
    var View = VIEW[this.state.view]
      , date = this.state.currentDate
      , key  = this.state.view + '_' + date.getMonth() + '-' + date.getFullYear() + '-' + date.getDate();

    return (
      <div className='rw-calendar rw-widget'>
        <Header
          label={this._label()}
          disabled={this.state.view === 'century'}
          onViewChange={this.nextView}
          onMoveLeft ={_.partial(this.navigate, LEFT)}
          onMoveRight={_.partial(this.navigate, RIGHT)}/>
        <CSSTransitionGroup direction={this.state.direction}>
          <View 
            key={key}
            selected={this.props.value} 
            value={this.state.currentDate}
            onChange={this.change}
            min={this.props.min}
            max={this.props.max}/>
        </CSSTransitionGroup>
      </div>

    )
  },

  navigate: function(direction){
    var nextDate = this.nextDate(direction)

    if ( dates.inRange(nextDate, this.props.min, this.props.max))
      this.setState({
        currentDate: nextDate,
        direction:   direction === LEFT 
          ? RIGHT 
          : LEFT,
      })
  },

  change: function(date){
    var view = this.state.view
      , alts = _.invert(NEXT_VIEW);

    if ( view === 'month')
      return this.props.onChange(date)

    this.setState({
      currentDate: date,
      direction: LEFT,
      view: alts[view]
    })
  },


  nextView: function(){
    this.setState({
      direction: RIGHT,
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
      return dates.format(dt, dates.formats.MONTH_YEAR)

    else if ( view === 'year')
      return dates.format(dt, dates.formats.YEAR)

    else if ( view === 'decade')
      return dates.format(dates.firstOfDecade(dt),     dates.formats.YEAR) 
        + ' - ' + dates.format(dates.lastOfDecade(dt), dates.formats.YEAR)

    else if ( view === 'century')
      return dates.format(dates.firstOfCentury(dt),     dates.formats.YEAR) 
        + ' - ' + dates.format(dates.lastOfCentury(dt), dates.formats.YEAR)
  } 

});

