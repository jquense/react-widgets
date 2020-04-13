/* eslint-disable react-hooks/exhaustive-deps */
import querySelectorAll from 'dom-helpers/querySelectorAll'
import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  useRef,
} from 'react'
import { TextAccessorFn } from './Accessors'

type FocusListContext = {
  focusedItem: any | undefined
  activeId?: string
  map: WeakMap<HTMLElement, any>
}

export const FocusListContext = React.createContext<FocusListContext | null>(
  null,
)

export interface FocusProps {
  children: any
  textAccessor: TextAccessorFn
}

export interface FocusList<TDataItem = unknown> {
  focus: (el: HTMLElement | null | undefined) => void
  first: () => HTMLElement | undefined
  last: () => HTMLElement | undefined
  prev(opts?: FocusOptions): HTMLElement | undefined
  next(opts?: FocusOptions): HTMLElement | undefined
  hasFocused: () => boolean
  getFocused: () => TDataItem | undefined
  toDataItem: (el: HTMLElement) => TDataItem | undefined
  context: FocusListContext
  get(): [HTMLElement[], HTMLElement | undefined]
}

interface FocusOptions {
  behavior?: 'clear' | 'stop' | 'loop'
}

const defaultOpts = { behavior: 'stop' as const }

interface FocusListOptions<TDataItem> {
  scope: React.MutableRefObject<HTMLElement | null>
  anchorItem?: TDataItem
  focusFirstItem?: boolean
  scopeSelector?: string
  activeId?: string
}

export function useListOption<TDataItem, T extends HTMLElement>(
  dataItem: TDataItem,
) {
  const ctx = useContext(FocusListContext)
  const prevElement = useRef<T | null>(null)

  // this is a bit convoluted because we want to use a ref object, a callback ref
  // causes an extra render which is fine except that it means the list hook for
  // anchor items fires before elements are processed
  const ref = useRef<T>(null)

  useLayoutEffect(
    () => () => {
      ctx?.map.delete(ref.current!)
    },
    [],
  )
  useLayoutEffect(() => {
    if (prevElement.current !== ref.current) {
      ctx?.map.delete(prevElement.current!)
    }

    prevElement.current = ref.current
    if (ref.current && ctx?.map.get(ref.current) !== dataItem) {
      ctx?.map.set(ref.current, dataItem)
    }
  })

  const focused = dataItem === ctx?.focusedItem
  return [ref, focused, focused ? ctx?.activeId : undefined] as const
}

export const useFocusList = <TDataItem>({
  scope: listRef,
  anchorItem,
  focusFirstItem = false,
  scopeSelector = '',
  activeId,
}: FocusListOptions<TDataItem>) => {
  const map = useMemo(() => new WeakMap<HTMLElement, any>(), [])

  const [focusedItem, setFocusedItem] = useState<TDataItem>()
  const itemSelector = `${scopeSelector} [data-rw-option][tabindex], ${scopeSelector} [data-rw-focusable]`.trim()

  const get = () => {
    const items = querySelectorAll(listRef.current!, itemSelector)
    return [items, items.find(e => e.dataset.rwFocused === '')] as const
  }

  const list: any = useMemo(() => {
    return {
      get,
      toDataItem: (el: HTMLElement) => map.get(el),

      first() {
        const [[first]] = get()
        return first
      },
      focus(el: HTMLElement | null) {
        if (!el || map.has(el)) setFocusedItem(el ? map.get(el) : undefined)
      },
      last() {
        const [items] = get()
        return items[items.length - 1]
      },

      next({ behavior }: FocusOptions = defaultOpts) {
        const [items, focusedItem] = get()
        let nextIdx = items.indexOf(focusedItem!) + 1

        if (nextIdx >= items.length) {
          if (behavior === 'loop') return items[0]
          if (behavior === 'clear') return undefined
          return focusedItem
        }
        return items[nextIdx]
      },

      prev({ behavior }: FocusOptions = defaultOpts) {
        const [items, focusedItem] = get()
        let nextIdx = Math.max(0, items.indexOf(focusedItem!)) - 1

        if (nextIdx < 0) {
          if (behavior === 'loop') return items[items.length - 1]
          if (behavior === 'clear') return undefined
          return focusedItem
        }
        return items[nextIdx]
      },
    }
  }, [])

  useLayoutEffect(() => {
    if (!anchorItem) {
      list.focus(null)
      return
    }

    const element = get()[0].find(el => list.toDataItem(el) === anchorItem)
    list.focus(element)
  }, [anchorItem])

  useLayoutEffect(() => {
    if (!listRef.current) return
    const [, focusedElement] = get()
    const hasItem = focusedElement != null

    if (
      (!hasItem && focusFirstItem) ||
      (hasItem && !listRef.current.contains(focusedElement!))
    ) {
      if (focusFirstItem) list.focus(list.first())
      else list.focus(null)
    }
  })

  const context = useMemo(
    () => ({
      map,
      focusedItem,
      activeId,
    }),
    [focusedItem, activeId],
  )

  list.context = context

  list.getFocused = useCallback(() => focusedItem, [focusedItem])
  list.hasFocused = () => focusedItem !== undefined

  return list as FocusList<TDataItem>
}
