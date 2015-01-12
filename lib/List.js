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
    require('./mixins/DataHelpersMixin')
  ],

  propTypes: {
    data:          React.PropTypes.array,
    onSelect:      React.PropTypes.func,
    itemComponent: CustomPropTypes.elementType,

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

  // componentWillReceiveProps: function(props){
  //   var data = props.data
  //     , focusIdx = data.indexOf(props.focused)
  //     , selectIdx = data.indexOf(props.selected);

  //   if( selectIdx !== -1) this.setSelectedIndex(selectIdx)
  //   if( focusIdx !== -1)  this.setFocusedIndex(focusIdx)
  // },

  componentDidMount: function(prevProps, prevState){
    this._setScrollPosition()
  },

  componentDidUpdate: function(prevProps, prevState){
    if ( prevState.focused !== this.props.focused)
      this._setScrollPosition()
  },

	render: function(){
    var $__0=     _.omit(this.props, ['data']),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
      , ItemComponent = this.props.itemComponent
      , items;
    
    items = !this.props.data.length 
      ? React.createElement("li", null,  this.props.messages.emptyList)
      : this.props.data.map(function(item, idx) {
          var focused  = item === this.props.focused 
            , selected = item === this.props.selected;

          return (React.createElement("li", {
            key: 'item_' + idx, 
            role: "option", 
            id:  focused ? this.props.optID : undefined, 
            'aria-selected': selected, 
            className: cx({ 
              'rw-list-option':    true,
              'rw-state-focus':    focused,
              'rw-state-selected': selected,
            }), 
            onClick: this.props.onSelect.bind(null, item)}, 
             ItemComponent
                ? React.createElement(ItemComponent, {item: item})
                : this._dataText(item)
            
          ))
        }.bind(this));
    
		return (
			React.createElement("ul", React.__spread({},   props , 
        {className:  (className + '') + ' rw-list', 
        ref: "scrollable", 
        role: "listbox"}), 
          items 
			)
		)
	},

  first:function(){
    return this._data()[0]
  },

  last:function(){
    var data = this._data()
    return data[data.length-1]
  },

  prev:function(state, word){
    var data = this._data()
      , idx  = data.indexOf(this.props[state])

    return word 
      ? this._findNextInstance(data, word, idx, 'prev')
      : --idx < 0 ? data[0] : data[idx]
  },

  next:function(state,word){
    var data = this._data()
      , idx  = data.indexOf(this.props[state])

    return word 
      ? this._findNextInstance(data, word, idx, 'next')
      : ++idx === data.length ? data[data.length - 1] : data[idx]
  },

  _data:function(){ 
    return this.props.data 
  },

  _findNextInstance: function(data, word, current, dir){
    var matcher = filter.startsWith;
      
    return _.find(this._data(), function(item, i)  { 
      return (dir === 'next' ? i > current : i < current)
          && matcher(
              this._dataText.call(this, item).toLowerCase()
            , word.toLowerCase())
    }.bind(this));    
  },

  _setScrollPosition: function(){
    var list = this.getDOMNode()
      , idx  = this._data().indexOf(this.props.focused)
      , selected = list.children[idx];

    if( !selected ) return 

    // timeout allows for element to become visible
    setTimeout(function()  {return scrollTo(selected, list);})
  }

})
