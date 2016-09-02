import { stripIndent } from 'common-tags';

export default function(widgetName, prop, isArray=true) {
  var value = !isArray ? '"orange"' : '["orange", "red"]';

  return stripIndent`
    let { ${widgetName} } = ReactWidgets

    let colors = ['orange', 'red', 'blue', 'purple'];

    let example = (
      <div>
        <${widgetName} ${prop}
          data={colors}
          defaultValue={${value}}
        />
        <${widgetName}
          ${prop}={colors.slice(1,2)}
          data={colors}
          defaultValue={${value}}
        />
      </div>
    )

    ReactDOM.render(example, mountNode);
  `
}
