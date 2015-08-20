import  React from 'react';

export default {

  contextTypes: {
    isRtl: React.PropTypes.bool
  },

  isRtl() {
    return !!this.context.isRtl
  }

}
