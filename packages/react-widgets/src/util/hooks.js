import { useEffect, useState, useRef, useMemo } from 'react'
import reduceToListState from './reduceToListState'
import { filter } from './Filter'
import { notify } from './widgetHelpers'

export const CREATE_OPTION = {}

export function useAutoFocus(autoFocus, ref) {
  useEffect(() => {
    if (autoFocus) ref.current.focus()
  }, [])
}

export function useDropodownToggle(isOpen, onToggle) {
  function open() {
    if (!isOpen) notify(onToggle, true)
  }
  function close() {
    if (isOpen) notify(onToggle, false)
  }
  function toggle() {
    if (isOpen) close()
    else open()
  }

  toggle.open = open
  toggle.close = close
  return toggle
}

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
  if (prevSelected !== selectedItem) {
    setItem(selectedItem ? list.nextEnabled(selectedItem) : startItem)
  }
  // if the current focused item is no longer in the array (e.g. filtered out)
  // reset it to the first enabled item
  else if (!isCreateItem && data.indexOf(focusedItem) === -1) {
    const nextItem = list.nextEnabled(defaultItem)
    if (nextItem !== focusedItem) setItem(nextItem)
  }

  return [focusedItem, setItem]
}
