import { stripIndent } from 'common-tags';


export default function(widgetName) {

 return stripIndent`
    let { ${widgetName} } = ReactWidgets;

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

    ReactDOM.render(widget, mountNode)
  `
}
