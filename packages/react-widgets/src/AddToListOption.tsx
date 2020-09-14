import * as PropTypes from 'prop-types'
import React, { ReactNode } from 'react'

import ListOption from './ListOption'

export const CREATE_OPTION = {}

const propTypes = {
  searchTerm: PropTypes.string,
  focused: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  activeId: PropTypes.string,
}

export interface AddToListOptionProps {
  children: ReactNode
  onSelect: (event: React.MouseEvent) => void
}

function AddToListOption({ children, ...props }: AddToListOptionProps) {
  return (
    <ListOption
      {...props}
      dataItem={CREATE_OPTION}
      className={'rw-list-option-create'}
      selected={false}
    >
      {children}
    </ListOption>
  )
}

AddToListOption.propTypes = propTypes

export default AddToListOption
