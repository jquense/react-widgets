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
      value:         React.PropTypes.any
    },

    getInitialState: function(){
      return {
        selectedIndex: helper._dataIndexOf.call(this, 
          this.props.data, this.props.value)
      }
    },

    componentWillReceiveProps: ifValueChanges(function(props){
      setIndex.call(this, helper._dataIndexOf.call(this, 
        props.data, props.value))
    }),

    moveSelected: function(direction){
      var nextIdx = this.state.selectedIndex;

      if ( direction === directions.UP){
        nextIdx += 1

        if ( nextIdx >= this.props.data.length )
          nextIdx = 0;

      } else if ( directions.DOWN === direction){
        nextIdx -= 1
        if ( nextIdx < 0 )
          nextIdx = this.props.data.length - 1;
      }

      setIndex.call(this, nextIdx);
    }

  }
