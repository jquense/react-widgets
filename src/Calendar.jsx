'use strict';
var React           = require('react')
  , Header          = require('./Header')
  , Month           = require('./Month')
  , Year            = require('./Year')
  , Decade          = require('./Decade')
  , Century         = require('./Century')
  , cx              = require('classnames')
  , controlledInput = require('./util/controlledInput')
  , SlideTransition = require('./SlideTransition')
  , dates           = require('./util/dates')
  , constants       = require('./util/constants')
  , _               = require('./util/_'); //values, omit, object

var dir = constants.directions;

var views        = constants.calendarViews
  , VIEW_OPTIONS = Object.keys(views).map( k => views[k] )
  , ALT_VIEW     = _.transform(constants.calendarViewHierarchy, (o, val, key) => { 
                      o[val] = key 
                    }, {})
  , NEXT_VIEW    = constants.calendarViewHierarchy
  , VIEW_UNIT    = constants.calendarViewUnits
  , VIEW  = _.object([
      [views.MONTH,   Month],
      [views.YEAR,    Year],
      [views.DECADE,  Decade],
      [views.CENTURY, Century]
    ]);

var MULTIPLIER = _.object([
      [views.YEAR,    1],
      [views.DECADE,  10],
      [views.CENTURY, 100]
    ]);

var propTypes = {

  onChange:      React.PropTypes.func.isRequired,
  value:         React.PropTypes.instanceOf(Date),

  min:           React.PropTypes.instanceOf(Date),
  max:           React.PropTypes.instanceOf(Date),

  initialView:   React.PropTypes.oneOf(VIEW_OPTIONS),
  finalView:     React.PropTypes.oneOf(VIEW_OPTIONS),

  disabled:       React.PropTypes.oneOfType([
                      React.PropTypes.bool,
                      React.PropTypes.oneOf(['disabled'])
                    ]),

  readOnly:       React.PropTypes.oneOfType([
                    React.PropTypes.bool,
                    React.PropTypes.oneOf(['readOnly'])
                  ]),

  culture:       React.PropTypes.string,

  messages:      React.PropTypes.shape({
    moveBack:    React.PropTypes.string,
    moveForward: React.PropTypes.string
  }),

  maintainFocus: React.PropTypes.bool,
}

