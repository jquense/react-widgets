//@ts-nocheck

import cn from 'classnames'
import closest from 'dom-helpers/closest'
import PropTypes from 'prop-types'
import React, {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useUncontrolledProp } from 'uncontrollable'
import AddToListOption, { CREATE_OPTION } from './AddToListOption'
import { caretDown, times } from './Icon'
import Listbox, { ListboxHandle } from './Listbox'
import { OptionsContext, useOptionList } from './ListboxContext'
import MultiselectInput from './MultiselectInput'
import TagList, { RenderTagProp, TagComponentProp } from './MultiselectTagList'
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
import { DataItem, Value, WidgetHandle } from './types'
import { setActiveDescendant } from './util/A11y'
import * as Filter from './util/Filter'
import * as CustomPropTypes from './util/PropTypes'
import { toItemArray } from './util/_'
import canShowCreate from './util/canShowCreate'
import { Accessors, useAccessors } from './util/getAccessors'
import { useDropodownToggle, useFilteredData } from './util/hooks'
import useFocusManager from './util/useFocusManager'
import {
  notify,
  useFirstFocusedRender,
  useInstanceId,
} from './util/widgetHelpers'

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
  handleOpen: PropTypes.func,
  //-------------------------------------------

  dataKey: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,

  renderTagValue: PropTypes.func,
  /**
   * Control the rendering of the outer tag component, including the delete button. To control just hte tag label, `use tagComponent` instead
   */
  renderTag: CustomPropTypes.elementType,
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

const EMPTY_ARRAY = [] as unknown[]

function useMultiselectData<TDataItem>(
  value = EMPTY_ARRAY,
  data: TDataItem[],
  filter?: Filter,
  searchTerm?: string,
  accessors: Accessors,
) {
  data = useMemo(
    () => data.filter(i => !value.some(v => accessors.matches(i, v))),
    [data, value, accessors],
  )

  return [
    useFilteredData(data, filter, searchTerm, accessors.text),
    data.length,
  ] as const
}

type MultiselectHandle = WidgetHandle

type ChangeHandler<TDataItem> = (
  dataItem: TDataItem[],
  metadata: {
    action: 'insert' | 'remove'
    dataItem: TDataItem
    searchTerm?: string
    lastValue: Value
    originalEvent?: React.SyntheticEvent
  },
) => void

