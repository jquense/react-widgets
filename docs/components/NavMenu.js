import React from 'react';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';


function NavMenu() {
  return (
    <NavDropdown title='Documentation'>
      <LinkContainer to='/getting-started'>
        <MenuItem>Getting Started</MenuItem>
      </LinkContainer>
      <LinkContainer to='i18n'>
        <MenuItem>Localization</MenuItem>
      </LinkContainer>
      <LinkContainer to='/dropdownlist'>
        <MenuItem>Dropdown List</MenuItem>
      </LinkContainer>
      <LinkContainer to='/combobox'>
        <MenuItem>Combobox</MenuItem>
      </LinkContainer>
      <LinkContainer to='/number-picker'>
        <MenuItem>Number Picker</MenuItem>
      </LinkContainer>
      <LinkContainer to='/multiselect'>
        <MenuItem>Multiselect</MenuItem>
      </LinkContainer>
      <LinkContainer to='/selectlist'>
        <MenuItem>Select List</MenuItem>
      </LinkContainer>
      <LinkContainer to='/calendar'>
        <MenuItem>Calendar</MenuItem>
      </LinkContainer>
      <LinkContainer to='/datetime-picker'>
        <MenuItem>DateTime Picker</MenuItem>
      </LinkContainer>
    </NavDropdown>
  );
}

export default NavMenu;
