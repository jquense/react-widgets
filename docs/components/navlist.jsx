var React = require('react')
var Nav     = require('../bootstrap').Nav
  , NavItem = require('../bootstrap').NavItem


module.exports = React.createClass({

  displayName: 'page',

  render: function(){

    return (
      <Nav {...this.props}>
        <NavItem key={0} href='#dropdown-list'>Dropdown List</NavItem>
        <NavItem key={1} href='#combobox'>Combobox</NavItem>
        <NavItem key={2} href='#select-list'>Select</NavItem>
        <NavItem key={3} href='#calendar'>Calendar</NavItem>
        <NavItem key={4} href='#date-picker'>Date Picker</NavItem>
        <NavItem key={5} href='#number-picker'>Number Picker</NavItem>
      </Nav>
    )
  }
})