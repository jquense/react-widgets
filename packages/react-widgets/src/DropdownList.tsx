import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { useImperativeHandle, useMemo, useRef, useState } from 'react'
import { useUncontrolledProp } from 'uncontrollable'
import useTimeout from '@restart/hooks/useTimeout'
import AddToListOption, { CREATE_OPTION } from './AddToListOption'
import DropdownListInput, {
  DropdownInputHandle,
  RenderValueProp,
} from './DropdownListInput'
import { caretDown } from './Icon'
import List, { ListHandle } from './List'
import { FocusListContext, useFocusList } from './FocusListContext'
import Popup from './Popup'
import Widget from './Widget'
import WidgetPicker from './WidgetPicker'
import { useMessagesWithDefaults } from './messages'
import {
  BaseListboxInputProps,
  Filterable,
  PopupWidgetProps,
  Searchable,
  WidgetHTMLProps,
  WidgetProps,
} from './shared'
import { DataItem, WidgetHandle } from './types'
import { useActiveDescendant } from './A11y'
import { useFilteredData, presets } from './Filter'
import * as CustomPropTypes from './PropTypes'
import canShowCreate from './canShowCreate'
import { useAccessors } from './Accessors'
import useAutoFocus from './useAutoFocus'
import useDropdownToggle from './useDropdownToggle'
import useFocusManager from './useFocusManager'
import { notify, useFirstFocusedRender, useInstanceId } from './WidgetHelpers'
import PickerCaret from './PickerCaret'

const propTypes = {
  value: PropTypes.any,
  /**
   * @type {function (
   *  dataItems: ?any,
   *  metadata: {
   *    lastValue: ?any,
   *    searchTerm: ?string
   *    originalEvent: SyntheticEvent,
   *  }
   * ): void}
   */
  onChange: PropTypes.func,
  open: PropTypes.bool,
  onToggle: PropTypes.func,

  data: PropTypes.array,
  dataKey: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  allowCreate: PropTypes.oneOf([true, false, 'onFilter']),

  /**
   * A React render prop for customizing the rendering of the DropdownList
   * value
   */
  renderValue: PropTypes.func,
  renderListItem: PropTypes.func,
  listComponent: CustomPropTypes.elementType,
  optionComponent: CustomPropTypes.elementType,

  renderListGroup: PropTypes.func,
  groupBy: CustomPropTypes.accessor,

  /**
   *
   * @type {(dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void}
   */
  onSelect: PropTypes.func,

  onCreate: PropTypes.func,

  /**
   * @type function(searchTerm: string, metadata: { action, lastSearchTerm, originalEvent? })
   */
  onSearch: PropTypes.func,

  searchTerm: PropTypes.string,
  busy: PropTypes.bool,

  /** Specify the element used to render the select (down arrow) icon. */
  selectIcon: PropTypes.node,

  /** Specify the element used to render the busy indicator */
  busySpinner: PropTypes.node,

  placeholder: PropTypes.string,

  dropUp: PropTypes.bool,
  popupTransition: CustomPropTypes.elementType,

  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,

  /** Adds a css class to the input container element. */
  containerClassName: PropTypes.string,

  inputProps: PropTypes.object,
  listProps: PropTypes.object,

  messages: PropTypes.shape({
    open: PropTypes.string,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
    filterPlaceholder: PropTypes.string,
    createOption: CustomPropTypes.message,
  }),
}

function useSearchWordBuilder(delay: number) {
  const timeout = useTimeout()
  const wordRef = useRef('')

  function search(character: string, cb: (word: string) => void) {
    let word = (wordRef.current + character).toLowerCase()

    if (!character) return

    wordRef.current = word

    timeout.set(() => {
      wordRef.current = ''
      cb(word)
    }, delay)
  }
  return search
}

export type DropdownHandle = WidgetHandle

