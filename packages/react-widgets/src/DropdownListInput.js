import React from 'react'
import cn from 'classnames'

import PropTypes from 'prop-types'

import * as CustomPropTypes from './util/PropTypes'
import { dataText, dataValue } from './util/dataHelpers'

class DropdownListInput extends React.Component {
  static propTypes = {
    value: PropTypes.any,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    autoComplete: PropTypes.string,
    textField: CustomPropTypes.accessor,
    valueComponent: CustomPropTypes.elementType,
    onAutofill: PropTypes.func.isRequired,
    onAutofillChange: PropTypes.func.isRequired,
  }
  state = {
    autofilling: false,
  }

  handleAutofillDetect = ({ animationName }) => {
    let autofilling

    if (animationName === 'react-widgets-autofill-start') autofilling = true
    else if (animationName === 'react-widgets-autofill-cancel')
      autofilling = false
    else return

    this.setState({ autofilling })
    this.props.onAutofill(autofilling)
  }

  handleAutofill = e => {
    this.setState({ autofilling: false })
    this.props.onAutofillChange(e)
  }
  render() {
    let {
      name,
      placeholder,
      value,
      textField,
      autoComplete,
      valueComponent: Component,
    } = this.props
    const { autofilling } = this.state
    let child = null
    if (!autofilling && autoComplete !== 'off') {
      child =
        !value && placeholder ? (
          <span className="rw-placeholder">{placeholder}</span>
        ) : Component ? (
          <Component item={value} />
        ) : (
          dataText(value, textField)
        )
    }
    let val = dataValue(value)
    return (
      <div className="rw-input rw-dropdown-list-input">
        {autoComplete !== 'off' && (
          <input
            tabIndex="-1"
            name={name}
            value={val == null ? '' : val}
            autoComplete={autoComplete}
            onChange={this.handleAutofill}
            onAnimationStart={this.handleAutofillDetect}
            className={cn(
              'rw-dropdown-list-autofill rw-detect-autofill',
              !autofilling && 'rw-sr'
            )}
          />
        )}

        {child}
      </div>
    )
  }
}
export default DropdownListInput
