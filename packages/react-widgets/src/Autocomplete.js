import cn from 'classnames'
import * as PropTypes from 'prop-types'
import React from 'react'
import { polyfill as polyfillLifecycles } from 'react-lifecycles-compat'
import uncontrollable from 'uncontrollable'

import List from './List'
import Popup from './Popup'
import Input from './Input'
import Select from './Select'
import Widget from './Widget'
import WidgetPicker from './WidgetPicker'
import { getMessages } from './messages'
import focusManager from './util/focusManager'
import reduceToListState from './util/reduceToListState'
import * as CustomPropTypes from './util/PropTypes'
import getAccessors from './util/getAccessors'
import scrollManager from './util/scrollManager'
import * as Props from './util/Props'
import { widgetEditable } from './util/interaction'
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers'
import AutocompleteListItem from './AutocompleteListItem'

const propTypes = {
  //-- controlled props -----------
  value: PropTypes.any,
  onChange: PropTypes.func,
  open: PropTypes.bool,
  onToggle: PropTypes.func,
  //------------------------------------

  openWithoutData: PropTypes.bool,

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
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
  }),
}

@polyfillLifecycles
class Autocomplete extends React.Component {
  static defaultProps = {
    data: [],
    open: false,
    openWithoutData: false,
    listComponent: List,
    selectComponent: Select,
    itemComponent: AutocompleteListItem,
  }

  constructor(props, context) {
    super(props, context)

    this.inputId = instanceId(this, '_input')
    this.listId = instanceId(this, '_listbox')
    this.activeId = instanceId(this, '_listbox_active_option')

    this.handleScroll = scrollManager(this)
    this.focusManager = focusManager(this, {
      didHandle: this.handleFocusChanged,
    })

    this.state = {
      open: false,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { value, data, messages } = nextProps
    let { focusedItem = null } = prevState

    const accessors = getAccessors(nextProps)
    let index = accessors.indexOf(data, value)

    const list = reduceToListState(data, prevState.list, {
      accessors,
      nextProps,
    })

    return {
      data,
      list,
      accessors,
      messages: getMessages(messages),
      selectedItem: list.nextEnabled(data[index]),
      focusedItem: ~index ? list.nextEnabled(data[index]) : focusedItem,
    }
  }

  handleFocusChanged = focused => {
    if (!focused) this.close()
  }

  @widgetEditable
  handleSelect = (data, originalEvent) => {
    this.close()
    notify(this.props.onSelect, [data, { originalEvent }])
    this.change(data, originalEvent)
    this.focus()
  }

  handleInputChange = event => {
    this.change(event.target.value, event)
    this.open()
  }

  @widgetEditable
  handleKeyDown = e => {
    let key = e.key
    let { list, focusedItem } = this.state
    let isOpen = this.props.open

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

  attachListRef = ref => {
    this.listRef = ref
  }
  attachInputRef = ref => {
    this.inputRef = ref
  }

  canOpen = () => {
    return (
      !!this.props.value &&
      (this.props.openWithoutData || !!this.props.data.length)
    )
  }

  renderList(messages) {
    let { activeId, inputId, listId } = this

    let { open, value } = this.props
    let { selectedItem, focusedItem, accessors, list } = this.state
    let List = this.props.listComponent

    return (
      <List
        {...list.props}
        id={listId}
        activeId={activeId}
        ref={this.attachListRef}
        selectedItem={selectedItem}
        searchTerm={accessors.text(value) || ''}
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

    let { focused, accessors, messages } = this.state

    let disabled = this.props.disabled === true
    let readOnly = this.props.readOnly === true

    let elementProps = Props.pickElementProps(this)
    let shouldRenderPopup = isFirstFocusedRender(this)

    let valueItem = accessors.findOrSelf(data, value)
    let actuallyOpen = open && this.canOpen()

    return (
      <Widget
        {...elementProps}
        dropUp={dropUp}
        focused={focused}
        disabled={disabled}
        readOnly={readOnly}
        open={actuallyOpen}
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
            value={accessors.text(valueItem)}
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown}
          />
          <SelectComponent
            busy={busy}
            aria-hidden="true"
            role="presentational"
            disabled={disabled || readOnly}
          />
        </WidgetPicker>

        {shouldRenderPopup && (
          <Popup
            dropUp={dropUp}
            open={actuallyOpen}
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
