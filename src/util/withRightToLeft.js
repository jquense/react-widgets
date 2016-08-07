import React from 'react';

import mixInContext from './mixInContext';

export let isRtl = instance => !!(
  instance.props.isRtl ||
  (instance.context && instance.context.isRtl)
);

export default function withRightToLeft(componentClass) {
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
