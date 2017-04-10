import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import _  from './util/_';
import filter from './util/filter';

import Widget from './Widget';
import Popup from './Popup';
import Select  from './Select';
import ComboboxInput from './ComboboxInput';

import compat from './util/compat';
import CustomPropTypes from './util/propTypes';
import PlainList from './List';
import GroupableList from './ListGroupable';

import validateList from './util/validateListInterface';
import createUncontrolledWidget from 'uncontrollable';
import { dataItem, dataText, dataIndexOf } from './util/dataHelpers';
import { widgetEditable, isDisabled, isReadOnly } from './util/interaction';
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers';

let defaultSuggest = f => f === true ? 'startsWith' : f ? f : 'eq'

let propTypes = {
  ...Popup.propTypes,

  //-- controlled props -----------
  value:          PropTypes.any,
  onChange:       PropTypes.func,
  open:           PropTypes.bool,
  onToggle:       PropTypes.func,
  //------------------------------------

  itemComponent:  CustomPropTypes.elementType,
  listComponent:  CustomPropTypes.elementType,

  groupComponent: CustomPropTypes.elementType,
  groupBy:        CustomPropTypes.accessor,

  data:           PropTypes.array,
  valueField:     PropTypes.string,
  textField:      CustomPropTypes.accessor,
  name:           PropTypes.string,

  onSelect:       PropTypes.func,

  autoFocus:      PropTypes.bool,
  disabled:       CustomPropTypes.disabled.acceptsArray,
  readOnly:       CustomPropTypes.readOnly.acceptsArray,

  suggest:        CustomPropTypes.filter,
  filter:         CustomPropTypes.filter,

  busy:           PropTypes.bool,

  dropUp:         PropTypes.bool,
  duration:       PropTypes.number,
  delay:          PropTypes.number,

  placeholder:    PropTypes.string,

  messages:       PropTypes.shape({
    open:         CustomPropTypes.message,
    emptyList:    CustomPropTypes.message,
    emptyFilter:  CustomPropTypes.message
  })
};

