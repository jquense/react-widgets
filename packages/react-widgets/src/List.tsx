/* eslint-disable @typescript-eslint/no-empty-function */
import cn from 'classnames'
import PropTypes from 'prop-types'
import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  MutableRefObject,
} from 'react'
import ListOption, { ListOptionProps } from './ListOption'
import ListOptionGroup from './ListOptionGroup'
import { UserProvidedMessages, useMessagesWithDefaults } from './messages'
// import { WidgetHTMLProps } from './shared'
import { DataItem, RenderProp, Value } from './types'
import * as CustomPropTypes from './PropTypes'
import { groupBySortedKeys, makeArray, toItemArray } from './_'
import { Accessors } from './Accessors'
import { useInstanceId } from './WidgetHelpers'
import useMutationObserver from '@restart/hooks/useMutationObserver'
import useCallbackRef from '@restart/hooks/useCallbackRef'
import useMergedRefs from '@restart/hooks/useMergedRefs'

const whitelist = [
  'style',
  'className',
  'role',
  'id',
  'autocomplete',
  'size',
  'tabIndex',
  'maxLength',
  'name',
]

const whitelistRegex = [/^aria-/, /^data-/, /^on[A-Z]\w+/]

function pickElementProps<T>(props: T): Partial<T> {
  const result: Partial<T> = {}
  Object.keys(props).forEach((key) => {
    if (
      whitelist.indexOf(key) !== -1 ||
      whitelistRegex.some((r) => !!key.match(r))
    )
      (result as any)[key] = (props as any)[key]
  })

  return result
}

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

  disabled: CustomPropTypes.disabled.acceptsArray,

  messages: PropTypes.shape({
    emptyList: PropTypes.func.isRequired,
  }),
}

export type GroupBy<TDataItem = unknown> =
  | ((item: TDataItem) => unknown)
  | string

export interface ListHandle {
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

export type OptionComponentProp = React.ComponentType<ListOptionProps<any>>

export type ChangeHandler<TDataItem> = (
  dataItem: TDataItem | TDataItem[],
  metadata: {
    action?: 'insert' | 'remove'
    dataItem?: TDataItem
    lastValue: Value
    originalEvent?: React.SyntheticEvent
  },
) => void

export interface ListProps<TDataItem> {
  data: readonly TDataItem[]
  value?: readonly TDataItem[] | TDataItem
  accessors: Accessors
  focusedItem?: TDataItem
  className?: string
  multiple?: boolean
  disabled?: boolean | readonly TDataItem[]
  messages?: UserProvidedMessages
  renderItem?: RenderItemProp<TDataItem>
  renderGroup?: RenderGroupProp
  searchTerm?: string
  groupBy?: GroupBy<TDataItem>
  optionComponent?: React.ElementType
  onChange: ChangeHandler<TDataItem>
  elementRef?: MutableRefObject<HTMLDivElement | null>
  [key: string]: any
}

declare interface List {
  <TDataItem = DataItem>(
    props: ListProps<TDataItem> & React.RefAttributes<ListHandle>,
  ): React.ReactElement | null

  displayName?: string
  propTypes?: any
}

export const useScrollFocusedIntoView = (
  element: HTMLElement | null,
  observeChanges = false,
) => {
  const scrollIntoView = useCallback(() => {
    if (!element) return

    let selectedItem = element.querySelector('[data-rw-focused]')

    if (selectedItem && selectedItem.scrollIntoView) {
      selectedItem.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }
  }, [element])

  useMutationObserver(
    observeChanges ? element : null,
    {
      subtree: true,
      attributes: true,
      attributeFilter: ['data-rw-focused'],
    },
    scrollIntoView,
  )

  return scrollIntoView
}

export function useHandleSelect<TDataItem>(
  multiple: boolean,
  dataItems: TDataItem[],
  onChange: ChangeHandler<TDataItem>,
) {
  return (dataItem: TDataItem, event: React.SyntheticEvent) => {
    if (multiple === false) {
      onChange(dataItem, {
        dataItem,
        lastValue: dataItems[0],
        originalEvent: event,
      })
      return
    }

    const checked = dataItems.includes(dataItem)
    onChange(
      checked
        ? dataItems.filter((d) => d !== dataItem)
        : [...dataItems, dataItem],
      {
        dataItem,
        lastValue: dataItems,
        action: checked ? 'remove' : 'insert',
        originalEvent: event,
      },
    )
  }
}

const List: List = React.forwardRef(function List<TDataItem>(
  {
    multiple = false,
    data = [],

    value,
    onChange,
    accessors,

    className,
    messages,
    disabled,
    renderItem,
    renderGroup,
    searchTerm,
    groupBy,
    elementRef,
    optionComponent: Option = ListOption,
    renderList,
    // onKeyDown,
    ...props
  }: ListProps<TDataItem>,
  outerRef: React.Ref<ListHandle>,
) {
  const id = useInstanceId()

  const dataItems = makeArray(value, multiple)

  const groupedData = useMemo(
    () => (groupBy ? groupBySortedKeys<TDataItem>(groupBy, data) : undefined),
    [data, groupBy],
  )
  const [element, ref] = useCallbackRef<HTMLDivElement>()
  const disabledItems = toItemArray(disabled)
  const { emptyList } = useMessagesWithDefaults(messages)

  const divRef = useMergedRefs(ref, elementRef)

  const handleSelect = useHandleSelect(multiple, dataItems, onChange)

  const scrollIntoView = useScrollFocusedIntoView(element, true)

  let elementProps = pickElementProps(props)

  useImperativeHandle(outerRef, () => ({ scrollIntoView }), [scrollIntoView])

  function renderOption(item: TDataItem, idx: number) {
    const textValue = accessors.text(item)
    const itemIsDisabled = disabledItems.includes(item)
    const itemIsSelected = dataItems.includes(item)

    return (
      <Option
        dataItem={item}
        key={`item_${idx}`}
        onSelect={handleSelect}
        disabled={itemIsDisabled}
        selected={itemIsSelected}
      >
        {renderItem
          ? renderItem({
              item,
              searchTerm,
              index: idx,
              text: textValue,
              // TODO: probably remove
              value: accessors.value(item),
              disabled: itemIsDisabled,
            })
          : textValue}
      </Option>
    )
  }

  const items = groupedData
    ? groupedData.map(([group, items], idx) => (
        <div role="group" key={`group_${idx}`}>
          <ListOptionGroup>
            {renderGroup ? renderGroup({ group }) : (group as string)}
          </ListOptionGroup>
          {items.map(renderOption)}
        </div>
      ))
    : data.map(renderOption)

  const rootProps = {
    id,
    tabIndex: 0,
    ref: divRef,
    ...elementProps,
    'aria-multiselectable': !!multiple,
    className: cn(className, 'rw-list'),
    role: elementProps.role ?? 'listbox',
    children: React.Children.count(items) ? (
      items
    ) : (
      <div className="rw-list-empty">{emptyList()}</div>
    ),
  }

  return renderList ? renderList(rootProps) : <div {...rootProps} />
})

List.displayName = 'List'
List.propTypes = propTypes

export default List
