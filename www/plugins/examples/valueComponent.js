const { stripIndent } = require('common-tags')

module.exports = function (widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let people = listOfPeople();

    let ValueInput = ({ item }) => (
      <span>
        <strong>hi,</strong>{' ' + item.fullName}
      </span>
    );

    let widget = (
      <${widgetName}
        data={people}
        textField='fullName'
        valueComponent={ValueInput}
        defaultValue={people[0]}
      />
    )

    render(widget);
  `
}
