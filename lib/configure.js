'use strict';

var warning = require('react/lib/warning');
var configuration = require('./util/configuration');

var _require = require('./util/localizers');

var NumberLocalizer = _require.NumberLocalizer;
var DateLocalizer = _require.DateLocalizer;

var _require2 = require('./globalize-localizers');

var globalizeNumberLocalizer = _require2.globalizeNumberLocalizer;
var globalizeDateLocalizer = _require2.globalizeDateLocalizer;

module.exports = {

  setGlobalizeInstance: depreciateMethod(function (globalize) {
    configuration.locale.date = globalizeDateLocalizer(globalize);
    configuration.locale.number = globalizeNumberLocalizer(globalize);
  }),

  setAnimate: function setAnimate(animatefn) {
    configuration.animate = animatefn;
  },

  setDateLocalizer: function setDateLocalizer(spec) {
    configuration.locale.date = new DateLocalizer(spec);
  },

  setNumberLocalizer: function setNumberLocalizer(spec) {
    configuration.locale.number = new NumberLocalizer(spec);
  }
};

function depreciateMethod(fn) {
  return function () {
    warning(false, 'setGlobalizeInstance() is depreciated. use setDateLocalizer() and setNumberLocalizer() with the Globalize localizers. ' + ' TODO DOC LINK');

    return fn.apply(this, arguments);
  };
}