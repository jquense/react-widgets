'use strict';
var React = require('react')
  , _  = require('./util/_')
  , cx = require('./util/cx')
  , controlledInput  = require('./util/controlledInput')
  , CustomPropTypes  = require('./util/propTypes')
  , scrollTo = require('./util/scroll')
  , PlainList        = require('./List')
  , GroupableList = require('./ListGroupable');

var propTypes = {

    data:           React.PropTypes.array,
    value:          React.PropTypes.oneOfType([
                      React.PropTypes.any,
                      React.PropTypes.array
                    ]),
    onChange:       React.PropTypes.func,
    onMove:         React.PropTypes.func,

    multiple:       React.PropTypes.bool,

    itemComponent:  CustomPropTypes.elementType,
    list:           CustomPropTypes.elementType,

    valueField:     React.PropTypes.string,
    textField:      React.PropTypes.string,

    busy:           React.PropTypes.bool,

    delay:          React.PropTypes.number, 

    disabled:       React.PropTypes.oneOfType([
                      React.PropTypes.array,
                      React.PropTypes.bool,
                      React.PropTypes.oneOf(['disabled'])
                    ]),

    readOnly:       React.PropTypes.oneOfType([
                      React.PropTypes.bool,
                      React.PropTypes.array,
                      React.PropTypes.oneOf(['readonly'])
                    ]),

    messages:       React.PropTypes.shape({
      emptyList:    React.PropTypes.string
    }),
  }


