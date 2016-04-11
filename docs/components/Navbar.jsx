'use strict';
var React   = require('react')
var Navbar = require('react-bootstrap/lib/Navbar')
var Nav = require('react-bootstrap/lib/Nav')
var NavItem = require('react-bootstrap/lib/NavItem')

module.exports = React.createClass({

  displayName: 'page',

  render: function(){

    return (
      <Navbar staticTop activeKey={this.props.page}>
        <Navbar.Header>
          <Navbar.Brand>React Widgets</Navbar.Brand>
        </Navbar.Header>
        <Nav role='navigation' selectKey={0} activeKey='docs' className='navbar-nav main-nav' >
          <NavItem key='docs' href="#">Docs</NavItem>
          <NavItem key='dl' href="https://github.com/jquense/react-widgets/releases">Download</NavItem>
          <NavItem key='github' href="https://github.com/jquense/react-widgets">Github</NavItem>
        </Nav>
      </Navbar>
    )
  }
})
