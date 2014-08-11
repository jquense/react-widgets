var React  = require('react/addons')
  , cx     = React.addons.classSet
  , _      = require('lodash')
  , filter = require('../util/filter')
  , Input  = require('./combo-input.jsx')
  , Popup  = require('../popup/popup.jsx')
  , List   = require('../common/list.jsx');

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
    delay:          React.PropTypes.number,
    filter:         React.PropTypes.string,

    messages:       React.PropTypes.shape({
      open:         React.PropTypes.string
    }),
  },

	getInitialState: function(){
		return {
			selectedIndex: this.props.data.indexOf(this.props.value),
      currentText:   this._dataText(this.props.value),
      suggestion:    this.suggest(this.props),
      deleting:      false,
			open:          false

		}
	},

  getDefaultProps: function(){
    return {
      filter: 'startsWith',
      delay: 500,

      messages: {
        open: 'open combobox'
      }
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      selectedIndex: nextProps.data.indexOf(nextProps.value),
      suggestion: this.suggest(nextProps)
    })
  },

  componentDidMount: function(){
    this.setWidth()
  },

  componentDidUpdate: function(pvProps, pvState){
    if ( this.state.selectedIndex !== -1 && pvState.selectedIndex !== this.state.selectedIndex)
      this.change(this.props.data[this.state.selectedIndex])
  },

	render: function(){ 
		var DropdownValue = this.props.valueComponent
      , text = this._dataText(this.props.value);

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
          onKeyDown={this._typing}/>

        <Popup 
          style={{ width: this.state.width }}
          getAnchor={ this._getAnchor } 
          open={this.state.open} 
          onRequestClose={this.close}>
          
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

      //this.refs.list.locate(e.target.value)

      this.setState({ 
        currentText: e.target.value,
        deleting: e.key === 'Backspace' 
      })
  },

  _onChange: function(e, text){
    var idx  = this.findIndex(e.target.value, function(a, b){ return a === b });

    this.change(idx !== -1 
      ? this.props.data[idx]
      : e.target.value)

    this.open()
  },

  _focus: function(focused){
    this.setState({ focused: focused })
  },


  _keyPress: function(e){
    var key = e.key
      , alt = e.altKey
      , isOpen = this.state.open;
    
    if ( key === 'ArrowDown' ) {
      alt ? this.open() : this.next()

    } else if ( key === 'ArrowUp' ) {
      if ( isOpen && alt ) this.close()
      else this.prev()
    } 
    else 
      this.refs.list.locate(e.target.value)
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
	}
})
