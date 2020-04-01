const { stripIndent } = require('common-tags')

module.exports = function(widgetName) {
  if (widgetName === 'Listbox')
    return stripIndent`
      import { ${widgetName} } from 'react-widgets';

      <${widgetName} busy />
    `

  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    <>
      <${widgetName} busy />
      <${widgetName} busy busySpinner={
        <span className="fas fa-sync fa-spin" />
      }/>
    </>
  `
}