var Calendar = React.createClass({

  displayName: 'Calendar',

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/TimeoutMixin'),
    require('./mixins/PureRenderMixin'),
    require('./mixins/RtlParentContextMixin')
  ],

  propTypes,

  getInitialState: function(){
    var value = this.inRangeValue(this.props.value);

    return {
      selectedIndex: 0,
      view:          this.props.initialView || 'month',
      currentDate:   value ? new Date(value) : new Date()
    }
  },

  getDefaultProps: function(){
    return {

      value: null,
      min:   new Date(1900,0, 1),
      max:   new Date(2099,11, 31),

      initialView: 'month',
      finalView: 'century',

      tabIndex: '0',
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var bottom  = VIEW_OPTIONS.indexOf(nextProps.initialView)
      , top     = VIEW_OPTIONS.indexOf(nextProps.finalView)
      , current = VIEW_OPTIONS.indexOf(this.state.view)
      , view    = this.state.view
      , val     = this.inRangeValue(nextProps.value);

    if( current < bottom )
      this.setState({ view: view = nextProps.initialView })
    else if (current > top)
      this.setState({ view: view = nextProps.finalView })

    //if the value changes reset views to the new one
    if ( !dates.eq(val, dateOrNull(this.props.value), VIEW_UNIT[view]))
      this.setState({
        currentDate: val ? new Date(val) : new Date()
      })
  },

  render: function(){
    var {
        className
      , ...props } = _.omit(this.props, Object.keys(propTypes))
      , View       = VIEW[this.state.view]
      , unit       = this.state.view

      , disabled   = this.props.disabled || this.props.readOnly
      , date       = this.state.currentDate
      , todaysDate = new Date()
      , labelId    = this._id('_view_label')
      , key        = this.state.view + '_' + dates[this.state.view](date)
      , id         = this._id('_view');

    return (
      <div {...props }
        onKeyDown={this._keyDown}
        onFocus={this._maybeHandle(this._focus.bind(null, true), true)}
        onBlur ={this._focus.bind(null, false)}
        className={cx(className, 'rw-calendar', 'rw-widget', {
          'rw-state-focus':    this.state.focused,
          'rw-state-disabled': this.props.disabled,
          'rw-state-readonly': this.props.readOnly,
          'rw-rtl':            this.isRtl()
        })}>
        <Header
          label={this._label()}
          labelId={labelId}
          messages={this.props.messages}
          upDisabled={  disabled || this.state.view === this.props.finalView}
          prevDisabled={disabled || !dates.inRange(this.nextDate(dir.LEFT), this.props.min, this.props.max, unit)}
          nextDisabled={disabled || !dates.inRange(this.nextDate(dir.RIGHT), this.props.min, this.props.max, unit)}
          onViewChange={this._maybeHandle(this.navigate.bind(null, dir.UP, null))}
          onMoveLeft ={this._maybeHandle(this.navigate.bind(null,  dir.LEFT, null))}
          onMoveRight={this._maybeHandle(this.navigate.bind(null,  dir.RIGHT, null))}/>

        <SlideTransition
          ref='animation'
          duration={this.props.duration}
          direction={this.state.slideDirection}
          onAnimate={() => this._focus(true)}>

          <View ref='currentView'
            key={key}
            id={id}
            culture={this.props.culture}
            aria-labelledby={labelId}
            selectedDate={this.props.value}
            today={todaysDate}
            value={this.state.currentDate}
            onChange={this._maybeHandle(this.change)}
            onKeyDown={this._maybeHandle(this._keyDown)}
            onMoveLeft ={this._maybeHandle(this.navigate.bind(null,  dir.LEFT))}
            onMoveRight={this._maybeHandle(this.navigate.bind(null,  dir.RIGHT))}
            disabled={this.props.disabled}
            readOnly={this.props.readOnly}
            min={this.props.min}
            max={this.props.max}/>
        </SlideTransition>
      </div>
    )
  },

  navigate: function(direction, date){
    var view     =  this.state.view
      , slideDir = (direction === dir.LEFT || direction === dir.UP)
          ? 'right'
          : 'left';

    if ( !date )
      date = [ dir.LEFT, dir.RIGHT ].indexOf(direction) !== -1
        ? this.nextDate(direction)
        : this.state.currentDate

    if (direction === dir.DOWN )
      view = ALT_VIEW[view] || view

    if (direction === dir.UP )
      view = NEXT_VIEW[view] || view

    if ( this.isValidView(view) && dates.inRange(date, this.props.min, this.props.max, view)) {
      this._focus(true, 'nav');

      this.setState({
        currentDate:    date,
        slideDirection: slideDir,
        view: view
      })
    }
  },


  _focus: function(focused, e){

    if ( +this.props.tabIndex === -1)
      return 

    this.setTimeout('focus', () => {

      if(focused) 
        this.getDOMNode().focus()

      if( focused !== this.state.focused){
        this.notify(focused ? 'onFocus' : 'onBlur', e)
        this.setState({ focused: focused })
      }
    })
  },

  change: function(date){
    setTimeout(() => this._focus(true))

    if ( this.props.onChange && this.state.view === this.props.initialView)
      return this.notify('onChange', date)

    this.navigate(dir.DOWN, date)
  },

  nextDate: function(direction){
    var method = direction === dir.LEFT ? 'subtract' : 'add'
      , view   = this.state.view
      , unit   = view === views.MONTH ? view : views.YEAR
      , multi  = MULTIPLIER[view] || 1;

    return dates[method](this.state.currentDate, 1 * multi, unit)
  },

  _keyDown: function(e){
    var ctrl = e.ctrlKey
      , key  = e.key;

    if ( ctrl ) {
      if ( key === 'ArrowDown' ) {
        e.preventDefault()
        this.navigate(dir.DOWN)
      }
      if ( key === 'ArrowUp' ) {
        e.preventDefault()
        this.navigate(dir.UP)
      }
      if ( key === 'ArrowLeft' ) {
        e.preventDefault()
        this.navigate(dir.LEFT)
      }
      if ( key === 'ArrowRight' ) {
        e.preventDefault()
        this.navigate(dir.RIGHT)
      }
    } 
    else {
      this.refs.currentView._keyDown
        && this.refs.currentView._keyDown(e)
    }

    this.notify('onKeyDown', [e])
  },

  _label: function() {
    var view = this.state.view
      , dt   = this.state.currentDate
      , culture = this.props.culture;

    if ( view === 'month')
      return dates.format(dt, dates.formats.MONTH_YEAR, culture)

    else if ( view === 'year')
      return dates.format(dt, dates.formats.YEAR)

    else if ( view === 'decade')
      return dates.format(dates.firstOfDecade(dt),     dates.formats.YEAR, culture)
        + ' - ' + dates.format(dates.lastOfDecade(dt), dates.formats.YEAR, culture)

    else if ( view === 'century')
      return dates.format(dates.firstOfCentury(dt),     dates.formats.YEAR, culture)
        + ' - ' + dates.format(dates.lastOfCentury(dt), dates.formats.YEAR, culture)
  },

  inRangeValue: function(_value){
    var value = dateOrNull(_value)

    if( value === null)
      return value

    return dates.max(
        dates.min(value, this.props.max)
      , this.props.min)
  },

  isValidView: function(next) {
    var bottom  = VIEW_OPTIONS.indexOf(this.props.initialView)
      , top     = VIEW_OPTIONS.indexOf(this.props.finalView)
      , current = VIEW_OPTIONS.indexOf(next);

    return current >= bottom && current <= top
  }
});

function dateOrNull(dt){
  if(dt && !isNaN(dt.getTime())) return dt
  return null
}

module.exports = controlledInput.createControlledClass(
    Calendar, { value: 'onChange' });

module.exports.BaseCalendar = Calendar