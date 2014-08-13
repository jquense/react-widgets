var React = require('react/addons')

module.exports = {
  
  contextTypes: {
    isRtl: React.PropTypes.bool
  },

  isRtl: function() {
    return !!this.context.isRtl
  }

}