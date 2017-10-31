// @flow

import cn from 'classnames';
import closest from 'dom-helpers/query/closest';
import PropTypes from 'prop-types';
import React from 'react';
import uncontrollable from 'uncontrollable';

import Widget from './Widget';
import WidgetPicker from './WidgetPicker';
import Select from './Select';
import Popup from './Popup';
import MultiselectInput from './MultiselectInput';
import TagList from './MultiselectTagList';
import List from './List';
import AddToListOption from './AddToListOption';

import { makeArray }  from './util/_';
import * as Filter from './util/Filter';
import * as Props from './util/Props';
import { getMessages } from './messages';
import * as CustomPropTypes from './util/PropTypes';
import accessorManager from './util/accessorManager';
import focusManager from './util/focusManager';
import listDataManager from './util/listDataManager';
import scrollManager from './util/scrollManager';
import withRightToLeft from './util/withRightToLeft';
import { widgetEditable, disabledManager } from './util/interaction';
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers';

const CREATE_OPTION = {};
const ENTER = 13;

const INSERT = 'insert';
const REMOVE = 'remove';

let propTypes = {
  ...Filter.propTypes,

  data: PropTypes.array,
  //-- controlled props --
  value: PropTypes.array,

  /**
   * @type {function (
   *  dataItems: ?any[],
   *  metadata: {
   *    dataItem: any,
   *    action: 'insert' | 'remove',
   *    originalEvent: SyntheticEvent,
   *    lastValue: ?any[],
   *    searchTerm: ?string
   *  }
   * ): void}
   */
  onChange: PropTypes.func,

  searchTerm: PropTypes.string,
  /**
   * @type {function (
   *  searchTerm: ?string,
   *  metadata: {
   *    action: 'clear' | 'input',
   *    lastSearchTerm: ?string,
   *    originalEvent: SyntheticEvent,
   *  }
   * ): void}
   */
  onSearch: PropTypes.func,

  open: PropTypes.bool,
  onToggle: PropTypes.func,
  //-------------------------------------------

  valueField: CustomPropTypes.accessor,
  textField: CustomPropTypes.accessor,

  tagComponent: CustomPropTypes.elementType,
  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,

  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,

  allowCreate: PropTypes.oneOf([true, false, 'onFilter']),

  /**
   *
   * @type { (dataItem: ?any, metadata: { originalEvent: SyntheticEvent }) => void }
   */
  onSelect: PropTypes.func,

  /**
   * @type { (searchTerm: string) => void }
   */
  onCreate: PropTypes.func,

  busy: PropTypes.bool,
  dropUp: PropTypes.bool,
  popupTransition: CustomPropTypes.elementType,

  inputProps: PropTypes.object,
  listProps: PropTypes.object,

  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: CustomPropTypes.disabled.acceptsArray,
  readOnly: CustomPropTypes.disabled,

  messages: PropTypes.shape({
    open: CustomPropTypes.message,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
    createOption: CustomPropTypes.message,

    tagsLabel: CustomPropTypes.message,
    selectedItems: CustomPropTypes.message,
    noneSelected: CustomPropTypes.message,
    removeLabel: CustomPropTypes.message,
  })
};

/**
 * ---
 * shortcuts:
 *   - { key: left arrow, label: move focus to previous tag }
 *   - { key: right arrow, label: move focus to next tag }
 *   - { key: delete, deselect focused tag }
 *   - { key: backspace, deselect next tag }
 *   - { key: alt + up arrow, label: close Multiselect }
 *   - { key: down arrow, label: open Multiselect, and move focus to next item }
 *   - { key: up arrow, label: move focus to previous item }
 *   - { key: home, label: move focus to first item }
 *   - { key: end, label: move focus to last item }
 *   - { key: enter, label: select focused item }
 *   - { key: ctrl + enter, label: create new tag from current searchTerm }
 *   - { key: any key, label: search list for item starting with key }
 * ---
 *
 * A select listbox alternative.
 *
 * @public
 */
@withRightToLeft
class Multiselect extends React.Component {

  static propTypes = propTypes;

  static defaultProps = {
    data: [],
    allowCreate: 'onFilter',
    filter: 'startsWith',
    value: [],
    searchTerm: '',
    listComponent: List,
  };

