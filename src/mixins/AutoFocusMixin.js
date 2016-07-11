import React from 'react';
import { findDOMNode } from 'react-dom';

export default {
  propTypes: {
    autoFocus: React.PropTypes.bool
  },

  componentDidMount() {
    let { autoFocus } = this.props;

    if (autoFocus)
      this.focus ? this.focus() : findDOMNode(this).focus()
  }
};
