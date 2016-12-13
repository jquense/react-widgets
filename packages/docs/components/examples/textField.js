import { stripIndent } from 'common-tags';

export default function(widgetName, isArray, isCmbo){
  let value = !isArray ? 'people[0]' : 'people.slice(0,2)'
  let text = isCmbo
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
