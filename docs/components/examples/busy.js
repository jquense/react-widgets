'use strict';
module.exports = function(widgetName){
var code =
`
var ${widgetName} = ReactWidgets.${widgetName};

ReactDOM.render(
  <${widgetName} busy />, mountNode);`

return code
}

