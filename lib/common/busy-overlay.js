/** @jsx React.DOM */
'use strict';
var React = require('react');

var BusyOverlay = React.createClass({displayName: 'BusyOverlay',

  render: function() {
    return (
      React.DOM.div({className: "rw-loading-mask"}, 
        React.DOM.div({className: "rw-loading-backdrop"}), 
        React.DOM.div({className: "rw-loading-image"})
      ) 
    );
  }
});

module.exports = BusyOverlay;