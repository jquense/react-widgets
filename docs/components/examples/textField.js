'use strict';
module.exports = function(widgetName, isArray, isCmbo){
var value = !isArray ? 'people[0]' : 'people.slice(0,2)'
var text = isCmbo
  ? "item => typeof item === 'string' ? item : item.firstName + ' ' + item.lastName"
  : "item => item.firstName + ' ' + item.lastName"

var code =
`
var ${widgetName} = ReactWidgets.${widgetName};
var people = listOfPeople();

var widgets = (<div>
    <${widgetName}
      textField='firstName'
      defaultValue={${value}}
      data={people}/>
    <${widgetName}
      textField={${text}}
      defaultValue={${value}}
      data={people}/>
  </div>)

ReactDOM.render(widgets, mountNode);`

return code
}

