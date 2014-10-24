/**
 * @jsx React.DOM
 */

var React = require('react')
  , _ = require('lodash')
  , $ = require('../util/dom');

var VirtualScroller = React.createClass({

  propTypes: {
    container:     React.PropTypes.func,
    itemHeight:    React.PropTypes.number,
    initialItems:  React.PropTypes.number,
  },

  mixins: [
    //require('../mixins/WidgetMixin'),
    require('../mixins/PureRenderMixin')
  ],

  getDefaultState: function(props) {
    var bufferSize = props.initialItems || (this._data().length - 1)

    return {
      staticHeight: _.has(props, 'itemHeight'),
      avgHeight:    props.itemHeight,
      bufferSize:   bufferSize * 2.5,

      scrollTop:    0,
      visibleStart: 0,
      visibleEnd:   bufferSize,

      displayStart: 0,
      displayEnd:   Math.min(bufferSize * 2, this._data().length - 1)
    }
  },

  getInitialState: function() {
    return this.getDefaultState(this.props);
  },

  componentDidMount: function(){
    var list = this.getDOMNode()
      , height = $.height(list)
      , currentAvg = this._avgHeight()
      , visibleItemsCount, state;

    if( !this.state.staticHeight && currentAvg !== this.state.avgHeight) 
      (state = {}).avgHeight = (currentAvg || this.props.itemHeight)
      
    visibleItemsCount = Math.floor(height / (state && state.avgHeight || this.state.avgHeight))

    if( !isNaN(visibleItemsCount) && visibleItemsCount !== this.state.visibleEnd){
       state = state || {}
       state.visibleItems = visibleItemsCount
       state.visibleEnd   = visibleItemsCount
       state.bufferSize   = visibleItemsCount * 4
    }

    state && this.setState(state)
  },

  componentDidUpdate: function(prevProps, prevState) {
    var self = this
      , currentAvg = this._avgHeight()
      , sum, times;

    if( currentAvg < 0){
      debugger;
      currentAvg = this._avgHeight()
    }
    
    if( this._needsScrollRecalculation) 
      return this.scrollTo(this._needsScrollRecalculation)

    sum = (this.state.avgSum || 0) + currentAvg;
    times = (this.state.heightCount || 0) + 1;
    currentAvg = sum / times;

    //console.log('avg ht: ', currentAvg)

    if ((this.state.avgHeight | 0) !== (currentAvg | 0) ) { 
      return this.setState({
        avgHeight:  currentAvg,
        avgSum:     sum,
        heightCount: times
      })
    }
  },

  componentWillReceiveProps: function(nextProps){
    
    this.scrollState(
        this.state.scrollTop
      , nextProps
      , this.props.data.length !== nextProps.data.length)
  },

  scrollState: function(scrollTop, props, update) {
    var itemHeight   = this.state.avgHeight
      , visibleStart = Math.floor(scrollTop / itemHeight)
      , visibleEnd   = Math.min(visibleStart + this.state.visibleItems, this._data().length - 1)
      , displayStart = Math.max(0, Math.floor(scrollTop / itemHeight) - Math.floor(this.state.bufferSize / 2))
      , displayEnd   = Math.min(displayStart + this.state.bufferSize, this._data().length - 1)
      , outOfRange   = !(visibleStart >= this.state.displayStart && visibleEnd <= this.state.displayEnd);


    //console.log('scroll: ',  itemHeight && (update || outOfRange))
    if( this._slipIsShowing(scrollTop) ) {
      console.log('your skin is showing')
      update = true
    }

    if( itemHeight && (update || outOfRange) )
      this.setState({
        visibleStart: visibleStart,
        visibleEnd:   visibleEnd,
        displayStart: displayStart,
        displayEnd:   displayEnd,
        scrollTop:    scrollTop,
        outOfRange:   outOfRange
      });
  },

  onScroll: function(event) {
    //console.log('onscroll', !this._preventChange)
    if ( !this._preventChange)
      this.scrollState(this.getDOMNode().scrollTop, this.props)

    this._preventChange = false
  },

  render: function() {
    var items = []
      , children = this._data()
      , skip = this.state.displayStart
      , end = this.state.displayEnd
      , itemHeight = this.state.avgHeight
      , len = Math.min(end, children.length - 1)
      , i   = skip -1;

    this._botHeight = this._topHeight = 0;

    while( ++i <= len) items.push(children[i])

    if ( end !== (children.length - 1))
      items.push(React.DOM.li({
        key: 'bottom_pl', 
        ref: 'bottom',
        style: { 
          height: this._botHeight = ((children.length - end) * itemHeight)
        }
      }));

    if (skip !== 0)
      items.unshift(React.DOM.li({ 
        key: 'top_pl',
        ref: 'top',
        style: { height: this._topHeight = (skip * itemHeight)}
      }));

    return (
      <ul className='unstyled-list' onScroll={this.onScroll} style={{ overflow: 'auto', height: 200 }}>
        {items}
      </ul>
    );
  },

  _slipIsShowing: function(scrollTop){
    var list   = this.getDOMNode()
      , first  = list.children[1]
      , last   = list.children[list.children.length - 2]
      , bottom = last.offsetTop + last.offsetHeight
      , topVisible, botVisible;

    topVisible = this.refs.top && bottom < (scrollTop + list.clientHeight)
    botVisible = this.refs.bottom && (first.offsetTop > scrollTop)

    //console.log('scroll: ',  itemHeight && (update || outOfRange))
    if( topVisible || botVisible) {
      console.log('your skin is showing')
      return true
    }

     return false
  },

  _trueListHeight: function(){
    var list = this.getDOMNode()
      , top  = this._topHeight || 0
      , bot  = this._botHeight || 0;

    return Math.max(list.scrollHeight, $.height(list)) - bot - top
  },

  _avgHeight: function(){
    var list = this.getDOMNode()
      , len  = list.children.length;

    if(this.refs.top)    len--;
    if(this.refs.bottom) len--;

    return len && Math.ceil(this._trueListHeight() / len) || 0;
  },

  _data: function(){
    return [].concat(this.props.children)
  },

  _isRenderedItem: function(idx){
    var start = this.state.displayStart
      , end   = Math.min(this.state.displayEnd, this._data().length - 1);

    return idx >= start && idx <= end
  },

  scrollTo: function(idx){
    var list  = this.getDOMNode()
      , scrollTop, listHeight, selectedTop, selectedHeight, bottom;

    if( this._isRenderedItem(idx) ) {
      return scrollDom.call(this, list, (idx - this.state.displayStart));
    }
      
    if( this._needsScrollRecalculation) 
      return this._needsScrollRecalculation = false;


    scrollTop      = list.scrollTop
    listHeight     = list.clientHeight
    selectedTop    = idx * this.state.avgHeight 
    selectedHeight = this.state.avgHeight

    bottom =  selectedTop + selectedHeight

    scrollTop = scrollTop > selectedTop
      ? selectedTop
      : bottom > (scrollTop + listHeight) 
          ? (bottom - listHeight)
          : scrollTop;

    this._needsScrollRecalculation = idx
    list.scrollTop = scrollTop;
  }

});

module.exports = VirtualScroller;


function scrollDom(list, idx){
  var selected = list.children[idx]
    , scrollTop, listHeight, selectedTop, selectedHeight, bottom;

    if( !selected ) return 

    scrollTop      = list.scrollTop
    listHeight     = list.clientHeight
    selectedTop    = selected.offsetTop
    selectedHeight = selected.offsetHeight

    bottom =  selectedTop + selectedHeight

    this._preventChange = true
    scrollTop = scrollTop > selectedTop
      ? selectedTop
      : ((selectedTop + selectedHeight) - listHeight)
    console.log('dom: ', idx, list.scrollTop, scrollTop)
    list.scrollTop = scrollTop;
    //this._preventChange = false
    this._needsScrollRecalculation = false;
  }
