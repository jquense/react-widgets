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
    var change = (name, value) => this.setState({
        ['value' + name]: value
      });

    return ${open}
      ${values.map(getWidget).join('').trim()}
    ${close}
  }
});

ReactDOM.render(<Example/>, mountNode);`

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

function map(o) {
  var str = '';

  for (var key in o) if ( o.hasOwnProperty(key) )
    str += ` \n\t\t${key}={${o[key]}}`

  if (Object.keys(o).length === 1)
    return str.trim()

  return str.substr(1)
}