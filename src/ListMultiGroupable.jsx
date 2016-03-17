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

function _stringifyPath(path) {
  return path.join('>-->'); // seems a little arbitrary, but w/e...
}

function _pathsEqual(path1, path2) {
  return stringify(path1) === stringify(path2);
}

function _pathListContains(pathList, toCheck) {
  const formattedExisting = pathList.map(_stringifyPath);
  const formattedToCheck = _stringifyPath(toCheck);

  return formattedExisting.indexOf(formattedToCheck) !== -1;
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

function _renderGroupHeadersAndItemsToArray(groups, array, processHeader, processItems, traversed, indexOffset) {
  if (!groups || !groups._orderedKeys) { return 0; }

  return groups._orderedKeys.reduce(
    (_offset, key) => {
      const value = groups[key];
      const newlyTraversed = _pushPathStep(traversed, key);

      array.push(
        processHeader(newlyTraversed, key)
      );

      if (Array.isArray(value)) {
        array.push(
          processItems(value, newlyTraversed, _offset)
        );

        return _offset + value.length;
      } else {
        return _renderGroupHeadersAndItemsToArray(
          value,
          array,
          processHeader,
          processItems,
          newlyTraversed,
          _offset
        );
      }
    },
    indexOffset
  );
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
    var keys = [];

    return {
      groups: this._group(this.props.groupBy, this.props.data, keys),

      sortedKeys: keys
    };
  },

  componentWillReceiveProps(nextProps) {
    const keys = [];
    const shouldSetState = nextProps.data !== this.props.data
      || nextProps.groupBy !== this.props.groupBy;

    if (shouldSetState) {
      const groups = this._group(nextProps.groupBy, nextProps.data, keys);

      this.setState({
        groups,
        sortedKeys: keys
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
        className, role, data
      , messages, onSelect, selectedIndex
      , ...props } = this.props
      , id = instanceId(this);

    let { sortedKeys, groups } = this.state;

    let items = []
      , idx = -1
      , group;

    this._currentActiveID = null;

    if (data.length) {
      _renderGroupHeadersAndItemsToArray(
        groups,
        items,
        this._renderGroupHeader,
        this._renderItems,
        undefined,
        0
      );
    }
    else {
      items = <li className='rw-list-empty'>{ _.result(messages.emptyList, this.props) }</li>;
    }

    // console.warn('ListMultiGroupable::render::items', items);

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

  _renderGroupHeader(group, label) {
    var GroupComponent = this.props.groupComponent;
    var id = instanceId(this);

    return (
      <li
        key={'item_' + group}
        tabIndex='-1'
        role="separator"
        id={id + '_group_' + group}
        className='rw-list-optgroup'
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

      // console.warn('ListMultiGroupable::_renderItems::rendered', rendered);

      return rendered;
    });
  },

  _renderItem(group, item, idx){
    let {
        focused, selected, onSelect
      , textField, valueField
      , itemComponent: ItemComponent
      , optionComponent: Option } = this.props

    let currentID = optionId(instanceId(this), idx);

    if (focused === item)
      this._currentActiveID = currentID;

    return (
      <Option
        key={'item_' + group + '_' + idx}
        id={currentID}
        dataItem={item}
        focused={focused === item}
        selected={selected === item}
        onClick={onSelect.bind(null, item)}
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
    )
  },

  _isIndexOf(idx, item){
    return this.props.data[idx] === item
  },

  _group(groupFns, data, paths) {
    // Haven't seen keys start out as anything other than [], but just gonna
    // keep that style going...
    //
    // In this case, keys is going to really be a lot more like 'paths'
    paths = paths || [];
    const pathIsNew = p => !_pathListContains(paths, p);

    const result = data.reduce(
      (seed, current) => {
        const path = groupFns.map(fn => fn(current));
        const existingLeaf = _getIn(seed, path) || [];
        const newLeaf = existingLeaf.concat(current);

        if (pathIsNew(path)) {
          paths.push(path);
        }


        return _setIn(seed, path, newLeaf);
      },
      {}
    );

    // console.warn('ListMultiGroupable::_group::result', result);

    return result;
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
    var list = compat.findDOMNode(this);

    // console.log('ListMultiGroupable::getItemDOMNode::list', list);

    // FIXME: Make this work!
    return undefined;

    var groups = this.state.groups;
    var idx = -1;

    var itemIdx;
    var child;

    this.state.sortedKeys.some(group => {
      itemIdx = groups[group].indexOf(item);
      idx++;

      if (itemIdx !== -1) {
        return !!(child = list.children[idx + itemIdx + 1]);
      }

      idx += groups[group].length;
    });

    return child;
  }

});
