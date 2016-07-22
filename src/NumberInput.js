import React from 'react';
import _  from './util/_';
import CustomPropTypes from './util/propTypes';
import { number as numberLocalizer } from './util/localizers';

import Input from './Input';

let getFormat = props => numberLocalizer.getFormat('default', props.format)

let isSign = val => (val || '').trim() === '-';

function isPaddedZeros(str, culture) {
  let localeChar = numberLocalizer.decimalChar(null, culture)
  let [_, decimals] = str.split(localeChar);

  return !!(
    decimals &&
    decimals.match(/0+$/)
  )
}

function isAtDelimiter(num, str, culture) {
  let localeChar = numberLocalizer.decimalChar(null, culture)
    , lastIndex = str.length - 1
    , char;

  if (str.length < 1) return false

  char = str[lastIndex]

  return !!(
    char === localeChar &&
    str.indexOf(char) === lastIndex
  )
}

class NumberPickerInput extends React.Component {
  static propTypes = {
    value:       React.PropTypes.number,
    editing:     React.PropTypes.bool,
    placeholder: React.PropTypes.string,

    format:      CustomPropTypes.numberFormat,

    parse:       React.PropTypes.func,
    culture:     React.PropTypes.string,

    min:         React.PropTypes.number,
    max:         React.PropTypes.number,


    disabled:    CustomPropTypes.disabled,
    readOnly:    CustomPropTypes.readOnly,

    onChange:    React.PropTypes.func.isRequired,
    onKeyDown:   React.PropTypes.func
  };

  static defaultProps = {
    value: null,
    editing: false
  };

  constructor(...args) {
    super(...args);

    this.state = this.getDefaultState()
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      this.getDefaultState(nextProps)
    )
  }

  getDefaultState(props = this.props){
    let { value, culture, editing } = props

    let decimal = numberLocalizer.decimalChar(null, culture)
      , format = getFormat(props);

    if (value == null || isNaN(value))
      value = ''
    else
      value = editing
        ? ('' + value).replace('.', decimal)
        : numberLocalizer.format(value, format, culture)

    return {
      stringValue: '' + value
    }
  }

  handleChange = ({ target }) => {
    let { value, onChange } = this.props;

    let stringValue = target.value
      , numberValue = this.parseNumber(stringValue)

    let isIntermediate = this.isIntermediateValue(
      numberValue,
      stringValue
    );

    if (stringValue == null || stringValue.trim() === '') {
      this.setStringValue('')
      onChange(null)

      return
    }

    if (isIntermediate)
      this.setStringValue(stringValue)

    else if (numberValue !== value)
      onChange(numberValue)
  };

  handleBlur = () => {
    var str = this.state.stringValue
      , number = this.parseNumber(str);

    // if number is below the min
    // we need to flush low values and decimal stops, onBlur means i'm done inputing
    if (this.isIntermediateValue(number, str)) {
      if (isNaN(number)) {
        number = null;
      }
      this.props.onChange(number)
    }
  }

  parseNumber(strVal) {
    let { culture, parse: userParse  } = this.props

    let delimChar = numberLocalizer.decimalChar(null, culture)

    if (userParse)
      return userParse(strVal, culture)

    strVal = strVal.replace(delimChar, '.')
    strVal = parseFloat(strVal);

    return strVal
  }

  isIntermediateValue(num, str) {
    let { culture, min } = this.props;

    return !!(
      num < min ||
      isSign(str) ||
      isAtDelimiter(num, str, culture) ||
      isPaddedZeros(str, culture)
    );
  }

  // this intermediate state is for when one runs into
  // the decimal or are typing the number
  setStringValue(stringValue) {
    this.setState({ stringValue })
  }

  render() {
    let { disabled, readOnly, placeholder, min, max } = this.props;

    let value = this.state.stringValue;
    let props = _.omitOwnProps(this);

    return (
      <Input
        {...props}
        className="rw-widget-input"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        aria-valuenow={value}
        aria-valuemin={isFinite(min) ? min : null}
        aria-valuemax={isFinite(max) ? max : null}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        value={value}
      />
    )
  }
}

export default NumberPickerInput;
