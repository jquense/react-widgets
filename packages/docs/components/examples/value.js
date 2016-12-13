import { stripIndent } from 'common-tags';

export default function(widgetName, isArray){
  let value = !isArray ? '"orange"' : '["orange", "red"]';

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
