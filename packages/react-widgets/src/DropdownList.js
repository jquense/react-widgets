import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { useImperativeHandle, useMemo, useRef, useState } from 'react'
import { useUncontrolled } from 'uncontrollable'
import useEventCallback from '@restart/hooks/useEventCallback'
import useTimeout from '@restart/hooks/useTimeout'
import AddToListOption from './AddToListOption'
import DropdownListInput from './DropdownListInput'
import { caretDown } from './Icon'
import Listbox from './Listbox'
import Popup from './Popup'
import Select from './Select'
import Widget from './Widget'
import WidgetPicker from './WidgetPicker'
import { useMessagesWithDefaults } from './messages'
import { useActiveDescendant } from './util/A11y'
import * as Filter from './util/Filter'
import * as CustomPropTypes from './util/PropTypes'
import canShowCreate from './util/canShowCreate'
import { dataText, dataValue } from './util/dataHelpers'
import { useAccessors } from './util/getAccessors'
import {
  CREATE_OPTION,
  useAutoFocus,
  useDropodownToggle,
  useFilteredData,
  useFocusedItem,
  useList,
} from './util/hooks'
import { createEditableCallback } from './util/interaction'
import useFocusManager from './util/useFocusManager'
import useScrollManager from './util/useScrollManager'
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
  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,
  allowCreate: PropTypes.oneOf([true, false, 'onFilter']),

  /**
   * A React component for customizing the rendering of the DropdownList
   * value
   */
  valueComponent: CustomPropTypes.elementType,
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

const defaultProps = {
  data: [],
  delay: 500,
  defaultSearchTerm: '',
  allowCreate: false,
  selectIcon: caretDown,
  listComponent: Listbox,
}

