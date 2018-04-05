import cn from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import { widgetEditable } from './util/interaction'

import Button from './Button'

class MultiselectTag extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    focused: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.any,
  }

  @widgetEditable
  onClick = event => {
    const { value, disabled, onClick } = this.props
    if (!disabled) onClick(value, event)
  }

  renderDelete() {
    const { label, disabled, readOnly } = this.props

    return (
      <Button
        variant="select"
        onClick={this.onClick}
        className="rw-multiselect-tag-btn"
        disabled={disabled || readOnly}
        aria-label={label || 'Remove item'}
      >
        <span aria-hidden="true">&times;</span>
      </Button>
    )
  }

  render() {
    const { id, children, focused, disabled } = this.props

    return (
      <li
        id={id}
        role="option"
        className={cn(
          'rw-multiselect-tag',
          disabled && 'rw-state-disabled',
          focused && !disabled && 'rw-state-focus'
        )}
      >
        {children}
        <div>{this.renderDelete()}</div>
      </li>
    )
  }
}

export default MultiselectTag
