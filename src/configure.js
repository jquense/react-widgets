var configuration = require('./util/configuration')
  , { 
    GlobalizeNumberLocalizer
  , GlobalizeDateLocalizer } = require('./util/LocaleAdapter')

module.exports = {

  setGlobalizeInstance(globalize) {
    configuration.globalize = globalize

    configuration.locale.date   = GlobalizeDateLocalizer(globalize)
    configuration.locale.number = GlobalizeNumberLocalizer(globalize)
  },

  setAnimate(animatefn) {
    configuration.animate = animatefn
  }

}