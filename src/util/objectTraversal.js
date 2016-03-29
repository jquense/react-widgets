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

function _depthFirst(currentNode, getChildren, processInternal, processLeaf, state) {
  // I kind of hate this
  state = state || _getDefaultState();

  if (Array.isArray(currentNode)) {
    processLeaf(currentNode, state);

    return Object.assign({}, state, {
      offset: state.offset + currentNode.length,
      path: state.path.slice(),
    });
  }

  return getChildren(currentNode).reduce(
    (_state, key) => {
      processInternal(key, _state);

      const passDownState = Object.assign({}, _state, {
        offset: _state.offset + 1,
        path: _state.path.concat(key),
      });

      const resultingState = _depthFirst(
        currentNode[key],
        getChildren,
        processInternal,
        processLeaf,
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

function _getExampleObject() {
  return {
    a: {
      c: {
        g: [
          { id: 401 },
          { id: 402 },
          { id: 403 },
        ],
        h: [
          { id: 404 },
          { id: 405 },
        ],
      },
      d: {
        i: [
          { id: 406 },
          { id: 407 },
          { id: 408 },
          { id: 409 },
          { id: 410 },
          { id: 411 },
          { id: 412 },
          { id: 413 },
          { id: 414 },
          { id: 415 },
          { id: 416 },
        ],
      },
    },
    b: {
      e: {
        j: [
          { id: 417 },
          { id: 418 },
          { id: 419 },
        ],
        k: [
          { id: 420 },
          { id: 421 },
          { id: 422 },
          { id: 423 },
          { id: 424 },
          { id: 425 },
        ],
        l: [
          { id: 426 },
          { id: 427 },
        ],
      },
      f: {
        m: [
          { id: 428 },
          { id: 429 },
        ],
        n: [
          { id: 430 },
          { id: 431 },
          { id: 432 },
          { id: 433 },
          { id: 434 },
        ],
        o: [
          { id: 435 },
        ],
        p: [
          { id: 436 },
          { id: 437 },
        ],
      },
    },
  }
};

function _doTheThing() {
  const exObj = _getExampleObject();
  const array = [];
  function getChildren(obj) { return Object.keys(obj); }
  function stringifyState(state) {
    return `<state: offset[${state.offset}];path[${state.path.join(':')}];depth[${state.path.length}]>`;
  };
  function processInternal(key, state) {
    array.push(`${stringifyState(state)}    { ${key} }`);
  };
  function processLeaf(leafArray, state) {
    leafArray.forEach(function(item, idx) {
      array.push(`${stringifyState(state)} <localOffset: ${idx}>    { id[${item.id}] } `);
    });
  };

  const resultingState = _depthFirst(
    exObj,
    getChildren,
    processInternal,
    processLeaf
  );

  console.log('resulting state:', resultingState);
  console.log(JSON.stringify(array, undefined, 2));
}

_doTheThing();

module.exports = {
  _depthFirst,
  _doTheThing,
  _getExampleObject,
};
