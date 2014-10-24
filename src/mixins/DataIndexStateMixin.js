var React  = require('react')
  , filter = require('../util/filter')
  , helper = require('../mixins/DataHelpersMixin')
  , setter = require('../util/stateSetter')
  , compose = require('../util/compose')
  , directions = require('../util/constants').directions
  , _      = require('lodash');



module.exports = function(stateKey, disabled) {
  var methodName = stateKey.charAt(0).toUpperCase() + stateKey.substr(1)

    , ifValueChanges = compose.provided(function(props){
        return !_.isEqual(props.value, this.props.value)
      })

    , indexExists = compose.provided(function(idx){
        return idx >= 0
      })

  var setIndex = indexExists(setter(stateKey))

  var mixin = {
  
    propTypes: {
      data:          React.PropTypes.array,
      value:         React.PropTypes.any
    }
  }

  mixin['set' + methodName] = fluent(setIndex)

  mixin['prev' + methodName] = function(nextIdx){
    var data = this._data()
      , stateIdx = this.state && this.state[stateKey] || 0;
    
    nextIdx = (nextIdx === undefined ? stateIdx : nextIdx) -1;

    while( nextIdx > -1 && isDisabled(this, data[nextIdx])) nextIdx--

    if ( nextIdx < 0 ) 
      nextIdx = disabled ? -1 : 0
    
    return nextIdx;
  }

  mixin['next' + methodName] = function(nextIdx){
    var data = this._data()
      , stateIdx = this.state && this.state[stateKey] || 0;

    nextIdx = (nextIdx === undefined ? stateIdx : nextIdx) + 1

    while( nextIdx < data.length && isDisabled(this, data[nextIdx])) nextIdx++

    if ( nextIdx >= data.length )
      nextIdx = disabled ? -1 : data.length - 1;

    return nextIdx;
  }

  function isDisabled(ctx, item){
    return disabled && ctx[disabled](item)
  }

  return mixin;
}

function fluent(fn){
  return function(){
    fn.apply(this, arguments)
    return this
  }
}