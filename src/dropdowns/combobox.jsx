var React  = require('react')
  , cx = require('../util/cx')
  , _      = require('lodash')
  , caretPos = require('../util/caret')
  , filter = require('../util/filter')
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , directions = require('../util/constants').directions
  , Input  = require('./combo-input.jsx')
  , Popup  = require('../popup/popup.jsx')
  , List   = require('../common/list.jsx')
  , $      = require('../util/dom');

var btn = require('../common/btn.jsx')
  , propTypes = {
      value:          React.PropTypes.any,
      onChange:       React.PropTypes.func,

      itemComponent:  React.PropTypes.func,
      
      data:           React.PropTypes.array,
      valueField:     React.PropTypes.string,
      textField:      React.PropTypes.string,

      disabled:       React.PropTypes.oneOfType([
                        React.PropTypes.bool,
                        React.PropTypes.oneOf(['disabled'])
                      ]),

      readOnly:       React.PropTypes.oneOfType([
                        React.PropTypes.bool,
                        React.PropTypes.oneOf(['readOnly'])
                      ]),

      suggest:        React.PropTypes.bool,
      busy:           React.PropTypes.bool,

      filter:         React.PropTypes.any,

      duration:       React.PropTypes.number, //popup
      placeholder:    React.PropTypes.string, 
      
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
    require('../mixins/DataIndexStateMixin')('focusedIndex'),  
    require('../mixins/DataIndexStateMixin')('selectedIndex') 
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
      data: [],
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
    var isSuggesting = this.refs.input && this.refs.input.isSuggesting()
      , stateChanged = !_.isEqual(nextState, this.state) 
      , valueChanged = !_.isEqual(nextProps.value, this.props.value)

    return isSuggesting || stateChanged || valueChanged
  },

  componentWillReceiveProps: function(nextProps) {
    var rawIdx = this._dataIndexOf(nextProps.data, nextProps.value)
      , valueItem = rawIdx == -1 ? nextProps.value : nextProps.data[rawIdx]
      , isSuggesting = this.refs.input.isSuggesting()
      , items = this.process(
          nextProps.data
        , nextProps.value
        , (rawIdx === -1 || isSuggesting) && this._dataText(valueItem) ) 

      , idx = this._dataIndexOf(items, nextProps.value)
      , focused = this.filterIndexOf(items, this._dataText(valueItem));

    //console.log('set it', this._dataText(valueItem))
    this._searchTerm = '';

    this.setState({
      processedData:  items,
      selectedIndex:  idx,
      focusedIndex:   idx === -1 
        ? focused !== -1 ? focused : 0 // focus the closest match
        : idx
    })
  },

	render: function(){ 
		var DropdownValue = this.props.valueComponent
      , valueItem = this._dataItem( this._data(), this.props.value )
      , items = this._data()
      , listID = this._id('_listbox')
      , optID  = this._id( '_option')
      , completeType = this.props.suggest 
          ? this.props.filter ? 'both' : 'inline'
          : this.props.filter ? 'list' : '';

		return mergeIntoProps(
      _.omit(this.props, _.keys(propTypes)),
			<div ref="element"
           onKeyDown={this._maybeHandle(this._keyDown)}
           onFocus={this._maybeHandle(_.partial(this._focus, true), true)} 
           onBlur ={this._focus.bind(null, false)}
           tabIndex="-1"
           className={cx({
              'rw-combobox':        true,
              'rw-widget':          true,
              'rw-state-focus':     this.state.focused,
              'rw-open':            this.state.open,
              'rw-state-disabled':  this.props.disabled,
              'rw-state-readonly':  this.props.readOnly,
              'rw-rtl':             this.isRtl()
            })}>
        <btn 
          tabIndex='-1'
          className='rw-select' 
          onClick={this._maybeHandle(this.toggle)} 
          disabled={!!(this.props.disabled || this.props.readOnly)}>
          <i className={"rw-i rw-i-caret-down" + (this.props.busy ? ' rw-loading' : "")}>
            <span className="rw-sr">{ this.props.messages.open }</span>
          </i>
        </btn>
        <Input
          ref='input'
          type='text'
          role='combobox'
          suggest={this.props.suggest}
          aria-owns={listID}
          aria-busy={!!this.props.busy}
          aria-autocomplete={completeType}
          aria-activedescendent={ this.state.open ? optID : undefined }
          aria-expanded={ this.state.open }
          aria-haspopup={true}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          className='rw-input'
          value={ this._dataText(valueItem) }
          onChange={this._inputTyping}
          onKeyDown={this._inputKeyDown}/>

        <Popup open={this.state.open} onRequestClose={this.close} duration={this.props.duration}> 
          <div>
            <List ref="list"
              id={listID}
              optID={optID}
              aria-hidden={ !this.state.open }
              aria-live={ completeType && 'polite' }
              style={{ maxHeight: 200, height: 'auto' }}
              data={items} 
              selectedIndex={this.state.selectedIndex}
              focusedIndex={this.state.focusedIndex}

              textField={this.props.textField} 
              valueField={this.props.valueField}
              onSelect={this._maybeHandle(this._onSelect)}
              listItem={this.props.itemComponent}
              messages={{
                emptyList: this.props.data.length 
                  ? this.props.messages.emptyFilter
                  : this.props.messages.emptyList
              }}/>
          </div>
        </Popup>
			</div>
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
    !focused && self.refs.input.accept() //not suggesting anymore

    self.timer = setTimeout(function(){
      if(focused) self.refs.input.focus()
      else        self.close()

      if( focused !== self.state.focused)
        self.setState({ focused: focused })
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

    //console.log('focused:', focusedIdx, 'select: ', selectedIdx)
    if ( key === 'End' ) 
      select(this._data().length - 1)
    
    else if ( key === 'Home' ) 
      select(0)

    else if ( key === 'Escape' && isOpen )
      this.close()
    
    else if ( key === 'Enter' && isOpen ) {
      select(focusedIdx)
      this.close()
    }

    else if ( key === 'ArrowDown' ) {
      if ( alt ) 
        this.open()
      else {
        //if( noselection) select(focusedIdx)
        if ( isOpen ) this.setFocusedIndex(this.nextFocusedIndex())
        else select(this.nextSelectedIndex())
      }
    } 
    else if ( key === 'ArrowUp' ) {
      if ( alt )
        this.close()
      else {
        //if( noselection) select(focusedIdx)
        if ( isOpen ) this.setFocusedIndex(this.prevFocusedIndex())
        else select(this.prevSelectedIndex())
      }
    }

    function select(idx) {
      if( idx === -1 || self._data().length === 0) 
        return self.change(self.refs.input.value, false)

      self.refs.input.accept(true); //removes caret
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

  _maybeHandle: function(handler, disabledOnly){
    //console.log(!(this.props.disabled || (!disabledOnly &&this.props.readOnly)))
    if ( !(this.props.disabled || (!disabledOnly &&this.props.readOnly)))
      return handler
  },

  _data: function(){
    return this.state.processedData
  },

  _id: function(suffix){
    return (_id || (_id = (this.props.id || _.uniqueId('rw_'))))  + suffix
  },

  process: function(data, values, searchTerm){
    if( this.props.filter && searchTerm)
      data = this.filter(data, searchTerm)

    return data
  }
})

var _id = ''