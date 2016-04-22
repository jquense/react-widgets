function _getDefaultState() {
  return {
    offset: 0,
    path: [],
  };
};

function _getPoppedArrayClone(array) {
  const clone = array.slice();
  clone.pop();

  return clone;
}

export function depthFirst(currentNode, getChildren, onInternal, onLeaf, state) {
  state = state || _getDefaultState();

  if (Array.isArray(currentNode)) {
    onLeaf && onLeaf(currentNode, state);

    return Object.assign({}, state, {
      offset: state.offset + currentNode.length,
      path: state.path.slice(),
    });
  }

  return getChildren(currentNode).reduce(
    (_state, key) => {
      // IMPORTANT: Only `_state` should be used inside the body of this
      // function. Accidentally accessing `state` through closure will only get
      // confusing.

      onInternal(key, _state);

      const passDownState = Object.assign({}, _state, {
        offset: _state.offset + 1,
        path: _state.path.concat(key),
      });

      const resultingState = depthFirst(
        currentNode[key],
        getChildren,
        onInternal,
        onLeaf,
        passDownState
      );

      const passUpState = Object.assign({}, resultingState, {
        path: _getPoppedArrayClone(resultingState.path),
      });

      return passUpState;
    },
    state
  );
}
