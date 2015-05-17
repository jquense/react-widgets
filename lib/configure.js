'use strict';

var configuration = require('./util/configuration');

module.exports = {

  setGlobalizeInstance: function setGlobalizeInstance(globalize) {
    configuration.globalize = globalize;
  },

  setAnimate: function setAnimate(animatefn) {
    configuration.animate = animatefn;
  }

};