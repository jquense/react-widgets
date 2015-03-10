"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = require("react");

module.exports = React.createClass({
  displayName: "exports",

  render: function () {
    var _props = this.props;
    var className = _props.className;
    var props = babelHelpers.objectWithoutProperties(_props, ["className"]);

    return React.createElement(
      "button",
      babelHelpers._extends({}, props, { type: "button", className: (className || "") + " rw-btn" }),
      this.props.children
    );
  }
});