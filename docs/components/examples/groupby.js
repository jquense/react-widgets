'use strict';

module.exports = function(widgetName) {

var code =
`
var ${widgetName} = ReactWidgets.${widgetName};

var people = listOfPeople();

var widgets =(
  <div>
    <${widgetName}
      data={people} defaultValue={people[0]}
      textField='name'
      groupBy='lastName'/>

    <${widgetName}
      data={people} defaultValue={people[0]}
      textField='name'
      groupBy={ person => person.name.length }/>
  </div>)

ReactDOM.render(widgets, mountNode);`

return code
}


