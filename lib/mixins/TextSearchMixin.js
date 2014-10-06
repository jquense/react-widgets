var React  = require('react')
  , filter = require('../util/filter')
  , helper = require('../mixins/DataHelpersMixin')
  , compose = require('../util/compose')
  , setter = require('../util/stateSetter')
  , _      = require('lodash');

module.exports = {
  
    propTypes: {
      data:          React.PropTypes.array,
      value:         React.PropTypes.any,
      delay:         React.PropTypes.number,
      filter:        React.PropTypes.string,
    },

    search: function(character, cb){
      var self    = this
        , word    = ((this._searchTerm || '') + character).toLowerCase();
        
      clearTimeout(this._timer)

      this._searchTerm = word 

      this._timer = setTimeout(function(){
            self._searchTerm = ''
            cb(word);
        }, this.props.delay)    
    },

    findNextWordIndex: function(word, current){
      var matcher = filter.startsWith
        , self    = this;
        
      return _.findIndex(self._data(), function(item, i) { 
        return i != current
            && matcher(
                helper._dataText.call(self, item).toLowerCase()
              , word.toLowerCase())
      });    
    }

}