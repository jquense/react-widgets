import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import cn from 'classnames'
import uncontrollable from 'uncontrollable'
import { polyfill as polyfillLifecycles } from 'react-lifecycles-compat'
import { autoFocus } from 'react-component-managers'

import Widget from './Widget'
import Header from './Header'
import Footer from './Footer'
import Month from './Month'
import Year from './Year'
import Decade from './Decade'
import Century from './Century'
import { getMessages } from './messages'
import SlideTransitionGroup from './SlideTransitionGroup'
import focusManager from './util/focusManager'

import { date as dateLocalizer } from './util/localizers'
import * as CustomPropTypes from './util/PropTypes'
import * as Props from './util/Props'
import dates from './util/dates'
import { instanceId, notify } from './util/widgetHelpers'
import { widgetEditable } from './util/interaction'

let last = a => a[a.length - 1]

const VIEW_UNIT = {
  month: 'day',
  year: 'month',
  decade: 'year',
  century: 'decade',
}

const VIEW_OPTIONS = ['month', 'year', 'decade', 'century']

const VIEW = {
  month: Month,
  year: Year,
  decade: Decade,
  century: Century,
}

const ARROWS_TO_DIRECTION = {
  ArrowDown: 'DOWN',
  ArrowUp: 'UP',
  ArrowRight: 'RIGHT',
  ArrowLeft: 'LEFT',
}

const OPPOSITE_DIRECTION = {
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
}

const MULTIPLIER = {
  year: 1,
  decade: 10,
  century: 100,
}

function inRangeValue(_value, min, max) {
  let value = dateOrNull(_value)
  if (value === null) return value
  return dates.max(dates.min(value, max), min)
}

const propTypes = {
  /** @ignore */
  activeId: PropTypes.string,

  /**
   * @example ['disabled', ['new Date()']]
   */
  disabled: CustomPropTypes.disabled,
  /**
   * @example ['readOnly', ['new Date()']]
   */
  readOnly: CustomPropTypes.disabled,

  /**
   * @example ['onChangePicker', [ ['new Date()'] ]]
   */
  onChange: PropTypes.func,
  /**
   * @example ['valuePicker', [ ['new Date()'] ]]
   */
  value: PropTypes.instanceOf(Date),

  /**
   * The minimum date that the Calendar can navigate from.
   *
   * @example ['prop', ['min', 'new Date()']]
   */
  min: PropTypes.instanceOf(Date).isRequired,

  /**
   * The maximum date that the Calendar can navigate to.
   *
   * @example ['prop', ['max', 'new Date()']]
   */
  max: PropTypes.instanceOf(Date).isRequired,

  /**
   * Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).
   */
  currentDate: PropTypes.instanceOf(Date),

  /**
   * Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object.
   */
  onCurrentDateChange: PropTypes.func,

  /** Specify the navigate into the past header icon */
  navigatePrevIcon: PropTypes.node,

  /** Specify the navigate into the future header icon */
  navigateNextIcon: PropTypes.node,

  /**
   * Controls the currently displayed calendar view. Use `defaultView` to set a unique starting view.
   *
   * @type {("month"|"year"|"decade"|"century")}
   * @controllable onViewChange
   */
  view(props, ...args) {
    return PropTypes.oneOf(props.views || VIEW_OPTIONS)(props, ...args)
  },

  /**
   * Defines a list of views the Calendar can traverse through, starting with the
   * first in the list to the last.
   *
   * @type array<"month"|"year"|"decade"|"century">
   */
  views: PropTypes.arrayOf(PropTypes.oneOf(VIEW_OPTIONS)).isRequired,

  /**
   * A callback fired when the `view` changes.
   *
   * @controllable view
   */
  onViewChange: PropTypes.func,

  /**
   * Callback fired when the Calendar navigates between views, or forward and backwards in time.
   *
   * @type function(date: ?Date, direction: string, view: string)
   */
  onNavigate: PropTypes.func,
  culture: PropTypes.string,
  autoFocus: PropTypes.bool,

  /**
   * Show or hide the Calendar footer.
   *
   * @example ['prop', ['footer', true]]
   */
  footer: PropTypes.bool,

  /**
   * Provide a custom component to render the days of the month. The Component is provided the following props
   *
   * - `date`: a `Date` object for the day of the month to render
   * - `label`: a formatted `string` of the date to render. To adjust the format of the `label` string use the `dateFormat` prop, listed below.
   */
  dayComponent: CustomPropTypes.elementType,

  /**
   * A formatter for the header button of the month view.
   *
   * @example ['dateFormat', ['headerFormat', "{ date: 'medium' }"]]
   */
  headerFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for the Calendar footer, formats today's Date as a string.
   *
   * @example ['dateFormat', ['footerFormat', "{ date: 'medium' }", "date => 'Today is: ' + formatter(date)"]]
   */
  footerFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter calendar days of the week, the default formats each day as a Narrow name: "Mo", "Tu", etc.
   *
   * @example ['prop', { dayFormat: "day => \n['🎉', 'M', 'T','W','Th', 'F', '🎉'][day.getDay()]" }]
   */
  dayFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for day of the month
   *
   * @example ['prop', { dateFormat: "dt => String(dt.getDate())" }]
   */
  dateFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for month name.
   *
   * @example ['dateFormat', ['monthFormat', "{ raw: 'MMMM' }", null, { defaultView: '"year"' }]]
   */
  monthFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for month name.
   *
   * @example ['dateFormat', ['yearFormat', "{ raw: 'yy' }", null, { defaultView: '"decade"' }]]
   */
  yearFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for decade, the default formats the first and last year of the decade like: 2000 - 2009.
   */
  decadeFormat: CustomPropTypes.dateFormat,

  /**
   * A formatter for century, the default formats the first and last year of the century like: 1900 - 1999.
   */
  centuryFormat: CustomPropTypes.dateFormat,

  isRtl: PropTypes.bool,
  messages: PropTypes.shape({
    moveBack: PropTypes.string,
    moveForward: PropTypes.string,
  }),

  onKeyDown: PropTypes.func,

  /** @ignore */
  tabIndex: PropTypes.any,
}

