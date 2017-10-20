import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import Input from './Input';

export const caretSet = (node, start, end) => {
  try { node.setSelectionRange(start, end) }
  catch (e) {
    /* not focused or not visible */
  }
}

class ComboboxInput extends React.Component {

  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    suggest: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onKeyDown:  PropTypes.func,
  };

  static defaultProps = {
    value: '',
  };

  componentDidUpdate() {
    let input = findDOMNode(this)
    let val = this.props.value;

    if (this.isSuggesting()) {
      let start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length
      let end = val.length - start

      if (start >= 0 && end !== 0) {
        caretSet(input, start, start + end)
      }
    }
  }

  handleChange = (e) => {
    let { placeholder, value, onChange } = this.props;

    let stringValue = e.target.value
    let hasPlaceholder = !!placeholder

    // IE fires input events when setting/unsetting placeholders.
    // issue #112
    if (hasPlaceholder && !stringValue && stringValue === (value || ''))
      return

    this._last = stringValue;
    onChange(e, stringValue)
  };

  render() {
    let { onKeyDown, ...props } = this.props;

    delete props.suggest;

    return (
      <Input
        {...props}
        className="rw-widget-input"
        onKeyDown={onKeyDown}
        onChange={this.handleChange}
      />
    )
  }

  isSuggesting() {
    let { value, suggest } = this.props;

    if (!suggest) return false;

    return (
      this._last != null &&
      value.toLowerCase().indexOf(this._last.toLowerCase()) !== -1
    )
  }

  accept() {
    this._last = null
    // caretSet(node, end, end)
  }


  focus() {
    findDOMNode(this).focus()
  }
}

export default ComboboxInput
