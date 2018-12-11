import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'

import Input from './Input'
import * as CustomPropTypes from './util/PropTypes'
import * as Props from './util/Props'

class DateTimePickerInput extends React.Component {
  static propTypes = {
    format: CustomPropTypes.dateFormat.isRequired,
    editing: PropTypes.bool,
    editFormat: CustomPropTypes.dateFormat,
    parse: PropTypes.func.isRequired,

    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    localizer: PropTypes.object.isRequired,

    disabled: CustomPropTypes.disabled,
    readOnly: CustomPropTypes.disabled,
  }

  state = {}

  static getDerivedStateFromProps(nextProps, prevState) {
    let { value, editing, editFormat, format, localizer } = nextProps
    let textValue =
      value instanceof Date && isValid(value)
        ? localizer.formatDate(
            value,
            editing && editFormat ? editFormat : format
          )
        : ''

    if (prevState.lastValueFromProps !== textValue)
      return {
        textValue,
        lastValueFromProps: textValue,
      }

    return null
  }

  focus() {
    findDOMNode(this).focus()
  }

  handleBlur = event => {
    let { parse, onChange, onBlur } = this.props

    onBlur && onBlur(event)

    if (this._needsFlush) {
      let date = parse(event.target.value)

      const dateIsInvalid = event.target.value != '' && date == null
      if (dateIsInvalid) {
        this.setState({ textValue: '' })
      }
      this._needsFlush = false

      onChange(date, event.target.value)
    }
  }

  handleChange = ({ target: { value } }) => {
    this._needsFlush = true
    this.setState({ textValue: value })
  }

  render() {
    let { disabled, readOnly } = this.props
    let { textValue } = this.state

    let props = Props.omitOwn(this)

    return (
      <Input
        {...props}
        type="text"
        className="rw-widget-input"
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
