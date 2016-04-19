'use strict';
module.exports = function(widgetName, values){
  var open = values.length > 1 ? "(<div>" : ''
    , close = values.length > 1 ? "</div>)" : ''
  var code =
`
var ${widgetName} = ReactWidgets.${widgetName};

var widgets = ${open}
    ${values.map(getWidget).join('').trim()}
  ${close}

ReactDOM.render(widgets, mountNode);`

  return code

  function getWidget(v){
    return `
    <${widgetName} defaultValue={${v}} />`
  }
}




