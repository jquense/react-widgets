import classNames from 'classnames'
import qsa from 'dom-helpers/querySelectorAll'
import PropTypes from 'prop-types'
import React, { useCallback, useRef, useState } from 'react'
import { useUncontrolled } from 'uncontrollable'
import Button from './Button'
import DateTimePartInput from './DateTimePartInput'
import { times } from './Icon'
import Widget, { WidgetProps } from './Widget'
import dates from './dates'
import useFocusManager from './useFocusManager'

type Meridiem = 'AM' | 'PM'

interface DateParts {
  era: Meridiem
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
}

interface TimeParts {
  meridiem: Meridiem
  hours?: number
  minutes?: number
  seconds?: number
  milliseconds?: number
}

type TimePart = keyof TimeParts

const selectTextRange = (el: HTMLInputElement | HTMLDivElement) => {
  if (el instanceof HTMLInputElement) return el.select()
  const range = document.createRange()
  range.selectNodeContents(el)
  const selection = window.getSelection()
  if (selection) {
    selection.removeAllRanges()
    selection.addRange(range)
  }
}

// prettier-ignore
const isEmptyValue = (p: TimeParts, precision: TimePart) =>
  p.hours == null &&
  p.minutes == null &&
  ((precision != 'seconds' && precision !== 'milliseconds') || p.seconds == null) &&
  (precision !== 'milliseconds' || p.milliseconds == null);

// prettier-ignore
const isPartialValue = (p: TimeParts, precision: TimePart) =>
  p.hours == null ||
  p.minutes == null ||
  ((precision === 'seconds' || precision === 'milliseconds') && p.seconds == null) ||
  (precision === 'milliseconds' && p.milliseconds == null);

const getValueParts = (
  value?: Date | null,
  use12HourClock?: boolean,
): TimeParts => {
  let hours, minutes, seconds, milliseconds
  let meridiem: Meridiem = 'AM'

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

const TEST_VALID = {
  hours: /^([1]?[0-9]|2[0-3])$/,
  hours12: /^(1[0-2]|0?[1-9])$/,
  minutes: /^([0-5]?\d)$/,
  seconds: /^([0-5]?\d)$/,
  milliseconds: /^(\d{1,3})$/,
}

const TEST_COMPLETE = {
  hours: /^([3-9]|\d{2})$/,
  hours12: /^(\d{2}|[2-9])$/,
  minutes: /^(d{2}|[6-9])$/,
  seconds: /^(d{2}|[6-9])$/,
  milliseconds: /^(\d{3})$/,
}

function testPart(
  value: string,
  part: TimePart,
  use12HourClock: boolean,
  tests: Record<keyof typeof TEST_VALID, RegExp>,
) {
  const key =
    part === 'hours' && use12HourClock
      ? 'hours12'
      : (part as keyof typeof tests)
  return tests[key].test(value)
}

const isValid = (value: string, part: TimePart, use12HourClock: boolean) =>
  testPart(value, part, use12HourClock, TEST_VALID)

const isComplete = (value: string, part: TimePart, use12HourClock: boolean) =>
  testPart(value, part, use12HourClock, TEST_COMPLETE)

export interface TimeInputProps
  extends Omit<WidgetProps, 'value' | 'onChange' | 'defaultValue'> {
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date | null, ctx?: any) => void
  datePart?: Date
  use12HourClock?: boolean
  padValues?: boolean
  emptyCharacter?: string
  noClearButton?: boolean
  disabled?: boolean
  readOnly?: boolean
  precision: 'minutes' | 'seconds' | 'milliseconds'
  hoursAddon?: React.ReactNode
  minutesAddon?: React.ReactNode
  secondsAddon?: React.ReactNode
  millisecondsAddon?: React.ReactNode
}

