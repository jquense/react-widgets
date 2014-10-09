var React   = require('react')
  , filters = require('../util/filter')
  , helper  = require('../mixins/DataHelpersMixin')
  , setter  = require('../util/stateSetter')
  , compose = require('../util/compose')
  , directions = require('../util/constants').directions
  , _      = require('lodash');

var ifValueChanges = compose.provided(function(props){
      return !_.isEqual(props.value, this.props.value)
    })
  , indexExists = compose.provided(function(idx){
      return idx >= 0
    })

var filterTypes = _.without(_.keys(filters), 'filter')
  , setIndex = indexExists(setter('selectedIndex'))

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
      var matches = typeof this.props.filter === 'function'
            ? this.props.filter
            : filters[this.props.filter || 'eq'];

      if ( !searchTerm || !searchTerm.trim() || (this.props.filter && searchTerm.length < (this.props.minLength || 1)))
        return -1

      if ( !this.props.caseSensitive)
        searchTerm = searchTerm.toLowerCase();

      return _.findIndex(items, function(item){
        var val = helper._dataText.call(this, item);

        if ( !this.props.caseSensitive)
          val = val.toLowerCase();

        return matches(val, searchTerm.toLowerCase())
      }, this)   
    },

    filter: function(items, searchTerm){
      var matches = typeof this.props.filter === 'string'
            ? filters[this.props.filter]
            : this.props.filter;

      if ( !matches || !searchTerm || !searchTerm.trim() || searchTerm.length < (this.props.minLength || 1))
        return items

      if ( !this.props.caseSensitive)
        searchTerm = searchTerm.toLowerCase();

      return _.filter(items, function(item){
        var val = helper._dataText.call(this, item);

        if ( !this.props.caseSensitive)
          val = val.toLowerCase();

        return matches(val, searchTerm.toLowerCase())
      }, this)
    }
  }
