'use strict';
var React           = require('react')
  , activeElement   = require('react/lib/getActiveElement')
  , _               = require('./util/_')
  , contains        = require('dom-helpers/query/contains')
  , cx              = require('classnames')
  , compat          = require('./util/compat')
  , CustomPropTypes = require('./util/propTypes')
  , Popup           = require('./Popup')
  , PlainList       = require('./List')
  , GroupableList   = require('./ListGroupable')
  , validateList    = require('./util/validateListInterface')
  , createUncontrolledWidget = require('uncontrollable');

let { omit, pick, result } = _;

const FOCUSED_ID = '_listbox_option_selected';

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

  searchTerm:     React.PropTypes.string,
  onSearch:       React.PropTypes.func,

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
    open:              CustomPropTypes.message,
    emptyList:         CustomPropTypes.message,
    emptyFilter:       CustomPropTypes.message,
    filterPlaceholder: CustomPropTypes.message
  })
};

var DropdownList = React.createClass({

  displayName: 'DropdownList',

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/TimeoutMixin'),
    require('./mixins/PureRenderMixin'),
    require('./mixins/DataFilterMixin'),
    require('./mixins/DataHelpersMixin'),
    require('./mixins/PopupScrollToMixin'),
    require('./mixins/RtlParentContextMixin')
  ],

  propTypes: propTypes,

  getDefaultProps: function(){
    return {
      delay: 500,
      value: '',
      open: false,
      data: [],
      searchTerm: '',
      messages: msgs()
    }
  },

  getInitialState: function(){
    var filter = this.props.open && this.props.filter
      , data = filter ? this.filter(this.props.data, this.props.searchTerm) : this.props.data
      , initialIdx = this._dataIndexOf(this.props.data, this.props.value);

    return {
      filteredData: filter && data,
      selectedItem: data[initialIdx],
      focusedItem:  data[initialIdx] || data[0]
    }
  },

  componentDidUpdate() {
    React.findDOMNode(this)
      .setAttribute('aria-activedescendant', this._id(FOCUSED_ID))

    this.refs.list && validateList(this.refs.list)
  },

  componentWillReceiveProps(props){
    var filter = props.open && props.filter
      , data = filter ? this.filter(props.data, props.searchTerm) : props.data
      , idx = this._dataIndexOf(data, props.value);

    this.setState({
      filteredData: filter && data,
      selectedItem: data[idx],
      focusedItem:  data[!~idx ? 0 : idx]
    })
  },

  render() {
    let {
        className, tabIndex, filter
      , groupBy, messages, data, busy, dropUp
      , placeholder, value, open, disabled, readOnly
      , valueComponent: ValueComponent
      , listComponent: List } = this.props;

    List = List || (groupBy && GroupableList) || PlainList

    let elementProps = omit(this.props, Object.keys(propTypes));
    let listProps    = pick(this.props, Object.keys(compat.type(List).propTypes));
    let popupProps   = pick(this.props, Object.keys(compat.type(Popup).propTypes));

    let { focusedItem, selectedItem, focused } = this.state;

    let processedData = this._data()
      , valueItem = this._dataItem(data, value) // take value from the raw data
      , listID = this._id('_listbox')
      , optID = this._id(FOCUSED_ID);

    let shouldRenderList = _.isFirstFocusedRender(this) || open;

    messages = msgs(messages)

    return (
      <div {...elementProps}
        ref="input"
        role='combobox'
        tabIndex={tabIndex || '0'}
        aria-expanded={open }
        aria-haspopup={true}
        aria-owns={listID}
        aria-busy={!!busy}
        aria-live={!open && 'polite'}
        //aria-labelledby={!open && optID}
        aria-autocomplete="list"
        aria-disabled={disabled }
        aria-readonly={readOnly }
        onKeyDown={this._keyDown}
        onClick={this._click}
        onFocus={this._focus.bind(null, true)}
        onBlur ={this._focus.bind(null, false)}
        className={cx(className, 'rw-dropdownlist', 'rw-widget', {
          'rw-state-disabled':  disabled,
          'rw-state-readonly':  readOnly,
          'rw-state-focus':     focused,
          'rw-rtl':             this.isRtl(),

          ['rw-open' + (dropUp ? '-up' : '')]: open
        })}>

        <span className="rw-dropdownlist-picker rw-select rw-btn">
          <i className={'rw-i rw-i-caret-down' + (busy ? ' rw-loading' : '')}>
            <span className="rw-sr">
              { result(messages.open, this.props) }
            </span>
          </i>
        </span>
        <div
          className="rw-input"
        >
          { !valueItem && placeholder
            ? <span className='rw-placeholder'>{placeholder}</span>
            : this.props.valueComponent
              ? <ValueComponent item={valueItem}/>
              : this._dataText(valueItem)
          }
        </div>
        <Popup {...popupProps}
          onOpen={() => this.focus() }
          onOpening={() => this.refs.list.forceUpdate() }
          onRequestClose={this.close}>

          <div>
            { filter && this._renderFilter(messages) }
            { shouldRenderList &&
              <List ref="list"
                {...listProps}
                data={processedData}
                id={listID}
                optID={optID}
                aria-live={open && 'polite'}
                aria-labelledby={this._id()}
                aria-hidden={!this.props.open}
                selected={selectedItem}
                focused ={open ? focusedItem : null}
                onSelect={this._onSelect}
                onMove={this._scrollTo}
                messages={{
                  emptyList: data.length
                    ? messages.emptyFilter
                    : messages.emptyList
                }}/>
            }
          </div>
        </Popup>
      </div>
    )
  },

  _renderFilter(messages){
    return (
      <div ref='filterWrapper' className='rw-filter-input'>
        <span className='rw-select rw-btn'><i className='rw-i rw-i-search'/></span>
        <input ref='filter' className='rw-input'
          placeholder={_.result(messages.filterPlaceholder, this.props)}
          value={this.props.searchTerm }
          onChange={ e => this.notify('onSearch', e.target.value)}/>
      </div>
    )
  },

  _focus: _.ifNotDisabled(true, function(focused, e){

    this.setTimeout('focus', () => {
      if( !focused) this.close()

      if( focused !== this.state.focused) {
        this.notify(focused ? 'onFocus' : 'onBlur', e)
        this.setState({ focused: focused })
      }
    })
  }),

  _onSelect: _.ifNotDisabled(function(data){
    this.close()
    this.notify('onSelect', data)
    this.change(data)
    this.focus(this)
  }),

  _click: _.ifNotDisabled(function(e){
    var wrapper = this.refs.filterWrapper

    if( !this.props.filter || !this.props.open )
      this.toggle()

    else if( !contains(compat.findDOMNode(wrapper), e.target))
      this.close()

    this.notify('onClick', e)
  }),

  _keyDown: _.ifNotDisabled(function (e){
    var self = this
      , key = e.key
      , alt = e.altKey
      , list = this.refs.list
      , filtering = this.props.filter
      , focusedItem = this.state.focusedItem
      , selectedItem = this.state.selectedItem
      , isOpen = this.props.open
      , closeWithFocus = () => { this.close(), compat.findDOMNode(this).focus()};

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
      closeWithFocus()
    }
    else if ( (key === 'Enter' || (key === ' ' && !filtering)) && isOpen ) {
      change(this.state.focusedItem, true)
    }
    else if ( key === 'ArrowDown' ) {
      if ( alt )         this.open()
      else if ( isOpen ) this.setState({ focusedItem: list.next(focusedItem) })
      else               change(list.next(selectedItem))
      e.preventDefault()
    }
    else if ( key === 'ArrowUp' ) {
      if ( alt )         closeWithFocus()
      else if ( isOpen ) this.setState({ focusedItem: list.prev(focusedItem) })
      else               change(list.prev(selectedItem))
      e.preventDefault()
    }
    else if ( !(this.props.filter && isOpen) )
      this.search(String.fromCharCode(e.keyCode), item => {
        isOpen
          ? this.setState({ focusedItem: item })
          : change(item)
      })


    this.notify('onKeyDown', [e])

    function change(item, fromList){
      if(!item) return
      fromList
        ? self._onSelect(item)
        : self.change(item)
    }
  }),

  change(data){
    if ( !_.isShallowEqual(data, this.props.value) ) {
      this.notify('onChange', data)
      this.notify('onSearch', '')
      this.close()
    }
  },

  focus(target){
    var inst = target || (this.props.filter && this.props.open ? this.refs.filter : this.refs.input);

    if ( activeElement() !== compat.findDOMNode(inst))
      compat.findDOMNode(inst).focus()
  },

  _data() {
    return this.state.filteredData || this.props.data.concat()
  },

  search(character, cb) {
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

  open() {
    this.notify('onToggle', true)
  },

  close() {
    this.notify('onToggle', false)
  },

  toggle() {
    this.props.open
      ? this.close()
      : this.open()
  }

})

function msgs(msgs){
  return {
    open: 'open dropdown',
    filterPlaceholder: '',
    emptyList:   'There are no items in this list',
    emptyFilter: 'The filter returned no results',
    ...msgs
  }
}

module.exports = createUncontrolledWidget(
    DropdownList, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' });

module.exports.BaseDropdownList = DropdownList