  constructor(...args) {
    super(...args);

    this.messages = getMessages(this.props.messages);

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
      didHandle: this.handleFocusDidChange,
    })

    this.isDisabled = disabledManager(this)

    this.state = {
      focusedTag: null,
      ...this.getStateFromProps(this.props),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.messages = getMessages(nextProps.messages);
    this.setState(this.getStateFromProps(nextProps))
  }

  getStateFromProps(props) {
    let { accessors, list, tagList } = this
    let {
      data, searchTerm, minLength, caseSensitive, filter
    } = props

    let values = makeArray(props.value);
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

  handleFocusDidChange = (focused) => {
    if (focused) return this.focus();

    this.close()
    this.clearSearch();

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
    this.search(e.target.value, e, 'input')
    this.open()
  };

  @widgetEditable
  handleClick = ({ target }) => {
    this.focus()

    if (closest(target, '.rw-select')) this.toggle()
    else this.open()
  };

  @widgetEditable
  handleDoubleClick = () => {
    if (!this.refs.input) return

    this.focus()
    this.refs.input.select();
  };

  @widgetEditable
  handleSelect = (dataItem, originalEvent) => {
    if (dataItem === undefined || dataItem === CREATE_OPTION) {
      this.handleCreate(this.props.searchTerm, originalEvent)
      return
    }

    notify(this.props.onSelect, [dataItem, { originalEvent  }])

    this.change(dataItem, originalEvent, INSERT)
    this.focus()
  };

  @widgetEditable
  handleCreate = (searchTerm = '', event) => {
    notify(this.props.onCreate, searchTerm)

    this.clearSearch(event)
    this.focus()
  };

  @widgetEditable
  handleKeyDown = (event) => {
    const { open, searchTerm, onKeyDown } = this.props;
    let { key, keyCode, altKey, ctrlKey } = event

    let { focusedTag, focusedItem } = this.state;
    let { list, tagList } = this;

    let createIsFocused = focusedItem === CREATE_OPTION;
    let canCreate = this.allowCreate()

    const focusTag = tag => this.setState({ focusedTag: tag })
    const focusItem = item => this.setState({ focusedItem: item, focusedTag: null })

    notify(onKeyDown, [event])

    if (event.defaultPrevented) return

    if (key === 'ArrowDown') {
      event.preventDefault()

      if (!open) return this.open();

      let next = list.next(focusedItem)
      let creating = createIsFocused || (canCreate && focusedItem === next);

      focusItem(creating ? CREATE_OPTION : next)
    }
    else if (key === 'ArrowUp' && (open || altKey)) {
      event.preventDefault()

      if (altKey) return this.close()
      focusItem(createIsFocused ? list.last() : list.prev(focusedItem))
    }
    else if (key === 'End') {
      event.preventDefault()

      if (open) focusItem(list.last())
      else      focusTag(tagList.last())
    }
    else if (key === 'Home') {
      event.preventDefault()
      if (open) focusItem(list.first())
      else      focusTag(tagList.first())
    }
    // using keyCode to ignore enter for japanese IME
    else if (open && keyCode === ENTER) {
      event.preventDefault();

      if (ctrlKey && canCreate)
        return this.handleCreate(searchTerm, event)

      this.handleSelect(focusedItem, event)
    }
    else if (key === 'Escape') {
      open ? this.close() : tagList && focusTag(null)
    }
    else if (!searchTerm && !this._deletingText) {
      if (key === 'ArrowLeft') {
        focusTag(tagList.prev(focusedTag) || tagList.last())
      }
      else if (key === 'ArrowRight' && focusedTag) {
        let nextTag = tagList.next(focusedTag)
        focusTag(nextTag === focusedTag ? null : nextTag)
      }
      else if (key === 'Delete' && !tagList.isDisabled(focusedTag)) {
        this.handleDelete(focusedTag, event)
      }
      else if (key === 'Backspace') {
        this.handleDelete(tagList.last(), event)
      }
      else if (key === ' ' && !open) {
        event.preventDefault()
        this.open()
      }
    }
  };

  renderInput(ownedIds) {
    let {
        searchTerm
      , maxLength
      , tabIndex
      , busy
      , autoFocus
      , inputProps
      , open } = this.props;

    let { focusedItem, focusedTag } = this.state;

    let disabled = this.props.disabled === true
    let readOnly = this.props.readOnly === true

    let active;

    if (!open)
      active = focusedTag ? this.activeTagId : '';
    else if (focusedItem || this.allowCreate())
      active = this.activeOptionId

    return (
      <MultiselectInput
        ref='input'
        {...inputProps}
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

    let itemLabels = dataItems.map(item => this.accessors.text(item))

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
            ? messages.selectedItems(itemLabels)
            : messages.noneSelected()
        )}
      </span>
    )
  }

  renderTags(messages) {
    let { readOnly } = this.props;
    let { focusedTag, dataItems } = this.state;

    let Component = this.props.tagComponent;

    return (
      <TagList
        ref='tagList'
        id={this.tagsId}
        activeId={this.activeTagId}
        textAccessor={this.accessors.text}
        valueAccessor={this.accessors.value}
        label={messages.tagsLabel()}
        value={dataItems}
        readOnly={readOnly}
        disabled={this.isDisabled()}
        focusedItem={focusedTag}
        onDelete={this.handleDelete}
        valueComponent={Component}
      />
    )
  }

  render() {
    let {
        className
      , busy
      , dropUp
      , open
      , searchTerm
      , popupTransition } = this.props;

    let { focused, focusedItem, dataItems } = this.state;

    let elementProps = Props.pickElementProps(this);

    let shouldRenderTags = !!dataItems.length
      , shouldRenderPopup = isFirstFocusedRender(this) || open
      , allowCreate = this.allowCreate();

    let inputOwns = `${this.listId} ${this.notifyId} `
      + (shouldRenderTags ? this.tagsId : '')
      + (allowCreate ? this.createId : '');

    let disabled = this.isDisabled() === true
    let readOnly = this.props.readOnly === true

    let messages = this.messages;

    return (
      <Widget
        {...elementProps}
        open={open}
        dropUp={dropUp}
        focused={focused}
        disabled={disabled}
        readOnly={readOnly}
        onKeyDown={this.handleKeyDown}
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        className={cn(className, 'rw-multiselect')}
      >
        {this.renderNotificationArea(messages)}
        <WidgetPicker
          className="rw-widget-input"
          onClick={this.handleClick}
          onDoubleClick={this.handleDoubleClick}
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
            transition={popupTransition}
            onEntering={()=> this.refs.list.forceUpdate()}
          >
            <div>
              {this.renderList(messages)}

              {allowCreate && (
                <AddToListOption
                  id={this.createId}
                  searchTerm={searchTerm}
                  onSelect={this.handleCreate}
                  focused={!focusedItem || focusedItem === CREATE_OPTION}
                >
                  {messages.createOption(this.props)}
                </AddToListOption>
              )}
            </div>
          </Popup>
        }
      </Widget>
    )
  }

  change(dataItem, originalEvent, action) {
    let { onChange, searchTerm, value: lastValue } = this.props;
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

    this.clearSearch(originalEvent)
  }

  clearSearch(originalEvent) {
    this.search('', originalEvent, 'clear')
  }

  search(searchTerm, originalEvent, action: 'clear' | 'input' = 'input') {
    let { onSearch, searchTerm: lastSearchTerm } = this.props;

    if (searchTerm !== lastSearchTerm)
      notify(onSearch, [searchTerm, {
        action,
        lastSearchTerm,
        originalEvent,
      }])
  }

  focus() {
    if (this.refs.input)
      this.refs.input.focus()
  }

  toggle() {
    this.props.open ? this.close() : this.open()
  }

  open() {
    if (!this.props.open)
      notify(this.props.onToggle, true)
  }

  close() {
    if (this.props.open)
      notify(this.props.onToggle, false)
  }


  allowCreate() {
    let { searchTerm, onCreate, allowCreate } = this.props;

    return !!(
      onCreate &&
      (allowCreate === true ||
      (allowCreate === 'onFilter' && searchTerm)) &&
      !this.hasExtactMatch()
    )
  }

  hasExtactMatch() {
    let { searchTerm, caseSensitive } = this.props;
    let { data, dataItems } = this.state;
    let { text } = this.accessors;

    let lower = text => caseSensitive ? text : text.toLowerCase();
    let eq = v => lower(text(v)) === lower(searchTerm);

    // if there is an exact match on textFields:
    // "john" => { name: "john" }, don't show
    return dataItems.some(eq) || data.some(eq)
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
