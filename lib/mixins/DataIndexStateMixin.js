var React  = require('react')
  , filter = require('../util/filter')
  , helper = require('../mixins/DataHelpersMixin')
  , setter = require('../util/stateSetter')
  , compose = require('../util/compose')
  , directions = require('../util/constants').directions
  , _      = require('lodash');



module.exports = function(stateKey) {
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

  mixin['prev' + methodName] = function(){
    var data = this._data()
      , nextIdx = this.state && this.state[stateKey] || 0;

    nextIdx -= 1

    if ( nextIdx < 0 )
      nextIdx = 0
    
    return nextIdx;
  }

  mixin['next' + methodName] = function(){
    var data = this._data()
      , nextIdx = this.state && this.state[stateKey] || 0;

    nextIdx += 1

    if ( nextIdx >= data.length )
      nextIdx = data.length -1;

    return nextIdx;
  }

  return mixin;
}

function fluent(fn){
  return function(){
    fn.apply(this, arguments)
    return this
  }
}