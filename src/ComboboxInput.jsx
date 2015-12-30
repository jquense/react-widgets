import React from 'react';
import caretPos from './util/caret';
import compat from './util/compat';

export default React.createClass({

  displayName: 'ComboboxInput',

  propTypes: {
    value:        React.PropTypes.string,
    onChange:     React.PropTypes.func.isRequired
  },

  componentDidUpdate() {
    var input = compat.findDOMNode(this)
      , val = this.props.value;

    if ( this.isSuggesting() ){
      var start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length
        , end   = val.length - start

      if ( start >= 0) {
        caretPos(input, start, start + end)
      }
    }
  },

  getDefaultProps(){
    return {
      value: ''
    }
  },

  render(){
    return (
      <input
        {...this.props }
        type='text'
        aria-disabled={this.props.disabled}
        aria-readonly={this.props.readOnly}
        aria-autocomplete="none"
        autoComplete="off"
        className={this.props.className + ' rw-input'}
        onKeyDown={this.props.onKeyDown}
        onChange={this._change}
        value={this.props.value == null ? '' : this.props.value}
      />
    )
  },

  isSuggesting() {
    var val = this.props.value
      , isSuggestion = this._last != null
          && val.toLowerCase().indexOf(this._last.toLowerCase()) !== -1;

    return this.props.suggest && isSuggestion
  },

  accept(removeCaret) {
    var val = compat.findDOMNode(this).value || ''
      , end = val.length;

    this._last = null
    removeCaret && caretPos(compat.findDOMNode(this), end, end)
  },

  _change(e) {
    var val = e.target.value
      , pl = !!this.props.placeholder

    // IE fires input events when setting/unsetting placeholders.
    // issue #112
    if ( pl && !val && val === (this.props.value || '') )
      return

    this._last = val;
    this.props.onChange(e, val)
  },

  focus() {
    compat.findDOMNode(this).focus()
  }
});