/**
 * ---
 * localized: true
 * shortcuts:
 *   - { key: ctrl + down arrow, label: navigate to next view }
 *   - { key: ctrl + up arrow, label: navigate to previous view }
 *   - { key: ctrl + left arrow, label: "navigate to previous: month, year, decade, or century" }
 *   - { key: ctrl + right arrow, label: "navigate to next: month, year, decade, or century" }
 *   - { key: left arrow, label:  move focus to previous date}
 *   - { key: right arrow, label: move focus to next date }
 *   - { key: up arrow, label: move focus up within view }
 *   - { key: down key, label: move focus down within view }
 * ---
 *
 * @public
 */
@polyfillLifecycles
class Calendar extends React.Component {
  static displayName = 'Calendar'

  static propTypes = propTypes

  static defaultProps = {
    value: null,
    min: new Date(1900, 0, 1),
    max: new Date(2099, 11, 31),
    views: VIEW_OPTIONS,
    tabIndex: '0',
    footer: true,
  }

  static contextTypes = {
    isRtl: PropTypes.bool,
  }

  static Transition = SlideTransitionGroup

  static move(date, min, max, unit, direction) {
    let isMonth = unit === 'month'
    let isUpOrDown = direction === 'UP' || direction === 'DOWN'
    let rangeUnit = VIEW_UNIT[unit]
    let addUnit = isMonth && isUpOrDown ? 'week' : VIEW_UNIT[unit]
    let amount = isMonth || !isUpOrDown ? 1 : 4
    let newDate

    if (direction === 'UP' || direction === 'LEFT') amount *= -1

    newDate = dates.add(date, amount, addUnit)

    return dates.inRange(newDate, min, max, rangeUnit) ? newDate : date
  }

