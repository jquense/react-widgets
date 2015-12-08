import React from 'react';
import cx from 'classnames';
import _  from './util/_';
import Popup from './Popup';
import SelectInput from './MultiselectInput';
import TagList from './MultiselectTagList';
import CustomPropTypes from './util/propTypes';
import PlainList from './List';
import GroupableList from './ListGroupable';
import validateList from './util/validateListInterface';
import createUncontrolledWidget from 'uncontrollable';
import { dataItem, dataText, valueMatcher } from './util/dataHelpers';
import { widgetEditable, widgetEnabled } from './util/interaction';
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers';

var compatCreate = (props, msgs) => typeof msgs.createNew === 'function'
  ? msgs.createNew(props) : [<strong key='dumb'>{`"${props.searchTerm}"`}</strong>, ' ' + msgs.createNew]

let { omit, pick, splat } = _;

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

      autoFocus:      React.PropTypes.bool,
      disabled:       CustomPropTypes.disabled.acceptsArray,
      readOnly:       CustomPropTypes.readOnly.acceptsArray,


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
    require('./mixins/TimeoutMixin'),
    require('./mixins/DataFilterMixin'),
    require('./mixins/PopupScrollToMixin'),
    require('./mixins/RtlParentContextMixin'),
    require('./mixins/AriaDescendantMixin')('input', function(key, id){
      let { ariaActiveDescendantKey: myKey } = this.props;

      let createIsActive =
            (!this._data().length || this.state.focusedItem === null)
            && key === myKey;

      let tagIsActive = this.state.focusedTag != null && key === 'taglist';
      let listIsActive = this.state.focusedTag == null && key === 'list';

      if (createIsActive || tagIsActive || listIsActive)
        return id;
    })
  ],

  propTypes: propTypes,

  getDefaultProps(){
    return {
      data: [],
      filter: 'startsWith',
      value: [],
      open: false,
      searchTerm: '',
      ariaActiveDescendantKey: 'multiselect',
      messages: {
        createNew:     '(create new tag)',
        emptyList:     'There are no items in this list',
        emptyFilter:   'The filter returned no results',
        tagsLabel:     'selected items',
        selectedItems: 'selected items',
        noneSelected:  'no selected items',
        removeLabel:   'remove selected item'
      }
    }
  },

  getInitialState(){
    var { data, value, valueField, searchTerm } = this.props
      , dataItems = splat(value).map( item => dataItem(data, item, valueField))
      , processedData = this.process(data, dataItems, searchTerm)

    return {
      focusedTag:    null,
      focusedItem:   processedData[0],
      processedData: processedData,
      dataItems:     dataItems
    }
  },

  componentDidUpdate() {
    this.ariaActiveDescendant(
      instanceId(this, '__createlist_option'))

    this.refs.list && validateList(this.refs.list)
  },

  componentWillReceiveProps(nextProps) {
    var { data, value, valueField, searchTerm } = nextProps
      , values = _.splat(value)
      , current = this.state.focusedItem
      , items  = this.process(data, values, searchTerm)

    this.setState({
      processedData: items,
      focusedItem: items.indexOf(current) === -1 ? items[0] : current,
      dataItems: values.map( item => dataItem(data, item, valueField))
    })
  },

  render() {
    let {
        searchTerm, maxLength
      , className, tabIndex, textField
      , groupBy, messages, busy, dropUp
      , open, disabled, readOnly
      , tagComponent: TagComponent
      , listComponent: List } = this.props;

    List = List || (groupBy && GroupableList) || PlainList

    messages = msgs(messages);

    let elementProps = omit(this.props, Object.keys(propTypes));
    let tagsProps    = pick(this.props, [ 'valueField', 'textField']);
    let inputProps   = pick(this.props, [ 'maxLength', 'searchTerm', 'autoFocus']);
    let listProps    = pick(this.props, Object.keys(List.propTypes));
    let popupProps   = pick(this.props, Object.keys(Popup.propTypes));

    let {
        focusedTag, focusedItem
      , focused, dataItems } = this.state;

    var items  = this._data()
      , tagsID = instanceId(this, '_taglist')
      , listID = instanceId(this, '__listbox')
      , createID = instanceId(this, '__createlist')
      , createOptionID = instanceId(this, '__createlist_option');

    let shouldRenderTags = !!dataItems.length
      , shouldRenderPopup = isFirstFocusedRender(this) || open
      , shouldShowCreate = this._shouldShowCreate()
      , createIsFocused = !items.length || focusedItem === null;

    if (focused) {
      var notify = dataItems.length
            ? (messages.selectedItems + ': ' + dataItems.map(item => dataText(item, textField)).join(', '))
            : messages.noneSelected
    }

    return (
      <div {...elementProps}
        ref="element"
        id={instanceId(this)}
        onKeyDown={this._keyDown}
        onFocus={this._focus.bind(null, true)}
        onBlur ={this._focus.bind(null, false)}
        onTouchEnd={this._focus.bind(null, true)}
        tabIndex={'-1'}
        className={cx(className, 'rw-widget', 'rw-multiselect',  {
          'rw-state-focus':    focused,
          'rw-state-disabled': disabled === true,
          'rw-state-readonly': readOnly === true,
          'rw-rtl':            this.isRtl(),
          [`rw-open${dropUp ? '-up' : ''}`]: open
        })}>

        <span
          ref='status'
          id={instanceId(this, '__notify')}
          role="status"
          className='rw-sr'
          aria-live='assertive'
          aria-atomic="true"
          aria-relevant="additions removals text"
        >
          { notify }
        </span>

        <div className='rw-multiselect-wrapper' ref='wrapper'>
          { busy &&
            <i className="rw-i rw-loading"></i>
          }
          { shouldRenderTags &&
            <TagList {...tagsProps}
              ref='tagList'
              id={tagsID}
              aria-label={messages.tagsLabel}
              value={dataItems}
              focused={focusedTag}
              disabled={disabled}
              readOnly={readOnly}
              onDelete={this._delete}
              valueComponent={TagComponent}
              ariaActiveDescendantKey='taglist'
            />
          }
          <SelectInput
            {...inputProps}
            ref='input'
            tabIndex={tabIndex || 0}
            role='listbox'
            aria-expanded={open}
            aria-busy={!!busy}
            autoFocus={this.props.autoFocus}
            aria-owns={listID
              + ' ' + instanceId(this, '__notify')
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
            onTouchEnd={this._inputFocus}
          />
        </div>
        <Popup {...popupProps}
          onOpening={()=> this.refs.list.forceUpdate()}
        >
          <div>
          { shouldRenderPopup && [
              <List ref="list"
                key={0}
                {...listProps}
                readOnly={!!readOnly}
                disabled={!!disabled}
                id={listID}
                aria-live='polite'
                aria-labelledby={instanceId(this)}
                aria-hidden={!open}
                ariaActiveDescendantKey='list'
                data={items}
                focused={focusedItem}
                onSelect={this._onSelect}
                onMove={this._scrollTo}
                messages={{
                  emptyList: this._lengthWithoutValues
                    ? messages.emptyFilter
                    : messages.emptyList
                }}
              />,
              shouldShowCreate &&
                <ul key={1} role='listbox' id={createID} className="rw-list rw-multiselect-create-tag">
                  <li onClick={this._onCreate.bind(null, searchTerm)}
                      role='option'
                      id={createOptionID}
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

  @widgetEnabled
  _focus(focused, e){
    if (this.props.disabled === true )
      return

    if(focused) this.refs.input.focus()

    this.setTimeout('focus', () => {
      if(!focused)
        this.refs.tagList && this.setState({ focusedTag: null })

      if(focused !== this.state.focused) {
        focused
          ? this.open()
          : this.close();

        notify(this.props[focused ? 'onFocus' : 'onBlur'], e)
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
    notify(this.props.onSearch, [ e.target.value ])
    this.open()
  },

  @widgetEditable
  _onSelect(data){

    if (data === undefined) {
      if (this.props.onCreate)
        this._onCreate(this.props.searchTerm)

      return
    }

    notify(this.props.onSelect, data)
    this.change(this.state.dataItems.concat(data))

    this.close()
    this._focus(true)
  },

  @widgetEditable
  _onCreate(tag){
    if (tag.trim() === '' )
      return

    notify(this.props.onCreate, tag)
    this.props.searchTerm
      && notify(this.props.onSearch, [ '' ])

    this.close()
    this._focus(true)
  },

  @widgetEditable
  _keyDown(e) {
    let { key, altKey, ctrlKey } = e
      , noSearch = !this.props.searchTerm && !this._deletingText
      , isOpen  = this.props.open;

    let { focusedTag, focusedItem } = this.state;
    let { list, tagList } = this.refs;
    let nullTag = { focusedTag: null };

    notify(this.props.onKeyDown, [e])

    if (e.defaultPrevented)
      return

    if ( key === 'ArrowDown') {
      var next = list.next(focusedItem)
        , creating = (this._shouldShowCreate() && focusedItem === next) || focusedItem === null;

      next = creating ? null : next

      e.preventDefault()
      if (isOpen) this.setState({ focusedItem: next, ...nullTag })
      else        this.open()
    }
    else if (key === 'ArrowUp') {
      var prev = focusedItem === null
        ? list.last()
        : list.prev(focusedItem)

      e.preventDefault()

      if (altKey)      this.close()
      else if (isOpen) this.setState({ focusedItem: prev, ...nullTag })
    }
    else if (key === 'End') {
      e.preventDefault()
      if ( isOpen ) this.setState({ focusedItem: list.last(), ...nullTag })
      else          tagList && this.setState({ focusedTag: tagList.last() })
    }
    else if (key === 'Home') {
      e.preventDefault()
      if (isOpen) this.setState({ focusedItem: list.first(), ...nullTag })
      else          tagList && this.setState({ focusedTag: tagList.first() })
    }
    else if (isOpen && key === 'Enter') {
      e.preventDefault();
      (ctrlKey && this.props.onCreate) || focusedItem === null
        ? this._onCreate(this.props.searchTerm)
        : this._onSelect(this.state.focusedItem)
    }
    else if (key === 'Escape')
      isOpen ? this.close() : tagList && this.setState(nullTag)

    else if (noSearch && key === 'ArrowLeft')
      tagList && this.setState({ focusedTag: tagList.prev(focusedTag) })

    else if (noSearch && key === 'ArrowRight')
      tagList && this.setState({ focusedTag: tagList.next(focusedTag) })

    else if (noSearch && key === 'Delete')
      tagList && tagList.remove(focusedTag)

    else if (noSearch && key === 'Backspace')
      tagList && tagList.removeNext()

  },

  @widgetEditable
  change(data){
    notify(this.props.onChange, [data])
    notify(this.props.onSearch, [ '' ])
  },

  open(){
    if (!(this.props.disabled === true || this.props.readOnly === true))
      notify(this.props.onToggle, true)
  },

  close(){
    notify(this.props.onToggle, false)
  },

  toggle(){
    this.props.open
      ? this.close()
      : this.open()
  },

  process(data, values, searchTerm){
    var { valueField } = this.props;
    var items = data.filter( i =>
      !values.some(v => valueMatcher(i, v, valueField)))

    this._lengthWithoutValues = items.length;

    if (searchTerm)
      items = this.filter(items, searchTerm)

    return items
  },

  _shouldShowCreate(){
    var { textField, searchTerm, onCreate } = this.props;

    if ( !onCreate || !searchTerm )
      return false

    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
    return !this._data().some( v => dataText(v, textField) === searchTerm)
        && !this.state.dataItems.some( v => dataText(v, textField) === searchTerm)
  },

  _placeholder(){
    return (this.props.value || []).length
      ? ''
      : (this.props.placeholder || '')
  }

})

function msgs(msgs){
  return {
    createNew:     '(create new tag)',
    emptyList:     'There are no items in this list',
    emptyFilter:   'The filter returned no results',
    tagsLabel:     'selected items',
    selectedItems: 'selected items',
    removeLabel:   'remove selected item',
    ...msgs
  }
}

export default createUncontrolledWidget(Multiselect
    , { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' });
