'use strict';
var React = require('react')
  , _ =  require('../util/_')

module.exports = {
  
  propTypes: {    
    valueField: React.PropTypes.string,
    textField:  React.PropTypes.string,
  },

  _dataValue: function(item){
    var field = this.props.valueField;

        return field && item && _.has(item, field)
      ? item[field]
      : item
  },

  _dataText: function(item){
    var field = this.props.textField;

    return (field && item && _.has(item, field)
      ? item[field]
      : item) + ''
  },

  _dataIndexOf: function(data, item){
    var idx = -1, len = data.length
      , finder = datum => this._valueMatcher(item, datum);

    while (++idx < len)
      if( finder(data[idx]) ) return idx
    
    return -1
  },

  _valueMatcher: function(a, b){
    return _.isShallowEqual(
        this._dataValue(a)
      , this._dataValue(b)) 
  },

  _dataItem: function(data, item){
    var first = data[0]
      , field = this.props.valueField
      , idx;

    // make an attempt to see if we were passed in dataItem vs just a valueField value
    // either an object with the right prop, or a primitive
    // { valueField: 5 } || "hello" [ "hello" ]
    if( _.has(item, field) || typeof(first) === typeof(val))
      return item

    idx = this._dataIndexOf(data, this._dataValue(item))

    if (idx !== -1)
      return data[idx]

    return item
  }
}
