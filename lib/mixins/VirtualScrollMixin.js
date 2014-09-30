var React = require('react')
  , _ =  require('lodash')
  , $ = require('../util/dom')

module.exports = {
  
    
  // shouldComponentUpdate: function(nextProps, nextState) {
  //   var dataChanged = (nextProps.data.length !== this.props.data.length);

  //   console.log('update: ', dataChanged || nextState.outOfRange)
  //   return dataChanged || nextState.outOfRange
  // },
  propTypes: {
    itemHeight:         React.PropTypes.number,
    initialVisibleItems:  React.PropTypes.number,
  },

  getInitialState: function() {
    var bufferSize = this.props.initialVisibleItems || (this.props.data.length - 1)

    return {
      bufferSize: bufferSize * 2,

      visibleStart: 0,
      visibleEnd: bufferSize,

      displayStart: 0,
      displayEnd: Math.min(bufferSize * 2, this.props.data.length - 1)
    };
  },

  componentDidMount: function(){
    var visibleItemsCount = Math.floor($.height(this.refs.scrollable.getDOMNode()) / this.props.itemHeight)

    console.log(visibleItemsCount)
    if( visibleItemsCount !== this.state.visibleEnd)
      this.setState({ 
        visibleEnd: visibleItemsCount, 
        bufferSize: visibleItemsCount * 2 
      })
  },

  scrollState: function(scrollTop) {
    var visibleStart = Math.floor(scrollTop / this.props.itemHeight)
      , itemsPerBody = Math.floor($.height(this.refs.scrollable.getDOMNode()) / this.props.itemHeight)
      , visibleEnd   = Math.min(visibleStart + itemsPerBody, this.props.data.length - 1)
      , displayStart = Math.max(0, Math.floor(scrollTop / this.props.itemHeight) - (this.state.bufferSize / 2))
      , displayEnd   = Math.min(displayStart + this.state.bufferSize, this.props.data.length - 1)
      , outOfRange   = !(visibleStart >= this.state.displayStart && visibleEnd <= this.state.displayEnd);

      console.log('scroll', this.state.bufferSize, displayEnd)
    //console.log('scroll: ', visibleEnd, this.state.displayEnd)
    if( outOfRange )
      this.setState({
        bufferSize: itemsPerBody * 2,
        visibleStart: visibleStart,
        visibleEnd: visibleEnd,
        displayStart: displayStart,
        displayEnd: displayEnd,
        scrollTop: scrollTop,
        outOfRange: outOfRange
      });
  },

  onScroll: function(event) {
    this.scrollState(this.refs.scrollable.getDOMNode().scrollTop)
  }

}

function outOfRange(current, visibleEnd, visibleStart){
  return ;
}