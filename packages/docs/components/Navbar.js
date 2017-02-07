import React from 'react';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import WidgetNav from './WidgetNav';
import SubNavbar from './SubNavbar';

const styles = less`
  .app-navbar {
    box-shadow: 0 2px 2px rgba(0, 0, 0, .20);
  }

  .app-navbar--widget-nav.navbar-nav {
    margin: 0 auto;
  }
`;

function SiteNav() {
  return (
    <Nav
      role="navigation"
      className="hidden-xs"
      style={{ marginLeft: 'auto' }}
    >
      <NavDropdown id="extra-menu" pullRight title={<span className='r'>RW</span>}>
        <LinkContainer to="/" onlyActiveOnIndex>
          <MenuItem>
            <i className='fa fa-play'/> Getting Started
          </MenuItem>
        </LinkContainer>
        <LinkContainer to="/i18n">
          <MenuItem>
            <i className='fa fa-globe'/> Localization
          </MenuItem>
        </LinkContainer>
        <LinkContainer to="/controllables">
          <MenuItem>
            <i className='fa fa-cogs'/> Controlled components
          </MenuItem>
        </LinkContainer>
        <MenuItem divider />
        <MenuItem href="https://github.com/jquense/react-widgets">
          <i className='fa fa-github'/> Github
        </MenuItem>
      </NavDropdown>
    </Nav>
  )
}

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
      <SubNavbar />
    </div>

  )
}
