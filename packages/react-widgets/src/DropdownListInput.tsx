import cn from 'classnames'
import React, { useImperativeHandle, useRef, useState } from 'react'
import { RenderProp, WidgetHandle } from './types'
import { DataKeyAccessorFn, TextAccessorFn } from './util/dataHelpers'

export type RenderValueProp<TDataItem> = RenderProp<{ item: TDataItem }>

export type DropdownInputHandle = WidgetHandle

interface Props<TDataItem> {
  name?: string
  autoComplete?: 'on' | 'off'
  value: TDataItem
  disabled?: boolean
  allowSearch?: boolean
  placeholder?: string
  textAccessor: TextAccessorFn
  dataKeyAccessor: DataKeyAccessorFn
  searchTerm?: string
  onSearch?: React.ChangeEventHandler<HTMLInputElement>
  onAutofill(autofilling: boolean): void
  onAutofillChange(e: React.ChangeEvent<HTMLInputElement>): void
  renderValue?: RenderValueProp<TDataItem>
}

const DropdownListInput = React.forwardRef(function<TDataItem>(
  {
    name,
    autoComplete,
    value,
    allowSearch,
    placeholder,
    textAccessor,
    dataKeyAccessor,
    searchTerm,
    onSearch,
    onAutofill,
    onAutofillChange,
    renderValue,
    disabled,
  }: Props<TDataItem>,
  ref: React.Ref<DropdownInputHandle>,
) {
  const [autofilling, setAutofilling] = useState(false)

  const searchRef = useRef<HTMLInputElement>(null)

  const handleAutofillDetect = ({ animationName }) => {
    let autofilling: boolean

    if (animationName === 'react-widgets-autofill-start') autofilling = true
    else if (animationName === 'react-widgets-autofill-cancel')
      autofilling = false
    else return

    setAutofilling(autofilling)
    onAutofill(autofilling)
  }

  const handleAutofill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutofilling(false)
    onAutofillChange(e)
  }

  let strValue = String(dataKeyAccessor(value))
  if (strValue === String({})) strValue = ''

  const inputValue =
    !value && placeholder ? (
      <span className="rw-placeholder">{placeholder}</span>
    ) : renderValue ? (
      renderValue({ item: value })
    ) : (
      textAccessor(value)
    )

  useImperativeHandle(ref, () => ({
    focus() {
      if (searchRef.current) searchRef.current.focus()
    },
  }))

  return (
    <div className="rw-input rw-dropdown-list-input">
      {autoComplete !== 'off' && (
        <input
          name={name}
          tabIndex={-1}
          disabled={disabled}
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
              disabled={disabled}
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
})

DropdownListInput.displayName = 'DropdownListInput'

export default DropdownListInput
