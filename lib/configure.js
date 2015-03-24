var configuration = require("./util/configuration");

module.exports = {

  setGlobalizeInstance: function (globalize) {
    configuration.globalize = globalize;
  },

  setAnimate: function (animatefn) {
    configuration.animate = animatefn;
  }

};