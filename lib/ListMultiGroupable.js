'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _ListOption = require('./ListOption');

var _ListOption2 = babelHelpers.interopRequireDefault(_ListOption);

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _util_ = require('./util/_');

var _util_2 = babelHelpers.interopRequireDefault(_util_);

var _warning = require('warning');

var _warning2 = babelHelpers.interopRequireDefault(_warning);

var _utilDataHelpers = require('./util/dataHelpers');

var _utilWidgetHelpers = require('./util/widgetHelpers');

var _GroupHeader = require('./GroupHeader');

var _GroupHeader2 = babelHelpers.interopRequireDefault(_GroupHeader);

var _utilObjectTraversal = require('./util/objectTraversal');

var optionId = function optionId(id, idx) {
  return id + '__option__' + idx;
};
var PATH_DELIMITER = '::';

function _stringifyPath(path) {
  return path.join(PATH_DELIMITER);
}

function _getDepthString(depth) {
  return 'rw-list-depth-' + (depth || 0);
}

function _getIn(obj, path) {
  return path.reduce(function (seed, current) {
    return seed && typeof seed === 'object' && seed[current];
  }, obj);
}

function _ensureOrderedKeysExists(obj) {
  if (obj && !obj._orderedKeys) {
    obj._orderedKeys = [];
  }
}

function _pushNewOrderedKey(obj, key) {
  var shouldPushKey = obj && obj._orderedKeys && obj._orderedKeys.indexOf(key) === -1;

  shouldPushKey && obj._orderedKeys.push(key);
}

function _setIn(obj, path, val) {
  var cloned = babelHelpers._extends({}, obj);

  path.reduce(function (seed, current, idx) {
    if (idx == path.length - 1) {
      seed[current] = val;
    } else if (!seed[current]) {
      seed[current] = {};
    }

    _ensureOrderedKeysExists(seed);
    _pushNewOrderedKey(seed, current);

    return seed[current];
  }, cloned);

  return cloned;
}

function _validateOrderedKeyObject(obj) {
  if (!(obj && obj._orderedKeys)) {
    throw new Error("currentNode is null/undefined/falsy, or is missing `_orderedKeys`");
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
    groups._orderedKeys.forEach(function (key) {
      var value = groups[key];

      if (Array.isArray(value)) {
        value.forEach(function (item) {
          return array.push(item);
        });
      } else {
        _flattenGroups(value, array);
      }
    });
  }
}

function _renderHeadersAndItems(groupedObj, renderGroupHeader, renderSingleItem) {
  var outputArray = [];
  var getChildren = function getChildren(obj) {
    return obj._orderedKeys;
  };
  var onInternal = function onInternal(key, state) {
    outputArray.push(renderGroupHeader(key, state));
  };
  var onLeaf = function onLeaf(array, state) {
    array.forEach(function (item, idx) {
      outputArray.push(renderSingleItem(item, state, idx));
    });
  };

  _utilObjectTraversal.depthFirst(groupedObj, getChildren, onInternal, onLeaf);

  return outputArray;
}

function _setFoundIndex(state, foundIndex) {
  return babelHelpers._extends({}, state, {
    foundIndex: foundIndex
  });
}

