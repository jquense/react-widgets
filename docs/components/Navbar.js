import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import NavMenu from './NavMenu';

export default function Page() {
  return (
    <Navbar fixedTop>
      {/* <Navbar.Header>
        <Navbar.Brand>React Widgets</Navbar.Brand>
      </Navbar.Header> */}
      <Nav role='navigation' pullRight className='main-nav' >
        <LinkContainer to='/getting-started'>
          <NavItem>Getting Started</NavItem>
        </LinkContainer>
        <NavMenu eventKey='docs' />
        <NavItem eventKey='github' href="https://github.com/jquense/react-widgets">Github</NavItem>
      </Nav>
    </Navbar>
  )
}
