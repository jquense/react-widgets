import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import NavMenu from './NavMenu';

export default React.createClass({

  displayName: 'page',

  render(){

    return (
      <Navbar fixedTop activeKey={this.props.page}>
        <Navbar.Header>
          <Navbar.Brand>React Widgets</Navbar.Brand>
        </Navbar.Header>
        <Nav role='navigation' selectKey={0} activeKey='docs' pullRight className='main-nav' >
          <NavMenu />
          <NavItem key='dl' href="https://github.com/jquense/react-widgets/releases">Download</NavItem>
          <NavItem key='github' href="https://github.com/jquense/react-widgets">Github</NavItem>
        </Nav>
      </Navbar>
    )
  }
})
