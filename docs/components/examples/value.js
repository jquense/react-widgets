'use strict';
module.exports = function(widgetName){
var code = 
`
var ${widgetName} = ReactWidgets.${widgetName};

var colors = ['orange', 'red', 'blue', 'purple'];
var widget = 
    <${widgetName} defaultValue='orange' data={colors}/>

React.render(widget, mountNode);`

return code
}


