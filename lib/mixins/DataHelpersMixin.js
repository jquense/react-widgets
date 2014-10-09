var React = require('react')
  , _ =  require('lodash')

module.exports = {
  
  propTypes: {    
    valueField: React.PropTypes.string,
    textField:  React.PropTypes.string
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
    return _.findIndex(data, _.partial(this._valueMatcher, item), this)
  },

  _valueMatcher: function(a, b){
    return _.isEqual(
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
