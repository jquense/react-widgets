const { stripIndent } = require('common-tags')

module.exports = function(widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let people = listOfPeople();

    let TagItem = ({ item }) => (
      <span>
        <strong>{item.firstName}</strong>
        { " " + item.lastName }
      </span>
    );

    let widget =(
      <${widgetName}
        data={people}
        textField='name'
        tagComponent={TagItem}
        defaultValue={people.slice(0, 1)}
      />
    );

    render(widget)
  `
}
