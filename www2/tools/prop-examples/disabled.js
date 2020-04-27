const { stripIndent } = require('common-tags')
const { isListComponent, isValueArray } = require('../config')

module.exports = function (widgetName, value) {
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
    import { ${widgetName} } from 'react-widgets';

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
