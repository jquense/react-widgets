'use strict';
var React = require('react');

module.exports = {

  contextTypes: {
    isRtl: React.PropTypes.bool
  },

  isRtl: function isRtl() {
    return !!this.context.isRtl;
  }

};