interface MultiselectProps<TDataItem = DataItem>
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

    searchTerm,
    defaultSearchTerm = '',
    onSearch,

    filter = 'startsWith',
    allowCreate = false,
    isRtl,
    className,
    containerClassName,
    placeholder,
    busy,
    disabled,
    readOnly,
    selectIcon = caretDown,
    clearTagIcon = times,
    busySpinner,
    dropUp,
    tabIndex,
    popupTransition,
    showPlaceholderWithValues = false,
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
    listComponent: List = Listbox,
    data: rawData = [],
    messages: userMessages,
    groupBy: _,
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
  const listRef = useRef<ListboxHandle>(null)

  const inputId = useInstanceId(id, '_input')
  const tagsId = useInstanceId(id, '_taglist')
  const notifyId = useInstanceId(id, '_notify_area')
  const listId = useInstanceId(id, '_listbox')
  const createId = useInstanceId(id, '_createlist_option')
  const activeTagId = useInstanceId(id, '_taglist_active_tag')
  const activeOptionId = useInstanceId(id, '_listbox_active_option')

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
      didHandle(focused, event) {
        if (focused) return focus()

        toggle.close()
        clearSearch(event)

        setFocusedTag(null)
      },
    },
  )

  const dataItems = useMemo(
    () => currentValue!.map(item => accessors.findOrSelf(rawData, item)),
    [rawData, currentValue, accessors],
  )

  const [data, lengthWithoutValues] = useMultiselectData(
    currentValue,
    rawData,
    currentOpen ? filter : false,
    currentSearch,
    accessors,
  )

  const [listContext, list] = useOptionList(accessors.text, [])
  const [tagListContext, tagList] = useOptionList(accessors.text, disabledItems)

  const [focusedItem, setFocusedItem] = useState()
  const [focusedTag, setFocusedTag] = useState()

  if (focusedTag && dataItems.indexOf(focusedTag) === -1) {
    setFocusedTag(null)
  }

  const showCreateOption = canShowCreate(allowCreate, {
    searchTerm: currentSearch,
    data,
    dataItems,
    accessors,
  })

  /**
   * Update aria when it changes on update
   */
  useEffect(() => {
    let active
    if (!currentOpen) active = focusedTag ? activeTagId : ''
    else if (focusedItem || showCreateOption) active = activeOptionId
    setActiveDescendant(inputRef.current, active, currentOpen)
  }, [currentOpen, focusedItem])

  /**
   * Event Handlers
   */

  const handleDelete = (dataItem: TDataItem, event: React.SyntheticEvent) => {
    if (isDisabled || readOnly) return
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

  const handleInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    search(e.target.value, e, 'input')
    toggle.open()
  }

  const handleClick = ({ target }) => {
    focus()

    if (closest(target, '.rw-select') && currentOpen) {
      toggle.close()
    } else toggle.open()
  }

  const handleDoubleClick = () => {
    if (!inputRef.current) return

    focus()
    if (inputRef.current) inputRef.current.select()
  }

  const handleSelect = (dataItem, originalEvent: React.SyntheticEvent) => {
    if (dataItem === undefined || dataItem === CREATE_OPTION) {
      handleCreate(currentSearch, originalEvent)
      return
    }

    notify(onSelect, [dataItem, { originalEvent }])

    change(dataItem, originalEvent, INSERT)
    focus()
  }

  const handleCreate = (_, event) => {
    notify(onCreate, [currentSearch!])

    clearSearch(event)
    focus()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    let { key, keyCode, altKey, ctrlKey } = event

    notify(onKeyDown, [event])

    const setFocused = (listItem?: TDataItem, tag?: TDataItem) => {
      if (listItem || tag) setFocusedItem(listItem || null)
      if (listItem || tag) setFocusedTag(tag || null)
    }

    if (event.defaultPrevented) return

    if (key === 'ArrowDown') {
      event.preventDefault()

      if (!currentOpen) {
        toggle.open()
        return
      }

      setFocused(list.next(focusedItem))
    } else if (key === 'ArrowUp' && (currentOpen || altKey)) {
      event.preventDefault()

      if (altKey) {
        toggle.close()
        return
      }

      setFocused(list.prev(focusedItem))
    } else if (key === 'End') {
      event.preventDefault()

      if (currentOpen) setFocused(list.last())
      else setFocused(tagList.last())
    } else if (key === 'Home') {
      event.preventDefault()
      if (currentOpen) setFocused(list.first())
      else setFocused(tagList.first())
    } else if (currentOpen && keyCode === ENTER) {
      // using keyCode to ignore enter for japanese IME
      event.preventDefault()

      if (ctrlKey && showCreateOption) {
        return handleCreate(currentSearch, event)
      }

      handleSelect(focusedItem, event)
    } else if (key === 'Escape') {
      if (currentOpen) toggle.close()
      else setFocusedTag(null)
      //
    } else if (!currentSearch && !deletingRef.current) {
      //
      if (key === 'ArrowLeft') {
        setFocusedTag(tagList.prev(focusedTag) || tagList.last())
      } else if (key === 'ArrowRight' && focusedTag) {
        let nextTag = tagList.next(focusedTag)
        setFocusedTag(nextTag === focusedTag ? null : nextTag)
        //
      } else if (
        key === 'Delete' &&
        disabledItems.indexOf(focusedItem) === -1
      ) {
        handleDelete(focusedTag, event)
        //
      } else if (key === 'Backspace') {
        handleDelete(tagList.last(), event)
        //
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
        nextDataItems = nextDataItems.filter(d => d !== dataItem)
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

  let itemLabels = dataItems.map(item => accessors.text(item))
  let shouldRenderTags = !!dataItems.length
  let inputOwns =
    `${listId} ${notifyId} ` +
    (shouldRenderTags ? tagsId : '') +
    (showCreateOption ? createId : '')

  return (
    <Widget
      {...elementProps}
      open={currentOpen}
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
        aria-relevant="all"
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
        <OptionsContext.Provider value={tagListContext}>
          <TagList<TDataItem>
            id={tagsId}
            activeId={activeTagId}
            textAccessor={accessors.text}
            dataKeyAccessor={accessors.value}
            clearTagIcon={clearTagIcon}
            label={messages.tagsLabel()}
            value={dataItems}
            disabled={disabledItems}
            focusedItem={focusedTag}
            onDelete={handleDelete}
            tagOptionComponent={tagOptionComponent}
            renderTagValue={renderTagValue}
          >
            <MultiselectInput
              {...inputProps}
              aria-haspopup
              role="listbox"
              autoFocus={autoFocus}
              tabIndex={tabIndex || 0}
              aria-expanded={!!currentOpen}
              aria-busy={!!busy}
              aria-owns={inputOwns}
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
        </OptionsContext.Provider>
        <Select
          busy={busy}
          aria-hidden="true"
          role="presentational"
          spinner={busySpinner}
          icon={focused ? selectIcon : null}
          disabled={isDisabled || isReadOnly}
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
              data={data}
              tabIndex={-1}
              bordered={false}
              disabled={disabled}
              activeId={activeOptionId}
              searchTerm={currentSearch}
              textField={textField}
              dataKey={dataKey}
              renderItem={renderListItem}
              renderGroup={renderListGroup}
              optionComponent={optionComponent}
              focusedItem={focusedItem}
              onChange={(d, meta) => handleSelect(d, meta.originalEvent)}
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
              <AddToListOption
                id={createId}
                onSelect={handleCreate}
                focused={focusedItem === CREATE_OPTION}
              >
                {messages.createOption(currentValue, currentSearch!)}
              </AddToListOption>
            )}
          </Popup>
        )}
      </OptionsContext.Provider>
    </Widget>
  )
})

Multiselect.displayName = 'Multiselect'
Multiselect.propTypes = propTypes
// Multiselect.defaultProps = defaultProps

export default Multiselect
