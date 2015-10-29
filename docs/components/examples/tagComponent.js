'use strict';

module.exports = function(widgetName) {

var code =
`
var ${widgetName} = ReactWidgets.${widgetName};
var people = listOfPeople();

var TagItem = React.createClass({
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
      defaultValue={people.slice(0, 1)}
      textField='name'

      tagComponent={TagItem}/>)

ReactDOM.render(widget, mountNode)`

return code
}


