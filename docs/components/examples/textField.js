'use strict';
module.exports = function(widgetName){
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
      defaultValue={colors[0]} 
      data={colors}/>

React.render(widget, mountNode);`

return code
}

