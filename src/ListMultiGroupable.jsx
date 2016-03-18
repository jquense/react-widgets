import React   from 'react';
import ListOption from './ListOption';
import CustomPropTypes from './util/propTypes';
import compat from './util/compat';
import cn from 'classnames';
import _  from './util/_';
import warning from 'warning';
import { dataText, dataValue } from './util/dataHelpers';
import { instanceId, notify } from './util/widgetHelpers';

let optionId = (id, idx)=> `${id}__option__${idx}`;
const PATH_DELIMITER = '>-->'; // Seems a little arbitrary...

function _stringifyPath(path) {
  return path.join(PATH_DELIMITER);
}

function _getIn(obj, path) {
  return path.reduce((seed, current) => {
    return seed && typeof seed === 'object' && seed[current];
  }, obj);
}

function _ensureOrderedKeysExists(obj) {
  if (obj && !obj._orderedKeys) { obj._orderedKeys = []; }
}

function _pushNewOrderedKey(obj, key) {
  const shouldPushKey = obj
    && obj._orderedKeys
    && obj._orderedKeys.indexOf(key) === -1;

  shouldPushKey && obj._orderedKeys.push(key);
}

function _setIn(obj, path, val) {
  // NOTE: Not truly a deep clone, but that doesn't really matter just yet
  const cloned = Object.assign({}, obj);

  path.reduce(
    (seed, current, idx) => {
      if (idx == path.length - 1) {
        seed[current] = val;
      } else if (!seed[current]) {
        seed[current] = {};
      }

      _ensureOrderedKeysExists(seed);
      _pushNewOrderedKey(seed, current);

      return seed[current];
    },
    cloned
  );

  return cloned;
}

function _validateOrderedKeyObject(obj) {
  if (!(obj && obj._orderedKeys)) {
    throw new Error(
      "currentNode is null/undefined/falsy, or is missing `_orderedKeys`"
    );
  }
}

function _pushPathStep(path, nextStep) {
  if (!path || path.trim() === '') {
    return nextStep;
  }

  return _stringifyPath([path, nextStep]);
}

function _flattenGroups(groups, array) {
  if (groups && groups._orderedKeys) {
    groups._orderedKeys.forEach(key => {
      const value = groups[key];

      if (Array.isArray(value)) {
        value.forEach(item => array.push(item));
      } else {
        _flattenGroups(value, array);
      }
    });
  }
}

/*
state: {
  depth:     number,
  offset:    number,
  traversed: string,
}
*/
function __processHeadersAndItems(currentNode, array, processHeader, processItems, state) {
  _validateOrderedKeyObject(currentNode);

  return groups._orderedKeys.reduce(
    (_state, key) => {
      const depth = _state.depth;
      const offset = _state.offset;
      const traversed = _state.traversed;
      const value = currentNode[key];

      const newlyTraversed = _pushPathStep(traversed, key);

      array.push(
        processHeader(newlyTraversed, key, depth);
      );

      if (!Array.isArray(value)) {
        const nextState = Object.assign({}, _state, {
          depth: depth + 1,
        });

        return _processHeadersAndItems(
          value,
          array,
          processHeader,
          processItems,
          nextState,
        );
      } else {
        // TODO: Make sure we don't have the same depth +1 issue here as before
        array.push(
          processItems(value, newlyTraversed, offset, depth)
        );

        return Object.assign({}, _state, {
          offset: offset + value.length,
        });
      }
    },
    state
  );
}

function _renderHeadersAndItems(groupedData, processHeader, processItems) {
  const outputArray = [];
  const initialState = {
    depth: 0,
    offset: 0,
    traversed: '',
  };

  __processHeadersAndItems(
    groupedData,
    outputArray,
    processHeader,
    processItems,
    initialState
  );

  return outputArray;
}

function _setFoundIndex(state, foundIndex) {
  return Object.assign({}, state, {
    foundIndex,
  });
}

function _setOffset(state, offset) {
  return Object.assign({}, state, {
    offset,
  });
}

/*
 state:
 {
   foundIndex: boolean,
   offset:     number
 }
 */
function _getOrderedIndexHelper(item, currentNode, state) {
  _validateOrderedKeyObject(currentNode);

  return currentNode._orderedKeys.reduce(
    (_state, key) => {
      if (_state.foundIndex) { return _state; }

      const value = currentNode[key];
      if (!Array.isArray(value)) {
        return _getOrderedIndexHelper(
          item,
          value,
          _setOffset(_state, _state.offset + 1)
        );
      } else {
        const index = value.indexOf(item);

        // IMPORTANT: We're kind of looking ahead one level in the heirarchy,
        // so the index/offset actually needs to be incremented once extra.
        //
        // This could probably be done slightly differently to alleviate that,
        // but that isn't worth doing just yet...
        if (index !== -1) {
          const foundIndex = _state.offset + index + 1;

          return _setFoundIndex(_state, foundIndex);
        } else {
          const offset = _state.offset + value.length + 1;

          return _setOffset(_state, offset);
        }
      }
    },
    state
  );
}

function _getOrderedIndex(item, object) {
  const result = _getOrderedIndexHelper(item, object, {
    foundIndex: undefined,
    offset: 0,
  });

  return result.foundIndex || -1;
}

