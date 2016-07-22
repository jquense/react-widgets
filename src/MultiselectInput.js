import React from 'react';
import _  from './util/_';
import compat from './util/compat';
import CustomPropTypes from './util/propTypes';

class MultiselectInput extends React.Component {

  static propTypes = {
    value:        React.PropTypes.string,
    placeholder:  React.PropTypes.string,
    maxLength:    React.PropTypes.number,
    onChange:     React.PropTypes.func.isRequired,

    disabled:     CustomPropTypes.disabled,
    readOnly:     CustomPropTypes.readOnly
  };

  render() {
      let { disabled, readOnly, ...props } = this.props
      let size = Math.max((props.value || props.placeholder).length, 1) + 1;

      return (
        <input
          {...props}
          size={size}
          className="rw-input-reset"
          autoComplete='off'
          aria-disabled={disabled}
          aria-readonly={readOnly}
          disabled={disabled}
          readOnly={readOnly}
        />
      )
  }

  focus() {
    compat.findDOMNode(this).focus()
  }
}

export default MultiselectInput
