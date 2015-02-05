"use strict";

module.exports = function scrollTop(node, val) {
  var win = node === node.window ? node : node.nodeType === 9 && node.defaultView;

  if (val === undefined) return win ? "pageYOffset" in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;

  if (win) win.scrollTo("pageXOffset" in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
};