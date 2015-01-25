'use strict';
module.exports = function(widgetName){
var code = 
`
var ${widgetName} = ReactWidgets.${widgetName}
  , colors = ['orange', 'red', 'blue', 'purple'];

var Example = React.createClass({

  getInitialState() {
    return { open: false };
  },

  render() {
    var open = this.state.open
      , toggle = () => this.setState({ open: !open});

    return (<div>
      <button onClick={toggle}>
        { open ? 'close' : 'open'}
      </button>
      <${widgetName} open={open} data={colors} />
    </div>)
  }
});

React.render(<Example/>, mountNode);`

return code
}