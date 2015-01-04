'use strict';
var React = require('react')
  , cx    = require('./util/cx')
  , _     = require('./util/_')
  , controlledInput  = require('./util/controlledInput')
  , CustomPropTypes  = require('./util/propTypes')
  
  , SelectInput = require('./MultiselectInput.jsx')
  , TagList     = require('./MultiselectTagList.jsx')
  , Popup       = require('./Popup.jsx')
  , List        = require('./List.jsx');

var propTypes = {
      data:            React.PropTypes.array,
      //-- controlled props --
      value:           React.PropTypes.array,
      onChange:        React.PropTypes.func,

      searchTerm:      React.PropTypes.string,
      onSearch:        React.PropTypes.func,

      open:            React.PropTypes.bool,
      onToggle:        React.PropTypes.func,
      //-------------------------------------------

      valueField:      React.PropTypes.string,
      textField:       React.PropTypes.string,

      tagComponent:    CustomPropTypes.elementType,
      itemComponent:   CustomPropTypes.elementType,

      onSelect:        React.PropTypes.func,
      onCreate:        React.PropTypes.func,

      duration:        React.PropTypes.number, //popup

      placeholder:     React.PropTypes.string,

      disabled:        React.PropTypes.oneOfType([
                         React.PropTypes.bool,
                         React.PropTypes.array,
                         React.PropTypes.oneOf(['disabled'])
                      ]),

      readOnly:        React.PropTypes.oneOfType([
                         React.PropTypes.bool,
                         React.PropTypes.array,
                         React.PropTypes.oneOf(['readonly'])
                       ]),

      messages:        React.PropTypes.shape({
        open:          React.PropTypes.string,
        emptyList:     React.PropTypes.string,
        emptyFilter:   React.PropTypes.string
      })
    };

