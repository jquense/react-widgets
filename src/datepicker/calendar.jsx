var React = require('react/addons')
  , Header  = require('./header.jsx')
  , Month = require('./month.jsx')
  , Year = require('./year.jsx')
  , Decade = require('./decade.jsx')
  , Century = require('./century.jsx')
  , cx = React.addons.classSet
  , SlideTransition  = require('../common/slide-transition.jsx')
  , dates = require('../util/dates')
  , mergePropsInto = require('../util/transferProps')
  , _ = require('lodash');

var RIGHT = 'right'
  , LEFT  = 'left'
  , UP    = 'up'
  , DOWN  = 'down'

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
  
  displayName: 'Calendar',

  mixins: [ 
    require('../mixins/RtlParentContextMixin') 
  ],


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

      //determines the position of views
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
    //if the value changes reset views to the new one
    if ( !dates.eq(nextProps.value, this.props.value, 'day') )
      this.setState({
        currentDate: new Date(nextProps.value)
      })
  },

  render: function(){
    var View = VIEW[this.state.view]
      , date = this.state.currentDate
      , key  = this.state.view + '_' + date.getMonth() + '-' + date.getFullYear();

    return mergePropsInto(_.omit(this.props, 'value', 'min', 'max'),
      <div className='rw-calendar rw-widget' onKeyDown={this._keyDown}>
        <Header
          label={this._label()}
          disabled={this.state.view === 'century'}
          onViewChange={_.partial(this.navigate, UP, null)}
          onMoveLeft ={_.partial(this.navigate,  LEFT, null)}
          onMoveRight={_.partial(this.navigate,  RIGHT, null)}/>

        <SlideTransition direction={this.state.slideDirection}>
          <View ref='currentView'
            key={key}
            selectedDate={this.props.value}
            value={this.state.currentDate}
            onChange={this.change}
            onMoveLeft ={_.partial(this.navigate,  LEFT)}
            onMoveRight={_.partial(this.navigate,  RIGHT)}
            min={this.props.min}
            max={this.props.max}/>
        </SlideTransition>
      </div>

    )
  },

  navigate: function(direction, date){
    var alts     = _.invert(NEXT_VIEW)
      , view     =  this.state.view
      , slideDir = (direction === LEFT || direction === UP)
          ? 'right' 
          : 'left'

    if ( !date )
      date = _.contains([ LEFT, RIGHT ], direction)
        ? this.nextDate(direction)
        : this.state.currentDate

    if (direction === DOWN ) 
      view = alts[view] || view

    if (direction === UP )   
      view = NEXT_VIEW[view] || view

    if ( dates.inRange(date, this.props.min, this.props.max))
      this.setState({
        currentDate:    date,
        slideDirection: slideDir,
        view: view
      })
  },

  change: function(date){
    if ( this.state.view === 'month')
      return this.props.onChange(date)

    this.navigate(DOWN, date)
  },

  nextDate: function(direction){
    var method = direction === LEFT ? 'subtract' : 'add'
      , view   = this.state.view
      , unit   = view === 'month' ? view : 'year'
      , multi  = MULTIPLIER[view] || 1;

    return dates[method](this.state.currentDate, 1 * multi, unit)
  },

  _keyDown: function(e){
    var ctrl = e.ctrlKey
      , key  = e.key;

      
    if ( ctrl ) {
      if ( key === 'ArrowDown' ) {
        e.preventDefault()
        this.navigate(DOWN)
      } 
      if ( key === 'ArrowUp' ) {
        e.preventDefault()
        this.navigate(UP)
      } 
      if ( key === 'ArrowLeft' ) {
        e.preventDefault()
        this.navigate(LEFT)
      } 
      if ( key === 'ArrowRight' ) {
        e.preventDefault()
        this.navigate(RIGHT)
      }
    } else {
      this.refs.currentView._keyDown 
        && this.refs.currentView._keyDown(e)
    }

  },

  _label: function() {
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

