import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'

import * as CustomPropTypes from './util/PropTypes'
import * as Props from './util/Props'
import { notify } from './util/widgetHelpers'
import { defaultGetDataState } from './util/reduceToListState'
import Listbox from './Listbox'
import ListOption from './ListOption'
import ListOptionGroup from './ListOptionGroup'
import { getMessages } from './messages'

const EMPTY_DATA_STATE = {}

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

  activeId: PropTypes.string,

  itemComponent: CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
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
    let { sortedKeys, groups } = dataState

    if (!groups) return data.map((item, idx) => fn(item, idx, false))

    let idx = -1
    return sortedKeys.reduce((items, key) => {
      let group = groups[key]

      return items.concat(
        fn(key, idx, true),
        group.map(item => fn(item, ++idx, false))
      )
    }, [])
  }

  move() {
    let { focusedItem, onMove, data, dataState } = this.props
    let list = findDOMNode(this)
    let idx = renderedIndexOf(focusedItem, list, data, dataState)
    let selectedItem = list.children[idx]

    if (selectedItem) notify(onMove, [selectedItem, list, focusedItem])
  }

  renderItem = ({ item, ...rest }) => {
    const { isDisabled, renderItem, textAccessor, valueAccessor } = this.props
    let Component = this.props.itemComponent
    if (renderItem) {
      return renderItem({ item, ...rest })
    } else if (Component) {
      return (
        <Component
          item={item}
          value={valueAccessor(item)}
          text={textAccessor(item)}
          disabled={isDisabled(item)}
          {...rest}
        />
      )
    }
    return textAccessor(item)
  }

  renderGroup = group => {
    const { renderGroup, groupComponent: Component } = this.props
    if (renderGroup) {
      return renderGroup({ group })
    } else if (Component) {
      return <Component item={group} />
    }
    return group
  }

  renderOption(item, index) {
    let {
      activeId,
      focusedItem,
      selectedItem,
      onSelect,
      isDisabled,
      searchTerm,
      optionComponent: Option,
    } = this.props

    let isFocused = focusedItem === item

    return (
      <Option
        dataItem={item}
        key={'item_' + index}
        index={index}
        activeId={activeId}
        focused={isFocused}
        onSelect={onSelect}
        disabled={isDisabled(item)}
        selected={selectedItem === item}
      >
        {this.renderItem({ item, index, searchTerm })}
      </Option>
    )
  }

  render() {
    let { className, messages } = this.props

    let elementProps = Props.pickElementProps(this)
    let { emptyList } = getMessages(messages)

    return (
      <Listbox
        {...elementProps}
        className={className}
        emptyListMessage={emptyList(this.props)}
      >
        {this.mapItems((item, idx, isHeader) => {
          return isHeader ? (
            <ListOptionGroup key={'group_' + item} group={item}>
              {this.renderGroup(item)}
            </ListOptionGroup>
          ) : (
            this.renderOption(item, idx)
          )
        })}
      </Listbox>
    )
  }
}

function renderedIndexOf(item, list, data, dataState) {
  let { groups, sortedKeys } = dataState

  if (!groups) return data.indexOf(item)

  let runningIdx = -1
  let idx = -1

  sortedKeys.some(group => {
    let itemIdx = groups[group].indexOf(item)
    runningIdx++

    if (itemIdx !== -1) {
      idx = runningIdx + itemIdx + 1
      return true
    }

    runningIdx += groups[group].length
  })
  return idx
}

List.propTypes = propTypes
List.defaultProps = defaultProps

export default List
