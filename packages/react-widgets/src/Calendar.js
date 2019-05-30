import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import useUncontrollable from 'uncontrollable/hook'

import Widget from './Widget'
import CalendarHeader from './CalendarHeader'
import Month from './Month'
import Year from './Year'
import Decade from './Decade'
import Century from './Century'
import LocalizationProvider from './LocalizationProvider'
import SlideTransitionGroup from './SlideTransitionGroup'
import useFocusManager from './util/useFocusManager'

import * as CustomPropTypes from './util/PropTypes'
import dates from './util/dates'
import { useInstanceId, notify } from './util/widgetHelpers'
import { createEditableCallback } from './util/interaction'

function useAutoFocus(autoFocus, ref) {
  useEffect(() => {
    if (autoFocus) ref.current.focus()
  }, [])
}

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

const useViewState = (views, view = views[0], value, currentDate) => {
  const lastView = useRef(view)
  const lastDate = useRef(currentDate)

  let slideDirection
  if (view !== lastView.current) {
    slideDirection =
      views.indexOf(lastView.current) > views.indexOf(view) ? 'top' : 'bottom'
  } else if (lastDate.current !== currentDate) {
    slideDirection = dates.gt(currentDate, lastDate.current) ? 'left' : 'right'
  }

  const nextCurrent = currentDate || value || new Date()
  useEffect(() => {
    lastDate.current = nextCurrent
    lastView.current = view
  })

  return [view, slideDirection, nextCurrent]
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
function Calendar(uncontrolledProps) {
  const {
    id,
    autoFocus,
    views,
    tabIndex,
    disabled,
    readOnly,
    className,
    value,
    min,
    max,
    onChange,
    onCurrentDateChange,
    onViewChange,
    onKeyDown,
    onNavigate,
    isRtl,
    messages,
    formats,
    view: pView,
    currentDate: pCurrentDate,
  } = useUncontrollable(uncontrolledProps, {
    value: 'onChange',
    currentDate: 'onCurrentDateChange',
    view: 'onViewChange',
  })
  // console.log(value, currentDate, uncontrolledProps)
  const localizer = LocalizationProvider.useLocalizer(messages, formats)
  const ref = useRef()

  const viewId = useInstanceId(id, '_calendar')
  const labelId = useInstanceId(id, '_calendar_label')

  useAutoFocus(autoFocus, ref)

  const [view, slideDirection, currentDate] = useViewState(
    views,
    pView,
    value,
    pCurrentDate,
  )

  const [, focused] = useFocusManager(ref, {
    willHandle() {
      if (tabIndex == -1) return false
    },
  })

  const lastValue = useRef(value)
  useEffect(() => {
    const inValue = inRangeValue(value, min, max)
    const last = lastValue.current
    lastValue.current = value

    if (!dates.eq(inValue, dateOrNull(last), VIEW_UNIT[view]))
      maybeSetCurrentDate(inValue)
  })

  const isDisabled = disabled || readOnly

  // const isValidView = next => views.indexOf(next) !== -1
  /**
   * Handlers
   */
  const useEditableCallback = createEditableCallback(isDisabled, ref)

  const handleViewChange = useEditableCallback(() => {
    navigate('UP')
  })

  const handleMoveBack = useEditableCallback(() => {
    navigate('LEFT')
  })

  const handleMoveForward = useEditableCallback(() => {
    navigate('RIGHT')
  })

  const handleChange = useEditableCallback(date => {
    if (views[0] === view) {
      maybeSetCurrentDate(date)

      notify(onChange, date)

      focus()
      return
    }

    navigate('DOWN', date)
  })

  const handleMoveToday = useEditableCallback(() => {
    let date = new Date()
    let firstView = views[0]

    notify(onChange, date)

    if (dates.inRange(date, min, max, firstView)) {
      focus()
      maybeSetCurrentDate(date)
      notify(onViewChange, [firstView])
    }
  })

  const handleKeyDown = useEditableCallback(e => {
    let ctrl = e.ctrlKey || e.metaKey
    let key = e.key
    let direction = ARROWS_TO_DIRECTION[key]
    let unit = VIEW_UNIT[view]

    if (key === 'Enter') {
      e.preventDefault()
      return handleChange(currentDate)
    }

    if (direction) {
      if (ctrl) {
        e.preventDefault()
        navigate(direction)
      } else {
        if (isRtl && OPPOSITE_DIRECTION[direction])
          direction = OPPOSITE_DIRECTION[direction]

        let nextDate = Calendar.move(currentDate, min, max, view, direction)

        if (!dates.eq(currentDate, nextDate, unit)) {
          e.preventDefault()

          if (dates.gt(nextDate, currentDate, view)) navigate('RIGHT', nextDate)
          else if (dates.lt(nextDate, currentDate, view))
            navigate('LEFT', nextDate)
          else maybeSetCurrentDate(nextDate)
        }
      }
    }

    notify(onKeyDown, [e])
  })

  function navigate(direction, date) {
    let nextView = view
    let slideDir = direction === 'LEFT' || direction === 'UP' ? 'right' : 'left'

    if (direction === 'UP')
      nextView = views[views.indexOf(view) + 1] || nextView

    if (direction === 'DOWN')
      nextView = views[views.indexOf(view) - 1] || nextView

    if (!date)
      date =
        ['LEFT', 'RIGHT'].indexOf(direction) !== -1
          ? nextDate(direction)
          : currentDate

    if (dates.inRange(date, min, max, nextView)) {
      notify(onNavigate, [date, slideDir, nextView])

      //this.focus()
      maybeSetCurrentDate(date)
      notify(onViewChange, [nextView])
    }
  }

  const focus = () => {
    ref.current?.querySelector(FOCUSED_CELL_SELECTOR)?.focus()
  }

  const moveFocus = (node, hadFocus) => {
    let current = document.activeElement

    if (hadFocus && (!current || !node.contains(current))) {
      node.focus()
    }
  }

  function maybeSetCurrentDate(date) {
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

    notify(onCurrentDateChange, inRangeDate)
  }

  function nextDate(direction) {
    let method = direction === 'LEFT' ? 'subtract' : 'add'

    let unit = view === 'month' ? view : 'year'
    let multi = MULTIPLIER[view] || 1

    return dates[method](currentDate, 1 * multi, unit)
  }

  function getHeaderLabel() {
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

  let View = VIEW[view]
  let todayNotInRange = !dates.inRange(new Date(), min, max, view)

  let key = view + '_' + dates[view](currentDate)

  // let elementProps = Props.pickElementProps(this),
  // let viewProps = pick(uncontrolledProps, View)

  const prevDisabled =
    isDisabled || !dates.inRange(nextDate('LEFT'), min, max, view)

  const nextDisabled =
    isDisabled || !dates.inRange(nextDate('RIGHT'), min, max, view)

  return (
    <Widget
      // {...elementProps}
      role="group"
      ref={ref}
      focused={focused}
      disabled={disabled}
      readOnly={readOnly}
      tabIndex={tabIndex || 0}
      className={cn(className, 'rw-calendar rw-widget-container')}
    >
      <CalendarHeader
        isRtl={isRtl}
        label={getHeaderLabel()}
        labelId={labelId}
        localizer={localizer}
        upDisabled={isDisabled || view === last(views)}
        prevDisabled={prevDisabled}
        todayDisabled={disabled || todayNotInRange}
        nextDisabled={nextDisabled}
        onViewChange={handleViewChange}
        onMoveLeft={handleMoveBack}
        onMoveRight={handleMoveForward}
        onMoveToday={handleMoveToday}
      />
      <Calendar.Transition
        direction={slideDirection}
        onTransitionEnd={moveFocus}
      >
        <View
          {...uncontrolledProps}
          key={key}
          id={viewId}
          value={value}
          localizer={localizer}
          disabled={disabled}
          focusedItem={currentDate}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          aria-labelledby={labelId}
        />
      </Calendar.Transition>
    </Widget>
  )
}

function dateOrNull(dt) {
  if (dt && !isNaN(dt.getTime())) return dt
  return null
}

Calendar.displayName = 'Calendar'

Calendar.propTypes = propTypes

Calendar.defaultProps = {
  min: new Date(1900, 0, 1),
  max: new Date(2099, 11, 31),
  views: VIEW_OPTIONS,
  tabIndex: '0',
}

Calendar.Transition = SlideTransitionGroup

Calendar.move = (date, min, max, unit, direction) => {
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

export default Calendar
