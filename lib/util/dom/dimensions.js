"use strict";
var contains = require("./contains");

function offset(node) {
  var doc = node.ownerDocument,
      docElem = doc && doc.documentElement,
      box = { top: 0, left: 0, height: 0, width: 0 };

  if (!docElem) return;

  if (!contains(docElem, node)) return box;

  if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - docElem.clientTop,
    left: box.left + window.pageXOffset - docElem.clientLeft,
    width: box.width || node.offsetWidth,
    height: box.height || node.offsetHeight };
}

module.exports = {

  width: function (node, client) {
    var win = getWindow(node);
    return win ? win.innerWidth : client ? node.clientWidth : offset(node).width;
  },

  height: function (node, client) {
    var win = getWindow(node);
    return win ? win.innerHeight : client ? node.clientHeight : offset(node).height;
  },

  offset: offset

};

function getWindow(node) {
  return node === node.window ? node : node.nodeType === 9 && node.defaultView;
}