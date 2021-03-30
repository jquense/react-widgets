const { stripIndent } = require('common-tags')

module.exports = function (widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let people = listOfPeople();

    <${widgetName}
      data={people}
      textField='fullName'
      renderValue={({ item }) => (
        <span>
          <strong>hi,</strong>{' ' + item.fullName}
        </span>
      )}
      defaultValue={people[0]}
    />

  `
}