const propTypes = {
  /**
   * @example ['valuePicker', [ ['new Date()'] ]]
   */
  value: PropTypes.instanceOf(Date),

  /**
   * @example ['valuePicker', [ ['new Date()'] ]]
   */
   defaultValue: PropTypes.instanceOf(Date),

  /**
   * @example ['onChangePicker', [ ['new Date()'] ]]
   */
  onChange: PropTypes.func,

  /**
   * The default date used to construct a new time when the `value` is empty
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

  /**
   * @example ['disabled', ['new Date()']]
   */
  disabled: PropTypes.bool,

  /**
   * @example ['readOnly', ['new Date()']]
   */
  readOnly: PropTypes.bool,

  /** Controls how precise of a time can be input **/
  precision: PropTypes.oneOf(['minutes', 'seconds', 'milliseconds']).isRequired,

  /**
   * The seperator between hours and minutes
   * @default ':'
   */
  hoursAddon: PropTypes.node,

  /**
   * The seperator between hours and minutes
   * @default ':'
   */
  minutesAddon: PropTypes.node,

  /**
   * The seperator between hours and minutes
   * @default ':'
   */
  secondsAddon: PropTypes.node,

  /**
   * The seperator between hours and minutes
   * @default '.'
   */
  millisecondsAddon: PropTypes.node,
}

const defaultProps = {
  hoursAddon: ':',
  padValues: true,
  precision: 'minutes',
  emptyCharacter: '-',
}

interface TimePartState {
  value: Date | null
  use12HourClock: boolean
  timeParts: TimeParts
}

// let count = 0
function useTimePartState(value: Date | null, use12HourClock: boolean) {
  const [state, setState] = useState<TimePartState>(() => ({
    value,
    use12HourClock,
    timeParts: getValueParts(value, use12HourClock),
  }))

  const setTimeParts = useCallback(
    (timeParts: TimeParts) => setState((s) => ({ ...s, timeParts })),
    [setState],
  )

  if (state.value !== value || state.use12HourClock !== use12HourClock) {
    // count++
    // if (count < 100)
    setState({
      value,
      use12HourClock,
      timeParts: getValueParts(value, use12HourClock),
    })
  }

  return [state.timeParts, setTimeParts] as const
}

