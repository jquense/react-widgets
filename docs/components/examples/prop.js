'use strict';
module.exports = function(widgetName, prop, value){
  var props = prop;

  if (arguments.length === 3)
    props = { [prop]: value }

var code =
`
var ${widgetName} = ReactWidgets.${widgetName};

ReactDOM.render(
  <${widgetName} ${map(props)}/>, mountNode);`

return code
}


function map(o) {
  var str = '';

  for (var key in o) if ( o.hasOwnProperty(key) )
    str += ` \n\t\t${key}={${o[key]}}`

  if (Object.keys(o).length === 1)
    return str.trim()

  return str.substr(1)
}