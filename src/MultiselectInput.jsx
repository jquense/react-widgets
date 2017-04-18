import React from 'react';
import PropTypes from 'prop-types';
import _  from './util/_';
import compat from './util/compat';
import CustomPropTypes from './util/propTypes';

class MultiselectInput extends React.Component {

  static propTypes = {
    value:        PropTypes.string,
    placeholder:  PropTypes.string,
    maxLength:    PropTypes.number,
    inputSize:    PropTypes.func,
    onChange:     PropTypes.func.isRequired,

    disabled:     CustomPropTypes.disabled,
    readOnly:     CustomPropTypes.readOnly
  };

  render() {
      let { disabled, readOnly, placeholder, onChange, value, ...props } = this.props
      let size = props.inputSize ?
        props.inputSize(value || placeholder) :
        Math.max((value || placeholder).length, 1) + 1;

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
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      )
  }

  focus() {
    compat.findDOMNode(this).focus()
  }
}

export default MultiselectInput
