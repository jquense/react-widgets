import { useState, useRef, useMemo } from 'react'
import reduceToListState from './reduceToListState'
import { filter } from './Filter'

export const CREATE_OPTION = {}

export function useList(data, options) {
  const prev = useRef()
  const list = reduceToListState(data, prev.current, options)
  prev.current = list
  return list
}

export function useFilteredData(
  value,
  data,
  filterer,
  searchTerm,
  minLength,
  caseSensitive,
  textAccessor,
) {
  return useMemo(
    () =>
      filter(data, {
        searchTerm,
        minLength,
        caseSensitive,
        filter: filterer,
        textField: textAccessor,
      }),
    [data, filter, searchTerm, minLength, caseSensitive, textAccessor],
  )
}

export function useFocusedItem(
  selectedItem,
  data,
  list,
  defaultItem = data[0],
) {
  const ref = useRef(null)

  const prevSelected = ref.current
  ref.current = selectedItem

  // Focused item defaults the first when nothing is selected
  const startItem = selectedItem !== undefined ? selectedItem : defaultItem

  const [focusedItem, setItem] = useState(() =>
    // nextEnabled in case the first or selected item is disabled
    list.nextEnabled(startItem),
  )
  const isCreateItem = focusedItem === CREATE_OPTION

  // if the selectedItem has changed we reset the focusedItem to it
  if (selectedItem && prevSelected !== selectedItem) {
    setItem(list.nextEnabled(selectedItem))
  }
  // if the current focused item is no longer in the array (e.g. filtered out)
  // reset it to the first enabled item
  else if (!isCreateItem && data.indexOf(focusedItem) === -1) {
    const nextItem = list.nextEnabled(defaultItem)
    if (nextItem !== focusedItem) setItem(nextItem)
  }

  return [focusedItem, setItem]
}
