import cn from 'classnames'
import React, { useImperativeHandle, useRef, useState } from 'react'
import { RenderProp, Value, WidgetHandle } from './types'
import { TextAccessorFn, DataKeyAccessorFn } from './Accessors'

export type RenderValueProp<TDataItem> = RenderProp<{
  item: TDataItem
  dataKey: Value
  text: string
}>

export type DropdownInputHandle = WidgetHandle

interface Props<TDataItem> {
  name?: string
  autoComplete?: 'on' | 'off'
  value: TDataItem
  disabled?: boolean
  readOnly?: boolean
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

const DropdownListInput = React.forwardRef(function <TDataItem>(
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
    readOnly,
  }: Props<TDataItem>,
  ref: React.Ref<DropdownInputHandle>,
) {
  const [autofilling, setAutofilling] = useState(false)

  const searchRef = useRef<HTMLInputElement>(null)

  const handleAutofillDetect = ({
    animationName,
  }: React.AnimationEvent<HTMLInputElement>) => {
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
  let dataKey = dataKeyAccessor(value)
  let text = value == null ? '' : textAccessor(value)
  let isNonInteractive = disabled || readOnly

  let strValue = String(dataKey)
  if (strValue === String({})) strValue = ''

  const inputValue =
    !value && placeholder ? (
      <span className="rw-placeholder">{placeholder}</span>
    ) : renderValue ? (
      renderValue({ item: value, dataKey, text })
    ) : (
      text
    )

  useImperativeHandle(ref, () => ({
    focus() {
      if (searchRef.current) searchRef.current.focus()
    },
  }))

  return (
    <div className="rw-dropdown-list-input">
      {autoComplete !== 'off' && !isNonInteractive && (
        <input
          name={name}
          tabIndex={-1}
          disabled={disabled}
          readOnly={readOnly}
          value={strValue == null ? '' : strValue}
          autoComplete={autoComplete}
          onChange={handleAutofill}
          onAnimationStart={handleAutofillDetect}
          className={cn('rw-detect-autofill', !autofilling && 'rw-sr')}
        />
      )}

      {!autofilling && autoComplete !== 'off' && (
        <>
          {allowSearch && (
            <input
              ref={searchRef}
              disabled={disabled}
              readOnly={readOnly}
              className="rw-dropdownlist-search"
              value={searchTerm || ''}
              size={(searchTerm || '').length + 2}
              onChange={onSearch}
            />
          )}
          {!searchTerm && (
            <span className="rw-dropdown-list-value">{inputValue}</span>
          )}
        </>
      )}
    </div>
  )
})

DropdownListInput.displayName = 'DropdownListInput'

export default DropdownListInput
