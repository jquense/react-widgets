'use strict';
var React   = require('react')
var Tbs     = require('../bootstrap')


module.exports = React.createClass({

  displayName: 'page',

  render: function(){

    var toggle = (
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
    )

    return (
      <Tbs.Navbar fixedTop activeKey={this.props.page} toggleNavKey={0} toggleButton={toggle} brand='React Widgets'>
        <Tbs.Nav role='navigation' selectKey={0} activeKey='docs' className='navbar-nav' >
          <Tbs.NavItem key='docs' href="#">Docs</Tbs.NavItem>
          <Tbs.NavItem key='dl' href="https://github.com/jquense/react-widgets/releases">Download</Tbs.NavItem>
          <Tbs.NavItem key='github' href="https://github.com/jquense/react-widgets">Github</Tbs.NavItem>
        </Tbs.Nav>
      </Tbs.Navbar>
    )
  }
})