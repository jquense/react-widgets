import { stripIndent } from 'common-tags';
import { isValueArray, isListComponent } from '../config';

export default function(widgetName) {
  var value = !isValueArray(widgetName) ?
    '"orange"' : '["orange", "blue"]';

  let example = isListComponent(widgetName) ? (
    `<div>
        <${widgetName}
          disabled
          data={colors}
          defaultValue={${value}}
        />
        <${widgetName}
          data={colors}
          defaultValue={${value}}
          disabled={["red", "purple"]}
        />
      </div>`
  ) : (
    `<${widgetName}
        disabled
        data={colors}
        defaultValue={${value}}
      />`
  )

  return stripIndent`
    let { ${widgetName} } = ReactWidgets

    let colors = ['orange', 'red', 'blue', 'purple'];

    let example = (
      ${example}
    )

    ReactDOM.render(example, mountNode);
  `
}
