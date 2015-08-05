'use strict';
var React           = require('react')
  , cx              = require('classnames')
  , _               = require('./util/_')
  , support         = require('./util/dom/support')
  , compat          = require('./util/compat')
  , SelectInput     = require('./MultiselectInput')
  , TagList         = require('./MultiselectTagList')
  , Popup           = require('./Popup')
  , PlainList       = require('./List')
  , GroupableList   = require('./ListGroupable')
  , validateList    = require('./util/validateListInterface')
  , createUncontrolledWidget = require('uncontrollable')
  , CustomPropTypes = require('./util/propTypes');

var compatCreate = (props, msgs) => typeof msgs.createNew === 'function'
  ? msgs.createNew(props) : [<strong>{`"${props.searchTerm}"`}</strong>, ' ' + msgs.createNew]

let { omit, pick, result, splat } = _;

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

      createComponent: CustomPropTypes.elementType,

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
        open:          CustomPropTypes.message,
        emptyList:     CustomPropTypes.message,
        emptyFilter:   CustomPropTypes.message,
        createNew:     CustomPropTypes.message
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
        createNew:   '(create new tag)',
        emptyList:   'There are no items in this list',
        emptyFilter: 'The filter returned no results',
        tagsLabel:   'Multiselect selected items',
        removeLabel: 'remove selected item'
      }
    }
  },

  getInitialState(){
    var dataItems = splat(this.props.value).map( item => this._dataItem(this.props.data, item))
      , data = this.process(this.props.data, dataItems, this.props.searchTerm)

    return {
      focusedTag:    null,
      focusedItem:   data[0],
      processedData: data,
      dataItems:     dataItems
    }
  },

  componentDidUpdate() {
    this.refs.list && validateList(this.refs.list)
  },

  componentDidMount() {
    // https://github.com/facebook/react/issues/1169
    if( support.ios )
      compat.findDOMNode(this.refs.wrapper).onClick = ()=>{}
  },

  componentWillReceiveProps(nextProps) {
    var values = _.splat(nextProps.value)
      , current = this.state.focusedItem
      , items  = this.process(nextProps.data, values, nextProps.searchTerm)

    this.setState({
      processedData: items,
      focusedItem: items.indexOf(current) === -1 ? items[0] : current,
      dataItems: values.map( item => this._dataItem(nextProps.data, item))
    })
  },

  render() {
    let {
        searchTerm, maxLength
      , className, children, tabIndex
      , groupBy, messages, data, busy, dropUp
      , placeholder, value, open, disabled, readOnly
      , tagComponent: TagComponent
      , listComponent: List } = this.props;

    List = List || (groupBy && GroupableList) || PlainList

    messages = msgs(messages);

    let elementProps = omit(this.props, Object.keys(propTypes));
    let tagsProps    = pick(this.props, [ 'valueField', 'textField']);
    let inputProps   = pick(this.props, [ 'maxLength', 'searchTerm']);
    let listProps    = pick(this.props, Object.keys(compat.type(List).propTypes));
    let popupProps   = pick(this.props, Object.keys(compat.type(Popup).propTypes));

    let {
        focusedTag, focusedItem, selectedItem
      , focused, dataItems } = this.state;

    var items  = this._data()
      , tagsID = this._id('_taglist')
      , listID = this._id('_listbox')
      , createID = this._id('_createlist')
      , optID    = this._id('_listbox_option_focused');

    let shouldRenderTags = !!dataItems.length
      , shouldRenderPopup = _.isFirstFocusedRender(this) || open
      , shouldShowCreate = this._shouldShowCreate()
      , createIsFocused = !items.length || focusedItem === null;

    return (
      <div {...elementProps}
        ref="element"
        id={this._id()}
        aria-label='persons multiselect'
        onKeyDown={this._maybeHandle(this._keyDown)}
        onFocus={this._maybeHandle(this._focus.bind(null, true), true)}
        onBlur ={this._focus.bind(null, false)}
        tabIndex={'-1'}
        className={cx(className, 'rw-widget', 'rw-multiselect',  {
          'rw-state-focus':    focused,
          'rw-state-disabled': disabled === true,
          'rw-state-readonly': readOnly === true,
          'rw-rtl':            this.isRtl(),
          [`rw-open${dropUp ? '-up' : ''}`]: open
        })}>
        <div className='rw-multiselect-wrapper' ref='wrapper'>
          { busy &&
            <i className="rw-i rw-loading"></i>
          }
          { shouldRenderTags &&
            <TagList {...tagsProps}
              ref='tagList'
              id={tagsID}
              aria-label={messages.tagsLabel}
              focusID={focusedTag != null && optID}
              value={dataItems}
              focused={focusedTag}
              disabled={disabled}
              readOnly={readOnly}
              onDelete={this._delete}
              valueComponent={TagComponent}
            />
          }
          <SelectInput
            {...inputProps}
            ref='input'
            tabIndex={tabIndex || 0}
            role='listbox'
            aria-activedescendant={optID}
            aria-expanded={open}
            aria-busy={!!busy}
            aria-owns={listID
              + (shouldRenderTags ? (' ' + tagsID) : '')
              + (shouldShowCreate ? (' ' + createID) : '')
            }
            aria-haspopup={true}
            value={searchTerm}
            maxLength={maxLength}
            disabled={disabled === true}
            readOnly={readOnly === true}
            placeholder={this._placeholder()}
            onKeyDown={this._searchKeyDown}
            onKeyUp={this._searchgKeyUp}
            onChange={this._typing}
            onFocus={this._inputFocus}
            onClick={this._inputFocus}
          />
        </div>
        <Popup {...popupProps}
          onOpening={()=> this.refs.list.forceUpdate()}
          onRequestClose={this.close}
        >
          <div>
          { shouldRenderPopup && [
            <List ref="list"
              key='0'
              {...listProps}
              //aria-label={messages.listLabel}
              readOnly={!!readOnly}
              disabled={!!disabled}
              id={listID}
              optID={focusedTag == null && optID}
              //aria-activedescendant={optID}
              aria-live='polite'
              aria-labelledBy={this._id()}
              aria-hidden={!open}
              data={items}
              focused={focusedItem}
              onSelect={this._maybeHandle(this._onSelect)}
              onMove={this._scrollTo}
              messages={{
                emptyList: data.length
                  ? messages.emptyFilter
                  : messages.emptyList
              }}/>,
              shouldShowCreate &&
                <ul role='listbox' id={createID} className="rw-list rw-multiselect-create-tag" key='1'>
                  <li onClick={this._onCreate.bind(null, searchTerm)}
                      role='option'
                      //aria-label='create new message'
                      id={createIsFocused ? optID : this._id('_create_option')}
                      className={cx({
                        'rw-list-option': true,
                        'rw-state-focus': createIsFocused
                      })}>
                    { compatCreate(this.props, messages) }
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

  _inputFocus(){
    this._focus(true)
    !this.props.open && this.open()
  },

  _focus(focused, e){
    if (this.props.disabled === true )
      return

    if( focused) this.refs.input.focus()

    this.setTimeout('focus', () => {
      if( !focused)
        this.refs.tagList && this.setState({ focusedTag: null })

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

  _typing(e){
    this.notify('onSearch', [ e.target.value ])
    this.open()
  },

  _onSelect(data){

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

  _onCreate(tag){
    if (tag.trim() === '' )
      return

    this.notify('onCreate', tag)
    this.props.searchTerm
      && this.notify('onSearch', [ '' ])

    this.close()
    this._focus(true)
  },

  _keyDown: function(e){
    let { key, altKey, ctrlKey } = e
      , noSearch = !this.props.searchTerm && !this._deletingText
      , isOpen  = this.props.open;

    let { focusedTag, focusedItem } = this.state;
    let { list, tagList } = this.refs;
    let nullTag = { focusedTag: null };

    if ( key === 'ArrowDown') {
      var next = list.next(focusedItem)
        , creating = (this._shouldShowCreate() && focusedItem === next) || focusedItem === null;

      next = creating ? null : next

      e.preventDefault()
      if (isOpen) this.setState({ focusedItem: next, ...nullTag })
      else          this.open()
    }
    else if (key === 'ArrowUp') {
      var prev = focusedItem === null
        ? list.last()
        : list.prev(focusedItem)

      e.preventDefault()

      if (altKey)      this.close()
      else if (isOpen) this.setState({ focusedItem: prev, ...nullTag })
    }
    else if (key === 'End'){
      if ( isOpen ) this.setState({ focusedItem: list.last(), ...nullTag })
      else          tagList && tagList.last()
    }
    else if (key === 'Home'){
      if (isOpen) this.setState({ focusedItem: list.first(), ...nullTag  })
      else          tagList && tagList.first()
    }
    else if (isOpen && key === 'Enter')
      (ctrlKey && this.props.onCreate) || focusedItem === null
        ? this._onCreate(this.props.searchTerm)
        : this._onSelect(this.state.focusedItem)

    else if (key === 'Escape')
      isOpen ? this.close() : tagList && this.setState(nullTag)

    else if (noSearch && key === 'ArrowLeft')
      tagList && this.setState({ focusedTag: tagList.prev(focusedTag) })

    else if (noSearch && key === 'ArrowRight')
      tagList && this.setState({ focusedTag: tagList.next(focusedTag) })

    else if (noSearch && key === 'Delete')
      tagList && tagList.removeCurrent(focusedTag)

    else if (noSearch && key === 'Backspace')
      tagList && tagList.removeNext()

    this.notify('onKeyDown', [e])
  },

  change(data){
    this.notify('onChange', [data])
    this.props.searchTerm
      && this.notify('onSearch', [ '' ])
  },

  open(){
    if (!(this.props.disabled === true || this.props.readOnly === true))
      this.notify('onToggle', true)
  },

  close(){
    this.notify('onToggle', false)
  },

  toggle(){
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

function msgs(msgs){
  return {
    emptyList:   'There are no items in this list',
    emptyFilter: 'The filter returned no results',
    listLabel:   'Multiselect available items',
    tagsLabel:   'Multiselect selected items',
    removeLabel: 'remove selected item',
    ...msgs
  }
}


module.exports = createUncontrolledWidget(Multiselect
    , { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' });


// function defaultChange(){
//   if ( this.props.searchTerm === undefined )
//     this.setState({ searchTerm: '' })
// }

module.exports.BaseMultiselect = Multiselect
