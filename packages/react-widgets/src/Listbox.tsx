/* eslint-disable @typescript-eslint/no-empty-function */
import PropTypes from 'prop-types'
import cn from 'clsx'
import React, { useMemo, useRef } from 'react'
import { useUncontrolledProp } from 'uncontrollable'
import List, { GroupBy, useHandleSelect } from './List'
import { useFocusList, FocusListContext } from './FocusListContext'
import { DataItem, RenderProp, Value } from './types'
import * as CustomPropTypes from './PropTypes'
import { makeArray } from './_'
import { useAccessors, TextAccessor, DataKeyAccessor } from './Accessors'
import { WidgetHTMLProps } from './shared'
import { UserProvidedMessages } from './messages'
import { notify } from './WidgetHelpers'
import useFocusManager from './useFocusManager'
import { useWidgetProps } from './Widget'

const propTypes = {
  data: PropTypes.array,

  dataKey: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,

  onSelect: PropTypes.func,
  onMove: PropTypes.func,
  onHoverOption: PropTypes.func,

  optionComponent: PropTypes.elementType,
  renderItem: PropTypes.func,
  renderGroup: PropTypes.func,

  focusedItem: PropTypes.any,
  selectedItem: PropTypes.any,
  searchTerm: PropTypes.string,

  /**
   * @example false
   */
  disabled: CustomPropTypes.disabled.acceptsArray,

  messages: PropTypes.shape({
    emptyList: PropTypes.func.isRequired,
  }),
}

export interface ListboxHandle {
  scrollIntoView(): void
}

export type RenderItemProp<TDataItem> = RenderProp<{
  item: TDataItem
  searchTerm?: string
  index: number
  text: string
  value: unknown
  disabled: boolean
}>

export type RenderGroupProp = RenderProp<{
  group: any
}>

export type SingleChangeHandler<TDataItem> = (
  dataItem: TDataItem,
  metadata: {
    lastValue: Value
    originalEvent?: React.SyntheticEvent
  },
) => void

export type MultipleChangeHandler<TDataItem> = (
  dataItem: readonly TDataItem[],
  metadata: {
    action: 'insert' | 'remove'
    dataItem: TDataItem
    lastValue: Value
    originalEvent?: React.SyntheticEvent
  },
) => void

export interface BaseListboxProps<TDataItem> extends WidgetHTMLProps {
  data: TDataItem[]
  defaultValue?: Value
  focusedItem?: TDataItem
  className?: string
  multiple?: boolean
  readOnly?: boolean
  /**
   * @example false
   */
  disabled?: boolean | TDataItem[]
  messages?: UserProvidedMessages
  renderItem?: RenderItemProp<TDataItem>
  renderGroup?: RenderGroupProp
  searchTerm?: string
  groupBy?: GroupBy<TDataItem>
  optionComponent?: React.ElementType
  textField?: TextAccessor
  dataKey?: DataKeyAccessor
}

export interface SingleListboxProps<TDataItem>
  extends BaseListboxProps<TDataItem> {
  value?: Value
  defaultValue?: Value
  multiple?: false
  onChange?: SingleChangeHandler<TDataItem>
}

export interface MultipleListboxProps<TDataItem>
  extends BaseListboxProps<TDataItem> {
  value?: Value[]
  defaultValue?: Value[]
  multiple: true
  onChange?: MultipleChangeHandler<TDataItem>
}

export type ListboxProps<TDataItem> =
  | SingleListboxProps<TDataItem>
  | MultipleListboxProps<TDataItem>

declare interface Listbox {
  <TDataItem = DataItem>(
    props: ListboxProps<TDataItem> & React.RefAttributes<ListboxHandle>,
  ): React.ReactElement | null

  displayName?: string
  propTypes?: any
}
const Listbox: Listbox = React.forwardRef(function ListboxImpl<TDataItem>(
  {
    defaultValue,
    value: propsValue,
    onChange: propsOnChange,

    textField,
    dataKey,

    data,
    onKeyDown,
    disabled,
    readOnly,
    onBlur,
    onFocus,
    multiple,
    ...props
  }: ListboxProps<TDataItem>,
  _outerRef: any,
) {
  const [value, onChange] = useUncontrolledProp(
    propsValue,
    defaultValue,
    propsOnChange,
  )

  const accessors = useAccessors(textField, dataKey)

  const dataItems = useMemo(
    () =>
      makeArray(value, multiple).map((item) =>
        accessors.findOrSelf(data, item),
      ),
    [value, multiple, accessors, data],
  )
  const ref = useRef<HTMLDivElement>(null)
  const lastItemRef = useRef<TDataItem | null>(dataItems[dataItems.length - 1])

  const list = useFocusList({
    scope: ref,
    anchorItem: lastItemRef.current,
  })

  const isDisabled = disabled === true

  const handleChange = (dataItem: any, meta: any) => {
    if (isDisabled || readOnly) return

    lastItemRef.current = meta.dataItem
    onChange(dataItem, meta)
  }

  const handleSelect = useHandleSelect(!!multiple, dataItems, handleChange)

  const [focusEvents, focused] = useFocusManager(
    ref,
    { disabled: isDisabled, onBlur, onFocus },
    {
      didHandle(nextFocused) {
        if (!nextFocused) {
          list.focus(undefined)
        } else {
          focus({ preventScroll: true })
        }
      },
    },
  )

  function focus(opts: FocusOptions) {
    if (ref.current) ref.current.focus(opts)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isDisabled || readOnly) return
    let { key, shiftKey } = e

    notify(onKeyDown, [e])

    if (e.defaultPrevented) return

    if (key === 'End' && !shiftKey) {
      e.preventDefault()
      list.focus(list.last())
    } else if (key === 'Home' && !shiftKey) {
      e.preventDefault()
      list.focus(list.first())
    } else if (key === 'Enter' || key === ' ') {
      e.preventDefault()
      if (list.getFocused()) handleSelect(list.getFocused()!, e)
    } else if (key === 'ArrowDown') {
      e.preventDefault()
      list.focus(list.next())
    } else if (key === 'ArrowUp') {
      e.preventDefault()

      list.focus(list.prev())
    }
  }

  const widgetProps = useWidgetProps({
    focused,
    readOnly,
    disabled: isDisabled,
    className: cn(props.className, 'rw-listbox rw-widget-input rw-widget'),
  })

  return (
    <FocusListContext.Provider value={list.context}>
      <List
        {...props}
        {...widgetProps}
        disabled={disabled}
        tabIndex={isDisabled ? -1 : 0}
        data={data}
        elementRef={ref}
        value={dataItems}
        multiple={multiple}
        accessors={accessors}
        {...focusEvents}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </FocusListContext.Provider>
  )
})

Listbox.displayName = 'Listbox'
Listbox.propTypes = propTypes

export default Listbox
