// import cn from 'classnames'
// import PropTypes from 'prop-types'
// import React, {
//   useEffect,
//   useImperativeHandle,
//   useMemo,
//   useRef,
//   useState,
// } from 'react'
// import { useUncontrolled } from 'uncontrollable'
// import useTimeout from '@restart/hooks/useTimeout'
// import Listbox from './Listbox'
// import SelectListItem from './SelectListItem'
// import Widget from './Widget'
// import { useMessagesWithDefaults } from './messages'
// import { useActiveDescendant } from './util/A11y'
// import * as CustomPropTypes from './util/PropTypes'
// import { makeArray } from './util/_'
// import { useAccessors } from './util/getAccessors'
// import { useAutoFocus, useList } from './util/hooks'
// import { createEditableCallback } from './util/interaction'
// import useFocusManager from './util/useFocusManager'
// import useScrollManager from './util/useScrollManager'
// import { notify, useInstanceId } from './util/widgetHelpers'

// const BusyMask = () => <span className="rw-loading-mask" />

// function getFirstValue(data, values) {
//   if (!values.length) return null

//   for (var idx = 0; idx < data.length; idx++)
//     if (~values.indexOf(data[idx])) return data[idx]

//   return null
// }

// const propTypes = {
//   data: PropTypes.array,
//   value: PropTypes.oneOfType([PropTypes.any, PropTypes.array]),
//   onChange: PropTypes.func,

//   /**
//    * A handler called when focus shifts on the SelectList. Internally this is used to ensure the focused item is in view.
//    * If you want to define your own "scrollTo" behavior or just disable the default one specify an `onMove` handler.
//    * The handler is called with the relevant DOM nodes needed to implement scroll behavior: the list element,
//    * the element that is currently focused, and a focused value.
//    *
//    * @type {function(list: HTMLELement, focusedNode: HTMLElement, focusedItem: any)}
//    */
//   onMove: PropTypes.func,

//   /**
//    * Whether or not the SelectList allows multiple selection or not. when `false` the SelectList will
//    * render as a list of radio buttons, and checkboxes when `true`.
//    */
//   multiple: PropTypes.bool,

//   onKeyDown: PropTypes.func,
//   onKeyPress: PropTypes.func,

//   renderListItem: PropTypes.func,
//   busySpinner: PropTypes.node,
//   listComponent: CustomPropTypes.elementType,

//   renderListGroup: PropTypes.func,
//   groupBy: CustomPropTypes.accessor,

//   dataKey: CustomPropTypes.accessor,
//   textField: CustomPropTypes.accessor,
//   busy: PropTypes.bool,
//   delay: PropTypes.number,

//   autoFocus: PropTypes.bool,
//   disabled: CustomPropTypes.disabled.acceptsArray,
//   readOnly: CustomPropTypes.disabled,

//   listProps: PropTypes.object,
//   tabIndex: PropTypes.any,

//   /**
//    * The HTML `name` attribute used to group checkboxes and radio buttons
//    * together.
//    */
//   name: PropTypes.string,
//   isRtl: PropTypes.bool,
//   messages: PropTypes.shape({
//     emptyList: CustomPropTypes.message,
//   }),
// }

// const defaultProps = {
//   delay: 250,
//   data: [],
//   busySpinner: <BusyMask />,
//   listComponent: Listbox,
// }

// /**
//  * ---
//  * shortcuts:
//  *   - { key: down arrow, label: move focus, or select previous option }
//  *   - { key: up arrow, label: move focus, or select next option }
//  *   - { key: home, label: move focus to first option }
//  *   - { key: end, label: move focus to last option }
//  *   - { key: spacebar, label: toggle focused option }
//  *   - { key: ctrl + a, label: ctoggle select all/select none }
//  *   - { key: any key, label: search list for option starting with key }
//  * ---
//  *
//  * A group of radio buttons or checkboxes bound to a dataset.
//  *
//  * @public
//  */
// const SelectList = React.forwardRef((uncontrolledProps, outerRef) => {
//   const {
//     id,
//     autoFocus,
//     textField,
//     dataKey,
//     data,
//     value,
//     delay,
//     multiple,
//     className,
//     busy,
//     disabled,
//     readOnly,
//     busySpinner,
//     tabIndex,
//     name,
//     onChange,
//     onKeyPress,
//     onKeyDown,
//     listProps,
//     renderListItem,
//     renderListGroup,
//     listComponent: List,
//     messages: userMessages,
//     ...elementProps
//   } = useUncontrolled(uncontrolledProps, { value: 'onChange' })
//   const itemType = multiple ? 'checkbox' : 'radio'
//   const ref = useRef()
//   const listRef = useRef()

