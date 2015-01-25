'use strict';
module.exports = function(widgetName){
var code = 
`
var ${widgetName} = ReactWidgets.${widgetName};

React.render(
  <${widgetName} busy />, mountNode);`

return code
}

