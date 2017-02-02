import React   from 'react';

import compat from './util/compat';
import * as CustomPropTypes from './util/PropTypes';
import * as Props from './util/Props';
import { notify } from './util/widgetHelpers';
import { defaultGetDataState } from './util/listDataManager';
import Listbox from './Listbox';
import ListOption from './ListOption';
import ListOptionGroup from './ListOptionGroup'
import { getMessages } from './messages';

const EMPTY_DATA_STATE = {}

const propTypes = {
  data: React.PropTypes.array,
  dataState: React.PropTypes.object,
  onSelect: React.PropTypes.func,
  onMove: React.PropTypes.func,

  activeId: React.PropTypes.string,
  optionComponent: CustomPropTypes.elementType,
  renderItem: React.PropTypes.func.isRequired,
  renderGroup:  React.PropTypes.func,

  focusedItem: React.PropTypes.any,
  selectedItem: React.PropTypes.any,

  isDisabled: React.PropTypes.func.isRequired,
  groupBy: CustomPropTypes.accessor,

  messages: React.PropTypes.shape({
    emptyList: React.PropTypes.func.isRequired,
  })
}

const defaultProps = {
  onSelect: () => {},
  data: [],
  dataState: EMPTY_DATA_STATE,
  optionComponent: ListOption,
}

class List extends React.Component {

  static getDataState = defaultGetDataState

  componentDidMount() {
    this.move()
  }

  componentDidUpdate() {
    this.move()
  }

  mapItems(fn) {
    const { data, dataState } = this.props
    let { sortedKeys, groups } = dataState;

    if (!groups)
      return data.map((item, idx) => fn(item, idx, false))

    let idx = -1

    return sortedKeys.reduce((items, key) => {
      let group = groups[key]

      return items.concat(
        fn(key, idx, true),
        group.map(item => fn(item, ++idx, false))
      )
    }, [])
  }

  render() {
    let { className, messages } = this.props

    let elementProps = Props.pickElementProps(this);
    let { emptyList } = getMessages(messages)

    return (
      <Listbox
        {...elementProps}
        className={className}
        emptyListMessage={emptyList(this.props)}
      >
        {this.mapItems((item, idx, isHeader) => {
          return isHeader ?
            this.renderGroupHeader(item) :
            this.renderItem(item, idx)
        })}
      </Listbox>
    )
  }

  renderGroupHeader(group) {
    let { renderGroup } = this.props;
    return (
      <ListOptionGroup
        key={'group_' + group}
        group={group}
      >
        {renderGroup({ group })}
      </ListOptionGroup>
    )
  }

  renderItem(item, idx) {
    let {
        activeId
      , focusedItem
      , selectedItem
      , onSelect
      , isDisabled
      , renderItem
      , optionComponent: Option } = this.props

    let isFocused = focusedItem === item;

    return (
      <Option
        dataItem={item}
        key={'item_' + idx}
        activeId={activeId}
        focused={isFocused}
        onSelect={onSelect}
        disabled={isDisabled(item)}
        selected={selectedItem === item}
      >
        {renderItem({ item })}
      </Option>
    )
  }


  move() {
    let { focusedItem, onMove, data, dataState } = this.props;
    let list = compat.findDOMNode(this);
    let idx = renderedIndexOf(focusedItem, list, data, dataState)
    let selectedItem = list.children[idx]

    if (selectedItem)
      notify(onMove, [selectedItem, list, focusedItem])
  }
}

function renderedIndexOf(item, list, data, dataState) {
  let { groups, sortedKeys } = dataState

  if (!groups) return data.indexOf(item)

  let runningIdx = -1
  let idx = -1

  sortedKeys.some(group => {
    let itemIdx = groups[group].indexOf(item)
    runningIdx++;

    if (itemIdx !== -1) {
      idx = runningIdx + itemIdx + 1;
      return true
    }

    runningIdx += groups[group].length
  })
  return idx;
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
