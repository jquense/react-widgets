'use strict';
module.exports = function(widgetName, prop, value){
var code = 
`
var ${widgetName} = ReactWidgets.${widgetName};

React.render(
  <${widgetName} ${prop}={${value}} />, mountNode);`

return code
}


