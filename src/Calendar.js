import React from 'react';
import cn from 'classnames';
import uncontrollable from 'uncontrollable';

import compat from './util/compat';
import Widget from './Widget';
import Header from './Header';
import Footer from './Footer';
import Month from './Month';
import Year from './Year';
import Decade from './Decade';
import Century from './Century';
import SlideTransition from './SlideTransition';
import { date as dateLocalizer } from './util/localizers';
import CustomPropTypes from './util/propTypes';
import dates from './util/dates';
import * as constants from './util/constants';
import autoFocus from './util/autoFocus';
import createFocusManager from './util/focusManager';
import withRightToLeft from './util/withRightToLeft';
import _ from './util/_'; //values, omit
import { instanceId, notify } from './util/widgetHelpers';
import { widgetEditable } from './util/interaction';

let dir    = constants.directions
  , values = obj => Object.keys(obj).map( k => obj[k] )
  , invert = obj => _.transform(obj, (o, val, key) => { o[val] = key }, {});

let views        = constants.calendarViews
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

let ARROWS_TO_DIRECTION = {
  ArrowDown:  dir.DOWN,
  ArrowUp:    dir.UP,
  ArrowRight: dir.RIGHT,
  ArrowLeft:  dir.LEFT
}

let OPPOSITE_DIRECTION = {
  [dir.LEFT]:  dir.RIGHT,
  [dir.RIGHT]: dir.LEFT
};

let MULTIPLIER = {
  [views.YEAR]:    1,
  [views.DECADE]:  10,
  [views.CENTURY]: 100
};

let format = (props, f) => dateLocalizer.getFormat(f, props[f + 'Format'])


let propTypes = {
  ...autoFocus.propTypes,

  activeId: React.PropTypes.string,
  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.readOnly,

  onChange: React.PropTypes.func,
  value: React.PropTypes.instanceOf(Date),

  min: React.PropTypes.instanceOf(Date),
  max: React.PropTypes.instanceOf(Date),

  currentDate: React.PropTypes.instanceOf(Date),
  onCurrentDateChange: React.PropTypes.func,

  view: React.PropTypes.oneOf(VIEW_OPTIONS),
  initialView: React.PropTypes.oneOf(VIEW_OPTIONS),

  finalView(props, propName, componentName, ...args) {
    let err = React.PropTypes.oneOf(VIEW_OPTIONS)(props, propName, componentName, ...args)

    if (err) return err
    if (VIEW_OPTIONS.indexOf(props[propName]) < VIEW_OPTIONS.indexOf(props.initialView))
      return new Error(`The \`${propName}\` prop: \`${props[propName]}\` cannot be 'lower' than the \`initialView\`
        prop. This creates a range that cannot be rendered.`.replace(/\n\t/g, ''))
  },

  onViewChange: React.PropTypes.func,
  onNavigate: React.PropTypes.func,
  culture: React.PropTypes.string,
  footer: React.PropTypes.bool,

  dayComponent: CustomPropTypes.elementType,
  headerFormat: CustomPropTypes.dateFormat,
  footerFormat: CustomPropTypes.dateFormat,

  dayFormat: CustomPropTypes.dateFormat,
  dateFormat: CustomPropTypes.dateFormat,
  monthFormat: CustomPropTypes.dateFormat,
  yearFormat: CustomPropTypes.dateFormat,
  decadeFormat: CustomPropTypes.dateFormat,
  centuryFormat: CustomPropTypes.dateFormat,

  messages: React.PropTypes.shape({
    moveBack: React.PropTypes.string,
    moveForward: React.PropTypes.string
  })
}

@withRightToLeft
class Calendar extends React.Component {
  static displayName = 'Calendar';

  static propTypes = propTypes;

  static defaultProps = {

    value:        null,
    min:          new Date(1900, 0, 1),
    max:          new Date(2099, 11, 31),

    initialView:  'month',
    finalView:    'century',

    tabIndex:     '0',
    footer:        true,

    messages: msgs({})
  };

  constructor(...args) {
    super(...args)

    this.viewId = instanceId(this, '_calendar')
    this.labelId = instanceId(this, '_calendar_label')
    this.activeId = (
      this.props.activeId ||
      instanceId(this, '_calendar_active_cell')
    )

    autoFocus(this);
    this.focusManager = createFocusManager(this, {
      didHandle: this.handleFocusChanged
    })

    this.state = {
      selectedIndex: 0,
      view: this.props.initialView || 'month'
    }
  }

