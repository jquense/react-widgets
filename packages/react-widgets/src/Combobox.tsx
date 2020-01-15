import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { useImperativeHandle, useMemo, useRef, useState } from 'react'
import { useUncontrolledProp } from 'uncontrollable'
import { caretDown } from './Icon'
import Input from './Input'
import Listbox, { ListboxHandle } from './Listbox'
import { OptionsContext, useOptionList } from './ListboxContext'
import { RenderTagProp, TagComponentProp } from './MultiselectTagList'
import Popup from './Popup'
import Select from './Select'
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
import { useActiveDescendant } from './util/A11y'
import * as Filter from './util/Filter'
import * as CustomPropTypes from './util/PropTypes'
import { toItemArray } from './util/_'
import { TextAccessorFn } from './util/dataHelpers'
import { useAccessors } from './util/getAccessors'
import {
  useDropodownToggle,
  useFilteredData,
  useStateFromProp,
} from './util/hooks'
import useFocusManager from './util/useFocusManager'
import {
  notify,
  useFirstFocusedRender,
  useInstanceId,
} from './util/widgetHelpers'

function indexOf<TDataItem>(
  data: TDataItem[],
  searchTerm: string,
  text: TextAccessorFn,
) {
  if (!searchTerm.trim()) return -1
  for (let idx = 0; idx < data.length; idx++)
    if (text(data[idx]).toLowerCase() === searchTerm) return idx
  return -1
}

