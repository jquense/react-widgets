import { stripIndent } from 'common-tags'
import { isValueArray, isListComponent } from '../config'

export default function(widgetName, value) {
  value =
    value || (!isValueArray(widgetName) ? '"orange"' : '["orange", "blue"]')

  let example = isListComponent(widgetName)
    ? `<>
        <${widgetName}
          disabled
          data={colors}
          defaultValue={${value}}
        />
        <${widgetName}
          data={colors}
          defaultValue={${value}}
          disabled={["red", "purple"]}
        />
      </>`
    : `<${widgetName}
        disabled
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
