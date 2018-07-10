import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { polyfill as polyfillLifecycles } from 'react-lifecycles-compat'
import uncontrollable from 'uncontrollable'

import Widget from './Widget'
import WidgetPicker from './WidgetPicker'
import Select from './Select'
import Input from './NumberInput'
import Button from './Button'
import { getMessages } from './messages'

import * as Props from './util/Props'
import focusManager from './util/focusManager'
import { widgetEditable } from './util/interaction'
import { notify } from './util/widgetHelpers'
import * as CustomPropTypes from './util/PropTypes'
import { number as numberLocalizer } from './util/localizers'
import { caretUp, caretDown } from './Icon'

var format = props => numberLocalizer.getFormat('default', props.format)

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
    500
  )

  return cancel
}

function clamp(value, min, max) {
  max = max == null ? Infinity : max
  min = min == null ? -Infinity : min

  if (value == null || value === '') return null

  return Math.max(Math.min(value, max), min)
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
@polyfillLifecycles
class NumberPicker extends React.Component {
  static propTypes = {
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

    culture: PropTypes.string,

    /**
     * A format string used to display the number value. Localizer dependent, read [localization](../localization) for more info.
     *
     * @example ['prop', { max: 1, min: -1 , defaultValue: 0.2585, format: "{ style: 'percent' }" }]
     */
    format: CustomPropTypes.numberFormat,

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
  }

  static defaultProps = {
    value: null,
    open: false,
    incrementIcon: caretUp,
    decrementIcon: caretDown,

    min: -Infinity,
    max: Infinity,
    step: 1,
  }

  constructor(...args) {
    super(...args)

    this.focusManager = focusManager(this, {
      willHandle: focused => {
        if (focused) this.focus()
      },
    })

    this.state = {
      focused: false,
    }
  }

  static getDerivedStateFromProps({ messages }) {
    return { messages: getMessages(messages) }
  }

  @widgetEditable
  handleMouseDown = (direction, event) => {
    let { min, max } = this.props

    event && event.persist()

    let method = direction === 'UP' ? this.increment : this.decrement

    let value = method.call(this, event),
      atTop = direction === 'UP' && value === max,
      atBottom = direction === 'DOWN' && value === min

    if (atTop || atBottom) this.handleMouseUp()
    else if (!this._cancelRepeater) {
      this._cancelRepeater = createInterval(() => {
        this.handleMouseDown(direction, event)
      })
    }
  }

  @widgetEditable
  handleMouseUp = () => {
    this._cancelRepeater && this._cancelRepeater()
    this._cancelRepeater = null
  }

  @widgetEditable
  handleKeyDown = event => {
    let { min, max, onKeyDown } = this.props
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
  }

  handleChange = (rawValue, originalEvent = null) => {
    let { onChange, value: lastValue, min, max } = this.props

    let nextValue = clamp(rawValue, min, max)

    if (lastValue !== nextValue)
      notify(onChange, [
        nextValue,
        {
          rawValue,
          lastValue,
          originalEvent,
        },
      ])
  }

  attachInputRef = ref => {
    this.inputRef = ref
  }

  renderInput(value) {
    let {
      placeholder,
      autoFocus,
      tabIndex,
      parse,
      name,
      onKeyPress,
      onKeyUp,
      min,
      max,
      disabled,
      readOnly,
      inputProps,
      format,
      culture,
    } = this.props

    return (
      <Input
        {...inputProps}
        role="spinbutton"
        tabIndex={tabIndex}
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        editing={this.state.focused}
        format={format}
        culture={culture}
        parse={parse}
        name={name}
        min={min}
        max={max}
        disabled={disabled}
        readOnly={readOnly}
        onChange={this.handleChange}
        onKeyPress={onKeyPress}
        onKeyUp={onKeyUp}
        nodeRef={this.attachInputRef}
      />
    )
  }

  render() {
    let {
      className,
      containerClassName,
      disabled,
      readOnly,
      value,
      min,
      max,
      incrementIcon,
      decrementIcon,
    } = this.props

    let { focused, messages } = this.state
    let elementProps = Props.pickElementProps(this)

    value = clamp(value, min, max)

    return (
      <Widget
        {...elementProps}
        focused={focused}
        disabled={disabled}
        readOnly={readOnly}
        onKeyDown={this.handleKeyDown}
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        className={cn(className, 'rw-number-picker')}
      >
        <WidgetPicker className={containerClassName}>
          {this.renderInput(value)}
          <Select bordered>
            <Button
              icon={incrementIcon}
              onClick={this.handleFocus}
              disabled={value === max || disabled}
              label={messages.increment({ value, min, max })}
              onMouseUp={e => this.handleMouseUp('UP', e)}
              onMouseDown={e => this.handleMouseDown('UP', e)}
              onMouseLeave={e => this.handleMouseUp('UP', e)}
            />
            <Button
              icon={decrementIcon}
              onClick={this.handleFocus}
              disabled={value === min || disabled}
              label={messages.decrement({ value, min, max })}
              onMouseUp={e => this.handleMouseUp('DOWN', e)}
              onMouseDown={e => this.handleMouseDown('DOWN', e)}
              onMouseLeave={e => this.handleMouseUp('DOWN', e)}
            />
          </Select>
        </WidgetPicker>
      </Widget>
    )
  }

  focus() {
    this.inputRef.focus()
  }

  increment(event) {
    return this.step(this.props.step, event)
  }

  decrement(event) {
    return this.step(-this.props.step, event)
  }

  step(amount, event) {
    var value = (this.props.value || 0) + amount

    var decimals =
      this.props.precision != null
        ? this.props.precision
        : numberLocalizer.precision(format(this.props))

    this.handleChange(decimals != null ? round(value, decimals) : value, event)

    return value
  }
}

export default uncontrollable(NumberPicker, { value: 'onChange' }, ['focus'])

// thank you kendo ui core
// https://github.com/telerik/kendo-ui-core/blob/master/src/kendo.core.js#L1036
function round(value, precision) {
  precision = precision || 0

  value = ('' + value).split('e')
  value = Math.round(
    +(value[0] + 'e' + (value[1] ? +value[1] + precision : precision))
  )

  value = ('' + value).split('e')
  value = +(value[0] + 'e' + (value[1] ? +value[1] - precision : -precision))

  return value.toFixed(precision)
}
