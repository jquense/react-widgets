var React   = require('react')
var Nav     = require('../bootstrap').Nav
  , NavItem = require('../bootstrap').NavItem


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
      <nav className='navbar navbar-default navbar-fixed-top'>
        <div className="container">
          <div className='navbar-header'>

          </div>
          <Nav role='navigation' key={0} activeKey='docs' className='navbar-nav' >
            <NavItem key='docs' href="#">Docs</NavItem>
            <NavItem key='dl' href="https://github.com/jquense/react-widgets/releases">Download</NavItem>
            <NavItem key='github' href="https://github.com/jquense/react-widgets">Github</NavItem>
          </Nav>
        </div>
      </nav>
    )
  }
})