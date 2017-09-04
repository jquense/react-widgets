import { stripIndent } from 'common-tags';

export default function(widgetName) {
  return stripIndent`
    let { ${widgetName} } = ReactWidgets

    let widget = (
      <${widgetName}
        dropUp
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