function useSearchWordBuilder(delay) {
  const timeout = useTimeout()
  const wordRef = useRef('')

  function search(character, cb) {
    var word = (wordRef.current + character).toLowerCase()

    if (!character) return

    wordRef.current = word

    timeout.set(() => {
      wordRef.current = ''
      cb(word)
    }, delay)
  }
  return search
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
const DropdownList = React.forwardRef((uncontrolledProps, outerRef) => {
  const {
    id,
    autoFocus,
    textField,
    valueField,
    open,
    value,
    searchTerm,
    filter,
    minLength,
    allowCreate,
    caseSensitive,
    isRtl,
    className,
    containerClassName,
    placeholder,
    busy,
    disabled,
    readOnly,
    selectIcon,
    busySpinner,
    dropUp,
    tabIndex,
    popupTransition,
    name,
    autoComplete,
    onSelect,
    onCreate,
    onChange,
    onToggle,
    onKeyPress,
    onKeyDown,
    onSearch,
    onClick,
    inputProps,
    listProps,
    renderListItem,
    renderListGroup,
    optionComponent,
    valueComponent,
    listComponent: List,
    data: rawData,
    messages: userMessages,
    groupBy: _,
    ...elementProps
  } = useUncontrolled(uncontrolledProps, {
    open: 'onToggle',
    value: 'onChange',
    searchTerm: 'onSearch',
  })

  const ref = useRef()
  const filterRef = useRef()
  const listRef = useRef()

  const inputId = useInstanceId(id, '_input')
  const listId = useInstanceId(id, '_listbox')
  const createId = useInstanceId(id, '_create_option')
  const activeId = useInstanceId(id, '_listbox_active_option')

  const accessors = useAccessors(textField, valueField)
  const messages = useMessagesWithDefaults(userMessages)

  useAutoFocus(autoFocus, ref)

  const toggle = useDropodownToggle(open, onToggle)
  const handleScroll = useScrollManager(ref)

  const [focusEvents, focused] = useFocusManager(ref, uncontrolledProps, {
    didHandle(focused) {
      if (focused) {
        if (filter) focus()
        return
      }

      toggle.close()
      clearSearch()
    },
  })

  const data = useFilteredData(
    value,
    rawData,
    open ? filter : false,
    searchTerm,
    minLength,
    caseSensitive,
    accessors.text,
  )

  const list = useList(data, { nextProps: uncontrolledProps })

  // TODO: shouldn't this just be `data[accessors.indexOf(data, value)]`
  const selectedItem = useMemo(
    () => list.nextEnabled(data[accessors.indexOf(data, value)]),
    [data, value, accessors],
  )

  const [focusedItem, setFocusedItem] = useFocusedItem(selectedItem, data, list)
  const [autofilling, setAutofilling] = useState(false)

  const nextSearchChar = useSearchWordBuilder(data)

  useActiveDescendant(ref, activeId, open, [focusedItem])

  const isDisabled = disabled === true
  const isReadOnly = !!readOnly

  const showCreateOption = canShowCreate(allowCreate, {
    searchTerm,
    caseSensitive,
    data,
    accessors,
  })

  const useEditableCallback = createEditableCallback(
    isDisabled || isReadOnly,
    ref,
  )

  const handleCreate = useEditableCallback((searchTerm = '', event) => {
    notify(onCreate, searchTerm)

    clearSearch(event)
    toggle.close()
    focus(ref)
  })

  const handleSelect = useEditableCallback((dataItem, originalEvent) => {
    if (dataItem === undefined || dataItem === CREATE_OPTION) {
      handleCreate(searchTerm)
      return
    }
    notify(onSelect, [dataItem, { originalEvent }])
    change(dataItem, originalEvent)
    toggle.close()
    focus(ref)
  })

  const handleClick = useEditableCallback(e => {
    focus()
    toggle()
    notify(onClick, e)
  })

  const handleKeyDown = useEditableCallback(e => {
    let { key, altKey, ctrlKey, shiftKey } = e

    let createIsFocused = focusedItem === CREATE_OPTION

    notify(onKeyDown, [e])

    let closeWithFocus = () => {
      clearSearch()

      toggle.close()
      if (open) setTimeout(focus)
    }

    if (e.defaultPrevented) return

    if (key === 'End' && open && !shiftKey) {
      e.preventDefault()
      setFocusedItem(list.last())
    } else if (key === 'Home' && open && !shiftKey) {
      e.preventDefault()
      setFocusedItem(list.first())
    } else if (key === 'Escape' && (open || searchTerm)) {
      e.preventDefault()
      closeWithFocus()
    } else if (key === 'Enter' && open && ctrlKey && showCreateOption) {
      e.preventDefault()
      handleCreate(searchTerm, e)
    } else if ((key === 'Enter' || (key === ' ' && !filter)) && open) {
      e.preventDefault()
      handleSelect(focusedItem, e)
    } else if (key === 'ArrowDown') {
      e.preventDefault()

      if (!open) {
        toggle.open()
        return
      }

      let next = list.next(focusedItem)
      let creating =
        createIsFocused || (showCreateOption && focusedItem === next)

      setFocusedItem(creating ? CREATE_OPTION : next)
    } else if (key === 'ArrowUp') {
      e.preventDefault()

      if (altKey) return closeWithFocus()

      setFocusedItem(createIsFocused ? list.last() : list.prev(focusedItem))
    }
  })

  const handleKeyPress = useEditableCallback(e => {
    notify(onKeyPress, [e])
    if (e.defaultPrevented || filter) return

    nextSearchChar(String.fromCharCode(e.which), word => {
      let startItem = open ? focusedItem : selectedItem

      let item = list.next(startItem, word)
      if (item === startItem) {
        item = list.next(null, word)
      }

      if (!item) return

      if (open) setFocusedItem(item)
      else change(item, e)
    })
  })

  const handleInputChange = e => {
    // hitting space to open
    if (!open && !e.target.value.trim()) {
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
      let value = dataValue(item, textField)
      if (
        String(value).toLowerCase() === filledValue ||
        dataText(item).toLowerCase() === filledValue
      ) {
        change(item, e)
        break
      }
    }
  }

  // The EventCallback is required b/c Popup blocks updates
  let handleHoverOption = useEventCallback(item => {
    if (!open) return
    setFocusedItem(item)
  })

  function change(nextValue, originalEvent) {
    if (!accessors.matches(nextValue, value)) {
      notify(onChange, [
        nextValue,
        {
          searchTerm,
          originalEvent,
          lastValue: value,
        },
      ])

      clearSearch(originalEvent)
      toggle.close()
    }
  }

  function focus() {
    if (filter) filterRef.current.focus()
    else ref.current.focus()
  }

  function clearSearch(originalEvent) {
    search('', originalEvent, 'clear')
  }

  function search(nextSearchTerm, originalEvent, action = 'input') {
    if (searchTerm !== nextSearchTerm)
      notify(onSearch, [
        nextSearchTerm,
        {
          action,
          originalEvent,
          lastSearchTerm: searchTerm,
        },
      ])
  }

  /**
   * Render
   */

  useImperativeHandle(outerRef, () => ({
    focus,
  }))

  let valueItem = accessors.findOrSelf(data, value)

  let shouldRenderPopup = useFirstFocusedRender(focused, open)

  const widgetProps = Object.assign(elementProps, {
    name: undefined,
    role: 'combobox',
    id: inputId,
    tabIndex: open && filter ? -1 : tabIndex || 0,
    'aria-owns': listId,
    'aria-activedescendant': open ? activeId : null,
    'aria-expanded': !!open,
    'aria-haspopup': true,
    'aria-busy': !!busy,
    'aria-live': !open && 'polite',
    'aria-autocomplete': 'list',
    'aria-disabled': isDisabled,
    'aria-readonly': isReadOnly,
  })

  return (
    <Widget
      {...widgetProps}
      open={open}
      isRtl={isRtl}
      dropUp={dropUp}
      focused={focused}
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
          textField={textField}
          name={name}
          allowSearch={!!filter}
          searchTerm={searchTerm}
          onSearch={onSearch}
          ref={filterRef}
          autoComplete={autoComplete}
          onSearch={handleInputChange}
          onAutofill={setAutofilling}
          onAutofillChange={handleAutofillChange}
          placeholder={placeholder}
          valueComponent={valueComponent}
        />
        <Select
          busy={busy}
          icon={selectIcon}
          spinner={busySpinner}
          role="presentational"
          aria-hidden="true"
          disabled={isDisabled || isReadOnly}
          label={messages.openDropdown(uncontrolledProps)}
        />
      </WidgetPicker>
      {shouldRenderPopup && (
        <Popup
          open={open}
          dropUp={dropUp}
          transition={popupTransition}
          onEntered={focus}
          onEntering={() => listRef.current.move()}
        >
          <List
            {...listProps}
            id={listId}
            activeId={activeId}
            data={data}
            dataState={list.dataState}
            isDisabled={list.isDisabled}
            searchTerm={searchTerm}
            textAccessor={accessors.text}
            valueAccessor={accessors.value}
            renderListItem={renderListItem}
            renderListGroup={renderListGroup}
            optionComponent={optionComponent}
            selectedItem={selectedItem}
            focusedItem={open ? focusedItem : null}
            onSelect={handleSelect}
            onMove={handleScroll}
            onHoverOption={handleHoverOption}
            aria-live={open && 'polite'}
            aria-labelledby={inputId}
            aria-hidden={!open}
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
              searchTerm={searchTerm}
              onSelect={handleCreate}
              focused={!focusedItem || focusedItem === CREATE_OPTION}
            >
              {messages.createOption(value, searchTerm)}
            </AddToListOption>
          )}
        </Popup>
      )}
    </Widget>
  )
})

DropdownList.displayName = 'DropdownList'
DropdownList.propTypes = propTypes
DropdownList.defaultProps = defaultProps

export default DropdownList
