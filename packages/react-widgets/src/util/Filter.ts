import PropTypes from 'prop-types'
import * as CustomPropTypes from './PropTypes'
import { TextAccessor, dataText } from './dataHelpers'

export const presets = {
  eq: (a: any, b: any) => a === b,
  neq: (a: any, b: any) => a !== b,
  gt: (a: any, b: any) => a > b,
  gte: (a: any, b: any) => a >= b,
  lt: (a: any, b: any) => a < b,
  lte: (a: any, b: any) => a <= b,
  contains: (a: string, b: string) => a.indexOf(b) !== -1,
  startsWith: (a: string, b: string) => a.lastIndexOf(b, 0) === 0,
  endsWith(a: string, b: string) {
    const pos = a.length - b.length
    const lastIndex = a.indexOf(b, pos)
    return lastIndex !== -1 && lastIndex === pos
  },
}
export type FilterFunction = (
  item: object,
  searchTerm: string,
  idx?: number,
) => boolean
export type FilterPreset = keyof typeof presets
export type Filter = boolean | FilterPreset | FilterFunction | null

function normalizeFilterType(
  type: Filter,
): FilterPreset | FilterFunction | null {
  if (type === false) return null
  if (type === true) return 'startsWith'
  return type || 'eq'
}

interface NormalizedFilterOptions {
  minLength: number
  caseSensitive: boolean
  filter: FilterFunction | null
  textField: TextAccessor
}

function normalizeFilter({
  filter,
  caseSensitive = false,
  textField,
}: FilterOptions): FilterFunction | null {
  filter = normalizeFilterType(filter)

  if (typeof filter === 'function' || !filter) {
    return filter
  }

  const filterPreset = presets[filter]

  return (item: object, searchTerm: string) => {
    let textValue = dataText(item, textField)

    if (!caseSensitive) {
      textValue = textValue.toLowerCase()
      searchTerm = searchTerm.toLowerCase()
    }

    return filterPreset(textValue, searchTerm)
  }
}

function normalizeOptions(nextOptions: FilterOptions) {
  const options = { ...nextOptions }
  options.minLength = options.minLength || 0
  options.filter = normalizeFilter(options)
  return options as NormalizedFilterOptions
}

export const propTypes = {
  textField: CustomPropTypes.accessor,
  caseSensitive: PropTypes.bool,
  minLength: PropTypes.number,
  filter: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
    PropTypes.oneOf(Object.keys(presets)),
  ]),
}

export function indexOf(data, { searchTerm = '', ...options }: FilterOptions) {
  const { filter, minLength } = normalizeOptions(options)

  if (
    !filter ||
    !searchTerm ||
    !searchTerm.trim() ||
    searchTerm.length < minLength
  )
    return -1

  for (let idx = 0; idx < data.length; idx++)
    if (filter(data[idx], searchTerm, idx)) return idx

  return -1
}

interface FilterOptions {
  searchTerm?: string
  minLength: number
  caseSensitive: boolean
  filter: Filter
  textField: TextAccessor
}

export function filter(
  data: object[],
  { searchTerm = '', ...options }: FilterOptions,
) {
  const { filter, minLength } = normalizeOptions(options)

  if (
    !filter ||
    !searchTerm ||
    !searchTerm.trim() ||
    searchTerm.length < minLength
  )
    return data

  return data.filter((item, idx) => filter(item, searchTerm, idx))
}

// export function suggest(data, { searchTerm = '', ...options }) {
//   let { filter, minLength } = normalizeOptions(options);

//   if (
//     !filter ||
//     !searchTerm ||
//     !searchTerm.trim() ||
//     searchTerm.length < minLength
//   )
//     return searchTerm

//   for (var idx = 0; idx < data.length; idx++)
//     if (filter(data[idx], searchTerm, idx)) return data[idx];

//   return searchTerm
// }
