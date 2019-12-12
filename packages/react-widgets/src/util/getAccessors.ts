import { useMemo } from 'react'
import { DataItem, Value } from '../types'
import * as helpers from './dataHelpers'

export type Accessors = ReturnType<typeof useAccessors>

export const useAccessors = (
  textField?: helpers.TextAccessor,
  dataKey?: helpers.DataKeyAccessor,
) => {
  return useMemo(
    () => ({
      text: (item: DataItem) => helpers.dataText(item, textField),
      value: (item: DataItem) => helpers.dataValue(item, dataKey),
      indexOf: (data: DataItem[], value: Value) =>
        helpers.dataIndexOf(data, value, dataKey),
      matches: (a: DataItem, b: DataItem) =>
        helpers.valueMatcher(a, b, dataKey),
      findOrSelf: <TDataItem>(data: TDataItem[], value: Value) =>
        helpers.dataItem(data, value, dataKey),
      includes: (data: DataItem[], value: Value) =>
        helpers.dataIndexOf(data, value, dataKey) !== -1,
    }),
    [textField, dataKey],
  )
}
