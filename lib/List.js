'use strict';
var React   = require('react')
  , CustomPropTypes  = require('./util/propTypes')
  , filter = require('./util/filter')
  , cx = require('./util/cx')
  , _  = require('./util/_')
  , scrollTo  = require('./util/scroll');


module.exports = React.createClass({

  displayName: 'List',

  mixins: [ 
    require('./mixins/DataHelpersMixin'),

    require('./mixins/DataIndexStateMixin')('focusedIndex'),
    require('./mixins/DataIndexStateMixin')('selectedIndex')
  ],

  propTypes: {
    data:          React.PropTypes.array,
    onSelect:      React.PropTypes.func,
    ItemComponent: CustomPropTypes.elementType,

    selectedIndex: React.PropTypes.number,
    focusedIndex:  React.PropTypes.number,
    valueField:    React.PropTypes.string,
    textField:     React.PropTypes.string,

    optID:         React.PropTypes.string,

    messages:      React.PropTypes.shape({
      emptyList:   React.PropTypes.string
    }),
  },


  getDefaultProps: function(){
    return {
      optID:         '',
      onSelect:      function(){},
      data:          [],
      messages: {
        emptyList:   "There are no items in this list"
      }
    }
  },

  getInitialState: function(){
    var data = this.props.data;

    return {
      selectedIndex: data.indexOf(this.props.selected),
      focusedIndex:  data.indexOf(this.props.focused),
    }
  },

  componentWillReceiveProps: function(props){
    var data = props.data;

    this.setSelectedIndex(data.indexOf(props.selected))
    this.setFocusedIndex(data.indexOf(props.focused))
  },

  componentDidMount: function(prevProps, prevState){
    this._setScrollPosition()
  },

  componentDidUpdate: function(prevProps, prevState){
    if ( prevState.focusedIndex !== this.state.focusedIndex)
      this._setScrollPosition()
  },

	render: function(){
    var $__0=     _.omit(this.props, ['data']),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
      , ItemComponent = this.props.listItem
      , items;
    

    items = !this.props.data.length 
      ? React.createElement("li", null,  this.props.messages.emptyList)
      : this.props.data.map(function(item, idx) {
          var focused = this.state.focusedIndex === idx;

          return (React.createElement("li", {
            key: 'item_' + idx, 
            role: "option", 
            id:  focused ? this.props.optID : undefined, 
            'aria-selected':  idx === this.state.selectedIndex, 
            className: cx({ 
              'rw-list-option':    true,
              'rw-state-focus':    focused,
              'rw-state-selected': idx === this.state.selectedIndex,
            }), 
            onClick: this.props.onSelect.bind(null, item)}, 
             ItemComponent
                ? React.createElement(ItemComponent, {item: item})
                : this._dataText(item)
            
          ))
        }.bind(this));
    
		return (
			React.createElement("ul", React.__spread({},   props , 
        {className:  className + ' rw-list', 
        ref: "scrollable", 
        role: "listbox"}), 
          items 
			)
		)
	},

  first:function(){
    return this.props.data[0]
  },

  last:function(){
    return this.props.data[this.props.data.length -1]
  },

  next:function(state, word){
    return this.props.data[word 
      ? this._findNextWordIndex(word, this.state[state + 'Index'], 'next')
      : this[("next" + capitalize(state) + "Index")]()]
  },

  prev:function(state, word){
    return this.props.data[ word
      ? this._findNextWordIndex(word, this.state[state + 'Index'], 'prev')
      : this[("prev" + capitalize(state) + "Index")]()]
  },

  _data:function(){ 
    return this.props.data 
  },

  _findNextWordIndex: function(word, current, dir){
    var matcher = filter.startsWith
      , self    = this;
    
    return _.findIndex(self._data(), function(item, i)  { 
      return (dir === 'next' ? i > current : i < current)
          && matcher(
              this._dataText.call(self, item).toLowerCase()
            , word.toLowerCase())
    }.bind(this));    
  },

  _setScrollPosition: function(){
    var list = this.getDOMNode()
      , selected = list.children[this.state.focusedIndex];

    if( !selected ) return 

    // timeout allows for element to become visible
    setTimeout(function()  {return scrollTo(selected, list);})
  }

})

function capitalize(str){
  return str.charAt(0).toUpperCase() + str.substr(1)
}