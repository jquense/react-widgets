'use strict';
var React           = require('react')
  , _               = require('./util/_')
  , cx              = require('classnames')
  , compat          = require('./util/compat')
  , CustomPropTypes = require('./util/propTypes')
  , Popup           = require('./Popup')
  , PlainList       = require('./List')
  , GroupableList   = require('./ListGroupable')
  , validateList    = require('./util/validateListInterface')
  , createUncontrolledWidget = require('uncontrollable');
  

var propTypes = {
  //-- controlled props -----------
  value:          React.PropTypes.any,
  onChange:       React.PropTypes.func,
  open:           React.PropTypes.bool,
  onToggle:       React.PropTypes.func,
  //------------------------------------

  data:           React.PropTypes.array,
  valueField:     React.PropTypes.string,
  textField:      CustomPropTypes.accessor,

  valueComponent: CustomPropTypes.elementType,
  itemComponent:  CustomPropTypes.elementType,
  listComponent:  CustomPropTypes.elementType,

  groupComponent: CustomPropTypes.elementType,
  groupBy:        CustomPropTypes.accessor,

  onSelect:       React.PropTypes.func,
  
  busy:           React.PropTypes.bool,

  delay:          React.PropTypes.number,

  dropUp:         React.PropTypes.bool,
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
    require('./mixins/TimeoutMixin'),
    require('./mixins/PureRenderMixin'),
    require('./mixins/DataHelpersMixin'),
    require('./mixins/PopupScrollToMixin'),
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

  componentDidMount() {
    validateList(this.refs.list)
  },

  componentWillReceiveProps(props){
    if ( _.isShallowEqual(props.value, this.props.value) && props.data === this.props.data)
      return

    var idx = this._dataIndexOf(props.data, props.value);

    this.setState({ 
      selectedItem: props.data[idx],
      focusedItem:  props.data[!~idx ? 0 : idx]
    })
  },

  render() {
    var {
        className
      , ...props } = _.omit(this.props, Object.keys(propTypes))
      , ValueComponent = this.props.valueComponent
      , valueItem = this._dataItem( this._data(), this.props.value )
      , optID = this._id('_option')
      , dropUp = this.props.dropUp
      , List  = this.props.listComponent || (this.props.groupBy && GroupableList) || PlainList;

    return (
      <div {...props}
        ref="element"
        onKeyDown={this._keyDown}
        onClick={this.toggle}
        onFocus={this._focus.bind(null, true)}
        onBlur ={this._focus.bind(null, false)}
        aria-expanded={ this.props.open }
        aria-haspopup={true}
        aria-busy={!!this.props.busy}
        aria-activedescendent={ this.props.open ? optID : undefined }
        aria-disabled={ this.props.disabled }
        aria-readonly={ this.props.readOnly }
        tabIndex={this.props.disabled ? '-1' : "0"}
        className={cx(className, 'rw-dropdownlist', 'rw-widget', {
          'rw-state-disabled':  this.props.disabled,
          'rw-state-readonly':  this.props.readOnly,
          'rw-state-focus':     this.state.focused,
          'rw-rtl':             this.isRtl(),

          ['rw-open' + (dropUp ? '-up' : '')]: this.props.open
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
        <Popup {..._.pick(this.props, Object.keys(compat.type(Popup).propTypes))}
          onOpening={() => this.refs.list.forceUpdate()}
          onRequestClose={this.close}>

          <div>
            <List ref="list" 
              {..._.pick(
                  this.props
                , Object.keys(compat.type(List).propTypes))
              }
              optID={optID}
              aria-hidden={!this.props.open}
              selected={this.state.selectedItem}
              focused ={this.props.open ? this.state.focusedItem : null}
              onSelect={this._onSelect}
              onMove={this._scrollTo}/>
          </div>
        </Popup>
      </div>
    )
  },

  _focus: _.ifNotDisabled(true, function(focused, e){

    this.setTimeout('focus', () => {

      if(focused) compat.findDOMNode(this).focus()
      else        this.close()

      if( focused !== this.state.focused){
        this.notify(focused ? 'onFocus' : 'onBlur', e)
        this.setState({ focused: focused })
      }
    })
  }),

  _onSelect: _.ifNotDisabled(function(data){
    this.close()
    this.notify('onSelect', data)
    this.change(data)
  }),

  _keyDown: _.ifNotDisabled(function (e){
    var self = this
      , key = e.key
      , alt = e.altKey
      , list = this.refs.list
      , focusedItem = this.state.focusedItem
      , selectedItem = this.state.selectedItem
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
      else if ( isOpen ) this.setState({ focusedItem: list.next(focusedItem) })
      else               change(list.next(selectedItem))
      e.preventDefault()
    }
    else if ( key === 'ArrowUp' ) {
      if ( alt )         this.close()
      else if ( isOpen ) this.setState({ focusedItem: list.prev(focusedItem) })
      else               change(list.prev(selectedItem))
      e.preventDefault()
    }
    else
      this.search(String.fromCharCode(e.keyCode), item => {
        isOpen 
          ? this.setState({ focusedItem: item })
          : change(item)
      })


    this.notify('onKeyDown', [e])
    
    function change(item, fromList){
      if(!item) return
      if(fromList) self.notify('onSelect', item)

      self.change(item)
    }
  }),

  change(data){
    if ( !_.isShallowEqual(data, this.props.value) ) {
      this.notify('onChange', data)
      this.close()
    }
  },

  _data(){
    return this.props.data
  },

  search(character, cb){
    var word = ((this._searchTerm || '') + character).toLowerCase();
      
    this._searchTerm = word 
  
    this.setTimeout('search', () => {
      var list = this.refs.list
        , key  = this.props.open ? 'focusedItem' : 'selectedItem'
        , item = list.next(this.state[key], word);
      
      this._searchTerm = ''
      if ( item) cb(item)

    }, this.props.delay)
  },

  open(){
    this.notify('onToggle', true)
  },

  close(){
    this.notify('onToggle', false)
  },

  toggle: _.ifNotDisabled(function(e){
    this.props.open
      ? this.close()
      : this.open()
  })

})


module.exports = createUncontrolledWidget(
    DropdownList, { open: 'onToggle', value: 'onChange' });

module.exports.BaseDropdownList = DropdownList