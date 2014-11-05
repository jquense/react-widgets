'use strict';
var React = require('react')

module.exports = {
  
  propTypes: {
    isRtl: React.PropTypes.bool
  },

  contextTypes: {
    isRtl: React.PropTypes.bool
  },

  childContextTypes: {
    isRtl: React.PropTypes.bool
  },

  getChildContext: function() {
    return { 
      isRtl: this.props.isRtl || (this.context && this.context.isRtl)
    }
  },

  isRtl: function() {
    return !!(this.props.isRtl || (this.context && this.context.isRtl))
  }

}