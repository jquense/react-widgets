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
import Listbox, { ListboxHandle } from './Listbox'
import { OptionsContext, useOptionList } from './ListboxContext'
import Popup from './Popup'
import Select from './Select'
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
import { useActiveDescendant } from './util/A11y'
import * as Filter from './util/Filter'
import * as CustomPropTypes from './util/PropTypes'
import { toItemArray } from './util/_'
import canShowCreate from './util/canShowCreate'
import { useAccessors } from './util/getAccessors'
import {
  useAutoFocus,
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

const propTypes = {
  ...Filter.propTypes,

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

  isRtl: PropTypes.bool,

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
 * ---
 * shortcuts:
 *   - { key: alt + down arrow, label: open dropdown }
 *   - { key: alt + up arrow, label: close dropdown }
 *   - { key: down arrow, label: move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: ctrl + enter, label: create new option from current searchTerm }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * A `<select>` replacement for single value lists.
 * @public
 */
const DropdownList: DropdownList = React.forwardRef(function DropdownList<
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

    isRtl,
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
    listComponent: List = Listbox,
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
  const listRef = useRef<ListboxHandle>(null)

  const inputId = useInstanceId(id, '_input')
  const listId = useInstanceId(id, '_listbox')
  const createId = useInstanceId(id, '_create_option')
  const activeId = useInstanceId(id, '_listbox_active_option')

  const accessors = useAccessors(textField, dataKey)
  const messages = useMessagesWithDefaults(userMessages)

  useAutoFocus(!!autoFocus, ref)

  const toggle = useDropodownToggle(currentOpen, handleOpen!)

  const isDisabled = disabled === true
  const disabledItems = toItemArray(disabled)
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
  const [listContext, list] = useOptionList(accessors.text, disabledItems)

  const selectedItem = useMemo(
    () => data[accessors.indexOf(data, currentValue)],
    [data, currentValue, accessors],
  )

  const [focusedItem, setFocusedItem] = useStateFromProp(selectedItem)
  const [autofilling, setAutofilling] = useState(false)

  const nextSearchChar = useSearchWordBuilder(delay)

  useActiveDescendant(ref, activeId, focusedItem && currentOpen, [focusedItem])

  const showCreateOption = canShowCreate(allowCreate, {
    searchTerm: currentSearch,
    data,
    accessors,
  })

  const handleCreate = (_, event?: React.SyntheticEvent) => {
    notify(onCreate, [currentSearch!])

    clearSearch(event)
    toggle.close()
    focus()
  }

  const handleSelect = (
    dataItem: TDataItem,
    originalEvent?: React.SyntheticEvent,
  ) => {
    if (dataItem === undefined || dataItem === CREATE_OPTION) {
      handleCreate(currentSearch)
      return
    }
    notify(onSelect, [dataItem, { originalEvent }])
    change(dataItem, originalEvent)
    toggle.close()
    focus()
  }

  const handleClick = e => {
    focus()
    toggle()
    notify(onClick, e)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let { key, altKey, ctrlKey, shiftKey } = e
    const currentFocused = focusedItem || selectedItem
    notify(onKeyDown, [e])

    let closeWithFocus = () => {
      clearSearch()

      toggle.close()
      if (currentOpen) setTimeout(focus)
    }

    if (e.defaultPrevented) return

    if (key === 'End' && currentOpen && !shiftKey) {
      e.preventDefault()
      setFocusedItem(list.last())
    } else if (key === 'Home' && currentOpen && !shiftKey) {
      e.preventDefault()
      setFocusedItem(list.first())
    } else if (key === 'Escape' && (currentOpen || currentSearch)) {
      e.preventDefault()
      closeWithFocus()
    } else if (key === 'Enter' && currentOpen && ctrlKey && showCreateOption) {
      e.preventDefault()
      handleCreate(currentSearch, e)
    } else if ((key === 'Enter' || (key === ' ' && !filter)) && currentOpen) {
      e.preventDefault()
      if (focusedItem) handleSelect(focusedItem, e)
    } else if (key === 'ArrowDown') {
      e.preventDefault()

      if (!currentOpen) {
        toggle.open()
        return
      }

      setFocusedItem(list.next(currentFocused))
    } else if (key === 'ArrowUp') {
      e.preventDefault()

      if (altKey) return closeWithFocus()

      setFocusedItem(list.prev(currentFocused))
    }
  }

  const handleKeyPress = e => {
    notify(onKeyPress, [e])
    if (e.defaultPrevented || filter) return

    nextSearchChar(String.fromCharCode(e.which), word => {
      let startItem = currentOpen ? focusedItem : selectedItem

      let item = list.next(startItem, word)
      if (item === startItem) {
        item = list.next(null, word)
      }

      if (!item) return

      if (currentOpen) setFocusedItem(item)
      else change(item, e)
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

  const handleAutofillChange = e => {
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
    tabIndex: currentOpen && filter ? -1 : tabIndex || 0,
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
    <OptionsContext.Provider value={listContext}>
      <Widget
        {...widgetProps}
        open={!!currentOpen}
        isRtl={!!isRtl}
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
          className={cn(containerClassName, 'rw-widget-input')}
        >
          <DropdownListInput
            {...inputProps}
            value={valueItem}
            dataKeyAccessor={accessors.value}
            textAccessor={accessors.text}
            name={name}
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
          <Select
            busy={busy}
            icon={selectIcon}
            aria-hidden="true"
            spinner={busySpinner}
            role="presentational"
            disabled={isDisabled || isReadOnly}
            label={messages.openDropdown()}
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
            <List
              {...listProps}
              id={listId}
              tabIndex={-1}
              activeId={activeId}
              data={data}
              bordered={false}
              disabled={disabled}
              groupBy={groupBy}
              searchTerm={currentSearch}
              textField={textField}
              dataKey={dataKey}
              renderItem={renderListItem}
              renderGroup={renderListGroup}
              optionComponent={optionComponent}
              value={selectedItem}
              focusedItem={focusedItem}
              onChange={(d, meta) => handleSelect(d, meta.originalEvent)}
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
              <AddToListOption
                id={createId}
                onSelect={handleCreate}
                focused={focusedItem === CREATE_OPTION}
              >
                {messages.createOption(currentValue, currentSearch || '')}
              </AddToListOption>
            )}
          </Popup>
        )}
      </Widget>
    </OptionsContext.Provider>
  )
})

DropdownList.displayName = 'DropdownList'

DropdownList.propTypes = propTypes

export default DropdownList
