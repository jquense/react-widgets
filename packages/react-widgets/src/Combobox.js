import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { polyfill as polyfillLifecycles } from 'react-lifecycles-compat'
import createUncontrolledWidget from 'uncontrollable'

import Widget from './Widget'
import WidgetPicker from './WidgetPicker'
import List from './List'
import Popup from './Popup'
import Select from './Select'
import ComboboxInput from './ComboboxInput'
import { getMessages } from './messages'
import focusManager from './util/focusManager'
import reduceToListState from './util/reduceToListState'
import getAccessors from './util/getAccessors'
import * as CustomPropTypes from './util/PropTypes'
import scrollManager from './util/scrollManager'
import { isShallowEqual } from './util/_'
import * as Props from './util/Props'
import * as Filter from './util/Filter'
import { widgetEditable } from './util/interaction'
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers'
import { caretDown } from './Icon'

let propTypes = {
  ...Filter.propTypes,
  value: PropTypes.any,
  onChange: PropTypes.func,
  open: PropTypes.bool,
  onToggle: PropTypes.func,

  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,

  data: PropTypes.array,
  valueField: CustomPropTypes.accessor,
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
@polyfillLifecycles
class Combobox extends React.Component {
  static propTypes = propTypes

  static defaultProps = {
    data: [],
    value: '',
    open: false,
    suggest: false,
    filter: false,
    delay: 500,
    selectIcon: caretDown,
    listComponent: List,
  }

  constructor(props, context) {
    super(props, context)

    this.inputId = instanceId(this, '_input')
    this.listId = instanceId(this, '_listbox')
    this.activeId = instanceId(this, '_listbox_active_option')

    this.handleScroll = scrollManager(this)
    this.focusManager = focusManager(this, {
      willHandle: this.handleFocusWillChange,
      didHandle: this.handleFocusChanged,
    })

    this.state = {
      isSuggesting: () => this.inputRef && this.inputRef.isSuggesting(),
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let isSuggesting = nextState.isSuggesting(),
      stateChanged = !isShallowEqual(nextState, this.state),
      valueChanged = !isShallowEqual(nextProps, this.props)

    return isSuggesting || stateChanged || valueChanged
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { value, data, messages, filter, minLength, caseSensitive } = nextProps
    const { focusedItem } = prevState

    let accessors = getAccessors(nextProps)
    const valueChanged = value !== prevState.lastValue

    let index = accessors.indexOf(data, value)
    let dataItem = index === -1 ? value : data[index]

    let searchTerm
    // filter only when the value is not an item in the data list
    if (index === -1 || prevState.isSuggesting()) {
      searchTerm = accessors.text(dataItem)
    }

    data = data = Filter.filter(data, {
      filter,
      searchTerm,
      minLength,
      caseSensitive,
      textField: accessors.text,
    })

    const list = reduceToListState(data, prevState.list, { nextProps })

    let focusedIndex = index
    // index may have changed after filtering
    if (index !== -1) {
      index = accessors.indexOf(data, value)
      focusedIndex = index
    } else {
      // value isn't a dataItem so find the close match
      focusedIndex = Filter.indexOf(data, {
        searchTerm,
        textField: accessors.text,
        filter: filter || true,
      })
    }
    const selectedItem = data[index]
    const nextFocusedItem = focusedIndex === -1 ? focusedItem : data[focusedIndex]

    return {
      data,
      list,
      accessors,
      lastValue: value,
      messages: getMessages(messages),
      selectedItem: valueChanged
        ? list.nextEnabled(selectedItem)
        : prevState.selectedItem,
      focusedItem:
        valueChanged || !focusedItem
          ? list.nextEnabled(selectedItem || nextFocusedItem)
          : nextFocusedItem,
    }
  }

  // has to be done early since `accept()` re-focuses the input
  handleFocusWillChange = focused => {
    if (!focused && this.inputRef) this.inputRef.accept()
    if (focused) this.focus()
  }

  handleFocusChanged = focused => {
    if (!focused) this.close()
  }

  @widgetEditable
  handleSelect = (data, originalEvent) => {
    this.close()
    notify(this.props.onSelect, [data, { originalEvent }])
    this.change(data, false, originalEvent)
    this.inputRef && this.inputRef.accept(true)
    this.focus()
  }

  handleInputKeyDown = ({ key }) => {
    this._deleting = key === 'Backspace' || key === 'Delete'
    this._isTyping = true
  }

  handleInputChange = event => {
    let suggestion = this.suggest(event.target.value)

    this.change(suggestion, true, event)
    this.open()
  }

  @widgetEditable
  handleKeyDown = e => {
    let { key, altKey } = e
    let { open, onKeyDown } = this.props
    let { focusedItem, selectedItem, list } = this.state

    notify(onKeyDown, [e])

    if (e.defaultPrevented) return

    const select = item => item != null && this.handleSelect(item, e)
    const focusItem = item => this.setState({ focusedItem: item })

    if (key === 'End' && open) {
      e.preventDefault()
      focusItem(list.last())
    } else if (key === 'Home' && open) {
      e.preventDefault()
      focusItem(list.first())
    } else if (key === 'Escape' && open) {
      e.preventDefault()
      this.close()
    } else if (key === 'Enter' && open) {
      e.preventDefault()
      select(this.state.focusedItem)
    } else if (key === 'Tab') {
      this.inputRef.accept()
    } else if (key === 'ArrowDown') {
      e.preventDefault()
      if (altKey) return this.open()

      if (open) focusItem(list.next(focusedItem))
      else select(list.next(selectedItem))
    } else if (key === 'ArrowUp') {
      e.preventDefault()
      if (altKey) return this.close()

      if (open) focusItem(list.prev(focusedItem))
      else select(list.prev(selectedItem))
    }
  }
  attachListRef = ref => {
    this.listRef = ref
  }
  attachInputRef = ref => {
    this.inputRef = ref
  }

  renderInput() {
    let {
      suggest,
      filter,
      busy,
      name,
      data,
      value,
      autoFocus,
      tabIndex,
      placeholder,
      inputProps,
      disabled,
      readOnly,
      open,
    } = this.props
    let { accessors } = this.state
    let valueItem = accessors.findOrSelf(data, value)

    let completeType = suggest
      ? filter
        ? 'both'
        : 'inline'
      : filter
        ? 'list'
        : ''

    return (
      <ComboboxInput
        {...inputProps}
        role="combobox"
        name={name}
        id={this.inputId}
        autoFocus={autoFocus}
        tabIndex={tabIndex}
        suggest={suggest}
        disabled={disabled === true}
        readOnly={readOnly === true}
        aria-busy={!!busy}
        aria-owns={this.listId}
        aria-autocomplete={completeType}
        aria-activedescendant={open ? this.activeId : null}
        aria-expanded={open}
        aria-haspopup={true}
        placeholder={placeholder}
        value={accessors.text(valueItem)}
        onChange={this.handleInputChange}
        onKeyDown={this.handleInputKeyDown}
        ref={this.attachInputRef}
      />
    )
  }

  renderList(messages) {
    let { activeId, inputId, listId } = this
    let {
      open,
      data,
      value,
      listProps,
      optionComponent,
      itemComponent,
      groupComponent,
    } = this.props

    let {
      list,
      accessors,
      focusedItem,
      selectedItem,
      data: filteredData,
    } = this.state

    let List = this.props.listComponent

    return (
      <List
        {...listProps}
        id={listId}
        activeId={activeId}
        data={filteredData}
        dataState={list.dataState}
        isDisabled={list.isDisabled}
        textAccessor={accessors.text}
        valueAccessor={accessors.value}
        itemComponent={itemComponent}
        groupComponent={groupComponent}
        optionComponent={optionComponent}
        selectedItem={selectedItem}
        focusedItem={open ? focusedItem : null}
        searchTerm={accessors.text(value) || ''}
        aria-hidden={!open}
        aria-labelledby={inputId}
        aria-live={open && 'polite'}
        onSelect={this.handleSelect}
        onMove={this.handleScroll}
        ref={this.attachListRef}
        messages={{
          emptyList: data.length ? messages.emptyFilter : messages.emptyList,
        }}
      />
    )
  }

  render() {
    let {
      isRtl,
      className,
      popupTransition,
      busy,
      dropUp,
      open,
      selectIcon,
      busySpinner,
      containerClassName,
    } = this.props

    let { focused, messages } = this.state

    let disabled = this.props.disabled === true,
      readOnly = this.props.readOnly === true

    let elementProps = Props.pickElementProps(this)
    let shouldRenderPopup = isFirstFocusedRender(this)

    return (
      <Widget
        {...elementProps}
        open={open}
        isRtl={isRtl}
        dropUp={dropUp}
        focused={focused}
        disabled={disabled}
        readOnly={readOnly}
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        onKeyDown={this.handleKeyDown}
        className={cn(className, 'rw-combobox')}
      >
        <WidgetPicker className={containerClassName}>
          {this.renderInput()}
          <Select
            bordered
            busy={busy}
            icon={selectIcon}
            spinner={busySpinner}
            onClick={this.toggle}
            disabled={disabled || readOnly}
            label={messages.openCombobox(this.props)}
          />
        </WidgetPicker>

        {shouldRenderPopup && (
          <Popup
            open={open}
            dropUp={dropUp}
            transition={popupTransition}
            onEntering={() => this.listRef.forceUpdate()}
          >
            <div>{this.renderList(messages)}</div>
          </Popup>
        )}
      </Widget>
    )
  }

  focus() {
    if (this.inputRef) this.inputRef.focus()
  }

  change(nextValue, typing, originalEvent) {
    const { onChange, value: lastValue } = this.props
    this._typedChange = !!typing
    notify(onChange, [
      nextValue,
      {
        lastValue,
        originalEvent,
      },
    ])
  }

  open() {
    if (!this.props.open) notify(this.props.onToggle, true)
  }

  close() {
    if (this.props.open) notify(this.props.onToggle, false)
  }

  @widgetEditable
  toggle = () => {
    this.focus()

    this.props.open ? this.close() : this.open()
  }

  suggest(searchTerm) {
    let { textField, suggest, minLength } = this.props
    let { data } = this.state

    if (!this._deleting)
      return Filter.suggest(data, {
        minLength,
        textField,
        searchTerm,
        filter: suggest,
        caseSensitive: false,
      })

    return searchTerm
  }
}

export default createUncontrolledWidget(
  Combobox,
  { open: 'onToggle', value: 'onChange' },
  ['focus']
)
