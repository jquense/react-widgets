const { stripIndent } = require('common-tags')

const { isValueArray } = require('../config')

module.exports = function(widgetName) {
  let value = !isValueArray(widgetName) ? 'people[0]' : 'people.slice(0,2)'
  let text =
    widgetName === 'Combobox'
      ? "item => typeof item === 'string' ? item : item.firstName + ' ' + item.lastName"
      : "item => item.firstName + ' ' + item.lastName"

  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let people = listOfPeople();

    let widgets = (
      <div>
        <${widgetName}
          textField='firstName'
          defaultValue={${value}}
          data={people}
        />
        <${widgetName}
          textField={${text}}
          defaultValue={${value}}
          data={people}
        />
      </div>
    )

    render(widgets);
  `
}
