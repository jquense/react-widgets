import PropTypes from 'prop-types';

export default {

  contextTypes: {
    isRtl: PropTypes.bool
  },

  isRtl() {
    return !!this.context.isRtl
  }

}
