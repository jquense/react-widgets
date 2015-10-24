'use strict';

module.exports = function() {

var code =
`
var Multiselect = ReactWidgets.Multiselect;
//not a public component, but you can use it via require()
var TagList = ReactWidgets.MultiselectTagList;

var Example = React.createClass({

  getInitialState(){
    let people = listOfPeople();
    return {
      data:   people.slice(2),
      values: people.slice(0,2),
    }
  },

  render(){
    let change = ([val]) => this.setState({
      values: this.state.values.concat(val),
      data:   this.state.data.filter( v => v !== val)
    })

    let remove = val => this.setState({
      values: this.state.values.filter( v => v !== val),
      data:   this.state.data.concat(val)
    })

    return (
      <div>
        <strong>{'Normal multiselect'}</strong>
        <Multiselect
          defaultValue={this.state.values} data={this.state.data}
          valueField='id' textField='name' />
        <hr/>
        <strong>{'Look no wrapper!'}</strong>
        <Multiselect
          value={[]} data={this.state.data}
          onChange={change}
          valueField='id' textField='name' />
        <TagList
          value={this.state.values} onDelete={remove}
          valueField='id' textField='name' />
      </div>)
  },
})

ReactDOM.render(<Example/>, mountNode);`

return code
}