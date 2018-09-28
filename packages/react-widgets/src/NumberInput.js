import canUseDOM from 'dom-helpers/util/inDOM'
import activeElement from 'dom-helpers/activeElement'
import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'

import Input from './Input'
import * as Props from './util/Props'
import * as CustomPropTypes from './util/PropTypes'

let isSign = val => (val || '').trim() === '-'

function isPaddedZeros(str, localizer) {
  let localeChar = localizer.decimalChar()
  let [_, decimals] = str.split(localeChar)

  return !!(decimals && decimals.match(/0+$/))
}

function isAtDelimiter(num, str, localizer) {
  let localeChar = localizer.decimalChar(),
    lastIndex = str.length - 1,
    char

  if (str.length < 1) return false

  char = str[lastIndex]

  return !!(char === localeChar && str.indexOf(char) === lastIndex)
}

class NumberPickerInput extends React.Component {
  static defaultProps = {
    value: null,
    editing: false,
  }

  static propTypes = {
    value: PropTypes.number,
    editing: PropTypes.bool,
    placeholder: PropTypes.string,

    localizer: PropTypes.object.isRequired,
    parse: PropTypes.func,

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

  static getDerivedStateFromProps(nextProps) {
    let { value, editing, localizer } = nextProps

    let decimal = localizer.decimalChar()
    if (value == null || isNaN(value)) value = ''
    else
      value = editing
        ? ('' + value).replace('.', decimal)
        : localizer.formatNumber(value, 'default')

    return {
      stringValue: '' + value,
    }
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
    let str = this.state.stringValue
    let number = this.parseNumber(str)

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
    let { localizer, min } = this.props

    return !!(
      num < min ||
      isSign(str) ||
      isAtDelimiter(num, str, localizer) ||
      isPaddedZeros(str, localizer)
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
    let { localizer, parse: userParse } = this.props

    let delimChar = localizer.decimalChar()

    if (userParse) return userParse(strVal, localizer)

    strVal = strVal.replace(delimChar, '.')
    strVal = parseFloat(strVal)

    return strVal
  }

  render() {
    let {
      disabled,
      readOnly,
      placeholder,
      innerRef,
      min,
      max,
      localizer: _0,
      editing: _1,
      ...props
    } = this.props

    let value = this.state.stringValue

    return (
      <Input
        {...props}
        ref={innerRef}
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
