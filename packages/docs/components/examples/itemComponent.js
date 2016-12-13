import { stripIndent } from 'common-tags';

export default function(widgetName) {
  return stripIndent`
    let { ${widgetName} } = ReactWidgets;
    let people = listOfPeople();

    let ListItem = ({ item }) => (
      <span>
        <strong>{item.firstName}</strong>
        {" " + item.lastName}
      </span>
    );

    var widget =(
      <${widgetName}
        data={people}
        textField='name'
        itemComponent={ListItem}
      />
    )

    ReactDOM.render(widget, mountNode);
  `
}
