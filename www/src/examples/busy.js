import { stripIndent } from 'common-tags'

export default function(widgetName) {
  if (widgetName === 'SelectList')
    return stripIndent`
    let { ${widgetName} } = ReactWidgets;

    render(
      <${widgetName} busy />
    );
  `

  return stripIndent`
    let { ${widgetName} } = ReactWidgets;

    render(
      <>
        <${widgetName} busy />
        <${widgetName} busy busySpinner={
          <span className="fas fa-sync fa-spin" />
        }/>
      </>
    );
  `
}
