'use strict';
module.exports = function(widgetName, isArray){
  var value = !isArray ? '"orange"' : '["orange", "red"]'
var code = 
`
var ${widgetName} = ReactWidgets.${widgetName};

var colors = ['orange', 'red', 'blue', 'purple'];

React.render(
    <${widgetName} defaultValue={${value}} data={colors}/>
  , mountNode);`

return code
}


