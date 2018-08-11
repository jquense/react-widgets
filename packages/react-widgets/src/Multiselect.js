// @flow

import cn from 'classnames'
import closest from 'dom-helpers/query/closest'
import PropTypes from 'prop-types'
import React from 'react'
import { polyfill as polyfillLifecycles } from 'react-lifecycles-compat'
import uncontrollable from 'uncontrollable'

import Widget from './Widget'
import WidgetPicker from './WidgetPicker'
import Select from './Select'
import Popup from './Popup'
import MultiselectInput from './MultiselectInput'
import TagList from './MultiselectTagList'
import List from './List'
import AddToListOption from './AddToListOption'

import { makeArray } from './util/_'
import * as Filter from './util/Filter'
import * as Props from './util/Props'
import { getMessages } from './messages'
import * as CustomPropTypes from './util/PropTypes'
import reduceToListState, {
  defaultGetDataState,
} from './util/reduceToListState'
import getAccessors from './util/getAccessors'
import focusManager from './util/focusManager'
import scrollManager from './util/scrollManager'
import { widgetEditable } from './util/interaction'
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers'
import { caretDown } from './Icon'

const CREATE_OPTION = {}
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
@polyfillLifecycles
class Multiselect extends React.Component {
  static propTypes = propTypes

  static defaultProps = {
    data: [],
    allowCreate: 'onFilter',
    filter: 'startsWith',
    value: [],
    searchTerm: '',
    selectIcon: caretDown,
    listComponent: List,
    showPlaceholderWithValues: false,
  }

