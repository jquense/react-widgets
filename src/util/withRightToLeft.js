import React from 'react';

import mixInContext from './mixInContext';

export let isRtl = instance => !!(
  instance.props.isRtl ||
  (instance.context && instance.context.isRtl)
);

export default function withRightToLeft(componentClass) {
  componentClass.prototype.isRtl = function $isRtl() {
    return isRtl(this)
  }

  return mixInContext(componentClass, {
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
        isRtl: isRtl(this)
      }
    }
  })
}
