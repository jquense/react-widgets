'use strict';
var React = require('react')

module.exports = function(prefix){

  return {

    mixins: [
      require('react-router').State
    ],

    componentDidMount() {
      scrollTo(this.getPathname())
    },

    componentDidUpdate() {
      scrollTo(this.getPathname())
    },

    childContextTypes: {
      prefix: React.PropTypes.string.isRequired
    },

    getChildContext() {
      return { prefix };
    },

  }
}

function scrollTo(pathname){
  var anchor = document.getElementById(pathname)

  anchor && window.scrollTo(window.pageXOffset, anchor.offsetTop)
}