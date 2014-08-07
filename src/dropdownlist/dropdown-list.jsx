var React = require('react/addons')
  , cx    = React.addons.classSet
  , SlideDown = require('../common/collapse-transition.jsx')
  , DefaultValueItem = require('./value-item.jsx')
  , Popup = require('../popup/popup.jsx')
  , List  = require('../common/list.jsx');

var btn = require('../common/btn.jsx')

module.exports = React.createClass({

  mixins: [ 
    require('../mixins/DataHelpersMixin'),
    require('../mixins/TextSearchMixin')('selectedIndex')
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
		return {
			selectedIndex: 0,
			open:          false
		}
	},

  getDefaultProps: function(){
    return {
      valueComponent: DefaultValueItem,
      filter: 'startsWith',
      delay: 500
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      selectedIndex: nextProps.data.indexOf(nextProps.value)
    })
  },

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
      , isOpen = this.state.open;

    if ( isOpen && !alt) 
        this.refs.list._keyUp(e)
    
    else if ( key === 'ArrowDown' ) {
      if ( !isOpen )
        alt ? this.open() : this.next()

    } else if ( key === 'ArrowUp' ) {
      if ( isOpen && alt ) this.close()
      else if( !isOpen)    this.prev()
    } else 
      this.search(String.fromCharCode(e.keyCode))
  },

  change: function(data, idx){
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
    e.nativeEvent.stopImmediatePropagation();
    this.state.open 
      ? this.close() 
      : this.open()
  },


	_getAnchor: function(){
		return this.refs.element.getDOMNode()
	}
})
