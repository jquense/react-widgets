import cn from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import BaseVirtualList from 'react-list'
import Listbox from 'react-widgets/lib/BaseListbox'
import ListOption from 'react-widgets/lib/ListOption'
import ListOptionGroup from 'react-widgets/lib/ListOptionGroup'
import * as CustomPropTypes from 'react-widgets/lib/util/PropTypes'
import { groupBySortedKeys } from 'react-widgets/lib/util/_'

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
  loadingComponent: CustomPropTypes.elementType,
}

class VirtualList extends React.Component {
  static propTypes = {
    ...virtualListPropTypes,

    data: PropTypes.array,
    dataState: PropTypes.object,
    onSelect: PropTypes.func,
    onMove: PropTypes.func,

    activeId: PropTypes.string,
    optionComponent: CustomPropTypes.elementType,
    renderItem: PropTypes.func,
    renderGroup: PropTypes.func,

    focusedItem: PropTypes.any,
    selectedItem: PropTypes.any,

    isDisabled: PropTypes.func.isRequired,
    valueAccessor: PropTypes.func.isRequired,
    textAccessor: PropTypes.func.isRequired,

    disabled: CustomPropTypes.disabled.acceptsArray,

    messages: PropTypes.shape({
      emptyList: CustomPropTypes.message,
    }),
  }

  static defaultProps = {
    optionComponent: ListOption,
    type: 'variable',
    hasNextPage: false,
  }

  static getVirtualListProps({
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

  static getDataState(data, { groupBy }, lastState) {
    let initial = { flatData: data }
    lastState = lastState || initial

    if (lastState.data !== data || lastState.groupBy !== groupBy) {
      if (!groupBy) return initial

      let keys = []
      let groups = groupBySortedKeys(groupBy, data, keys)

      let sequentialData = []
      let flatData = []
      keys.forEach(group => {
        let items = groups[group]
        let groupItem = { __isGroup: true, group }
        sequentialData = [...sequentialData, ...items]
        flatData = [...flatData, groupItem, ...items]
      }, [])

      return {
        groups,
        groupBy,
        flatData,
        sequentialData,
        sortedKeys: keys,
      }
    }

    return lastState
  }

  componentDidMount() {
    this.move()
  }

  componentDidUpdate(prevProps) {
    const { valueAccessor, focusedItem, selectedItem } = this.props
    if (
      valueAccessor(prevProps.focusedItem) !== valueAccessor(focusedItem) ||
      valueAccessor(prevProps.selectedItem) !== valueAccessor(selectedItem)
    )
      this.move()
  }

  renderItems = (items, ref) => {
    let { className, messages } = this.props
    return (
      <Listbox
        ref={ref}
        className={cn(className, 'rw-virtual-list')}
        emptyListMessage={messages.emptyList(this.props)}
      >
        {items}
      </Listbox>
    )
  }

  renderItem = (index, key) => {
    let {
      activeId,
      focusedItem,
      selectedItem,
      onSelect,
      dataState,
      renderItem,
      isDisabled,
      pageSize,
      hasNextPage,
      onRequestItems,
      searchTerm,
      renderGroup,
      loadingComponent: LoadingComponent,
      optionComponent: OptionComponent,
    } = this.props

    let item = dataState.flatData[index]
    let len = dataState.flatData.length

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

    let isFocused = focusedItem === item

    return (
      <OptionComponent
        key={key}
        activeId={activeId}
        dataItem={item}
        focused={isFocused}
        disabled={isDisabled(item)}
        selected={selectedItem === item}
        onSelect={onSelect}
      >
        {renderItem({ item, index, searchTerm })}
      </OptionComponent>
    )
  }

  render() {
    let {
      type,
      itemSizeGetter,
      itemSizeEstimator,
      pageSize,
      threshold,
      useStaticSize,
      useTranslate3d = true,
      dataState,
      itemHeight,
      focusedItem,
      selectedItem,
      onSelect,
      hasNextPage,
      searchTerm,
      disabled,
    } = this.props

    let length = dataState.flatData.length

    if (hasNextPage === true) length += 1

    return (
      <div
        className={cn(
          'rw-virtual-list-wrapper',
          type === 'uniform' && 'rw-virtual-list-fixed',
        )}
      >
        <BaseVirtualList
          ref="scrollable"
          type={type}
          length={length}
          pageSize={pageSize}
          threshold={threshold}
          useStaticSize={useStaticSize}
          useTranslate3d={useTranslate3d}
          itemRenderer={this.renderItem}
          itemsRenderer={this.renderItems}
          itemSizeGetter={itemSizeGetter}
          itemSizeEstimator={itemSizeEstimator}
          // these are all to break the list's SCU
          dataState={dataState}
          focusedItem={focusedItem}
          selectedItem={selectedItem}
          searchTerm={searchTerm}
          onSelect={onSelect}
          disabled={disabled}
          itemHeight={itemHeight}
        />
      </div>
    )
  }

  move() {
    let { dataState, focusedItem } = this.props
    let scrollable = this.refs.scrollable

    let idx = dataState.flatData.indexOf(focusedItem)

    if (idx === -1) return

    scrollable.scrollAround(idx)
  }
}

export default VirtualList
