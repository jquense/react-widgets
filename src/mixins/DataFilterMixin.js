'use strict';
var React   = require('react')
  , filters = require('../util/filter')
  , helper  = require('./DataHelpersMixin');

var filterTypes = Object.keys(filters).filter( i => i !== 'filter')

module.exports = {
  
    propTypes: {
      data:           React.PropTypes.array,
      value:          React.PropTypes.any,
      filter:         React.PropTypes.oneOfType([
                        React.PropTypes.func,
                        React.PropTypes.oneOf(filterTypes.concat(false))
                      ]),
      caseSensitive:  React.PropTypes.bool,
      minLength:      React.PropTypes.number,
    },

    getDefaultProps: function(){
      return {
        caseSensitive: false,
        minLength: 1
      }
    },

    filterIndexOf: function(items, searchTerm){
      var idx = -1
        , matches = typeof this.props.filter === 'function'
            ? this.props.filter
            : getFilter(filters[this.props.filter || 'eq'], searchTerm, this);

      if ( !searchTerm || !searchTerm.trim() || (this.props.filter && searchTerm.length < (this.props.minLength || 1)))
        return -1

      items.every( (item, i) => {
        if (matches(item, searchTerm))
          return (idx = i), false

        return true
      })

      return idx  
    },

    filter: function(items, searchTerm){
      var matches = typeof this.props.filter === 'string'
            ? getFilter(filters[this.props.filter], searchTerm, this)
            : this.props.filter;

      if ( !matches || !searchTerm || !searchTerm.trim() || searchTerm.length < (this.props.minLength || 1))
        return items

      return items.filter( 
        item => matches(item, searchTerm))
    }
  }


function getFilter(matcher, searchTerm, ctx){
  searchTerm = !ctx.caseSensitive 
    ? searchTerm.toLowerCase() 
    : searchTerm

  return function(item) {
    var val = helper._dataText.call(ctx, item);

    if ( !ctx.caseSensitive )
      val = val.toLowerCase();

    return matcher(val, searchTerm)
  }
}