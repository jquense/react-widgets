import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

export const widgets = [
  'Calendar',
  'Combobox',
  'DateTimePicker',
  'DropdownList',
  'Multiselect',
  'NumberPicker',
  'SelectList',
];


export default function WidgetNav({ className }) {
  return (
    <Nav role='navigation' className={className}>
      {widgets.map(name => (
        <LinkContainer key={name} to={`/react-widgets/api/${name}/`}>
          <NavItem>{name}</NavItem>
        </LinkContainer>
      ))}
    </Nav>
  )
}
