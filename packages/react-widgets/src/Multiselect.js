import React from 'react';
import cn from 'classnames';
import { splat }  from './util/_';
import uncontrollable from 'uncontrollable';

import Widget from './Widget';
import WidgetPicker from './WidgetPicker';
import Select from './Select';
import Popup from './Popup';
import MultiselectInput from './MultiselectInput';
import TagList from './MultiselectTagList';
import List from './List';

import * as Filter from './util/Filter';
import * as Props from './util/Props';
import * as CustomPropTypes from './util/PropTypes';
import accessorManager from './util/accessorManager';
import focusManager from './util/focusManager';
import listDataManager from './util/listDataManager';
import scrollManager from './util/scrollManager';
import withRightToLeft from './util/withRightToLeft';
import { widgetEditable } from './util/interaction';
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers';

let compatCreate = (props, msgs) => typeof msgs.createNew === 'function'
  ? msgs.createNew(props)
  : [<strong key='dumb'>{`"${props.searchTerm}"`}</strong>, ' ' + msgs.createNew]

const INSERT = 'insert';
const REMOVE = 'remove';

let propTypes = {
  ...Popup.propTypes,
  ...Filter.propTypes,

  data: React.PropTypes.array,
  //-- controlled props --
  value: React.PropTypes.array,
  onChange: React.PropTypes.func,

  searchTerm: React.PropTypes.string,
  onSearch: React.PropTypes.func,

  open: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
  //-------------------------------------------

  valueField: React.PropTypes.string,
  textField: CustomPropTypes.accessor,

  tagComponent: CustomPropTypes.elementType,
  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,

  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,

  createComponent: CustomPropTypes.elementType,

  onSelect: React.PropTypes.func,
  onCreate: React.PropTypes.oneOfType([
    React.PropTypes.oneOf([false]),
    React.PropTypes.func
  ]),

  busy: React.PropTypes.bool,
  dropUp: React.PropTypes.bool,

  placeholder: React.PropTypes.string,

  listProps: React.PropTypes.object,

  autoFocus:    React.PropTypes.bool,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly:    CustomPropTypes.disabled,

  messages: React.PropTypes.shape({
    open: CustomPropTypes.message,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
    createNew: CustomPropTypes.message
  })
};


@withRightToLeft
class Multiselect extends React.Component {

  static propTypes = propTypes;

  static defaultProps = {
    data: [],
    filter: 'startsWith',
    value: [],
    open: false,
    searchTerm: '',
    listComponent: List,
    messages: {
      createNew:     '(create new tag)',
      emptyList:     'There are no items in this list',
      emptyFilter:   'The filter returned no results',
      tagsLabel:     'selected items',
      selectedItems: 'selected items',
      noneSelected:  'no selected items',
      removeLabel:   'remove selected item'
    }
  };

