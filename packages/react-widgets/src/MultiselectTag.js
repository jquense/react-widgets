import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import Button from './Button'

class MultiselectTag extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    clearTagIcon: PropTypes.node,
    onRemove: PropTypes.func.isRequired,
    focused: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.any,
  }

  handleRemove = event => {
    const { value, disabled, onRemove } = this.props
    if (!disabled) onRemove(value, event)
  }

  renderDelete() {
    const { label, disabled, readOnly, clearTagIcon } = this.props

    return (
      <Button
        variant={null}
        onClick={this.handleRemove}
        className="rw-multiselect-tag-btn"
        disabled={disabled || readOnly}
        label={label || 'Remove item'}
      >
        {clearTagIcon}
      </Button>
    )
  }

  render() {
    const { id, className, children, focused, disabled, style } = this.props

    return (
      <div
        id={id}
        role="option"
        className={cn(
          className,
          'rw-multiselect-tag',
          disabled && 'rw-state-disabled',
          focused && !disabled && 'rw-state-focus',
        )}
        style={style}
      >
        <span className="rw-multiselect-tag-label">{children}</span>
        {this.renderDelete()}
      </div>
    )
  }
}

export default MultiselectTag
