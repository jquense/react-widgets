import React from 'react';
import { mixin } from 'react-component-managers';


export default mixin({

  propTypes: {
    isRtl: React.PropTypes.bool
  },

  contextTypes: {
    isRtl: React.PropTypes.bool
  },

  childContextTypes: {
    isRtl: React.PropTypes.bool
  },

  getChildContext() {
    return {
      isRtl: this.isRtl()
    }
  },

  isRtl() {
    return !!(
      this.props.isRtl ||
      (this.context && this.context.isRtl)
    )
  }
})
