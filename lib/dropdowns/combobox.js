/**  React.DOM */
var React  = require('react')
  , cx = require('../util/cx')
  , _      = require('lodash')
  , caretPos = require('../util/caret')
  , filter = require('../util/filter')
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , directions = require('../util/constants').directions
  , Input  = require('./combo-input')
  , Popup  = require('../popup/popup')
  , List   = require('../common/list')
  , $      = require('../util/dom');

var btn = require('../common/btn')
  , propTypes = {
      value:          React.PropTypes.any,
      onChange:       React.PropTypes.func,

      itemComponent:  React.PropTypes.func,
      
      data:           React.PropTypes.array,
      valueField:     React.PropTypes.string,
      textField:      React.PropTypes.string,

      suggest:        React.PropTypes.bool,

      messages:       React.PropTypes.shape({
        open:         React.PropTypes.string,
        emptyList:    React.PropTypes.string,
        emptyFilter:  React.PropTypes.string
      })
    };

module.exports = React.createClass({

  displayName: 'ComboBox',

  mixins: [ 
    require('../mixins/DataHelpersMixin'),
    require('../mixins/TextSearchMixin'),
    require('../mixins/DataFilterMixin'),
    require('../mixins/RtlParentContextMixin'),
    require('../mixins/DataIndexStateMixin')('selectedIndex'), 
    require('../mixins/DataIndexStateMixin')('focusedIndex')    
  ],

  propTypes: propTypes,

	getInitialState: function(){
    var items = this.process(
          this.props.data
        , this.props.value)
      , idx = this._dataIndexOf(items, this.props.value);

		return {
			selectedIndex: idx,
      focusedIndex:  idx === -1 ? 0 : idx,
      processedData: items,
			open:          false
		}
	},

  getDefaultProps: function(){
    return {
      suggest: false,
      filter: false,
      delay: 500,

      messages: {
        open: 'open combobox',
        emptyList:   "There are no items in this list",
        emptyFilter: "The filter returned no results"
      }
    }
  },

  shouldComponentUpdate: function(nextProps, nextState){
    var stateChanged = !_.isEqual(nextState, this.state) 
      , valueChanged = !_.isEqual(nextProps.value, this.props.value)

    return stateChanged || valueChanged
  },

  componentWillReceiveProps: function(nextProps) {
    var inData = this._dataIndexOf(nextProps.data, nextProps.value) !== - 1
      , items = this.process(
          nextProps.data
        , nextProps.value
        , !inData && this._dataText(nextProps.value) ) // this._dataText(nextProps.value)

      , idx = this._dataIndexOf(items, nextProps.value);

    this._searchTerm = '';

    this.setState({
      processedData:  items,
      selectedIndex:  idx,
      focusedIndex:   idx === -1 
        ? this.findIndex(this._dataText(this.props.value)) 
        : idx
    })
  },

  componentDidUpdate: function(prevProps, prevState){
    var input = this.refs.input.getDOMNode()
      , val = this._dataText(this.props.value);

    this.state.focused && input.focus()
    this.setWidth()
  },

	render: function(){ 
		var DropdownValue = this.props.valueComponent
      , items = this._data()
      , listID = this.props.id && this.props.id + '_listbox'
      , optID  = this.props.id && this.props.id + '_option'
      , completeType = this.props.suggest 
          ? this.props.filter ? 'both' : 'inline'
          : this.props.filter ? 'list' : '';

		return mergeIntoProps(
      _.omit(this.props, _.keys(propTypes)),
			React.DOM.div({ref: "element", 
           'aria-expanded':  this.state.open, 
           'aria-haspopup': true, 
           onKeyDown: this._keyDown, 
           onFocus: this._focus.bind(null, true), 
           onBlur: this._focus.bind(null, false), 

           tabIndex: "-1", 
           className: cx({
              'rw-combobox': true,
              'rw-widget':       true,
              'rw-state-focus':  this.state.focused,
              'rw-open':         this.state.open,
              'rw-rtl':          this.isRtl()
            })}, 

        btn({className: "rw-select", onClick: this.toggle}, 
          React.DOM.i({className: "rw-i rw-i-caret-down"}, React.DOM.span({className: "rw-sr"},  this.props.messages.open))
        ), 
        Input({
          ref: "input", 
          type: "text", 
          role: "combobox", 
          suggest: this.props.suggest, 
          'aria-autocomplete': completeType, 
          className: "rw-input", 
          value: this._dataText(this.props.value), 
          onChange: this._inputTyping, 
          onKeyDown: this._inputKeyDown}), 

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
              'aria-live':  completeType && 'polite', 
              style: { maxHeight: 200, height: 'auto'}, 
              data: items, 
              value: this.props.value, 
              selectedIndex: this.state.selectedIndex, 
              focusedIndex: this.state.selectedIndex === -1 
                ? this.state.focusedIndex 
                : this.state.selectedIndex, 
              textField: this.props.textField, 
              valueField: this.props.valueField, 
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

  _onSelect: function(data, idx, elem){
    this.close()
    this.change(data)
    this._focus(true);
  },

  _inputKeyDown: function(e){
    this._deleting = e.key === 'Backspace' || e.key === 'Delete'
    this._isTyping = true
  },

  _inputTyping: function(e){
    var self = this
      , shouldSuggest = !!this.props.suggest
      , strVal  = e.target.value
      , suggestion, data;

    suggestion = this._deleting || !shouldSuggest
      ? strVal : this.suggest(this._data(), strVal)

    suggestion = suggestion || strVal

    data = _.find(self.props.data, function(item) { 
      return self._dataText(item).toLowerCase() === suggestion.toLowerCase()
    })

    this.change(!this._deleting && data 
      ? data 
      : strVal, true)

    this.open()
  },

  _focus: function(focused, e){
    var self = this;

    clearTimeout(self.timer)
    self.timer = setTimeout(function(){
      if( focused !== self.state.focused) {
        self.setState({ focused: focused })
        if(!focused) self.close()
      }
    }, 0)
  },

  _keyDown: function(e){
    var self = this
      , key = e.key
      , alt = e.altKey
      , character = String.fromCharCode(e.keyCode)
      , selectedIdx = this.state.selectedIndex
      , focusedIdx  = this.state.focusedIndex
      , isOpen = this.state.open
      , noselection = selectedIdx == null || selectedIdx === -1 ;

    if ( key === 'End' ) 
      select(this._data().length - 1)
    
    else if ( key === 'Home' ) 
      select(0)

    else if ( key === 'Enter' && isOpen ) {
      select(focusedIdx)
      this.close()
    }

    else if ( key === 'ArrowDown' ) {
      if ( alt ) 
        this.open()
      else {
        if( noselection) select(focusedIdx)
        else select(this.nextSelectedIndex())
      }
    } 
    else if ( key === 'ArrowUp' ) {
      if ( alt )
        this.close()
      else {
        if( noselection) select(focusedIdx)
        else select(this.prevSelectedIndex())
      }
    }

    function select(idx) {
      self.change(self._data()[idx], false)
    }
  },

  change: function(data, typing){
    var change = this.props.onChange 

    this._typedChange = !!typing

    if ( change ) change(data)  
  },

  open: function(){
    if ( !this.state.open )
      this.setState({ open: true })
  },

  close: function(){
    if ( this.state.open )
      this.setState({ open: false })
  },

  toggle: function(e){
    this._focus(true)

    this.state.open 
      ? this.close() 
      : this.open()
  },

  suggest: function(data, value){
    var word = this._dataText(value)
      , matcher = filter.startsWith
      , suggestion = typeof value === 'string'
          ? _.find(data, finder, this)
          : value
 
    if ( suggestion && (!this.state || !this.state.deleting)) 
      return this._dataText(suggestion)

    return ''

    function finder(item){
      return matcher(
          this._dataText(item).toLowerCase()
        , word.toLowerCase())
    }
  },

	_getAnchor: function(){
		return this.refs.element.getDOMNode()
	},

  _data: function(){
    return this.state.processedData
  },

  process: function(data, values, searchTerm){

    if( this.props.filter && searchTerm)
      data = this.filter(data, searchTerm)

    return data
  },
})
