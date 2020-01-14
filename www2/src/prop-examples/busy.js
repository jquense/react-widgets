import { stripIndent } from 'common-tags'

export default function(widgetName) {
  if (widgetName === 'SelectList')
    return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    render(
      <${widgetName} busy />
    );
  `

  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

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
