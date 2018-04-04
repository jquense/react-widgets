import React from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'

import Input from './Input'

export const caretSet = (node, start, end = start) => {
  try {
    node.setSelectionRange(start, end)
  } catch (e) {
    /* not focused or not visible */
  }
}

class ComboboxInput extends React.Component {
  static defaultProps = {
    value: '',
  }

  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    suggest: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
  }

  componentDidUpdate() {
    let input = findDOMNode(this)
    let val = this.props.value

    if (this.isSuggesting()) {
      let start =
        val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length
      let end = val.length - start

      if (start >= 0 && end !== 0) {
        caretSet(input, start, start + end)
      }
    }
  }

  accept(clearSelection = false) {
    this._last = null
    if (clearSelection) {
      let node = findDOMNode(this)
      caretSet(node, node.value.length)
    }
  }

  focus() {
    findDOMNode(this).focus()
  }

  handleChange = e => {
    let { placeholder, value, onChange } = this.props

    let stringValue = e.target.value
    let hasPlaceholder = !!placeholder

    // IE fires input events when setting/unsetting placeholders.
    // issue #112
    if (hasPlaceholder && !stringValue && stringValue === (value || '')) return

    this._last = stringValue
    onChange(e, stringValue)
  }

  isSuggesting() {
    let { value, suggest } = this.props

    if (!suggest) return false

    return (
      this._last != null &&
      value.toLowerCase().indexOf(this._last.toLowerCase()) !== -1
    )
  }

  render() {
    let { onKeyDown, ...props } = this.props

    delete props.suggest

    return (
      <Input
        {...props}
        className="rw-widget-input"
        onKeyDown={onKeyDown}
        onChange={this.handleChange}
      />
    )
  }
}

export default ComboboxInput
