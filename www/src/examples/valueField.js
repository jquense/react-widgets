import { stripIndent } from 'common-tags';

import { isValueArray } from '../config';

export default function(widgetName) {
  return stripIndent`
    let { ${widgetName} } = ReactWidgets;

    let colors = [
      { id: 0, name: 'orange'},
      { id: 1, name: 'purple'},
      { id: 2, name: 'red' },
      { id: 3, name: 'blue' },
    ];

    let widget = (
      <${widgetName}
        data={colors}
        valueField='id'
        textField='name'
        defaultValue={${!isValueArray(widgetName) ? '1' : '[1, 2]'}}
      />
    )

    ReactDOM.render(widget, mountNode);
  `
}
