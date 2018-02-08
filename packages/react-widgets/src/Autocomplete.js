import cn from 'classnames'
import * as PropTypes from 'prop-types'
import React from 'react'
import uncontrollable from 'uncontrollable'

import List from './List'
import Popup from './Popup'
import Input from './Input'
import Select from './Select'
import Widget from './Widget'
import WidgetPicker from './WidgetPicker'
import { getMessages } from './messages'
import focusManager from './util/focusManager'
import listDataManager from './util/listDataManager'
import * as CustomPropTypes from './util/PropTypes'
import accessorManager from './util/accessorManager'
import scrollManager from './util/scrollManager'
import * as Props from './util/Props'
import { widgetEditable } from './util/interaction'
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers'

const propTypes = {
  //-- controlled props -----------
  value: PropTypes.any,
  onChange: PropTypes.func,
  open: PropTypes.bool,
  onToggle: PropTypes.func,
  //------------------------------------

  itemComponent: CustomPropTypes.elementType,
  selectComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,

  data: PropTypes.array,
  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,

  onKeyDown: PropTypes.func,
  onSelect: PropTypes.func,
  autoFocus: PropTypes.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,
  busy: PropTypes.bool,

  delay: PropTypes.number,
  dropUp: PropTypes.bool,
  popupTransition: CustomPropTypes.elementType,

  placeholder: PropTypes.string,
  inputProps: PropTypes.object,
  listProps: PropTypes.object,
  isRtl: PropTypes.bool,
  messages: PropTypes.shape({
    openCombobox: CustomPropTypes.message,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
  }),
}

class Autocomplete extends React.Component {
  static defaultProps = {
    data: [],
    open: false,
    listComponent: List,
    selectComponent: Select,
  }

  constructor(props, context) {
    super(props, context)

    this.messages = getMessages(props.messages)
    this.inputId = instanceId(this, '_input')
    this.listId = instanceId(this, '_listbox')
    this.activeId = instanceId(this, '_listbox_active_option')

    this.list = listDataManager(this)
    this.accessors = accessorManager(this)
    this.handleScroll = scrollManager(this)
    this.focusManager = focusManager(this, {
      didHandle: this.handleFocusChanged,
    })

    this.state = {
      ...this.getStateFromProps(props),
      open: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.messages = getMessages(nextProps.messages)
    this.setState(this.getStateFromProps(nextProps))
  }

  getStateFromProps(props) {
    let { accessors, list } = this
    let { value, data } = props
    let { focusedItem = null } = this.state || {}

    let index = accessors.indexOf(data, value)
    list.setData(data)

    return {
      data,
      selectedItem: list.nextEnabled(data[index]),
      focusedItem: ~index ? list.nextEnabled(data[index]) : focusedItem,
    }
  }

  handleFocusChanged = focused => {
    if (!focused) this.close()
  }

  @widgetEditable handleSelect = (data, originalEvent) => {
    this.close()
    notify(this.props.onSelect, [data, { originalEvent }])
    this.change(data, originalEvent)
    this.focus()
  }

  handleInputChange = event => {
    this.change(event.target.value, event)
    this.open()
  }

  @widgetEditable handleKeyDown = e => {
    let key = e.key,
      list = this.list,
      focusedItem = this.state.focusedItem,
      isOpen = this.props.open

    notify(this.props.onKeyDown, [e])

    if (e.defaultPrevented) return

    if (!isOpen) {
      if (key === 'ArrowDown') this.open()
      return
    }

    if (key === 'End') {
      e.preventDefault()
      this.setState({ focusedItem: list.last() })
    } else if (key === 'Home') {
      e.preventDefault()
      this.setState({ focusedItem: list.first() })
    } else if (key === 'Escape') this.close()
    else if (key === 'Enter') {
      if (!focusedItem) {
        return void this.close()
      }

      e.preventDefault()
      this.handleSelect(focusedItem, e)
      this.change(focusedItem, false, e)
    } else if (key === 'ArrowDown') {
      e.preventDefault()
      this.setState({ focusedItem: list.next(focusedItem) })
    } else if (key === 'ArrowUp') {
      e.preventDefault()
      this.setState({ focusedItem: list.prev(focusedItem) })
    }
  }

  attachListRef = (ref) => {
    this.listRef = ref
  }
  attachInputRef = (ref) => {
    this.inputRef = ref
  }

  renderList(messages) {
    let { activeId, inputId, listId, accessors } = this

    let { open } = this.props
    let { selectedItem, focusedItem } = this.state
    let List = this.props.listComponent
    let props = this.list.defaultProps()

    return (
      <List
        {...props}
        id={listId}
        activeId={activeId}
        ref={this.attachListRef}
        valueAccessor={accessors.value}
        textAccessor={accessors.text}
        selectedItem={selectedItem}
        focusedItem={open ? focusedItem : null}
        aria-hidden={!open}
        aria-labelledby={inputId}
        aria-live={open && 'polite'}
        onSelect={this.handleSelect}
        onMove={this.handleScroll}
        messages={messages}
      />
    )
  }

  render() {
    let {
      className,
      popupTransition,
      data,
      value,
      busy,
      dropUp,
      open,
      autoFocus,
      placeholder,
      inputProps,
      selectComponent: SelectComponent,
    } = this.props

    let { focused } = this.state

    let disabled = this.props.disabled === true
    let readOnly = this.props.readOnly === true

    let elementProps = Props.pickElementProps(this)
    let shouldRenderPopup = open || isFirstFocusedRender(this)

    let messages = this.messages
    let valueItem = this.accessors.findOrSelf(data, value)

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
        className={cn(className, 'rw-autocomplete')}
      >
        <WidgetPicker>
          <Input
            {...inputProps}
            role="combobox"
            id={this.inputId}
            autoFocus={autoFocus}
            nodeRef={this.attachInputRef}
            disabled={disabled === true}
            readOnly={readOnly === true}
            aria-busy={!!busy}
            aria-owns={this.listId}
            aria-autocomplete="list"
            aria-activedescendant={open ? this.activeId : null}
            aria-expanded={open}
            aria-haspopup={true}
            placeholder={placeholder}
            value={this.accessors.text(valueItem)}
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown}
          />
          <SelectComponent
            busy={busy}
            aria-hidden="true"
            role="presentational"
            disabled={disabled || readOnly}
            label={messages.openDropdown(this.props)}
          />
        </WidgetPicker>

        {!!value &&
          !!data.length &&
          shouldRenderPopup &&
          <Popup
            open={open}
            dropUp={dropUp}
            transition={popupTransition}
            onEntering={() => this.listRef.forceUpdate()}
          >
            <div>
              {this.renderList(messages)}
            </div>
          </Popup>}
      </Widget>
    )
  }

  focus() {
    this.inputRef && this.inputRef.focus()
  }

  change(nextValue, originalEvent) {
    const { onChange, value: lastValue } = this.props
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
    this.setState({ focusedItem: null }, () => {
      notify(this.props.onToggle, false)
    })
  }
}

Autocomplete.propTypes = propTypes

export default uncontrollable(
  Autocomplete,
  {
    open: 'onToggle',
    value: 'onChange',
  },
  ['focus']
)
