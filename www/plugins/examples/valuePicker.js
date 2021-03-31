const { stripIndent } = require('common-tags')

module.exports = function (widgetName, values) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';


    <>
      ${values
        .map(
          (v) => `
      <${widgetName} defaultValue={${v}} />`,
        )
        .join('')
        .trim()}
    </>
  `
}
