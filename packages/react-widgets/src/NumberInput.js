import canUseDOM from 'dom-helpers/util/inDOM'
import activeElement from 'dom-helpers/activeElement'
import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'
import { polyfill as polyfillLifecycles } from 'react-lifecycles-compat'

import Input from './Input'
import * as Props from './util/Props'
import * as CustomPropTypes from './util/PropTypes'
import { number as numberLocalizer } from './util/localizers'

let getFormat = props => numberLocalizer.getFormat('default', props.format)

let isSign = val => (val || '').trim() === '-'

function isPaddedZeros(str, culture) {
  let localeChar = numberLocalizer.decimalChar(null, culture)
  let [_, decimals] = str.split(localeChar)

  return !!(decimals && decimals.match(/0+$/))
}

function isAtDelimiter(num, str, culture) {
  let localeChar = numberLocalizer.decimalChar(null, culture),
    lastIndex = str.length - 1,
    char

  if (str.length < 1) return false

  char = str[lastIndex]

  return !!(char === localeChar && str.indexOf(char) === lastIndex)
}

@polyfillLifecycles
class NumberPickerInput extends React.Component {
  static defaultProps = {
    value: null,
    editing: false,
  }

  static propTypes = {
    value: PropTypes.number,
    editing: PropTypes.bool,
    placeholder: PropTypes.string,

    format: CustomPropTypes.numberFormat,

    parse: PropTypes.func,
    culture: PropTypes.string,

    min: PropTypes.number,
    max: PropTypes.number,

    disabled: CustomPropTypes.disabled,
    readOnly: CustomPropTypes.disabled,

    onChange: PropTypes.func.isRequired,
  }

  state = {}

  getSnapshotBeforeUpdate({ editing }) {
    return {
      reselectText: !editing && this.props.editing && this.isSelectingAllText(),
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { value, culture, editing } = nextProps

    let decimal = numberLocalizer.decimalChar(null, culture)
    let format = getFormat(nextProps)

    if (value == null || isNaN(value)) value = ''
    else
      value = editing
        ? ('' + value).replace('.', decimal)
        : numberLocalizer.format(value, format, culture)

    let stringValue = '' + value

    if (prevState.lastValueFromProps !== stringValue)
      return {
        stringValue,
        lastValueFromProps: stringValue,
      }

    return null
  }

  componentDidUpdate(_, __, { reselectText }) {
    if (reselectText) findDOMNode(this).select()
  }

  // this intermediate state is for when one runs into
  // the decimal or are typing the number
  setStringValue(stringValue) {
    this.setState({ stringValue })
  }

  handleBlur = event => {
    var str = this.state.stringValue,
      number = this.parseNumber(str)

    // if number is below the min
    // we need to flush low values and decimal stops, onBlur means i'm done inputing
    if (this.isIntermediateValue(number, str)) {
      if (isNaN(number)) {
        number = null
      }
      this.props.onChange(number, event)
    }
  }

  handleChange = event => {
    let { value, onChange } = this.props

    let stringValue = event.target.value,
      numberValue = this.parseNumber(stringValue)

    let isIntermediate = this.isIntermediateValue(numberValue, stringValue)

    if (stringValue == null || stringValue.trim() === '') {
      this.setStringValue('')
      onChange(null, event)

      return
    }
    // order here matters a lot
    if (isIntermediate) {
      this.setStringValue(stringValue)
    } else if (numberValue !== value) {
      onChange(numberValue, event)
    } else if (stringValue != this.state.stringValue) {
      this.setStringValue(stringValue)
    }
  }

  isIntermediateValue(num, str) {
    let { culture, min } = this.props

    return !!(
      num < min ||
      isSign(str) ||
      isAtDelimiter(num, str, culture) ||
      isPaddedZeros(str, culture)
    )
  }

  isSelectingAllText() {
    const node = canUseDOM && findDOMNode(this)
    return (
      canUseDOM &&
      activeElement() === node &&
      node.selectionStart === 0 &&
      node.selectionEnd === node.value.length
    )
  }

  parseNumber(strVal) {
    let { culture, parse: userParse } = this.props

    let delimChar = numberLocalizer.decimalChar(null, culture)

    if (userParse) return userParse(strVal, culture)

    strVal = strVal.replace(delimChar, '.')
    strVal = parseFloat(strVal)

    return strVal
  }

  render() {
    let { disabled, readOnly, placeholder, min, max } = this.props

    let value = this.state.stringValue
    let props = Props.omitOwn(this)

    return (
      <Input
        {...props}
        className="rw-widget-input"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        aria-valuenow={value}
        aria-valuemin={isFinite(min) ? min : null}
        aria-valuemax={isFinite(max) ? max : null}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        value={value}
      />
    )
  }
}

export default NumberPickerInput