function TimeInput(uncontrolledProps: TimeInputProps) {
  const {
    value,
    use12HourClock,
    padValues: pad,
    emptyCharacter,
    precision,
    noClearButton,
    hoursAddon,
    minutesAddon,
    secondsAddon,
    millisecondsAddon,
    className,
    disabled,
    readOnly,
    datePart,
    onChange,
    onBlur,
    onFocus,
    ...props
  } = useUncontrolled(uncontrolledProps, { value: 'onChange' })

  let minsAddon =
    minutesAddon !== undefined
      ? minutesAddon
      : precision === 'seconds' || precision === 'milliseconds'
      ? ':'
      : ''
  let secsAddon =
    secondsAddon !== undefined
      ? secondsAddon
      : precision === 'milliseconds'
      ? ':'
      : ''

  const ref = useRef<HTMLDivElement>(null)
  const hourRef = useRef<HTMLInputElement>(null)

  const [focusEvents, focused] = useFocusManager(
    ref,
    { disabled, onBlur, onFocus },
    {
      didHandle: (focused, e: React.FocusEvent<HTMLElement>) => {
        if (!focused) return
        if (!e.target.dataset.focusable) hourRef.current?.focus()
        else select(e.target as HTMLInputElement)
      },
    },
  )

  const [timeParts, setTimeParts] = useTimePartState(
    value ?? null,
    use12HourClock ?? false,
  )

  function getDatePart() {
    return dates.startOf(datePart || new Date(), 'day')
  }

  const getMin = (part: TimePart) => (part === 'hours' ? 1 : 0)

  const getMax = (part: TimePart) => {
    if (part === 'hours') return use12HourClock ? 12 : 23
    if (part === 'milliseconds') return 999
    return 59
  }

  function select(
    target: HTMLInputElement = document.activeElement as HTMLInputElement,
  ) {
    window.Promise.resolve().then(() => {
      if (focused) selectTextRange(target)
    })
  }

  /**
   * Handlers
   */

  const handleClear = () => {
    hourRef.current?.focus()

    if (value) onChange!(null)
    else setTimeParts(getValueParts(null))
  }

  const handleChange = (
    part: TimePart,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const currentValue = timeParts[part]

    const { target } = event
    const rawValue = target.value
    let strValue = `${currentValue || ''}${rawValue}`
    let numValue = +strValue

    if (
      isNaN(numValue) ||
      (strValue && !isValid(strValue, part, use12HourClock ?? false))
    ) {
      // the combined value is now past the max or invalid so try the single
      // digit and "start over" filling the value
      if (
        isValid(rawValue, part, use12HourClock ?? false) &&
        !isNaN(+rawValue)
      ) {
        // change the effective current value
        strValue = rawValue
        numValue = +rawValue
      } else {
        return event.preventDefault()
      }
    }

    const nextValue = target.value ? numValue : null

    notifyChange({ [part]: nextValue })

    if (
      nextValue != null &&
      isComplete(strValue, part, use12HourClock ?? false)
    ) {
      focusNext(event.currentTarget, +1)
    } else {
      select(target)
    }
  }

  const handleSelect = ({
    target,
  }:
    | React.SyntheticEvent<HTMLInputElement | HTMLDivElement>
    | React.FocusEvent<HTMLInputElement | HTMLDivElement>) => {
    select(target as HTMLInputElement)
  }

  const handleKeyDown = (
    part: TimePart,
    event: React.KeyboardEvent<HTMLInputElement | HTMLDivElement>,
  ) => {
    const { key } = event
    const input = event.currentTarget as HTMLInputElement
    const { selectionStart: start, selectionEnd: end } = input

    const isRTL =
      getComputedStyle(input).getPropertyValue('direction') === 'rtl'
    const isMeridiem = part === 'meridiem'
    const isNext = key === (isRTL ? 'ArrowLeft' : 'ArrowRight')
    const isPrev = key === (isRTL ? 'ArrowRight' : 'ArrowLeft')

    if (key === 'ArrowUp') {
      event.preventDefault()
      increment(part, 1)
    }
    if (key === 'ArrowDown') {
      event.preventDefault()
      increment(part, -1)
    }
    if (isPrev && (isMeridiem || start! - 1 < 0)) {
      event.preventDefault()
      focusNext(input, -1)
    }
    if (isNext && (isMeridiem || input.value.length <= end! + 1)) {
      event.preventDefault()
      focusNext(input, +1)
    }

    if (readOnly && key !== 'Tab') {
      event.preventDefault()
    }

    if (isMeridiem) {
      if (key === 'a' || key === 'A') notifyChange({ meridiem: 'AM' })
      if (key === 'p' || key === 'P') notifyChange({ meridiem: 'PM' })
    }
  }

  const increment = (part: TimePart, inc: number) => {
    let nextPart = timeParts[part]
    if (part === 'meridiem') {
      nextPart = nextPart === 'AM' ? 'PM' : 'AM'
    } else {
      nextPart = ((nextPart as number) || 0) + inc
      if (!isValid(String(nextPart), part, use12HourClock ?? false)) return
    }

    notifyChange({ [part]: nextPart })
    select()
  }

  function notifyChange(updates: Partial<TimeParts>) {
    const nextTimeParts: TimeParts = { ...timeParts, ...updates }

    if (value && isEmptyValue(nextTimeParts, precision)) {
      return onChange!(null)
    }

    if (isPartialValue(nextTimeParts, precision))
      return setTimeParts(nextTimeParts)

    let { hours, minutes, seconds, milliseconds, meridiem } = nextTimeParts
    let nextDate = new Date(value || getDatePart())

    if (use12HourClock) {
      if (hours === 12) hours = 0
      hours! += meridiem === 'PM' ? 12 : 0
    }

    nextDate.setHours(hours!)
    nextDate.setMinutes(minutes!)

    if (seconds != null) nextDate.setSeconds(seconds)
    if (milliseconds != null) nextDate.setMilliseconds(milliseconds)

    onChange!(nextDate, {
      lastValue: value,
      timeParts,
    })
  }

  function focusNext(input: HTMLInputElement, delta: number) {
    let nodes = qsa(ref.current!, '* [data-focusable]')
    let next = nodes[nodes.indexOf(input) + delta]
    next?.focus()
    select(next as HTMLInputElement)
  }

  const { hours, minutes, seconds, milliseconds, meridiem } = timeParts
  const showClear = !isEmptyValue(timeParts, precision)

  return (
    <Widget
      {...props}
      defaultValue={undefined}
      role="group"
      ref={ref}
      {...focusEvents}
      focused={focused}
      disabled={disabled}
      readOnly={readOnly}
      className={classNames(className, 'rw-time-input rw-widget-input')}
    >
      <DateTimePartInput
        size={2}
        pad={pad ? 2 : undefined}
        value={hours}
        disabled={disabled}
        readOnly={readOnly}
        aria-label="hours"
        min={getMin('hours')}
        max={getMax('hours')}
        ref={hourRef}
        emptyChar={emptyCharacter}
        onSelect={handleSelect}
        onChange={(e) => handleChange('hours', e)}
        onKeyDown={(e) => handleKeyDown('hours', e)}
      />

      {hoursAddon && <span>{hoursAddon}</span>}
      <DateTimePartInput
        size={2}
        pad={pad ? 2 : undefined}
        value={minutes}
        disabled={disabled}
        readOnly={readOnly}
        aria-label="minutes"
        min={getMin('minutes')}
        max={getMax('minutes')}
        emptyChar={emptyCharacter}
        onSelect={handleSelect}
        onChange={(e) => handleChange('minutes', e)}
        onKeyDown={(e) => handleKeyDown('minutes', e)}
      />

      {minsAddon && <span>{minsAddon}</span>}
      {(precision === 'seconds' || precision === 'milliseconds') && (
        <>
          <DateTimePartInput
            size={2}
            pad={pad ? 2 : undefined}
            value={seconds}
            disabled={disabled}
            readOnly={readOnly}
            aria-label="seconds"
            min={getMin('seconds')}
            max={getMax('seconds')}
            emptyChar={emptyCharacter}
            onSelect={handleSelect}
            onChange={(e) => handleChange('seconds', e)}
            onKeyDown={(e) => handleKeyDown('seconds', e)}
          />
          {secsAddon && <span>{secsAddon}</span>}
        </>
      )}
      {precision === 'milliseconds' && (
        <>
          <DateTimePartInput
            size={3}
            pad={pad ? 3 : undefined}
            value={milliseconds}
            disabled={disabled}
            readOnly={readOnly}
            aria-label="milliseconds"
            min={getMin('milliseconds')}
            max={getMax('milliseconds')}
            emptyChar={emptyCharacter}
            onSelect={handleSelect}
            onChange={(e) => handleChange('milliseconds', e)}
            onKeyDown={(e) => handleKeyDown('milliseconds', e)}
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
          className="rw-time-part-meridiem"
        >
          <div
            data-focusable
            role="option"
            aria-atomic
            aria-selected
            aria-setsize={2}
            aria-live="assertive"
            aria-disabled={disabled}
            aria-readonly={readOnly}
            aria-posinset={meridiem === 'AM' ? 1 : 2}
            tabIndex={!disabled ? 0 : void 0}
            onFocus={handleSelect}
            onSelect={handleSelect}
            onKeyDown={(e) => handleKeyDown('meridiem', e)}
          >
            <abbr>{meridiem}</abbr>
          </div>
        </div>
      )}
      {!noClearButton && (
        <Button
          label={'clear input'}
          onClick={handleClear}
          disabled={disabled || readOnly}
          className={classNames('rw-time-input-clear', showClear && 'rw-show')}
        >
          {times}
        </Button>
      )}
    </Widget>
  )
}

TimeInput.propTypes = propTypes
TimeInput.defaultProps = defaultProps

export default TimeInput