  componentWillReceiveProps({ initialView, finalView, value, currentDate }) {
    let bottom  = VIEW_OPTIONS.indexOf(initialView)
      , top     = VIEW_OPTIONS.indexOf(finalView)
      , current = VIEW_OPTIONS.indexOf(this.state.view)
      , view    = this.state.view
      , val     = this.inRangeValue(value);

    if (current < bottom)
      this.setState({ view: view = initialView })
    else if (current > top)
      this.setState({ view: view = finalView })

    //if the value changes reset views to the new one
    if (!dates.eq(val, dateOrNull(this.props.value), VIEW_UNIT[view])) {
      this.setCurrentDate(val, currentDate)
    }
  }

  handleFocusChanged = () => {
    if (+this.props.tabIndex === -1)
      return false
  }

  @widgetEditable
  handleViewChange = () => {
    this.navigate(dir.UP);
  }

  @widgetEditable
  handleMoveBack = () => {
    this.navigate(dir.LEFT);
  }

  @widgetEditable
  handleMoveForward = () => {
    this.navigate(dir.RIGHT);
  }

  @widgetEditable
  handleChange = (date) => {
    let isAtBottomView = this.state.view === this.props.initialView;

    if (isAtBottomView) {
      this.setCurrentDate(date)

      notify(this.props.onChange, date)

      this.focus();
      return;
    }

    this.navigate(dir.DOWN, date)
  };

  @widgetEditable
  handleFooterClick = (date) => {
    let { initialView, min, max } = this.props;
    let { view: currentView } = this.state;

    let currentDate = this.getCurrentDate()

    let slideDir = initialView !== currentView || dates.gt(date, currentDate)
          ? 'left' // move down to a the view
          : 'right';

    notify(this.props.onChange, date)

    if (
      this.isValidView(initialView) &&
      dates.inRange(date, min, max, initialView)
    ) {
      this.focus();

      this.setCurrentDate(date);

      this.setState({
        slideDirection: slideDir,
        view: initialView
      })
    }
  };

  @widgetEditable
  handleKeyDown = (e) => {
    let ctrl = e.ctrlKey || e.metaKey
      , key  = e.key
      , direction = ARROWS_TO_DIRECTION[key]
      , currentDate = this.getCurrentDate()
      , view = this.state.view
      , unit = VIEW_UNIT[view];

    if (key === 'Enter') {
      e.preventDefault()
      return this.handleChange(currentDate)
    }

    if (direction) {
      if (ctrl) {
        e.preventDefault()
        this.navigate(direction)
      }
      else {
        if (this.isRtl() && OPPOSITE_DIRECTION[direction])
          direction = OPPOSITE_DIRECTION[direction]

        let nextDate = dates.move(
          currentDate,
          this.props.min,
          this.props.max,
          view,
          direction
        )

        if (!dates.eq(currentDate, nextDate, unit)) {
          e.preventDefault()

          if ( dates.gt(nextDate, currentDate, view))
            this.navigate(dir.RIGHT, nextDate)

          else if (dates.lt(nextDate, currentDate, view))
            this.navigate(dir.LEFT, nextDate)

          else
            this.setCurrentDate(nextDate)
        }
      }
    }

    notify(this.props.onKeyDown, [e])
  };

