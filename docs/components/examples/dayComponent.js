import { stripIndent } from 'common-tags';

export default function(widgetName) {
  return stripIndent`
    let { ${widgetName} } = ReactWidgets;

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

    ReactDOM.render(widget, mountNode);
  `
}
