import React, { useRef, useState, useImperativeHandle } from 'react'
import cn from 'classnames'

import PropTypes from 'prop-types'

import * as CustomPropTypes from './util/PropTypes'
import { dataText, dataValue } from './util/dataHelpers'

const propTypes = {
  value: PropTypes.any,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  autoComplete: PropTypes.string,
  textField: CustomPropTypes.accessor,
  valueComponent: CustomPropTypes.elementType,
  onAutofill: PropTypes.func.isRequired,
  onAutofillChange: PropTypes.func.isRequired,
}

const DropdownListInput = React.forwardRef(
  (
    {
      name,
      autoComplete,
      value,
      allowSearch,
      placeholder,
      textField,
      searchTerm,
      onSearch,
      onAutofill,
      onAutofillChange,
      valueComponent: Component,
    },
    ref,
  ) => {
    const [autofilling, setAutofilling] = useState(false)

    const searchRef = useRef()

    const handleAutofillDetect = ({ animationName }) => {
      let autofilling

      if (animationName === 'react-widgets-autofill-start') autofilling = true
      else if (animationName === 'react-widgets-autofill-cancel')
        autofilling = false
      else return

      setAutofilling(autofilling)
      onAutofill(autofilling)
    }

    const handleAutofill = e => {
      setAutofilling(false)
      onAutofillChange(e)
    }

    let strValue = dataValue(value)

    const inputValue =
      !value && placeholder ? (
        <span className="rw-placeholder">{placeholder}</span>
      ) : Component ? (
        <Component item={value} />
      ) : (
        dataText(value, textField)
      )

    useImperativeHandle(ref, () => ({
      focus() {
        searchRef.current?.focus()
      },
    }))

    return (
      <div className="rw-input rw-dropdown-list-input">
        {autoComplete !== 'off' && (
          <input
            tabIndex="-1"
            name={name}
            value={strValue == null ? '' : strValue}
            autoComplete={autoComplete}
            onChange={handleAutofill}
            onAnimationStart={handleAutofillDetect}
            className={cn(
              'rw-dropdown-list-search rw-detect-autofill',
              !autofilling && 'rw-sr',
            )}
          />
        )}

        {!autofilling && autoComplete !== 'off' && (
          <>
            {allowSearch && (
              <input
                ref={searchRef}
                className="rw-dropdown-list-search"
                value={searchTerm || ''}
                size={(searchTerm || '').length + 2}
                onChange={onSearch}
              />
            )}
            {!searchTerm && inputValue}
          </>
        )}
      </div>
    )
  },
)

DropdownListInput.displayName = 'DropdownListInput'
DropdownListInput.propTypes = propTypes

export default DropdownListInput
