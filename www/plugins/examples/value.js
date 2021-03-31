const { stripIndent } = require('common-tags')

const { isValueArray } = require('../config')

module.exports = function(widgetName) {
  let value = !isValueArray(widgetName) ? '"orange"' : '["orange", "red"]'

  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let widget = (
      <${widgetName}
        defaultValue={${value}}
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
