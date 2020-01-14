import { stripIndent } from 'common-tags'

export default function(widgetName, values) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

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
