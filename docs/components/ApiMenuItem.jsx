'use strict';
var React = require('react')
  , MenuItem = require('../bootstrap').MenuItem;

var ApiMenuItem = React.createClass({

  contextTypes: {
    prefix: React.PropTypes.string.isRequired
  },

  render: function() {

    if( this.props.divider)
      return  <MenuItem divider={true}></MenuItem>

    var child = this.props.children;

    return (
       <MenuItem className="prop-item" href={'#' + this.context.prefix + child.replace(' ', '_')}>
        {child}
       </MenuItem>
    );
  }

});

module.exports = ApiMenuItem;