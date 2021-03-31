import React from 'react'
import { Combobox, DropdownList, Multiselect, Listbox } from 'react-widgets'
import generateData from '../generate-data'

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  Combobox,
  DropdownList,
  Multiselect,
  Listbox,
  listOfPeople: () => generateData(15),
}

export default ReactLiveScope
