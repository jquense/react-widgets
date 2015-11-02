'use strict';
module.exports = function(widgetName, prop, isArray=true){
  var value = !isArray ? '"orange"' : '["orange", "red"]'
var code =
`
var ${widgetName} = ReactWidgets.${widgetName}
  , colors = ['orange', 'red', 'blue', 'purple'];

var Example = React.createClass({

  render() {
    return (<div>
      <${widgetName} ${prop} 
        data={colors}
        defaultValue={${value}}
      />
      <${widgetName}
        ${prop}={colors.slice(1,2)}
        data={colors}
        defaultValue={${value}}
      />
    </div>)
  }
});

ReactDOM.render(<Example/>, mountNode);`

return code
}
