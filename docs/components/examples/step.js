'use strict';
module.exports = function(widgetName, isArray){
  var code =
    `
var ${widgetName} = ReactWidgets.${widgetName};

function step(currentValue, isUp) {
    if(isUp) {
        return currentValue + 2;
    } else {
        return currentValue - 1;
    }
}
ReactDOM.render(
    <${widgetName} step={step} />
  , mountNode);`

  return code
}


