'use strict';
var React   = require('react')
  , filters = require('../util/filter')
  , helper  = require('./DataHelpersMixin')
  , _      = require('../util/_');

var filterTypes = _.filter( Object.keys(filters), i => i !== 'filter')

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
            : filters[this.props.filter || 'eq'];

      if ( !searchTerm || !searchTerm.trim() || (this.props.filter && searchTerm.length < (this.props.minLength || 1)))
        return -1

      if ( !this.props.caseSensitive)
        searchTerm = searchTerm.toLowerCase();

      items.every( (item, i) => {
        var val = helper._dataText.call(this, item);

        if ( !this.props.caseSensitive) 
          val = val.toLowerCase();

        if (matches(val, searchTerm.toLowerCase()))
          return (idx = i), false

        return true
      })

      return idx  
    },

    filter: function(items, searchTerm){
      var matches = typeof this.props.filter === 'string'
            ? filters[this.props.filter]
            : this.props.filter;

      if ( !matches || !searchTerm || !searchTerm.trim() || searchTerm.length < (this.props.minLength || 1))
        return items

      if ( !this.props.caseSensitive)
        searchTerm = searchTerm.toLowerCase();

      return _.filter(items, item => {
        var val = helper._dataText.call(this, item);

        if ( !this.props.caseSensitive)
          val = val.toLowerCase();

        return matches(val, searchTerm.toLowerCase())
      })
    }
  }
