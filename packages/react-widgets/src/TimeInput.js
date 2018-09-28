import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import qsa from 'dom-helpers/query/querySelectorAll'
import uncontrollable from 'uncontrollable'

import dates from './util/dates'
import focusManager from './util/focusManager'
import { widgetEditable } from './util/interaction'
import Button from './Button'
import Widget from './Widget'
import { times } from './Icon'

const select = el => {
  if (el.select) return el.select()
  var range = document.createRange()
  range.selectNodeContents(el)
  window.getSelection().removeAllRanges()
  window.getSelection().addRange(range)
}
const padStart = (str, len, pad) => {
  str = String(str == null ? '' : str)
  while (str.length < len) str = pad + str
  return str
}

// prettier-ignore
const isEmptyValue = (p, precision) =>
  p.hours == null &&
  p.minutes == null &&
  ((precision != 'seconds' && precision !== 'milliseconds') || p.seconds == null) &&
  (precision !== 'milliseconds' || p.milliseconds == null);

// prettier-ignore
const isPartialValue = (p, precision) =>
  p.hours == null ||
  p.minutes == null ||
  ((precision === 'seconds' || precision === 'milliseconds') && p.seconds == null) ||
  ( precision === 'milliseconds' && p.milliseconds == null);

const getValueParts = (value, use12HourClock) => {
  let hours, minutes, seconds, milliseconds
  let meridiem = 'AM'

  if (value) {
    hours = value.getHours()
    if (use12HourClock) {
      meridiem = hours < 12 ? 'AM' : 'PM'
      hours = hours % 12 || 12
    }

    minutes = value.getMinutes()
    seconds = value.getSeconds()
    milliseconds = value.getMilliseconds()
  }

  return { hours, minutes, seconds, milliseconds, meridiem }
}

const TESTS = {
  hours: /^([1]?[0-9]|2[0-3])$/,
  hours12: /^^(1[0-2]|0?[1-9])$$/,
  minutes: /^([0-5]?\d)$/,
  seconds: /^([0-5]?\d)$/,
  milliseconds: /^(\d{1,3})$/,
}
const isValid = (value, part, use12HourClock) => {
  if (part === 'hours') part = !use12HourClock ? 'hours' : 'hours12'
  return TESTS[part].test(value)
}

/* eslint-disable react/prop-types */
const TimePartInput = ({
  value,
  pad,
  innerRef,
  placeholder,
  min,
  max,
  emptyChar,
  ...props
}) => (
  <input
    {...props}
    ref={innerRef}
    data-focusable
    autoComplete="off"
    role="spinbutton"
    aria-valuenow={value}
    aria-valuemin={min}
    aria-valuemax={max}
    aria-valuetext={value == null ? '' : value}
    // seems readonly is not valid
    aria-disabled={props.disabled || props.readOnly}
    placeholder={placeholder}
    className="rw-input-reset rw-time-part-input"
    value={
      placeholder && !value
        ? ''
        : padStart(value, pad || 0, value == null ? emptyChar : '0')
    }
  />
)
/* eslint-enable react/prop-types */

