'use strict';
var React   = require('react')
var Tbs     = require('../bootstrap')


module.exports = React.createClass({

  displayName: 'page',

  render: function(){

    return (
      <Tbs.Navbar staticTop activeKey={this.props.page} brand='React Widgets'>
        <Tbs.Nav role='navigation' selectKey={0} activeKey='docs' className='navbar-nav main-nav' >
          <Tbs.NavItem key='docs' href="#">Docs</Tbs.NavItem>
          <Tbs.NavItem key='dl' href="https://github.com/jquense/react-widgets/releases">Download</Tbs.NavItem>
          <Tbs.NavItem key='github' href="https://github.com/jquense/react-widgets">Github</Tbs.NavItem>
        </Tbs.Nav>
      </Tbs.Navbar>
    )
  }
})