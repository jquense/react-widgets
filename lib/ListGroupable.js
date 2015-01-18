'use strict';
var React   = require('react')
  , CustomPropTypes  = require('./util/propTypes')
  , cx = require('./util/cx')
  , _  = require('./util/_')
  , scrollTo  = require('./util/scroll');


module.exports = React.createClass({

  displayName: 'List',

  mixins: [ 
    require('./mixins/DataHelpersMixin'),
    require('./mixins/ListMovementMixin')
  ],

  propTypes: {
    data:           React.PropTypes.array,
    onSelect:       React.PropTypes.func,
    onMove:         React.PropTypes.func,

    ItemComponent:  CustomPropTypes.elementType,
    GroupComponent: CustomPropTypes.elementType,

    selected:       React.PropTypes.any,
    focused:        React.PropTypes.any,

    valueField:     React.PropTypes.string,
    textField:      React.PropTypes.string,
 
    optID:          React.PropTypes.string,

    groupBy:        React.PropTypes.oneOfType([
                     React.PropTypes.func,
                     React.PropTypes.string
                    ]),

    messages:       React.PropTypes.shape({
      emptyList:    React.PropTypes.string
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

  getInitialState: function() {
    var keys = [];

    return {
      groups: this._group(this.props.groupBy, this.props.data, keys),

      sortedKeys: keys
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var keys = [];

    if(nextProps.data !== this.props.data || nextProps.groupBy !== this.props.groupBy)
      this.setState({ 
        groups: this._group(nextProps.groupBy, nextProps.data, keys),
        sortedKeys: keys
      })
  },

  componentDidMount: function(prevProps, prevState){
    this._setScrollPosition()
  },

  componentDidUpdate: function(prevProps, prevState){
    if ( prevProps.focused !== this.props.focused)
      this._setScrollPosition()
  },

  render: function(){
    var $__0= 
        
          _.omit(this.props, ['data', 'selectedIndex']),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
      , groups = this.state.groups
      , items = []
      , idx = -1
      , group;
    
    if ( this.props.data.length ){
      items = this.state.sortedKeys
        .reduce( function(items, key)  {
          group = groups[key]
          items.push(this._renderGroupHeader(key))

          for (var itemIdx = 0; itemIdx < group.length; itemIdx++) 
            items.push(
              this._renderItem(key, group[itemIdx], ++idx))

          return items
        }.bind(this), [])
    }
    else 
      items = React.createElement("li", null,  this.props.messages.emptyList)

    return (
      React.createElement("ul", React.__spread({},   props , 
        {className:  (className + '') + ' rw-list  rw-list-grouped', 
        ref: "scrollable", 
        role: "listbox"}), 
        items 
      )
    )
  },

  _renderGroupHeader:function(group){
    var ItemComponent = this.props.groupComponent;

    return (React.createElement("li", {
      key: 'item_' + group, 
      tabIndex: "-1", 
      role: "separator", 
      className: "rw-list-optgroup"}, 
         ItemComponent ? React.createElement(ItemComponent, {item: group}) : group
    ))
  },

  _renderItem:function(group, item, idx){
    var focused  = this.props.focused  === item
      , selected = this.props.selected === item
      , ItemComponent = this.props.itemComponent;

    //console.log('hi')
    return (
      React.createElement("li", {
        key: 'item_' + group + '_' + idx, 
        role: "option", 
        id:  focused ? this.props.optID : undefined, 
        'aria-selected': selected, 
        onClick: this.props.onSelect.bind(null, item), 
        className: cx({ 
          'rw-state-focus':    focused,
          'rw-state-selected': selected,
          'rw-list-option':    true
        })}, 
           ItemComponent
              ? React.createElement(ItemComponent, {item: item})
              : this._dataText(item)
          
      ))
  },

  _isIndexOf:function(idx, item){
    return this.props.data[idx] === item
  },

  _group:function(groupBy, data, keys){
    var iter = typeof groupBy === 'function' ? groupBy : function(item)  {return item[groupBy];}

    // the keys array ensures that groups are rendered in the order they came in
    // which means that if you sort the data array it will render sorted, 
    // so long as you also sorted by group
    keys = keys || []

    return data.reduce( function(grps, item)  {
      var group = iter(item);

      _.has(grps, group) 
        ? grps[group].push(item)
        : (keys.push(group), grps[group] = [item])

      return grps
    }, {}) 
  },

  _data:function(){ 
    var groups = this.state.groups;

    return this.state.sortedKeys
      .reduce( function(flat, grp)  {return flat.concat(groups[grp]);}, [])
  },

  _setScrollPosition: function(){
    var selected = this.getItemDOMNode(this.props.focused)
      , handler  = this.props.onMove || scrollTo;

    if( !selected ) return 

    setTimeout(function()  {return handler(selected);})
  },

  getItemDOMNode:function(item){
    var list = this.getDOMNode()
      , groups = this.state.groups
      , idx = -1
      , itemIdx, child;

    this.state.sortedKeys.some(function(group)  {
      itemIdx = groups[group].indexOf(item)
      idx++;

      if( itemIdx !== -1) 
        return !!(child = list.children[idx + itemIdx + 1])

      idx += groups[group].length
    })

    return child
  }

})