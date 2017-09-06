import { stripIndent } from 'common-tags';
import { isValueArray } from '../config';

export default function(widgetName) {
  var value = !isValueArray(widgetName) ?
    '"orange"' : '["orange", "blue"]';

  return stripIndent`
    let { ${widgetName} } = ReactWidgets

    let colors = ['orange', 'red', 'blue', 'purple'];

    let example = (
      <${widgetName}
        readOnly
        data={colors}
        defaultValue={${value}}
      />
    )

    ReactDOM.render(example, mountNode);
  `
}