export default React.createClass({
  displayName: 'List',

  mixins: [
    require('./mixins/ListMovementMixin'),
    require('./mixins/AriaDescendantMixin')()
  ],

  propTypes: {
    data:           React.PropTypes.array,
    onSelect:       React.PropTypes.func,
    onMove:         React.PropTypes.func,

    optionComponent: CustomPropTypes.elementType,
    itemComponent:   CustomPropTypes.elementType,
    groupComponent:  CustomPropTypes.elementType,

    selected:       React.PropTypes.any,
    focused:        React.PropTypes.any,

    valueField:     React.PropTypes.string,
    textField:      CustomPropTypes.accessor,

    optID:          React.PropTypes.string,

    groupBy:        CustomPropTypes.accessor,

    messages:       React.PropTypes.shape({
      emptyList:    CustomPropTypes.message
    })
  },

  getDefaultProps(){
    return {
      optID:         '',
      onSelect:      function(){},
      data:          [],
      optionComponent: ListOption,
      ariaActiveDescendantKey: 'groupedList',
      messages: {
        emptyList:   'There are no items in this list'
      }
    }
  },

  getInitialState() {
    return {
      groups: this._group(this.props.groupBy, this.props.data),
    };
  },

  componentWillReceiveProps(nextProps) {
    const shouldSetState = nextProps.data !== this.props.data
      || nextProps.groupBy !== this.props.groupBy;

    if (shouldSetState) {
      const groups = this._group(nextProps.groupBy, nextProps.data);

      this.setState({
        groups,
      });
    }
  },

  componentDidMount(){
    this.move()
  },

  componentDidUpdate() {
    this.ariaActiveDescendant(this._currentActiveID)
    this.move()
  },

  render(){
    var {
      className,
      role,
      data,
      messages,
      onSelect,
      selectedIndex,
      ...props
    } = this.props;
    var id = instanceId(this);
    let { groups } = this.state;
    let items = [];
    let idx = -1;
    let group;

    this._currentActiveID = null;

    if (data.length) {
      items = _renderHeadersAndItems(
        groups,
        this._renderGroupHeader,
        this._renderItems
      );
    }
    else {
      items = (
        <li className='rw-list-empty'>
          { _.result(messages.emptyList, this.props) }
        </li>
      );
    }

    return (
      <ul
        ref='scrollable'
        id={id}
        tabIndex='-1'
        className={cn(className, 'rw-list', 'rw-list-grouped')}
        role={role === undefined ? 'listbox' : role }
        { ...props }
      >
        { items }
      </ul>
    )
  },

  _renderGroupHeader(groupKey, label, depth) {
    var GroupComponent = this.props.groupComponent;
    var id = instanceId(this);
    const depthString = `rw-list-optgroup-depth-${depth || 0}`;

    return (
      <li
        key={'item_' + groupKey}
        tabIndex='-1'
        role="separator"
        id={id + '_group_' + groupKey}
        className=`rw-list-optgroup ${depthString}`
      >
        { GroupComponent ? <GroupComponent item={label}/> : label }
      </li>
    )
  },

  _renderItems(items, groupKey, offset) {
    return items.map((current, idx) => {
      const rendered = this._renderItem(
        groupKey,
        current,
        offset + idx
      );

      return rendered;
    });
  },

  _renderItem(group, item, idx, depth) {
    let {
      focused,
      selected,
      onSelect,
      textField,
      valueField,
      itemComponent: ItemComponent,
      optionComponent: Option
    } = this.props
    let currentID = optionId(instanceId(this), idx);
    const onClick = onSelect.bind(null, item);
    const depthString = `rs-list-opttion-depth-${depth || 0}`;

    if (focused === item) {
      this._currentActiveID = currentID;
    }

    return (
      <Option
        key={'item_' + group + '_' + idx}
        id={currentID}
        dataItem={item}
        focused={focused === item}
        selected={selected === item}
        onClick={onClick}
        className={depthString}
      >
        { ItemComponent
            ? <ItemComponent
                item={item}
                value={dataValue(item, valueField)}
                text={dataText(item, textField)}
              />
            : dataText(item, textField)
        }
      </Option>
    );
  },

  _isIndexOf(idx, item){
    return this.props.data[idx] === item;
  },

  _group(groupFns, data) {
    return data.reduce(
      (seed, current) => {
        const path = groupFns.map(fn => fn(current));
        const existingLeaf = _getIn(seed, path) || [];
        const newLeaf = existingLeaf.concat(current);

        return _setIn(seed, path, newLeaf);
      },
      {}
    );
  },

  _data() {
    const groups = this.state.groups;
    const items = [];

    _flattenGroups(groups, items);

    return items;
  },

  move() {
    const selected = this.getItemDOMNode(this.props.focused);

    if (!selected) { return; }

    notify(
      this.props.onMove,
      [selected, compat.findDOMNode(this), this.props.focused]
    );
  },

  getItemDOMNode(item) {
    const list = compat.findDOMNode(this);
    const index = _getOrderedIndex(item, this.state.groups);

    // Conveniently, someArray[-1] gives undefined, which is just what we want
    return list[index];
  }
});