var SelectList = React.createClass({displayName: 'SelectList',

  propTypes: propTypes,

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/TextSearchMixin'),
    require('./mixins/DataHelpersMixin'),
    require('./mixins/RtlParentContextMixin'),
    require('./mixins/DataIndexStateMixin')('focusedIndex', 'isDisabledItem')
  ],

  getDefaultProps:function(){
    return {
      delay: 250,
      value: [],
      data:  [],
      messages: {
        emptyList: 'There are no items in this list'
      }
    }
  },

  getDefaultState:function(props){
    var isRadio = !props.multiple
      , values  = _.splat(props.value)
      , first   = isRadio && this._dataItem(props.data, values[0]) 

    first = isRadio && first 
      ? first
      : ((this.state || {}).focusedItem || null)

    return {
      focusedItem: first,
      dataItems:   !isRadio && values.map(function(item)  {return this._dataItem(props.data, item);}.bind(this))
    }
  },

  getInitialState:function(){
    return this.getDefaultState(this.props)
  },

  componentWillReceiveProps:function(nextProps) {
    return this.setState(this.getDefaultState(nextProps))
  },

  componentDidUpdate:function(prevProps, prevState){
    if ( prevState.focused !== this.state.focused)
      this._setScrollPosition()
  },

  render:function() {
    var $__0=     _.omit(this.props, Object.keys(propTypes)),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
      , focus = this._maybeHandle(this._focus.bind(null, true), true)
      , optID = this._id('_selected_option')
      , blur  = this._focus.bind(null, false)
      , List  = this.props.list || (this.props.groupBy && GroupableList) || PlainList
      , focusedItem = this.state.focused 
                    && !this.isDisabled() 
                    && !this.isReadOnly() 
                    && this.state.focusedItem;


    return (
      
      React.createElement("div", React.__spread({},  props, 
        {onKeyDown: this._maybeHandle(this._keyDown), 
        onFocus: focus, 
        onBlur: blur, 
        tabIndex: "0", 
        role: "listbox", 
        'aria-busy': !!this.props.busy, 
        'aria-activedescendent':  this.state.focused ? optID : undefined, 
        'aria-disabled':  this.isDisabled(), 
        'aria-readonly':  this.isReadOnly(), 
        className: cx(className, { 
          'rw-widget':         true,
          'rw-selectlist':     true,
          'rw-state-focus':    this.state.focused,
          'rw-state-disabled': this.isDisabled(),
          'rw-state-readonly': this.isReadOnly(),
          'rw-rtl':            this.isRtl(),
          'rw-loading-mask':   this.props.busy
        })}), 

        React.createElement(List, {ref: "list", 
          data: this._data(), 
          focused: focusedItem, 
          optID: optID, 
          itemComponent: this.getListItem(optID)})
      ) 
    );
  },

  getListItem:function(){
    var self = this
      , Component = self.props.itemComponent
      , type = this.props.multiple ? 'checkbox' : 'radio';

    return React.createClass({

      render:function(){
        var item     = this.props.item
          , checked  = self._contains(item, self._values())
          , change   = self._change.bind(null, item)
          , disabled = self.isDisabledItem(item)
          , readonly = self.isReadOnlyItem(item);

        return (React.createElement(SelectListItem, {
          type: type, 
          name: name, 
          onChange: change, 
          checked: checked, 
          readOnly: readonly, 
          disabled: disabled || readonly}, 
             Component ? React.createElement(Component, {item: item}) : self._dataText(item)
          ))
      }

    })
  },


  _keyDown: function(e){
    var self = this
      , key = e.key
      , multiple = !!this.props.multiple
      , list = this.refs.list
      , focusedItem = this.state.focusedItem;

    if ( key === 'End' ) {
      e.preventDefault()

      if ( multiple ) this.setState({ focusedItem: move('prev', null) })
      else            change(move('prev', null)) 
    }
    else if ( key === 'Home' ) {
      e.preventDefault()

      if ( multiple ) this.setState({ focusedItem: move('next', null) })
      else            change(move('next', null)) 
    }
    else if ( key === 'Enter' || key === ' ' ) {
      e.preventDefault()
      change(focusedItem)
    }
    else if ( key === 'ArrowDown' || key === 'ArrowRight' ) {
      e.preventDefault()

      if ( multiple ) this.setState({ focusedItem: move('next', focusedItem) })
      else            change(move('next', focusedItem))
    }
    else if ( key === 'ArrowUp' || key === 'ArrowLeft'  ) {
      e.preventDefault()

      if ( multiple ) this.setState({ focusedItem: move('prev', focusedItem) })
      else            change(move('prev', focusedItem))
    }
    else if (this.props.multiple && e.keyCode === 65 && e.ctrlKey ) {
      e.preventDefault()
      this._selectAll() 
    }
    else
      this.search(
          String.fromCharCode(e.keyCode)
        , this._locate)

    function change(item, cked){
      if( item ){
        self._change(item, multiple 
            ? !self._contains(item, self._values()) // toggle value
            : true)
      }    
    }

    function move(dir, item){
      var stop = dir === 'next' ? list.last() : list.first()
        , next = list[dir](item);
      
      while( next !== stop && self.isDisabledItem(next) ) 
        next = list[dir](next)

      return self.isDisabledItem(next) ? item : next
    }
  },

  _selectAll: function(){
    var values = this.state.dataItems
      , disabled = this.props.disabled || this.props.readOnly
      , data = this._data()
      , blacklist;

    disabled = Array.isArray(disabled) ? disabled : [];
    //disabled values that are not selected
    blacklist = disabled.filter( function(v)  {return !this._contains(v, values);}.bind(this))
    data      = data.filter( function(v)  {return !this._contains(v, blacklist);}.bind(this))

    if ( data.length === values.length) {
      data = disabled.filter( function(v)  {return this._contains(v, values);}.bind(this))
      data = data.map( function(v)  {return this._dataItem(this._data(), v);}.bind(this))
    }

    this.notify('onChange', [data])
  },

  _change: function(item, checked){
    var multiple  = !!this.props.multiple
      , blacklist = this.props.disabled || this.props.readOnly 
      , values    = this.state.dataItems;

    blacklist = Array.isArray(blacklist) ? blacklist : [];

    if(this._contains(item, blacklist)) return 

    if ( !multiple )
      return this.notify('onChange', checked ? item : null)

    values = checked 
      ? values.concat(item)
      : values.filter( function(v)  {return v !== item;})

    this.notify('onChange', [values || []])
  },

  _focus: function(focused, e){
    var self = this;

    clearTimeout(self.timer)

    self.timer = setTimeout(function(){
      if( focused) self.getDOMNode().focus()
      if( focused !== self.state.focused){
        self.setState({ focused: focused })
        //!focused && self.next(0)
      }
    }, 0)
  },

  isDisabledItem: function(item) {
    return this.isDisabled() || this._contains(item, this.props.disabled)
  },

  isReadOnlyItem: function(item) {
    return this.isReadOnly() || this._contains(item, this.props.readOnly)
  },

  _locate: function(word){
    var idx = this.findNextWordIndex(word, this.state.focusedIndex);

    if ( idx !== -1) 
      this.setFocusedIndex(idx)
  },

  _data:function(){
    return this.props.data
  },

  _contains: function(item, values){
    return Array.isArray(values) 
      ? values.some(this._valueMatcher.bind(null, item))
      : this._valueMatcher(item, values)
  },

  _values: function(){
    return !!this.props.multiple 
      ? this.state.dataItems
      : this.props.value
  },

  _setScrollPosition: function(){
    // var list = this.refs.list.getDOMNode()
    //   , selected = list.children[this.state.focusedIndex]
    //   , handler  = this.props.onMove || scrollTo;

    // if ( this.state.focusedIndex !== -1 )
    //   handler(selected)
  }

});

var SelectListItem = React.createClass({displayName: 'SelectListItem',

  render: function() {
    var $__0=   this.props,children=$__0.children,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{children:1});

    return (
      React.createElement("label", {
        className: cx({ 
          'rw-state-disabled': props.disabled,
          'rw-state-readonly': props.readOnly
        })}, 
        React.createElement("input", React.__spread({},   props, 
          {tabIndex: "-1", 
          onChange: change, 
          disabled: props.disabled || props.readOnly, 
          'aria-disabled':  props.disabled ||props.readOnly})), 
          children 
      )
    );

    function change(e){
      if( !props.disabled && !props.readOnly)
        props.onChange(e.target.checked)
    }
  },

})


module.exports = SelectList;

module.exports = controlledInput.createControlledClass(
    SelectList, { value: 'onChange' });

module.exports.BaseSelectList = SelectList