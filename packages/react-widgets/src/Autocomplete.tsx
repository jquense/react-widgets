import React from 'react'
import Combobox, { ComboboxProps } from './Combobox'
import { useUncontrolledProp } from 'uncontrollable'

function Autocomplete<TDataItem>(props: ComboboxProps<TDataItem>) {
  const [open, onToggle] = useUncontrolledProp(
    props.open,
    props.defaultOpen,
    props.onToggle,
  )
  const [value, onChange] = useUncontrolledProp(
    props.value,
    props.defaultValue,
    props.onChange,
  )

  const handleChange: ComboboxProps['onChange'] = (
    nextValue: TDataItem | string,
    meta,
  ) => {
    onChange(nextValue, meta)

    if (!nextValue && open) {
      onToggle(false)
    }
  }

  return (
    <Combobox
      {...props}
      hideCaret
      hideEmptyPopup
      value={value}
      onChange={handleChange}
      open={open}
      onToggle={onToggle}
    />
  )
}

export default Autocomplete