class DurationInput extends React.Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,

    /**
     * The defualt date used to construct a new time when the `value` is empty
     *
     * @default new Date()
     **/
    datePart: PropTypes.instanceOf(Date),

    /**
     * Use a 12 hour clock (with AM/PM) instead of 24 hour one.
     * The configured localizer may provide a default value .
     **/
    use12HourClock: PropTypes.bool,

    /** Time part values will be padded by `0` */
    padValues: PropTypes.bool,

    /** The string character used to pad empty, or cleared values */
    emptyCharacter: PropTypes.string,

    /** Hide the input clear button */
    noClearButton: PropTypes.bool,

    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

    /** Controls how precise of a time can be input **/
    precision: PropTypes.oneOf(['minutes', 'seconds', 'milliseconds'])
      .isRequired,

    /**
     * The seperator between hours and minutes
     * @default ':'
     */
    hoursAddon: PropTypes.node.isRequired,

    /**
     * The seperator between hours and minutes
     * @default ':'
     */
    minutesAddon: PropTypes.node.isRequired,

    /**
     * The seperator between hours and minutes
     * @default ':'
     */
    secondsAddon: PropTypes.node.isRequired,

    /**
     * The seperator between hours and minutes
     * @default '.'
     */
    millisecondsAddon: PropTypes.node.isRequired,
  }

  static defaultProps = {
    hoursAddon: ':',
    padValues: true,
    precision: 'minutes',
    emptyCharacter: '-',
  }

  state = {}

  width = 34

  ref = React.createRef()
  secRef = React.createRef()
  minRef = React.createRef()
  hourRef = React.createRef()

  focusManager = focusManager(this, {
    didHandle: (focused, e) => {
      if (!focused) return
      if (!e.target.dataset.focusable) this.hourRef.current?.focus()
      else this.select(e.target)
    },
  })

  static getDerivedStateFromProps({ value, use12HourClock }, prevState) {
    if (
      prevState.timeParts &&
      prevState.value === value &&
      prevState.use12HourClock === use12HourClock
    )
      return null

    return {
      value,
      use12HourClock,
      timeParts: getValueParts(value, use12HourClock),
    }
  }

  getDatePart() {
    return dates.startOf(this.props.datePart || dates.today(), 'day')
  }

  getMin = part => (part === 'hours' ? 1 : 0)

  getMax = part => {
    if (part === 'hours') return this.props.use12HourClock ? 12 : 23
    if (part === 'milliseconds') return 999
    return 59
  }

  @widgetEditable
  handleClear = () => {
    const { value, onChange } = this.props
    this.hourRef.current?.focus()
    value ? onChange(null) : this.setState({ timeParts: getValueParts(null) })
  }

  handleChange = (part, event) => {
    const { use12HourClock } = this.props
    const currentValue = this.state.timeParts[part]

    const { target } = event
    const strValue = `${currentValue || ''}${target.value.replace(/^0+/, '')}`
    const numValue = +strValue

    this.select(target)

    if (
      isNaN(numValue) ||
      (strValue && !isValid(strValue, part, use12HourClock))
    ) {
      return event.preventDefault()
    }

    this.notifyChange({ [part]: target.value ? numValue : null })
  }

  select = (target = document.activeElement) => {
    window.Promise.resolve().then(() => {
      this.state.focused && select(target)
    })
  }

  handleSelect = ({ target }) => {
    this.select(target)
  }

  handleKeyDown = (part, event) => {
    const { key, target: input } = event
    const { selectionStart: start, selectionEnd: end } = input

    const isMeridiem = part === 'meridiem'

    if (key === 'ArrowUp') {
      event.preventDefault()
      this.increment(part, 1)
    }
    if (key === 'ArrowDown') {
      event.preventDefault()
      this.increment(part, -1)
    }
    if (key === 'ArrowLeft' && (isMeridiem || start - 1 < 0)) {
      event.preventDefault()
      this.focusNext(input, -1)
    }
    if (key === 'ArrowRight' && (isMeridiem || input.value.length <= end + 1)) {
      event.preventDefault()
      this.focusNext(input, +1)
    }

    if (this.props.readOnly && key !== 'Tab') {
      event.preventDefault()
    }

    if (isMeridiem) {
      if (key === 'a' || key === 'A') this.notifyChange({ meridiem: 'AM' })
      if (key === 'p' || key === 'P') this.notifyChange({ meridiem: 'PM' })
    }
  }

  @widgetEditable
  increment(part, inc) {
    const { use12HourClock } = this.props
    const { timeParts } = this.state
    let nextPart = timeParts[part]
    if (part === 'meridiem') {
      nextPart = nextPart === 'AM' ? 'PM' : 'AM'
    } else {
      nextPart = (nextPart || 0) + inc
      if (!isValid(String(nextPart), part, use12HourClock)) return
    }

    this.notifyChange({ [part]: nextPart })
    this.select()
  }

  notifyChange(updates) {
    const timeParts = { ...this.state.timeParts, ...updates }
    const { precision, value, use12HourClock, onChange } = this.props

    if (value && isEmptyValue(timeParts, precision)) return onChange(null)

    if (isPartialValue(timeParts, precision))
      return this.setState({ timeParts })

    let { hours, minutes, seconds, milliseconds, meridiem } = timeParts
    let nextDate = new Date(value || this.getDatePart())
    if (use12HourClock) {
      if (hours === 12) hours = 0
      hours += meridiem === 'PM' ? 12 : 0
    }

    nextDate.setHours(hours)
    nextDate.setMinutes(minutes)
    seconds != null && nextDate.setSeconds(seconds)
    milliseconds != null && nextDate.setMilliseconds(milliseconds)

    onChange(nextDate)
  }

  focusNext(input, delta) {
    let nodes = qsa(this.ref.current, '* [data-focusable="true"]')
    let next = nodes[nodes.indexOf(input) + delta]
    next?.focus()
    this.select(next)
  }

  render() {
    const {
      padValues: pad,
      emptyCharacter,
      use12HourClock,
      precision,
      noClearButton,
      hoursAddon,
      minutesAddon = precision === 'seconds' || precision === 'milliseconds'
        ? ':'
        : '',
      secondsAddon = precision === 'milliseconds' ? '.' : '',
      millisecondsAddon,
      className,
      disabled,
      readOnly,
      ...props
    } = this.props
    const { focused, timeParts } = this.state
    const { hours, minutes, seconds, milliseconds, meridiem } = timeParts
    const showClear = !isEmptyValue(timeParts, precision)

    delete props.onChange

    return (
      <Widget
        role="textbox"
        ref={this.ref}
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        focused={focused}
        disabled={disabled}
        readOnly={readOnly}
        className={classNames(
          className,
          'rw-input',
          'rw-time-input',
          'rw-widget-container',
        )}
      >
        <TimePartInput
          size={2}
          pad={pad && 2}
          value={hours}
          disabled={disabled}
          readOnly={readOnly}
          aria-label="hours"
          min={this.getMin('hours')}
          max={this.getMax('hours')}
          innerRef={this.hourRef}
          emptyChar={emptyCharacter}
          onSelect={this.handleSelect}
          onChange={this.handleChange.bind(null, 'hours')}
          onKeyDown={this.handleKeyDown.bind(null, 'hours')}
        />

        {hoursAddon && <span>{hoursAddon}</span>}
        <TimePartInput
          size={2}
          pad={pad && 2}
          value={minutes}
          disabled={disabled}
          readOnly={readOnly}
          aria-label="minutes"
          innerRef={this.minRef}
          min={this.getMin('minutes')}
          max={this.getMax('minutes')}
          emptyChar={emptyCharacter}
          onSelect={this.handleSelect}
          onChange={this.handleChange.bind(null, 'minutes')}
          onKeyDown={this.handleKeyDown.bind(null, 'minutes')}
        />

        {minutesAddon && <span>{minutesAddon}</span>}
        {(precision === 'seconds' || precision === 'milliseconds') && (
          <>
            <TimePartInput
              size={2}
              pad={pad && 2}
              value={seconds}
              disabled={disabled}
              readOnly={readOnly}
              aria-label="seconds"
              min={this.getMin('seconds')}
              max={this.getMax('seconds')}
              innerRef={this.secRef}
              emptyChar={emptyCharacter}
              onSelect={this.handleSelect}
              onChange={this.handleChange.bind(null, 'seconds')}
              onKeyDown={this.handleKeyDown.bind(null, 'seconds')}
            />
            {secondsAddon && <span>{secondsAddon}</span>}
          </>
        )}
        {precision === 'milliseconds' && (
          <>
            <TimePartInput
              size={3}
              pad={pad && 3}
              value={milliseconds}
              disabled={disabled}
              readOnly={readOnly}
              aria-label="milliseconds"
              min={this.getMin('milliseconds')}
              max={this.getMax('milliseconds')}
              innerRef={this.secRef}
              emptyChar={emptyCharacter}
              onSelect={this.handleSelect}
              onChange={this.handleChange.bind(null, 'milliseconds')}
              onKeyDown={this.handleKeyDown.bind(null, 'milliseconds')}
            />
            {millisecondsAddon && <span>{millisecondsAddon}</span>}
          </>
        )}
        {use12HourClock && (
          <div
            role="listbox"
            aria-label="AM/PM"
            aria-disabled={disabled}
            aria-readonly={readOnly}
            onKeyDown={this.handleKeyDown.bind(null, 'meridiem')}
            className="rw-input-reset rw-time-part-meridiem"
          >
            <div
              data-focusable
              tabIndex="0"
              role="option"
              aria-atomic
              aria-selected
              aria-setsize="2"
              aria-live="assertive"
              aria-disabled={disabled}
              aria-readonly={readOnly}
              aria-posinset={meridiem === 'AM' ? 1 : 2}
              onFocus={this.handleSelect}
              onSelect={this.handleSelect}
            >
              <abbr>{meridiem}</abbr>
            </div>
          </div>
        )}
        {!noClearButton && (
          <Button
            variant={null}
            label={'clear input'}
            onClick={this.handleClear}
            className={classNames(
              'rw-time-input-clear',
              showClear && 'rw-show',
            )}
          >
            {times}
          </Button>
        )}
      </Widget>
    )
  }
}

export default uncontrollable(DurationInput, { value: 'onChange' })
