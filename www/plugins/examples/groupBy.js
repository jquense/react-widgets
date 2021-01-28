const { stripIndent } = require('common-tags')

module.exports = function (widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let people = listOfPeople();

    <>
      <${widgetName}
        data={people}
        textField='name'
        groupBy='lastName'
      />
      <br />
      <${widgetName}
        data={people}
        textField='name'
        groupBy={person => person.name.length}
      />
    </>
  `
}
