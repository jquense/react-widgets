import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { useRef } from 'react'
import useUncontrolled from 'uncontrollable/hook'

import Widget from './Widget'
import WidgetPicker from './WidgetPicker'
import Select from './Select'
import NumberInput from './NumberInput'
import Button from './Button'
import LocalizationProvider from './LocalizationProvider'
import { createEditableCallback } from './util/interaction'
import useFocusManager from './util/useFocusManager'
import { notify } from './util/widgetHelpers'
import * as CustomPropTypes from './util/PropTypes'
import { caretUp, caretDown } from './Icon'

// my tests in ie11/chrome/FF indicate that keyDown repeats
// at about 35ms+/- 5ms after an initial 500ms delay. callback fires on the leading edge
function createInterval(callback) {
  let fn
  var id,
    cancel = () => clearTimeout(id)

  id = setTimeout(
    (fn = () => {
      id = setTimeout(fn, 35)
      callback() //fire after everything in case the user cancels on the first call
    }),
    500,
  )

  return cancel
}

function clamp(value, min, max) {
  max = max == null ? Infinity : max
  min = min == null ? -Infinity : min

  if (value == null || value === '') return null

  return Math.max(Math.min(value, max), min)
}

const propTypes = {
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
  precision: PropTypes.number,

  formats: PropTypes.shape({
    /**
     * A format string used to display the number value. Localizer dependent, read [localization](../localization) for more info.
     *
     * @example ['prop', { max: 1, min: -1 , defaultValue: 0.2585, format: "{ style: 'percent' }" }]
     */
    default: CustomPropTypes.numberFormat,
  }),

  /**
   * Determines how the NumberPicker parses a number from the localized string representation.
   * You can also provide a parser `function` to pair with a custom `format`.
   */
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
  isRtl: PropTypes.bool,
  messages: PropTypes.shape({
    increment: PropTypes.string,
    decrement: PropTypes.string,
  }),

  /** @ignore */
  localizer: PropTypes.object,
}

const defaultProps = {
  value: null,
  open: false,
  incrementIcon: caretUp,
  decrementIcon: caretDown,

  min: -Infinity,
  max: Infinity,
  step: 1,
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
function NumberPicker(uncontrolledProps) {
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
    formats,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    inputProps,
    precision,
    step: pStep,
    ...elementProps
  } = useUncontrolled(uncontrolledProps, { value: 'onChange' })

  const localizer = LocalizationProvider.useLocalizer(messages, formats)

  const ref = useRef()
  const inputRef = useRef()
  const repeaterRef = useRef()

  const [focusEvents, focused] = useFocusManager(ref, uncontrolledProps, {
    willHandle(focused) {
      if (focused) focus()
    },
  })

  // @widgetEditable
  const handleMouseDown = (direction, event) => {
    let { min, max } = this.props

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
  }

  const useEditableCallback = createEditableCallback(disabled || readOnly, ref)

  // @widgetEditable
  const handleMouseUp = useEditableCallback(() => {
    if (!repeaterRef.current) return
    repeaterRef.current()
    repeaterRef.current = null
  })

  // @widgetEditable
  const handleKeyDown = useEditableCallback(event => {
    let key = event.key

    notify(onKeyDown, [event])

    if (event.defaultPrevented) return

    if (key === 'End' && isFinite(max)) this.handleChange(max, event)
    else if (key === 'Home' && isFinite(min)) this.handleChange(min, event)
    else if (key === 'ArrowDown') {
      event.preventDefault()
      this.decrement(event)
    } else if (key === 'ArrowUp') {
      event.preventDefault()
      this.increment(event)
    }
  })

  const handleChange = (rawValue, originalEvent = null) => {
    let nextValue = clamp(rawValue, min, max)

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
    this.inputRef.focus()
  }

  function increment(event) {
    return step(pStep, event)
  }

  function decrement(event) {
    return step(-pStep, event)
  }

  function step(amount, event) {
    const nextValue = (value || 0) + amount

    const decimals =
      precision != null ? precision : localizer.precision('default')

    handleChange(
      decimals != null ? round(nextValue, decimals) : nextValue,
      event,
    )

    return value
  }

  const clampedValue = clamp(value, min, max)

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
          editing={this.state.focused}
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
        <Select bordered>
          <Button
            icon={incrementIcon}
            disabled={clampedValue === max || disabled}
            label={localizer.messages.increment({
              value: clampedValue,
              min,
              max,
            })}
            onMouseUp={e => handleMouseUp('UP', e)}
            onMouseDown={e => handleMouseDown('UP', e)}
            onMouseLeave={e => handleMouseUp('UP', e)}
          />
          <Button
            icon={decrementIcon}
            disabled={clampedValue === min || disabled}
            label={localizer.messages.decrement({
              value: clampedValue,
              min,
              max,
            })}
            onMouseUp={e => handleMouseUp('DOWN', e)}
            onMouseDown={e => handleMouseDown('DOWN', e)}
            onMouseLeave={e => handleMouseUp('DOWN', e)}
          />
        </Select>
      </WidgetPicker>
    </Widget>
  )
}

NumberPicker.propTypes = propTypes
NumberPicker.defaultProps = defaultProps

export default NumberPicker

// thank you kendo ui core
// https://github.com/telerik/kendo-ui-core/blob/master/src/kendo.core.js#L1036
function round(value, precision) {
  precision = precision || 0

  value = ('' + value).split('e')
  value = Math.round(
    +(value[0] + 'e' + (value[1] ? +value[1] + precision : precision)),
  )

  value = ('' + value).split('e')
  value = +(value[0] + 'e' + (value[1] ? +value[1] - precision : -precision))

  return value.toFixed(precision)
}
