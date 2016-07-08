import React from 'react';

import _  from './util/_';

import Input from './Input';
import compat from './util/compat';
import { date as dateLocalizer } from './util/localizers';
import CustomPropTypes from './util/propTypes';

export default React.createClass({

  displayName: 'DateTimePickerInput',

  propTypes: {
    format: CustomPropTypes.dateFormat.isRequired,
    editing: React.PropTypes.bool,
    editFormat: CustomPropTypes.dateFormat,
    parse: React.PropTypes.func.isRequired,

    value: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func.isRequired,
    culture: React.PropTypes.string
  },

  componentWillReceiveProps(nextProps) {
    let { value, editing, editFormat, format, culture } = nextProps;

    this.setState({
      textValue: formatDate(
          value
        , editing && editFormat ? editFormat : format
        , culture
      )
    })
  },

  getInitialState() {
    let { value, editing, editFormat, format, culture } = this.props;

    return {
      textValue: formatDate(
          value
        , editing && editFormat ? editFormat : format
        , culture
      )
    }
  },

  render(){
    let { disabled, readOnly } = this.props
    let { textValue } = this.state

    let props = _.omitOwnProps(this);

    return (
      <Input
        {...props}
        type='text'
        value={textValue}
        disabled={disabled}
        readOnly={readOnly}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    )
  },

  handleChange({ target: { value } }) {
    this._needsFlush = true
    this.setState({ textValue: value });
  },

  handleBlur(event) {
    let { format, culture, parse, onChange, onBlur } = this.props;

    onBlur && onBlur(event)

    if (this._needsFlush) {
      let date = parse(event.target.value);

      this._needsFlush = false
      onChange(date, formatDate(date, format, culture))
    }
  },

  focus(){
    compat.findDOMNode(this).focus()
  }
});

function isValid(d) {
  return !isNaN(d.getTime());
}

function formatDate(date, format, culture){
  var val = ''

  if ( (date instanceof Date) && isValid(date) )
    val = dateLocalizer.format(date, format, culture)

  return val;
}