let propTypes = {
  ...Filter.propTypes,
  value: PropTypes.any,
  onChange: PropTypes.func,
  open: PropTypes.bool,
  onToggle: PropTypes.func,

  renderListItem: PropTypes.func,
  listComponent: CustomPropTypes.elementType,

  renderListGroup: PropTypes.func,
  groupBy: CustomPropTypes.accessor,

  data: PropTypes.array,
  dataKey: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  name: PropTypes.string,

  /**
   *
   * @type {(dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void}
   */
  onSelect: PropTypes.func,

  autoFocus: PropTypes.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,

  /**
   * When `true` the Combobox will suggest, or fill in, values as you type. The suggestions
   * are always "startsWith", meaning it will search from the start of the `textField` property
   */
  suggest: Filter.propTypes.filter,
  busy: PropTypes.bool,

  /** Specify the element used to render the select (down arrow) icon. */
  selectIcon: PropTypes.node,

  /** Specify the element used to render the busy indicator */
  busySpinner: PropTypes.node,

  delay: PropTypes.number,

  dropUp: PropTypes.bool,
  popupTransition: CustomPropTypes.elementType,

  placeholder: PropTypes.string,

  /** Adds a css class to the input container element. */
  containerClassName: PropTypes.string,

  inputProps: PropTypes.object,
  listProps: PropTypes.object,

  isRtl: PropTypes.bool,
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
  autoSelectMatches?: boolean
  onChange?: ChangeHandler<TDataItem | string>
  onSelect?: SelectHandler<TDataItem | string>
  onCreate?: (searchTerm: string) => void
  showPlaceholderWithValues?: boolean
  renderTagValue?: RenderTagProp<TDataItem>
  clearTagIcon?: React.ReactNode
  tagOptionComponent?: TagComponentProp
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
const Combobox: Combobox = React.forwardRef(function Combobox<TDataItem>(
  {
    id,
    className,
    containerClassName,
    placeholder,
    autoFocus,

    textField,
    dataKey,
    autoSelectMatches,

    value,
    defaultValue = '',
    onChange,

    open,
    defaultOpen = false,
    onToggle,

    filter = true,
    isRtl,

    busy,
    disabled,
    readOnly,
    selectIcon = caretDown,
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
    listComponent: List = Listbox,
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
  const listRef = useRef<ListboxHandle>(null)

  const [suggestion, setSuggestion] = useState(null)
  const shouldFilter = useRef(false)

  const inputId = useInstanceId(id, '_input')
  const listId = useInstanceId(id, '_listbox')
  const activeId = useInstanceId(id, '_listbox_active_option')

  const accessors = useAccessors(textField, dataKey)
  const messages = useMessagesWithDefaults(userMessages)
  const toggle = useDropodownToggle(currentOpen, handleOpen)

  const isDisabled = disabled === true
  const disabledItems = toItemArray(disabled)
  const isReadOnly = !!readOnly

  const [focusEvents, focused] = useFocusManager(
    ref,
    { disabled: isDisabled, onBlur, onFocus },
    {
      didHandle(focused) {
        if (!focused) {
          shouldFilter.current = false
          toggle.close()
          setSuggestion(null)
          setFocusedItem(undefined)
        } else {
          focus()
        }
      },
    },
  )

  const data = useFilteredData(
    rawData,
    filter,
    shouldFilter.current ? accessors.text(currentValue) : void 0,
    accessors.text,
  )

  const [listContext, list] = useOptionList(accessors.text, disabledItems)
  const selectedItem = useMemo(
    () => data[accessors.indexOf(data, currentValue)],
    [data, currentValue, accessors],
  )

  const [focusedItem, setFocusedItem] = useStateFromProp(selectedItem)

  useActiveDescendant(ref, activeId, currentOpen, [focusedItem])

  /**
   * Handlers
   */

  const handleSelect = (
    data: string | TDataItem,
    originalEvent: React.SyntheticEvent,
  ) => {
    toggle.close()
    shouldFilter.current = false

    setSuggestion(null)
    notify(onSelect, [data, { originalEvent }])
    change(data, originalEvent)
    focus()
  }

  const handleInputKeyDown = ({ key }) => {
    if (key === 'Backspace' || key === 'Delete') {
      setFocusedItem(undefined)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let idx = autoSelectMatches
      ? indexOf(rawData, event.target.value.toLowerCase(), accessors.text)
      : -1

    shouldFilter.current = true

    setSuggestion(null)

    change(idx === -1 ? event.target.value : rawData[idx], event)
    toggle.open()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let { key, altKey, shiftKey } = e

    notify(onKeyDown, [e])

    if (e.defaultPrevented) return

    const select = item => item != null && handleSelect(item, e)
    const setFocused = item => {
      setSuggestion(item)
      setFocusedItem(item)
    }

    if (key === 'End' && currentOpen && !shiftKey) {
      e.preventDefault()
      setFocused(list.last())
    } else if (key === 'Home' && currentOpen && !shiftKey) {
      e.preventDefault()
      setFocused(list.first())
    } else if (key === 'Escape' && currentOpen) {
      e.preventDefault()
      toggle.close()
    } else if (key === 'Enter' && currentOpen) {
      e.preventDefault()
      select(focusedItem)
    } else if (key === 'ArrowDown') {
      e.preventDefault()
      if (currentOpen) {
        let nextFocusedItem = list.next(focusedItem)
        setFocused(nextFocusedItem === focusedItem ? null : nextFocusedItem)
      } else {
        return toggle.open()
      }
    } else if (key === 'ArrowUp') {
      e.preventDefault()
      if (altKey) return toggle.close()

      if (currentOpen) {
        let prevFocusedItem = list.prev(focusedItem)
        setFocused(prevFocusedItem === focusedItem ? null : prevFocusedItem)
      }
    }
  }

  /**
   * Methods
   */

  function focus() {
    if (inputRef.current) inputRef.current.focus()
  }

  function change(
    nextValue: TDataItem | string,
    originalEvent?: React.SyntheticEvent,
  ) {
    handleChange(nextValue, {
      lastValue: currentValue,
      originalEvent,
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

  return (
    <Widget
      {...elementProps}
      ref={ref}
      open={currentOpen}
      isRtl={isRtl}
      dropUp={dropUp}
      focused={focused}
      disabled={isDisabled}
      readOnly={isReadOnly}
      {...focusEvents}
      onKeyDown={handleKeyDown}
      className={cn(className, 'rw-combobox')}
    >
      <WidgetPicker className={containerClassName}>
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
          readOnly={isReadOnly}
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
        <Select
          bordered
          busy={busy}
          icon={selectIcon}
          spinner={busySpinner}
          onClick={toggle}
          disabled={!!disabled || readOnly}
          // FIXME
          label={messages.openCombobox()}
        />
      </WidgetPicker>
      <OptionsContext.Provider value={listContext}>
        {shouldRenderPopup && (
          <Popup
            dropUp={dropUp}
            open={currentOpen}
            transition={popupTransition}
            onEntering={() => listRef.current!.scrollIntoView()}
          >
            <List
              {...listProps}
              id={listId}
              tabIndex={-1}
              activeId={activeId}
              data={data}
              bordered={false}
              groupBy={groupBy}
              textField={textField}
              dataKey={dataKey}
              renderItem={renderListItem}
              renderGroup={renderListGroup}
              optionComponent={optionComponent}
              value={selectedItem}
              focusedItem={currentOpen ? focusedItem : void 0}
              searchTerm={(valueItem && accessors.text(valueItem)) || ''}
              aria-hidden={!currentOpen}
              aria-labelledby={inputId}
              aria-live={currentOpen ? 'polite' : void 0}
              onChange={(d, meta) => handleSelect(d, meta.originalEvent)}
              ref={listRef}
              messages={{
                emptyList: rawData.length
                  ? messages.emptyFilter
                  : messages.emptyList,
              }}
            />
          </Popup>
        )}
      </OptionsContext.Provider>
    </Widget>
  )
})

Combobox.displayName = 'Combobox'
Combobox.propTypes = propTypes
// Combobox.defaultProps = defaultProps

export default Combobox
