"use strict";
var React = require("react"),
    version = React.version.split(".").map(parseFloat);

var compat = module.exports = {

  version: function () {
    return version;
  },

  propType: function (fn) {

    return function validator(props, propName, componentName, location) {
      var err = fn.call(this, props, propName, componentName, location);

      if (err && err !== true) return err;
    };
  },

  type: function (component) {
    if (version[0] === 0 && version[1] >= 13) return component;

    return component.type;
  }
};