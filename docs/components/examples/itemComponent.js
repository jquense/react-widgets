'use strict';

module.exports = function(widgetName) {

var code =
`
var ${widgetName} = ReactWidgets.${widgetName};
var people = listOfPeople();

var ListItem = React.createClass({
  render() {
    var person = this.props.item;

    return (
      <span>
        <strong>{ person.firstName }</strong>
        { " " + person.lastName }
      </span>);
  }
})

var widget =(
    <${widgetName}
      data={people}
      textField='name'
      itemComponent={ListItem}/>
  )

ReactDOM.render(widget, mountNode);`

return code
}