import { useMemo } from 'react'
import * as helpers from './dataHelpers'

export const useAccessors = (
  textField: helpers.TextAccessor,
  valueField: helpers.ValueAccessor,
) => {
  return useMemo(
    () => ({
      text: (item: object) => helpers.dataText(item, textField),
      value: (item: object) => helpers.dataValue(item, valueField),
      indexOf: (data: object[], item: object) =>
        helpers.dataIndexOf(data, item, valueField),
      matches: (a: object, b: object) => helpers.valueMatcher(a, b, valueField),
      findOrSelf: (data: object[], item: object) =>
        helpers.dataItem(data, item, valueField),
      includes: (data: object[], item: object) =>
        helpers.dataIndexOf(data, item, valueField) !== -1,
    }),
    [textField, valueField],
  )
}
