const { stripIndent } = require('common-tags')

module.exports = function (widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';
    let people = listOfPeople();

    function filterLastName(person, value) {
      let lastname = person.lastName.toLowerCase()
      let search  = value.toLowerCase();

      return lastname.indexOf(search) === 0
    }

    <>
      <${widgetName}
        data={people}
        textField='name'
        filter='contains'
      />
      <${widgetName}
        data={people}
        textField='name'
        filter={filterLastName}
      />
    </>
  `
}
