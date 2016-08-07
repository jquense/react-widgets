import React from 'react';
import cn from 'classnames';
import _  from './util/_';
import createUncontrolledWidget from 'uncontrollable';

import Widget from './Widget';
import WidgetPicker from './WidgetPicker';
import Select from './Select';
import Popup from './Popup';
import SelectInput from './MultiselectInput';
import TagList from './MultiselectTagList';
import CustomPropTypes from './util/propTypes';
import PlainList from './List';
import GroupableList from './ListGroupable';

import validateList from './util/validateListInterface';
import { dataItem, dataText, valueMatcher } from './util/dataHelpers';
import { widgetEditable, isDisabled, isReadOnly } from './util/interaction';
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers';

var compatCreate = (props, msgs) => typeof msgs.createNew === 'function'
  ? msgs.createNew(props)
  : [<strong key='dumb'>{`"${props.searchTerm}"`}</strong>, ' ' + msgs.createNew]

let { splat } = _;

var propTypes = {
  ...Popup.propTypes,

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

  busy:            React.PropTypes.bool,
  dropUp:          React.PropTypes.bool,

  placeholder:     React.PropTypes.string,

  autoFocus:      React.PropTypes.bool,
  disabled:       CustomPropTypes.disabled.acceptsArray,
  readOnly:       CustomPropTypes.readOnly,

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
    require('./mixins/FocusMixin')({
      willHandle(focused) {
        focused && this.focus()
      },
      didHandle(focused) {
        if (!focused) this.close()

        if (!focused && this.refs.tagList)
          this.setState({ focusedTag: null })

        // if (focused && !this.props.open && !this.props.readOnly === true)
        //   this.open()
      }
    })
  ],

  propTypes,

  getDefaultProps() {
    return {
      data: [],
      filter: 'startsWith',
      value: [],
      open: false,
      searchTerm: '',
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

  componentWillMount() {
    this.inputId = instanceId(this, '_input')
    this.tagsId = instanceId(this, '_taglist')
    this.notifyId = instanceId(this, '_notify_area')
    this.listId = instanceId(this, '_listbox')
    this.createId = instanceId(this, '_createlist_option')
    this.activeTagId = instanceId(this, '_taglist_active_tag')
    this.activeOptionId = instanceId(this, '_listbox_active_option')
  },

  componentDidUpdate() {
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

  renderCreateItem(messages) {
    let { searchTerm } = this.props;
    let createIsFocused = this.isCreateTagFocused();

    return (
      <ul
        role='listbox'
        id={this.createId}
        className="rw-list rw-multiselect-create-tag"
      >
        <li
          role='option'
          onClick={() => this.handleCreate(searchTerm)}
          id={createIsFocused ? this.activeOptionId : null}
          className={cn(
            'rw-list-option',
            'rw-create-list-option',
            createIsFocused && 'rw-state-focus'
          )}
        >
          {compatCreate(this.props, messages)}
        </li>
      </ul>
    )
  },

  renderInput(ownedIds) {
    let {
        searchTerm
      , maxLength
      , tabIndex
      , busy
      , autoFocus
      , open } = this.props;

    let { focusedItem, focusedTag } = this.state;

    let disabled = isDisabled(this.props)
    let readOnly = isReadOnly(this.props)
    let active = open
      ? (focusedItem || this.isCreateTagFocused())
        && this.activeOptionId
      : focusedTag && this.activeTagId;

    return (
      <SelectInput
        ref='input'
        autoFocus={autoFocus}
        tabIndex={tabIndex || 0}
        role='listbox'
        aria-expanded={!!open}
        aria-busy={!!busy}
        aria-owns={ownedIds}
        aria-haspopup={true}
        aria-activedescendant={active || null}
        value={searchTerm}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={this.getPlaceholder()}
        onKeyDown={this.handleSearchKeyDown}
        onKeyUp={this.handleSearchKeyUp}
        onChange={this.handleInputChange}
      />
    )
  },

  renderList(List, messages) {
    let { inputId, activeOptionId, listId } = this;
    let { open } = this.props;
    let { focusedItem } = this.state;

    let listProps = _.pickProps(this.props, List);
    let items  = this._data();

    return (
      <List ref="list" key={0}
        {...listProps}
        id={listId}
        activeId={activeOptionId}
        data={items}
        focused={focusedItem}
        onSelect={this.handleSelect}
        onMove={this._scrollTo}
        aria-live='polite'
        aria-labelledby={inputId}
        aria-hidden={!open}
        messages={{
          emptyList: this._lengthWithoutValues
            ? messages.emptyFilter
            : messages.emptyList
        }}
      />
    )
  },

  renderNotificationArea(messages) {
    let { textField } = this.props;
    let { focused, dataItems } = this.state;

    let itemText = dataItems.map(item => dataText(item, textField)).join(', ')

    return (
      <span
        id={this.notifyId}
        role="status"
        className='rw-sr'
        aria-live='assertive'
        aria-atomic="true"
        aria-relevant="additions removals text"
      >
        {focused && (
          dataItems.length
            ? (messages.selectedItems + ': ' + itemText)
            : messages.noneSelected
        )}
      </span>
    )
  },

  renderTags(messages) {
    let { disabled, readOnly, valueField, textField } = this.props;
    let { focusedTag, dataItems } = this.state;

    let Component = this.props.tagComponent;

    return (
      <TagList
        ref='tagList'
        id={this.tagsId}
        activeId={this.activeTagId}
        valueField={valueField}
        textField={textField}
        label={messages.tagsLabel}
        value={dataItems}
        focused={focusedTag}
        disabled={disabled}
        readOnly={readOnly}
        onDelete={this.handleDelete}
        valueComponent={Component}
      />
    )
  },

  render() {
    let {
        className
      , groupBy
      , messages
      , busy
      , dropUp
      , open
      , duration
      , listComponent: List } = this.props;

    let { focused, dataItems } = this.state;

    List = List || (groupBy && GroupableList) || PlainList

    let elementProps = _.omitOwnProps(this, List);

    let shouldRenderTags = !!dataItems.length
      , shouldRenderPopup = isFirstFocusedRender(this) || open
      , shouldShowCreate = this.shouldShowCreate();

    let inputOwns = `${this.listId} ${this.notifyId} `
      + (shouldRenderTags ? this.tagsId : '')
      + (shouldShowCreate ? this.createId : '');

    let disabled = isDisabled(this.props)
    let readOnly = isReadOnly(this.props)

    messages = msgs(messages);

    return (
      <Widget
        {...elementProps}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        className={cn(className, 'rw-multiselect')}
      >
        {this.renderNotificationArea(messages)}
        <WidgetPicker
          open={open}
          dropUp={dropUp}
          focused={focused}
          disabled={disabled}
          readOnly={readOnly}
          className="rw-widget-input"
          onClick={this.handleClick}
          onTouchEnd={this.handleClick}
        >
          <div>
            {shouldRenderTags &&
              this.renderTags(messages)
            }
            {this.renderInput(inputOwns)}
          </div>

          <Select
            busy={busy}
            icon={focused ? 'caret-down' :''}
            aria-hidden="true"
            role="presentational"
            disabled={disabled || readOnly}
          />
        </WidgetPicker>


        {shouldRenderPopup &&
          <Popup
            dropUp={dropUp}
            open={open}
            duration={duration}
            onOpening={()=> this.refs.list.forceUpdate()}
          >
            <div>
              {this.renderList(List, messages)}

              {shouldShowCreate &&
                this.renderCreateItem(messages)
              }
            </div>
          </Popup>
        }
      </Widget>
    )
  },

  _data() {
    return this.state.processedData
  },

  handleDelete(value) {
    this.focus()
    this.change(
      this.state.dataItems.filter( d => d !== value))
  },

  handleSearchKeyDown(e) {
    if (e.key === 'Backspace' && e.target.value && !this._deletingText)
      this._deletingText = true
  },

  handleSearchKeyUp(e) {
    if (e.key === 'Backspace' && this._deletingText)
      this._deletingText = false
  },

  handleInputChange(e) {
    notify(this.props.onSearch, [ e.target.value ])
    this.open()
  },

  @widgetEditable
  handleClick() {
    this.open()
  },

  @widgetEditable
  handleSelect(data) {
    if (data === undefined) {
      if (this.props.onCreate)
        this.handleCreate(this.props.searchTerm)

      return
    }
    notify(this.props.onSelect, data)
    this.change(this.state.dataItems.concat(data))

    this.close()
    this.focus()
  },

  @widgetEditable
  handleCreate(tag) {
    if (tag.trim() === '' )
      return

    notify(this.props.onCreate, tag)
    this.props.searchTerm
      && notify(this.props.onSearch, [ '' ])

    this.close()
    this.focus()
  },

  @widgetEditable
  handleKeyDown(e) {
    let { key, keyCode, altKey, ctrlKey } = e
      , noSearch = !this.props.searchTerm && !this._deletingText
      , isOpen  = this.props.open;

    let { focusedTag, focusedItem } = this.state;
    let { list, tagList } = this.refs;
    let nullTag = { focusedTag: null };

    notify(this.props.onKeyDown, [e])

    if (e.defaultPrevented)
      return

    if (key === 'ArrowDown') {
      var next = list.next(focusedItem)
        , creating = (this.shouldShowCreate() && focusedItem === next) || focusedItem === null;

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
    else if (isOpen && keyCode === 13) { // using keyCode to ignore enter for japanese IME
      e.preventDefault();
      (ctrlKey && this.props.onCreate) || focusedItem === null
        ? this.handleCreate(this.props.searchTerm)
        : this.handleSelect(this.state.focusedItem)
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

    else if (noSearch && key === ' ' && !isOpen) {
      e.preventDefault()
      this.open()
    }
  },

  @widgetEditable
  change(data) {
    notify(this.props.onChange, [data])
    notify(this.props.onSearch, [ '' ])
  },

  focus() {
    this.refs.input &&
      this.refs.input.focus()
  },

  open() {
    if (!this.props.open)
      notify(this.props.onToggle, true)
  },

  close() {
    notify(this.props.onToggle, false)
  },

  toggle() {
    this.props.open
      ? this.close()
      : this.open()
  },

  process(data, values, searchTerm) {
    var { valueField } = this.props;
    var items = data.filter( i =>
      !values.some(v => valueMatcher(i, v, valueField)))

    this._lengthWithoutValues = items.length;

    if (searchTerm)
      items = this.filter(items, searchTerm)

    return items
  },

  isCreateTagFocused() {
    let { focusedItem } = this.state;

    if (!this.shouldShowCreate())
      return false;

    return !this._data().length || focusedItem === null;
  },

  shouldShowCreate() {
    var { textField, searchTerm, onCreate, caseSensitive } = this.props;

    if (!onCreate || !searchTerm)
      return false

    var lower = text => caseSensitive ? text : text.toLowerCase();
    var eq =  v => lower(dataText(v, textField)) === lower(searchTerm);

    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
    return !this._data().some(eq) && !this.state.dataItems.some(eq)
  },

  getPlaceholder() {
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
    , { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' }, ['focus']);
