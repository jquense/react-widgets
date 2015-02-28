'use strict';
var _ = require('../util/_');

//backport PureRenderEqual
module.exports = {

  shouldComponentUpdate: function(nextProps, nextState) {
    return !_.isShallowEqual(this.props, nextProps) ||
           !_.isShallowEqual(this.state, nextState);
  }
}

