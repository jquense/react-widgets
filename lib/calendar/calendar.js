/** @jsx React.DOM */
var React = require('react')
  , Header  = require('./header')
  , Month = require('./month')
  , Year = require('./year')
  , Decade = require('./decade')
  , Century = require('./century')
  , cx = require('../util/cx')
  , setter = require('../util/stateSetter')
  , controlledInput  = require('../util/controlledInput')
  , SlideTransition  = require('../common/slide-transition')
  , dates = require('../util/dates')
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , constants  = require('../util/constants')
  , _ = require('lodash');

var dir = constants.directions;

var views        = constants.calendarViews
  , VIEW_OPTIONS = _.values(views)
  , ALT_VIEW     = _.invert(constants.calendarViewHierarchy)
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


var Calendar = React.createClass({

  displayName: 'Calendar',

  mixins: [
    require('../mixins/WidgetMixin'),
    require('../mixins/PureRenderMixin'),
    require('../mixins/RtlParentContextMixin')
  ],


  propTypes: {

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

    messages:      React.PropTypes.shape({
      moveBack:    React.PropTypes.string,
      moveForward: React.PropTypes.string
    }),

    maintainFocus: React.PropTypes.bool,

  },

  getInitialState: function(){
    return {
      selectedIndex: 0,
      view:          this.props.initialView || 'month',
      currentDate:   this.inRangeValue(new Date(this.props.value))
    }
  },

  getDefaultProps: function(){
    return {
      open:  false,
      value: new Date,
      min:   new Date(1900,0, 1),
      max:   new Date(2099,11, 31),

      initialView: 'month',
      finalView: 'century',

      maintainFocus: true
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var bottom  = VIEW_OPTIONS.indexOf(nextProps.initialView)
      , top     = VIEW_OPTIONS.indexOf(nextProps.finalView)
      , current = VIEW_OPTIONS.indexOf(this.state.view)
      , view    = this.state.view
      , val     = this.inRangeValue(new Date(nextProps.value));

    if( current < bottom )
      this.setState({ view: view = nextProps.initialView })
    else if (current > top)
      this.setState({ view: view = nextProps.finalView })

    //if the value changes reset views to the new one
    if ( !dates.eq(val, this.props.value, VIEW_UNIT[view]))
      this.setState({
        currentDate: val
      })
  },

  render: function(){
    var View = VIEW[this.state.view]
      , disabled = this.props.disabled || this.props.readOnly
      , date = this.state.currentDate
      , labelId = this._id('_view_label')
      , key = this.state.view + '_' + dates[this.state.view](date)
      , id  = this._id('_view');

    return mergeIntoProps(_.omit(this.props, 'value', 'min', 'max'),
      React.DOM.div({className: cx({
          'rw-calendar':       true,
          'rw-widget':         true,
          'rw-state-disabled': this.props.disabled,
          'rw-state-readonly': this.props.readOnly,
          'rw-rtl':            this.isRtl()
        })}, 
        Header({
          label: this._label(), 
          labelId: labelId, 
          messages: this.props.messages, 
          upDisabled:   disabled || this.state.view === this.props.finalView, 
          prevDisabled: disabled || !dates.inRange(this.nextDate(dir.LEFT), this.props.min, this.props.max), 
          nextDisabled: disabled || !dates.inRange(this.nextDate(dir.RIGHT), this.props.min, this.props.max), 
          onViewChange: this._maybeHandle(_.partial(this.navigate, dir.UP, null)), 
          onMoveLeft: this._maybeHandle(_.partial(this.navigate,  dir.LEFT, null)), 
          onMoveRight: this._maybeHandle(_.partial(this.navigate,  dir.RIGHT, null))}), 

        SlideTransition({
          ref: "animation", 
          direction: this.state.slideDirection, 
          onAnimate: finished.bind(this)}, 

          View({ref: "currentView", 
            key: key, 
            id: id, 
            'aria-labeledby': labelId, 
            selectedDate: this.props.value, 
            value: this.state.currentDate, 
            onChange: this._maybeHandle(this.change), 
            onKeyDown: this._maybeHandle(this._keyDown), 
            onFocus: this._maybeHandle(_.partial(this._focus, true), true), 
            onMoveLeft: this._maybeHandle(_.partial(this.navigate,  dir.LEFT)), 
            onMoveRight: this._maybeHandle(_.partial(this.navigate,  dir.RIGHT)), 
            disabled: this.props.disabled, 
            readOnly: this.props.readOnly, 
            min: this.props.min, 
            max: this.props.max})
        )
      )
    )

    function finished(){
      this._focus(true, 'stop');
    }
  },

  navigate: function(direction, date){
    var view     =  this.state.view
      , slideDir = (direction === dir.LEFT || direction === dir.UP)
          ? 'right'
          : 'left';

    if ( !date )
      date = _.contains([ dir.LEFT, dir.RIGHT ], direction)
        ? this.nextDate(direction)
        : this.state.currentDate

    if (direction === dir.DOWN )
      view = ALT_VIEW[view] || view

    if (direction === dir.UP )
      view = NEXT_VIEW[view] || view

    if ( this.isValidView(view) && dates.inRange(date, this.props.min, this.props.max, view)) {
      this._focus(true, 'nav');
      //console.log('navigate: ', view)
      this.setState({
        currentDate:    date,
        slideDirection: slideDir,
        view: view
      })
    }
  },

  _focus: function(val, e){
    var s = setter('focused');

    if ( this.props.maintainFocus)
      val && this.refs.currentView.getDOMNode().focus()
  },

  change: function(date){
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
  },

  inRangeValue: function(value){
    if( value == null)
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

module.exports = controlledInput.createControlledClass(
    'Calendar', Calendar, { value: 'onChange' });