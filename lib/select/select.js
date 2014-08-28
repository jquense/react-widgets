/**  React.DOM */
'use strict';
var React = require('react')
  , cx = require('../util/cx')
  , _     =  require('lodash')
  , $     =  require('../util/dom')
  , directions = require('../util/constants').directions
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , SelectInput = require('./search-input')
  , TagList = require('./tag-list')
  , Popup = require('../popup/popup')
  , List  = require('../common/list');

var btn = require('../common/btn')
  , propTypes = {
      data:           React.PropTypes.array,
      value:          React.PropTypes.array,
      onChange:       React.PropTypes.func,

      valueField:     React.PropTypes.string,
      textField:      React.PropTypes.string,

      tagComponent:   React.PropTypes.func,
      itemComponent:  React.PropTypes.func,

      messages:       React.PropTypes.shape({
        open:         React.PropTypes.string,
        emptyList:    React.PropTypes.string,
        emptyFilter:  React.PropTypes.string
      })
    };

module.exports = React.createClass({

  displayName: 'Select',
  
  mixins: [ 
    require('../mixins/DataHelpersMixin'),
    require('../mixins/DataFilterMixin'),
    require('../mixins/RtlParentContextMixin'),
    require('../mixins/DataIndexStateMixin')('focusedIndex') 
  ],

  propTypes: propTypes,

  getDefaultProps: function(){
    return {
      filter: 'startsWith',
      messages: {
        emptyList:   "There are no items in this list",
        emptyFilter: "The filter returned no results"
      }
    }
  },

  getInitialState: function(){
    var initialIdx = this._dataIndexOf(this.props.data, this.props.value);

    return {
      open:  false,
      processedData: this.process(this.props.data, this.props.value, ''),
      focusedIndex:  initialIdx === -1 ? 0 : initialIdx
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var idx = -1
      , items = this.process(
          nextProps.data
        , nextProps.value
        , this.state.searchTerm)

    this.setState({
      processedData: items
    })
  },

  componentDidMount: function(pvProps, pvState){
    this.setWidth()
  },

  render: function(){ 
    var listID = this.props.id && this.props.id + '_listbox'
      , optID  = this.props.id && this.props.id + '_option'
      , items = this._data()

    return mergeIntoProps(
      _.omit(this.props, _.keys(propTypes)),
      React.DOM.div({ref: "element", 
           'aria-haspopup': true, 
           onKeyDown: this._keyDown, 
           onFocus: this._focus.bind(null, true), 
           onBlur: this._focus.bind(null, false), 
           tabIndex: "-1", 
           className: cx({
              'rw-select-list':  true,
              'rw-widget':       true,
              'rw-state-focus':  this.state.focused,
              'rw-open':         this.state.open,
              'rw-rtl':          this.isRtl()
            })}, 
        React.DOM.div({className: "rw-select-wrapper", onClick: this._click}, 
           this.props.busy &&
            React.DOM.i({className: "rw-i rw-loading"}), 
          
          TagList({
            ref: "tagList", 
            value: [].concat(this.props.value), 
            textField: this.props.textField, 
            valueField: this.props.valueField, 
            valueComponent: this.props.tagComponent, 
            onDelete: this._delete}), 
          SelectInput({
            'aria-expanded':  this.state.open, 
            'aria-busy': !!this.props.busy, 
            'aria-owns': listID, 
            value: this.state.searchTerm, 
            placeholder: this._placeholder(), 
            focused: this.state.focused, 
            onChange: this._typing})
        ), 
        Popup({
          style: { width: this.state.width}, 
          getAnchor:  this._getAnchor, 
          open: this.state.open, 
          onRequestClose: this.close}, 

          React.DOM.div(null, 
            List({ref: "list", 
              id: listID, 
              optID: optID, 
              'aria-hidden':  !this.state.open, 
              style: { maxHeight: 200, height: 'auto'}, 
              data: items, 
              value: this.props.value, 
              textField: this.props.textField, 
              valueField: this.props.valueField, 
              focusedIndex: this.state.focusedIndex, 
              onSelect: this._onSelect, 
              listItem: this.props.itemComponent, 
              messages: {
                emptyList: this.props.data.length 
                  ? this.props.messages.emptyFilter
                  : this.props.messages.emptyList
              }})
          )
        )
      )
    )
  },

  setWidth: function() {
    var width = $.width(this.getDOMNode())
      , changed = width !== this.state.width;

    if ( changed )
      this.setState({ width: width })
  },

  _data: function(){
    return this.state.processedData
  },

  _delete: function(value){
    this._focus(true)
    this.change(
      _.without(this.props.value, value))
  },

  _click: function(e){
    this._focus(true)
    !this.state.open && this.open()
  },

  _focus: function(focused){
    var self = this;

    clearTimeout(self.timer)
    self.timer = setTimeout(function(){
      if( focused !== self.state.focused) {
        self.setState({ focused: focused })
        if(!focused) self.close()
      }
    }, 0)
  },

  _typing: function(e){
    var items = this.process(this.props.data, this.props.value, e.target.value);

    this.setState({
      searchTerm: e.target.value,
      processedData: items,
      open: this.state.open || (this.state.open === false),
      focusedIndex: items.length >= this.state.focusedIndex 
        ? 0 
        : this.state.focusedIndex
    })
  },

  _onSelect: function(data){
    this.change(this.props.value.concat(data))
    this.close()
    this._focus(true)
  },

  _keyDown: function(e){
    var key = e.key
      , alt = e.altKey
      , searching = !!this.state.searchTerm
      , isOpen = this.state.open;

    if ( key === 'ArrowDown') {
      if ( isOpen ) this.setFocusedIndex(this.nextFocusedIndex())
      else          this.open()
    }
    else if ( key === 'ArrowUp') {
      if ( alt)          this.close()
      else if ( isOpen ) this.setFocusedIndex(
        this.prevFocusedIndex())
    }
    else if ( key === 'End'){
      if ( isOpen ) this.setFocusedIndex(this._data().length - 1)
      else          this.refs.tagList.last()
    }  
    else if (  key === 'Home'){
      if ( isOpen ) this.setFocusedIndex(0)
      else          this.refs.tagList.first()
    }
    else if ( isOpen && key === 'Enter' ) 
      this._onSelect(this._data()[this.state.focusedIndex])

    else if ( key === 'Esc')
      isOpen ? this.close() : this.refs.tagList.clear()

    else if ( !searching && key === 'ArrowLeft')
      this.refs.tagList.prev()

    else if ( !searching && key === 'ArrowRight')
      this.refs.tagList.next() 

    else if ( !searching && key === 'Delete')
      this.refs.tagList.removeCurrent()

    else if ( !searching && key === 'Backspace')
      this.refs.tagList.removeNext()
    
  },

  change: function(data){
    var change = this.props.onChange 

    if ( change ) change(data)  
  },

  open: function(){
    this.setState({ open: true })
  },

  close: function(){
    this.setState({ open: false })
  },

  toggle: function(e){
    this.state.open 
      ? this.close() 
      : this.open()
  },

  process: function(data, values, searchTerm){
    var items = _.reject(data, function(i){
        return _.any(
            values
          , _.partial(this._valueMatcher, i)
          , this)
      }, this)

    if( searchTerm)
      items = this.filter(items, searchTerm)

    return items
  },

  _placeholder: function(){
    return this.props.value.length 
      ? '' 
      : (this.props.placeholder || '')
  },

  _getAnchor: function(){
    return this.refs.element.getDOMNode()
  }
})