  render() {
    let {
        className
      , value
      , footerFormat
      , disabled
      , readOnly
      , finalView
      , footer
      , messages
      , min
      , max
      , culture
      , duration
      , tabIndex } = this.props

    let { view, slideDirection, focused } = this.state;
    let currentDate = this.getCurrentDate();

    let View = VIEW[view]
      , unit = VIEW_UNIT[view]
      , todaysDate = new Date()
      , todayNotInRange = !dates.inRange(todaysDate, min, max, view)

    unit = unit === 'day' ? 'date' : unit

    let key = view + '_' + dates[view](currentDate);

    let elementProps = _.omitOwnProps(this)
      , viewProps  = _.pickProps(this.props, View)

    let isDisabled = disabled || readOnly

    messages = msgs(this.props.messages)

    return (
      <Widget
        {...elementProps}
        role='group'
        focused={focused}
        disabled={disabled}
        readOnly={readOnly}
        tabIndex={tabIndex || 0}
        onKeyDown={this.handleKeyDown}
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        className={cn(className, 'rw-calendar rw-widget-container')}
        aria-activedescendant={this.activeId}
      >
        <Header
          label={this.getHeaderLabel()}
          labelId={this.labelId}
          messages={messages}
          upDisabled={isDisabled || view === finalView}
          prevDisabled={isDisabled || !dates.inRange(this.nextDate(dir.LEFT), min, max, view)}
          nextDisabled={isDisabled || !dates.inRange(this.nextDate(dir.RIGHT), min, max, view)}
          onViewChange={this.handleViewChange}
          onMoveLeft ={this.handleMoveBack}
          onMoveRight={this.handleMoveForward}
        />
        <SlideTransition
          ref='animation'
          duration={duration}
          direction={slideDirection}
          onAnimate={() => focused && this.focus()}
        >
          <View
            {...viewProps}
            key={key}
            id={this.viewId}
            activeId={this.activeId}
            value={value}
            today={todaysDate}
            disabled={disabled}
            focused={currentDate}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            aria-labelledby={this.labelId}
          />
        </SlideTransition>
        {footer &&
          <Footer
            value={todaysDate}
            format={footerFormat}
            culture={culture}
            disabled={disabled || todayNotInRange}
            readOnly={readOnly}
            onClick={this.handleFooterClick}
          />
        }
      </Widget>
    )
  }

  navigate(direction, date) {
    let view     =  this.state.view
      , slideDir = (direction === dir.LEFT || direction === dir.UP)
          ? 'right'
          : 'left';

    if ( !date )
      date = [ dir.LEFT, dir.RIGHT ].indexOf(direction) !== -1
        ? this.nextDate(direction)
        : this.getCurrentDate()

    if (direction === dir.DOWN )
      view = ALT_VIEW[view] || view

    if (direction === dir.UP )
      view = NEXT_VIEW[view] || view

    if (this.isValidView(view) && dates.inRange(date, this.props.min, this.props.max, view)) {
      notify(this.props.onNavigate, [date, slideDir, view])
      this.focus(true);

      this.setCurrentDate(date);

      this.setState({
        slideDirection: slideDir,
        view: view
      })
    }
  }

  focus() {
    if (+this.props.tabIndex > -1)
      compat.findDOMNode(this).focus()
  }

  getCurrentDate() {
    return this.props.currentDate || this.props.value || new Date()
  }

  setCurrentDate(date, currentDate = this.getCurrentDate()) {
    let inRangeDate = this.inRangeValue(date ? new Date(date) : currentDate)

    if (dates.eq(inRangeDate, dateOrNull(currentDate), VIEW_UNIT[this.state.view]))
      return
    notify(this.props.onCurrentDateChange, inRangeDate)
  }

  nextDate(direction) {
    let method = direction === dir.LEFT ? 'subtract' : 'add'
      , view   = this.state.view
      , unit   = view === views.MONTH ? view : views.YEAR
      , multi  = MULTIPLIER[view] || 1;

    return dates[method](this.getCurrentDate(), 1 * multi, unit)
  }

  getHeaderLabel() {
    let {
        culture
      , ...props } = this.props
      , view = this.state.view
      , currentDate   = this.getCurrentDate();

    switch (view) {
      case views.MONTH:
        return dateLocalizer.format(currentDate, format(props, 'header'), culture)

      case views.YEAR:
        return dateLocalizer.format(currentDate, format(props, 'year'), culture)

      case views.DECADE:
        return dateLocalizer.format(
          dates.startOf(currentDate, 'decade'),
          format(props, 'decade'),
          culture
        )
      case views.CENTURY:
        return dateLocalizer.format(
          dates.startOf(currentDate, 'century'),
          format(props, 'century'),
          culture
        )
    }
  }

  inRangeValue(_value) {
    let value = dateOrNull(_value)

    if( value === null) return value

    return dates.max(
        dates.min(value, this.props.max)
      , this.props.min)
  }

  isValidView(next) {
    let bottom  = VIEW_OPTIONS.indexOf(this.props.initialView)
      , top     = VIEW_OPTIONS.indexOf(this.props.finalView)
      , current = VIEW_OPTIONS.indexOf(next);

    return current >= bottom && current <= top
  }
}

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt
  return null
}

function msgs(msgs) {
  return {
    moveBack:     'navigate back',
    moveForward:  'navigate forward',
    ...msgs
  }
}


export default uncontrollable(Calendar, {
  value: 'onChange',
  currentDate: 'onCurrentDateChange',
  view: 'onViewChange'
}, ['focus']);
