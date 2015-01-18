'use strict';
var React = require('react')

module.exports = function(prefix){

  return {

    childContextTypes: {
         prefix: React.PropTypes.string.isRequired
    },

    getChildContext: function() {
         return { prefix };
    }

  }
}