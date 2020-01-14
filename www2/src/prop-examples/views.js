import { stripIndent } from 'common-tags'

export default function(widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let widget = (
      <${widgetName} views={['year', 'decade']} />
    )

    render(widget);
  `
}
