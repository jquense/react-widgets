const { stripIndent } = require('common-tags')

module.exports = function (widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let people = listOfPeople();

    <${widgetName}
      data={people}
      textField='fullName'
      renderListItem={({ item }) => (
        <span>
          <strong>{item.firstName}</strong>
          {" " + item.lastName}
        </span>
      )}
    />
  `
}
