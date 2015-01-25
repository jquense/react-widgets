'use strict';
module.exports = function(widgetName){
var code = 
`
var ${widgetName} = ReactWidgets.${widgetName}
  , colors = ['orange', 'red', 'blue', 'purple'];

var Example = React.createClass({

  getInitialState() {
    return { value: colors[0] };
  },

  render() {
    var change = value => this.setState({ value });

    return (
      <${widgetName} 
        data={colors} 
        value={this.state.value}
        onChange={change}/>)
  }
});

React.render(<Example/>, mountNode);`

return code
}