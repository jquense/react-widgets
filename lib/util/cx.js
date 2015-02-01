"use strict";
var _ = require("./_");

module.exports = function (existing, classes) {
  if (arguments.length === 1) if (typeof existing === "string") classes = {};else classes = existing, existing = "";

  if (!Array.isArray(classes)) classes = _.transform(classes, function (arr, value, key) {
    if (!!value) arr.push(key);
  }, []);

  return (existing ? existing + " " : "") + classes.join(" ");
};