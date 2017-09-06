import { stripIndent } from 'common-tags';

export default function(widgetName) {
  return stripIndent`
    let { ${widgetName} } = ReactWidgets;
    let people = listOfPeople();

    let GroupHeading = ({ item }) => (
      <span>{item + ' letters long'}</span>
    );

    let widget = (
      <${widgetName}
        data={people}
        textField='name'
        groupComponent={GroupHeading}
        groupBy={person => person.name.length}
      />
    )

    ReactDOM.render(widget, mountNode);
  `
}
