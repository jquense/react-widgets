import PropTypes from 'prop-types';
import React from 'react';
import { findDOMNode } from 'react-dom';

import * as CustomPropTypes from './util/PropTypes';

class MultiselectInput extends React.Component {

  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    onChange: PropTypes.func.isRequired,

    disabled: CustomPropTypes.disabled,
    readOnly: CustomPropTypes.disabled
  };

  render() {
    let { disabled, readOnly, ...props } = this.props
    let size = Math.max((props.value || props.placeholder).length, 1) + 1;

    return (
      <input
        {...props}
        size={size}
        className="rw-input-reset"
        autoComplete='off'
        aria-disabled={disabled}
        aria-readonly={readOnly}
        disabled={disabled}
        readOnly={readOnly}
      />
    )
  }

  select() {
    findDOMNode(this).select()
  }

  focus() {
    findDOMNode(this).focus()
  }
}

export default MultiselectInput
