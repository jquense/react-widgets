// @flow

import cn from 'classnames'
import closest from 'dom-helpers/query/closest'
import PropTypes from 'prop-types'
import React, { useMemo, useRef, useState, useEffect } from 'react'
import useUncontrollable from 'uncontrollable/hook'

import Widget from './Widget'
import WidgetPicker from './WidgetPicker'
import Select from './Select'
import Popup from './Popup'
import MultiselectInput from './MultiselectInput'
import TagList from './MultiselectTagList'
import List from './List'
import AddToListOption from './AddToListOption'

import * as Filter from './util/Filter'

import { useMessagesWithDefaults } from './messages'
import { setActiveDescendant } from './util/A11y'

import * as CustomPropTypes from './util/PropTypes'
import { defaultGetDataState } from './util/reduceToListState'
import { useEditableCallback as createCallbackHook } from './util/interaction'
import { useAccessors } from './util/getAccessors'
import useScrollManager from './util/useScrollManager'
import useFocusManager from './util/useFocusManager'
import {
  useInstanceId,
  notify,
  useFirstFocusedRender,
} from './util/widgetHelpers'
import { caretDown, times } from './Icon'
import canShowCreate from './util/canShowCreate'

import {
  CREATE_OPTION,
  useList,
  useFilteredData,
  useFocusedItem,
} from './util/hooks'

const ENTER = 13

const INSERT = 'insert'
const REMOVE = 'remove'

let propTypes = {
  ...Filter.propTypes,

  data: PropTypes.array,
  //-- controlled props --
  value: PropTypes.array,

  /**
   * @type {function (
   *  dataItems: ?any[],
   *  metadata: {
   *    dataItem: any,
   *    action: 'insert' | 'remove',
   *    originalEvent: SyntheticEvent,
   *    lastValue: ?any[],
   *    searchTerm: ?string
   *  }
   * ): void}
   */
  onChange: PropTypes.func,

  searchTerm: PropTypes.string,
  /**
   * @type {function (
   *  searchTerm: ?string,
   *  metadata: {
   *    action: 'clear' | 'input',
   *    lastSearchTerm: ?string,
   *    originalEvent: SyntheticEvent,
   *  }
   * ): void}
   */
  onSearch: PropTypes.func,

  open: PropTypes.bool,
  onToggle: PropTypes.func,
  //-------------------------------------------

  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,

  tagComponent: CustomPropTypes.elementType,
  /**
   * Control the rendering of the outer tag component, including the delete button. To control just hte tag label, `use tagComponent` instead
   */
  tagOptionComponent: CustomPropTypes.elementType,
  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,

  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,

  allowCreate: PropTypes.oneOf([true, false, 'onFilter']),

  /**
   *
   * @type { (dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void }
   */
  onSelect: PropTypes.func,

  /**
   * @type { (searchTerm: string) => void }
   */
  onCreate: PropTypes.func,

  busy: PropTypes.bool,

  /** Specify the element used to render the select (down arrow) icon. */
  selectIcon: PropTypes.node,

  /** Specify the element used to render tag clear icons. */
  clearTagIcon: PropTypes.node,

  /** Specify the element used to render the busy indicator */
  busySpinner: PropTypes.node,

  dropUp: PropTypes.bool,
  popupTransition: CustomPropTypes.elementType,

  /** Adds a css class to the input container element. */
  containerClassName: PropTypes.string,
  inputProps: PropTypes.object,
  listProps: PropTypes.object,

  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,

  /** Continue to show the input placeholder even if tags are selected */
  showPlaceholderWithValues: PropTypes.bool,

  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,

  isRtl: PropTypes.bool,
  messages: PropTypes.shape({
    open: CustomPropTypes.message,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
    createOption: CustomPropTypes.message,

    tagsLabel: CustomPropTypes.message,
    selectedItems: CustomPropTypes.message,
    noneSelected: CustomPropTypes.message,
    removeLabel: CustomPropTypes.message,
  }),
}

const defaultProps = {
  data: [],
  allowCreate: false,
  filter: 'startsWith',
  defaultValue: [],
  defaultSearchTerm: '',
  clearTagIcon: times,
  selectIcon: caretDown,
  listComponent: List,
  showPlaceholderWithValues: false,
}

