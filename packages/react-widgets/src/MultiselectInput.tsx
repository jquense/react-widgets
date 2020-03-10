import PropTypes from 'prop-types'
import React from 'react'
import * as CustomPropTypes from './util/PropTypes'

const propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  onChange: PropTypes.func.isRequired,

  disabled: CustomPropTypes.disabled,
  readOnly: CustomPropTypes.disabled,
}

const MultiselectInput = React.forwardRef(
  (
    { disabled, readOnly, ...props }: React.HTMLProps<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    let size =
      Math.max(String(props.value || props.placeholder || '').length, 1) + 1

    return (
      <input
        {...props}
        size={size}
        ref={ref}
        className="rw-input-reset"
        autoComplete="off"
        aria-disabled={disabled}
        aria-readonly={readOnly}
        disabled={disabled}
        readOnly={readOnly}
      />
    )
  },
);

MultiselectInput.displayName = 'MultiselectInput';
MultiselectInput.propTypes = propTypes;

export default MultiselectInput
