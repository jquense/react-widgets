const { stripIndent } = require('common-tags')
const { isListComponent, isValueArray } = require('../config')

module.exports = function (widgetName, value) {
  value =
    value || (!isValueArray(widgetName) ? '"orange"' : '["orange", "blue"]')

  let example = isListComponent(widgetName)
    ? `<${widgetName}
    readOnly
    data={colors}
    defaultValue={${value}}
  />`
    : `<${widgetName}
    readOnly
    defaultValue={${value}}
  />`

  return stripIndent`
  import { ${widgetName} } from 'react-widgets';

  ${
    isListComponent(widgetName)
      ? `let colors = ['orange', 'red', 'blue', 'purple'];\n`
      : ''
  }

  ${example}
`
}
