import PropTypes from 'prop-types'
import React from 'react'
import polyfillLifecycles from 'react-lifecycles-compat'
import { findDOMNode } from 'react-dom'

import Input from './Input'
import { date as dateLocalizer } from './util/localizers'
import * as CustomPropTypes from './util/PropTypes'
import * as Props from './util/Props'

@polyfillLifecycles
class DateTimePickerInput extends React.Component {
  static propTypes = {
    format: CustomPropTypes.dateFormat.isRequired,
    editing: PropTypes.bool,
    editFormat: CustomPropTypes.dateFormat,
    parse: PropTypes.func.isRequired,

    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    culture: PropTypes.string,

    disabled: CustomPropTypes.disabled,
    readOnly: CustomPropTypes.disabled,
    className: PropTypes.string,
    type: PropTypes.string
  }

  state = {}

  static getDerivedStateFromProps(nextProps) {
    let { value, editing, editFormat, format, culture } = nextProps

    return {
      textValue: formatDate(
        value,
        editing && editFormat ? editFormat : format,
        culture
      ),
    }
  }

  focus() {
    findDOMNode(this).focus()
  }

  handleBlur = event => {
    let { format, culture, parse, onChange, onBlur } = this.props

    onBlur && onBlur(event)

    if (this._needsFlush) {
      let date = parse(event.target.value)

      this._needsFlush = false
      onChange(date, formatDate(date, format, culture))
    }
  }

  handleChange = ({ target: { value } }) => {
    this._needsFlush = true
    this.setState({ textValue: value })
  }

  render() {
    let { className = '', disabled, readOnly, type = 'text' } = this.props
    let { textValue } = this.state

    let props = Props.omitOwn(this)

    return (
      <Input
        {...props}
        type={type}
        className={`rw-widget-input ${className}`}
        value={textValue}
        disabled={disabled}
        readOnly={readOnly}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    )
  }
}

export default DateTimePickerInput

function isValid(d) {
  return !isNaN(d.getTime())
}

function formatDate(date, format, culture) {
  var val = ''

  if (date instanceof Date && isValid(date))
    val = dateLocalizer.format(date, format, culture)

  return val
}