var Select = React.createClass({

  displayName: 'Select',

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/DataFilterMixin'),
    require('./mixins/DataHelpersMixin'),
    require('./mixins/RtlParentContextMixin')
  ],

  propTypes: propTypes,

  getDefaultProps: function(){
    return {
      data: [],
      filter: 'startsWith',
      value: [],
      open: false,
      searchTerm: '',
      messages: {
        createNew:   "(create new tag)",
        emptyList:   "There are no items in this list",
        emptyFilter: "The filter returned no results"
      }
    }
  },

  getInitialState: function(){
    var values = _.splat(this.props.value)
      , data   = this.process(this.props.data, values, this.props.searchTerm)

    return {
      focusedItem:   data[0],
      processedData: data,
      dataItems:     values.map( item => this._dataItem(this.props.data, item))
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var values = _.splat(nextProps.value)
      , items  = this.process(nextProps.data, values, nextProps.searchTerm)

    this.setState({
      processedData: items,
      dataItems: values.map( item => this._dataItem(nextProps.data, item))
    })
  },

  render: function(){
    var { 
        className
      , children
      , ...props } = _.omit(this.props, Object.keys(propTypes))
      , listID  = this._id('_listbox')
      , optID   = this._id('_option')
      , items   = this._data()
      , values  = this.state.dataItems;

    return (
      <div {...props}
        ref="element"
        onKeyDown={this._maybeHandle(this._keyDown)}
        onFocus={this._maybeHandle(this._focus.bind(null, true), true)}
        onBlur ={this._focus.bind(null, false)}
        tabIndex="-1"
        className={cx(className, {
          'rw-multiselect':    true,
          'rw-widget':         true,
          'rw-state-focus':    this.state.focused,
          'rw-state-disabled': this.props.disabled === true,
          'rw-state-readonly': this.props.readOnly === true,
          'rw-open':           this.props.open,
          'rw-rtl':            this.isRtl()
        })}>
        <div className='rw-multiselect-wrapper' onClick={this._maybeHandle(this._click)}>
          { this.props.busy &&
            <i className="rw-i rw-loading"></i>
          }
          { !!values.length &&
            <TagList
              ref='tagList'
              value={values}
              textField={this.props.textField}
              valueField={this.props.valueField}
              valueComponent={this.props.tagComponent}
              disabled={this.props.disabled}
              readOnly={this.props.readOnly}
              onDelete={this._delete}/>
          }
          <SelectInput
            ref='input'
            aria-activedescendent={ this.props.open ? optID : undefined }
            aria-expanded={ this.props.open }
            aria-busy={!!this.props.busy}
            aria-owns={listID}
            aria-haspopup={true}
            value={this.props.searchTerm}
            disabled={this.props.disabled === true}
            readOnly={this.props.readOnly === true}
            placeholder={this._placeholder()}
            onChange={this._typing}/>
        </div>
        <Popup open={this.props.open} onRequestClose={this.close} duration={this.props.duration}>
          <div>
            <List ref="list"
              {..._.pick(this.props, Object.keys(List.type.propTypes))}
              id={listID}
              optID={optID}
              aria-autocomplete='list'
              aria-hidden={!this.props.open}
              data={items}
              focused={this.state.focusedItem}
              onSelect={this._maybeHandle(this._onSelect)}
              messages={{
                emptyList: this.props.data.length
                  ? this.props.messages.emptyFilter
                  : this.props.messages.emptyList
              }}/>
              { this._shouldShowCreate() &&
                <ul className="rw-list rw-multiselect-create-tag">
                  <li onClick={this._onCreate.bind(null, this.props.searchTerm)} 
                      className={cx({'rw-state-focus': !this._data().length || this.state.focusedItem === null })}>
                    <strong>{`"${this.props.searchTerm}"`}</strong> { this.props.messages.createNew }
                  </li>
                </ul>
              }
          </div>
        </Popup>
      </div>
    )
  },

  _data(){
    return this.state.processedData
  },

  _delete(value){
    this._focus(true)
    this.change(
      this.state.dataItems.filter( d => d !== value))
  },

  _click(e){
    this._focus(true)
    !this.props.open && this.open()
  },

  _focus(focused, e){
    var self = this;

    if (this.props.disabled === true )
      return

    clearTimeout(self.timer)

    self.timer = setTimeout(function(){
      if(focused) self.refs.input.focus()
      else        {
        self.close()
        self.refs.tagList && self.refs.tagList.clear()
      }

      if( focused !== self.state.focused)
        self.setState({ focused: focused })
    }, 0)
  },

  _typing: function(e){
    this.notify('onSearch', [ e.target.value ])
    this.open()
  },

  _onSelect: function(data){

    if( data === undefined && this.props.onCreate )
      return this._onCreate(this.props.searchTerm)

    this.notify('onSelect', data)
    this.change(this.state.dataItems.concat(data))
    this.close()
    this._focus(true)
  },

  _onCreate: function(tag){
    if (tag.trim() === '' ) 
      return

    this.notify('onCreate', tag)
    this.close()
    this._focus(true)
  },

  _keyDown: function(e){
    var key = e.key
      , alt = e.altKey
      , ctrl = e.ctrlKey
      , searching = !!this.props.searchTerm
      , isOpen  = this.props.open
      , current = this.state.focusedItem
      , tagList = this.refs.tagList
      , list    = this.refs.list;

    if ( key === 'ArrowDown') {
      var next = list.next('focused')
      next = (current === next || current === null) ? null : list.next('focused')

      e.preventDefault()
      if ( isOpen ) this.setState({ focusedItem: next })
      else          this.open()
    }
    else if ( key === 'ArrowUp') {
      var prev = list.prev('focused')
      prev = current === null ? list.last() : list.prev('focused')

      e.preventDefault()

      if ( alt)          this.close()
      else if ( isOpen ) this.setState({ focusedItem: prev })
    }
    else if ( key === 'End'){
      if ( isOpen ) this.setState({ focusedItem: list.last() })
      else          tagList && tagList.last()
    }
    else if (  key === 'Home'){
      if ( isOpen ) this.setState({ focusedItem: list.first() })
      else          tagList && tagList.first()
    }
    else if ( isOpen && key === 'Enter' )
      ctrl && this.props.onCreate
        ? this._onCreate(this.props.searchTerm)
        : this._onSelect(this.state.focusedItem)

    else if ( key === 'Escape')
      isOpen ? this.close() : this.refs.tagList.clear()

    else if ( !searching && key === 'ArrowLeft')
     tagList && tagList.prev()

    else if ( !searching && key === 'ArrowRight')
      tagList && tagList.next()

    else if ( !searching && key === 'Delete')
      tagList && tagList.removeCurrent()

    else if ( !searching && key === 'Backspace')
      tagList && tagList.removeNext()
  },

  change: function(data){
    this.notify('onChange', [data])
  },

  open: function(){
    if (!(this.props.disabled === true || this.props.readOnly === true))
      this.notify('onToggle', true)
  },

  close: function(){
    this.notify('onToggle', false)
  },

  toggle: function(e){
    this.props.open
      ? this.close()
      : this.open()
  },

  process: function(data, values, searchTerm){
    var items = data.filter( i => !values.some( this._valueMatcher.bind(null, i), this), this)

    if( searchTerm)
      items = this.filter(items, searchTerm)

    return items
  },

  _shouldShowCreate(){
    var text = this.props.searchTerm;

    if ( !(this.props.onCreate && text) ) 
      return false

    //if there is an exact match
    return !this._data().some( v => this._dataText(v) === text) 
        && !this.state.dataItems.some( v => this._dataText(v) === text) 
  },

  _placeholder: function(){
    return (this.props.value || []).length
      ? ''
      : (this.props.placeholder || '')
  }

})


module.exports = controlledInput.createControlledClass(Select
    , { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' }
    , { onChange: defaultChange, onCreate: defaultChange });


function defaultChange(){
  if ( this.props.searchTerm === undefined )
    this.setState({ searchTerm: '' })
}

module.exports.BaseMultiselect = Select