//   const clickingRef = useRef(false)
//   const searchingRef = useRef('')

//   const widgetId = useInstanceId(id, '_widget')
//   const listId = useInstanceId(id, '_listbox')
//   const activeId = useInstanceId(id, '_listbox_active_option')
//   const itemName = useInstanceId(id, '_name')

//   const accessors = useAccessors(textField, dataKey)
//   const messages = useMessagesWithDefaults(userMessages)
//   const timeout = useTimeout()

//   useAutoFocus(autoFocus, ref)

//   const handleScroll = useScrollManager(ref)

//   const list = useList(data, { nextProps: uncontrolledProps })

//   const [focusedItem, setFocusedItem] = useState(null)

//   const [focusEvents, focused] = useFocusManager(ref, uncontrolledProps, {
//     didHandle(nextFocused) {
//       // the rigamarole here is to avoid flicker went clicking an item and
//       // gaining focus at the same time.
//       if (nextFocused !== focused) {
//         if (!nextFocused) setFocusedItem(null)
//         else if (nextFocused && !clickingRef.current) {
//           let allowed = Array.isArray(disabled)
//             ? dataItems.filter(v => !accessors.includes(disabled, v))
//             : dataItems
//           setFocusedItem(
//             getFirstValue(data, allowed) || list.nextEnabled(data[0]),
//           )
//         }
//         clickingRef.current = false
//       }
//     },
//   })

//   const dataItems = useMemo(
//     () => makeArray(value).map(item => accessors.findOrSelf(data, item)),
//     [data, value, accessors],
//   )

//   useEffect(() => {
//     const node = ref.current
//     console.log('focus effect', focused, node)
//     if (!node || !focused) return
//     const next = node.querySelector(`[role="${itemType}"][tabindex="0"]`)
//     next?.focus()
//   }, [focusedItem, focused, ref, itemType])

//   useActiveDescendant(ref, activeId, true, [focusedItem])

//   const isDisabled = disabled === true
//   const isReadOnly = !!readOnly

//   const useEditableCallback = createEditableCallback(
//     isDisabled || isReadOnly,
//     ref,
//   )

//   const handleMouseDown = () => {
//     clickingRef.current = true
//   }

//   // @widgetEditable
//   const handleKeyDown = useEditableCallback(event => {
//     let { keyCode, key, ctrlKey } = event

//     let change = item => {
//       if (!item) return

//       let checked = multiple
//         ? !accessors.includes(dataItems, item) // toggle value
//         : true

//       handleChange(item, checked, event)
//     }

//     notify(onKeyDown, [event])

//     if (event.defaultPrevented) return

//     if (key === 'End') {
//       event.preventDefault()
//       const nextFocusedItem = list.last()

//       setFocusedItem(nextFocusedItem)
//       if (!multiple) change(focusedItem)
//     } else if (key === 'Home') {
//       event.preventDefault()
//       const nextFocusedItem = list.first()

//       setFocusedItem(nextFocusedItem)
//       if (!multiple) change(focusedItem)
//     } else if (key === 'Enter' || key === ' ') {
//       event.preventDefault()
//       change(focusedItem)
//     } else if (key === 'ArrowDown' || key === 'ArrowRight') {
//       event.preventDefault()
//       const nextFocusedItem = list.next(focusedItem)

//       setFocusedItem(nextFocusedItem)
//       if (!multiple) change(nextFocusedItem)
//     } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
//       event.preventDefault()
//       const nextFocusedItem = list.prev(focusedItem)

//       setFocusedItem(nextFocusedItem)
//       if (!multiple) change(nextFocusedItem)
//     } else if (multiple && keyCode === 65 && ctrlKey) {
//       event.preventDefault()
//       selectAll()
//     }
//   })

