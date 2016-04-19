'use strict';
var React = require('react')
  , MenuItem = require('../bootstrap').MenuItem;

var ApiMenuItem = React.createClass({

  contextTypes: {
    prefix: React.PropTypes.string.isRequired
  },

  navigate(e){
    var anchor = document.getElementById('/' + this.context.prefix + this.props.children.replace(' ', '_'))
    e.preventDefault()
    window.scrollTo(window.pageXOffset, anchor.offsetTop)
  },

  render: function() {

    if( this.props.divider)
      return  <MenuItem divider={true}></MenuItem>

    var child = this.props.children;

    return (
       <MenuItem className="prop-item" href={'#/' + this.context.prefix + this.props.children.replace(' ', '_')}>
        {child}
       </MenuItem>
    );
  }

});

module.exports = ApiMenuItem;