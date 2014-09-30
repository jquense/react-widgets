/**  React.DOM */
var React = require('react')
  , _ = require('lodash')
  , cx = require('../util/cx')
  , setter = require('../util/stateSetter')
  , compose = require('../util/compose')
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , directions = require('../util/constants').directions
  , DefaultValueItem = require('./value-item')
  , Popup = require('../popup/popup')
  , List  = require('../common/list')
  , $     = require('../util/dom');

var btn = require('../common/btn')
  , ifShouldUpdate = compose.provided(function(props){
      return !_.isEqual(props.value, this.props.value)
    })
  , ifValueChanges = compose.provided(function(data){
      return !_.isEqual(data, this.props.value)
    });

var propTypes = {
  //main input interface
  value:          React.PropTypes.any,
  onChange:       React.PropTypes.func,

  data:           React.PropTypes.array,
  valueField:     React.PropTypes.string,
  textField:      React.PropTypes.string,

  valueComponent: React.PropTypes.component,
  itemComponent:  React.PropTypes.component,
  busy:           React.PropTypes.bool,

  delay:          React.PropTypes.number,

  duration:       React.PropTypes.number, //popup
  
  messages:       React.PropTypes.shape({
    open:         React.PropTypes.string,
  })
};

module.exports = React.createClass({

  displayName: 'DropdownList',

  mixins: [
    require('../mixins/PureRenderMixin'),
    require('../mixins/TextSearchMixin'),
    require('../mixins/DataHelpersMixin'),
    require('../mixins/RtlParentContextMixin'),
    require('../mixins/DataIndexStateMixin')('selectedIndex'),
    require('../mixins/DataIndexStateMixin')('focusedIndex')
  ],

  propTypes: propTypes,

	getInitialState: function(){
    var initialIdx = this._dataIndexOf(this.props.data, this.props.value);

		return {
			open:          false,
      selectedIndex: initialIdx,
      focusedIndex:  initialIdx === -1 ? 0 : initialIdx,
		}
	},

  getDefaultProps: function(){
    return {
      delay: 500,
      value: null,
      data: [],
      messages: {
        open: 'open dropdown'
      }
    }
  },

  componentWillReceiveProps: ifShouldUpdate(function(props){
    var idx = this._dataIndexOf(props.data, props.value);

    this.setSelectedIndex(idx)
    this.setFocusedIndex(idx === -1 ? 0 : idx)
  }),

  // componentDidUpdate: function(){
  //   if( this.state.open)
  //     this.setWidth()
  // },

	render: function(){
		var keys = _.keys(propTypes)
      , valueItem = this._dataItem( this._data(), this.props.value )
      , optID = this.props.id && this.props.id + '_option' || '';

		return mergeIntoProps(
      _.omit(this.props, keys),
			React.DOM.div({ref: "element", 
           onKeyDown: this._keyDown, 
           onClick: this.toggle, 
           onFocus: this._focus.bind(null, true), 
           onBlur: this._focus.bind(null, false), 
           'aria-expanded':  this.state.open, 
           'aria-haspopup': true, 
           'aria-activedescendent': optID, 
           tabIndex: "0", 
           className: cx({
              'rw-dropdown-list': true,
              'rw-widget':       true,
              'rw-state-focus':  this.state.focused,
              'rw-open':         this.state.open,
              'rw-rtl':          this.isRtl()
            })}, 

				React.DOM.span({className: "rw-dropdownlist-picker rw-select rw-btn"}, 
					React.DOM.i({className: "rw-i rw-i-caret-down" + (this.props.busy ? ' rw-loading' : "")}, 
            React.DOM.span({className: "rw-sr"},  this.props.messages.open)
          )
				), 
        React.DOM.div({className: "rw-input"}, 
           this.props.valueComponent
              ? this.props.valueComponent({ item: valueItem })
              : this._dataText(valueItem)
          
        ), 


        Popup({open: this.state.open, onRequestClose: this.close, duration: this.props.duration}, 
          React.DOM.div(null, 
            List({ref: "list", 
              optID: optID, 
              'aria-hidden':  !this.state.open, 
              style: { maxHeight: 200, height: 'auto'}, 
              data: this.props.data, 
              initialVisibleItems: this.props.initialBufferSize, 
              itemHeight: 18, 
              selectedIndex: this.state.selectedIndex, 
              focusedIndex: this.state.focusedIndex, 
              textField: this.props.textField, 
              valueField: this.props.valueField, 
              listItem: this.props.itemComponent, 
              onSelect: this._onSelect})
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

  _focus: function(focused){
    var self = this;

    clearTimeout(self.timer)
    self.timer = setTimeout(function(){

      if(focused) self.getDOMNode().focus()
      else        self.close()

      if( focused !== self.state.focused)
        self.setState({ focused: focused })

    }, 0)
  },

  _onSelect: function(data, idx, elem){
    this.close()
    this.change(data)
  },

  _keyDown: function(e){
    var self = this
      , key = e.key
      , alt = e.altKey
      , isOpen = this.state.open;

    if ( key === 'End' ) {
      if ( isOpen) this.setFocusedIndex(this._data().length - 1)
      else change(this._data().length - 1)
      e.preventDefault()
    }
    else if ( key === 'Home' ) {
      if ( isOpen) this.setFocusedIndex(0)
      else change(0)
      e.preventDefault()
    }
    else if ( key === 'Enter' && isOpen ) {
      change(this.state.focusedIndex)
    }
    else if ( key === 'ArrowDown' ) {
      if ( alt )         this.open()
      else if ( isOpen ) this.setFocusedIndex(this.nextFocusedIndex())
      else               change(this.nextSelectedIndex())
      e.preventDefault()
    }
    else if ( key === 'ArrowUp' ) {
      if ( alt )         this.close()
      else if ( isOpen ) this.setFocusedIndex(this.prevFocusedIndex())
      else               change(this.prevSelectedIndex())
      e.preventDefault()
    }
    else
      this.search(
          String.fromCharCode(e.keyCode)
        , this._locate)

    function change(idx){
      self.change(self._data()[idx])
    }
  },

  change: ifValueChanges(function(data){
    var change = this.props.onChange
    if ( change ) {
      change(data)
      this.close()
    }
  }),

  _locate: function(word){
    var key = this.state.open ? 'focusedIndex' : 'selectedIndex'
      , idx = this.findIndex(word, this.state[key])
      , setIndex = setter(key).bind(this);

    if ( idx !== -1)
      setIndex(idx)
  },

  _data: function(){
    return this.props.data
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
  }
  
})
