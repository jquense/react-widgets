"use strict";
var React = require("react");

var BusyOverlay = React.createClass({
  displayName: "BusyOverlay",


  render: function () {
    return React.createElement(
      "div",
      { className: "rw-loading-mask" },
      React.createElement("div", { className: "rw-loading-backdrop" }),
      React.createElement("div", { className: "rw-loading-image" })
    );
  }
});

module.exports = BusyOverlay;