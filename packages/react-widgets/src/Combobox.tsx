import cn from 'classnames'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useImperativeHandle, useMemo, useRef, useState } from 'react'
import { useUncontrolledProp } from 'uncontrollable'
import { caretDown } from './Icon'
import Input from './Input'
import List, { ListHandle } from './List'
import { FocusListContext, useFocusList } from './FocusListContext'
import BasePopup from './Popup'
import InputAddon from './InputAddon'
import Widget from './Widget'
import WidgetPicker from './WidgetPicker'
import { useMessagesWithDefaults } from './messages'
import {
  BaseListboxInputProps,
  ChangeHandler,
  Filterable,
  PopupWidgetProps,
  SelectHandler,
  WidgetHTMLProps,
  WidgetProps,
} from './shared'
import { DataItem, WidgetHandle } from './types'
import { useActiveDescendant } from './A11y'
import * as CustomPropTypes from './PropTypes'
import { TextAccessorFn, useAccessors } from './Accessors'
import { useFilteredData } from './Filter'
import useDropdownToggle from './useDropdownToggle'
import useFocusManager from './useFocusManager'
import { notify, useFirstFocusedRender, useInstanceId } from './WidgetHelpers'
import { Spinner } from './Icon'

function indexOf<TDataItem>(
  data: readonly TDataItem[],
  searchTerm: string,
  text: TextAccessorFn,
) {
  if (!searchTerm.trim()) return -1
  for (let idx = 0; idx < data.length; idx++)
    if (text(data[idx]).toLowerCase() === searchTerm) return idx
  return -1
}

let propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  open: PropTypes.bool,
  onToggle: PropTypes.func,

  renderListItem: PropTypes.func,
  listComponent: PropTypes.elementType,

  renderListGroup: PropTypes.func,
  groupBy: CustomPropTypes.accessor,

  data: PropTypes.array,
  dataKey: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  name: PropTypes.string,

  /** Do not show the auto complete list when it returns no results. */
  hideEmptyPopup: PropTypes.bool,

  /** Hide the combobox dropdown indicator. */
  hideCaret: PropTypes.bool,

  /**
   *
   * @type {(dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void}
   */
  onSelect: PropTypes.func,

  autoFocus: PropTypes.bool,

  disabled: CustomPropTypes.disabled.acceptsArray,

  readOnly: CustomPropTypes.disabled,

  busy: PropTypes.bool,

  /** Specify the element used to render the select (down arrow) icon. */
  selectIcon: PropTypes.node,

  /** Specify the element used to render the busy indicator */
  busySpinner: PropTypes.node,

  dropUp: PropTypes.bool,
  popupTransition: PropTypes.elementType,

  placeholder: PropTypes.string,

  /** Adds a css class to the input container element. */
  containerClassName: PropTypes.string,

  inputProps: PropTypes.object,
  listProps: PropTypes.object,

  messages: PropTypes.shape({
    openCombobox: CustomPropTypes.message,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
  }),
}

export type ComboboxHandle = WidgetHandle

export interface ComboboxProps<TDataItem = DataItem>
  extends WidgetHTMLProps,
  WidgetProps,
  PopupWidgetProps,
  Filterable<TDataItem>,
  BaseListboxInputProps<TDataItem, string | TDataItem> {
  name?: string

  /**
   * If a `data` item matches the current typed value select it automatically.
   */
  autoSelectMatches?: boolean
  onChange?: ChangeHandler<TDataItem | string>
  onSelect?: SelectHandler<TDataItem | string>

  hideCaret?: boolean
  hideEmptyPopup?: boolean
}

declare interface Combobox {
  <TDataItem = DataItem>(
    props: ComboboxProps<TDataItem> & React.RefAttributes<ComboboxHandle>,
  ): React.ReactElement | null

  displayName?: string
  propTypes?: any
}

/**
 * ---
 * shortcuts:
 *   - { key: alt + down arrow, label: open combobox }
 *   - { key: alt + up arrow, label: close combobox }
 *   - { key: down arrow, label: move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * Select an item from the list, or input a custom value. The Combobox can also make suggestions as you type.

 * @public
 */
