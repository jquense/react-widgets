import { stripIndent } from 'common-tags';

export default function(widgetName) {
  return stripIndent`
    let { ${widgetName} } = ReactWidgets;
    let people = listOfPeople();

    function filterLastName(person, value) {
      let lastname = person.lastName.toLowerCase()
      let search  = value.toLowerCase();

      return lastname.indexOf(search) === 0
    }

    let widgets =(
      <div>
        <${widgetName}
          data={people}
          defaultValue={people[0]}
          textField='name'
          caseSensitive={false}
          minLength={3}
          filter='contains'
        />
        <${widgetName}
          data={people}
          defaultValue={people[0]}
          textField='name'
          filter={filterLastName}
        />
      </div>
    );

    ReactDOM.render(widgets, mountNode);
  `
}
