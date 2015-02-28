"use strict";
var React = require("react");

module.exports = function (stateKey, disabled) {
  var methodName = stateKey.charAt(0).toUpperCase() + stateKey.substr(1);

  var mixin = (function () {
    var _mixin = {};
    _mixin.propTypes = {
      data: React.PropTypes.array,
      value: React.PropTypes.any
    };

    _mixin["set" + methodName] = function (idx) {
      var state = {};state[stateKey] = idx;

      if (idx !== -1) this.setState(state);
      return this;
    };

    _mixin["prev" + methodName] = function (nextIdx) {
      var data = this._data(),
          stateIdx = this.state && this.state[stateKey] || 0;

      nextIdx = (nextIdx === undefined ? stateIdx : nextIdx) - 1;

      while (nextIdx > -1 && isDisabled(this, data[nextIdx])) nextIdx--;

      if (nextIdx < 0) nextIdx = disabled ? -1 : 0;

      return nextIdx;
    };

    _mixin["next" + methodName] = function (nextIdx) {
      var data = this._data(),
          stateIdx = this.state && this.state[stateKey] || 0;

      nextIdx = (nextIdx === undefined ? stateIdx : nextIdx) + 1;

      while (nextIdx < data.length && isDisabled(this, data[nextIdx])) nextIdx++;

      if (nextIdx >= data.length) nextIdx = disabled ? -1 : data.length - 1;

      return nextIdx;
    };

    return _mixin;
  })();

  function isDisabled(ctx, item) {
    return disabled && ctx[disabled](item);
  }

  return mixin;
};