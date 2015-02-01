'use strict';
var React = require('react')

module.exports = function(prefix){

  return {

    mixins: [
      require('react-router').State
    ],

    componentDidMount: function() {
      var path = this.getPathname()
      var anchor = document.getElementById(path)

      anchor && window.scrollTo(window.pageXOffset, anchor.offsetTop)
    },

    childContextTypes: {
      prefix: React.PropTypes.string.isRequired
    },

    getChildContext() {
      return { prefix };
    },

  }
}