  constructor(...args) {
    super(...args)

    this.viewId = instanceId(this, '_calendar')
    this.labelId = instanceId(this, '_calendar_label')
    this.activeId =
      this.props.activeId || instanceId(this, '_calendar_active_cell')

    autoFocus(this)

    this.focusManager = focusManager(this, {
      willHandle: this.handleFocusWillChange,
    })

    let { view, views } = this.props
    this.state = {
      selectedIndex: 0,
      view: view || views[0],
    }
  }

  static getDerivedStateFromProps(
    { messages, view, views, value, currentDate },
    prevState
  ) {
    view = view || views[0]
    let { slideDirection, view: lastView, currentDate: lastDate } = prevState

    if (lastView !== view) {
      slideDirection =
        views.indexOf(lastView) > views.indexOf(view) ? 'top' : 'bottom'
    } else if (lastDate !== currentDate) {
      slideDirection = dates.gt(currentDate, lastDate) ? 'left' : 'right'
    }

    return {
      view,
      slideDirection,
      messages: getMessages(messages),
      currentDate: currentDate || value || new Date(),
    }
  }

  componentDidUpdate(prevProps) {
    let { value, min, max } = this.props
    let { view } = this.state
    value = inRangeValue(value, min, max)

    if (!dates.eq(value, dateOrNull(prevProps.value), VIEW_UNIT[view]))
      this.maybeSetCurrentDate(value)
  }

  handleFocusWillChange = () => {
    if (this.props.tabIndex == -1) return false
  }

  @widgetEditable
  handleViewChange = () => {
    this.navigate('UP')
  }

  @widgetEditable
  handleMoveBack = () => {
    this.navigate('LEFT')
  }

  @widgetEditable
  handleMoveForward = () => {
    this.navigate('RIGHT')
  }

  @widgetEditable
  handleChange = date => {
    let { views, onChange } = this.props
    let { view } = this.state

    if (views[0] === view) {
      this.maybeSetCurrentDate(date)

      notify(onChange, date)

      this.focus()
      return
    }

    this.navigate('DOWN', date)
  }

  @widgetEditable
  handleFooterClick = date => {
    let { views, min, max, onViewChange } = this.props

    let firstView = views[0]

    notify(this.props.onChange, date)

    if (dates.inRange(date, min, max, firstView)) {
      this.focus()

      this.maybeSetCurrentDate(date)

      notify(onViewChange, [firstView])
    }
  }

  @widgetEditable
  handleKeyDown = e => {
    let { currentDate, view } = this.state

    let ctrl = e.ctrlKey || e.metaKey
    let key = e.key
    let direction = ARROWS_TO_DIRECTION[key]
    let unit = VIEW_UNIT[view]

    if (key === 'Enter') {
      e.preventDefault()
      return this.handleChange(currentDate)
    }

    if (direction) {
      if (ctrl) {
        e.preventDefault()
        this.navigate(direction)
      } else {
        if (this.isRtl() && OPPOSITE_DIRECTION[direction])
          direction = OPPOSITE_DIRECTION[direction]

        let nextDate = Calendar.move(
          currentDate,
          this.props.min,
          this.props.max,
          view,
          direction
        )

        if (!dates.eq(currentDate, nextDate, unit)) {
          e.preventDefault()

          if (dates.gt(nextDate, currentDate, view))
            this.navigate('RIGHT', nextDate)
          else if (dates.lt(nextDate, currentDate, view))
            this.navigate('LEFT', nextDate)
          else this.maybeSetCurrentDate(nextDate)
        }
      }
    }

    notify(this.props.onKeyDown, [e])
  }

