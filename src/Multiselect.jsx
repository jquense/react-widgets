'use strict';
var React           = require('react')
  , cx              = require('classnames')
  , _               = require('./util/_')
  , compat          = require('./util/compat')
  , SelectInput     = require('./MultiselectInput')
  , TagList         = require('./MultiselectTagList')
  , Popup           = require('./Popup')
  , PlainList       = require('./List')
  , GroupableList   = require('./ListGroupable')
  , validateList    = require('./util/validateListInterface')
  , createUncontrolledWidget = require('uncontrollable')
  , CustomPropTypes = require('./util/propTypes');

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
      textField:       CustomPropTypes.accessor,

      tagComponent:    CustomPropTypes.elementType,
      itemComponent:   CustomPropTypes.elementType,
      listComponent:   CustomPropTypes.elementType,

      groupComponent:  CustomPropTypes.elementType,
      groupBy:         CustomPropTypes.accessor,

      onSelect:        React.PropTypes.func,
      onCreate:        React.PropTypes.oneOfType([ 
                         React.PropTypes.oneOf([false]),
                         React.PropTypes.func
                       ]),

      dropUp:          React.PropTypes.bool,
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

var Multiselect = React.createClass({

  displayName: 'Multiselect',

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/TimeoutMixin'),
    require('./mixins/DataFilterMixin'),
    require('./mixins/DataHelpersMixin'),
    require('./mixins/PopupScrollToMixin'),
    require('./mixins/RtlParentContextMixin')
  ],

  propTypes: propTypes,

  getDefaultProps(){
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

  getInitialState(){
    var dataItems = _.splat(this.props.value).map( item => this._dataItem(this.props.data, item)) 
      , data = this.process(this.props.data, dataItems, this.props.searchTerm)

    return {
      focusedItem:   data[0],
      processedData: data,
      dataItems:     dataItems
    }
  },

  componentDidUpdate() {
    this.refs.list && validateList(this.refs.list)
  },

  componentWillReceiveProps(nextProps) {
    var values = _.splat(nextProps.value)
      , current = this.state.focusedItem
      , items  = this.process(nextProps.data, values, nextProps.searchTerm)

    this.setState({
      processedData: items,
      focusedItem: items.indexOf(current) === -1 ? items[0]: current,
      dataItems: values.map( item => this._dataItem(nextProps.data, item))
    })
  },

  render() {
    var { 
        className
      , children
      , ...props } = _.omit(this.props, Object.keys(propTypes))

      , listID = this._id('_listbox')
      , optID  = this._id('_option')
      , items  = this._data()
      , values = this.state.dataItems
      , dropUp = this.props.dropUp
      , renderPopup = _.isFirstFocusedRender(this) || this.props.open
      , List   = this.props.listComponent || (this.props.groupBy && GroupableList) || PlainList
      , listProps  = _.pick(this.props, Object.keys(compat.type(List).propTypes));

    return (
      <div {...props}
        ref="element"
        onKeyDown={this._maybeHandle(this._keyDown)}
        onFocus={this._maybeHandle(this._focus.bind(null, true), true)}
        onBlur ={this._focus.bind(null, false)}
        tabIndex="-1"
        className={cx(className, 'rw-multiselect', 'rw-widget', {
          'rw-state-focus':    this.state.focused,
          'rw-state-disabled': this.props.disabled === true,
          'rw-state-readonly': this.props.readOnly === true,
          'rw-rtl':            this.isRtl(),

          ['rw-open' + (dropUp ? '-up' : '')]: this.props.open

        })}>
        <div className='rw-multiselect-wrapper'>
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
            onKeyDown={this._searchKeyDown}
            onKeyUp={this._searchgKeyUp}
            onChange={this._typing}
            onFocus={this._inputFocus}
            onClick={this._inputFocus}
            maxLength={this.props.maxLength}/>
        </div>
        <Popup {..._.pick(this.props, Object.keys(compat.type(Popup).propTypes))}
          onOpening={()=> this.refs.list.forceUpdate()}
          onRequestClose={this.close}>

          <div>
          { renderPopup && [
            <List ref="list" key='0'
              {...listProps}
              readOnly={!!listProps.readOnly}
              disabled={!!listProps.disabled}
              id={listID}
              optID={optID}
              aria-autocomplete='list'
              aria-hidden={!this.props.open}
              data={items}
              focused={this.state.focusedItem}
              onSelect={this._maybeHandle(this._onSelect)}
              onMove={this._scrollTo}
              messages={{
                emptyList: this.props.data.length
                  ? this.props.messages.emptyFilter
                  : this.props.messages.emptyList
              }}/>,
              this._shouldShowCreate() &&
                <ul className="rw-list rw-multiselect-create-tag" key='1'>
                  <li onClick={this._onCreate.bind(null, this.props.searchTerm)} 
                      className={cx({
                        'rw-list-option': true,
                        'rw-state-focus': !this._data().length || this.state.focusedItem === null 
                      })}>
                    <strong>{`"${this.props.searchTerm}"`}</strong> { this.props.messages.createNew }
                  </li>
                </ul>
            ]
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

  _inputFocus(e){
    this._focus(true)
    !this.props.open && this.open()
  },

  _focus(focused, e){
    if (this.props.disabled === true )
      return

    this.setTimeout('focus', () => {
      if( focused) 
        this.refs.input.focus()

      else 
        this.refs.tagList && this.refs.tagList.clear()
      
      if( focused !== this.state.focused){
        focused 
          ? this.open() 
          : this.close();

        this.notify(focused ? 'onFocus' : 'onBlur', e)
        this.setState({ focused: focused })
      }
    })
  },

  _searchKeyDown(e){ 
    if (e.key === 'Backspace' && e.target.value && !this._deletingText)
      this._deletingText = true
  },

  _searchgKeyUp(e){ 
    if (e.key === 'Backspace' && this._deletingText) 
      this._deletingText = false
  },

  _typing: function(e){
    this.notify('onSearch', [ e.target.value ])
    this.open()
  },

  _onSelect: function(data){

    if (data === undefined) {
      if (this.props.onCreate)
        this._onCreate(this.props.searchTerm)
 
      return
    }

    this.notify('onSelect', data)
    this.change(this.state.dataItems.concat(data))

    this.close()
    this._focus(true)
  },

  _onCreate: function(tag){
    if (tag.trim() === '' ) 
      return

    this.notify('onCreate', tag)
    this.props.searchTerm
      && this.notify('onSearch', [ '' ])

    this.close()
    this._focus(true)
  },

  _keyDown: function(e){
    var key = e.key
      , alt = e.altKey
      , ctrl = e.ctrlKey
      , noSearch = !this.props.searchTerm && !this._deletingText
      , isOpen  = this.props.open
      , focusedItem = this.state.focusedItem
      , tagList = this.refs.tagList
      , list    = this.refs.list;

    if ( key === 'ArrowDown') {
      var next = list.next(focusedItem)
        , creating = (this._shouldShowCreate() && focusedItem === next) || focusedItem === null;
        
      next = creating ? null : next

      e.preventDefault()
      if ( isOpen ) this.setState({ focusedItem: next })
      else          this.open()
    }
    else if ( key === 'ArrowUp') {
      var prev = focusedItem === null 
        ? list.last() 
        : list.prev(focusedItem)

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
    else if ( isOpen && key === 'Enter')
      (ctrl && this.props.onCreate) || focusedItem === null
        ? this._onCreate(this.props.searchTerm)
        : this._onSelect(this.state.focusedItem)

    else if ( key === 'Escape')
      isOpen ? this.close() : this.refs.tagList.clear()

    else if ( noSearch && key === 'ArrowLeft')
     tagList && tagList.prev()

    else if ( noSearch && key === 'ArrowRight')
      tagList && tagList.next()

    else if ( noSearch && key === 'Delete')
      tagList && tagList.removeCurrent()

    else if ( noSearch && key === 'Backspace')
      tagList && tagList.removeNext()

    this.notify('onKeyDown', [e])
  },

  change: function(data){
    this.notify('onChange', [data])
    this.props.searchTerm 
      && this.notify('onSearch', [ '' ])
  },

  open: function(){
    if (!(this.props.disabled === true || this.props.readOnly === true))
      this.notify('onToggle', true)
  },

  close: function(){
    this.notify('onToggle', false)
  },

  toggle(e){
    this.props.open
      ? this.close()
      : this.open()
  },

  process(data, values, searchTerm){
    var items = data.filter( i => !values.some( this._valueMatcher.bind(null, i), this), this)

    if( searchTerm)
      items = this.filter(items, searchTerm)

    return items
  },

  _shouldShowCreate(){
    var text = this.props.searchTerm;

    //console.log('should ', this.props.onCreate)

    if ( !this.props.onCreate || !text ) 
      return false

    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
    return !this._data().some( v => this._dataText(v) === text) 
        && !this.state.dataItems.some( v => this._dataText(v) === text) 
  },

  _placeholder(){
    return (this.props.value || []).length
      ? ''
      : (this.props.placeholder || '')
  }

})


module.exports = createUncontrolledWidget(Multiselect
    , { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' });


// function defaultChange(){
//   if ( this.props.searchTerm === undefined )
//     this.setState({ searchTerm: '' })
// }

module.exports.BaseMultiselect = Multiselect