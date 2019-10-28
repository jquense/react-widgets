import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { useImperativeHandle, useMemo, useRef, useState } from 'react'
import { useUncontrolled } from 'uncontrollable'
import useEventCallback from '@restart/hooks/useEventCallback'
import { caretDown } from './Icon'
import Input from './Input'
import Listbox from './Listbox'
import Popup from './Popup'
import Select from './Select'
import Widget from './Widget'
import WidgetPicker from './WidgetPicker'
import { useMessagesWithDefaults } from './messages'
import { useActiveDescendant } from './util/A11y'
import * as Filter from './util/Filter'
import * as CustomPropTypes from './util/PropTypes'
import { useAccessors } from './util/getAccessors'
import {
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

let propTypes = {
  ...Filter.propTypes,
  value: PropTypes.any,
  onChange: PropTypes.func,
  open: PropTypes.bool,
  onToggle: PropTypes.func,

  renderListItem: PropTypes.func,
  listComponent: CustomPropTypes.elementType,

  renderListGroup: PropTypes.func,
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

const defaultProps = {
  data: [],
  defaultValue: '',
  defaultOpen: false,
  filter: true,
  delay: 500,
  selectIcon: caretDown,
  listComponent: Listbox,
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
const Combobox = React.forwardRef((uncontrolledProps, outerRef) => {
  const {
    id,
    autoSelectMatches,
    autoFocus,
    textField,
    valueField,
    open,
    value,
    filter,
    minLength,
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
    onSelect,
    onChange,
    onToggle,
    onKeyDown,
    inputProps,
    listProps,
    renderListItem,
    renderListGroup,
    optionComponent,
    listComponent: List,
    data: rawData,
    messages: userMessages,
    groupBy: _,
    ...elementProps
  } = useUncontrolled(uncontrolledProps, {
    open: 'onToggle',
    value: 'onChange',
  })

  const ref = useRef()
  const inputRef = useRef()
  const listRef = useRef()

  const [suggestion, setSuggestion] = useState(null)
  const shouldFilter = useRef(false)

  const inputId = useInstanceId(id, '_input')
  const listId = useInstanceId(id, '_listbox')
  const activeId = useInstanceId(id, '_listbox_active_option')

  const accessors = useAccessors(textField, valueField)
  const messages = useMessagesWithDefaults(userMessages)
  const toggle = useDropodownToggle(open, onToggle)

  const [focusEvents, focused] = useFocusManager(ref, uncontrolledProps, {
    didHandle(focused) {
      if (!focused) {
        shouldFilter.current = false
        toggle.close()
        setSuggestion(null)
        setFocusedItem(null)
      } else {
        focus()
      }
    },
  })

  const data = useFilteredData(
    value,
    rawData,
    filter,
    shouldFilter.current ? accessors.text(value) : null,
    minLength,
    caseSensitive,
    accessors.text,
  )

  const selectedItem = useMemo(() => data[accessors.indexOf(data, value)], [
    data,
    value,
    accessors,
  ])

  const list = useList(data, { nextProps: uncontrolledProps })

  const [focusedItem, setFocusedItem] = useFocusedItem(
    selectedItem,
    data,
    list,
    null,
  )

  useActiveDescendant(ref, activeId, open, [focusedItem])

  const isDisabled = disabled === true
  const isReadOnly = !!readOnly

  /**
   * Handlers
   */

  const useEditableCallback = createEditableCallback(
    isDisabled || isReadOnly,
    ref,
  )

  const handleScroll = useScrollManager(ref)

  const handleSelect = useEditableCallback((data, originalEvent) => {
    toggle.close()
    shouldFilter.current = false

    setSuggestion(null)
    notify(onSelect, [data, { originalEvent }])
    change(data, originalEvent)
    focus()
  })

  const handleInputKeyDown = ({ key }) => {
    if (key === 'Backspace' || key === 'Delete') {
      setFocusedItem(null)
    }
  }

  const handleInputChange = event => {
    let idx = -1
    if (autoSelectMatches)
      idx = Filter.indexOf(rawData, {
        minLength,
        filter: 'eq',
        caseSensitive: false,
        searchTerm: event.target.value,
        textField: accessors.text,
      })

    shouldFilter.current = true

    setSuggestion(null)

    change(idx === -1 ? event.target.value : rawData[idx], event)
    toggle.open()
  }

  const handleKeyDown = useEditableCallback(e => {
    let { key, altKey, shiftKey } = e

    notify(onKeyDown, [e])

    if (e.defaultPrevented) return

    const select = item => item != null && handleSelect(item, e)
    const setFocused = item => {
      setSuggestion(item)
      setFocusedItem(item)
    }

    if (key === 'End' && open && !shiftKey) {
      e.preventDefault()
      setFocused(list.last())
    } else if (key === 'Home' && open && !shiftKey) {
      e.preventDefault()
      setFocused(list.first())
    } else if (key === 'Escape' && open) {
      e.preventDefault()
      toggle.close()
    } else if (key === 'Enter' && open) {
      e.preventDefault()
      select(focusedItem)
    } else if (key === 'ArrowDown') {
      e.preventDefault()
      if (open) {
        let nextFocusedItem = list.next(focusedItem)
        setFocused(nextFocusedItem === focusedItem ? null : nextFocusedItem)
      } else {
        return toggle.open()
      }
    } else if (key === 'ArrowUp') {
      e.preventDefault()
      if (altKey) return toggle.close()

      if (open) {
        let prevFocusedItem = list.prev(focusedItem)
        setFocused(prevFocusedItem === focusedItem ? null : prevFocusedItem)
      }
    }
  })

  // The EventCallback is required b/c Popup blocks updates
  let handleHoverOption = useEventCallback(item => {
    if (!open) return
    setFocusedItem(item)
  })

  /**
   * Methods
   */

  function focus() {
    inputRef.current?.focus()
  }

  function change(nextValue, originalEvent) {
    notify(onChange, [
      nextValue,
      {
        lastValue: value,
        originalEvent,
      },
    ])
  }

  /**
   * Rendering
   */

  useImperativeHandle(outerRef, () => ({
    focus,
  }))

  let shouldRenderPopup = useFirstFocusedRender(focused, open)

  let valueItem = accessors.findOrSelf(data, value)
  let inputValue = accessors.text(suggestion || valueItem)

  let completeType = filter ? 'list' : ''

  return (
    <Widget
      {...elementProps}
      ref={ref}
      open={open}
      isRtl={isRtl}
      dropUp={dropUp}
      focused={focused}
      disabled={isDisabled}
      readOnly={isReadOnly}
      {...focusEvents}
      onKeyDown={handleKeyDown}
      className={cn(className, 'rw-combobox')}
    >
      <WidgetPicker className={containerClassName}>
        <Input
          {...inputProps}
          role="combobox"
          name={name}
          id={inputId}
          className={cn(
            inputProps?.className,
            'rw-widget-input rw-combobox-input',
          )}
          autoFocus={autoFocus}
          tabIndex={tabIndex}
          disabled={isDisabled}
          readOnly={isReadOnly}
          aria-busy={!!busy}
          aria-owns={listId}
          aria-autocomplete={completeType}
          aria-expanded={open}
          aria-haspopup={true}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          ref={inputRef}
        />
        <Select
          bordered
          busy={busy}
          icon={selectIcon}
          spinner={busySpinner}
          onClick={toggle}
          disabled={disabled || readOnly}
          // FIXME
          label={messages.openCombobox(uncontrolledProps)}
        />
      </WidgetPicker>

      {shouldRenderPopup && (
        <Popup
          open={open}
          dropUp={dropUp}
          transition={popupTransition}
          onEntering={() => listRef.current?.move()}
        >
          <List
            {...listProps}
            id={listId}
            activeId={activeId}
            data={data}
            dataState={list.dataState}
            isDisabled={list.isDisabled}
            textAccessor={accessors.text}
            valueAccessor={accessors.value}
            renderListItem={renderListItem}
            renderListGroup={renderListGroup}
            optionComponent={optionComponent}
            selectedItem={selectedItem}
            focusedItem={open ? focusedItem : null}
            searchTerm={accessors.text(value) || ''}
            aria-hidden={!open}
            aria-labelledby={inputId}
            aria-live={open && 'polite'}
            onSelect={handleSelect}
            onHoverOption={handleHoverOption}
            onMove={handleScroll}
            ref={listRef}
            messages={{
              emptyList: rawData.length
                ? messages.emptyFilter
                : messages.emptyList,
            }}
          />
        </Popup>
      )}
    </Widget>
  )
})

Combobox.displayName = 'Combobox'
Combobox.propTypes = propTypes
Combobox.defaultProps = defaultProps
export default Combobox
