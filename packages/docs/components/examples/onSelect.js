import { stripIndent } from 'common-tags';

export default function(widgetName) {
  return stripIndent`
    let { ${widgetName} } = ReactWidgets

    let alertWhenSelected = () => alert('selected!');
    let alertWhenChanged = () => alert('changed!');

    let widget = (
      <${widgetName}
        onSelect={alertWhenSelected}
        onChange={alertWhenChanged}
        data={['orange', 'red', 'blue', 'purple']}
      />
    )

    ReactDOM.render(widget, mountNode);
  `
}
