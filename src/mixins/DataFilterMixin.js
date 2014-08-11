var React  = require('react/addons')
  , filter = require('../util/filter')
  , helper = require('../mixins/DataHelpersMixin')
  , setter = require('../util/stateSetter')
  , compose = require('../util/compose')
  , directions = require('../util/constants').directions
  , _      = require('lodash');

var ifValueChanges = compose.provided(function(props){
      return !_.isEqual(props.value, this.props.value)
    })
  , indexExists = compose.provided(function(idx){
      return idx >= 0
    })

var setIndex = indexExists(setter('selectedIndex'))

module.exports = {
  
    propTypes: {
      data:          React.PropTypes.array,
      value:         React.PropTypes.any,
      filterType:    React.PropTypes.string,
      caseSensitive: React.PropTypes.bool,
      minLength:     React.PropTypes.number,
    },

    getDefaultProps: function(){
      return {
        filterType: 'startsWith',
        caseSensitive: false,
        minLength: 1
      }
    },

    filter: function(items, searchTerm){
      var matches = filter[this.props.filterType];

      if ( !searchTerm || !searchTerm.trim() || searchTerm.length < (this.props.minLength || 1))
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
