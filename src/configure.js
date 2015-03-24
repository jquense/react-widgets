var configuration = require('./util/configuration')

module.exports = {

  setGlobalizeInstance(globalize) {
    configuration.globalize = globalize
  },

  setAnimate(animatefn) {
    configuration.animate = animatefn
  }

}