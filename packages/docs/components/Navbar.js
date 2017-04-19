import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import WidgetNav from './WidgetNav';
import SubNavbar from './SubNavbar';

const _ = less`
  .app-navbar {
    box-shadow: 0 2px 2px rgba(0, 0, 0, .20);
  }

  .app-navbar--widget-nav.navbar-nav {
    margin: 0 auto;
  }
`;


function MobileNav() {
  return (
    <Nav
      role="navigation"
      className="visible-xs"
    >
      <LinkContainer to="/" onlyActiveOnIndex>
        <NavItem>Getting Started</NavItem>
      </LinkContainer>
      <LinkContainer to="/i18n">
        <NavItem>Localization </NavItem>
      </LinkContainer>
      <LinkContainer to="/controllables">
        <NavItem>Controlled components</NavItem>
      </LinkContainer>
      <NavItem href="https://github.com/jquense/react-widgets">
         Github
      </NavItem>
    </Nav>
  )
}

export default function ApiNavbar() {
  return (
    <div>
      <Navbar fixedTop fluid className="app-navbar">
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <WidgetNav className="app-navbar--widget-nav" />
          <MobileNav />
        </Navbar.Collapse>
      </Navbar>
      <div style={{ marginTop: 50 }} />
      <SubNavbar className="hidden-xs" />
    </div>

  )
}
