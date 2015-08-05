'use strict';
var React           = require('react')
  , cx              = require('classnames')
  , compat          = require('./util/compat')
  , Header          = require('./Header')
  , Footer          = require('./Footer')
  , Month           = require('./Month')
  , Year            = require('./Year')
  , Decade          = require('./Decade')
  , Century         = require('./Century')
  , localizers      = require('./util/configuration').locale
  , CustomPropTypes = require('./util/propTypes')
  , createUncontrolledWidget = require('uncontrollable')
  , SlideTransition = require('./SlideTransition')
  , dates           = require('./util/dates')
  , constants       = require('./util/constants')
  , _               = require('./util/_'); //values, omit

var dir    = constants.directions
  , values = obj => Object.keys(obj).map( k => obj[k] )
  , invert = obj => _.transform(obj, (o, val, key) => { o[val] = key }, {});

var views        = constants.calendarViews
  , VIEW_OPTIONS = values(views)
  , ALT_VIEW     = invert(constants.calendarViewHierarchy)
  , NEXT_VIEW    = constants.calendarViewHierarchy
  , VIEW_UNIT    = constants.calendarViewUnits
  , VIEW  = {
      [views.MONTH]:   Month,
      [views.YEAR]:    Year,
      [views.DECADE]:  Decade,
      [views.CENTURY]: Century
    };

var ARROWS_TO_DIRECTION = {
  ArrowDown:  dir.DOWN,
  ArrowUp:    dir.UP,
  ArrowRight: dir.RIGHT,
  ArrowLeft:  dir.LEFT
}

var OPPOSITE_DIRECTION = {
  [dir.LEFT]:  dir.RIGHT,
  [dir.RIGHT]: dir.LEFT
};

var MULTIPLIER = {
      [views.YEAR]:    1,
      [views.DECADE]:  10,
      [views.CENTURY]: 100
    };

var format = (props, f) => props[f + 'Format'] || localizers.date.formats[f]

