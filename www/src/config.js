
export const isValueArray = name =>
  ['Multiselect', 'SelectList'].includes(name)

export const isListComponent = name =>
  ['Multiselect', 'DropdownList', 'SelectList', 'Combobox'].includes(name)
