import React   from 'react';

import Listbox from './Listbox';
import ListOption from './ListOption';
import { result }  from './util/_';
import compat from './util/compat';
import * as CustomPropTypes from './util/PropTypes';
import * as Props from './util/Props';
import { instanceId, notify } from './util/widgetHelpers';
import { isDisabledItem }  from './util/interaction';
import { defaultGetDataState } from './util/listDataManager';

const EMPTY_DATA_STATE = {}

const propTypes = {
  data: React.PropTypes.array,
  dataState: React.PropTypes.object,
  onSelect: React.PropTypes.func,
  onMove: React.PropTypes.func,

  activeId: React.PropTypes.string,
  optionComponent: CustomPropTypes.elementType,
  itemComponent: CustomPropTypes.elementType,
  groupComponent:  CustomPropTypes.elementType,

  focusedItem: React.PropTypes.any,
  selectedItem: React.PropTypes.any,

  valueAccessor: React.PropTypes.func.isRequired,
  textAccessor: React.PropTypes.func.isRequired,

  disabled: CustomPropTypes.disabled.acceptsArray,

  groupBy: CustomPropTypes.accessor,

  messages: React.PropTypes.shape({
    emptyList: CustomPropTypes.message
  })
}

const defaultProps = {
  onSelect: () => {},
  data: [],
  dataState: EMPTY_DATA_STATE,
  optionComponent: ListOption,
  messages: {
    emptyList: 'There are no items in this list'
  }
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

    return (
      <Listbox
        {...elementProps}
        id={instanceId(this)}
        className={className}
        emptyListMessage={result(messages.emptyList, this.props)}
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
    var GroupComponent = this.props.groupComponent
      , id = instanceId(this);

    return (
      <li
        key={'item_' + group}
        tabIndex='-1'
        role="separator"
        id={id + '_group_' + group}
        className='rw-list-optgroup'
      >
        { GroupComponent ? <GroupComponent item={group}/> : group }
      </li>
    )
  }

  renderItem(item, idx) {
    let {
        activeId
      , focusedItem
      , selectedItem
      , onSelect
      , disabled
      , textAccessor
      , valueAccessor
      , itemComponent: ItemComponent
      , optionComponent: Option } = this.props

    let isDisabled = isDisabledItem(item, disabled, valueAccessor);
    let isFocused = focusedItem === item;
    let id = isFocused ? activeId : undefined;

    return (
      <Option
        key={'item_' + idx}
        id={id}
        dataItem={item}
        focused={isFocused}
        disabled={isDisabled}
        selected={selectedItem === item}
        onClick={isDisabled ? undefined : e => onSelect(item, e)}
      >
        {ItemComponent
          ? <ItemComponent
              item={item}
              value={valueAccessor(item)}
              text={textAccessor(item)}
              disabled={isDisabled}
            />
          : textAccessor(item)
        }
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
