var React  = require('react/addons')
  , cx     = React.addons.classSet
  , _      = require('lodash')
  , caretPos = require('../util/caret')
  , filter = require('../util/filter')
  , directions = require('../util/constants').directions
  , Input  = require('./combo-input.jsx')
  , Popup  = require('../popup/popup.jsx')
  , List   = require('../common/list.jsx');

var btn = require('../common/btn.jsx')

module.exports = React.createClass({

  displayName: 'ComboBox',

  mixins: [ 
    require('../mixins/DataHelpersMixin'),
    require('../mixins/TextSearchMixin'),

    require('../mixins/DataIndexStateMixin')('selectedIndex'), 
    require('../mixins/DataIndexStateMixin')('focusedIndex')    
  ],

  propTypes: {
    data:           React.PropTypes.array,
    valueField:     React.PropTypes.string,
    textField:      React.PropTypes.string,
    delay:          React.PropTypes.number,
    filter:         React.PropTypes.oneOfType([
                      React.PropTypes.string,
                      React.PropTypes.oneOf([false])
                    ]),

    messages:       React.PropTypes.shape({
      open:         React.PropTypes.string,
      emptyList:    React.PropTypes.string,
      emptyFilter:  React.PropTypes.string
    })
  },

	getInitialState: function(){
    var items = this.process(
          this.props.data
        , this.props.value)

      , idx = this._dataIndexOf(items, this.props.value);

		return {
			selectedIndex: idx,
      focusedIndex:  idx === -1 ? 0 : idx,
      currentText:   this._dataText(this.props.value),
      processedData: items,
      //suggestion:    this.suggest(this.props),
      deleting:      false,
			open:          false
		}
	},

  getDefaultProps: function(){
    return {
      filter: false,
      delay: 500,

      messages: {
        open: 'open combobox',
        emptyList:   "There are no items in this list",
        emptyFilter: "The filter returned no results"
      }
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var items = this.process(
          nextProps.data
        , nextProps.value
        , this._dataText(this.props.value))

      , idx = this._dataIndexOf(items, nextProps.value);

    this.setState({
      selectedIndex:  idx,
      focusedIndex:   idx === -1 
        ? this.findIndex(this._dataText(this.props.value)) 
        : idx,
     // suggestion:     this.suggest(nextProps),
      processedData:  items
    })
  },

  componentWillUpdate: function(nextProps, nextState){
    var input = this.refs.input.getDOMNode();
    this._lastSelection = caretPos(input)
  },

  componentDidUpdate: function(prevProps, prevState){
    var input = this.refs.input.getDOMNode()
      //, suggestion = this.suggest(this.props)
      , val = this._dataText(this.props.value);

    this.state.focused && input.focus()

    if ( this.state.start != null)
      caretPos(input, this.state.start, this.state.end)

    this.setWidth()
  },

	render: function(){ 
		var DropdownValue = this.props.valueComponent
      , items = this._data();

		return (
			<div ref="element"
           onKeyUp={this._keyPress}
           onFocus={this._focus.bind(null, true)} 
           onBlur ={this._focus.bind(null, false)}
           tabIndex="-1"
           className={cx({
              'rw-combobox': true,
              'rw-widget':       true,
              'rw-state-focus':  this.state.focused,
              'rw-open':         this.state.open
            })}>

        <btn className='rw-select' onClick={this.toggle}>
          <i className="rw-i rw-i-caret-down"><span className="rw-sr">{ this.props.messages.open }</span></i>
        </btn>
        <input
          ref='input'
          type='text'
          className='rw-input'
          value={this._dataText(this.props.value)}
          onChange={this._onChange}
          onKeyDown={this._typing}/>

        <Popup 
          style={{ width: this.state.width }}
          getAnchor={ this._getAnchor } 
          open={this.state.open} 
          onRequestClose={this.close}>
          
          <div>
            <List ref="list"
              style={{ maxHeight: 200, height: 'auto' }}
              data={items} 
              value={this.props.value}
              selectedIndex={this.state.selectedIndex}
              focusedIndex={this.state.selectedIndex === -1 
                ? this.state.focusedIndex 
                : this.state.selectedIndex}
              textField={this.props.textField} 
              valueField={this.props.valueField}
              onSelect={this._onSelect}
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
    var width = $(this.getDOMNode()).width()
      , changed = width !== this.state.width;

    if ( changed )
      this.setState({ width: width })   
  },

  _onSelect: function(data, idx, elem){
    this.close()
    this.change(data)
    this._focus();
  },

  _typing: function(e){
    var val = e.target.value

    this._last = val
    this._deleting = e.key === 'Backspace' || e.key === 'Delete'
  },

  _onChange: function(e, text){
    var self = this
      , last = this._last
      , val  = e.target.value
      , suggestion = this._deleting 
          ? e.target.value
          : this.suggest(this._data(), e.target.value) || e.target.value
      , data;

    data = _.find(self.props.data, function(item) { 
      return self._dataText(item).toLowerCase() === suggestion.toLowerCase()
    })

    if ( this._deleting ){
      this.setState({ start: null, end: null })

    }
    else if ( suggestion && val !== suggestion){
      var start = suggestion.indexOf(val) + val.length
        , end   = suggestion.length - start

      if ( start >= 0){
        this.setState({
          start: start,
          end: start + end
        })
      }
    }

    this.change(data
      ? data
      : e.target.value)

    this.open()
  },

  _focus: function(focused){
    this.setState({ focused: focused })

    if(!focused) this.close()
  },

  _keyPress: function(e){
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
      self.setState({ start: null, end: null })
      self.change(self._data()[idx])
    }
  },

  change: function(data, idx){
    var change = this.props.onChange 

    if ( change ) {
      change(data)  
    }
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
