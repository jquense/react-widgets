import cn from 'classnames'
import closest from 'dom-helpers/closest'
import PropTypes from 'prop-types'
import React, {
  useImperativeHandle,
  useMemo,
  useRef,
  SyntheticEvent,
  useEffect,
} from 'react'
import { useUncontrolledProp } from 'uncontrollable'
import AddToListOption, { CREATE_OPTION } from './AddToListOption'
import { times } from './Icon'
import List, { ListHandle } from './List'
import { FocusListContext, useFocusList } from './FocusListContext'
import MultiselectInput from './MultiselectInput'
import MultiselectTagList, {
  MultiselectTagListProps,
  RenderTagProp,
  TagComponentProp,
} from './MultiselectTagList'
import BasePopup from './Popup'
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
import { DataItem, Value, WidgetHandle } from './types'
import { setActiveDescendant } from './A11y'
import { useFilteredData, Filter } from './Filter'
import * as CustomPropTypes from './PropTypes'
import canShowCreate from './canShowCreate'
import { Accessors, useAccessors } from './Accessors'
import useDropdownToggle from './useDropdownToggle'
import useFocusManager from './useFocusManager'
import { notify, useFirstFocusedRender, useInstanceId } from './WidgetHelpers'
import DropdownCaret from './PickerCaret'

const ENTER = 13

const INSERT = 'insert'
const REMOVE = 'remove'

