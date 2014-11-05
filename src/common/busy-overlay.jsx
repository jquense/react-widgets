'use strict';
var React = require('react');

var BusyOverlay = React.createClass({

  render: function() {
    return (
      <div className="rw-loading-mask">
        <div className="rw-loading-backdrop"/>
        <div className="rw-loading-image"/>
      </div> 
    );
  }
});

module.exports = BusyOverlay;