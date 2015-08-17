'use strict';
module.exports = function(widgetName){
var code =
`
var ${widgetName} = ReactWidgets.${widgetName}
  , people = listOfPeople();

var Example = React.createClass({

  getInitialState() {
    return { value: people.slice(0,2) };
  },

  _create(name){
    var tag = { name, id: people.length + 1 }
    var value = this.state.value.concat(tag)
    // add new tag to the data list
    people.push(tag)
    //add new tag to the list of values
    this.setState({ value })
  },

  render(){
    // create a tag object
    return (
      <Multiselect data={people}
        value={this.state.value}
        textField="name"
        onCreate={this._create}
        onChange={value => this.setState({ value })}/>
    )
  }
});

ReactDOM.render(<Example/>, mountNode);`

return code
}