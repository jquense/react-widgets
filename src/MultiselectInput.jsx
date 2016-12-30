import React from 'react';
import _  from './util/_';
import compat from './util/compat';
import CustomPropTypes from './util/propTypes';

class MultiselectInput extends React.Component {

  static propTypes = {
    value:        React.PropTypes.string,
    placeholder:  React.PropTypes.string,
    maxLength:    React.PropTypes.number,
    inputSize:    React.PropTypes.func,
    onChange:     React.PropTypes.func.isRequired,

    disabled:     CustomPropTypes.disabled,
    readOnly:     CustomPropTypes.readOnly
  };

  render() {
      let { disabled, readOnly, ...props } = this.props
      let size = props.inputSize ?
        props.inputSize(props.value || props.placeholder) :
        Math.max((props.value || props.placeholder).length, 1) + 1;

      let elementProps = _.omitOwnProps(this);

      return (
        <input
          {...elementProps}
          size={size}
          className='rw-input'
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
