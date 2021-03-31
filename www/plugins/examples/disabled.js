const { stripIndent } = require('common-tags')
const { isListComponent, isValueArray } = require('../config')

module.exports = function (widgetName, value) {
  value =
    value || (!isValueArray(widgetName) ? '"orange"' : '["orange", "blue"]')

  const isList = isListComponent(widgetName)

  let example

  if (isList) {
    const start =
      widgetName === 'Listbox'
        ? `<div className='flex space-x-3 w-full justify-evenly'>`
        : `<>`
    const end = widgetName === 'Listbox' ? `</div>` : `</>`

    example = `${start}
      <${widgetName}
        disabled
        data={colors}
        defaultValue={${value}}
      />
      <${widgetName}
        data={colors}
        defaultValue={${value}}
        disabled={['red', 'purple']}
      />
    ${end}`
  } else {
    example = `<${widgetName}
      disabled
      defaultValue={${value}}
    />`
  }

  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    ${isList ? `let colors = ['orange', 'red', 'blue', 'purple'];\n` : ''}

    ${example}
  `
}
