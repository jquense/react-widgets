'use strict';
module.exports = function(widgetName){
var code =
`
var ${widgetName} = ReactWidgets.${widgetName}
  , colors = ['orange', 'red', 'blue', 'purple'];

ReactDOM.render(
    <${widgetName} dropUp data={colors} />
  , mountNode);`

return code
}