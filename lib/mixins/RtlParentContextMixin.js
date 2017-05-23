'use strict';

var PropTypes = require('prop-types');

module.exports = {

  propTypes: {
    isRtl: PropTypes.bool
  },

  contextTypes: {
    isRtl: PropTypes.bool
  },

  childContextTypes: {
    isRtl: PropTypes.bool
  },

  getChildContext: function getChildContext() {
    return {
      isRtl: !!(this.props.isRtl || this.context && this.context.isRtl)
    };
  },
  isRtl: function isRtl() {
    return !!(this.props.isRtl || this.context && this.context.isRtl);
  }
};