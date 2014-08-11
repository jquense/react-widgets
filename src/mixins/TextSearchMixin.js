var React  = require('react/addons')
  , filter = require('../util/filter')
  , helper = require('../mixins/DataHelpersMixin')
  , _      = require('lodash');

module.exports = function(key){
  function setIndex(comp, idx){
    var state = {}  
    state[key] = idx

    if ( idx !== -1 )
      comp.setState(state)
  }

  return {
  
    propTypes: {
      data:          React.PropTypes.array,
      value:         React.PropTypes.any,
      delay:         React.PropTypes.number,
      filter:        React.PropTypes.string,
    },

    next: function(){
      var state = {}   
        , nextIdx = this.state[key] + 1;

      if ( nextIdx >= this.props.data.length )
        nextIdx = 0;

      setIndex(this, nextIdx)
    },

    prev: function(){
      var nextIdx = this.state[key] - 1;

      if ( nextIdx < 0 )
        nextIdx = this.props.data.length - 1;

      setIndex(this, nextIdx)
    },

    search: function(character){
      var self    = this
        , matcher = filter.startsWith
        , word    = ((this._searchTerm || '') + character).toLowerCase();
        
      clearTimeout(this._timer)

      this._searchTerm = word 

      this._timer = setTimeout(function(){
            self._searchTerm = ''
            self.locate(word);
        }, this.props.delay)    
    },

    locate: function(word){
      var matcher = filter.startsWith
        , index   = this.findIndex(word, matcher);

      setIndex(this, index)
    },

    findIndex: function(word, matcher){
      var self    = this;
        
      return _.findIndex(self.props.data, function(item, i) { 
        return i != self.state[key] 
            && matcher(
                helper._dataText.call(self, item).toLowerCase()
              , word.toLowerCase())
      });    
    }

  }
}