import React from 'react';
import { findDOMNode } from 'react-dom';
import spyOnComponent from 'spy-on-component';

export default function makeAutoFocusable(instance) {
  spyOnComponent(instance, {
    componentDidMount() {
      let { autoFocus } = this.props;

      if (autoFocus)
        this.focus ? this.focus() : findDOMNode(this).focus()
    }
  })
}

makeAutoFocusable.propTypes = {
  autoFocus: React.PropTypes.bool
};
