import cn from 'classnames';
import React from 'react';

import Button from './Button';

class MultiselectTag extends React.Component {
  static propTypes = {
    id: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired,
    focused: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    label: React.PropTypes.string,
    value: React.PropTypes.any,
  }

  onClick = (event) => {
    const { value, disabled, onClick } = this.props;

    if (disabled) {
      return
    }

    onClick(value, event)
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
    const { id, children, focused, disabled } = this.props;
    let tabIndex = disabled ? undefined : '-1';

    return (
      <li
        id={id}
        role='option'
        tabIndex={tabIndex}
        className={cn(
          'rw-multiselect-tag',
          disabled && 'rw-state-disabled',
          focused && !disabled && 'rw-state-focus',
        )}
      >
        {children}
        <div>
          {this.renderDelete()}
        </div>
      </li>
    )
  }
}

export default MultiselectTag;
