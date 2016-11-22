import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

var widgets = [
  'DropdownList',
  'Combobox',
  'NumberPicker',
  'Multiselect',
  'SelectList',
  'Calendar',
  'DateTimePicker'
];


export default function WidgetList() {
  return (
    <Navbar staticTop className='widget-nav'>
      <Nav role='navigation'>
        {widgets.map(name => (
          <LinkContainer key={name} to={`/${name.toLowerCase()}`}>
            <NavItem>{name}</NavItem>
          </LinkContainer>
        ))}
      </Nav>
    </Navbar>
  )
}
