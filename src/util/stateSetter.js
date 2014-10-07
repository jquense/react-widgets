"use strict";

module.exports = function stateSetter(key){
  return function(val){
    var state = {}

    state[key] = val
    this.setState(state)
    return this
  }
}