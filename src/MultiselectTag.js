import cn from 'classnames';
import React from 'react';

import Button from './Button';

class MultiselectTag extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    focused: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
  }

  onClick = () => {
    const { value, disabled, readOnly, onClick } = this.props;

    if (disabled || readOnly) {
      return
    }

    onClick(value)
  };

  renderDelete() {
    const { label, disabled, readOnly } = this.props;

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
    );
  }

  render() {
    const { id, children, focused, disabled, readOnly } = this.props;
    let tabIndex = disabled ? undefined : '-1';

    return (
      <li
        id={id}
        role='option'
        tabIndex={tabIndex}
        className={cn(
          'rw-multiselect-tag',
          disabled && 'rw-state-disabled',
          readOnly && 'rw-state-readonly',
          focused && !disabled && 'rw-state-focus',
        )}
      >
        {children}
        {this.renderDelete()}
      </li>
    )
  }
}

export default MultiselectTag;
