'use strict';
var React            = require('react')
  , _                = require('./util/_')
  , cx               = require('./util/cx')
  , controlledInput  = require('./util/controlledInput')
  , CustomPropTypes  = require('./util/propTypes')
  , Popup            = require('./Popup.jsx')
  , PlainList        = require('./List.jsx')
  ;

var propTypes = {
  //-- controlled props -----------
  value:          React.PropTypes.any,
  onChange:       React.PropTypes.func,
  open:           React.PropTypes.bool,
  onToggle:       React.PropTypes.func,
  //------------------------------------

  data:           React.PropTypes.array,
  valueField:     React.PropTypes.string,
  textField:      React.PropTypes.string,

  valueComponent: CustomPropTypes.elementType,
  itemComponent:  CustomPropTypes.elementType,
  groupComponent: CustomPropTypes.elementType,
  list:           CustomPropTypes.elementType,

  onSelect:       React.PropTypes.func,
  
  busy:           React.PropTypes.bool,
  groupBy:        React.PropTypes.oneOfType([
                    React.PropTypes.func,
                    React.PropTypes.string
                  ]),

  delay:          React.PropTypes.number,
  duration:       React.PropTypes.number, //popup

  disabled:       React.PropTypes.oneOfType([
                        React.PropTypes.bool,
                        React.PropTypes.oneOf(['disabled'])
                      ]),

  readOnly:       React.PropTypes.oneOfType([
                    React.PropTypes.bool,
                    React.PropTypes.oneOf(['readOnly'])
                  ]),

  messages:       React.PropTypes.shape({
    open:         React.PropTypes.string,
  })
};

var DropdownList = React.createClass({

  displayName: 'DropdownList',

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/PureRenderMixin'),
    require('./mixins/DataHelpersMixin'),
    require('./mixins/RtlParentContextMixin')
  ],

  propTypes: propTypes,

	getInitialState: function(){
    var initialIdx = this._dataIndexOf(this.props.data, this.props.value);

		return {
      selectedItem: this.props.data[initialIdx],
      focusedItem:  this.props.data[initialIdx] || this.props.data[0],
		}
	},

  getDefaultProps: function(){
    return {
      delay: 500,
      value: '',
      open: false,
      data: [],
      messages: {
        open: 'open dropdown'
      }
    }
  },

  componentWillReceiveProps: function(props){
    if ( _.isShallowEqual(props.value, this.props.value) )
      return

    var idx = this._dataIndexOf(props.data, props.value);

    this.setState({ 
      selectedItem: props.data[idx],
      focusedItem:  props.data[!~idx ? 0 : idx]
    })
  },

	render: function(){
		var {
        className
      , ...props } = _.omit(this.props, Object.keys(propTypes))
      , ValueComponent = this.props.valueComponent
      , valueItem = this._dataItem( this._data(), this.props.value )
      , optID = this._id('_option')
      , List  = this.props.list || PlainList
      ;

		return (
			<div {...props}
        ref="element"
        onKeyDown={this._maybeHandle(this._keyDown)}
        onClick={this._maybeHandle(this.toggle)}
        onFocus={this._maybeHandle(this._focus.bind(null, true), true)}
        onBlur ={this._focus.bind(null, false)}
        aria-expanded={ this.props.open }
        aria-haspopup={true}
        aria-busy={!!this.props.busy}
        aria-activedescendent={ this.props.open ? optID : undefined }
        aria-disabled={ this.props.disabled }
        aria-readonly={ this.props.readOnly }
        tabIndex={this.props.disabled ? '-1' : "0"}
        className={cx(className, {
          'rw-dropdownlist':   true,
          'rw-widget':          true,
          'rw-state-disabled':  this.props.disabled,
          'rw-state-readonly':  this.props.readOnly,
          'rw-state-focus':     this.state.focused,
          'rw-open':            this.props.open,
          'rw-rtl':             this.isRtl()
        })}>

				<span className="rw-dropdownlist-picker rw-select rw-btn">
					<i className={"rw-i rw-i-caret-down" + (this.props.busy ? ' rw-loading' : "")}>
            <span className="rw-sr">{ this.props.messages.open }</span>
          </i>
				</span>
        <div className="rw-input">
          { this.props.valueComponent
              ? <ValueComponent item={valueItem}/>
              : this._dataText(valueItem)
          }
        </div>
        <Popup open={this.props.open} onRequestClose={this.close} duration={this.props.duration}>
          <div>
            <List ref="list" 
              {..._.pick(this.props, Object.keys(List.type.propTypes))}
              optID={optID}
              aria-hidden={!this.props.open}
              selected={this.state.selectedItem}
              focused ={this.state.focusedItem}
              onSelect={this._maybeHandle(this._onSelect)}/>
          </div>
        </Popup>
			</div>
		)
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

  _onSelect: function(data){
    this.close()
    this.notify('onSelect', data)
    this.change(data)
  },

  _keyDown: function(e){
    var self = this
      , key = e.key
      , alt = e.altKey
      , list = this.refs.list
      , isOpen = this.props.open;

    if ( key === 'End' ) {
      if ( isOpen) this.setState({ focusedItem: list.last() })
      else         change(list.last())
      e.preventDefault()
    }
    else if ( key === 'Home' ) {
      if ( isOpen) this.setState({ focusedItem: list.first() })
      else         change(list.first())
      e.preventDefault()
    }
    else if ( key === 'Escape' && isOpen ) {
      this.close()
    }
    else if ( (key === 'Enter' || key === ' ') && isOpen ) {
      change(this.state.focusedItem, true)
    }
    else if ( key === 'ArrowDown' ) {
      if ( alt )         this.open()
      else if ( isOpen ) this.setState({ focusedItem: list.next('focused') })
      else               change(list.next('selected'))
      e.preventDefault()
    }
    else if ( key === 'ArrowUp' ) {
      if ( alt )         this.close()
      else if ( isOpen ) this.setState({ focusedItem: list.prev('focused') })
      else               change(list.prev('selected'))
      e.preventDefault()
    }
    else
      this.search(String.fromCharCode(e.keyCode), item => {
        isOpen 
          ? this.setState({ focusedItem: item })
          : change(item)
      })

    function change(item, fromList){
      if(!item) return
      if(fromList) self.notify('onSelect', item)

      self.change(item)
    }
  },

  change: function(data){
    if ( !_.isShallowEqual(data, this.props.value) ) {
      this.notify('onChange', data)
      this.close()
    }
  },

  _data: function(){
    return this.props.data
  },

  search: function(character, cb){
    var word = ((this._searchTerm || '') + character).toLowerCase();
      
    clearTimeout(this._timer)
    this._searchTerm = word 

    this._timer = setTimeout(() => {
      var list = this.refs.list
        , key  = this.props.open ? 'focused' : 'selected'
        , item = list.next(key, word);
      
      this._searchTerm = ''
      if ( item) cb(item)

    }, this.props.delay)
  },

  open: function(){
    this.notify('onToggle', true)
  },

  close: function(){
    this.notify('onToggle', false)
  },

  toggle: function(e){
    this.props.open
      ? this.close()
      : this.open()
  }

})


module.exports = controlledInput.createControlledClass(
    DropdownList, { open: 'onToggle', value: 'onChange' });

module.exports.BaseDropdownList = DropdownList