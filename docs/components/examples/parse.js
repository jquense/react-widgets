'use strict';
module.exports = function(widgetName, isArray){
  var code =
`
var ${widgetName} = ReactWidgets.${widgetName};
var formats = [
  'MMM d yyyy',
  'MMM d yy',
  'd'
];

var widgets = (<div>
    <${widgetName} parse={formats}/>
{/* the naive approach: just use the Date constructor */}
    <${widgetName} parse={str => new Date(str)}/>
    <span>Try typing a date using the specified formats</span>
  </div>)

ReactDOM.render(widgets, mountNode);`

  return code
}
