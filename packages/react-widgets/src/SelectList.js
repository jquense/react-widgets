import React from 'react'
import { findDOMNode } from 'react-dom'
import { polyfill as polyfillLifecycles } from 'react-lifecycles-compat'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { autoFocus, timeoutManager } from 'react-component-managers'
import createUncontrolledWidget from 'uncontrollable'

import List from './List'
import Widget from './Widget'
import SelectListItem from './SelectListItem'
import { getMessages } from './messages'

import { makeArray } from './util/_'
import * as Props from './util/Props'
import * as CustomPropTypes from './util/PropTypes'
import reduceToListState from './util/reduceToListState'
import getAccessors from './util/getAccessors'
import focusManager from './util/focusManager'
import scrollManager from './util/scrollManager'
import { widgetEditable } from './util/interaction'
import { instanceId, notify } from './util/widgetHelpers'

const BusyMask = () => <span className="rw-loading-mask" />

function getFirstValue(data, values) {
  if (!values.length) return null

  for (var idx = 0; idx < data.length; idx++)
    if (~values.indexOf(data[idx])) return data[idx]

  return null
}

/**
 * ---
 * shortcuts:
 *   - { key: down arrow, label: move focus, or select previous option }
 *   - { key: up arrow, label: move focus, or select next option }
 *   - { key: home, label: move focus to first option }
 *   - { key: end, label: move focus to last option }
 *   - { key: spacebar, label: toggle focused option }
 *   - { key: ctrl + a, label: ctoggle select all/select none }
 *   - { key: any key, label: search list for option starting with key }
 * ---
 *
 * A group of radio buttons or checkboxes bound to a dataset.
 *
 * @public
 */
@polyfillLifecycles
class SelectList extends React.Component {
  static propTypes = {
    data: PropTypes.array,
    value: PropTypes.oneOfType([PropTypes.any, PropTypes.array]),
    onChange: PropTypes.func,

    /**
     * A handler called when focus shifts on the SelectList. Internally this is used to ensure the focused item is in view.
     * If you want to define your own "scrollTo" behavior or just disable the default one specify an `onMove` handler.
     * The handler is called with the relevant DOM nodes needed to implement scroll behavior: the list element,
     * the element that is currently focused, and a focused value.
     *
     * @type {function(list: HTMLELement, focusedNode: HTMLElement, focusedItem: any)}
     */
    onMove: PropTypes.func,

    /**
     * Whether or not the SelectList allows multiple selection or not. when `false` the SelectList will
     * render as a list of radio buttons, and checkboxes when `true`.
     */
    multiple: PropTypes.bool,

    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,

    itemComponent: CustomPropTypes.elementType,
    busySpinner: PropTypes.node,
    listComponent: CustomPropTypes.elementType,

    groupComponent: CustomPropTypes.elementType,
    groupBy: CustomPropTypes.accessor,

    valueField: CustomPropTypes.accessor,
    textField: CustomPropTypes.accessor,
    busy: PropTypes.bool,
    delay: PropTypes.number,

    autoFocus: PropTypes.bool,
    disabled: CustomPropTypes.disabled.acceptsArray,
    readOnly: CustomPropTypes.disabled,

    listProps: PropTypes.object,
    tabIndex: PropTypes.any,

    /**
     * The HTML `name` attribute used to group checkboxes and radio buttons
     * together.
     */
    name: PropTypes.string,
    isRtl: PropTypes.bool,
    messages: PropTypes.shape({
      emptyList: CustomPropTypes.message,
    }),
  }

  static defaultProps = {
    delay: 250,
    value: [],
    data: [],
    busySpinner: <BusyMask />,
    listComponent: List,
  }

  constructor(...args) {
    super(...args)
    autoFocus(this)

    this.widgetId = instanceId(this, '_widget')
    this.listId = instanceId(this, '_listbox')
    this.activeId = instanceId(this, '_listbox_active_option')
    this.itemName = instanceId(this, '_name')

    this.timeouts = timeoutManager(this)
    this.handleScroll = scrollManager(this, false)
    this.focusManager = focusManager(this, {
      didHandle: this.handleFocusChanged,
    })

    this.state = {}
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { value, data, messages } = nextProps

    let accessors = getAccessors(nextProps)
    let list = reduceToListState(data, prevState.list, { nextProps })

    return {
      list,
      accessors,
      messages: getMessages(messages),
      dataItems: makeArray(value).map(item => accessors.findOrSelf(data, item)),
    }
  }

  handleMouseDown = () => {
    this._clicking = true
  }

  handleFocusChanged = focused => {
    let { data, disabled } = this.props
    let { dataItems, accessors, list } = this.state

    // the rigamarole here is to avoid flicker went clicking an item and
    // gaining focus at the same time.
    if (focused !== this.state.focused) {
      if (!focused) this.setState({ focusedItem: null })
      else if (focused && !this._clicking) {
        let allowed = Array.isArray(disabled)
          ? dataItems.filter(v => !accessors.includes(disabled, v))
          : dataItems

        this.setState({
          focusedItem:
            getFirstValue(data, allowed) || list.nextEnabled(data[0]),
        })
      }
      this._clicking = false
    }
  }

