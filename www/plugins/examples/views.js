const { stripIndent } = require('common-tags')

module.exports = function(widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let widget = (
      <${widgetName} views={['year', 'decade']} />
    )

    render(widget);
  `
}
