'use strict';
module.exports = function(widgetName){
var code =
`
var ${widgetName} = ReactWidgets.${widgetName}
  , colors = ['orange', 'red', 'blue', 'purple'];

var Example = React.createClass({


  render() {

    return <${widgetName} data={colors} tetherPopup />
  }
});

ReactDOM.render(<Example/>, mountNode);`

return code
}
