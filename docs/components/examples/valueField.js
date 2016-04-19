'use strict';
module.exports = function(widgetName, isArray){
var value = !isArray ? '1' : '[1,2]'
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
      valueField='id' textField='name'
      data={colors}
      defaultValue={${value}}/>

ReactDOM.render(widget, mountNode);`

return code
}

