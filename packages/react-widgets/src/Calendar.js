import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import uncontrollable from 'uncontrollable'
import { autoFocus } from 'react-component-managers'

import Widget from './Widget'
import CalendarHeader from './CalendarHeader'
import Month from './Month'
import Year from './Year'
import Decade from './Decade'
import Century from './Century'
import LocalizationProvider from './LocalizationProvider'
import SlideTransitionGroup from './SlideTransitionGroup'
import focusManager from './util/focusManager'

import * as CustomPropTypes from './util/PropTypes'
import * as Props from './util/Props'
import dates from './util/dates'
import { instanceId, notify } from './util/widgetHelpers'
import { widgetEditable } from './util/interaction'

let last = a => a[a.length - 1]

const CELL_CLASSNAME = 'rw-cell'
const FOCUSED_CELL_SELECTOR = `.${CELL_CLASSNAME}[tabindex]`

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

  formats: PropTypes.shape({
    /**
     * A formatter for the header button of the month view.
     *
     * @example ['dateFormat', ['headerFormat', "{ date: 'medium' }"]]
     */
    header: CustomPropTypes.dateFormat,

    /**
     * A formatter for the Calendar footer, formats today's Date as a string.
     *
     * @example ['dateFormat', ['footerFormat', "{ date: 'medium' }", "date => 'Today is: ' + formatter(date)"]]
     */
    footer: CustomPropTypes.dateFormat,

    /**
     * A formatter calendar days of the week, the default formats each day as a Narrow name: "Mo", "Tu", etc.
     *
     * @example ['prop', { day: "day => \n['🎉', 'M', 'T','W','Th', 'F', '🎉'][day.getDay()]" }]
     */
    day: CustomPropTypes.dateFormat,

    /**
     * A formatter for day of the month
     *
     * @example ['prop', { date: "dt => String(dt.getDate())" }]
     */
    date: CustomPropTypes.dateFormat,

    /**
     * A formatter for month name.
     *
     * @example ['dateFormat', ['monthFormat', "{ raw: 'MMMM' }", null, { defaultView: '"year"' }]]
     */
    month: CustomPropTypes.dateFormat,

    /**
     * A formatter for month name.
     *
     * @example ['dateFormat', ['yearFormat', "{ raw: 'yy' }", null, { defaultView: '"decade"' }]]
     */
    year: CustomPropTypes.dateFormat,

    /**
     * A formatter for decade, the default formats the first and last year of the decade like: 2000 - 2009.
     */
    decade: CustomPropTypes.dateFormat,

    /**
     * A formatter for century, the default formats the first and last year of the century like: 1900 - 1999.
     */
    century: CustomPropTypes.dateFormat,
  }),

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

    this.viewRef = React.createRef()
    this.ref = React.createRef()

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
    { view, views, value, currentDate },
    prevState,
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
  handleMoveToday = () => {
    let { views, min, max, onViewChange } = this.props
    let date = new Date()

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

    // TODO: should be in
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
          direction,
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
      disabled,
      readOnly,
      views,
      min,
      max,
      tabIndex,
      localizer,
    } = this.props

    let { currentDate, view, slideDirection, focused } = this.state

    let View = VIEW[view]
    let todayNotInRange = !dates.inRange(new Date(), min, max, view)

    let key = view + '_' + dates[view](currentDate)

    let elementProps = Props.pickElementProps(this),
      viewProps = Props.pick(this.props, View)

    let isDisabled = disabled || readOnly

    return (
      <Widget
        {...elementProps}
        role="group"
        ref={this.ref}
        focused={focused}
        disabled={disabled}
        readOnly={readOnly}
        tabIndex={tabIndex || 0}
        className={cn(className, 'rw-calendar rw-widget-container')}
        aria-activedescendant={this.activeId}
      >
        <CalendarHeader
          isRtl={this.isRtl()}
          label={this.getHeaderLabel()}
          labelId={this.labelId}
          localizer={localizer}
          upDisabled={isDisabled || view === last(views)}
          prevDisabled={
            isDisabled || !dates.inRange(this.nextDate('LEFT'), min, max, view)
          }
          todayDisabled={disabled || todayNotInRange}
          nextDisabled={
            isDisabled || !dates.inRange(this.nextDate('RIGHT'), min, max, view)
          }
          onViewChange={this.handleViewChange}
          onMoveLeft={this.handleMoveBack}
          onMoveRight={this.handleMoveForward}
          onMoveToday={this.handleMoveToday}
        />
        <Calendar.Transition
          direction={slideDirection}
          onTransitionStart={this.moveFocus}
        >
          <View
            {...viewProps}
            key={key}
            id={this.viewId}
            activeId={this.activeId}
            value={value}
            disabled={disabled}
            focusedItem={currentDate}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            aria-labelledby={this.labelId}
          />
        </Calendar.Transition>
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

      //this.focus()
      this.maybeSetCurrentDate(date)
      notify(onViewChange, [view])
    }
  }

  focus = () => {
    this.ref.current?.querySelector(FOCUSED_CELL_SELECTOR)?.focus()
  }

  moveFocus = node => {
    let listitem = node.querySelector(FOCUSED_CELL_SELECTOR)
    let current = document.activeElement

    if (listitem && (!current || current.classList.contains(CELL_CLASSNAME))) {
      listitem.focus()
    }
  }

  maybeSetCurrentDate(date) {
    const { min, max } = this.props
    const { view, currentDate } = this.state

    let inRangeDate = inRangeValue(
      date ? new Date(date) : currentDate,
      min,
      max,
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
    let { localizer } = this.props
    let { currentDate, view } = this.state

    switch (view) {
      case 'month':
        return localizer.formatDate(currentDate, 'header')

      case 'year':
        return localizer.formatDate(currentDate, 'year')

      case 'decade':
        return localizer.formatDate(
          dates.startOf(currentDate, 'decade'),
          'decade',
        )
      case 'century':
        return localizer.formatDate(
          dates.startOf(currentDate, 'century'),
          'century',
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

export default uncontrollable(LocalizationProvider.withLocalizer(Calendar), {
  value: 'onChange',
  currentDate: 'onCurrentDateChange',
  view: 'onViewChange',
})
