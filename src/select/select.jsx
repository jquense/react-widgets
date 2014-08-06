var React = require('react/addons')
  , cx    = React.addons.classSet
  , _     =  require('lodash')
  , $     =  require('zepto')
  //, DefaultValueItem = require('./value-item.jsx')
  , SelectInput = require('./search-input.jsx')
  , TagList = require('./tag-list.jsx')
  , Popup = require('../popup/popup.jsx')
  , List  = require('../common/list.jsx');

var btn = require('../common/btn.jsx')

module.exports = React.createClass({

  mixins: [ 
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
      open:  false,
      withoutValues: this.withoutValues(this.props.data, this.props.value)
    }
  },

  componentWillReceiveProps: function(nextProps) {

    if(  !_.isEqual(nextProps.value, this.props.value))
      this.setState({
        withoutValues: this.withoutValues(nextProps.data, nextProps.value),
      })
  },

  componentDidMount: function(pvProps, pvState){
    this.setWidth()
  },

  render: function(){ 
    var DropdownValue = this.props.valueComponent;

    return (
      <div ref="element"
           onKeyUp={this._keyUp}
           tabIndex="-1"
           className={cx({
              'rw-select-list':  true,
              'rw-widget':       true,
              'rw-state-focus':  this.state.focused,
              'rw-open':         this.state.open
            })}>
        <div className='rw-select-wrapper' onClick={this._click}>
          <TagList 
            ref='tagList'
            value={this.props.value} 
            textField={this.props.textField} 
            valueField={this.props.valueField}
            valueComponent={this.props.valueComponent}
            onDelete={this._delete}/>
          <SelectInput 
            value={this.state.searchTerm} 
            focused={this.state.focused} 
            onFocus={this._focus.bind(null, true)} 
            onBlur ={this._focus.bind(null, false)}
            onChange={this._typing}/>
        </div>
        <Popup 
          style={{ width: this.state.width}}
          getAnchor={ this._getAnchor } 
          open={this.state.open} 
          onRequestClose={this.close}
          onClose={closed.bind(this)}>

          <List ref="list"
            style={{ maxHeight: 200, height: 'auto' }}
            data={this.state.withoutValues}
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
      //, ht = popup.height() > 200 ? 200 : popup.height()
      , changed = width !== this.state.width || ht !== this.state.height;

    if ( changed )
      this.setState({ width: width })
  },

  _delete: function(e, value){
    e.stopPropagation();
    this._focus(true)
    this.change(
      _.without(this.props.value, value))
  },

  _click: function(e){
    
    e.nativeEvent.stopImmediatePropagation();
    this._focus(true)
    !this.state.open && this.open()
  },

  _focus: function(focused){
    this.setState({ focused: focused })
  },

  _typing: function(e){
    console.log('e.target')
    this.setState({
      searchTerm: e.target.value,
      open: this.state.open || (this.state.open === false)
    })
  },

  _onSelect: function(data){
    var val = this.props.value.concat(data)
    this.close()
    this.change(val)
  },

  _keyUp: function(e){
    var key = e.key
      , alt = e.altKey
      , isOpen = this.state.open;

    if ( alt ) {

      if ( key === 'ArrowDown') 
        this.open()
      else if ( key === 'ArrowUp')
        this.close()

    } else if ( isOpen ){
      this.refs.list._keyUp(e)
    } 

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
    e.nativeEvent.stopImmediatePropagation();
    this.state.open 
      ? this.close() 
      : this.open()
  },

  withoutValues: function(data, values){
    return _.reject(data, function(i){
        return _.any(
            values
          , _.partial(this._valueMatcher, i)
          , this)
      }, this)
  },

  _getAnchor: function(){
    return this.refs.element.getDOMNode()
  }
})


// function isTagClick(tagList, e){
//   return $.contains(tagList, e.target)
// }