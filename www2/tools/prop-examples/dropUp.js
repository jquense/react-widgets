const { stripIndent } = require('common-tags')

module.exports = function(widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let widget = (
      <${widgetName}
        dropUp
        data={[
          'orange',
          'red',
          'blue',
          'purple'
        ]}
      />
    );

    render(widget);
  `
}
