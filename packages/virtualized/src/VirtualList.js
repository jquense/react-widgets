import cn from 'classnames';
import React from 'react';
import Listbox from 'react-widgets/lib/Listbox';
import BaseVirtualList from 'react-list';
import ListOption from 'react-widgets/lib/ListOption';
import ListOptionGroup from 'react-widgets/lib/ListOptionGroup';
import { groupBySortedKeys } from 'react-widgets/lib/util/_';
import * as CustomPropTypes from 'react-widgets/lib/util/PropTypes';


export const virtualListPropTypes = {
  itemSizeEstimator: React.PropTypes.func,
  itemSizeGetter: React.PropTypes.func,
  pageSize: React.PropTypes.number,
  threshold: React.PropTypes.number,
  type: React.PropTypes.oneOf(['simple', 'variable', 'uniform']),
  useStaticSize: React.PropTypes.bool,
  useTranslate3d: React.PropTypes.bool,
}

class VirtualList extends React.Component {

  static propTypes = {
    ...virtualListPropTypes,

    data: React.PropTypes.array,
    dataState: React.PropTypes.object,
    onSelect: React.PropTypes.func,
    onMove: React.PropTypes.func,

    activeId: React.PropTypes.string,
    optionComponent: CustomPropTypes.elementType,
    renderItem: React.PropTypes.func.isRequired,
    renderGroup: React.PropTypes.func,

    focusedItem: React.PropTypes.any,
    selectedItem: React.PropTypes.any,

    isDisabled: React.PropTypes.func.isRequired,
    textAccessor: React.PropTypes.func.isRequired,

    disabled: CustomPropTypes.disabled.acceptsArray,
    groupBy: CustomPropTypes.accessor,

    messages: React.PropTypes.shape({
      emptyList: CustomPropTypes.message
    })
  }

  static defaultProps = {
    optionComponent: ListOption,
    type: 'variable',
  }

  static getDataState(data, { groupBy }, lastState) {
    let initial = { flatData: data }
    lastState = lastState || initial;

    if (
      lastState.data !== data ||
      lastState.groupBy !== groupBy
    ) {
      if (!groupBy) return initial;

      let keys = [];
      let groups = groupBySortedKeys(groupBy, data, keys);

      let sequentialData = []
      let flatData = []
      keys.forEach(group => {
        let items = groups[group]
        let groupItem = { __isGroup: true, group };
        sequentialData = [...sequentialData, ...items]
        flatData = [...flatData, groupItem, ...items]
      }, []);

      return {
        groups,
        groupBy,
        flatData,
        sequentialData,
        sortedKeys: keys,
      };
    }

    return lastState;
  }

  componentDidMount() {
    this.move()
  }

  componentDidUpdate() {
    this.move()
  }

  renderItems = (items, ref) => {
    let { className } = this.props;
    return (
      <Listbox
        ref={ref}
        className={className}
        style={{ overflow: 'visible', maxHeight: 'none' }}
      >
        {items}
      </Listbox>
    )
  }

  renderItem = (index, key) => {
    let {
        activeId
      , focusedItem
      , selectedItem
      , onSelect
      , dataState
      , renderItem
      , isDisabled
      , optionComponent: OptionComponent } = this.props

    let item = dataState.flatData[index];

    if (item && item.__isGroup)
      return this.renderGroupHeader(item.group)

    let isFocused = focusedItem === item;

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
        {renderItem({ item, index })}
      </OptionComponent>
    )
  }

  render() {
    let {
        type
      , itemSizeGetter
      , itemSizeEstimator
      , pageSize
      , threshold
      , useStaticSize
      , useTranslate3d = true
      , dataState
      , itemHeight
      , focusedItem
      , selectedItem
      , onSelect
      , disabled } = this.props

    let length = dataState.flatData.length;

    return (
      <div
        className={cn(
          'rw-virtual-list-wrapper',
          type === 'uniform' && 'rw-virtual-list-fixed'
        )}
      >
        <BaseVirtualList
          ref='scrollable'
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
          onSelect={onSelect}
          disabled={disabled}
          itemHeight={itemHeight}
        />
      </div>
    )
  }

  renderGroupHeader(group, style) {
    var renderGroup = this.props.renderGroup

    return (
      <ListOptionGroup style={style}>
        {renderGroup({ group })}
      </ListOptionGroup>
    )
  }

  move() {
    let { dataState, focusedItem } = this.props;
    let scrollable = this.refs.scrollable

    let idx  = dataState.flatData.indexOf(focusedItem);

    if (idx === -1) return

    scrollable.scrollAround(idx);
  }
}


export default VirtualList;
