'use strict';
module.exports = function(widgetName, isArray){
var value = !isArray ? 'colors[0]' : 'colors.slice(0,2)'
var code = 
`
var ${widgetName} = ReactWidgets.${widgetName};

var colors = [
  { id: 0, name: 'orange'},
  { id: 1, name: 'purple'},
  { id: 2, name: 'red' },
  { id: 3, name: 'blue' },
];

var widget = 
    <${widgetName} 
      textField='name'
      defaultValue={${value}} 
      data={colors}/>

React.render(widget, mountNode);`

return code
}

