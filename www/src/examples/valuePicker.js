import { stripIndent } from 'common-tags'

export default function(widgetName, values) {
  return stripIndent`
    let { ${widgetName} } = ReactWidgets;

    let widgets = (
      <>
        ${values
          .map(
            v => `
        <${widgetName} defaultValue={${v}} />`
          )
          .join('')
          .trim()}
      </>
    )

    render(widgets);
  `
}
