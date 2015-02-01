"use strict";
var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react");

module.exports = React.createClass({
  displayName: "exports",


  render: function () {
    var className = this.props.className;
    var props = _objectWithoutProperties(this.props, ["className"]);

    return React.createElement(
      "button",
      _extends({}, props, { type: "button", className: (className || "") + " rw-btn" }),
      this.props.children
    );
  }
});