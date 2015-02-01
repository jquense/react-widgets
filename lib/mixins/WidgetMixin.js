"use strict";
var React = require("react"),
    _ = require("../util/_"); //uniqueID

module.exports = {

  propTypes: {

    disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["disabled"])]),

    readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["readOnly"])]) },

  isDisabled: function () {
    return this.props.disabled === true || this.props.disabled === "disabled";
  },

  isReadOnly: function () {
    return this.props.readOnly === true || this.props.readOnly === "readonly";
  },

  notify: function (handler, args) {
    this.props[handler] && this.props[handler].apply(null, [].concat(args));
  },

  _id: function (suffix) {
    this._id_ || (this._id_ = _.uniqueId("rw_"));
    return (this.props.id || this._id_) + suffix;
  },

  _maybeHandle: function (handler, disabledOnly) {
    if (!(this.isDisabled() || !disabledOnly && this.isReadOnly())) return handler;
    return function () {};
  } };