import { spyOnComponent } from 'react-component-managers';

import { presets } from './Filter';
import accessorManager from './accessorManager';

const EMPTY_VALUE = {};


export default function listDataManager(component, {
  getListDataState,
  accessors = accessorManager(component)
} = {}) {

  let listData;
  let listState;
  let needsUpdate = true;
  let updateStateFunc = !getListDataState
  let currentProps = component.props;

  if (updateStateFunc) {
    ({ getListDataState } = currentProps.listComponent)
  }

  spyOnComponent(component, {
    componentWillReceiveProps(nextProps) {
      if (!needsUpdate)
        needsUpdate = nextProps !== currentProps;

      currentProps = nextProps;

      if (
        updateStateFunc &&
        currentProps.listComponent !== nextProps.listComponent
      ) {
        ({ getListDataState } = nextProps.listComponent);
      }
    },

    componentWillUnmount() {
      listData = null;
      listState = null;
      currentProps = null;
      getListDataState = null;
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
        listState = getListDataState(listData, currentProps, listState)
      }

      return listState
    },

    defaultProps() {
      const { groupBy, groupComponent, itemComponent, optionComponent, disabled } = currentProps;
      return {
        groupBy,
        groupComponent,
        itemComponent,
        optionComponent,
        ...currentProps.listProps,
        disabled,
        data: listData,
        dataState: manager.getState()
      }
    }
  }

  return manager;
}
