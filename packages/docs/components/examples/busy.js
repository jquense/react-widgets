import { stripIndent } from 'common-tags';

export default function(widgetName){
  return stripIndent`
    let { ${widgetName} } = ReactWidgets;

    let widget = (
      <${widgetName} busy />
    )

    ReactDOM.render(widget, mountNode);
  `
}
