import { stripIndent } from 'common-tags';

export default function(widgetName) {
  return stripIndent`
    let { ${widgetName} } = ReactWidgets;

    let people = listOfPeople();

    let ValueInput = ({ item }) => (
      <span>
        <strong>hi,</strong>{' ' + item.name}
      </span>
    );

    let widget = (
      <${widgetName}
        data={people}
        textField='name'
        valueComponent={ValueInput}
        defaultValue={people[0]}
      />
    )

    ReactDOM.render(widget, mountNode);
  `
}
