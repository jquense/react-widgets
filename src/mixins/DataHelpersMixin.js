var React = require('react/addons')
  , _ =  require('lodash')

module.exports = {
  
  propTypes: {    
    //data:       React.PropTypes.array,
    valueField: React.PropTypes.string,
    textField:  React.PropTypes.string
  },

  _dataValue: function(item){
    var field = this.props.valueField

    return field && item 
      ? item[field]
      : item
  },

  _dataText: function(item){
    var field = this.props.textField

    return field && item 
      ? item[field]
      : item
  },

  _dataIndexOf: function(data, item){
    return _.findIndex(data, _.partial(this._valueMatcher, item), this)
  },

  _valueMatcher: function(a, b){
    return _.isEqual(
        this._dataValue(a)
      , this._dataValue(b)) 
  }
}

function comparer(a, b){
  
}