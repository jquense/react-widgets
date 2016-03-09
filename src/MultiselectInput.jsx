import React from 'react';
import compat from './util/compat';
import CustomPropTypes from './util/propTypes';


export default React.createClass({

  displayName: 'MultiselectInput',

  propTypes: {
    value:        React.PropTypes.string,
    maxLength:    React.PropTypes.number,
    onChange:     React.PropTypes.func.isRequired,
    onFocus:      React.PropTypes.func,

    disabled:     CustomPropTypes.disabled,
    readOnly:     CustomPropTypes.readOnly
  },

  render(){
      var value = this.props.value
        , placeholder = this.props.placeholder
        , size = Math.max((value || placeholder).length, 1) + 1;

      return (
        <input {...this.props}
          className='rw-input'
          autoComplete='off'
          aria-disabled={this.props.disabled}
          aria-readonly={this.props.readOnly}
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          size={size}
        />
      )
  },

  focus(){
    compat.findDOMNode(this).focus()
  }

})
