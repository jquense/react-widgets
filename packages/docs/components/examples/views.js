import { stripIndent } from 'common-tags';

export default function(widgetName) {
  return stripIndent`
    let { ${widgetName} } = ReactWidgets;

    let widget = (
      <${widgetName} views={['year', 'decade']} />
    )

    ReactDOM.render(widget, mountNode);
  `
}
