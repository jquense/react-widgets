import * as PropTypes from 'prop-types'
import React from 'react'
import Listbox, { BaseListBoxProps} from './BaseListbox'
import ListOption from './ListOption'

export const CREATE_OPTION = {}

const propTypes = {
  searchTerm: PropTypes.string,
  focused: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  activeId: PropTypes.string,
}

export interface AddToListOptionProps extends Omit<BaseListBoxProps, "onSelect">
{
  searchTerm?: string;
  focused?: boolean;
  onSelect: (dataItem: any, event: React.MouseEvent)=> void;
  activeId?: string;
}

function AddToListOption({ onSelect, focused, children, activeId, ...props } : AddToListOptionProps) {
  return (
    <Listbox {...props} className="rw-list-option-create">
      <ListOption
        onSelect={onSelect}
        focused={focused}
        activeId={activeId}
        dataItem={CREATE_OPTION}
        selected={false}
      >
        {children}
      </ListOption>
    </Listbox>
  )
}

AddToListOption.propTypes = propTypes

export default AddToListOption
