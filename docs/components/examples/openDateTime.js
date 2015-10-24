'use strict';
module.exports = function(widgetName){
var code =
`
var ${widgetName} = ReactWidgets.${widgetName};

var Example = React.createClass({

  getInitialState() {
    return { open: false };
  },

  render() {
    var open = this.state.open
      , toggle = e => this.setState({ open: e.target.value });

    return (<div>
      <label>
        <input onChange={toggle} type='radio' value='false' name='r'/>
        Closed
      </label>
      <label>
        <input onChange={toggle} type='radio' value='calendar' name='r'/>
        Calendar
      </label>
      <label>
        <input onChange={toggle} type='radio' value='time' name='r'/>
        Time List
      </label>
      <${widgetName} open={open}/>
    </div>)
  }
});

ReactDOM.render(<Example/>, mountNode);`

return code
}