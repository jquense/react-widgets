'use strict';
var React   = require('react')
  , CustomPropTypes  = require('./util/propTypes')
  , cx = require('./util/cx')
  , _  = require('./util/_');


module.exports = React.createClass({

  displayName: 'List',

  mixins: [ 
    require('./mixins/WidgetMixin'),
    require('./mixins/DataHelpersMixin'),
    require('./mixins/ListMovementMixin')
  ],

  propTypes: {
    data:          React.PropTypes.array,
    onSelect:      React.PropTypes.func,
    onMove:        React.PropTypes.func,
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

  getInitialState:function(){
    return {}
  },


  componentDidMount:function(){
    this._setScrollPosition()
  },

  componentDidUpdate:function(prevProps){
    if ( prevProps.focused !== this.props.focused)
      this._setScrollPosition()
  },

	render:function(){
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
        {className:  (className || '') + ' rw-list', 
        ref: "scrollable", 
        role: "listbox"}), 
          items 
			)
		)
	},


  _data:function(){ 
    return this.props.data 
  },

  _setScrollPosition: function(){
    var list = this.getDOMNode()
      , idx  = this._data().indexOf(this.props.focused)
      , selected = list.children[idx];

    if( !selected ) return 

    this.notify('onMove', [selected, list])
  }

})
