var React = require('react/addons')
  , _ = require('lodash')
  , cx    = React.addons.classSet
  , setter = require('../util/stateSetter')
  , compose = require('../util/compose')
  , directions = require('../util/constants').directions
  , SlideDown = require('../common/collapse-transition.jsx')
  , DefaultValueItem = require('./value-item.jsx')
  , Popup = require('../popup/popup.jsx')
  , List  = require('../common/list.jsx');

var btn = require('../common/btn.jsx')
  , ifShouldUpdate = compose.provided(function(props){
      return !_.isEqual(props.value, this.props.value)
    })
  , ifValueChanges = compose.provided(function(data){
      return !_.isEqual(data, this.props.value)
    })

module.exports = React.createClass({
  
  displayName: 'DropdownList',

  mixins: [ 
    require('../mixins/TextSearchMixin'),
    require('../mixins/DataHelpersMixin'),
    require('../mixins/DataIndexStateMixin')('selectedIndex'), 
    require('../mixins/DataIndexStateMixin')('focusedIndex')    
  ],

  propTypes: {
    data:           React.PropTypes.array,
    valueField:     React.PropTypes.string,
    textField:      React.PropTypes.string,
    valueComponent: React.PropTypes.component,
    delay:          React.PropTypes.number,
    filter:         React.PropTypes.string,
  },

	getInitialState: function(){
    var initialIdx = this._dataIndexOf(this.props.data, this.props.value);

		return {
			open:          false,
      selectedIndex: initialIdx,
      focusedIndex:  initialIdx === -1 ? 0 : initialIdx
		}
	},

  getDefaultProps: function(){
    return {
      valueComponent: DefaultValueItem,
      delay: 500
    }
  },

  componentWillReceiveProps: ifShouldUpdate(function(props){
    var idx = this._dataIndexOf(props.data, props.value);
    
    this.setSelectedIndex(idx)
    this.setFocusedIndex(idx === -1 ? 0 : idx)
  }),

  componentDidMount: function(){
    this.setWidth()
  },

  componentDidUpdate: function(pvProps, pvState){
    if ( pvState.selectedIndex !== this.state.selectedIndex)
      this.change(this.props.data[this.state.selectedIndex])
  },

	render: function(){ 
		var DropdownValue = this.props.valueComponent;

		return (
			<div ref="element"
           onKeyUp={this._keyPress}
           onClick={this.toggle}
           tabIndex="-1"
           className={cx({
              'rw-dropdownlist': true,
              'rw-widget':       true,
              'rw-open':         this.state.open
            })}>

				<span className="rw-dropdownlist-picker rw-select rw-btn">
					<i className="rw-i rw-i-caret-down">
            <span className="rw-sr">Open Dropdown</span>
          </i>
				</span>
				<DropdownValue
            className="rw-input" 
            value={this.props.value}
            textField={this.props.textField} 
            valueField={this.props.valueField}/>

        <Popup 
          style={{ width: this.state.width }}
          getAnchor={ this._getAnchor } 
          open={this.state.open} 
          onRequestClose={this.close} 
          onClose={closed.bind(this)}>
          
          <div>
            <List ref="list"
              style={{ maxHeight: 200, height: 'auto' }}
              data={this.props.data} 
              value={this.props.value}
              selectedIndex={this.state.selectedIndex}
              focusedIndex={this.state.focusedIndex}
              textField={this.props.textField} 
              valueField={this.props.valueField}
              filter={this.props.filter}
              onSelect={this._onSelect}/>
          </div>
        </Popup>
			</div>
		)

    function closed(){
      this.refs.element.getDOMNode().focus()
    }
	},

  setWidth: function() {
    var width = $(this.getDOMNode()).width()
      , popup = $(this.refs.list.getDOMNode())
      , ht = popup.height() > 200 ? 200 : popup.height()
      , changed = width !== this.state.width || ht !== this.state.height;

    if ( changed )
      this.setState({ width: width, height: ht })   
  },

  _onSelect: function(data, idx, elem){
    this.close()
    this.change(data)
  },

  _keyPress: function(e){
    var key = e.key
      , alt = e.altKey
      , isOpen = this.state.open
      , setMethod = this[isOpen ? 'setFocusedIndex' : 'setSelectedIndex'];

    if ( key === 'End' ) 
      setMethod.call(this,
        this.props.data.length - 1)

    else if ( key === 'Home' ) 
      setMethod.call(this, 0)

    else if ( key === 'Enter' && isOpen ) 
      this.change(this._data()[this.state.focusedIndex])

    else if ( key === 'ArrowDown' ) {
      if ( alt )         this.open()
      else if ( isOpen ) this.moveFocusedIndex('UP')
      else               this.moveSelectedIndex('UP')

    } 
    else if ( key === 'ArrowUp' ) {
      if ( alt )         this.close()
      else if ( isOpen ) this.moveFocusedIndex('DOWN')
      else               this.moveSelectedIndex('DOWN')
    }
    else
      this.search(
          String.fromCharCode(e.keyCode)
        , this._locate)
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
  },


	_getAnchor: function(){
		return this.refs.element.getDOMNode()
	}
})
