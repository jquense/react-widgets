import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import { useUncontrolled } from 'uncontrollable'
import Button from './Button'
import { caretDown, caretUp } from './Icon'
import { useLocalizer, Localizer } from './Localization'
import NumberInput from './NumberInput'
import Widget, { WidgetProps } from './Widget'
import WidgetPicker from './WidgetPicker'
import * as CustomPropTypes from './PropTypes'
import useFocusManager from './useFocusManager'
import { notify } from './WidgetHelpers'
import { WidgetHTMLProps } from './shared'
import useEventCallback from '@restart/hooks/useEventCallback'

// my tests in ie11/chrome/FF indicate that keyDown repeats
// at about 35ms+/- 5ms after an initial 500ms delay. callback fires on the leading edge
function createInterval(callback: () => void) {
  let fn: () => void
  let id: number
  const cancel = () => clearTimeout(id)

  id = window.setTimeout(
    (fn = () => {
      id = window.setTimeout(fn, 35)
      callback() //fire after everything in case the user cancels on the first call
    }),
    500,
  )

  return cancel
}

function clamp(value: number | null | undefined, min: number, max: number) {
  max = max == null ? Infinity : max
  min = min == null ? -Infinity : min

  if (value == null || (value as any) === '') return null

  return Math.max(
    Math.min(typeof value == 'string' ? parseInt(value) : value, max),
    min,
  )
}

const propTypes = {
  /**
   * @example ['valuePicker', [ [1, null] ]]
   */
  value: PropTypes.number,

  /**
   * @example ['onChangePicker', [ [1, null] ]]
   */
  onChange: PropTypes.func,

  /**
   * The minimum number that the NumberPicker value.
   * @example ['prop', ['min', 0]]
   */
  min: PropTypes.number,

  /**
   * The maximum number that the NumberPicker value.
   *
   * @example ['prop', ['max', 0]]
   */
  max: PropTypes.number,

  /**
   * Amount to increase or decrease value when using the spinner buttons.
   *
   * @example ['prop', ['step', 5]]
   */
  step: PropTypes.number,

  /**
   * Specify how precise the `value` should be when typing, incrementing, or decrementing the value.
   * When empty, precision is parsed from the current `format` and culture.
   */
  precision: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),

  /**
   * A format string used to display the number value. Localizer dependent, read about [localization](localization) for more info.
   *
   * @example ['prop', { max: 1, min: -1 , defaultValue: 0.2585, format: "{ style: 'percent' }" }]
   */
  format: PropTypes.any,

  parse: PropTypes.func,

  incrementIcon: PropTypes.node,
  decrementIcon: PropTypes.node,

  /** @ignore */
  tabIndex: PropTypes.any,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  autoFocus: PropTypes.bool,

  /**
   * @example ['disabled', ['1']]
   */
  disabled: CustomPropTypes.disabled,
  /**
   * @example ['readOnly', ['1.5']]
   */
  readOnly: CustomPropTypes.disabled,

  /** Adds a css class to the input container element. */
  containerClassName: PropTypes.string,

  inputProps: PropTypes.object,
  messages: PropTypes.shape({
    increment: PropTypes.string,
    decrement: PropTypes.string,
  }),

  /** @ignore */
  localizer: PropTypes.object,
}

const defaultProps = {
  incrementIcon: caretUp,
  decrementIcon: caretDown,

  min: -Infinity,
  max: Infinity,
  step: 1,
  precision: 'auto',
}

export interface NumberPickerProps
  extends WidgetHTMLProps,
    Omit<WidgetProps, 'onChange'> {
  /**
   * @example ['valuePicker', [ [1, null] ]]
   */
  value?: number | undefined

  /**
   * @example ['onChangePicker', [ [1, null] ]]
   */
  onChange?: (
    nextValue: number | null,
    ctx: {
      rawValue: number
      originalEvent: React.SyntheticEvent<
        HTMLDivElement | HTMLButtonElement
      > | null
      lastValue: number | undefined
    },
  ) => void

  /**
   * The minimum number that the NumberPicker value.
   * @example ['prop', ['min', 0]]
   */
  min?: number

  /**
   * The maximum number that the NumberPicker value.
   *
   * @example ['prop', ['max', 0]]
   */
  max?: number

  /**
   * Amount to increase or decrease value when using the spinner buttons.
   *
   * @example ['prop', ['step', 5]]
   */
  step?: number

  /**
   * Specify the decimal precision of the value when incrementing or decrementing by the
   * `step` value. This may be necessary to work around rounding issues due to
   * floating point math. By default the precision value used will be inferred
   * from the `step` and `value`, rounding the result to that.
   */
  precision?: number | 'auto'

  /**
   * A format string used to display the number value. Localizer dependent, read [localization](./localization) for more info.
   *
   * @example ['prop', { max: 1, min: -1 , defaultValue: 0.2585, format: "{ style: 'percent' }" }]
   */
  format?: string

  /**
   * Determines how the NumberPicker parses a number from the localized string representation.
   *
   * ```jsx live
   * import NumberPicker from 'react-widgets/NumberPicker';
   *
   * <NumberPicker
   *   parse={(strValue, localizer) => {
   *     return localizer.parseNumber(strValue.replace('_', ''))
   *   }}
   * />
   * ```
   *
   * @example false
   */
  parse?: (str: string, localizer: Localizer) => number

  incrementIcon?: React.ReactNode
  decrementIcon?: React.ReactNode

  /** @ignore */
  tabIndex?: number
  name?: string
  placeholder?: string
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
  onKeyPress?: (event: React.KeyboardEvent<HTMLDivElement>) => void
  onKeyUp?: (event: React.KeyboardEvent<HTMLDivElement>) => void
  autoFocus?: boolean

  /**
   * @example ['disabled', ['1']]
   */
  disabled?: boolean
  /**
   * @example ['readOnly', ['1.5']]
   */
  readOnly?: boolean

  /** Adds a css class to the input container element. */
  containerClassName?: string

  inputProps?: React.HtmlHTMLAttributes<HTMLInputElement>
  messages?: {
    increment?: string
    decrement?: string
  }

  /** @ignore */
  localizer?: Localizer
}

