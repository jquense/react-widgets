var React = require('react/addons')
  , cx    = React.addons.classSet
  , SlideDown = require('../common/collapse-transition.jsx')
  , DefaultValueItem = require('./value-item.jsx')
  , Popup = require('../popup/popup.jsx')
  , List  = require('../common/list.jsx');

var btn = require('../common/btn.jsx')

module.exports = React.createClass({

  mixins: [ require('../mixins/DataHelpersMixin')],

  propTypes: {
    data:           React.PropTypes.array,
    valueField:     React.PropTypes.string,
    textField:      React.PropTypes.string,
    valueComponent: React.PropTypes.component
  },

	getInitialState: function(){
		return {
			selectedIndex: 0,
			open:          false
		}
	},

  getDefaultProps: function(){
    return {
      valueComponent: DefaultValueItem
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      selectedIndex: nextProps.data.indexOf(nextProps.value)
    })
  },

	render: function(){ 
		var DropdownValue = this.props.valueComponent;

		return (
			<div ref="element"
           onKeyUp={this._keyPress}
           tabIndex="-1"
           className={cx({
              'rw-dropdownlist': true,
              'rw-widget':       true,
              'rw-open':         this.state.open
            })}>

				<btn className="rw-dropdownlist-picker rw-select" onClick={this.toggle}>
					<i className="rw-i rw-i-caret-down">
            <span className="rw-sr">Open Dropdown</span>
          </i>
				</btn>
				<DropdownValue
            className="rw-input" 
            value={this.props.value}
            textField={this.props.textField} 
            valueField={this.props.valueField}/>
        <SlideDown>
			  { this.state.open && 
          <Popup getAnchor={ this._getAnchor } onShouldClose={this.close} key={(new Date()).getTime()}>
            <List ref="list"
              data={this.props.data} 
              selectedIndex={this.state.selectedIndex}
              textField={this.props.textField} 
              valueField={this.props.valueField}
              onSelect={this._onSelect}/>
          </Popup>
        }
        </SlideDown>
			</div>
		)
	},

  _onSelect: function(data, idx, elem){
    this.close()
    this.change(data)
  },

  _keyPress: function(e){
    var key = e.key
      , alt = e.altKey
      , isOpen = this.state.open;

    if ( key === 'ArrowDown' ) {
      if ( !isOpen )
        alt ? this.open() : this.next()
    }
      

    else if ( key === 'ArrowUp' )
      if ( isOpen && alt ) this.close()
      else if( !isOpen)    this.prev()
  },

  change: function(data, idx){
    var change = this.props.onChange 
    if ( change ) change(data)  
  },

  next: function(){
    var nextIdx = this.state.selectedIndex + 1;

    if ( nextIdx >= this.props.data.length )
      nextIdx = 0;

    this.change(this.props.data[nextIdx])
  },

  prev: function(){
    var nextIdx = this.state.selectedIndex - 1;

    if ( nextIdx < 0 )
      nextIdx = this.props.data.length - 1;

    this.change(this.props.data[nextIdx])
  },

  open: function(){
    this.setState({ open: true }, function(){
      this.refs.list.getDOMNode().focus()
    })
  },

  close: function(){
    this.setState({ open: false }, function(){
      this.refs.element.getDOMNode().focus()
    })
  },

  toggle: function(){
    this.state.open 
      ? this.close() 
      : this.open()
  },


	_getAnchor: function(){
		return this.refs.element.getDOMNode()
	}
})