export interface DropdownProps<TDataItem>
  extends WidgetProps,
    WidgetHTMLProps,
    PopupWidgetProps,
    Searchable,
    Filterable<TDataItem>,
    BaseListboxInputProps<TDataItem> {
  name?: string
  autoFocus?: boolean
  autoComplete?: 'on' | 'off'

  onCreate?: (searchTerm: string) => void
  renderValue?: RenderValueProp<TDataItem>
}

declare interface DropdownList {
  <TDataItem = DataItem>(
    props: DropdownProps<TDataItem> & React.RefAttributes<DropdownHandle>,
  ): React.ReactElement | null

  displayName?: string
  propTypes?: any
}

/**
 * A `<select>` replacement for single value lists.
 * @public
 */
const DropdownListImpl: DropdownList = React.forwardRef(function DropdownList<
  TDataItem
>(
  {
    id,
    autoFocus,
    textField,
    dataKey,

    value,
    defaultValue,
    onChange,

    open,
    defaultOpen = false,
    onToggle,

    searchTerm,
    defaultSearchTerm = '',
    onSearch,

    filter = true,
    allowCreate = false,
    delay = 500,

    focusFirstItem,

    className,
    containerClassName,
    placeholder,
    busy,
    disabled,
    readOnly,
    selectIcon = caretDown,
    busySpinner,
    dropUp,
    tabIndex,
    popupTransition,
    name,
    autoComplete,
    onSelect,
    onCreate,
    onKeyPress,
    onKeyDown,
    onClick,
    inputProps,
    listProps,
    renderListItem,
    renderListGroup,
    optionComponent,
    renderValue,
    groupBy,
    onBlur,
    onFocus,
    listComponent: ListComponent = List,
    data: rawData = [],
    messages: userMessages,
    ...elementProps
  }: DropdownProps<TDataItem>,
  outerRef: React.RefObject<DropdownHandle>,
) {
  const [currentValue, handleChange] = useUncontrolledProp(
    value,
    defaultValue,
    onChange as any,
  )
  const [currentOpen, handleOpen] = useUncontrolledProp(
    open,
    defaultOpen,
    onToggle,
  )
  const [currentSearch, handleSearch] = useUncontrolledProp(
    searchTerm,
    defaultSearchTerm,
    onSearch,
  )

  const ref = useRef<HTMLDivElement>(null)
  const filterRef = useRef<DropdownInputHandle>(null)
  const listRef = useRef<ListHandle>(null)

  const inputId = useInstanceId(id, '_input')
  const listId = useInstanceId(id, '_listbox')
  const activeId = useInstanceId(id, '_listbox_active_option')

  const accessors = useAccessors(textField, dataKey)
  const messages = useMessagesWithDefaults(userMessages)

  useAutoFocus(!!autoFocus, ref)

  const toggle = useDropdownToggle(currentOpen, handleOpen!)

  const isDisabled = disabled === true
  // const disabledItems = toItemArray(disabled)
  const isReadOnly = !!readOnly

  const [focusEvents, focused] = useFocusManager(
    ref,
    { disabled: isDisabled, onBlur, onFocus },
    {
      didHandle(focused) {
        if (focused) {
          if (filter) focus()
          return
        }

        toggle.close()
        clearSearch()
      },
    },
  )

  const data = useFilteredData(
    rawData,
    currentOpen ? filter : false,
    currentSearch,
    accessors.text,
  )

  const selectedItem = useMemo(
    () => data[accessors.indexOf(data, currentValue)],
    [data, currentValue, accessors],
  )

  const list = useFocusList({
    activeId,
    scope: ref,
    focusFirstItem,
    anchorItem: currentOpen ? selectedItem : undefined,
  })

  const [autofilling, setAutofilling] = useState(false)

  const nextSearchChar = useSearchWordBuilder(delay)

  const focusedItem = list.getFocused()
  useActiveDescendant(ref, activeId, focusedItem && currentOpen, [focusedItem])

  const showCreateOption = canShowCreate(allowCreate, {
    searchTerm: currentSearch,
    data,
    accessors,
  })

  const handleCreate = (event?: React.SyntheticEvent) => {
    notify(onCreate, [currentSearch!])

    clearSearch(event)
    toggle.close()
    focus()
  }

  const handleSelect = (
    dataItem: TDataItem,
    originalEvent?: React.SyntheticEvent,
  ) => {
    if (readOnly || isDisabled) return
    if (dataItem === undefined) return
    if (dataItem === CREATE_OPTION) {
      handleCreate(originalEvent)
      return
    }

    notify(onSelect, [dataItem, { originalEvent }])
    change(dataItem, originalEvent)
    toggle.close()
    focus()
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (readOnly || isDisabled) return

    focus()
    toggle()
    notify(onClick, [e])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (readOnly || isDisabled) return
    let { key, altKey, ctrlKey, shiftKey } = e
    notify(onKeyDown, [e])

    let closeWithFocus = () => {
      clearSearch()

      toggle.close()
      if (currentOpen) setTimeout(focus)
    }

    if (e.defaultPrevented) return

    if (key === 'End' && currentOpen && !shiftKey) {
      e.preventDefault()
      list.focus(list.last())
    } else if (key === 'Home' && currentOpen && !shiftKey) {
      e.preventDefault()
      list.focus(list.first())
    } else if (key === 'Escape' && (currentOpen || currentSearch)) {
      e.preventDefault()
      closeWithFocus()
    } else if (key === 'Enter' && currentOpen && ctrlKey && showCreateOption) {
      e.preventDefault()
      handleCreate(e)
    } else if ((key === 'Enter' || (key === ' ' && !filter)) && currentOpen) {
      e.preventDefault()
      if (list.hasFocused()) handleSelect(list.getFocused()!, e)
    } else if (key === 'ArrowDown') {
      e.preventDefault()

      if (!currentOpen) {
        toggle.open()
        return
      }

      list.focus(list.next())
    } else if (key === 'ArrowUp') {
      e.preventDefault()

      if (altKey) return closeWithFocus()

      list.focus(list.prev())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (readOnly || isDisabled) return

    notify(onKeyPress, [e])
    if (e.defaultPrevented || filter) return

    nextSearchChar(String.fromCharCode(e.which), (word) => {
      if (!currentOpen) return

      let isValid = (item: TDataItem) =>
        presets.startsWith(
          accessors.text(item).toLowerCase(),
          word.toLowerCase(),
        )

      const [items, focusedItem] = list.get()
      const len = items.length
      const startIdx = items.indexOf(focusedItem!) + 1
      const offset = startIdx >= len ? 0 : startIdx

      let idx = 0
      let pointer = offset
      while (idx < len) {
        pointer = (idx + offset) % len
        let item = items[pointer]
        if (isValid(list.toDataItem(item)!)) break
        idx++
      }

      if (idx === len) return

      list.focus(items[pointer])
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // hitting space to open
    if (!currentOpen && !e.target.value.trim()) {
      e.preventDefault()
    } else {
      search(e.target.value, e, 'input')
    }

    toggle.open()
  }

  const handleAutofillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let filledValue = e.target.value.toLowerCase()

    if (filledValue === '') return void change(null)

    for (const item of rawData) {
      let value = accessors.text(item)
      if (
        String(value).toLowerCase() === filledValue ||
        accessors.text(item).toLowerCase() === filledValue
      ) {
        change(item, e)
        break
      }
    }
  }

  function change(nextValue: unknown, originalEvent?: React.SyntheticEvent) {
    if (!accessors.matches(nextValue, currentValue)) {
      notify(handleChange, [
        nextValue,
        {
          originalEvent,
          lastValue: currentValue,
          searchTerm: currentSearch,
        },
      ])

      clearSearch(originalEvent)
      toggle.close()
    }
  }

  function focus() {
    if (filter) filterRef.current!.focus()
    else ref.current!.focus()
  }

  function clearSearch(originalEvent?: React.SyntheticEvent) {
    search('', originalEvent, 'clear')
  }

  function search(
    nextSearchTerm: string,
    originalEvent?: React.SyntheticEvent,
    action: 'input' | 'clear' = 'input',
  ) {
    if (currentSearch !== nextSearchTerm)
      handleSearch(nextSearchTerm, {
        action,
        originalEvent,
        lastSearchTerm: currentSearch,
      })
  }

  /**
   * Render
   */

  useImperativeHandle(outerRef, () => ({
    focus,
  }))

  let valueItem = accessors.findOrSelf(data, currentValue)

  let shouldRenderPopup = useFirstFocusedRender(focused, currentOpen!)

  const widgetProps: React.HTMLProps<HTMLDivElement> = {
    ...elementProps,
    role: 'combobox',
    id: inputId,
    //tab index when there is no filter input to take focus
    tabIndex: filter ? -1 : tabIndex || 0,
    // FIXME: only when item exists
    'aria-owns': listId,
    'aria-expanded': !!currentOpen,
    'aria-haspopup': true,
    'aria-busy': !!busy,
    'aria-live': currentOpen ? 'polite' : undefined,
    'aria-autocomplete': 'list',
    'aria-disabled': isDisabled,
    'aria-readonly': isReadOnly,
  }

  return (
    <FocusListContext.Provider value={list.context}>
      <Widget
        {...widgetProps}
        open={!!currentOpen}
        dropUp={!!dropUp}
        focused={!!focused}
        disabled={isDisabled}
        readOnly={isReadOnly}
        autofilling={autofilling}
        {...focusEvents}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
        className={cn(className, 'rw-dropdown-list')}
        ref={ref}
      >
        <WidgetPicker
          onClick={handleClick}
          tabIndex={filter ? -1 : 0}
          className={cn(containerClassName, 'rw-widget-input')}
        >
          <DropdownListInput
            {...inputProps}
            value={valueItem}
            dataKeyAccessor={accessors.value}
            textAccessor={accessors.text}
            name={name}
            readOnly={readOnly}
            disabled={isDisabled}
            allowSearch={!!filter}
            searchTerm={currentSearch}
            ref={filterRef}
            autoComplete={autoComplete}
            onSearch={handleInputChange}
            onAutofill={setAutofilling}
            onAutofillChange={handleAutofillChange}
            placeholder={placeholder}
            renderValue={renderValue}
          />
          <PickerCaret
            visible
            busy={busy}
            icon={selectIcon}
            spinner={busySpinner}
          />
        </WidgetPicker>
        {shouldRenderPopup && (
          <Popup
            dropUp={dropUp}
            open={currentOpen}
            transition={popupTransition}
            onEntered={focus}
            onEntering={() => listRef.current!.scrollIntoView()}
          >
            <ListComponent
              {...listProps}
              id={listId}
              data={data}
              tabIndex={-1}
              disabled={disabled}
              groupBy={groupBy}
              searchTerm={currentSearch}
              accessors={accessors}
              renderItem={renderListItem}
              renderGroup={renderListGroup}
              optionComponent={optionComponent}
              value={selectedItem}
              onChange={(d, meta) =>
                handleSelect(d as TDataItem, meta.originalEvent!)
              }
              aria-live={currentOpen ? 'polite' : undefined}
              aria-labelledby={inputId}
              aria-hidden={!currentOpen}
              ref={listRef}
              messages={{
                emptyList: rawData.length
                  ? messages.emptyFilter
                  : messages.emptyList,
              }}
            />
            {showCreateOption && (
              <AddToListOption onSelect={handleCreate}>
                {messages.createOption(currentValue, currentSearch || '')}
              </AddToListOption>
            )}
          </Popup>
        )}
      </Widget>
    </FocusListContext.Provider>
  )
})

DropdownListImpl.displayName = 'DropdownList'

DropdownListImpl.propTypes = propTypes

export default DropdownListImpl
