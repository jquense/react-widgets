var React   = require('react')
var Navbar  = require('react-bootstrap/Navbar')
  , Nav     = require('react-bootstrap/Nav')
  , NavItem = require('react-bootstrap/NavItem')


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
    return this.transferPropsTo(
      <Navbar fixedTop activeKey={this.props.page} toggleNavKey={0} toggleButton={toggle}>
          <Nav role='navigation' key={0} activeKey='docs' >
            <NavItem key='docs' href="#">Docs</NavItem>
            <NavItem key='dl' href="https://github.com/theporchrat/react-widgets/releases">Download</NavItem>
            <NavItem key='github' href="https://github.com/theporchrat/react-widgets">Github</NavItem>
          </Nav>
      </Navbar>
    )
  }
})