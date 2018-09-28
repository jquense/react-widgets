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

  search = React.createRef()
  value = React.createRef()

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

  focus() {
    if (this.props.allowSearch) this.search.current?.focus()
    else this.value.current?.focus()
  }

  renderInput() {
    let {
      placeholder,
      value,
      textField,
      searchTerm,
      onSearch,
      allowSearch,
      valueComponent: Component,
    } = this.props

    const inputValue =
      !value && placeholder ? (
        <span className="rw-placeholder">{placeholder}</span>
      ) : Component ? (
        <Component item={value} />
      ) : (
        dataText(value, textField)
      )

    return (
      <React.Fragment>
        {allowSearch && (
          <input
            ref={this.search}
            className="rw-dropdown-list-search"
            value={searchTerm || ''}
            size={(searchTerm || '').length + 2}
            onChange={onSearch}
          />
        )}
        {!searchTerm && inputValue}
      </React.Fragment>
    )
  }

  renderAutofill() {
    let { name, autoComplete } = this.props
    let value = dataValue(this.props.value)

    return (
      <input
        tabIndex="-1"
        name={name}
        value={value == null ? '' : value}
        autoComplete={autoComplete}
        onChange={this.handleAutofill}
        onAnimationStart={this.handleAutofillDetect}
        className={cn(
          'rw-dropdown-list-search rw-detect-autofill',
          !this.state.autofilling && 'rw-sr'
        )}
      />
    )
  }

  render() {
    let { autoComplete } = this.props
    const { autofilling } = this.state

    return (
      <div className="rw-input rw-dropdown-list-input">
        {autoComplete !== 'off' && this.renderAutofill()}

        {!autofilling && autoComplete !== 'off' && this.renderInput()}
      </div>
    )
  }
}
export default DropdownListInput
