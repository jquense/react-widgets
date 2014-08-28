var React = require('react')
  , _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function(){
    return { value: 1 }
  },

  render: function(){
    var DropdownList = require('../../../index').DropDownlist
      , list = [
        { label: 'orange', id: 1 },
        { label: 'blue', id: 2 },
        { label: 'red', id: 3 },
      ]

    return (
      <DropdownList 
        data={list}
        value={this.state.value}
        onChange={this._change}
        textField='label'
        valueField='id'/>
    )
  },

  _change: function(value){
    this.setState({
      value: value
    })
  }

})