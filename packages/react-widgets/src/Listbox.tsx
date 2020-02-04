/* eslint-disable @typescript-eslint/no-empty-function */
import PropTypes from 'prop-types'
import cn from 'classnames'
import React, { useMemo, useRef } from 'react'
import { useUncontrolledProp } from 'uncontrollable'
import List, { GroupBy, useHandleSelect } from './List'
import { useFocusList, FocusListContext } from './FocusListContext'
import { DataItem, RenderProp, Value } from './types'
import * as CustomPropTypes from './util/PropTypes'
import { makeArray } from './util/_'
import { DataKeyAccessor, TextAccessor } from './util/dataHelpers'
import { useAccessors } from './util/getAccessors'
import { WidgetHTMLProps } from './shared'
import { UserProvidedMessages } from './messages'
import { notify } from './util/widgetHelpers'
import useFocusManager from './util/useFocusManager'
import { useWidgetProps } from './Widget'

const propTypes = {
  data: PropTypes.array,

  dataKey: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,

  onSelect: PropTypes.func,
  onMove: PropTypes.func,
  onHoverOption: PropTypes.func,

  optionComponent: CustomPropTypes.elementType,
  renderItem: PropTypes.func,
  renderGroup: PropTypes.func,

  focusedItem: PropTypes.any,
  selectedItem: PropTypes.any,
  searchTerm: PropTypes.string,

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
  dataItem: TDataItem[],
  metadata: {
    action: 'insert' | 'remove'
    dataItem: TDataItem
    lastValue: Value
    originalEvent?: React.SyntheticEvent
  },
) => void

export interface BaseListboxProps<TDataItem> extends WidgetHTMLProps {
  data: TDataItem[]
  // value: Value
  defaultValue?: Value
  focusedItem?: TDataItem
  className?: string
  multiple?: boolean
  disabled?: boolean | TDataItem[]
  messages?: UserProvidedMessages
  renderItem?: RenderItemProp<TDataItem>
  renderGroup?: RenderGroupProp
  searchTerm?: string
  groupBy?: GroupBy<TDataItem>
  optionComponent?: React.ElementType
  textField?: TextAccessor
  dataKey?: DataKeyAccessor
  // onChange: ChangeHandler<TDataItem>
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
const Listbox: Listbox = React.forwardRef(function Listbox<TDataItem>({
  defaultValue,
  value: propsValue,
  onChange: propsOnChange,

  textField,
  dataKey,

  data,
  onKeyDown,
  onBlur,
  onFocus,
  ...props
}: ListboxProps<TDataItem>) {
  const [value, onChange] = useUncontrolledProp(
    propsValue,
    defaultValue,
    propsOnChange,
  )

  const accessors = useAccessors(textField, dataKey)

  const dataItems = useMemo(
    () => makeArray(value).map(item => accessors.findOrSelf(data, item)),
    [data, value, accessors],
  )
  const ref = useRef<HTMLDivElement>(null)
  const lastItemRef = useRef<TDataItem | null>(dataItems[dataItems.length - 1])

  const list = useFocusList({
    scope: ref,
    anchorItem: lastItemRef.current,
  })

  const handleChange = (dataItem: any, meta: any) => {
    lastItemRef.current = meta.dataItem
    onChange(dataItem, meta)
  }

  const handleSelect = useHandleSelect(
    !!props.multiple,
    dataItems,
    handleChange,
  )

  const [focusEvents, focused] = useFocusManager(
    ref,
    { disabled: props.disabled === true, onBlur, onFocus },
    {
      didHandle(focused) {
        if (!focused) {
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
    disabled: props.disabled === true,
    className: cn(props.className, 'rw-listbox rw-widget rw-widget-container'),
  })

  return (
    <FocusListContext.Provider value={list.context}>
      <List
        {...props}
        {...widgetProps}
        tabIndex={0}
        data={data}
        elementRef={ref}
        value={dataItems}
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
