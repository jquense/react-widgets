import { stripIndent } from 'common-tags';

export default function(widgetName, prop, { disableItems = false, isArray = false } = {}) {
  var value = !isArray ? '"orange"' : '["orange", "blue"]';

  let example = disableItems ? (
    `<div>
        <${widgetName}
          ${prop}
          data={colors}
          defaultValue={${value}}
        />
        <${widgetName}
          data={colors}
          defaultValue={${value}}
          ${prop}={["red", "purple"]}
        />
      </div>`
  ) : (
    `<${widgetName} ${prop}
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
