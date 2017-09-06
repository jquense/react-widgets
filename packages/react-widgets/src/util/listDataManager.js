import React from 'react';
import { spyOnComponent } from 'react-component-managers';

import { presets } from './Filter';
import { groupBySortedKeys }  from './_';
import accessorManager from './accessorManager';

const EMPTY_VALUE = {};

export function normalizeComponent(Component) {
  return (itemProps) => (
    Component
      ? <Component {...itemProps} />
      : (itemProps.text || itemProps.item)
  )
}

export function defaultGetDataState(data, { groupBy }, lastState = {}) {
  if (
    lastState.data !== data ||
    lastState.groupBy !== groupBy
  ) {
    if (!groupBy) return {};

    let keys = [];
    let groups = groupBySortedKeys(groupBy, data, keys);

    return {
      data,
      groupBy,
      groups,
      sortedKeys: keys,
      sequentialData: Object.keys(groups)
        .reduce((flat, grp) => flat.concat(groups[grp]), [])
    };
  }

  return lastState;
}

function defaultGetStateGetterFromList({ listComponent }) {
  return listComponent && listComponent.getDataState;
}

export default function listDataManager(component, {
  getDataState,
  getStateGetterFromProps,
  accessors = accessorManager(component)
} = {}) {

  let listData;
  let listState;
  let needsUpdate = true;
  let currentProps = component.props;

  if (getDataState)
    getStateGetterFromProps = null;
  else  {
    if (!getStateGetterFromProps)
      getStateGetterFromProps = defaultGetStateGetterFromList

    getDataState = getStateGetterFromProps(currentProps) || defaultGetDataState
  }

  spyOnComponent(component, {
    componentWillReceiveProps(nextProps) {
      if (!needsUpdate)
        needsUpdate = nextProps !== currentProps;

      currentProps = nextProps;

      if (needsUpdate && getStateGetterFromProps) {
        getDataState = getStateGetterFromProps(currentProps) || defaultGetDataState
      }
    },

    componentWillUnmount() {
      listData = null;
      listState = null;
      currentProps = null;
      getDataState = null;
      getStateGetterFromProps = null;
    }
  })

  function isDisabled(item) {
    let disabled = currentProps.disabled
    if (!Array.isArray(disabled)) return false;

    return disabled.some(disabled =>
      accessors.value(item) === accessors.value(disabled))
  }

  function getMatcher(word) {
    if (!word) return ()=> true

    word = word.toLowerCase()
    return item => presets.startsWith(accessors.text(item).toLowerCase(), word)
  }

  function getSequentialData() {
    let state = manager.getState();
    return (state && state.sequentialData) || listData
  }

  let renderItem = ({ item, ...rest }) => { // eslint-disable-line react/prop-types
    let Component = currentProps.itemComponent
    return Component ? (
      <Component
        item={item}
        value={accessors.value(item)}
        text={accessors.text(item)}
        disabled={isDisabled(item)}
        {...rest}
      />
    ) : accessors.text(item)
  }

  let renderGroup = ({ group }) => { // eslint-disable-line react/prop-types
    let Component = currentProps.groupComponent
    return Component ? <Component item={group} /> : group
  }

  let manager = {
    isDisabled,

    first() {
      return manager.next(EMPTY_VALUE)
    },

    last() {
      let data = getSequentialData()
      return manager.prevEnabled(data[data.length - 1])
    },

    prevEnabled(item) {
      return isDisabled(item) ? manager.prev(item) : item;
    },

    prev(item, word) {
      let data = getSequentialData()
      let matches = getMatcher(word)
      let nextIdx = data.indexOf(item)

      if (nextIdx < 0 || nextIdx == null)
        nextIdx = 0

      nextIdx--;

      while (nextIdx > -1 && (isDisabled(data[nextIdx]) || !matches(data[nextIdx])))
        nextIdx--

      if (nextIdx >= 0) return data[nextIdx]
      if (!manager.isDisabled(item)) return item;
    },

    next(item, word) {
      let data = getSequentialData()
      let matches = getMatcher(word)
      let nextIdx = data.indexOf(item) + 1
      let len = data.length

      while (nextIdx < len && (isDisabled(data[nextIdx]) || !matches(data[nextIdx])))
        nextIdx++

      if (nextIdx < len) return data[nextIdx]
      if (!manager.isDisabled(item)) return item;
    },

    nextEnabled(item) {
      return isDisabled(item) ? manager.next(item) : item;
    },

    setData(data) {
      if (!needsUpdate)
        needsUpdate = data !== listData;

      listData = data;
    },

    getState() {
      if (needsUpdate) {
        needsUpdate = false;
        listState = getDataState(listData, currentProps, listState)
      }

      return listState
    },

    defaultProps() {
      const { groupBy, optionComponent, searchTerm } = currentProps;

      return {
        groupBy,
        renderItem,
        renderGroup,
        searchTerm,
        optionComponent,
        isDisabled,
        ...currentProps.listProps,
        data: listData,
        dataState: manager.getState(),
      }
    }
  }

  return manager;
}
