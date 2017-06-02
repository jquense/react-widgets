import * as PropTypes from 'prop-types';
import React from 'react';

import Listbox from './Listbox';
import ListOption from './ListOption';

const propTypes = {
  searchTerm: PropTypes.string,
  focused: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  activeId: PropTypes.string,
};

function AddToListOption({
  searchTerm, onSelect, focused, children, activeId, ...props
}) {
  return (
    <Listbox {...props} className="rw-list-option-create">
      <ListOption
        onSelect={onSelect}
        focused={focused}
        activeId={activeId}
        dataItem={searchTerm}
      >
        {children}
      </ListOption>
    </Listbox>
  );
}

AddToListOption.propTypes = propTypes;

export default AddToListOption;
