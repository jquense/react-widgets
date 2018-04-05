import { presets } from './Filter'
import { groupBySortedKeys } from './_'
import { dataText, dataValue } from './dataHelpers'

const EMPTY_VALUE = {}
const returnFalse = () => false

export function defaultGetDataState(data, { groupBy }, lastState = {}) {
  if (lastState.data !== data || lastState.groupBy !== groupBy) {
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
        []
      ),
    }
  }
  return lastState
}

const getStateGetterFromList = ({ listComponent: l }) => l && l.getDataState

const getIsDisabled = (disabledProp, valueField) =>
  !Array.isArray(disabledProp)
    ? returnFalse
    : item =>
        disabledProp.some(
          i => dataValue(item, valueField) === dataValue(i, valueField)
        )

export function getCommonListProps(
  list,
  accessors,
  {
    groupBy,
    optionComponent,
    itemComponent,
    groupComponent,
    searchTerm,
    listProps,
  }
) {
  return {
    searchTerm,
    groupBy,
    groupComponent,
    itemComponent,
    optionComponent,
    ...listProps,
    data: list.data,
    dataState: list.state,
    textAccessor: accessors.text,
    valueAccessor: accessors.value,
  }
}

export default function reduceToListState(
  nextListData,
  prevList,
  { nextProps, getDataState } = {}
) {
  let { disabled, valueField, textField } = nextProps

  getDataState =
    getDataState || getStateGetterFromList(nextProps) || defaultGetDataState

  const dataState = getDataState(
    nextListData,
    nextProps,
    prevList && prevList.dataState
  )

  const data = (dataState && dataState.sequentialData) || nextListData

  let isDisabled = getIsDisabled(disabled, valueField)

  let moveNext = (item, word) =>
    isDisabled(item) ||
    (word &&
      !presets.startsWith(
        dataText(item, textField).toLowerCase(),
        word.toLowerCase()
      ))

  const list = {
    dataState,
    isDisabled,

    first: () => list.next(EMPTY_VALUE),
    last: () => list.prevEnabled(data[data.length - 1]),

    prev(item, word) {
      let nextIdx = Math.max(0, data.indexOf(item)) - 1
      while (nextIdx > -1 && moveNext(data[nextIdx], word)) nextIdx--

      if (nextIdx >= 0) return data[nextIdx]
      return isDisabled(item) ? null : item
    },

    next(item, word) {
      let nextIdx = data.indexOf(item) + 1
      while (nextIdx < data.length && moveNext(data[nextIdx], word)) nextIdx++

      if (nextIdx < data.length) return data[nextIdx]
      return isDisabled(item) ? null : item
    },

    prevEnabled: item => (isDisabled(item) ? list.prev(item) : item),
    nextEnabled: item => (isDisabled(item) ? list.next(item) : item),
  }

  return list
}
