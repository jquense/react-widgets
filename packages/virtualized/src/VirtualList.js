/* eslint-disable react/prop-types */
import cn from 'classnames'
import PropTypes from 'prop-types'
import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useImperativeHandle,
} from 'react'
import useEventCallback from '@restart/hooks/useEventCallback'
import { useAccessors } from 'react-widgets/Accessors'
import BaseVirtualList from 'react-list'
// import Listbox from 'react-widgets/BaseListbox'
import ListOption from 'react-widgets/ListOption'
import { FocusListContext } from 'react-widgets/FocusListContext'
import ListOptionGroup from 'react-widgets/ListOptionGroup'
import { groupBySortedKeys, toItemArray } from 'react-widgets/_'

export const virtualListPropTypes = {
  itemSizeEstimator: PropTypes.func,
  itemSizeGetter: PropTypes.func,
  pageSize: PropTypes.number,
  threshold: PropTypes.number,
  type: PropTypes.oneOf(['simple', 'variable', 'uniform']),
  useStaticSize: PropTypes.bool,
  useTranslate3d: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  onRequestItems: PropTypes.func,
  loadingComponent: PropTypes.elementType,
}

function useFlattenedData(data, groupBy) {
  return useMemo(() => {
    if (!groupBy) return data

    const flatData = []

    let keys = []
    let grouped = groupBySortedKeys(groupBy, data, keys)

    keys.forEach((group) => {
      flatData.push({ __isGroup: group }, ...grouped[group])
    }, [])

    return flatData
  }, [data, groupBy])
}

export function getVirtualListProps({
  type,
  itemSizeGetter,
  itemSizeEstimator,
  pageSize = 20,
  threshold = 300,
  useStaticSize,
  useTranslate3d,
  onRequestItems,
  hasNextPage,
  loadingComponent,
  ...props
}) {
  return {
    props,
    listProps: {
      onRequestItems,
      hasNextPage,
      loadingComponent,
      type,
      itemSizeGetter,
      itemSizeEstimator,
      pageSize,
      threshold,
      useStaticSize,
      useTranslate3d,
    },
  }
}

const VirtualList = React.forwardRef(
  (
    {
      data,
      activeId,
      focusedItem,
      selectedItem,
      onSelect,
      renderItem,
      textField,
      dataKey,

      disabled,
      pageSize,
      onRequestItems,
      searchTerm,
      renderGroup,
      className,
      messages,
      itemSizeGetter,
      itemSizeEstimator,
      threshold,
      useStaticSize,
      useTranslate3d = true,
      itemHeight,
      groupBy,
      type = 'variable',
      hasNextPage = false,
      loadingComponent: LoadingComponent,
      optionComponent: OptionComponent = ListOption,
    },
    ref,
  ) => {
    const innerRef = useRef()
    const accessors = useAccessors(textField, dataKey)
    const listCtx = useContext(OptionsContext)
    const flatData = useFlattenedData(data, groupBy)
    const disabledItems = toItemArray(disabled)

    function renderListbox(items, ref) {
      return (
        <div
          ref={ref}
          className={cn(className, 'rw-virtual-list')}
          emptyListMessage={messages.emptyList({})}
        >
          {items}
        </div>
      )
    }

    function renderOption(index, key) {
      let item = flatData[index]
      let len = flatData.length

      if (hasNextPage === true && index >= len) {
        if (onRequestItems)
          onRequestItems({
            pageSize,
            searchTerm,
            limit: len + pageSize,
            currentIndex: index,
          })

        return (
          <li key={key} className="rw-list-empty rw-list-option-loading">
            {LoadingComponent ? (
              <LoadingComponent key={key} index={index} pageSize={pageSize} />
            ) : (
              'Loading items…'
            )}
          </li>
        )
      }

      if (item && item.__isGroup) {
        return (
          <ListOptionGroup key={key}>
            {renderGroup({ group: item.group, searchTerm })}
          </ListOptionGroup>
        )
      }

      return (
        <OptionComponent
          key={key}
          activeId={activeId}
          dataItem={item}
          // disabled={isDisabled(item)}
          selected={selectedItem === item}
          onSelect={onSelect}
        >
          {renderItem
            ? renderItem({ item, index, searchTerm })
            : accessors.text(item)}
        </OptionComponent>
      )
    }

    let length = flatData.length

    if (hasNextPage === true) length += 1

    const scrollIntoView = useEventCallback(() => {
      if (!innerRef.current) return

      let idx = flatData.indexOf(listCtx?.focusedItem)

      if (idx !== -1) {
        innerRef.current.scrollAround(idx)
      }
    })

    useEffect(() => {
      scrollIntoView()
    }, [listCtx.focusedItem])

    useImperativeHandle(
      ref,
      () => ({
        scrollIntoView,
      }),
      [scrollIntoView],
    )

    return (
      <div
        className={cn(
          'rw-virtual-list-wrapper',
          type === 'uniform' && 'rw-virtual-list-fixed',
        )}
      >
        <BaseVirtualList
          ref={innerRef}
          type={type}
          length={length}
          pageSize={pageSize}
          threshold={threshold}
          useStaticSize={useStaticSize}
          useTranslate3d={useTranslate3d}
          itemRenderer={renderOption}
          itemsRenderer={renderListbox}
          itemSizeGetter={itemSizeGetter}
          itemSizeEstimator={itemSizeEstimator}
          // these are all to break the list's SCU
          focusedItem={focusedItem}
          selectedItem={selectedItem}
          searchTerm={searchTerm}
          onSelect={onSelect}
          disabled={disabled}
          itemHeight={itemHeight}
        />
      </div>
    )
  },
)

export default VirtualList