const EMPTY_ARRAY = []

function useMultiselectData(
  value = EMPTY_ARRAY,
  data,
  filter,
  searchTerm,
  minLength,
  caseSensitive,
  accessors,
) {
  data = useMemo(
    () => data.filter(i => !value.some(v => accessors.matches(i, v))),
    [data, value, accessors],
  )

  return [
    useFilteredData(
      value,
      data,
      filter,
      searchTerm,
      minLength,
      caseSensitive,
      accessors.text,
    ),
    data.length,
  ]
}

/**
 * ---
 * shortcuts:
 *   - { key: left arrow, label: move focus to previous tag }
 *   - { key: right arrow, label: move focus to next tag }
 *   - { key: delete, deselect focused tag }
 *   - { key: backspace, deselect next tag }
 *   - { key: alt + up arrow, label: close Multiselect }
 *   - { key: down arrow, label: open Multiselect, and move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: ctrl + enter, label: create new tag from current searchTerm }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * A select listbox alternative.
 *
 * @public
 */
function Multiselect(uncontrolledProps) {
  const {
    id,
    autoFocus,
    textField,
    valueField,
    open,
    value: rawValue,
    searchTerm,
    filter,
    maxLength,
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
    clearTagIcon,
    busySpinner,
    dropUp,
    tabIndex,
    popupTransition,
    showPlaceholderWithValues,
    onSelect,
    onCreate,
    onChange,
    onToggle,
    onKeyDown,
    onSearch,
    inputProps,
    listProps,
    itemComponent,
    groupComponent,
    optionComponent,
    tagComponent,
    tagOptionComponent,
    listComponent: List,
    data: rawData,
    messages: userMessages,
    ...elementProps
  } = useUncontrollable(uncontrolledProps, {
    open: 'onToggle',
    value: 'onChange',
    searchTerm: 'onSearch',
  })

  const ref = useRef()
  const inputRef = useRef()
  const tagsRef = useRef()
  const listRef = useRef()

  const inputId = useInstanceId(id, '_input')
  const tagsId = useInstanceId(id, '_taglist')
  const notifyId = useInstanceId(id, '_notify_area')
  const listId = useInstanceId(id, '_listbox')
  const createId = useInstanceId(id, '_createlist_option')
  const activeTagId = useInstanceId(id, '_taglist_active_tag')
  const activeOptionId = useInstanceId(id, '_listbox_active_option')

  const accessors = useAccessors(textField, valueField)
  const messages = useMessagesWithDefaults(userMessages)

  const [focusEvents, focused] = useFocusManager(ref, uncontrolledProps, {
    didHandle(focused) {
      if (focused) return focus()

      closeDropdown()
      clearSearch()

      if (tagsRef.current) setFocusedTag(null)
    },
  })
  // TODO: don't cover this?
  const value = rawValue || EMPTY_ARRAY

  const dataItems = useMemo(
    () => value.map(item => accessors.findOrSelf(rawData, item)),
    [rawData, value, accessors],
  )

  const [data, lengthWithoutValues] = useMultiselectData(
    value,
    rawData,
    open ? filter : false,
    searchTerm,
    minLength,
    caseSensitive,
    accessors,
  )

  const list = useList(data, { nextProps: uncontrolledProps })
  const tagList = useList(dataItems, {
    nextProps: uncontrolledProps,
    getDataState: defaultGetDataState,
  })

  const [focusedItem, setFocusedItem] = useFocusedItem(value, data, list)
  const [focusedTag, setFocusedTag] = useFocusedItem(
    value,
    dataItems,
    list,
    null,
  )

  const showCreateOption = canShowCreate(allowCreate, {
    searchTerm,
    caseSensitive,
    data,
    dataItems,
    accessors,
  })

  const isDisabled = disabled === true
  const isReadOnly = !!readOnly

  /**
   * Update aria when it changes on update
   */
  useEffect(() => {
    let active
    if (!open) active = focusedTag ? activeTagId : ''
    else if (focusedItem || showCreateOption) active = activeOptionId
    setActiveDescendant(inputRef.current, active, open)
  }, [open, focusedItem])

  /**
   * Event Handlers
   */

  const useEditableCallback = createCallbackHook(isDisabled || isReadOnly, ref)

  const handleScroll = useScrollManager(ref)

  const handleDelete = (dataItem, event) => {
    if (isDisabled || readOnly) return

    focus()
    change(dataItem, event, REMOVE)
  }

  const deletingRef = useRef(false)

  const handleSearchKeyDown = e => {
    if (e.key === 'Backspace' && e.target.value && !deletingRef.current)
      deletingRef.current = true
  }

  const handleSearchKeyUp = e => {
    if (e.key === 'Backspace' && deletingRef.current) {
      deletingRef.current = false
    }
  }

  const handleInputChange = e => {
    search(e.target.value, e, 'input')
    openDropdown()
  }

  const handleClick = useEditableCallback(({ target }) => {
    focus()

    if (closest(target, '.rw-select')) open ? closeDropdown() : openDropdown()
    else openDropdown()
  })

  const handleDoubleClick = useEditableCallback(() => {
    if (!inputRef.current) return

    focus()
    inputRef.current?.select()
  })

  const handleSelect = useEditableCallback((dataItem, originalEvent) => {
    if (dataItem === undefined || dataItem === CREATE_OPTION) {
      handleCreate(searchTerm, originalEvent)
      return
    }

    notify(onSelect, [dataItem, { originalEvent }])

    change(dataItem, originalEvent, INSERT)
    focus()
  })

  const handleCreate = useEditableCallback((searchTerm = '', event) => {
    notify(onCreate, searchTerm)

    clearSearch(event)
    focus()
  })

  const handleKeyDown = useEditableCallback(event => {
    let { key, keyCode, altKey, ctrlKey } = event

    let createIsFocused = focusedItem === CREATE_OPTION

    notify(onKeyDown, [event])

    if (event.defaultPrevented) return

    if (key === 'ArrowDown') {
      event.preventDefault()

      if (!open) return openDropdown()

      let next = list.next(focusedItem)
      let creating =
        createIsFocused || (showCreateOption && focusedItem === next)

      setFocusedItem(creating ? CREATE_OPTION : next)
    } else if (key === 'ArrowUp' && (open || altKey)) {
      event.preventDefault()

      if (altKey) return closeDropdown()
      setFocusedItem(createIsFocused ? list.last() : list.prev(focusedItem))
    } else if (key === 'End') {
      event.preventDefault()

      if (open) setFocusedItem(list.last())
      else setFocusedTag(tagList.last())
    } else if (key === 'Home') {
      event.preventDefault()
      if (open) setFocusedItem(list.first())
      else setFocusedTag(tagList.first())
    } else if (open && keyCode === ENTER) {
      // using keyCode to ignore enter for japanese IME
      event.preventDefault()

      if (ctrlKey && showCreateOption) return handleCreate(searchTerm, event)

      handleSelect(focusedItem, event)
    } else if (key === 'Escape') {
      open ? closeDropdown() : tagList && setFocusedTag(null)
    } else if (!searchTerm && !deletingRef.current) {
      if (key === 'ArrowLeft') {
        setFocusedTag(tagList.prev(focusedTag) || tagList.last())
      } else if (key === 'ArrowRight' && focusedTag) {
        let nextTag = tagList.next(focusedTag)
        setFocusedTag(nextTag === focusedTag ? null : nextTag)
        //
      } else if (key === 'Delete' && !tagList.isDisabled(focusedTag)) {
        handleDelete(focusedTag, event)
        //
      } else if (key === 'Backspace') {
        handleDelete(tagList.last(), event)
        //
      } else if (key === ' ' && !open) {
        event.preventDefault()
        openDropdown()
      }
    }
  })

  /**
   * Methods
   */

  function change(dataItem, originalEvent, action) {
    let nextDataItems = dataItems

    switch (action) {
      case INSERT:
        nextDataItems = nextDataItems.concat(dataItem)
        break
      case REMOVE:
        nextDataItems = nextDataItems.filter(d => d !== dataItem)
        break
    }

    notify(onChange, [
      nextDataItems,
      {
        action,
        dataItem,
        originalEvent,
        searchTerm,
        lastValue: rawValue,
      },
    ])

    clearSearch(originalEvent)
  }

  function clearSearch(originalEvent) {
    search('', originalEvent, 'clear')
  }

  function search(
    nextSearchTerm,
    originalEvent,
    action: 'clear' | 'input' = 'input',
  ) {
    if (nextSearchTerm !== searchTerm)
      notify(onSearch, [
        nextSearchTerm,
        {
          action,
          originalEvent,
          lastSearchTerm: searchTerm,
        },
      ])
  }

  function focus() {
    inputRef.current?.focus()
  }

  function openDropdown() {
    if (!open) notify(onToggle, true)
  }

  function closeDropdown() {
    if (open) notify(onToggle, false)
  }

  /**
   * Render
   */

  let shouldRenderPopup = useFirstFocusedRender(focused, open)

  let itemLabels = dataItems.map(item => accessors.text(item))
  let shouldRenderTags = !!dataItems.length
  let inputOwns =
    `${listId} ${notifyId} ` +
    (shouldRenderTags ? tagsId : '') +
    (showCreateOption ? createId : '')

  return (
    <Widget
      {...elementProps}
      open={open}
      isRtl={isRtl}
      dropUp={dropUp}
      focused={focused}
      disabled={isDisabled}
      readOnly={isReadOnly}
      onKeyDown={handleKeyDown}
      {...focusEvents}
      className={cn(className, 'rw-multiselect')}
    >
      <span
        id={notifyId}
        role="status"
        className="rw-sr"
        aria-live="assertive"
        aria-atomic="true"
        aria-relevant="additions removals text"
      >
        {focused &&
          (dataItems.length
            ? messages.selectedItems(itemLabels)
            : messages.noneSelected())}
      </span>

      <WidgetPicker
        onClick={handleClick}
        onTouchEnd={handleClick}
        onDoubleClick={handleDoubleClick}
        className={cn(containerClassName, 'rw-widget-input')}
      >
        <TagList
          id={tagsId}
          activeId={activeTagId}
          textAccessor={accessors.text}
          valueAccessor={accessors.value}
          clearTagIcon={clearTagIcon}
          label={messages.tagsLabel()}
          value={dataItems}
          readOnly={readOnly}
          disabled={disabled}
          focusedItem={focusedTag}
          onDelete={handleDelete}
          tagOptionComponent={tagOptionComponent}
          tagComponent={tagComponent}
          ref={tagsRef}
        >
          <MultiselectInput
            {...inputProps}
            aria-haspopup
            role="listbox"
            autoFocus={autoFocus}
            tabIndex={tabIndex || 0}
            aria-expanded={!!open}
            aria-busy={!!busy}
            aria-owns={inputOwns}
            value={searchTerm}
            maxLength={maxLength}
            disabled={isDisabled}
            readOnly={isReadOnly}
            placeholder={
              (value.length && !showPlaceholderWithValues ? '' : placeholder) ||
              ''
            }
            onKeyDown={handleSearchKeyDown}
            onKeyUp={handleSearchKeyUp}
            onChange={handleInputChange}
            ref={inputRef}
          />
        </TagList>
        <Select
          busy={busy}
          aria-hidden="true"
          role="presentational"
          spinner={busySpinner}
          icon={focused ? selectIcon : null}
          disabled={isDisabled || isReadOnly}
        />
      </WidgetPicker>

      {shouldRenderPopup && (
        <Popup
          dropUp={dropUp}
          open={open}
          transition={popupTransition}
          onEntering={() => listRef.current.forceUpdate()}
        >
          <div>
            <List
              {...listProps}
              id={listId}
              data={data}
              activeId={activeOptionId}
              dataState={list.dataState}
              isDisabled={list.isDisabled}
              searchTerm={searchTerm}
              textAccessor={accessors.text}
              valueAccessor={accessors.value}
              itemComponent={itemComponent}
              groupComponent={groupComponent}
              optionComponent={optionComponent}
              focusedItem={focusedItem}
              onSelect={handleSelect}
              onMove={handleScroll}
              aria-live="polite"
              aria-labelledby={inputId}
              aria-hidden={!open}
              ref={listRef}
              messages={{
                emptyList: lengthWithoutValues
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
          </div>
        </Popup>
      )}
    </Widget>
  )
}

Multiselect.propTypes = propTypes
Multiselect.defaultProps = defaultProps

export default Multiselect
