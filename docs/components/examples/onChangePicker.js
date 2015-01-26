'use strict';
module.exports = function(widgetName, values){
  var open = values.length > 1 ? "(<div>" : '('
    , close = values.length > 1 ? "</div>)" : ')'
  var code = 
`
var ${widgetName} = ReactWidgets.${widgetName};

var Example = React.createClass({

  getInitialState() {
    return { ${ values.map(getValue).join(', ')} };
  },

  render() {
    var change = (name, value) => {
      var state = {}
      state['value' + name] = value
      this.setState(state)
    };

    return ${open}
      ${values.map(getWidget).join('').trim()}
    ${close}
  }
});

React.render(<Example/>, mountNode);`

return code

  function getValue(v, idx){
    return `value${idx}: ${v}`
  }

  function getWidget(v, idx){
    return `
      <${widgetName} 
        value={this.state.value${idx}} 
        onChange={change.bind(null, '${idx}')}/>`
  }
}