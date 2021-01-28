const { stripIndent } = require('common-tags')

module.exports = function (widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';


    <${widgetName}
      dropUp
      data={[
        'orange',
        'red',
        'blue',
        'purple'
      ]}
    />;
  `
}