  constructor(...args) {
    super(...args)

    this.inputId = instanceId(this, '_input')
    this.tagsId = instanceId(this, '_taglist')
    this.notifyId = instanceId(this, '_notify_area')
    this.listId = instanceId(this, '_listbox')
    this.createId = instanceId(this, '_createlist_option')
    this.activeTagId = instanceId(this, '_taglist_active_tag')
    this.activeOptionId = instanceId(this, '_listbox_active_option')

    this.handleScroll = scrollManager(this)
    this.focusManager = focusManager(this, {
      didHandle: this.handleFocusDidChange,
    })

    this.state = {
      focusedTag: null,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let {
      data,
      searchTerm,
      messages,
      minLength,
      caseSensitive,
      filter,
    } = nextProps
    let { focusedItem, focusedTag } = prevState

    let accessors = getAccessors(nextProps)
    let valueChanged = nextProps.value !== prevState.lastValue

    let values = makeArray(nextProps.value)
    let dataItems = valueChanged
      ? values.map(item => accessors.findOrSelf(data, item))
      : prevState.dataItems

    data = data.filter(i => !values.some(v => accessors.matches(i, v)))

    let lengthWithoutValues = data.length

    data = Filter.filter(data, {
      filter,
      searchTerm,
      minLength,
      caseSensitive,
      textField: accessors.text,
    })

    const list = reduceToListState(data, prevState.list, { nextProps })

    const tagList = reduceToListState(dataItems, prevState.tagList, {
      nextProps,
      getDataState: defaultGetDataState,
    })
    const nextFocusedItem = ~data.indexOf(focusedItem) ? focusedItem : data[0]
    return {
      data,
      dataItems,
      list,
      tagList,
      accessors,
      lengthWithoutValues,
      lastValue: nextProps.value,
      messages: getMessages(messages),
      focusedTag: valueChanged
        ? list.nextEnabled(~dataItems.indexOf(focusedTag) ? focusedTag : null)
        : focusedTag,
      focusedItem:
        valueChanged || !prevState.focusedItem
          ? list.nextEnabled(nextFocusedItem)
          : nextFocusedItem,
    }
  }

  handleFocusDidChange = focused => {
    if (focused) return this.focus()

    this.close()
    this.clearSearch()

    if (this.tagsRef) this.setState({ focusedTag: null })
  }

  handleDelete = (dataItem, event) => {
    let { disabled, readOnly } = this.props

    if (disabled == true || readOnly) return

    this.focus()
    this.change(dataItem, event, REMOVE)
  }

  handleSearchKeyDown = e => {
    if (e.key === 'Backspace' && e.target.value && !this._deletingText)
      this._deletingText = true
  }

  handleSearchKeyUp = e => {
    if (e.key === 'Backspace' && this._deletingText) this._deletingText = false
  }

  handleInputChange = e => {
    this.search(e.target.value, e, 'input')
    this.open()
  }

  @widgetEditable
  handleClick = ({ target }) => {
    this.focus()

    if (closest(target, '.rw-select')) this.toggle()
    else this.open()
  }

  @widgetEditable
  handleDoubleClick = () => {
    if (!this.inputRef) return

    this.focus()
    this.inputRef.select()
  }

  @widgetEditable
  handleSelect = (dataItem, originalEvent) => {
    if (dataItem === undefined || dataItem === CREATE_OPTION) {
      this.handleCreate(this.props.searchTerm, originalEvent)
      return
    }

    notify(this.props.onSelect, [dataItem, { originalEvent }])

    this.change(dataItem, originalEvent, INSERT)
    this.focus()
  }

  @widgetEditable
  handleCreate = (searchTerm = '', event) => {
    notify(this.props.onCreate, searchTerm)

    this.clearSearch(event)
    this.focus()
  }

  @widgetEditable
  handleKeyDown = event => {
    const { open, searchTerm, onKeyDown } = this.props
    let { key, keyCode, altKey, ctrlKey } = event

    let { focusedTag, focusedItem, list, tagList } = this.state

    let createIsFocused = focusedItem === CREATE_OPTION
    let canCreate = this.allowCreate()

    const focusTag = tag => this.setState({ focusedTag: tag })
    const focusItem = item =>
      this.setState({ focusedItem: item, focusedTag: null })

    notify(onKeyDown, [event])

    if (event.defaultPrevented) return

    if (key === 'ArrowDown') {
      event.preventDefault()

      if (!open) return this.open()

      let next = list.next(focusedItem)
      let creating = createIsFocused || (canCreate && focusedItem === next)

      focusItem(creating ? CREATE_OPTION : next)
    } else if (key === 'ArrowUp' && (open || altKey)) {
      event.preventDefault()

      if (altKey) return this.close()
      focusItem(createIsFocused ? list.last() : list.prev(focusedItem))
    } else if (key === 'End') {
      event.preventDefault()

      if (open) focusItem(list.last())
      else focusTag(tagList.last())
    } else if (key === 'Home') {
      event.preventDefault()
      if (open) focusItem(list.first())
      else focusTag(tagList.first())
    } else if (open && keyCode === ENTER) {
      // using keyCode to ignore enter for japanese IME
      event.preventDefault()

      if (ctrlKey && canCreate) return this.handleCreate(searchTerm, event)

      this.handleSelect(focusedItem, event)
    } else if (key === 'Escape') {
      open ? this.close() : tagList && focusTag(null)
    } else if (!searchTerm && !this._deletingText) {
      if (key === 'ArrowLeft') {
        focusTag(tagList.prev(focusedTag) || tagList.last())
      } else if (key === 'ArrowRight' && focusedTag) {
        let nextTag = tagList.next(focusedTag)
        focusTag(nextTag === focusedTag ? null : nextTag)
      } else if (key === 'Delete' && !tagList.isDisabled(focusedTag)) {
        this.handleDelete(focusedTag, event)
      } else if (key === 'Backspace') {
        this.handleDelete(tagList.last(), event)
      } else if (key === ' ' && !open) {
        event.preventDefault()
        this.open()
      }
    }
  }

  attachListRef = ref => (this.listRef = ref)
  attachTagsRef = ref => (this.tagsRef = ref)
  attachInputRef = ref => (this.inputRef = ref)

  renderInput(ownedIds) {
    let {
      searchTerm,
      maxLength,
      tabIndex,
      busy,
      autoFocus,
      inputProps,
      open,
    } = this.props

    let { focusedItem, focusedTag } = this.state

    let disabled = this.props.disabled === true
    let readOnly = this.props.readOnly === true

    let active

    if (!open) active = focusedTag ? this.activeTagId : ''
    else if (focusedItem || this.allowCreate()) active = this.activeOptionId

    return (
      <MultiselectInput
        {...inputProps}
        autoFocus={autoFocus}
        tabIndex={tabIndex || 0}
        role="listbox"
        aria-expanded={!!open}
        aria-busy={!!busy}
        aria-owns={ownedIds}
        aria-haspopup={true}
        aria-activedescendant={active || null}
        value={searchTerm}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={this.getPlaceholder()}
        onKeyDown={this.handleSearchKeyDown}
        onKeyUp={this.handleSearchKeyUp}
        onChange={this.handleInputChange}
        ref={this.attachInputRef}
      />
    )
  }

  renderList() {
    let { inputId, activeOptionId, listId } = this
    let {
      open,
      searchTerm,
      optionComponent,
      itemComponent,
      groupComponent,
      listProps,
    } = this.props

    let {
      focusedItem,
      list,
      lengthWithoutValues,
      accessors,
      data,
      messages,
    } = this.state

    let List = this.props.listComponent

    return (
      <List
        {...listProps}
        id={listId}
        activeId={activeOptionId}
        data={data}
        dataState={list.dataState}
        isDisabled={list.isDisabled}
        searchTerm={searchTerm}
        textAccessor={accessors.text}
        valueAccessor={accessors.value}
        itemComponent={itemComponent}
        groupComponent={groupComponent}
        optionComponent={optionComponent}
        focusedItem={focusedItem}
        onSelect={this.handleSelect}
        onMove={this.handleScroll}
        aria-live="polite"
        aria-labelledby={inputId}
        aria-hidden={!open}
        ref={this.attachListRef}
        messages={{
          emptyList: lengthWithoutValues
            ? messages.emptyFilter
            : messages.emptyList,
        }}
      />
    )
  }

  renderNotificationArea() {
    let { focused, dataItems, accessors, messages } = this.state

    let itemLabels = dataItems.map(item => accessors.text(item))

    return (
      <span
        id={this.notifyId}
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
    )
  }

  renderTags() {
    let { readOnly, disabled } = this.props
    let { focusedTag, dataItems, accessors, messages } = this.state

    let Component = this.props.tagComponent

    return (
      <TagList
        id={this.tagsId}
        activeId={this.activeTagId}
        textAccessor={accessors.text}
        valueAccessor={accessors.value}
        label={messages.tagsLabel()}
        value={dataItems}
        readOnly={readOnly}
        disabled={disabled}
        focusedItem={focusedTag}
        onDelete={this.handleDelete}
        valueComponent={Component}
        ref={this.attachTagsRef}
      />
    )
  }

  render() {
    let {
      className,
      busy,
      dropUp,
      open,
      searchTerm,
      selectIcon,
      busySpinner,
      containerClassName,
      popupTransition,
    } = this.props

    let { focused, focusedItem, dataItems, messages } = this.state

    let elementProps = Props.pickElementProps(this)

    let shouldRenderTags = !!dataItems.length,
      shouldRenderPopup = isFirstFocusedRender(this),
      allowCreate = this.allowCreate()

    let inputOwns =
      `${this.listId} ${this.notifyId} ` +
      (shouldRenderTags ? this.tagsId : '') +
      (allowCreate ? this.createId : '')

    let disabled = this.props.disabled === true
    let readOnly = this.props.readOnly === true

    return (
      <Widget
        {...elementProps}
        open={open}
        dropUp={dropUp}
        focused={focused}
        disabled={disabled}
        readOnly={readOnly}
        onKeyDown={this.handleKeyDown}
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        className={cn(className, 'rw-multiselect')}
      >
        {this.renderNotificationArea(messages)}
        <WidgetPicker
          onClick={this.handleClick}
          onTouchEnd={this.handleClick}
          onDoubleClick={this.handleDoubleClick}
          className={cn(containerClassName, 'rw-widget-input')}
        >
          <div>
            {shouldRenderTags && this.renderTags(messages)}
            {this.renderInput(inputOwns)}
          </div>

          <Select
            busy={busy}
            spinner={busySpinner}
            icon={focused ? selectIcon : null}
            aria-hidden="true"
            role="presentational"
            disabled={disabled || readOnly}
          />
        </WidgetPicker>

        {shouldRenderPopup && (
          <Popup
            dropUp={dropUp}
            open={open}
            transition={popupTransition}
            onEntering={() => this.listRef.forceUpdate()}
          >
            <div>
              {this.renderList()}

              {allowCreate && (
                <AddToListOption
                  id={this.createId}
                  searchTerm={searchTerm}
                  onSelect={this.handleCreate}
                  focused={!focusedItem || focusedItem === CREATE_OPTION}
                >
                  {messages.createOption(this.props)}
                </AddToListOption>
              )}
            </div>
          </Popup>
        )}
      </Widget>
    )
  }

  change(dataItem, originalEvent, action) {
    let { onChange, searchTerm, value: lastValue } = this.props
    let { dataItems } = this.state

    switch (action) {
      case INSERT:
        dataItems = dataItems.concat(dataItem)
        break
      case REMOVE:
        dataItems = dataItems.filter(d => d !== dataItem)
        break
    }

    notify(onChange, [
      dataItems,
      {
        action,
        dataItem,
        originalEvent,
        lastValue,
        searchTerm,
      },
    ])

    this.clearSearch(originalEvent)
  }

  clearSearch(originalEvent) {
    this.search('', originalEvent, 'clear')
  }

  search(searchTerm, originalEvent, action: 'clear' | 'input' = 'input') {
    let { onSearch, searchTerm: lastSearchTerm } = this.props

    if (searchTerm !== lastSearchTerm)
      notify(onSearch, [
        searchTerm,
        {
          action,
          lastSearchTerm,
          originalEvent,
        },
      ])
  }

  focus() {
    if (this.inputRef) this.inputRef.focus()
  }

  toggle() {
    this.props.open ? this.close() : this.open()
  }

  open() {
    if (!this.props.open) notify(this.props.onToggle, true)
  }

  close() {
    if (this.props.open) notify(this.props.onToggle, false)
  }

  allowCreate() {
    let { searchTerm, onCreate, allowCreate } = this.props

    return !!(
      onCreate &&
      (allowCreate === true || (allowCreate === 'onFilter' && searchTerm)) &&
      !this.hasExtactMatch()
    )
  }

  hasExtactMatch() {
    let { searchTerm, caseSensitive } = this.props
    let { data, dataItems, accessors } = this.state

    let lower = text => (caseSensitive ? text : text.toLowerCase())
    let eq = v => lower(accessors.text(v)) === lower(searchTerm)

    // if there is an exact match on textFields:
    // "john" => { name: "john" }, don't show
    return dataItems.some(eq) || data.some(eq)
  }

  getPlaceholder() {
    let { value, placeholder, showPlaceholderWithValues } = this.props
    return (
      (value && value.length && !showPlaceholderWithValues
        ? ''
        : placeholder) || ''
    )
  }
}

export default uncontrollable(
  Multiselect,
  {
    open: 'onToggle',
    value: 'onChange',
    searchTerm: 'onSearch',
  },
  ['focus']
)
