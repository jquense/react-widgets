"use strict";
var React = require("react"),
    _ = require("../util/_"),
    filter = require("../util/filter"),
    helper = require("./DataHelpersMixin");

module.exports = {

  propTypes: {
    textField: React.PropTypes.string },

  first: function () {
    return this._data()[0];
  },

  last: function () {
    var data = this._data();
    return data[data.length - 1];
  },

  prev: function (item, word) {
    var data = this._data(),
        idx = data.indexOf(item);

    if (idx === -1) idx = data.length;

    return word ? findPrevInstance(this, data, word, idx) : --idx < 0 ? data[0] : data[idx];
  },

  next: function (item, word) {
    var data = this._data(),
        idx = data.indexOf(item);

    return word ? findNextInstance(this, data, word, idx) : ++idx === data.length ? data[data.length - 1] : data[idx];
  }

};

function findNextInstance(ctx, data, word, startIndex) {
  var matches = filter.startsWith,
      idx = -1,
      len = data.length,
      foundStart,
      itemText;

  word = word.toLowerCase();

  while (++idx < len) {
    foundStart = foundStart || idx > startIndex;
    itemText = foundStart && helper._dataText.call(ctx, data[idx]).toLowerCase();

    if (foundStart && matches(itemText, word)) return data[idx];
  }
}

function findPrevInstance(ctx, data, word, startIndex) {
  var matches = filter.startsWith,
      idx = data.length,
      foundStart,
      itemText;

  word = word.toLowerCase();

  while (--idx >= 0) {
    foundStart = foundStart || idx < startIndex;
    itemText = foundStart && helper._dataText.call(ctx, data[idx]).toLowerCase();

    if (foundStart && matches(itemText, word)) return data[idx];
  }
}