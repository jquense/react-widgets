import React from 'react'
import { Multiselect } from 'react-widgets'

function DisabledItemsInput({ value, ...props }) {
  return (
    <Multiselect
      {...props}
      value={Array.isArray(value) ? value : []}
      disabled={value === true}
      messages={{ emptyList: 'no values selected to the right' }}
    />
  )
}

export default DisabledItemsInput
