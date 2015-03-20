'use strict';
module.exports = function(widgetName, prop){
var code = 
`
var ${widgetName} = ReactWidgets.${widgetName}
  , colors = ['orange', 'red', 'blue', 'purple'];

var Example = React.createClass({

  render() {
    return (<div>
      <${widgetName} ${prop} data={colors}/>
      <${widgetName} ${prop}={colors.slice(1,2)}
        data={colors}
        defaultValue={colors.slice(0,2)}/>
    </div>)
  }
});

React.render(<Example/>, mountNode);`

return code
}