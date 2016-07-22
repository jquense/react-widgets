'use strict';
var React = require('react');

var defaultValue = React.createClass({

  render: function() {
    return (
      <span className='default'>
        {'(default: ' + this.props.children + ')'}
      </span>
    );
  }

});

module.exports = defaultValue;