  render() {
    let {
      className,
      value,
      footerFormat,
      disabled,
      readOnly,
      footer,
      views,
      min,
      max,
      culture,
      tabIndex,
    } = this.props

    let { currentDate, view, slideDirection, focused, messages } = this.state

    let View = VIEW[view],
      todaysDate = new Date(),
      todayNotInRange = !dates.inRange(todaysDate, min, max, view)

    let key = view + '_' + dates[view](currentDate)

    let elementProps = Props.pickElementProps(this),
      viewProps = Props.pick(this.props, View)

    let isDisabled = disabled || readOnly

    return (
      <Widget
        {...elementProps}
        role="group"
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
          isRtl={this.isRtl()}
          label={this.getHeaderLabel()}
          labelId={this.labelId}
          messages={messages}
          upDisabled={isDisabled || view === last(views)}
          prevDisabled={
            isDisabled || !dates.inRange(this.nextDate('LEFT'), min, max, view)
          }
          nextDisabled={
            isDisabled || !dates.inRange(this.nextDate('RIGHT'), min, max, view)
          }
          onViewChange={this.handleViewChange}
          onMoveLeft={this.handleMoveBack}
          onMoveRight={this.handleMoveForward}
        />
        <Calendar.Transition direction={slideDirection}>
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
        </Calendar.Transition>
        {footer && (
          <Footer
            value={todaysDate}
            format={footerFormat}
            culture={culture}
            disabled={disabled || todayNotInRange}
            readOnly={readOnly}
            onClick={this.handleFooterClick}
          />
        )}
      </Widget>
    )
  }

  navigate(direction, date) {
    let { views, min, max, onNavigate, onViewChange } = this.props
    let { view, currentDate } = this.state

    let slideDir = direction === 'LEFT' || direction === 'UP' ? 'right' : 'left'

    if (direction === 'UP') view = views[views.indexOf(view) + 1] || view

    if (direction === 'DOWN') view = views[views.indexOf(view) - 1] || view

    if (!date)
      date =
        ['LEFT', 'RIGHT'].indexOf(direction) !== -1
          ? this.nextDate(direction)
          : currentDate

    if (dates.inRange(date, min, max, view)) {
      notify(onNavigate, [date, slideDir, view])

      this.focus(true)
      this.maybeSetCurrentDate(date)
      notify(onViewChange, [view])
    }
  }

  focus() {
    if (+this.props.tabIndex > -1) findDOMNode(this).focus()
  }

  maybeSetCurrentDate(date) {
    const { min, max } = this.props
    const { view, currentDate } = this.state

    let inRangeDate = inRangeValue(
      date ? new Date(date) : currentDate,
      min,
      max
    )

    if (
      date === currentDate ||
      dates.eq(inRangeDate, dateOrNull(currentDate), VIEW_UNIT[view])
    )
      return

    notify(this.props.onCurrentDateChange, inRangeDate)
  }

  nextDate(direction) {
    let method = direction === 'LEFT' ? 'subtract' : 'add'
    let { currentDate, view } = this.state
    let unit = view === 'month' ? view : 'year'
    let multi = MULTIPLIER[view] || 1

    return dates[method](currentDate, 1 * multi, unit)
  }

  getHeaderLabel() {
    let {
      culture,
      decadeFormat,
      yearFormat,
      headerFormat,
      centuryFormat,
    } = this.props
    let { currentDate, view } = this.state

    switch (view) {
      case 'month':
        headerFormat = dateLocalizer.getFormat('header', headerFormat)
        return dateLocalizer.format(currentDate, headerFormat, culture)

      case 'year':
        yearFormat = dateLocalizer.getFormat('year', yearFormat)
        return dateLocalizer.format(currentDate, yearFormat, culture)

      case 'decade':
        decadeFormat = dateLocalizer.getFormat('decade', decadeFormat)
        return dateLocalizer.format(
          dates.startOf(currentDate, 'decade'),
          decadeFormat,
          culture
        )
      case 'century':
        centuryFormat = dateLocalizer.getFormat('century', centuryFormat)
        return dateLocalizer.format(
          dates.startOf(currentDate, 'century'),
          centuryFormat,
          culture
        )
    }
  }
  isRtl() {
    return !!(this.props.isRtl || (this.context && this.context.isRtl))
  }

  isValidView(next, views = this.props.views) {
    return views.indexOf(next) !== -1
  }
}

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt
  return null
}

export default uncontrollable(
  Calendar,
  {
    value: 'onChange',
    currentDate: 'onCurrentDateChange',
    view: 'onViewChange',
  },
  ['focus']
)
