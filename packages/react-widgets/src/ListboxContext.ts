import React, { useContext, useEffect, useLayoutEffect, useMemo } from 'react'
import { DataItem } from './types'
import { presets } from './util/Filter'
import { TextAccessorFn } from './util/dataHelpers'

const EMPTY_VALUE = {}

type ListOptionContext = {
  options: unknown[]
}
export const OptionsContext = React.createContext<ListOptionContext | null>(
  null,
)

export function getList(
  options: DataItem[],
  textAccessor: TextAccessorFn,
  disabledItems: DataItem[],
) {
  const isDisabled = item => disabledItems.indexOf(item) !== -1

  let moveNext = (item: any, word?: string) =>
    isDisabled(item) ||
    (word &&
      !presets.startsWith(textAccessor(item).toLowerCase(), word.toLowerCase()))

  const list = {
    first: () => list.next(EMPTY_VALUE),

    last: () => {
      const item = options[options.length - 1]
      return isDisabled(item) ? list.prev(item) : item
    },

    prev(item: any, word?: string) {
      let nextIdx = Math.max(0, options.indexOf(item)) - 1
      while (nextIdx > -1 && moveNext(options[nextIdx], word)) nextIdx--

      if (nextIdx >= 0) return options[nextIdx]
      return isDisabled(item) ? undefined : item
    },

    next(item: any, word?: string) {
      let nextIdx = options.indexOf(item) + 1
      while (nextIdx < options.length && moveNext(options[nextIdx], word))
        nextIdx++

      if (nextIdx < options.length) return options[nextIdx]
      return isDisabled(item) ? undefined : item
    },

    nextEnabled: (item: any) => (isDisabled(item) ? list.next(item) : item),
  }
  return list
}

export function useOptionList(
  textAccessor: TextAccessorFn,
  disabledItems: DataItem[],
) {
  const options = useMemo<object[]>(() => [], [])

  const list = getList(options, textAccessor, disabledItems)

  return [useMemo(() => ({ options }), [options]), list] as const
}

export function useClearListOptions(providedContext?: ListOptionContext) {
  const parent = useContext(OptionsContext)
  const ctx = providedContext || parent
  useLayoutEffect(() => {
    if (ctx) ctx.options.length = 0
  })
}

export function useListOption(dataItem: unknown) {
  const ctx = useContext(OptionsContext)

  useEffect(() => {
    if (!ctx) return
    const idx = ctx.options.length
    ctx.options.push(dataItem)
    return () => {
      if (ctx.options[idx] === dataItem) {
        ctx.options.splice(idx, 1)
      }
    }
  })
}
