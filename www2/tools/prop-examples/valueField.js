const { stripIndent } = require('common-tags')

const { isValueArray } = require('../config')

module.exports = function(widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let colors = [
      { id: 0, name: 'orange'},
      { id: 1, name: 'purple'},
      { id: 2, name: 'red' },
      { id: 3, name: 'blue' },
    ];

    let widget = (
      <${widgetName}
        data={colors}
        dataKey='id'
        textField='name'
        defaultValue={${!isValueArray(widgetName) ? '1' : '[1, 2]'}}
      />
    )

    render(widget);
  `
}
