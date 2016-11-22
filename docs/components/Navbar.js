import React from 'react';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';

import WidgetNav from './WidgetNav';

export default function Page() {
  return (
    <Navbar fixedTop fluid className="app-navbar">
      <WidgetNav />
      <Nav role='navigation' style={{ marginLeft: 'auto' }}>
        <NavDropdown pullRight title={<span className='r'>RW</span>}>
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
    </Navbar>
  )
}
