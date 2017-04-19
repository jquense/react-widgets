import PropTypes from 'prop-types';
import { mixin } from 'react-component-managers';


export default mixin({
  propTypes: {
    isRtl: PropTypes.bool
  },

  contextTypes: {
    isRtl: PropTypes.bool
  },

  childContextTypes: {
    isRtl: PropTypes.bool
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
