"use strict";
var canUseDOM = require("react/lib/ExecutionEnvironment").canUseDOM;
var dasherize = require("./dasherize");
var _require = require("./dom/events");

var on = _require.on;
var off = _require.off;
var _require2 = require("./dom/dimensions");

var height = _require2.height;
var width = _require2.width;
var offset = _require2.offset;


var DOM = module.exports = {

  height: height,

  width: width,

  offset: offset,

  on: on,

  off: off,

  hasFocus: function (node) {
    var doc = node.ownerDocument;
    if (doc.activeElement == null) return false;
    return doc.activeElement === node;
  },

  css: require("./dom/css"),

  contains: require("./dom/contains"),

  scrollParent: require("./dom/scrollParent"),

  scrollTop: require("./dom/scrollTop"),

  raf: require("./dom/requestAnimationFrame"),


  animate: require("./dom/animate") };

function getWindow(node) {
  return node === node.window ? node : node.nodeType === 9 && node.defaultView;
}