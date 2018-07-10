import { stripIndent } from 'common-tags'
import { isValueArray, isListComponent } from '../config'

export default function(widgetName, value) {
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
  let { ${widgetName} } = ReactWidgets

  ${
    isListComponent(widgetName)
      ? `let colors = ['orange', 'red', 'blue', 'purple']\n`
      : ''
  }
  let example = (
    ${example}
  )

  render(example);
`
}
