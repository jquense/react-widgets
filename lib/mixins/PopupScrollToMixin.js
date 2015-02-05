"use strict";
var scrollTo = require("../util/dom/scroll");

module.exports = {

  _scrollTo: function _scrollTo(selected, list) {
    var handler = this.props.onMove;

    if (this.props.open) {
      if (handler) handler(selected, list);else {
        this._scrollCancel && this._scrollCancel();
        this._scrollCancel = scrollTo(selected, list);
      }
    }
  } };