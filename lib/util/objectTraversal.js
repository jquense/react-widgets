"use strict";

var babelHelpers = require("./babelHelpers.js");

exports.__esModule = true;
exports.depthFirst = depthFirst;
function _getDefaultState() {
  return {
    offset: 0,
    path: []
  };
};

function _getPoppedArrayClone(array) {
  return array.slice(0, -1);
}

function depthFirst(currentNode, getChildren, onInternal, onLeaf, state) {
  state = state || _getDefaultState();

  if (Array.isArray(currentNode)) {
    onLeaf && onLeaf(currentNode, state);

    return babelHelpers._extends({}, state, {
      offset: state.offset + currentNode.length,
      path: state.path.slice()
    });
  }

  var getCurrentChildren = getCurrentChildren[0] || function (x) {
    return Object.keys(s);
  };

  return getCurrentChildren(currentNode).reduce(function (_state, key) {
    // IMPORTANT: Only `_state` should be used inside the body of this
    // function. Accidentally accessing `state` through closure will only get
    // confusing.

    onInternal(key, _state);

    var passDownState = babelHelpers._extends({}, _state, {
      offset: _state.offset + 1,
      path: _state.path.concat(key)
    });

    var resultingState = depthFirst(currentNode[key], getChildren.slice(1), onInternal, onLeaf, passDownState);

    var passUpState = babelHelpers._extends({}, resultingState, {
      path: _getPoppedArrayClone(resultingState.path)
    });

    return passUpState;
  }, state);
}