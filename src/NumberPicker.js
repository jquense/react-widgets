import React from 'react';
import cn from 'classnames';
import createUncontrolledWidget from 'uncontrollable';

import Widget from './Widget';
import WidgetPicker from './WidgetPicker';
import Select from './Select';
import Input from './NumberInput';
import Button from './Button';

import { widgetEditable } from './util/interaction';
import { notify } from './util/widgetHelpers';
import _     from './util/_';
import compat from './util/compat';
import CustomPropTypes from './util/propTypes';
import { directions } from './util/constants';
import repeater from './util/repeater';
import createFocusManager from './util/focusManager';
import withRightToLeft from './util/withRightToLeft';

import { number as numberLocalizer } from './util/localizers';

var format = props => numberLocalizer.getFormat('default', props.format)

function clamp(value, min, max) {
  max = max == null ? Infinity : max
  min = min == null ? -Infinity : min;

  if (value == null || value === '')
    return null

  return Math.max(Math.min(value, max), min)
}

@withRightToLeft
class NumberPicker extends React.Component {

  static propTypes = {

    // -- controlled props -----------
    value:          React.PropTypes.number,
    onChange:       React.PropTypes.func,
    //------------------------------------

    min:            React.PropTypes.number,
    max:            React.PropTypes.number,
    step:           React.PropTypes.number,

    precision:      React.PropTypes.number,

    culture:        React.PropTypes.string,

    format:         CustomPropTypes.numberFormat,

    name:           React.PropTypes.string,

    parse:          React.PropTypes.func,

    autoFocus:      React.PropTypes.bool,
    disabled:       CustomPropTypes.disabled,
    readOnly:       CustomPropTypes.readOnly,

    messages:       React.PropTypes.shape({
      increment:    React.PropTypes.string,
      decrement:    React.PropTypes.string
    }),

    placeholder: React.PropTypes.string
  };

  static defaultProps = {
    value: null,
    open: false,

    min: -Infinity,
    max:  Infinity,
    step: 1,

    messages: {
      increment: 'increment value',
      decrement:  'decrement value'
    }
  };

  constructor(...args) {
    super(...args)

    this.focusManager = createFocusManager(this, {
      willHandle: focused => {
        if (focused) this.focus()
      }
    })

    this.state = {
      focused: false,
    }
  }

  @widgetEditable
  handleMouseDown = (direction) => {
    let { min, max } = this.props;

    let method = direction === directions.UP
      ? this.increment
      : this.decrement

    let value = method.call(this)
      , atTop = direction === directions.UP && value === max
      , atBottom = direction === directions.DOWN && value === min

    if (atTop || atBottom)
      this.handleMouseUp()

    else if (!this._cancelRepeater)
      this._cancelRepeater = repeater(() =>
        this.handleMouseDown(direction)
      )
  };

  @widgetEditable
  handleMouseUp = () => {
    this._cancelRepeater && this._cancelRepeater()
    this._cancelRepeater = null;
  };

  @widgetEditable
  handleKeyDown = (event) => {
    let { min, max, onKeyDown } = this.props;
    let key = event.key;

    notify(onKeyDown, [event])

    if (event.defaultPrevented)
      return

    if (key === 'End' && isFinite(max))
      this.handleChange(max)

    else if (key === 'Home' && isFinite(min))
      this.handleChange(min)

    else if ( key === 'ArrowDown') {
      event.preventDefault()
      this.decrement()
    }
    else if ( key === 'ArrowUp') {
      event.preventDefault()
      this.increment()
    }
  };

  handleChange = (newValue) => {
    let { onChange, value, min, max } = this.props;

    newValue = clamp(newValue, min, max);

    if (value !== newValue)
      notify(onChange, newValue)
  };

  renderInput(value) {
    let {
        placeholder
      , autoFocus
      , tabIndex
      , parse
      , name
      , onKeyPress, onKeyUp
      , min, max
      , disabled, readOnly
      , format } = this.props;

    return (
      <Input
        ref='input'
        role='spinbutton'
        tabIndex={tabIndex}
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        editing={this.state.focused}
        format={format}
        parse={parse}
        name={name}
        min={min}
        max={max}
        disabled={disabled}
        readOnly={readOnly}
        onChange={this.handleChange}
        onKeyPress={onKeyPress}
        onKeyUp={onKeyUp}
      />
    )
  }

  render() {
    let {
        className
      , disabled
      , readOnly
      , value
      , messages
      , min
      , max } = this.props;

    let { focused } = this.state;
    let elementProps = _.omitOwnProps(this);

    value = clamp(value, min, max);

    return (
      <Widget
        {...elementProps}
        onKeyDown={this.handleKeyDown}
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        className={cn(className, 'rw-number-picker')}
      >
        <WidgetPicker
          focused={focused}
          disabled={disabled}
          readOnly={readOnly}
        >
          {this.renderInput(value)}
          <Select bordered>
            <Button
              icon="caret-up"
              onClick={this.handleFocus}
              label={messages.increment}
              disabled={value === max || disabled}
              onMouseUp={() => this.handleMouseUp(directions.UP)}
              onMouseDown={() => this.handleMouseDown(directions.UP)}
              onMouseLeave={() => this.handleMouseUp(directions.UP)}
            />
            <Button
              icon="caret-down"
              onClick={this.handleFocus}
              label={messages.decrement}
              disabled={value === min || disabled}
              onMouseUp={() => this.handleMouseUp(directions.DOWN)}
              onMouseDown={() => this.handleMouseDown(directions.DOWN)}
              onMouseLeave={() => this.handleMouseUp(directions.DOWN)}
            />
          </Select>
        </WidgetPicker>
      </Widget>
    )
  }

  focus() {
    compat.findDOMNode(this.refs.input).focus()
  }

  increment() {
    return this.step(this.props.step)
  }

  decrement() {
    return this.step(-this.props.step)
  }

  step(amount) {
    var value = (this.props.value || 0) + amount

    var decimals = this.props.precision != null
      ? this.props.precision
      : numberLocalizer.precision(format(this.props))

    this.handleChange(
      decimals != null ? round(value, decimals) : value)

    return value
  }
}


export default createUncontrolledWidget(
    NumberPicker, { value: 'onChange' }, ['focus']);



// thank you kendo ui core
// https://github.com/telerik/kendo-ui-core/blob/master/src/kendo.core.js#L1036
function round(value, precision) {
  precision = precision || 0;

  value = ('' + value).split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + precision) : precision)));

  value = ('' + value).split('e');
  value = +(value[0] + 'e' + (value[1] ? (+value[1] - precision) : -precision));

  return value.toFixed(precision);
}
