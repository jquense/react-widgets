"use strict";

module.exports = {

  on: function (node, eventName, handler) {
    if (node.addEventListener) node.addEventListener(eventName, handler, false);else if (node.attachEvent) node.attachEvent("on" + eventName, handler);
  },

  off: function (node, eventName, handler) {
    if (node.addEventListener) node.removeEventListener(eventName, handler, false);else if (node.attachEvent) node.detachEvent("on" + eventName, handler);
  }
};