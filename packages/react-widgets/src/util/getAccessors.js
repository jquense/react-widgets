import * as helpers from './dataHelpers'
import { useMemo } from 'react'

export const useAccessors = (textField, valueField) => {
  return useMemo(() => createAccessors({ textField, valueField }), [
    textField,
    valueField,
  ])
}

export default function createAccessors({ textField, valueField }) {
  return {
    text: item => helpers.dataText(item, textField),
    value: item => helpers.dataValue(item, valueField),
    indexOf: (data, item) => helpers.dataIndexOf(data, item, valueField),
    matches: (a, b) => helpers.valueMatcher(a, b, valueField),
    findOrSelf: (data, item) => helpers.dataItem(data, item, valueField),
    includes: (data, item) =>
      helpers.dataIndexOf(data, item, valueField) !== -1,
  }
}