  constructor(...args) {
    super(...args);

    this.inputId = instanceId(this, '_input')
    this.tagsId = instanceId(this, '_taglist')
    this.notifyId = instanceId(this, '_notify_area')
    this.listId = instanceId(this, '_listbox')
    this.createId = instanceId(this, '_createlist_option')
    this.activeTagId = instanceId(this, '_taglist_active_tag')
    this.activeOptionId = instanceId(this, '_listbox_active_option')

    this.list = listDataManager(this)
    this.tagList = listDataManager(this, { getStateGetterFromProps: null })

    this.accessors = accessorManager(this)
    this.handleScroll = scrollManager(this)
    this.focusManager = focusManager(this, {
      willHandle: this.handleFocusWillChange,
      didHandle: this.handleFocusDidChange,
    })

    this.state = {
      focusedTag: null,
      ...this.getStateFromProps(this.props),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps))
  }

  getStateFromProps(props) {
    let { accessors, list, tagList } = this
    let {
      data, searchTerm, minLength, caseSensitive, filter
    } = props

    let values = splat(props.value);
    let dataItems = values.map(item => accessors.findOrSelf(data, item));

    data = data.filter(i =>
      !values.some(v => accessors.matches(i, v))
    );

    this._lengthWithoutValues = data.length;

    data = Filter.filter(data, {
      filter,
      searchTerm,
      minLength,
      caseSensitive,
      textField: accessors.text,
    })

    list.setData(data);
    tagList.setData(dataItems);

    let { focusedItem, focusedTag } = this.state || {};

    return {
      data,
      dataItems,
      focusedTag: list.nextEnabled(
        ~dataItems.indexOf(focusedTag) ? focusedTag : null),
      focusedItem: list.nextEnabled(
        ~data.indexOf(focusedItem) ? focusedItem : data[0]),
    }
  }

  handleFocusWillChange = (focused) => {
    if (focused) this.focus()
  }

  handleFocusDidChange = (focused) => {
    if (focused) return

    this.close()

    if (this.refs.tagList)
      this.setState({ focusedTag: null })
  }

  handleDelete = (dataItem, event) => {
    let { disabled, readOnly} = this.props;

    if (disabled == true || readOnly)
      return;

    this.focus()
    this.change(dataItem, event, REMOVE)
  };

  handleSearchKeyDown = (e) => {
    if (e.key === 'Backspace' && e.target.value && !this._deletingText)
      this._deletingText = true
  };

  handleSearchKeyUp = (e) => {
    if (e.key === 'Backspace' && this._deletingText)
      this._deletingText = false
  };

  handleInputChange = (e) => {
    notify(this.props.onSearch, [ e.target.value ])
    this.open()
  };

  @widgetEditable
  handleClick = () => {
    this.open()
  };

  @widgetEditable
  handleSelect = (dataItem, originalEvent) => {
    if (dataItem === undefined) {
      if (this.props.onCreate)
        this.handleCreate(this.props.searchTerm)

      return
    }

    notify(this.props.onSelect, [dataItem, { originalEvent  }])

    this.change(dataItem, originalEvent, INSERT)
    this.close()
    this.focus()
  };

  @widgetEditable
  handleCreate = (tag) => {
    if (tag.trim() === '' )
      return

    notify(this.props.onCreate, tag)
    this.props.searchTerm
      && notify(this.props.onSearch, [ '' ])

    this.close()
    this.focus()
  };

  @widgetEditable
  handleKeyDown = (event) => {
    let { key, keyCode, altKey, ctrlKey } = event
    let noSearch = !this.props.searchTerm && !this._deletingText
    let isOpen  = this.props.open;

    let { focusedTag, focusedItem } = this.state;
    let { list, tagList } = this;
    let nullTag = { focusedTag: null };

    notify(this.props.onKeyDown, [event])

    if (event.defaultPrevented)
      return

    if (key === 'ArrowDown') {
      let next = list.next(focusedItem)
      let creating = (
          (this.shouldShowCreate() && focusedItem === next) ||
          focusedItem === null
      );

      next = creating ? null : next

      event.preventDefault()
      if (isOpen) this.setState({ focusedItem: next, ...nullTag })
      else        this.open()
    }
    else if (key === 'ArrowUp') {
      let prev = focusedItem === null
        ? list.last()
        : list.prev(focusedItem)

      event.preventDefault()

      if (altKey)      this.close()
      else if (isOpen) this.setState({ focusedItem: prev, ...nullTag })
    }
    else if (key === 'End') {
      event.preventDefault()
      if (isOpen) this.setState({ focusedItem: list.last(), ...nullTag })
      else        this.setState({ focusedTag: tagList.last() })
    }
    else if (key === 'Home') {
      event.preventDefault()
      if (isOpen) this.setState({ focusedItem: list.first(), ...nullTag })
      else        this.setState({ focusedTag: tagList.first() })
    }
    else if (isOpen  && keyCode === 13) { // using keyCode to ignore enter for japanese IME
      event.preventDefault();

      (ctrlKey && this.props.onCreate) || focusedItem === null
        ? this.handleCreate(this.props.searchTerm, event)
        : this.handleSelect(this.state.focusedItem, event)
    }
    else if (key === 'Escape') {
      isOpen ? this.close() : tagList && this.setState(nullTag)
    }
    else if (noSearch && key === 'ArrowLeft') {
      this.setState({ focusedTag: tagList.prev(focusedTag) || tagList.last() })
    }
    else if (noSearch && key === 'ArrowRight') {
      let nextTag = focusedTag && tagList.next(focusedTag)
      if (nextTag === focusedTag) nextTag = null

      this.setState({ focusedTag: nextTag })
    }
    else if (noSearch && key === 'Delete' && !tagList.isDisabled(focusedTag)) {
      this.handleDelete(focusedTag, event)
    }
    else if (noSearch && key === 'Backspace') {
      this.handleDelete(tagList.last(), event)
    }
    else if (noSearch && key === ' ' && !isOpen) {
      event.preventDefault()
      this.open()
    }
  };

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
  }

  renderInput(ownedIds) {
    let {
        searchTerm
      , maxLength
      , tabIndex
      , busy
      , autoFocus
      , open } = this.props;

    let { focusedItem, focusedTag } = this.state;

    let disabled = this.props.disabled === true
    let readOnly = this.props.readOnly === true

    let active = open
      ? (focusedItem || this.isCreateTagFocused())
        && this.activeOptionId
      : focusedTag && this.activeTagId;

    return (
      <MultiselectInput
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
  }

  renderList(messages) {
    let { inputId, activeOptionId, listId, accessors } = this;
    let { open } = this.props;
    let { focusedItem } = this.state;

    let List = this.props.listComponent
    let props = this.list.defaultProps();

    return (
      <List
        {...props}
        ref="list"
        id={listId}
        activeId={activeOptionId}
        valueAccessor={accessors.value}
        textAccessor={accessors.text}
        focusedItem={focusedItem}
        onSelect={this.handleSelect}
        onMove={this.handleScroll}
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
  }

  renderNotificationArea(messages) {
    let { focused, dataItems } = this.state;

    let itemText = dataItems.map(
      item => this.accessors.text(item)).join(', ')

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
  }

  renderTags(messages) {
    let { disabled, readOnly } = this.props;
    let { focusedTag, dataItems } = this.state;

    let Component = this.props.tagComponent;

    return (
      <TagList
        ref='tagList'
        id={this.tagsId}
        activeId={this.activeTagId}
        textAccessor={this.accessors.text}
        valueAccessor={this.accessors.value}
        label={messages.tagsLabel}
        value={dataItems}
        disabled={disabled}
        readOnly={readOnly}
        focusedItem={focusedTag}
        onDelete={this.handleDelete}
        valueComponent={Component}
      />
    )
  }

  render() {
    let {
        className
      , messages
      , busy
      , dropUp
      , open
      , duration } = this.props;

    let { focused, dataItems } = this.state;

    let elementProps = Props.pickElementProps(this);

    let shouldRenderTags = !!dataItems.length
      , shouldRenderPopup = isFirstFocusedRender(this) || open
      , shouldShowCreate = this.shouldShowCreate();

    let inputOwns = `${this.listId} ${this.notifyId} `
      + (shouldRenderTags ? this.tagsId : '')
      + (shouldShowCreate ? this.createId : '');

    let disabled = this.props.disabled === true
    let readOnly = this.props.readOnly === true

    messages = msgs(messages);

    return (
      <Widget
        {...elementProps}
        onKeyDown={this.handleKeyDown}
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
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
              {this.renderList(messages)}

              {shouldShowCreate &&
                this.renderCreateItem(messages)
              }
            </div>
          </Popup>
        }
      </Widget>
    )
  }

  change(dataItem, originalEvent, action) {
    let { onChange, onSearch, searchTerm, value: lastValue } = this.props;
    let { dataItems } = this.state;

    switch (action) {
      case INSERT:
        dataItems = dataItems.concat(dataItem);
        break;
      case REMOVE:
        dataItems = dataItems.filter(d => d !== dataItem)
        break;
    }

    notify(onChange, [dataItems, {
      action,
      dataItem,
      originalEvent,
      lastValue,
      searchTerm,
    }]);

    notify(onSearch, [''])
  }

  focus() {
    this.refs.input &&
      this.refs.input.focus()
  }

  open() {
    if (!this.props.open)
      notify(this.props.onToggle, true)
  }

  close() {
    notify(this.props.onToggle, false)
  }

  isCreateTagFocused() {
    let { data, focusedItem } = this.state;

    if (!this.shouldShowCreate())
      return false;

    return !data.length || focusedItem === null;
  }

  shouldShowCreate() {
    let { textField, searchTerm, onCreate, caseSensitive } = this.props;
    let { data, dataItems } = this.state;

    if (!onCreate || !searchTerm)
      return false

    let lower = text => caseSensitive ? text : text.toLowerCase();
    let eq =  v => lower(
      this.accessors.text(v, textField)) === lower(searchTerm);

    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
    return !data.some(eq) && !dataItems.some(eq)
  }

  getPlaceholder() {
    let { value, placeholder } = this.props;
    return (value && value.length ? '' : placeholder) || ''
  }
}


export default uncontrollable(Multiselect, {
  open: 'onToggle',
  value: 'onChange',
  searchTerm: 'onSearch'
}, ['focus']);


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
