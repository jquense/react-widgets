import React from 'react';
import PropTypes from 'prop-types';
import { Multiselect } from 'react-widgets';

const propTypes = {
  value: PropTypes.any,
};

function DisabledItemsInput({ value, ...props }) {
  return (
    <Multiselect
      {...props}
      value={Array.isArray(value) ? value : []}
      disabled={value === true}
      messages={{ emptyList: 'no values selected to the right' }}
    />
  );
}

DisabledItemsInput.propTypes = propTypes;

export default DisabledItemsInput;