function _setOffset(state, offset) {
  return babelHelpers._extends({}, state, {
    offset: offset
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

  return currentNode._orderedKeys.reduce(function (_state, key) {
    if (_state.foundIndex) {
      return _state;
    }

    var value = currentNode[key];
    if (!Array.isArray(value)) {
      return _getOrderedIndexHelper(item, value, _setOffset(_state, _state.offset + 1));
    } else {
      var index = value.indexOf(item);

      // NOTE: We're kind of looking ahead one level in the heirarchy,
      // so the index/offset actually needs to be incremented once extra.
      //
      // This could probably be done slightly differently to alleviate that,
      // but that isn't worth doing just yet...
      if (index !== -1) {
        var foundIndex = _state.offset + index + 1;

        return _setFoundIndex(_state, foundIndex);
      } else {
        var offset = _state.offset + value.length + 1;

        return _setOffset(_state, offset);
      }
    }
  }, state);
}

function _getOrderedIndex(item, object) {
  var result = _getOrderedIndexHelper(item, object, {
    foundIndex: undefined,
    offset: 0
  });

  return result.foundIndex || -1;
}

exports['default'] = _react2['default'].createClass({
  displayName: 'List',

  mixins: [require('./mixins/ListMovementMixin'), require('./mixins/AriaDescendantMixin')()],

  propTypes: {
    data: _react2['default'].PropTypes.array,
    onSelect: _react2['default'].PropTypes.func,
    onMove: _react2['default'].PropTypes.func,

    optionComponent: _utilPropTypes2['default'].elementType,
    itemComponent: _utilPropTypes2['default'].elementType,
    groupComponent: _utilPropTypes2['default'].elementType,

    selected: _react2['default'].PropTypes.any,
    focused: _react2['default'].PropTypes.any,

    valueField: _react2['default'].PropTypes.string,
    textField: _utilPropTypes2['default'].accessor,

    optID: _react2['default'].PropTypes.string,

    groupBy: _utilPropTypes2['default'].accessor,

    messages: _react2['default'].PropTypes.shape({
      emptyList: _utilPropTypes2['default'].message
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      optID: '',
      onSelect: function onSelect() {},
      data: [],
      optionComponent: _ListOption2['default'],
      ariaActiveDescendantKey: 'groupedList',
      messages: {
        emptyList: 'There are no items in this list'
      }
    };
  },

  getInitialState: function getInitialState() {
    return {
      groups: this._group(this.props.groupBy, this.props.data)
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var shouldSetState = nextProps.data !== this.props.data || nextProps.groupBy !== this.props.groupBy;

    if (shouldSetState) {
      var groups = this._group(nextProps.groupBy, nextProps.data);

      this.setState({
        groups: groups
      });
    }
  },

  componentDidMount: function componentDidMount() {
    this.move();
  },

  componentDidUpdate: function componentDidUpdate() {
    this.ariaActiveDescendant(this._currentActiveID);
    this.move();
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var role = _props.role;
    var data = _props.data;
    var messages = _props.messages;
    var onSelect = _props.onSelect;
    var selectedIndex = _props.selectedIndex;
    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'role', 'data', 'messages', 'onSelect', 'selectedIndex']);

    var id = _utilWidgetHelpers.instanceId(this);
    var groups = this.state.groups;

    var items = [];
    var idx = -1;
    var group = undefined;

    this._currentActiveID = null;

    if (data.length) {
      items = _renderHeadersAndItems(groups, this._renderGroupHeader, this._renderItem);
    } else {
      items = _react2['default'].createElement(
        'li',
        { className: 'rw-list-empty' },
        _util_2['default'].result(messages.emptyList, this.props)
      );
    }

    return _react2['default'].createElement(
      'ul',
      babelHelpers._extends({
        ref: 'scrollable',
        id: id,
        tabIndex: '-1',
        className: _classnames2['default'](className, 'rw-list', 'rw-list-grouped'),
        role: role === undefined ? 'listbox' : role
      }, props),
      items
    );
  },

  _renderGroupHeader: function _renderGroupHeader(label, state) {
    var depth = state.path.length;
    var pathString = _stringifyPath(state.path);

    var className = 'rw-list-optgroup ' + _getDepthString(depth);
    var id = _utilWidgetHelpers.instanceId(this);
    var key = 'item_' + pathString + '_' + label;

    return _react2['default'].createElement(_GroupHeader2['default'], {
      className: className,
      groupComponent: this.props.groupComponent,
      id: id,
      key: key,
      label: label
    });
  },

  _renderItem: function _renderItem(item, state, idx) {
    var _props2 = this.props;
    var focused = _props2.focused;
    var selected = _props2.selected;
    var onSelect = _props2.onSelect;
    var textField = _props2.textField;
    var valueField = _props2.valueField;
    var ItemComponent = _props2.itemComponent;
    var Option = _props2.optionComponent;

    var currentId = optionId(_utilWidgetHelpers.instanceId(this), state.offset + idx);
    var onClick = onSelect.bind(null, item);

    if (focused === item) {
      this._currentActiveID = currentId;
    }

    var depth = state.path.length;
    var pathString = _stringifyPath(state.path);
    var key = 'item_' + pathString + '_' + idx;

    return _react2['default'].createElement(
      Option,
      {
        key: key,
        id: currentId,
        dataItem: item,
        focused: focused === item,
        selected: selected === item,
        onClick: onClick,
        className: _getDepthString(depth)
      },
      ItemComponent ? _react2['default'].createElement(ItemComponent, {
        item: item,
        value: _utilDataHelpers.dataValue(item, valueField),
        text: _utilDataHelpers.dataText(item, textField)
      }) : _utilDataHelpers.dataText(item, textField)
    );
  },

  _isIndexOf: function _isIndexOf(idx, item) {
    return this.props.data[idx] === item;
  },

  _group: function _group(groupFns, data) {
    return data.reduce(function (seed, current) {
      var path = groupFns.map(function (fn) {
        return fn(current);
      });
      var existingLeaf = _getIn(seed, path) || [];
      var newLeaf = existingLeaf.concat(current);

      return _setIn(seed, path, newLeaf);
    }, {});
  },

  _data: function _data() {
    var groups = this.state.groups;
    var items = [];

    _flattenGroups(groups, items);

    return items;
  },

  move: function move() {
    var selected = this.getItemDOMNode(this.props.focused);

    if (!selected) {
      return;
    }

    _utilWidgetHelpers.notify(this.props.onMove, [selected, _utilCompat2['default'].findDOMNode(this), this.props.focused]);
  },

  getItemDOMNode: function getItemDOMNode(item) {
    if (!item) {
      return undefined;
    }

    var list = _utilCompat2['default'].findDOMNode(this);
    var index = _getOrderedIndex(item, this.state.groups);

    // Conveniently, array[-1] gives undefined, which is just what we want
    return list[index];
  }
});
module.exports = exports['default'];