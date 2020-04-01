import { dataText, TextAccessor } from './Accessors'
import { useMemo } from 'react'

export const presets = {
  eq: (a: any, b: any) => a === b,
  contains: (a: string, b: string) => a.indexOf(b) !== -1,
  startsWith: (a: string, b: string) => a.lastIndexOf(b, 0) === 0,
}

export type FilterFunction<TDataItem> = (
  item: TDataItem,
  searchTerm: string,
  idx?: number,
) => boolean

export type FilterPreset = keyof typeof presets

export type Filter<TDataItem> =
  | boolean
  | FilterPreset
  | FilterFunction<TDataItem>
  | null

function normalizeFilter<TDataItem>(
  filter: Filter<TDataItem>,
  textField?: TextAccessor,
): FilterFunction<TDataItem> | null {
  if (filter === false) return null
  if (typeof filter === 'function') return filter

  const filterPreset = presets[filter === true ? 'startsWith' : filter || 'eq']
  return (item: TDataItem, searchTerm: string) => {
    let textValue = dataText(item, textField)
    return filterPreset(textValue.toLowerCase(), searchTerm.toLowerCase())
  }
}

export function useFilteredData<TDataItem>(
  data: TDataItem[],
  filterer: Filter<TDataItem>,
  searchTerm = '',
  textAccessor?: TextAccessor,
) {
  return useMemo(() => {
    const filter = normalizeFilter(filterer, textAccessor)

    if (!filter || !searchTerm.trim()) return data

    return data.filter((item, idx) => filter(item, searchTerm, idx))
  }, [data, filterer, searchTerm, textAccessor])
}