/**
 * ---
 * localized: true
 * shortcuts:
 *   - { key: down arrow, label: decrement value }
 *   - { key: up arrow, label: increment value }
 *   - { key: home, label: set value to minimum value, if finite }
 *   - { key: end, label: set value to maximum value, if finite }
 * ---
 *
 * @public
 */
function NumberPicker(uncontrolledProps: NumberPickerProps) {
  const {
    className,
    containerClassName,
    disabled,
    readOnly,
    value,
    min,
    max,
    incrementIcon,
    decrementIcon,
    placeholder,
    autoFocus,
    tabIndex,
    parse,
    name,
    onChange,
    messages,
    format,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    inputProps,
    precision,
    step: pStep,
    ...elementProps
  } = useUncontrolled(uncontrolledProps, { value: 'onChange' })

  const localizer = useLocalizer(messages, { number: format })

  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const repeaterRef = useRef<(() => void) | null>(null)

  const [focusEvents, focused] = useFocusManager(ref, uncontrolledProps, {
    willHandle(focused) {
      if (focused) focus()
    },
  })

  const handleMouseDown = useEventCallback(
    (
      direction: 'UP' | 'DOWN',
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (event) event.persist()

      let method = direction === 'UP' ? increment : decrement

      let value = method(event),
        atTop = direction === 'UP' && value === max,
        atBottom = direction === 'DOWN' && value === min

      if (atTop || atBottom) handleMouseUp()
      else if (!repeaterRef.current) {
        repeaterRef.current = createInterval(() => {
          handleMouseDown(direction, event)
        })
      }
    },
  )

  const handleMouseUp = useEventCallback(() => {
    if (!repeaterRef.current) return
    repeaterRef.current()
    repeaterRef.current = null
  })

  const handleKeyDown = useEventCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (readOnly) return

      let key = event.key

      notify(onKeyDown, [event])

      if (event.defaultPrevented) return

      if (key === 'End' && isFinite(max!)) handleChange(max!, event)
      else if (key === 'Home' && isFinite(min!)) handleChange(min!, event)
      else if (key === 'ArrowDown') {
        event.preventDefault()
        decrement(event)
      } else if (key === 'ArrowUp') {
        event.preventDefault()
        increment(event)
      }
    },
  )

  const handleChange = (
    rawValue: number,
    originalEvent: React.SyntheticEvent<
      HTMLDivElement | HTMLButtonElement
    > | null = null,
  ) => {
    let nextValue = clamp(rawValue, min!, max!)

    if (value !== nextValue)
      notify(onChange, [
        nextValue,
        {
          rawValue,
          originalEvent,
          lastValue: value,
        },
      ])
  }

  function focus() {
    inputRef.current?.focus()
  }

  function increment(
    event:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) {
    return step(pStep!, event)
  }

  function decrement(
    event:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) {
    return step(-pStep!, event)
  }

  function step(
    amount: number,
    event:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) {
    const nextValue = (value || 0) + amount
    let p: number | undefined =
      precision === 'auto'
        ? Math.max(getPrecision(value || 0), getPrecision(amount))
        : precision

    handleChange(
      p != null ? parseFloat(nextValue.toFixed(p)) : nextValue,
      event,
    )

    return nextValue
  }

  const clampedValue = clamp(value, min!, max!)

  return (
    <Widget
      {...elementProps}
      focused={focused}
      disabled={disabled}
      readOnly={readOnly}
      onKeyDown={handleKeyDown}
      {...focusEvents}
      ref={ref}
      className={cn(className, 'rw-number-picker')}
    >
      <WidgetPicker className={containerClassName}>
        <NumberInput
          {...inputProps}
          role="spinbutton"
          tabIndex={tabIndex}
          value={clampedValue}
          placeholder={placeholder}
          autoFocus={autoFocus}
          editing={focused}
          localizer={localizer}
          parse={parse}
          name={name}
          min={min}
          max={max}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          innerRef={inputRef}
        />
        <span className="rw-input-addon rw-number-picker-spinners">
          <Button
            icon={incrementIcon}
            className="rw-picker-btn"
            disabled={clampedValue === max || disabled || readOnly}
            label={(localizer.messages.increment as any)({
              value: clampedValue,
              min,
              max,
            })}
            onMouseUp={() => handleMouseUp()}
            onMouseDown={(e) => handleMouseDown('UP', e)}
            onMouseLeave={() => handleMouseUp()}
          />
          <Button
            icon={decrementIcon}
            className="rw-picker-btn"
            disabled={clampedValue === min || disabled || readOnly}
            label={(localizer.messages.decrement as any)({
              value: clampedValue,
              min,
              max,
            })}
            onMouseUp={() => handleMouseUp()}
            onMouseDown={(e) => handleMouseDown('DOWN', e)}
            onMouseLeave={() => handleMouseUp()}
          />
        </span>
      </WidgetPicker>
    </Widget>
  )
}

;(NumberPicker as any).propTypes = propTypes
;(NumberPicker as any).defaultProps = defaultProps

export default NumberPicker

function getPrecision(a: number) {
  if (!isFinite(a)) return 0
  let e = 1
  let p = 0
  while (Math.round(a * e) / e !== a) {
    e *= 10
    p++
  }
  return p
}
