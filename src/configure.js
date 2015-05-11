var warning = require('react/lib/warning')
  , configuration = require('./util/configuration')
  , { 
    NumberLocalizer
  , DateLocalizer } = require('./util/LocaleAdapter')
  , { 
    GlobalizeNumberLocalizer
  , GlobalizeDateLocalizer } = require('./util/globalize-localizer')

module.exports = {

  setGlobalizeInstance: depreciateMethod(function (globalize) {
    configuration.locale.date   = GlobalizeDateLocalizer(globalize)
    configuration.locale.number = GlobalizeNumberLocalizer(globalize)
  }),

  setAnimate(animatefn) {
    configuration.animate = animatefn
  },

  setDateLocalizer(spec) {
    configuration.locale.date = new DateLocalizer(spec)
  },

  setNumberLocalizer(spec) {
    configuration.locale.number = new NumberLocalizer(spec)
  }
}


function depreciateMethod(fn) {
  return function () {
    warning(false,
      `setGlobalizeInstance() is depreciated. use setDateLocalizer() and setNumberLocalizer() with the Globalize localizers. ` +
      ` TODO DOC LINK`);

    return fn.apply(this, arguments);
  }
}