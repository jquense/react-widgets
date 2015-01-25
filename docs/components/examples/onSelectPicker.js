'use strict';
module.exports = function(widgetName){
var code = 
`
var ${widgetName} = ReactWidgets.${widgetName}

var widget =
      <${widgetName} 
        onSelect={() => alert('selected!')} 
        onChange={() => alert('changed!')}/>

React.render(widget, mountNode);`

return code
}