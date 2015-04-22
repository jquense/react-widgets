'use strict';
var React = require('react')
  , _  = require('./util/_')
  , cx = require('classnames')
  , createUncontrolledWidget = require('uncontrollable')
  , compat = require('./util/compat')

  , CustomPropTypes  = require('./util/propTypes')
  , PlainList        = require('./List')
  , GroupableList = require('./ListGroupable')
  , validateList = require('./util/validateListInterface')
  , scrollTo = require('./util/dom/scroll');

var propTypes = {

    data:           React.PropTypes.array,
    value:          React.PropTypes.oneOfType([
                      React.PropTypes.any,
                      React.PropTypes.array
                    ]),
    onChange:       React.PropTypes.func,
    onMove:         React.PropTypes.func,

    multiple:       React.PropTypes.bool,

    itemComponent:  CustomPropTypes.elementType,
    listComponent:  CustomPropTypes.elementType,

    valueField:     React.PropTypes.string,
    textField:      CustomPropTypes.accessor,

    busy:           React.PropTypes.bool,

    filter:         React.PropTypes.string,
    delay:          React.PropTypes.number, 

    disabled:       React.PropTypes.oneOfType([
                      React.PropTypes.array,
                      React.PropTypes.bool,
                      React.PropTypes.oneOf(['disabled'])
                    ]),

    readOnly:       React.PropTypes.oneOfType([
                      React.PropTypes.bool,
                      React.PropTypes.array,
                      React.PropTypes.oneOf(['readonly'])
                    ]),

    messages:       React.PropTypes.shape({
      emptyList:    React.PropTypes.string
    }),
  }


