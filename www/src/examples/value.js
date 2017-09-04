import { stripIndent } from 'common-tags';

import { isValueArray } from '../config';

export default function(widgetName) {
  let value = !isValueArray(widgetName) ? '"orange"' : '["orange", "red"]';

  return stripIndent`
    let { ${widgetName} } = ReactWidgets;

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

    ReactDOM.render(widget, mountNode);
  `
}
