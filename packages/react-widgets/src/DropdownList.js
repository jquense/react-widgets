import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import activeElement from 'dom-helpers/activeElement'
import cn from 'classnames'
import {
  autoFocus,
  mountManager,
  timeoutManager,
} from 'react-component-managers'
import uncontrollable from 'uncontrollable'

import Widget from './Widget'
import WidgetPicker from './WidgetPicker'
import Select from './Select'
import Popup from './Popup'
import List from './List'
import AddToListOption from './AddToListOption';
import DropdownListInput from './DropdownListInput'
import { getMessages } from './messages'

import * as Props from './util/Props'
import * as Filter from './util/Filter'
import focusManager from './util/focusManager'
import listDataManager from './util/listDataManager'
import * as CustomPropTypes from './util/PropTypes'
import accessorManager from './util/accessorManager'
import scrollManager from './util/scrollManager'
import { widgetEditable } from './util/interaction'
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers'

const CREATE_OPTION = {};

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
class DropdownList extends React.Component {
  static propTypes = {
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
    itemComponent: CustomPropTypes.elementType,
    listComponent: CustomPropTypes.elementType,

    groupComponent: CustomPropTypes.elementType,
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
    placeholder: PropTypes.string,

    dropUp: PropTypes.bool,
    popupTransition: CustomPropTypes.elementType,

    disabled: CustomPropTypes.disabled.acceptsArray,
    readOnly: CustomPropTypes.disabled,

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

  static defaultProps = {
    data: [],
    delay: 500,
    searchTerm: '',
    allowCreate: false,
    listComponent: List,
  }

  constructor(...args) {
    super(...args)

    autoFocus(this)
    this.messages = getMessages(this.props.messages)

    this.inputId = instanceId(this, '_input')
    this.listId = instanceId(this, '_listbox')
    this.activeId = instanceId(this, '_listbox_active_option')

    this.list = listDataManager(this)
    this.mounted = mountManager(this)
    this.timeouts = timeoutManager(this)
    this.accessors = accessorManager(this)
    this.handleScroll = scrollManager(this)
    this.focusManager = focusManager(this, {
      didHandle: this.handleFocusChanged,
    })

    this.state = this.getStateFromProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.messages = getMessages(nextProps.messages)
    this.setState(this.getStateFromProps(nextProps))
  }

  getStateFromProps(props) {
    let {
      open, value, data, searchTerm, filter, minLength, caseSensitive,
    } = props

    let { accessors, list } = this
    let initialIdx = accessors.indexOf(data, value)

    if (open)
      data = Filter.filter(data, {
        filter,
        searchTerm,
        minLength,
        caseSensitive,
        textField: this.accessors.text,
      })

    list.setData(data)

    let selectedItem = data[initialIdx]

    return {
      data,
      selectedItem: list.nextEnabled(selectedItem),
      focusedItem: list.nextEnabled(selectedItem || data[0]),
    }
  }

  handleFocusChanged = focused => {
    if (!focused) this.close()
  }


  @widgetEditable
  handleSelect = (dataItem, originalEvent) => {
    if (dataItem === undefined || dataItem === CREATE_OPTION) {
      this.handleCreate(this.props.searchTerm)
      return
    }

    notify(this.props.onSelect, [dataItem, { originalEvent }])

    this.change(dataItem, originalEvent)
    this.close()
    this.focus(this)
  }

  @widgetEditable
  handleCreate = (searchTerm = '', event) => {
    notify(this.props.onCreate, searchTerm)

    this.clearSearch(event)
    this.close()
    this.focus(this)
  };

  @widgetEditable
  handleClick = e => {
    this.focus()
    this.toggle()
    notify(this.props.onClick, e)
  }

  @widgetEditable
  handleKeyDown = (e) => {
    let { key, altKey, ctrlKey } = e
    let { list } = this;

    let { open, onKeyDown, filter, searchTerm } = this.props;
    let { focusedItem, selectedItem } = this.state;

    let createIsFocused = focusedItem === CREATE_OPTION;
    let canCreate = this.allowCreate()

    notify(onKeyDown, [e])

    let closeWithFocus = () => {
      this.close()
      findDOMNode(this).focus()
    }

    const change = item => item != null && this.change(item, e)
    const focusItem = item => this.setState({ focusedItem: item })

    if (e.defaultPrevented) return

    if (key === 'End') {
      e.preventDefault()

      if (open) focusItem(list.last())
      else      change(list.last())
    }
    else if (key === 'Home') {
      e.preventDefault()

      if (open) focusItem(list.first())
      else      change(list.first())
    }
    else if (key === 'Escape' && open) {
      e.preventDefault()
      closeWithFocus()
    }
    else if (key === 'Enter' && open && ctrlKey && canCreate) {
      e.preventDefault()
     this.handleCreate(searchTerm, e)
    }
    else if ((key === 'Enter' || (key === ' ' && !filter)) && open) {
      e.preventDefault()
      this.handleSelect(focusedItem, e)
    }
    else if (key === ' ' && !open) {
      e.preventDefault()
      this.open()
    }
    else if (key === 'ArrowDown') {
      e.preventDefault()

      if (altKey) return this.open()
      if (!open)  change(list.next(selectedItem))

      let next = list.next(focusedItem)
      let creating = createIsFocused || (canCreate && focusedItem === next);

      focusItem(creating ? CREATE_OPTION : next)
    }
    else if (key === 'ArrowUp') {
      e.preventDefault()

      if (altKey) return closeWithFocus()
      if (!open)  return change(list.prev(selectedItem))

      focusItem(createIsFocused ? list.last() : list.prev(focusedItem))
    }
  }

  @widgetEditable
  handleKeyPress = e => {
    notify(this.props.onKeyPress, [e])
    if (e.defaultPrevented) return

    if (!(this.props.filter && this.props.open))
      this.findOption(String.fromCharCode(e.which), item => {
        this.mounted() && this.props.open
          ? this.setState({ focusedItem: item })
          : item && this.change(item, e)
      })
  }

  handleInputChange = (e) => {
    this.search(e.target.value, e, 'input')
  };

  change(nextValue, originalEvent) {
    let { onChange, searchTerm, value: lastValue } = this.props

    if (!this.accessors.matches(nextValue, lastValue)) {
      notify(onChange, [
        nextValue,
        {
          originalEvent,
          lastValue,
          searchTerm,
        },
      ])

      this.clearSearch(originalEvent)
      this.close()
    }
  }

  attachInputRef = ref => (this.inputRef = ref)
  attachFilterRef = ref => (this.filterRef = ref)
  attachListRef = ref => (this.listRef = ref)

  renderList(messages) {
    let { open, filter, data, searchTerm } = this.props
    let { selectedItem, focusedItem } = this.state
    let { value, text } = this.accessors

    let List = this.props.listComponent
    let props = this.list.defaultProps()

    return (
      <div>
        {filter && (
          <WidgetPicker
            className="rw-filter-input rw-input"
          >
            <input
              value={searchTerm}
              className="rw-input-reset"
              onChange={this.handleInputChange}
              placeholder={messages.filterPlaceholder(this.props)}
              ref={this.attachFilterRef}
            />
            <Select icon="search" role="presentation" aria-hidden="true" />
          </WidgetPicker>
        )}
        <List
          {...props}
          id={this.listId}
          activeId={this.activeId}
          valueAccessor={value}
          textAccessor={text}
          selectedItem={selectedItem}
          focusedItem={open ? focusedItem : null}
          onSelect={this.handleSelect}
          onMove={this.handleScroll}
          aria-live={open && 'polite'}
          aria-labelledby={this.inputId}
          aria-hidden={!this.props.open}
          ref={this.attachListRef}
          messages={{
            emptyList: data.length ? messages.emptyFilter : messages.emptyList,
          }}
        />
        {this.allowCreate() && (
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
    )
  }

  render() {
    let {
      className,
      tabIndex,
      popupTransition,
      textField,
      data,
      busy,
      dropUp,
      placeholder,
      value,
      open,
      filter,
      inputProps,
      valueComponent,
    } = this.props

    let { focused } = this.state

    let disabled = this.props.disabled === true,
      readOnly = this.props.readOnly === true,
      valueItem = this.accessors.findOrSelf(data, value)

    let shouldRenderPopup = open || isFirstFocusedRender(this)

    let elementProps = Object.assign(Props.pickElementProps(this), {
      name: undefined,
      role: 'combobox',
      id: this.inputId,
      tabIndex: open && filter ? -1 : tabIndex || 0,
      'aria-owns': this.listId,
      'aria-activedescendant': open ? this.activeId : null,
      'aria-expanded': !!open,
      'aria-haspopup': true,
      'aria-busy': !!busy,
      'aria-live': !open && 'polite',
      'aria-autocomplete': 'list',
      'aria-disabled': disabled,
      'aria-readonly': readOnly,
    })

    let messages = this.messages

    return (
      <Widget
        {...elementProps}
        open={open}
        dropUp={dropUp}
        focused={focused}
        disabled={disabled}
        readOnly={readOnly}
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
        className={cn(className, 'rw-dropdown-list')}
        ref={this.attachInputRef}
      >
        <WidgetPicker onClick={this.handleClick} className="rw-widget-input">
          <DropdownListInput
            {...inputProps}
            value={valueItem}
            textField={textField}
            placeholder={placeholder}
            valueComponent={valueComponent}
          />
          <Select
            busy={busy}
            icon="caret-down"
            role="presentational"
            aria-hidden="true"
            disabled={disabled || readOnly}
            label={messages.openDropdown(this.props)}
          />
        </WidgetPicker>
        {shouldRenderPopup &&
          <Popup
            open={open}
            dropUp={dropUp}
            transition={popupTransition}
            onEntered={() => this.focus()}
            onEntering={() => this.listRef.forceUpdate()}
          >
            {this.renderList(messages)}
          </Popup>}
      </Widget>
    )
  }

  focus = target => {
    let { filter, open } = this.props
    let inst = target || (filter && open ? this.filterRef : this.inputRef)

    inst = findDOMNode(inst)

    if (inst && activeElement() !== inst) inst.focus()
  }

  findOption(character, cb) {
    var word = ((this._currentWord || '') + character).toLowerCase()

    if (!character) return

    this._currentWord = word

    this.timeouts.set(
      'search',
      () => {
        var list = this.list,
          key = this.props.open ? 'focusedItem' : 'selectedItem',
          item = list.next(this.state[key], word)

        if(item === this.state[key]) {
          item = list.next(null, word)
        }

        this._currentWord = ''
        if (item) cb(item)
      },
      this.props.delay
    )
  }

  clearSearch(originalEvent) {
    this.search('', originalEvent, 'clear')
  }

  search(searchTerm, originalEvent, action: 'clear' | 'input' = 'input') {
    let { onSearch, searchTerm: lastSearchTerm } = this.props;

    if (searchTerm !== lastSearchTerm)
      notify(onSearch, [searchTerm, {
        action,
        lastSearchTerm,
        originalEvent,
      }])
  }

  open() {
    if (!this.props.open)
      notify(this.props.onToggle, true)
  }

  close() {
    if (this.props.open)
      notify(this.props.onToggle, false)
  }

  toggle() {
    this.props.open ? this.close() : this.open()
  }

  allowCreate() {
    let { searchTerm, onCreate, allowCreate } = this.props;

    return !!(
      onCreate &&
      (allowCreate === true ||
      (allowCreate === 'onFilter' && searchTerm)) &&
      !this.hasExtactMatch()
    )
  }

  hasExtactMatch() {
    let {searchTerm, caseSensitive, filter } = this.props;
    let { data } = this.state;
    let { text } = this.accessors;
    let lower = text => caseSensitive ? text : text.toLowerCase();

    // if there is an exact match on textFields:
    return filter && data.some(v => lower(text(v)) === lower(searchTerm))
  }
}

export default uncontrollable(
  DropdownList,
  {
    open: 'onToggle',
    value: 'onChange',
    searchTerm: 'onSearch',
  },
  ['focus']
)
