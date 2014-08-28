var React = require('react')
var Bootstrap = require('react-bootstrap')


module.exports = React.createClass({

  displayName: 'page',

  render: function(){
    var Nav = Bootstrap.Nav
      , NavItem = Bootstrap.NavItem;

    return this.transferPropsTo(
      <Nav>
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