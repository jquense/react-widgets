import { stripIndent } from 'common-tags';

export default function(widgetName) {
  return stripIndent`
    let { ${widgetName} } = ReactWidgets;
    let people = listOfPeople();

    let widgets = (
      <div>
        <${widgetName}
          data={people}
          textField='name'
          groupBy='lastName'
        />
        <${widgetName}
          data={people}
          textField='name'
          groupBy={person => person.name.length}
        />
      </div>
    )

    ReactDOM.render(widgets, mountNode);
  `
}
