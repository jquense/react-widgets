import * as helpers from './dataHelpers'

export default function createAccessors({ textField, valueField }) {
  return {
    text: item => helpers.dataText(item, textField),
    value: item => helpers.dataValue(item, valueField),
    indexOf: (data, item) => helpers.dataIndexOf(data, item, valueField),
    matches: (a, b) => helpers.valueMatcher(a, b, valueField),
    findOrSelf: (data, item) => helpers.dataItem(data, item, valueField),
    find: (data, item) => {
      let idx = helpers.dataIndexOf(data, item, valueField)
      if (~idx) return data[idx]
    },
  }
}