let propTypes = {
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
  handleOpen: PropTypes.func,
  //-------------------------------------------

  dataKey: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,

  renderTagValue: PropTypes.func,

  renderListItem: PropTypes.func,

  renderListGroup: PropTypes.func,
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
  popupTransition: PropTypes.elementType,

  /** Adds a css class to the input container element. */
  containerClassName: PropTypes.string,
  inputProps: PropTypes.object,
  listProps: PropTypes.object,

  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,

  /** Continue to show the input placeholder even if tags are selected */
  showPlaceholderWithValues: PropTypes.bool,

  /** Continue to show the selected items in the dropdown list */
  showSelectedItemsInList: PropTypes.bool,

  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,

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

const EMPTY_ARRAY = [] as unknown[]

function useMultiselectData<TDataItem>(
  value = EMPTY_ARRAY,
  data: readonly TDataItem[],
  accessors: Accessors,
  filter?: Filter<TDataItem>,
  searchTerm?: string,
  showSelectedItemsInList?: boolean,
) {
  data = useMemo(
    () =>
      showSelectedItemsInList
        ? data
        : data.filter((i) => !value.some((v) => accessors.matches(i, v))),
    [data, showSelectedItemsInList, value, accessors],
  )

  return [
    useFilteredData(data, filter || false, searchTerm, accessors.text),
    data.length,
  ] as const
}

export type MultiselectHandle = WidgetHandle

export type ChangeHandler<TDataItem> = (
  dataItem: TDataItem[],
  metadata: {
    action: 'insert' | 'remove'
    dataItem: TDataItem
    searchTerm?: string
    lastValue: Value
    originalEvent?: React.SyntheticEvent
  },
) => void

export interface MultiselectProps<TDataItem = DataItem>
  extends WidgetHTMLProps,
    WidgetProps,
    PopupWidgetProps,
    Filterable<TDataItem>,
    Searchable,
    Omit<BaseListboxInputProps<TDataItem, unknown[]>, 'onChange'> {
  onChange?: ChangeHandler<TDataItem>
  onCreate?: (searchTerm: string) => void
  showPlaceholderWithValues?: boolean
  renderTagValue?: RenderTagProp<TDataItem>
  clearTagIcon?: React.ReactNode
  tagOptionComponent?: TagComponentProp
  tagListComponent?: React.ComponentType<MultiselectTagListProps<DataItem>>

  showSelectedItemsInList?: boolean
}

declare interface Multiselect {
  <TDataItem = DataItem>(
    props: MultiselectProps<TDataItem> & React.RefAttributes<MultiselectHandle>,
  ): React.ReactElement | null

  displayName?: string
  propTypes?: any
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
const Multiselect: Multiselect = React.forwardRef(function Multiselect<
  TDataItem
>(
  {
    dataKey,
    textField,
    autoFocus,
    id,

    value,
    defaultValue = [],
    onChange,

    open,
    defaultOpen = false,
    onToggle,

    focusFirstItem = false,

    searchTerm,
    defaultSearchTerm = '',
    onSearch,

    filter = 'startsWith',
    allowCreate = false,
    className,
    containerClassName,
    placeholder,
    busy,
    disabled,
    readOnly,
    selectIcon,
    clearTagIcon = times,
    busySpinner,
    dropUp,
    tabIndex,
    popupTransition,
    showPlaceholderWithValues = false,
    showSelectedItemsInList = false,
    onSelect,
    onCreate,
    onKeyDown,
    onBlur,
    onFocus,
    inputProps,
    listProps,
    renderListItem,
    renderListGroup,
    renderTagValue,
    optionComponent,
    tagOptionComponent,
    groupBy,
    listComponent: ListComponent = List,
    popupComponent: Popup = BasePopup,
    tagListComponent: TagList = MultiselectTagList,
    data: rawData = [],
    messages: userMessages,
    ...elementProps
  }: MultiselectProps<TDataItem>,
  outerRef: React.RefObject<MultiselectHandle>,
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
  const [currentSearch, handleSearch] = useUncontrolledProp(
    searchTerm,
    defaultSearchTerm,
    onSearch,
  )

  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<ListHandle>(null)

  const inputId = useInstanceId(id, '_input')
  const tagsId = useInstanceId(id, '_taglist')
  const listId = useInstanceId(id, '_listbox')
  const createId = useInstanceId(id, '_createlist_option')
  const activeTagId = useInstanceId(id, '_taglist_active_tag')
  const activeOptionId = useInstanceId(id, '_listbox_active_option')

  const accessors = useAccessors(textField, dataKey)
  const messages = useMessagesWithDefaults(userMessages)
  const toggle = useDropdownToggle(currentOpen, handleOpen)

  const isDisabled = disabled === true
  const isReadOnly = !!readOnly

  const [focusEvents, focused] = useFocusManager(
    ref,
    { disabled: isDisabled, onBlur, onFocus },
    {
      didHandle(focused, event) {
        if (focused) return focus()

        toggle.close()
        clearSearch(event)

        tagList.focus(null)
      },
    },
  )

  const dataItems = useMemo(
    () => currentValue!.map((item) => accessors.findOrSelf(rawData, item)),
    [rawData, currentValue, accessors],
  )

  const [data, lengthWithoutValues] = useMultiselectData(
    dataItems,
    rawData,
    accessors,
    currentOpen ? filter : false,
    currentSearch,
    showSelectedItemsInList,
  )

  const list = useFocusList<TDataItem>({
    scope: ref,
    scopeSelector: '.rw-popup',
    focusFirstItem,
    activeId: activeOptionId,
    anchorItem: currentOpen ? dataItems[dataItems.length - 1] : undefined,
  })
  const tagList = useFocusList<TDataItem>({
    scope: ref,
    scopeSelector: '.rw-multiselect-taglist',
    activeId: activeTagId,
  })

  const showCreateOption = canShowCreate(allowCreate, {
    searchTerm: currentSearch,
    data,
    dataItems,
    accessors,
  })

  /**
   * Update aria when it changes on update
   */
  const focusedTag = tagList.getFocused()
  useEffect(() => {
    if (currentOpen) return
    setActiveDescendant(inputRef.current, focusedTag ? activeTagId : '')
  }, [activeTagId, currentOpen, focusedTag])

  const focusedItem = list.getFocused()
  useEffect(() => {
    if (!currentOpen) return
    // if (focusedItem) tagList.focus(null)
    setActiveDescendant(inputRef.current, focusedItem ? activeOptionId : '')
  }, [activeOptionId, currentOpen, focusedItem])

  /**
   * Event Handlers
   */

  const handleDelete = (dataItem: TDataItem, event: React.SyntheticEvent) => {
    if (isDisabled || readOnly || tagList.size() === 0) return
    focus()
    change(dataItem, event, REMOVE)
  }

  const deletingRef = useRef(false)

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && e.currentTarget.value && !deletingRef.current)
      deletingRef.current = true
  }

  const handleSearchKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && deletingRef.current) {
      deletingRef.current = false
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search(e.target.value, e, 'input')
    toggle.open()
  }

  const handleClick = (e: React.SyntheticEvent<HTMLDivElement>) => {
    if (isDisabled || readOnly) return

    // prevents double clicks when in a <label>
    e.preventDefault()
    focus()

    if (closest(e.target as HTMLDivElement, '.rw-select') && currentOpen) {
      toggle.close()
    } else toggle.open()
  }

  const handleDoubleClick = () => {
    if (isDisabled || !inputRef.current) return

    focus()
    if (inputRef.current) inputRef.current.select()
  }

  const handleSelect = (
    dataItem: TDataItem | undefined,
    originalEvent: React.SyntheticEvent,
  ) => {
    if (dataItem === undefined) return

    originalEvent.preventDefault()

    if (dataItem === CREATE_OPTION) {
      handleCreate(originalEvent)
      return
    }

    notify(onSelect, [dataItem, { originalEvent }])

    if (!showSelectedItemsInList || !dataItems.includes(dataItem)) {
      change(dataItem, originalEvent, INSERT)
    } else {
      change(dataItem, originalEvent, REMOVE)
    }
    focus()
  }

  const handleCreate = (event: SyntheticEvent) => {
    notify(onCreate, [currentSearch!])

    clearSearch(event)
    focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (readOnly) {
      event.preventDefault()
      return
    }

    let { key, keyCode, altKey, ctrlKey } = event

    notify(onKeyDown, [event])

    if (event.defaultPrevented) return

    if (key === 'ArrowDown') {
      event.preventDefault()

      if (!currentOpen) {
        toggle.open()
        return
      }
      list.focus(list.next())
      tagList.focus(null)
    } else if (key === 'ArrowUp' && (currentOpen || altKey)) {
      event.preventDefault()

      if (altKey) {
        toggle.close()
        return
      }

      list.focus(list.prev())
      tagList.focus(null)
    } else if (key === 'End') {
      event.preventDefault()

      if (currentOpen) {
        list.focus(list.last())
        tagList.focus(null)
      } else {
        tagList.focus(tagList.last())
        list.focus(null)
      }
    } else if (key === 'Home') {
      event.preventDefault()
      if (currentOpen) list.focus(list.first())
      else list.focus(tagList.first())
    } else if (currentOpen && keyCode === ENTER) {
      // using keyCode to ignore enter for japanese IME
      event.preventDefault()

      if (ctrlKey && showCreateOption) {
        return handleCreate(event)
      }

      handleSelect(list.getFocused(), event)
    } else if (key === 'Escape') {
      if (currentOpen) toggle.close()
      else tagList.focus(null)
      //
    } else if (!currentSearch && !deletingRef.current) {
      //
      if (key === 'ArrowLeft') {
        tagList.focus(tagList.prev({ behavior: 'loop' }))
      } else if (key === 'ArrowRight') {
        tagList.focus(tagList.next({ behavior: 'loop' }))
        //
      } else if (key === 'Delete' && tagList.getFocused()) {
        handleDelete(tagList.getFocused()!, event)
        //
      } else if (key === 'Backspace') {
        handleDelete(tagList.toDataItem(tagList.last()!)!, event)
      } else if (key === ' ' && !currentOpen) {
        event.preventDefault()
        toggle.open()
      }
    }
  }

  /**
   * Methods
   */

  function change(
    dataItem: TDataItem,
    originalEvent: React.SyntheticEvent,
    action: 'insert' | 'remove',
  ) {
    let nextDataItems = dataItems

    switch (action) {
      case INSERT:
        nextDataItems = nextDataItems.concat(dataItem)
        break
      case REMOVE:
        nextDataItems = nextDataItems.filter((d) => d !== dataItem)
        break
    }

    handleChange(nextDataItems, {
      action,
      dataItem,
      originalEvent,
      searchTerm: currentSearch,
      lastValue: currentValue,
    })

    clearSearch(originalEvent)
  }

  function clearSearch(originalEvent: React.SyntheticEvent) {
    search('', originalEvent, 'clear')
  }

  function search(
    nextSearchTerm: string,
    originalEvent: React.SyntheticEvent,
    action: 'input' | 'clear' = 'input',
  ) {
    if (nextSearchTerm !== currentSearch)
      handleSearch(nextSearchTerm, {
        action,
        originalEvent,
        lastSearchTerm: currentSearch,
      })
  }

  function focus() {
    if (inputRef.current) inputRef.current.focus()
  }

  /**
   * Render
   */

  useImperativeHandle(outerRef, () => ({
    focus,
  }))

  let shouldRenderPopup = useFirstFocusedRender(focused, currentOpen!)

  let shouldRenderTags = !!dataItems.length
  let inputOwns =
    `${listId} ` +
    (shouldRenderTags ? tagsId : '') +
    (showCreateOption ? createId : '')

  return (
    <Widget
      {...elementProps}
      ref={ref}
      open={currentOpen}
      dropUp={dropUp}
      focused={focused}
      disabled={isDisabled}
      readOnly={isReadOnly}
      onKeyDown={handleKeyDown}
      {...focusEvents}
      className={cn(className, 'rw-multiselect')}
    >
      <WidgetPicker
        onClick={handleClick}
        onTouchEnd={handleClick}
        onDoubleClick={handleDoubleClick}
        className={cn(containerClassName, 'rw-widget-input')}
      >
        <FocusListContext.Provider value={tagList.context}>
          <TagList
            id={tagsId}
            textAccessor={accessors.text}
            clearTagIcon={clearTagIcon}
            label={messages.tagsLabel()}
            value={dataItems}
            readOnly={isReadOnly}
            disabled={disabled}
            onDelete={handleDelete}
            tagOptionComponent={tagOptionComponent}
            renderTagValue={renderTagValue}
          >
            <MultiselectInput
              {...inputProps}
              role="combobox"
              autoFocus={autoFocus}
              tabIndex={tabIndex || 0}
              aria-expanded={!!currentOpen}
              aria-busy={!!busy}
              aria-owns={inputOwns}
              aria-controls={listId}
              aria-haspopup="listbox"
              aria-autocomplete="list"
              value={currentSearch}
              disabled={isDisabled}
              readOnly={isReadOnly}
              placeholder={
                (currentValue!.length && !showPlaceholderWithValues
                  ? ''
                  : placeholder) || ''
              }
              onKeyDown={handleSearchKeyDown}
              onKeyUp={handleSearchKeyUp}
              onChange={handleInputChange}
              ref={inputRef}
            />
          </TagList>
        </FocusListContext.Provider>
        <DropdownCaret
          busy={busy}
          spinner={busySpinner}
          icon={selectIcon}
          visible={focused}
        />
      </WidgetPicker>
      <FocusListContext.Provider value={list.context}>
        {shouldRenderPopup && (
          <Popup
            dropUp={dropUp}
            open={currentOpen}
            transition={popupTransition}
            onEntering={() => listRef.current!.scrollIntoView()}
          >
            <ListComponent
              {...listProps}
              id={listId}
              data={data}
              tabIndex={-1}
              disabled={disabled}
              searchTerm={currentSearch}
              accessors={accessors}
              renderItem={renderListItem}
              renderGroup={renderListGroup}
              value={dataItems}
              groupBy={groupBy}
              optionComponent={optionComponent}
              onChange={(d, meta) =>
                handleSelect(d as TDataItem, meta.originalEvent!)
              }
              aria-live="polite"
              aria-labelledby={inputId}
              aria-hidden={!currentOpen}
              ref={listRef}
              messages={{
                emptyList: lengthWithoutValues
                  ? messages.emptyFilter
                  : messages.emptyList,
              }}
            />

            {showCreateOption && (
              <AddToListOption onSelect={handleCreate}>
                {messages.createOption(currentValue, currentSearch!)}
              </AddToListOption>
            )}
          </Popup>
        )}
      </FocusListContext.Provider>
    </Widget>
  )
})

Multiselect.displayName = 'Multiselect'
Multiselect.propTypes = propTypes

export default Multiselect
