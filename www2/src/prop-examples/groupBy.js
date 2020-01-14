import { stripIndent } from 'common-tags'

export default function(widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';
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

    render(widgets);
  `
}
