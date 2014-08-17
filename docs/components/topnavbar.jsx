var React = require('react/addons')
var Bootstrap = require('react-bootstrap')


module.exports = React.createClass({

  displayName: 'page',

  render: function(){
    var Navbar  = Bootstrap.Navbar
      , Nav     = Bootstrap.Nav
      , NavItem = Bootstrap.NavItem;

    return this.transferPropsTo(
      <Navbar className='navbar-fixed-top' activeKey={this.props.page}>
        <Nav>
          <NavItem key='docs' href="#">Docs</NavItem>
          <NavItem key='dl' href="#">Download</NavItem>
          <NavItem key='github' href="https://github.com/theporchrat/react-widgets">Github</NavItem>
        </Nav>
      </Navbar>
    )
  }
})