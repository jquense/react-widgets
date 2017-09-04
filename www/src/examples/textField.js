import { stripIndent } from 'common-tags';

import { isValueArray } from '../config';

export default function(widgetName) {
  let value = !isValueArray(widgetName) ? 'people[0]' : 'people.slice(0,2)'
  let text = widgetName === 'Combobox'
    ? "item => typeof item === 'string' ? item : item.firstName + ' ' + item.lastName"
    : "item => item.firstName + ' ' + item.lastName"

 return stripIndent`
    let { ${widgetName} } = ReactWidgets;

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

    ReactDOM.render(widgets, mountNode);
  `
}
