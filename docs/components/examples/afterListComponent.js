'use strict';
module.exports = function(widgetName){
var code =
`
var ${widgetName} = ReactWidgets.${widgetName}
  , colors = ['orange', 'red', 'blue', 'purple'];

var AddButton = React.createClass({
  _onClick() {
    console.log('available props', this.props);
    alert('create new item');
  },
  render() {
    return <button onClick={this._onClick}>+ Add New</button>
  }
})
var Example = React.createClass({
  render() {
    return (
    		<${widgetName}
    			data={colors}
          filter='contains'
    			afterListComponent={(
            <AddButton parentProp="parent prop" />
          )}
    			/>
    )
  }
});

ReactDOM.render(<Example/>, mountNode);`

return code
}
