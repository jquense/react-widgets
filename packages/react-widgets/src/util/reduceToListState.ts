/* eslint-disable */
import { presets } from './Filter'
import { groupBySortedKeys } from './_'
import { dataText, dataValue } from './dataHelpers'
import { ValueAccessor } from './dataHelpers'

const EMPTY_VALUE = {}
const returnFalse = () => false

export interface DataState<T extends object = object> {
  data: T[]
  groupBy?: 'string' | Function
  groups?: Record<string, T[]>
  sequentialData?: T[]
  sortedKeys: string[]
}

export interface List<TState extends DataState> {
  dataState: TState
  isDisabled(item: any): boolean

  first<TItem = unknown>(): TItem | undefined
  last<TItem = unknown>(): TItem | undefined
  prev<TItem = unknown>(item: TItem, word?: string): TItem | undefined
  next<TItem = unknown>(item: TItem, word?: string): TItem | undefined

  prevEnabled<TItem = unknown>(item: TItem): TItem | undefined
  nextEnabled<TItem = unknown>(item: TItem): TItem | undefined
}

export function defaultGetDataState(
  data: object[],
  { groupBy },
  lastState?: DataState,
) {
  if (
    !lastState ||
    (lastState.data !== data || lastState.groupBy !== groupBy)
  ) {
    if (!groupBy) return {}

    let keys = []
    let groups = groupBySortedKeys(groupBy, data, keys)

    return {
      data,
      groupBy,
      groups,
      sortedKeys: keys,
      sequentialData: Object.keys(groups).reduce(
        (flat, grp) => flat.concat(groups[grp]),
        [] as object[],
      ),
    }
  }

  return lastState
}

type DataStateGetter<TState extends DataState> = (
  data: object[],
  props: any,
  lastState?: TState,
) => TState

const getStateGetterFromList = <TState extends DataState>({
  listComponent: l,
}): DataStateGetter<TState> | undefined => l && l.getDataState

const getIsDisabled = (
  disabledProp: boolean | object[],
  valueField: ValueAccessor,
) =>
  !Array.isArray(disabledProp)
    ? returnFalse
    : item =>
        disabledProp.some(
          i => dataValue(item, valueField) === dataValue(i, valueField),
        )

export interface ReduceToListOptions<TState extends DataState> {
  nextProps?: any
  getDataState?: DataStateGetter<TState>
}

export default function reduceToListState<TState extends DataState = DataState>(
  nextListData: object[],
  prevList?: List<TState>,
  options: ReduceToListOptions<TState> = {},
) {
  let { disabled, valueField, textField } = options.nextProps

  const getDataState =
    options.getDataState ||
    getStateGetterFromList(options.nextProps) ||
    (defaultGetDataState as DataStateGetter<TState>)

  const dataState = getDataState(
    nextListData,
    options.nextProps,
    prevList && prevList.dataState,
  )

  const data = (dataState && dataState.sequentialData) || nextListData

  let isDisabled = getIsDisabled(disabled, valueField)

  let moveNext = (item: any, word?: string) =>
    isDisabled(item) ||
    (word &&
      !presets.startsWith(
        dataText(item, textField).toLowerCase(),
        word.toLowerCase(),
      ))

  const list: List<TState> = {
    dataState,
    isDisabled,

    first: () => list.next(EMPTY_VALUE as any),
    last: () => list.prevEnabled(data[data.length - 1] as any),

    prev(item: any, word?: string) {
      let nextIdx = Math.max(0, data.indexOf(item)) - 1
      while (nextIdx > -1 && moveNext(data[nextIdx], word)) nextIdx--

      if (nextIdx >= 0) return data[nextIdx]
      return isDisabled(item) ? undefined : item
    },

    next(item: any, word?: string) {
      let nextIdx = data.indexOf(item) + 1
      while (nextIdx < data.length && moveNext(data[nextIdx], word)) nextIdx++

      if (nextIdx < data.length) return data[nextIdx]
      return isDisabled(item) ? undefined : item
    },

    prevEnabled: (item: any) => (isDisabled(item) ? list.prev(item) : item),
    nextEnabled: (item: any) => (isDisabled(item) ? list.next(item) : item),
  }

  return list
}
