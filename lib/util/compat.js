"use strict";
var React = require("react");

var compat = module.exports = {

  version: function () {
    return React.version.split(".").map(parseFloat);
  },

  propType: function (fn) {
    return function validator(props, propName, componentName, location) {
      var ver = compat.version(),
          err = fn.call(this, props, propName, componentName, location);

      if (err && err !== true) {
        if (ver[0] === 0 && ver[1] < 11) return void 0;

        return err;
      }
    };
  }
};