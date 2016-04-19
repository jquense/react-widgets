'use strict';

module.exports = function(widgetName) {

var code =
`
var ${widgetName} = ReactWidgets.${widgetName};
var people = listOfPeople();

var GroupByLength = React.createClass({
  render() {
    return (<span>
        {this.props.item + ' letters long'}
      </span>);
  }
})

var widget =(
    <${widgetName}
      data={people} defaultValue={people[0]}
      textField='name'
      groupBy={ person => person.name.length }
      groupComponent={GroupByLength}/>
  )

ReactDOM.render(widget, mountNode);`

return code
}


