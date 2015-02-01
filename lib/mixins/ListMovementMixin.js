"use strict";
var React = require("react"),
    _ = require("../util/_"),
    filter = require("../util/filter"),
    helper = require("./DataHelpersMixin");

module.exports = {

  propTypes: {
    textField: React.PropTypes.string },

  first: function first() {
    return this._data()[0];
  },

  last: function last() {
    var data = this._data();
    return data[data.length - 1];
  },

  prev: function prev(item, word) {
    var data = this._data(),
        idx = data.indexOf(item);

    if (idx === -1) idx = data.length;

    return word ? findNextInstance(this, data, word, idx, "prev") : --idx < 0 ? data[0] : data[idx];
  },

  next: function next(item, word) {
    var data = this._data(),
        idx = data.indexOf(item);

    return word ? findNextInstance(this, data, word, idx, "next") : ++idx === data.length ? data[data.length - 1] : data[idx];
  }

};

function findNextInstance(ctx, data, word, current, dir) {
  var matcher = filter.startsWith;

  return _.find(data, function (item, i) {
    return (dir === "next" ? i > current : i < current) && matcher(helper._dataText.call(ctx, item).toLowerCase(), word.toLowerCase());
  });
}