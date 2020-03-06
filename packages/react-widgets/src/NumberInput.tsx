import activeElement from 'dom-helpers/activeElement'
import canUseDOM from 'dom-helpers/canUseDOM'
import PropTypes from 'prop-types'
import React, { FocusEvent, SyntheticEvent } from 'react'
import { findDOMNode } from 'react-dom'
import Input from './Input'
import * as CustomPropTypes from './util/PropTypes'
import { Localizer } from './Localization'

let isSign = (val : string) => (val || '').trim() === '-'

function isPaddedZeros(str : string, localizer : Localizer) {
  let localeChar = localizer.decimalCharacter()
  let [_, decimals] = str.split(localeChar)

  return !!(decimals && decimals.match(/0+$/))
}

function isAtDelimiter(num : number | undefined, str : string, localizer: Localizer) {
  num = num; /*HACK to rmove warning*/

  let localeChar = localizer.decimalCharacter(),
    lastIndex = str.length - 1,
    char

  if (str.length < 1) return false

  char = str[lastIndex]

  return !!(char === localeChar && str.indexOf(char) === lastIndex)
}

export interface NumberPickerInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
    value: number | null | undefined,
    editing?: boolean;
    placeholder?: string;
    innerRef?: React.Ref<HTMLInputElement>;
    localizer: Localizer;
    parse?: (str: string, localizer : Localizer)=>number;

    min?: number;
    max?: number;

    disabled?: boolean;
    readOnly?: boolean;

    onChange: (number: number | null | undefined, event: SyntheticEvent<HTMLInputElement>)=> void;
}

interface NumberPickerInputState {
   stringValue?: string;
   lastValueFromProps?: string;
}

interface NumberPickerInputSnapshot{
  reselectText?: boolean;
}

class NumberPickerInput extends React.Component<NumberPickerInputProps, NumberPickerInputState, NumberPickerInputSnapshot> {
  static defaultProps = {
    value: null,
    editing: false,
  }

  static propTypes = {
    value: PropTypes.number,
    editing: PropTypes.bool,
    placeholder: PropTypes.string,

    localizer: PropTypes.object.isRequired,
    parse: PropTypes.func,

    min: PropTypes.number,
    max: PropTypes.number,

    disabled: CustomPropTypes.disabled,
    readOnly: CustomPropTypes.disabled,

    onChange: PropTypes.func.isRequired,
  }

  state = {} as NumberPickerInputState;

  getSnapshotBeforeUpdate({ editing } : NumberPickerInputProps) : NumberPickerInputSnapshot {
    return {
      reselectText: !editing && this.props.editing && this.isSelectingAllText(),
    }
  }

  static getDerivedStateFromProps(nextProps : NumberPickerInputProps, prevState : NumberPickerInputState) {
    let { value, editing, localizer } = nextProps

    let decimal = localizer.decimalCharacter()

    const stringValue = value == null || isNaN(value) ? '' :
    editing  ? ('' + value).replace('.', decimal) : 
    localizer.formatNumber(value/*, 'default'*/);

    if (prevState.lastValueFromProps !== stringValue)
      return {
        stringValue,
        lastValueFromProps: stringValue,
      }

    return null
  }

  componentDidUpdate(_ : NumberPickerInputProps, __: NumberPickerInputState, { reselectText } : NumberPickerInputSnapshot) {
    if (reselectText) 
    (findDOMNode(this) as HTMLInputElement).select()
  }

  // this intermediate state is for when one runs into
  // the decimal or are typing the number
  setStringValue(stringValue : string) {
    this.setState({ stringValue })
  }

  handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    let str = this.state.stringValue
    let number = this.parseNumber(str!)

    // if number is below the min
    // we need to flush low values and decimal stops, onBlur means i'm done inputing
    if (this.isIntermediateValue(number, str!)) {
      if (isNaN(number!)) {
        number = null
      }
      this.props.onChange(number, event)
    }
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    let { value, onChange } = this.props

    let stringValue = (event.target as HTMLInputElement).value,
      numberValue = this.parseNumber(stringValue)

    let isIntermediate = this.isIntermediateValue(numberValue, stringValue)

    if (stringValue == null || stringValue.trim() === '') {
      this.setStringValue('')
      onChange(null, event)

      return
    }
    // order here matters a lot
    if (isIntermediate) {
      this.setStringValue(stringValue)
    } else if (numberValue !== value) {
      onChange(numberValue, event)
    } else if (stringValue != this.state.stringValue) {
      this.setStringValue(stringValue)
    }
  }

  isIntermediateValue(num : number | undefined | null, str : string) {
    let { localizer, min } = this.props

    return !!(
      num! < min! ||
      isSign(str) ||
      isAtDelimiter(num!, str, localizer) ||
      isPaddedZeros(str, localizer)
    )
  }

  isSelectingAllText() {
    const node = canUseDOM && findDOMNode(this) as HTMLInputElement;
    return (
      canUseDOM &&
      activeElement() === node &&
      node.selectionStart === 0 &&
      node.selectionEnd === node.value.length
    )
  }

  parseNumber(strVal : string) : number | undefined | null {
    let { localizer, parse: userParse } = this.props

    let delimChar = localizer.decimalCharacter()

    if (userParse) 
      return userParse(strVal, localizer)

    strVal = strVal.replace(delimChar, '.')
    return parseFloat(strVal)
  }

  render() {
    let {
      disabled,
      readOnly,
      placeholder,
      // eslint-disable-next-line react/prop-types
      innerRef,
      min,
      max,
      localizer: _,
      // eslint-disable-next-line no-unused-vars
      editing: __,
      ...props
    } = this.props

    let value = this.state.stringValue

    return (
      <Input
        {...props}
        ref={innerRef}
        className="rw-widget-input"
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        aria-valuenow={value as any as number /*HACK*/}
        aria-valuemin={isFinite(min!) ? min : undefined}
        aria-valuemax={isFinite(max!) ? max : undefined}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        value={value}
      />
    )
  }
}

export default NumberPickerInput
