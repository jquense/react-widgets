const { stripIndent } = require('common-tags')

module.exports = function(widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';
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

    render(widget);
  `
}
