var React = require('react/addons')
  , Header  = require('./header.jsx')
  , Month = require('./month.jsx')
  , Year = require('./year.jsx')
  , Decade = require('./decade.jsx')
  , Century = require('./century.jsx')
  , cx = React.addons.classSet
  , setter = require('../util/stateSetter')
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
  }
  VIEW_UNIT = {
    'month':    'day',
    'year':     'month',
    'decade':   'year',
    'century':  'decade',
  };

module.exports = React.createClass({
  
  displayName: 'Calendar',

  mixins: [ 
    require('../mixins/PureRenderMixin'),
    require('../mixins/RtlParentContextMixin') 
  ],


  propTypes: {
    onChange:      React.PropTypes.func.isRequired,
    value:         React.PropTypes.instanceOf(Date),
    min:           React.PropTypes.instanceOf(Date),
    max:           React.PropTypes.instanceOf(Date),
    
    initialView:   React.PropTypes.oneOf(['month', 'year', 'decade', 'century']),
    finalView:     React.PropTypes.oneOf(['month', 'year', 'decade', 'century']),

    maintainFocus: React.PropTypes.bool,
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
      min:  new Date(1900,0, 1),
      max:  new Date(2099,11, 31),

      initialView: 'month',
      finalView: 'century',

      maintainFocus: true
    }
  },

  componentWillReceiveProps: function(nextProps) {
    //if the value changes reset views to the new one
    if ( !dates.eq(nextProps.value, this.props.value, VIEW_UNIT[this.state.view]) )
      this.setState({
        currentDate: new Date(nextProps.value)
      })
  },

  componentDidUpdate: function() {
    //console.log('update', nextState.focused);

    if ( this.props.maintainFocus && this.state.focused && !this.refs.animation.isTransitioning() )
      this.refs.currentView.focus()
  },

  render: function(){
    var View = VIEW[this.state.view]
      , date = this.state.currentDate
      , labelId = this.props.id && this.props.id + '_view_label'
      , key = this.state.view + '_' + dates[this.state.view](date)
      , id  = this.props.id && this.props.id + '_table';

    console.log(key)
    return mergePropsInto(_.omit(this.props, 'value', 'min', 'max'),
      <div className='rw-calendar rw-widget' 
        onKeyDown={this._keyDown}>
        <Header
          label={this._label()}
          labelId={labelId}
          upDisabled={this.state.view === this.props.finalView}
          prevDisabled={!dates.inRange(this.nextDate(LEFT), this.props.min, this.props.max)}
          nextDisabled={!dates.inRange(this.nextDate(RIGHT), this.props.min, this.props.max)}
          onViewChange={_.partial(this.navigate, UP, null)}
          onMoveLeft ={_.partial(this.navigate,  LEFT, null)}
          onMoveRight={_.partial(this.navigate,  RIGHT, null)}/>

        <SlideTransition 
          ref='animation'
          direction={this.state.slideDirection} 
          onAnimate={finished.bind(this)}>

          <View ref='currentView'
            key={key}
            id={id}
            aria-labeledby={labelId}
            aria-activedescendant={id + '_selected_item'}
            selectedDate={this.props.value}
            value={this.state.currentDate}
            onChange={this.change}
            onMoveLeft ={_.partial(this.navigate,  LEFT)}
            onMoveRight={_.partial(this.navigate,  RIGHT)}
            onFocus={_.partial(this._focus, true)}
            onBlur={_.partial(this._focus, false)}
            min={this.props.min}
            max={this.props.max}/>
        </SlideTransition>
      </div>
    )

    function finished(){
      console.log('stop: ', this.refs.animation.isTransitioning())
      this.componentDidUpdate()
     // this.refs.currentView.focus()
    }
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

    if ( dates.inRange(date, this.props.min, this.props.max)){
      console.log('navigate: ', view)
      this.setState({
        currentDate:    date,
        slideDirection: slideDir,
        view: view
      })
    }
  },

  _focus: function(val, e){
    var s = setter('focused');

    //console.log('focus', val, e && e.target)
    s.call(this,val)
  },

  change: function(date){
    if ( this.state.view === this.props.initialView)
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

