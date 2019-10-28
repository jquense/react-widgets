import inDOM from 'dom-helpers/canUseDOM'
import PropTypes from 'prop-types'
import React, {
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react'
import BaseListbox from './BaseListbox'
import ListOption, { ListOptionProps } from './ListOption'
import ListOptionGroup from './ListOptionGroup'
import { UserProvidedMessages, useMessagesWithDefaults } from './messages'
import { RenderProp } from './types'
import * as CustomPropTypes from './util/PropTypes'
import * as Props from './util/Props'
import { TextAccessorFn, ValueAccessorFn } from './util/dataHelpers'
import { DataState, defaultGetDataState } from './util/reduceToListState'
import { notify } from './util/widgetHelpers'

const supportsPointerEvents = inDOM && 'PointerEvent' in window

const EMPTY_DATA_STATE = {}

function mapItems<T extends object>(
  data: T[],
  dataState: DataState<T>,
  fn: (
    value: { item: T } | { group: string },
    index: number,
  ) => React.ReactNode,
) {
  let { sortedKeys, groups } = dataState

  if (!groups) {
    return data.map((item, idx) => fn({ item }, idx))
  }

  let idx = -1
  return sortedKeys.reduce(
    (items, group) => {
      let groupItems = groups![group]

      return items.concat(
        fn({ group }, idx),
        groupItems.map(item => fn({ item }, ++idx)),
      )
    },
    [] as React.ReactNode[],
  )
}

function renderedIndexOf(
  item: object,
  data: object[],
  dataState: DataState,
): number {
  let { groups, sortedKeys } = dataState

  if (!groups) {
    return data.indexOf(item)
  }

  let runningIdx = -1
  let idx = -1

  sortedKeys.some(group => {
    let itemIdx = groups![group].indexOf(item)
    runningIdx++

    if (itemIdx !== -1) {
      idx = runningIdx + itemIdx + 1
      return true
    }

    runningIdx += groups![group].length
  })
  return idx
}

function useUncontrolledList(props) {}

const propTypes = {
  data: PropTypes.array,
  dataState: PropTypes.shape({
    sortedKeys: PropTypes.array,
    groups: PropTypes.object,
    data: PropTypes.array,
    sequentialData: PropTypes.array,
  }),
  valueAccessor: CustomPropTypes.accessor,
  textAccessor: CustomPropTypes.accessor,

  onSelect: PropTypes.func,
  onMove: PropTypes.func,
  onHoverOption: PropTypes.func,

  activeId: PropTypes.string,

  optionComponent: CustomPropTypes.elementType,
  renderItem: PropTypes.func,
  renderGroup: PropTypes.func,

  focusedItem: PropTypes.any,
  selectedItem: PropTypes.any,
  searchTerm: PropTypes.string,

  isDisabled: PropTypes.func.isRequired,

  messages: PropTypes.shape({
    emptyList: PropTypes.func.isRequired,
  }),
}

const defaultProps = {
  onSelect: () => {},
  data: [],
  dataState: EMPTY_DATA_STATE,
  optionComponent: ListOption,
}

export const getDataState = defaultGetDataState

interface ListHandle {
  move(): void
}

type RenderItemProp = RenderProp<{
  item: object
  searchTerm?: string
  index: number
  text: string
  value: unknown
  disabled: boolean
}>

type RenderGroupProp = RenderProp<{
  group: string
}>

interface Props {
  data: object[]
  dataState: DataState
  focusedItem: object
  selectedItem: object
  className?: string
  messages: UserProvidedMessages
  isDisabled: (item: object) => boolean
  textAccessor: TextAccessorFn
  valueAccessor: ValueAccessorFn
  renderItem: RenderItemProp
  renderGroup: RenderGroupProp
  activeId?: string
  searchTerm?: string
  optionComponent?: React.ComponentType<ListOptionProps>
  onSelect<T extends object>(dataItem: T): void
  onHoverOption<T extends object>(item: T): void
  onMove<T extends object>(
    selectedElement: Element,
    listElement: HTMLDivElement,
    focusedItem: T,
  ): void
}

const Listbox = React.forwardRef<ListHandle, Props>(
  (
    {
      focusedItem,
      onMove,
      data,
      dataState,
      className,
      messages,
      isDisabled,
      renderItem,
      textAccessor,
      valueAccessor,
      renderGroup,
      activeId,
      selectedItem,
      onSelect,
      searchTerm,
      onHoverOption,
      optionComponent: Option = ListOption,
      onHoverOption: _,
      ...props
    },
    outerRef,
  ) => {
    const ref = useRef<HTMLDivElement>()

    const move = useCallback(() => {
      let list = ref.current
      if (!list) return

      let idx = renderedIndexOf(focusedItem, data, dataState)
      let selectedItem = list.children[idx]

      if (selectedItem) notify(onMove, [selectedItem, list, focusedItem])
    }, [focusedItem, data, dataState])

    const { emptyList } = useMessagesWithDefaults(messages)

    useLayoutEffect(move, [move])

    let elementProps = Props.pickElementProps(props)

    useImperativeHandle(outerRef, () => ({ move }), [move])

    return (
      <BaseListbox
        ref={ref}
        {...elementProps}
        className={className}
        emptyListMessage={emptyList()}
      >
        {mapItems(data, dataState, (detail, idx) => {
          if ('group' in detail)
            return (
              <ListOptionGroup key={`group_${detail.group}`}>
                {renderGroup ? renderGroup(detail) : detail.group}
              </ListOptionGroup>
            )

          let { item } = detail
          let isFocused = focusedItem === item
          let hover =
            onHoverOption &&
            (supportsPointerEvents && onHoverOption
              ? {
                  onPointerEnter(e) {
                    if (e.isPrimary) onHoverOption(item)
                  },
                }
              : {
                  onTouchMove: () => onHoverOption(item),
                  onMouseEnter: () => onHoverOption(item),
                })
          const textValue = textAccessor(item)

          const itemIsDisabled = isDisabled(item)

          return (
            <Option
              {...hover}
              dataItem={item}
              index={idx}
              key={`item_${idx}`}
              activeId={activeId}
              focused={isFocused}
              onSelect={onSelect}
              disabled={itemIsDisabled}
              selected={selectedItem === item}
            >
              {renderItem
                ? renderItem({
                    item,
                    searchTerm,
                    index: idx,
                    text: textValue,
                    value: valueAccessor(item),
                    disabled: itemIsDisabled,
                  })
                : textValue}
            </Option>
          )
        })}
      </BaseListbox>
    )
  },
)

export default Object.assign(Listbox, {
  getDataState,
  defaultProps,
  propTypes,
})
