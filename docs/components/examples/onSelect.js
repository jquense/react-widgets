'use strict';
module.exports = function(widgetName){
var code =
`
var ${widgetName} = ReactWidgets.${widgetName}
  , colors = ['orange', 'red', 'blue', 'purple'];

var widget =
      <${widgetName}
        onSelect={() => alert('selected!')}
        onChange={() => alert('changed!')}
        data={colors} />

ReactDOM.render(widget, mountNode);`

return code
}