//   const handleKeyPress = useEditableCallback(event => {
//     notify(onKeyPress, [event])

//     if (event.defaultPrevented) return

//     search(String.fromCharCode(event.which), event)
//   })

//   const handleChange = (item, checked, originalEvent) => {
//     let lastValue = dataItems

//     setFocusedItem(item)

//     if (!multiple)
//       return notify(onChange, [
//         checked ? item : null,
//         {
//           originalEvent,
//           lastValue,
//           checked,
//         },
//       ])

//     let nextValue = checked
//       ? lastValue.concat(item)
//       : lastValue.filter(v => v !== item)

//     notify(onChange, [
//       nextValue || [],
//       {
//         checked,
//         lastValue,
//         originalEvent,
//         dataItem: item,
//       },
//     ])
//   }

//   function selectAll() {
//     const disabledItems = Array.isArray(disabled) ? disabled : []

//     let disabledValues
//     let enabledData = data

//     if (disabledItems.length) {
//       disabledValues = dataItems.filter(v =>
//         accessors.includes(disabledItems, v),
//       )
//       enabledData = data.filter(v => !accessors.includes(disabledItems, v))
//     }

//     let nextValues =
//       dataItems.length >= enabledData.length
//         ? dataItems.filter(v => accessors.includes(disabledItems, v))
//         : enabledData.concat(disabledValues)

//     notify(onChange, [nextValues])
//   }

//   useImperativeHandle(
//     outerRef,
//     () => ({
//       selectAll,
//       focus() {
//         listRef.current?.focus()
//       },
//     }),
//     [disabled, dataItems, onChange, data],
//   )

//   function search(character, originalEvent) {
//     let word = `${searchingRef.current}${character}`.toLowerCase()

//     if (!multiple) originalEvent.persist()

//     if (!character) return

//     searchingRef.current = word

//     timeout.set(() => {
//       let nextFocusedItem = list.next(focusedItem, word)

//       searchingRef.current = ''

//       if (nextFocusedItem) {
//         if (!multiple) handleChange(nextFocusedItem, true, originalEvent)
//         else setFocusedItem(nextFocusedItem)
//       }
//     }, delay)
//   }

//   const renderListOption = ({ focused, className, ...itemProps }) => {
//     return (
//       <SelectListItem
//         {...itemProps}
//         tabIndex={focused ? 0 : -1}
//         name={name || itemName}
//         type={itemType}
//         readOnly={disabled === true || readOnly}
//         onChange={handleChange}
//         // onMouseDown={handleMouseDown}
//         className={cn(className, 'rw-select-list-item')}
//         checked={accessors.includes(dataItems, itemProps.dataItem)}
//       />
//     )
//   }

//   return (
//     <Widget
//       {...elementProps}
//       {...focusEvents}
//       id={widgetId}
//       onKeyDown={handleKeyDown}
//       onKeyPress={handleKeyPress}
//       // focused={focused}
//       disabled={disabled}
//       readOnly={readOnly}
//       role="radiogroup"
//       aria-busy={!!busy}
//       aria-activedescendant={activeId}
//       ref={ref}
//       className={cn(
//         className,
//         'rw-select-list',
//         'rw-widget-input',
//         'rw-widget-container',
//       )}
//     >
//       <List
//         {...listProps}
//         role="radiogroup"
//         id={listId}
//         data={data}
//         // tabIndex={tabIndex || '0'}
//         dataState={list.dataState}
//         isDisabled={list.isDisabled}
//         textAccessor={accessors.text}
//         dataKeyAccessor={accessors.value}
//         renderListItem={renderListItem}
//         renderListGroup={renderListGroup}
//         optionComponent={renderListOption}
//         focusedItem={focused && !disabled && !readOnly && focusedItem}
//         onMove={handleScroll}
//         messages={{ emptyList: messages.emptyList }}
//         ref={listRef}
//       />

//       {busy && busySpinner}
//     </Widget>
//   )
// })

// SelectList.propTypes = propTypes
// SelectList.defaultProps = defaultProps

// export default SelectList