const ComboboxImpl: Combobox = React.forwardRef(function Combobox<TDataItem>(
  {
    id,
    className,
    containerClassName,
    placeholder,
    autoFocus,

    textField,
    dataKey,
    autoSelectMatches,

    focusFirstItem = false,

    value,
    defaultValue = '',
    onChange,

    open,
    defaultOpen = false,
    onToggle,

    filter = true,
    busy,
    disabled,
    readOnly,
    selectIcon = caretDown,
    hideCaret,
    hideEmptyPopup,
    busySpinner,
    dropUp,
    tabIndex,
    popupTransition,
    name,
    onSelect,
    onKeyDown,
    onBlur,
    onFocus,
    inputProps,
    listProps,
    groupBy,
    renderListItem,
    renderListGroup,
    optionComponent,
    listComponent: ListComponent = List,
    popupComponent: Popup = BasePopup,
    data: rawData = [],
    messages: userMessages,
    ...elementProps
  }: ComboboxProps<TDataItem>,
  outerRef: React.RefObject<ComboboxHandle>,
) {
  let [currentValue, handleChange] = useUncontrolledProp(
    value,
    defaultValue,
    onChange,
  )
  const [currentOpen, handleOpen] = useUncontrolledProp(
    open,
    defaultOpen,
    onToggle,
  )

  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<ListHandle>(null)

  const [suggestion, setSuggestion] = useState<TDataItem | null>(null)
  const shouldFilter = useRef(false)

  const inputId = useInstanceId(id, '_input')
  const listId = useInstanceId(id, '_listbox')
  const activeId = useInstanceId(id, '_listbox_active_option')

  const accessors = useAccessors(textField, dataKey)
  const messages = useMessagesWithDefaults(userMessages)
  const toggle = useDropdownToggle(currentOpen, handleOpen)

  const isDisabled = disabled === true
  const isReadOnly = !!readOnly

  const data = useFilteredData(
    rawData,
    filter,
    shouldFilter.current ? accessors.text(currentValue) : void 0,
    accessors.text,
  )

  const selectedItem = useMemo(
    () => data[accessors.indexOf(data, currentValue)],
    [data, currentValue, accessors],
  )

  const list = useFocusList<TDataItem>({
    activeId,
    scope: ref,
    focusFirstItem,
    anchorItem: currentOpen ? selectedItem : undefined,
  })

  const [focusEvents, focused] = useFocusManager(
    ref,
    { disabled: isDisabled, onBlur, onFocus },
    {
      didHandle(focused) {
        if (!focused) {
          shouldFilter.current = false
          toggle.close()
          setSuggestion(null)
          list.focus(undefined)
        } else {
          focus({ preventScroll: true })
        }
      },
    },
  )

  useActiveDescendant(ref, activeId, currentOpen, [list.getFocused()])

  /**
   * Handlers
   */

  const handleClick = (e: React.MouseEvent) => {
    if (readOnly || isDisabled) return

    // prevents double clicks when in a <label>
    e.preventDefault()

    focus()
    toggle()
  }

  const handleSelect = (
    data: string | TDataItem,
    originalEvent: React.SyntheticEvent,
  ) => {
    toggle.close()
    shouldFilter.current = false

    setSuggestion(null)
    notify(onSelect, [data, { originalEvent }])
    change(data, originalEvent, true)
    focus({ preventScroll: true })
  }

  const handleInputKeyDown = ({
    key,
  }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === 'Backspace' || key === 'Delete') {
      list.focus(null)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let idx = autoSelectMatches
      ? indexOf(rawData, event.target.value.toLowerCase(), accessors.text)
      : -1

    shouldFilter.current = true

    setSuggestion(null)

    const nextValue = idx === -1 ? event.target.value : rawData[idx]

    change(nextValue, event)

    if (!nextValue) toggle.close()
    else toggle.open()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (readOnly) return

    let { key, altKey, shiftKey } = e

    notify(onKeyDown, [e])

    if (e.defaultPrevented) return

    const select = (item: TDataItem | undefined) =>
      item != null && handleSelect(item, e)

    const setFocused = (el?: HTMLElement) => {
      if (!el) return
      setSuggestion(list.toDataItem(el)!)
      list.focus(el)
    }

    if (key === 'End' && currentOpen && !shiftKey) {
      e.preventDefault()
      setFocused(list.last())
    } else if (key === 'Home' && currentOpen && !shiftKey) {
      e.preventDefault()
      setFocused(list.first())
    } else if (key === 'Escape' && currentOpen) {
      e.preventDefault()
      setSuggestion(null)
      toggle.close()
    } else if (key === 'Enter' && currentOpen) {
      e.preventDefault()
      select(list.getFocused()!)
    } else if (key === 'ArrowDown') {
      e.preventDefault()
      if (currentOpen) {
        setFocused(list.next())
      } else {
        return toggle.open()
      }
    } else if (key === 'ArrowUp') {
      e.preventDefault()
      if (altKey) return toggle.close()

      if (currentOpen) {
        setFocused(list.prev())
      }
    }
  }

  /**
   * Methods
   */

  function focus(opts?: FocusOptions) {
    if (inputRef.current) inputRef.current.focus(opts)
  }

  function change(
    nextValue: TDataItem | string,
    originalEvent?: React.SyntheticEvent,
    selected = false,
  ) {
    handleChange(nextValue, {
      lastValue: currentValue,
      originalEvent,
      source: selected ? 'listbox' : 'input',
    })
  }

  /**
   * Rendering
   */

  useImperativeHandle(outerRef, () => ({
    focus,
  }))

  let shouldRenderPopup = useFirstFocusedRender(focused, currentOpen!)

  let valueItem = accessors.findOrSelf(data, currentValue)
  let inputValue = accessors.text(suggestion || valueItem)

  let completeType = filter ? ('list' as const) : ('none' as const)

  let popupOpen = currentOpen && (!hideEmptyPopup || !!data.length)
  let inputReadOnly =
    // @ts-ignore
    inputProps?.readOnly != null ? inputProps?.readOnly : readOnly;

  const Addon = () => {
    if (!hideCaret) {
      return (
        <InputAddon
          busy={busy}
          icon={selectIcon}
          spinner={busySpinner}
          onClick={handleClick}
          disabled={!!isDisabled || isReadOnly}
          // FIXME
          label={messages.openCombobox()}
        />
      );
    } else if (busy) {
      return (
        <span aria-hidden="true" className="rw-btn rw-picker-caret">
          {busySpinner || Spinner}
        </span>
      );
    }
    return <></>;
  }

  return (
    <Widget
      {...elementProps}
      ref={ref}
      open={currentOpen}
      dropUp={dropUp}
      focused={focused}
      disabled={isDisabled}
      readOnly={isReadOnly}
      {...focusEvents}
      onKeyDown={handleKeyDown}
      className={cn(className, 'rw-combobox')}
    >
      <WidgetPicker className={containerClassName} hideCaret={hideCaret} busy={busy}>
        <Input
          {...inputProps}
          role="combobox"
          name={name}
          id={inputId}
          className={cn(
            // @ts-ignore
            inputProps && inputProps.className,
            'rw-widget-input rw-combobox-input',
          )}
          autoFocus={autoFocus}
          tabIndex={tabIndex}
          disabled={isDisabled}
          readOnly={inputReadOnly}
          aria-busy={!!busy}
          aria-owns={listId}
          aria-autocomplete={completeType}
          aria-expanded={currentOpen}
          aria-haspopup={true}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          ref={inputRef}
        />
        <Addon />
      </WidgetPicker>
      <FocusListContext.Provider value={list.context}>
        {shouldRenderPopup && (
          <Popup
            dropUp={dropUp}
            open={popupOpen}
            transition={popupTransition}
            onEntering={() => listRef.current!.scrollIntoView()}
          >
            <ListComponent
              {...listProps}
              id={listId}
              tabIndex={-1}
              data={data}
              groupBy={groupBy}
              disabled={disabled}
              accessors={accessors}
              renderItem={renderListItem}
              renderGroup={renderListGroup}
              optionComponent={optionComponent}
              value={selectedItem}
              searchTerm={(valueItem && accessors.text(valueItem)) || ''}
              aria-hidden={!popupOpen}
              aria-labelledby={inputId}
              aria-live={popupOpen ? 'polite' : void 0}
              onChange={(d, meta) =>
                handleSelect(d as TDataItem, meta.originalEvent!)
              }
              ref={listRef}
              messages={{
                emptyList: rawData.length
                  ? messages.emptyFilter
                  : messages.emptyList,
              }}
            />
          </Popup>
        )}
      </FocusListContext.Provider>
    </Widget>
  )
})

ComboboxImpl.displayName = 'Combobox'
ComboboxImpl.propTypes = propTypes

export default ComboboxImpl
