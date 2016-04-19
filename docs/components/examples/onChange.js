'use strict';
module.exports = function(widgetName, isArray){
var value = !isArray ? 'colors[0]' : 'colors.slice(0,1)'
var code =
`
var ${widgetName} = ReactWidgets.${widgetName}
  , colors = ['orange', 'red', 'blue', 'purple'];

var Example = React.createClass({

  getInitialState() {
    return { value: ${value} };
  },

  render() {
    return (
      <${widgetName}
        data={colors}
        value={this.state.value}
        onChange={value => this.setState({ value })}/>)
  }
});

ReactDOM.render(<Example/>, mountNode);`

  return code

}