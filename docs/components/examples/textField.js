'use strict';
module.exports = function(widgetName, isArray){
var value = !isArray ? 'people[0]' : 'people.slice(0,2)'
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
      textField={item => item.firstName + ' ' + item.lastName}
      defaultValue={${value}} 
      data={people}/>
  </div>) 
    
React.render(widgets, mountNode);`

return code
}

