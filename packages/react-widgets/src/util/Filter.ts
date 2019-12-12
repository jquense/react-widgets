import PropTypes from 'prop-types'
import * as CustomPropTypes from './PropTypes'
import { TextAccessor, dataText } from './dataHelpers'

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

function normalizeFilter<TDataItem>({
  filter,
  textField,
}: FilterOptions<TDataItem>): FilterFunction<TDataItem> | null {
  if (filter === false) return null
  if (typeof filter === 'function') return filter

  const filterPreset = presets[filter === true ? 'startsWith' : filter || 'eq']
  return (item: TDataItem, searchTerm: string) => {
    let textValue = dataText(item, textField)
    return filterPreset(textValue.toLowerCase(), searchTerm.toLowerCase())
  }
}

export const propTypes = {
  textField: CustomPropTypes.accessor,
  filter: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
    PropTypes.oneOf(Object.keys(presets)),
  ]),
}

interface FilterOptions<TDataItem> {
  filter: Filter<TDataItem>
  searchTerm?: string
  textField?: TextAccessor
}

export function filter<TDataItem>(
  data: TDataItem[],
  { searchTerm = '', ...options }: FilterOptions<TDataItem>,
) {
  const filter = normalizeFilter(options)

  if (!filter || !searchTerm.trim()) return data

  return data.filter((item, idx) => filter(item, searchTerm, idx))
}
