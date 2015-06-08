'use strict';
var _ = require('../util/_');

//backport PureRenderEqual
module.exports = {

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return !_.isShallowEqual(this.props, nextProps) || !_.isShallowEqual(this.state, nextState);
  }
};