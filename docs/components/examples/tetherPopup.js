'use strict';
module.exports = function(widgetName){
var code =
`
var ${widgetName} = ReactWidgets.${widgetName}
  , colors = ['orange', 'red', 'blue', 'purple'];

var Example = React.createClass({


  render() {
    return (
    	<span>
    		<${widgetName}
    			data={colors}
    			tetherPopup
    			popupClassName='tether-className-prop'
    			/>
    		<${widgetName}
    			data={colors}
    			tetherPopup
    			filter='contains'
    			popupClassName='tether-className-prop'
    			/>
    	</span>
    )
  }
});

ReactDOM.render(<Example/>, mountNode);`

return code
}
