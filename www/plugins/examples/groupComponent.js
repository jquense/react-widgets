const { stripIndent } = require('common-tags')

module.exports = function (widgetName) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';
    let people = listOfPeople();

    let GroupHeading = ({ item }) => (
      <span>{item + ' letters long'}</span>
    );

    let widget = (
      <${widgetName}
        data={people}
        textField='fullName'
        groupComponent={GroupHeading}
        groupBy={person => person.fullName.length}
      />
    )

    render(widget);
  `
}
