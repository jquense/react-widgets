const isValueArray = (name) => ['Multiselect', 'Listbox'].includes(name)

const isListComponent = (name) =>
  ['Multiselect', 'DropdownList', 'Listbox', 'Combobox'].includes(name)

module.exports = { isValueArray, isListComponent }
