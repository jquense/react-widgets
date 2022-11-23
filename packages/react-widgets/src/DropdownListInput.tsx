import cn from 'clsx'
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
    let nextAutofilling: boolean

    if (animationName === 'react-widgets-autofill-start') nextAutofilling = true
    else if (animationName === 'react-widgets-autofill-cancel')
      nextAutofilling = false
    else return

    setAutofilling(nextAutofilling)
    onAutofill(nextAutofilling)
  }

  const handleAutofill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAutofilling(false)
    onAutofillChange(e)
  }
  let dataKey = dataKeyAccessor(value)
  let text = value == null ? '' : textAccessor(value)

  let strValue = String(dataKey ?? '')
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

  // There is some interaction between unmounting the search and value inputs
  // that cancels autofilling in Chrome, it may be due to an input the browser
  // was considering suddenly disappeared. hiding it seems to avoid the issue
  const style = autofilling ? { display: 'none' } : undefined

  return (
    <div className="rw-dropdown-list-input">
      {autoComplete !== 'off' && (
        <input
          name={name}
          tabIndex={-1}
          disabled={disabled}
          readOnly={readOnly}
          value={strValue == null ? '' : strValue}
          autoComplete={autoComplete}
          onChange={handleAutofill}
          onAnimationStart={handleAutofillDetect}
          aria-hidden={!autofilling}
          className={cn('rw-detect-autofill', !autofilling && 'rw-sr')}
        />
      )}
      <>
        {allowSearch && (
          <input
            ref={searchRef}
            disabled={disabled}
            readOnly={readOnly}
            style={style}
            className="rw-dropdownlist-search"
            autoComplete="off"
            value={searchTerm || ''}
            size={(searchTerm || '').length + 2}
            onChange={onSearch}
          />
        )}
        {!searchTerm && (
          <span className="rw-dropdown-list-value" style={style}>
            {inputValue}
          </span>
        )}
      </>
    </div>
  )
})

DropdownListInput.displayName = 'DropdownListInput'

export default DropdownListInput