var SelectList = React.createClass({

  propTypes: propTypes,

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/TimeoutMixin'),
    require('./mixins/DataHelpersMixin'),
    require('./mixins/RtlParentContextMixin')
  ],

  getDefaultProps(){
    return {
      delay: 250,
      value: [],
      data:  [],
      messages: {
        emptyList: 'There are no items in this list'
      }
    }
  },

  getDefaultState(props){
    var isRadio = !props.multiple
      , values  = _.splat(props.value)
      , first   = isRadio && this._dataItem(props.data, values[0]) 

    first = isRadio && first 
      ? first
      : ((this.state || {}).focusedItem || null)

    return {
      focusedItem: first,
      dataItems:   !isRadio && values.map(item => this._dataItem(props.data, item))
    }
  },

  getInitialState(){
    var state = this.getDefaultState(this.props)
    
    state.ListItem = getListItem(this)

    return state
  },

  componentWillReceiveProps(nextProps) {
    return this.setState(this.getDefaultState(nextProps))
  },

  componentDidMount() {
    validateList(this.refs.list)
  },

  render() {
    var { className, ...props } = _.omit(this.props, Object.keys(propTypes))
      , focus = this._maybeHandle(this._focus.bind(null, true), true)
      , optID = this._id('_selected_option')
      , blur  = this._focus.bind(null, false)
      , List  = this.props.listComponent || (this.props.groupBy && GroupableList) || PlainList
      , focusedItem = this.state.focused 
                    && !this.isDisabled() 
                    && !this.isReadOnly() 
                    && this.state.focusedItem;

    return (
      
      <div {...props}
        onKeyDown={this._maybeHandle(this._keyDown)}
        onFocus={focus}
        onBlur ={blur}
        tabIndex='0'
        role='listbox'
        aria-busy={!!this.props.busy}
        aria-activedescendent={ this.state.focused ? optID : undefined }
        aria-disabled={ this.isDisabled() }
        aria-readonly={ this.isReadOnly() }
        className={cx(className, 'rw-widget', 'rw-selectlist', { 
          'rw-state-focus':    this.state.focused,
          'rw-state-disabled': this.isDisabled(),
          'rw-state-readonly': this.isReadOnly(),
          'rw-rtl':            this.isRtl(),
          'rw-loading-mask':   this.props.busy
        })}>
        <List ref='list' 
          {..._.pick(
              this.props
            , Object.keys(compat.type(List).propTypes))
          }
          data={this._data()}
          focused={focusedItem}
          optID ={optID}
          itemComponent={this.state.ListItem}
          onMove={ this._scrollTo }/>
      </div> 
    );
  },

  _scrollTo(selected, list) {
    var handler = this.props.onMove; 

    if ( handler ) 
      handler(selected, list)
    else {
      this._scrollCancel && this._scrollCancel()
      // default behavior is to scroll the whole page not just the widget
      this._scrollCancel = scrollTo(selected) 
    }
  },

  _keyDown(e) {
    var self = this
      , key = e.key
      , multiple = !!this.props.multiple
      , list = this.refs.list
      , focusedItem = this.state.focusedItem;

    if ( key === 'End' ) {
      e.preventDefault()

      if ( multiple ) this.setState({ focusedItem: move('prev', null) })
      else            change(move('prev', null)) 
    }
    else if ( key === 'Home' ) {
      e.preventDefault()

      if ( multiple ) this.setState({ focusedItem: move('next', null) })
      else            change(move('next', null)) 
    }
    else if ( key === 'Enter' || key === ' ' ) {
      e.preventDefault()
      change(focusedItem)
    }
    else if ( key === 'ArrowDown' || key === 'ArrowRight' ) {
      e.preventDefault()

      if ( multiple ) this.setState({ focusedItem: move('next', focusedItem) })
      else            change(move('next', focusedItem))
    }
    else if ( key === 'ArrowUp' || key === 'ArrowLeft'  ) {
      e.preventDefault()

      if ( multiple ) this.setState({ focusedItem: move('prev', focusedItem) })
      else            change(move('prev', focusedItem))
    }
    else if (this.props.multiple && e.keyCode === 65 && e.ctrlKey ) {
      e.preventDefault()
      this._selectAll() 
    }
    else
      this.search(String.fromCharCode(e.keyCode))

    function change(item, cked){
      if( item ){
        self._change(item, multiple 
            ? !self._contains(item, self._values()) // toggle value
            : true)
      }    
    }

    function move(dir, item){
      var isDisabled = item => self.isDisabledItem(item) || self.isReadOnlyItem(item)
        , stop = dir === 'next' ? list.last() : list.first()
        , next = list[dir](item);
      
      while( next !== stop && isDisabled(next)) 
        next = list[dir](next)

      return isDisabled(next) ? item  : next
    }
  },

  _selectAll(){
    var values = this.state.dataItems
      , disabled = this.props.disabled || this.props.readOnly
      , data = this._data()
      , blacklist;

    disabled = Array.isArray(disabled) ? disabled : [];
    //disabled values that are not selected
    blacklist = disabled.filter( v => !this._contains(v, values))
    data      = data.filter( v => !this._contains(v, blacklist))

    if ( data.length === values.length) {
      data = disabled.filter( v => this._contains(v, values))
      data = data.map( v => this._dataItem(this._data(), v))
    }

    this.notify('onChange', [data])
  },

  _change(item, checked){
    var multiple  = !!this.props.multiple
      , blacklist = this.props.disabled || this.props.readOnly 
      , values    = this.state.dataItems;

    blacklist = Array.isArray(blacklist) ? blacklist : [];

    //if(this._contains(item, blacklist)) return 

    if ( !multiple )
      return this.notify('onChange', checked ? item : null)

    values = checked 
      ? values.concat(item)
      : values.filter( v => v !== item)

    this.notify('onChange', [values || []])
  },

  _focus(focused, e){

    this.setTimeout('focus', () => {
      if( focused) compat.findDOMNode(this).focus()
      if( focused !== this.state.focused){
        this.notify(focused ? 'onFocus' : 'onBlur', e)
        this.setState({ focused: focused })
      }
    })
  },

  isDisabledItem(item) {
    return this.isDisabled() || this._contains(item, this.props.disabled)
  },

  isReadOnlyItem(item) {
    return this.isReadOnly() || this._contains(item, this.props.readOnly)
  },

  search(character) {
    var word = ((this._searchTerm || '') + character).toLowerCase()
      , list = this.refs.list;
      
    this._searchTerm = word 

    this.setTimeout('search', () => {
      var focusedItem = list.next(this.state.focusedItem, word);

      this._searchTerm = ''

      if ( focusedItem) 
        this.setState({ focusedItem })

    }, this.props.delay) 
  },

  _data() {
    return this.props.data
  },

  _contains(item, values) {
    return Array.isArray(values) 
      ? values.some(this._valueMatcher.bind(null, item))
      : this._valueMatcher(item, values)
  },

  _values() {
    return !!this.props.multiple 
      ? this.state.dataItems
      : this.props.value
  }

});


function getListItem(parent){

  return React.createClass({

    displayName: 'SelectItem',
    
    render: function() {
      var item      = this.props.item
        , checked   = parent._contains(item, parent._values())
        , change    = parent._change.bind(null, item)
        , disabled  = parent.isDisabledItem(item)
        , readonly  = parent.isReadOnlyItem(item)
        , Component = parent.props.itemComponent
        , name      = parent.props.name || parent._id('_name');

      return (
        <label
          className={cx({ 
            'rw-state-disabled': disabled,
            'rw-state-readonly': readonly
          })}>
          <input { ...this.props} 
            tabIndex='-1'
            name={name}
            type={parent.props.multiple ? 'checkbox' : 'radio'}
            
            onChange={onChange} 
            checked={checked}
            disabled={disabled || readonly}
            aria-disabled={disabled || readonly}/>
            { Component 
                ? <Component item={item}/> 
                : parent._dataText(item)
            }
        </label>
      );

      function onChange(e){
        if( !disabled && !readonly)
          change(e.target.checked)
      }
    }
  })
}

module.exports = createUncontrolledWidget(
    SelectList, { value: 'onChange' });

module.exports.BaseSelectList = SelectList