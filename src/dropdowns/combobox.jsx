var React  = require('react/addons')
  , cx     = React.addons.classSet
  , _      = require('lodash')
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
      //suggestion:     this.suggest(nextProps),
      processedData:  items,
      currentText:    this._dataText(nextProps.value)
    })
  },

  componentDidMount: function(){
    this.setWidth()
  },

  // componentDidUpdate: function(pvProps, pvState){
  //   if ( this.state.selectedIndex !== -1 && pvState.selectedIndex !== this.state.selectedIndex)
  //     this.change(this.props.data[this.state.selectedIndex])
  // },

	render: function(){ 
		var DropdownValue = this.props.valueComponent
      , items = this._data()
      , text  = this.state.currentText;

    console.log(text)
		return (
			<div ref="element"
           onKeyUp={this._keyPress}
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
          type='text'
          className='rw-input'
          value={text}
          onChange={this._onChange}
          onKeyUp={this._typing}/>

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
    this.setState({
      deleting: e.key === 'Backspace'
    })
  },

  _onChange: function(e, text){
    var self = this
      , val  = _.find(self.props.data, function(item) { 
          return self._dataText(item).toLowerCase() === e.target.value.toLowerCase()
        });

    this.change(val
      ? val
      : e.target.value)

    this.open()
  },

  _focus: function(focused){
    this.setState({ focused: focused })
  },


  _keyPress: function(e){
    var self = this
      , key = e.key
      , alt = e.altKey
      , character = String.fromCharCode(e.keyCode)
      , selectedIdx = this.state.selectedIndex
      , focusedIdx  = this.state.focusedIndex
      , isOpen = this.state.open
      , noselection = !selectedIdx || selectedIdx === -1 ;

    if ( key === 'End' ) 
      self.setFocusedIndex(this._data().length - 1)
          .setSelectedIndex(this._data().length - 1)
    
    else if ( key === 'Home' ) 
      self.setFocusedIndex(0)
          .setSelectedIndex(0)

    else if ( key === 'Enter' && isOpen ) 
      setFocused()

    else if ( key === 'ArrowDown' ) {
      if ( alt ) 
        this.open()
      else {
        if( noselection) setFocused()
        else
          this.moveFocusedIndex(directions.UP)
              .moveSelectedIndex(directions.UP)
      }
    } 
    else if ( key === 'ArrowUp' ) {
      if ( alt )
        this.close()
      else {
        if( noselection) setFocused()
        else
          this.moveFocusedIndex(directions.DOWN)
              .moveSelectedIndex(directions.DOWN)
      }
    }

    function setFocused(){
      self.change(self._data()[focusedIdx])
    }
  },

  change: function(data, idx){
    var change = this.props.onChange 
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
    this.state.open 
      ? this.close() 
      : this.open()
  },

  suggest: function(props){
    var word = this._dataText(props.value)
      , matcher = filter[props.filter]
      , suggestion = _.findIndex(props.data, function(item){
          return matcher(
                this._dataText(item).toLowerCase()
              , word.toLowerCase())
        }, this)

    if ( suggestion && (!this.state || !this.state.deleting)) 
      return this._dataText(suggestion)

    return ''
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
