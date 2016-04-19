'use strict';

module.exports = function(widgetName) {

var code =
`
var ${widgetName} = ReactWidgets.${widgetName};
var people = listOfPeople();

var ValueInput = React.createClass({
  render() {
    return (
      <span>
        <strong>hi, </strong>{ this.props.item.name }
      </span>);
  }
})

var widget =(
    <${widgetName} data={people}
      textField='name'
      defaultValue={people[0]}
      valueComponent={ValueInput}/>
  )

ReactDOM.render(widget, mountNode);`

return code
}