var ComboBox = React.createClass({

  displayName: 'ComboBox',

  mixins: [
    require('./mixins/TimeoutMixin'),
    require('./mixins/DataFilterMixin'),
    require('./mixins/PopupScrollToMixin'),
    require('./mixins/RtlParentContextMixin'),
    require('./mixins/AriaDescendantMixin')('input'),
    require('./mixins/FocusMixin')({
      willHandle(focused) {
        // not suggesting anymore
        !focused && this.refs.input.accept()
      },
      didHandle(focused) {
        if (!focused) this.close()
      }
    })
  ],

  propTypes: propTypes,

  getInitialState(){
    var { value, data, valueField } = this.props
      , items = this.process(data, value)
      , idx   = dataIndexOf(items, value, valueField);

    return {
      selectedItem:  items[idx],
      focusedItem:   items[!~idx ? 0 : idx],
      processedData: items,
      open:          false
    }
  },

  getDefaultProps(){
    return {
      data: [],
      value: '',
      open: false,
      suggest: false,
      filter: false,
      delay: 500,

      messages: msgs(),
      ariaActiveDescendantKey: 'combobox'
    }
  },

  componentDidUpdate() {
    this.refs.list && validateList(this.refs.list)
  },

  shouldComponentUpdate(nextProps, nextState){
    var isSuggesting = this.refs.input && this.refs.input.isSuggesting()
      , stateChanged = !_.isShallowEqual(nextState, this.state)
      , valueChanged = !_.isShallowEqual(nextProps, this.props)

    return isSuggesting || stateChanged || valueChanged
  },

  componentWillReceiveProps(nextProps) {
    let { value, data, valueField, textField } = nextProps

    var rawIdx = dataIndexOf(data, value, valueField)
      , valueItem = rawIdx === -1 ? nextProps.value : nextProps.data[rawIdx]
      , isSuggesting = this.refs.input && this.refs.input.isSuggesting()

    let items = this.process(
        nextProps.data
      , nextProps.value
      , (rawIdx === -1 || isSuggesting) && dataText(valueItem, textField)
    )

    let idx = dataIndexOf(items, value, valueField)
      , focused = this.filterIndexOf(items, dataText(valueItem, textField));

    this._searchTerm = '';

    this.setState({
      processedData:  items,
      selectedItem:   items[idx],
      focusedItem:    items[idx === -1
        ? focused !== -1 ? focused : 0 // focus the closest match
        : idx]
    })
  },

  renderInput(listID) {
    let {
        suggest
      , filter
      , textField
      , busy
      , name
      , data
      , value
      , valueField
      , autoFocus
      , tabIndex
      , disabled
      , readOnly
      , placeholder
      , open } = this.props;

    let valueItem = dataItem(data, value, valueField) // take value from the raw data

    let completeType = suggest
        ? filter ? 'both' : 'inline'
        : filter ? 'list' : '';

    return (
      <ComboboxInput
        ref='input'
        id={instanceId(this, '_input')}
        autoFocus={autoFocus}
        tabIndex={tabIndex}
        suggest={suggest}
        name={name}
        role='combobox'
        disabled={disabled}
        readOnly={readOnly}
        aria-owns={listID}
        aria-busy={!!busy}
        aria-autocomplete={completeType}
        aria-expanded={open}
        aria-haspopup={true}
        placeholder={placeholder}
        value={dataText(valueItem, textField)}
        onChange={this.handleInputChange}
        onKeyDown={this.handleInputKeyDown}
      />
    )
  },

  renderList(List, id, messages) {
    let { open, data } = this.props;
    let { selectedItem, focusedItem } = this.state;

    let listProps = _.pickProps(this.props, List);
    let items = this._data();

    return (
      <List ref="list"
        {...listProps}
        id={id}
        data={items}
        selected={selectedItem}
        focused ={focusedItem}
        aria-hidden={!open}
        aria-labelledby={instanceId(this)}
        aria-live={open && 'polite'}
        onSelect={this.handleSelect}
        onMove={this._scrollTo}
        messages={{
          emptyList: data.length
            ? messages.emptyFilter
            : messages.emptyList
        }}
      />
    )
  },

  render(){
    let {
        className
      , duration
      , groupBy
      , messages
      , busy
      , dropUp
      , open
      , listComponent: List } = this.props;

    let { focused } = this.state;

    let disabled = isDisabled(this.props)
      , readOnly = isReadOnly(this.props)
      , listID = instanceId(this, '_listbox');

    List = List || (groupBy && GroupableList) || PlainList

    let elementProps = _.omitOwnProps(this, List);
    let shouldRenderPopup = open || isFirstFocusedRender(this);

    messages = msgs(messages)

    return (
      <Widget
        {...elementProps}
        open={open}
        dropUp={dropUp}
        focused={focused}
        disabled={disabled}
        readOnly={readOnly}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        className={cn(className, 'rw-combobox')}
      >
        <Select
          onClick={this.toggle}
          disabled={!!(disabled || readOnly)}
          busy={busy}
          icon='caret-down'
          label={_.result(messages.open, this.props)}
        />
        {this.renderInput(listID)}

        {shouldRenderPopup &&
          <Popup
            open={open}
            dropUp={dropUp}
            duration={duration}
            onOpening={() => this.refs.list.forceUpdate()}
          >
            <div>
              {this.renderList(List, listID, messages)}
            </div>
          </Popup>
        }
      </Widget>
    )
  },

  @widgetEditable
  handleSelect(data){
    this.close()
    notify(this.props.onSelect, data)
    this.change(data)
    this.focus();
  },

  handleInputKeyDown(e){
    this._deleting = e.key === 'Backspace' || e.key === 'Delete'
    this._isTyping = true
  },

  handleInputChange(e){
    let { data, textField } = this.props

    var shouldSuggest = !!this.props.suggest
      , strVal  = e.target.value
      , suggestion;

    suggestion = this._deleting || !shouldSuggest
      ? strVal : this.suggest(this._data(), strVal)

    suggestion = suggestion || strVal

    data = _.find(data,
      item => dataText(item, textField).toLowerCase() === suggestion.toLowerCase())

    this.change(!this._deleting && data
      ? data
      : strVal, true)

    this.open()
  },

  focus() {
    this.refs.input &&
      this.refs.input.focus()
  },

  @widgetEditable
  handleKeyDown(e){
    var self = this
      , key  = e.key
      , alt  = e.altKey
      , list = this.refs.list
      , focusedItem = this.state.focusedItem
      , selectedItem = this.state.selectedItem
      , isOpen = this.props.open;

    notify(this.props.onKeyDown, [e])
    if (e.defaultPrevented)
      return

    if (key === 'End')
      if ( isOpen ) this.setState({ focusedItem: list.last() })
      else          select(list.last(), true)

    else if (key === 'Home')
      if (isOpen) this.setState({ focusedItem: list.first() })
      else          select(list.first(), true)

    else if (key === 'Escape' && isOpen)
      this.close()

    else if (key === 'Enter' && isOpen) {
      e.preventDefault();
      select(this.state.focusedItem, true)
    }
    else if (key === 'ArrowDown') {
      if ( alt )
        this.open()
      else {
        if ( isOpen ) this.setState({ focusedItem: list.next(focusedItem) })
        else          select(list.next(selectedItem), true)
      }
    }
    else if ( key === 'ArrowUp' ) {
      if ( alt )
        this.close()
      else {
        if ( isOpen ) this.setState({ focusedItem: list.prev(focusedItem) })
        else          select(list.prev(selectedItem), true)
      }
    }

    function select(item, fromList) {
      if(!item)
        return self.change(compat.findDOMNode(self.refs.input).value, false)

      self.refs.input.accept(true); //removes caret

      if(fromList)
        return self.handleSelect(item)

      self.change(item, false)
    }
  },

  change(data, typing){
    this._typedChange = !!typing
    notify(this.props.onChange, data)
  },

  open(){
    if ( !this.props.open )
      notify(this.props.onToggle, true)
  },

  close(){
    if ( this.props.open )
      notify(this.props.onToggle, false)
  },

  @widgetEditable
  toggle(){
    this.focus()

    this.props.open
      ? this.close()
      : this.open()
  },

  suggest(data, value) {
    let { textField, suggest, minLength } = this.props

    var word = dataText(value, textField)
      , suggestion;

    suggest = defaultSuggest(suggest)

    if (!(word || '').trim() || word.length < (minLength || 1))
      return ''

    suggestion = typeof value === 'string'
        ? _.find(data, getFilter(suggest, word, textField))
        : value

    if ( suggestion && (!this.state || !this.state.deleting))
      return dataText(suggestion, textField)

    return ''
  },

  _data() {
    return this.state.processedData
  },

  process(data, values, searchTerm) {
    if (this.props.filter && searchTerm)
      data = this.filter(data, searchTerm)

    return data
  }
})



export default createUncontrolledWidget(
      ComboBox, { open: 'onToggle', value: 'onChange' }, ['focus']);



function msgs(msgs){
  return {
    open: 'open combobox',
    emptyList:   'There are no items in this list',
    emptyFilter: 'The filter returned no results',
    ...msgs
  }
}

function getFilter(suggest, word, textField){
  return typeof suggest === 'string'
      ? item => filter[suggest](dataText(item, textField).toLowerCase(), word.toLowerCase())
      : item => suggest(item, word)
}
