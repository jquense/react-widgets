'use strict';

module.exports = function(widgetName) {

var code =
`
var ${widgetName} = ReactWidgets.${widgetName};
var people = listOfPeople();

var widgets =(<div>
    <${widgetName}
      data={people} defaultValue={people[0]}
      textField='name'
      caseSensitive={false}
      minLength={3}
      filter='contains'/>
    <${widgetName}
      data={people} defaultValue={people[0]}
      textField='name'
      filter={filterLastName}/>
  </div>)

function filterLastName(person, value) {
  var lastname = person.lastName.toLowerCase()
    , search   = value.toLowerCase();

  return lastname.indexOf(search) === 0
}

ReactDOM.render(widgets, mountNode);`

return code
}