var propTypes = {

  onChange:      React.PropTypes.func,
  value:         React.PropTypes.instanceOf(Date),

  min:           React.PropTypes.instanceOf(Date),
  max:           React.PropTypes.instanceOf(Date),

  initialView:   React.PropTypes.oneOf(VIEW_OPTIONS),

  finalView:     function (props, propname, componentName){
                    var err = React.PropTypes.oneOf(VIEW_OPTIONS)(props, propname, componentName)

                    if ( err) return err
                    if ( VIEW_OPTIONS.indexOf(props[propname]) < VIEW_OPTIONS.indexOf(props.initialView) )
                      return new Error(`The \`${propname}\` prop: \`${props[propname]}\` cannot be 'lower' than the \`initialView\`
                        prop. This creates a range that cannot be rendered.`.replace(/\n\t/g, ''))
                 },

  disabled:      React.PropTypes.oneOfType([
                   React.PropTypes.bool,
                   React.PropTypes.oneOf(['disabled'])
                 ]),

  readOnly:      React.PropTypes.oneOfType([
                   React.PropTypes.bool,
                   React.PropTypes.oneOf(['readOnly'])
                 ]),

  culture:       React.PropTypes.string,

  footer:        React.PropTypes.bool,

  dayComponent:  CustomPropTypes.elementType,
  headerFormat:  CustomPropTypes.dateFormat,
  footerFormat:  CustomPropTypes.dateFormat,

  dayFormat:     CustomPropTypes.dateFormat,
  dateFormat:    CustomPropTypes.dateFormat,
  monthFormat:   CustomPropTypes.dateFormat,
  yearFormat:    CustomPropTypes.dateFormat,
  decadeFormat:  CustomPropTypes.dateFormat,
  centuryFormat: CustomPropTypes.dateFormat,

  messages:      React.PropTypes.shape({
    moveBack:     React.PropTypes.string,
    moveForward:  React.PropTypes.string
  })
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
      currentDate:   value ? new Date(value) : this.inRangeValue(new Date())
    }
  },

  getDefaultProps: function(){
    return {

      value:        null,
      min:          new Date(1900, 0, 1),
      max:          new Date(2099, 11, 31),

      initialView:  'month',
      finalView:    'century',

      tabIndex:     '0',
      footer:        false,

      messages: msgs({})
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
      , viewProps  = _.pick(this.props, Object.keys(compat.type(View).propTypes))
      , unit       = this.state.view
      , messages   = msgs(this.props.messages)

      , disabled   = this.props.disabled || this.props.readOnly
      , date       = this.state.currentDate
      , todaysDate = new Date()
      , todayNotInRange = !dates.inRange(todaysDate, this.props.min, this.props.max, unit)
      , labelId    = this._id('_view_label')
      , key        = this.state.view + '_' + dates[this.state.view](date)
      , id         = this._id('_view');

    return (
      <div {...props }
        onKeyDown={this._keyDown}
        onFocus={this._focus.bind(null, true)}
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
          messages={messages}
          upDisabled={  disabled || this.state.view === this.props.finalView}
          prevDisabled={disabled || !dates.inRange(this.nextDate(dir.LEFT), this.props.min, this.props.max, unit)}
          nextDisabled={disabled || !dates.inRange(this.nextDate(dir.RIGHT), this.props.min, this.props.max, unit)}
          onViewChange={this.navigate.bind(null, dir.UP, null)}
          onMoveLeft ={this.navigate.bind(null,  dir.LEFT, null)}
          onMoveRight={this.navigate.bind(null,  dir.RIGHT, null)}/>

        <SlideTransition
          ref='animation'
          duration={props.duration}
          direction={this.state.slideDirection}
          onAnimate={() => this.focus(true)}>

          <View {...viewProps}
            tabIndex='-1' key={key} id={id}
            aria-labelledby={labelId}
            today={todaysDate}
            value={this.props.value}
            focused={this.state.currentDate}
            onChange={this._maybeHandle(this.change)}
            onKeyDown={this._keyDown} />

        </SlideTransition>

        { this.props.footer &&
          <Footer
            value={todaysDate}
            format={this.props.footerFormat}
            culture={this.props.culture}
            disabled={ this.props.disabled || todayNotInRange}
            readOnly={this.props.readOnly}
            onClick={this._maybeHandle(this.select)}
          />
        }
      </div>
    )
  },

  navigate: _.ifNotDisabled(function (direction, date){
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
      this.notify('onNavigate', [date, slideDir, view])
      this.focus(true);

      this.setState({
        currentDate:    date,
        slideDirection: slideDir,
        view: view
      })
    }
  }),

  focus() {
    if (+this.props.tabIndex > -1)
      compat.findDOMNode(this).focus()

    //console.log(document.activeElement)
  },

  _focus: _.ifNotDisabled(true, function(focused, e){
    if ( +this.props.tabIndex === -1)
      return

    this.setTimeout('focus', () => {
      if( focused !== this.state.focused){
        this.notify(focused ? 'onFocus' : 'onBlur', e)
        this.setState({ focused })
      }
    })
  }),

  change(date){
    if (this.state.view === this.props.initialView){
      this.notify('onChange', date)
      this.focus();
      return;
    }

    this.navigate(dir.DOWN, date)
  },

  select(date){
    var view = this.props.initialView
      , slideDir = view !== this.state.view || dates.gt(date, this.state.currentDate)
          ? 'left' // move down to a the view
          : 'right';

    this.notify('onChange', date)

    if ( this.isValidView(view) && dates.inRange(date, this.props.min, this.props.max, view)) {
      this.focus();

      this.setState({
        currentDate:    date,
        slideDirection: slideDir,
        view: view
      })
    }

  },

  nextDate(direction){
    var method = direction === dir.LEFT ? 'subtract' : 'add'
      , view   = this.state.view
      , unit   = view === views.MONTH ? view : views.YEAR
      , multi  = MULTIPLIER[view] || 1;

    return dates[method](this.state.currentDate, 1 * multi, unit)
  },

  _keyDown: _.ifNotDisabled(function(e){
    var ctrl = e.ctrlKey
      , key  = e.key
      , direction = ARROWS_TO_DIRECTION[key]
      , current = this.state.currentDate
      , view = this.state.view
      , unit = VIEW_UNIT[view]
      , currentDate = current;

    if ( key === 'Enter'){
      e.preventDefault()
      return this.change(current)
    }

    if ( direction ) {
      if ( ctrl ) {
        e.preventDefault()
        this.navigate(direction)
      }
      else {
        if ( this.isRtl() && OPPOSITE_DIRECTION[direction] )
          direction = OPPOSITE_DIRECTION[direction]

        currentDate = dates.move(currentDate, this.props.min, this.props.max, view, direction)

        if ( !dates.eq(current, currentDate, unit) ) {
          e.preventDefault()

          if ( dates.gt(currentDate, current, view))
            this.navigate(dir.RIGHT, currentDate)

          else if ( dates.lt(currentDate, current, view))
            this.navigate(dir.LEFT, currentDate)

          else
            this.setState({ currentDate })
        }
      }
    }

    this.notify('onKeyDown', [e])
  }),

  _label() {
    var {
        culture
      , ...props } = this.props
      , view = this.state.view
      , dt   = this.state.currentDate;

    if ( view === 'month')
      return localizers.date.format(dt, format(props, 'header'), culture)

    else if ( view === 'year')
      return localizers.date.format(dt, format(props, 'year'), culture)

    else if ( view === 'decade')
      return localizers.date.format(dates.startOf(dt, 'decade'), format(props, 'decade'), culture)

    else if ( view === 'century')
      return localizers.date.format(dates.startOf(dt, 'century'), format(props, 'century'), culture)
  },

  inRangeValue(_value){
    var value = dateOrNull(_value)

    if( value === null) return value

    return dates.max(
        dates.min(value, this.props.max)
      , this.props.min)
  },

  isValidView(next) {
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

function msgs(msgs){
  return {
    moveBack:     'navigate back',
    moveForward:  'navigate forward',
    ...msgs
  }
}


module.exports = createUncontrolledWidget(
    Calendar, { value: 'onChange' });

module.exports.BaseCalendar = Calendar
