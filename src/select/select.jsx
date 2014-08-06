var React = require('react/addons')
  , cx    = React.addons.classSet
  , $     =  require('zepto')
  //, DefaultValueItem = require('./value-item.jsx')
  , SelectInput = require('./search-input.jsx')
  , Popup = require('../popup/popup.jsx')
  , List  = require('../common/list.jsx');

var btn = require('../common/btn.jsx')

module.exports = React.createClass({

  mixins: [ 
    React.addons.LinkedStateMixin,
    require('../mixins/DataHelpersMixin')
  ],

  propTypes: {
    data:           React.PropTypes.array,
    value:          React.PropTypes.array,
    valueField:     React.PropTypes.string,
    textField:      React.PropTypes.string,

    valueComponent: React.PropTypes.component
  },

  getInitialState: function(){
    return {
      open:  false
    }
  },

  // getDefaultProps: function(){
  //   return {
  //     valueComponent: DefaultValueItem
  //   }
  // },
  // componentWillReceiveProps: function(nextProps) {
  //   this.setState({
  //     selectedIndex: nextProps.data.indexOf(nextProps.value)
  //   })
  // },

  componentDidMount: function(pvProps, pvState){
    this.setWidth()
  },

  render: function(){ 
    var DropdownValue = this.props.valueComponent;

    return (
      <div ref="element"
           onKeyUp={this._keyPress}
           
           tabIndex="-1"
           className={cx({
              'rw-select-list':  true,
              'rw-widget':       true,
              'rw-state-focus':  this.state.focused,
              'rw-open':         this.state.open
            })}>
        <div className='rw-select-wrapper' onClick={this._click}>
          <ul className='rw-tag-list'><li>hii!</li></ul>
          <SelectInput 
            focused={this.state.focused} 
            onFocus={this._focus.bind(null, true)} 
            onBlur ={this._focus.bind(null, false)}
            valueLink={this.linkState('searchTerm')}/>
        </div>
        <Popup 
          style={{ width: this.state.width, height: this.state.height }}
          getAnchor={ this._getAnchor } 
          open={this.state.open} 
          onRequestClose={this.close}
          onClose={closed.bind(this)}>

          <List ref="list"
            data={this.props.data} 
            value={this.props.value}
            textField={this.props.textField} 
            valueField={this.props.valueField}
            searchTerm={this.state.searchTerm}
            onSelect={this._onSelect}/>
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


  _click: function(e){
    e.nativeEvent.stopImmediatePropagation();
    this._focus(true)
    !this.state.open && this.open()
  },

  _focus: function(focused){
    this.setState({ focused: focused })
  },

  _onSelect: function(data, idx, elem){
    this.close()
    this.change(data)
  },

  _keyPress: function(e){
    var key = e.key
      , alt = e.altKey
      , isOpen = this.state.open;

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
