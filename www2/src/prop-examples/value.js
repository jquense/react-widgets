import { stripIndent } from 'common-tags'

import { isValueArray } from '../config'

export default function(widgetName) {
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