  @widgetEditable
  handleKeyDown = event => {
    let { multiple } = this.props
    let { dataItems, focusedItem, list, accessors } = this.state

    let { keyCode, key, ctrlKey } = event

    let change = item => {
      if (!item) return

      let checked = multiple
        ? !accessors.includes(dataItems, item) // toggle value
        : true

      this.handleChange(item, checked, event)
    }

    notify(this.props.onKeyDown, [event])

    if (event.defaultPrevented) return

    if (key === 'End') {
      event.preventDefault()
      focusedItem = list.last()

      this.setState({ focusedItem })
      if (!multiple) change(focusedItem)
    } else if (key === 'Home') {
      event.preventDefault()
      focusedItem = list.first()

      this.setState({ focusedItem })
      if (!multiple) change(focusedItem)
    } else if (key === 'Enter' || key === ' ') {
      event.preventDefault()
      change(focusedItem)
    } else if (key === 'ArrowDown' || key === 'ArrowRight') {
      event.preventDefault()
      focusedItem = list.next(focusedItem)

      this.setState({ focusedItem })
      if (!multiple) change(focusedItem)
    } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
      event.preventDefault()
      focusedItem = list.prev(focusedItem)

      this.setState({ focusedItem })
      if (!multiple) change(focusedItem)
    } else if (multiple && keyCode === 65 && ctrlKey) {
      event.preventDefault()
      this.selectAll()
    }
  }

  @widgetEditable
  handleKeyPress = event => {
    notify(this.props.onKeyPress, [event])

    if (event.defaultPrevented) return

    this.search(String.fromCharCode(event.which), event)
  }

  handleChange = (item, checked, originalEvent) => {
    let { multiple, onChange } = this.props
    let lastValue = this.state.dataItems

    this.setState({ focusedItem: item })

    if (!multiple)
      return notify(onChange, [
        checked ? item : null,
        {
          originalEvent,
          lastValue,
          checked,
        },
      ])

    let nextValue = checked
      ? lastValue.concat(item)
      : lastValue.filter(v => v !== item)

    notify(onChange, [
      nextValue || [],
      {
        checked,
        lastValue,
        originalEvent,
        dataItem: item,
      },
    ])
  }

  attachListRef = ref => (this.listRef = ref)

  renderListItem = itemProps => {
    const { name, multiple, disabled, readOnly } = this.props
    const { dataItems, accessors } = this.state
    return (
      <SelectListItem
        {...itemProps}
        name={name || this.itemName}
        type={multiple ? 'checkbox' : 'radio'}
        readOnly={disabled === true || readOnly}
        onChange={this.handleChange}
        onMouseDown={this.handleMouseDown}
        checked={accessors.includes(dataItems, itemProps.dataItem)}
      />
    )
  }

  render() {
    let {
      className,
      tabIndex,
      busy,
      data,
      busySpinner,
      itemComponent,
      groupComponent,
      listProps,
    } = this.props

    let elementProps = Props.pickElementProps(this)

    let { focusedItem, focused, accessors, list, messages } = this.state

    let List = this.props.listComponent

    let disabled = this.props.disabled === true,
      readOnly = this.props.readOnly === true

    focusedItem = focused && !disabled && !readOnly && focusedItem

    return (
      <Widget
        {...elementProps}
        id={this.widgetId}
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
        focused={focused}
        disabled={disabled}
        readOnly={readOnly}
        role="radiogroup"
        aria-busy={!!busy}
        aria-activedescendant={this.activeId}
        className={cn(
          className,
          'rw-select-list',
          'rw-widget-input',
          'rw-widget-container'
        )}
      >
        <List
          {...listProps}
          role="radiogroup"
          tabIndex={tabIndex || '0'}
          id={this.listId}
          activeId={this.activeId}
          data={data}
          dataState={list.dataState}
          isDisabled={list.isDisabled}
          textAccessor={accessors.text}
          valueAccessor={accessors.value}
          itemComponent={itemComponent}
          groupComponent={groupComponent}
          optionComponent={this.renderListItem}
          focusedItem={focusedItem}
          onMove={this.handleScroll}
          messages={{ emptyList: messages.emptyList }}
          ref={this.attachListRef}
        />

        {busy && busySpinner}
      </Widget>
    )
  }

  focus() {
    findDOMNode(this.refs.list).focus()
  }

  selectAll() {
    let { accessors } = this

    let { data, disabled, onChange } = this.props
    let values = this.state.dataItems

    disabled = Array.isArray(disabled) ? disabled : []

    let disabledValues
    let enabledData = data

    if (disabled.length) {
      disabledValues = values.filter(v => accessors.includes(disabled, v))
      enabledData = data.filter(v => !accessors.includes(disabled, v))
    }

    let nextValues =
      values.length >= enabledData.length
        ? values.filter(v => accessors.includes(disabled, v))
        : enabledData.concat(disabledValues)

    notify(onChange, [nextValues])
  }

  search(character, originalEvent) {
    let { _searchTerm, list } = this

    let word = ((_searchTerm || '') + character).toLowerCase()
    let multiple = this.props.multiple

    if (!multiple) originalEvent.persist()

    if (!character) return

    this._searchTerm = word

    this.timeouts.set(
      'search',
      () => {
        let focusedItem = list.next(this.state.focusedItem, word)

        this._searchTerm = ''

        if (focusedItem) {
          !multiple
            ? this.handleChange(focusedItem, true, originalEvent)
            : this.setState({ focusedItem })
        }
      },
      this.props.delay
    )
  }
}

export default createUncontrolledWidget(SelectList, { value: 'onChange' }, [
  'selectAll',
  'focus',
])
