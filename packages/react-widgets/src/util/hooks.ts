import { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import useGlobalListener from '@restart/hooks/useGlobalListener'
import useStableMemo from '@restart/hooks/useStableMemo'
import { Filter, filter } from './Filter'
import { TextAccessor } from './dataHelpers'
import { notify } from './widgetHelpers'

export function useAutoFocus(autoFocus: boolean, ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (autoFocus && ref.current) ref.current.focus()
  }, [])
}

function useImmediateUpdateEffect(
  updater: () => void,
  deps: React.DependencyList,
) {
  const firstRef = useRef(true)

  useStableMemo(() => {
    if (firstRef.current) {
      firstRef.current = false
      return
    }

    updater()
  }, deps)
}

export function useStateFromProp<T>(propValue?: T) {
  const [focusedItem, setFocusedItem] = useState<T | undefined>(propValue)
  useImmediateUpdateEffect(() => {
    setFocusedItem(propValue)
  }, [propValue])

  return [focusedItem, setFocusedItem] as const
}

export function useDropodownToggle(
  isOpen: boolean | undefined,
  onToggle: (isOpen: boolean) => void,
) {
  function open() {
    if (!isOpen) notify(onToggle, [true])
  }
  function close() {
    if (isOpen) notify(onToggle, [false])
  }
  function toggle() {
    if (isOpen) close()
    else open()
  }

  toggle.open = open
  toggle.close = close
  return toggle
}

export function useFilteredData<TDataItem>(
  data: TDataItem[],
  filterer: Filter<TDataItem>,
  searchTerm?: string,
  textAccessor?: TextAccessor,
) {
  return useMemo(
    () =>
      filter(data, {
        searchTerm,
        filter: filterer,
        textField: textAccessor,
      }),
    [data, filter, searchTerm, textAccessor],
  )
}

export function useKeyboardNavigationCheck() {
  const [isNavigatingViaKeyboard, setIsNavigatingViaKeyboard] = useState(false)
  useGlobalListener('keydown', ({ key }) => {
    if (
      key == ' ' ||
      key === 'Tab' ||
      key == 'Enter' ||
      key.indexOf('Arrow') !== -1
    ) {
      setIsNavigatingViaKeyboard(true)
    }
  })

  // TODO: use pointerdown once we polyfill it
  useGlobalListener('mousedown', () => {
    setIsNavigatingViaKeyboard(false)
  })

  return isNavigatingViaKeyboard
}
