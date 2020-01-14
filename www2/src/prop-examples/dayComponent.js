import { stripIndent } from 'common-tags'

export default function(widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let DayComponent = ({ date, label }) => (
      <div style={{ color: date < new Date() && '#F57B7B' }}>
        {label}
      </div>
    );

    let widget = (
      <${widgetName}
        dayComponent={DayComponent}
      />
    )

    render(widget);
  `
}
