import React from 'react';
import cn from 'classnames';

import createUncontrolledWidget from 'uncontrollable';
import _  from './util/_';
import * as Filter from './util/Filter';

import Widget from './Widget';
import WidgetPicker from './WidgetPicker';
import Popup from './Popup';
import Select  from './Select';
import ComboboxInput from './ComboboxInput';
import compat from './util/compat';
import CustomPropTypes from './util/propTypes';
import PlainList from './List';
import GroupableList from './ListGroupable';
import validateList from './util/validateListInterface';
import createScrollManager from './util/scrollManager';
import createFocusManager from './util/focusManager';
import withRightToLeft from './util/withRightToLeft';
import { dataItem, dataText, dataIndexOf } from './util/dataHelpers';
import { widgetEditable, isDisabled, isReadOnly } from './util/interaction';
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers';

let propTypes = {
  ...Filter.propTypes,

  //-- controlled props -----------
  value:          React.PropTypes.any,
  onChange:       React.PropTypes.func,
  open:           React.PropTypes.bool,
  onToggle:       React.PropTypes.func,
  //------------------------------------

  itemComponent:  CustomPropTypes.elementType,
  listComponent:  CustomPropTypes.elementType,

  groupComponent: CustomPropTypes.elementType,
  groupBy:        CustomPropTypes.accessor,

  data:           React.PropTypes.array,
  valueField:     React.PropTypes.string,
  textField:      CustomPropTypes.accessor,
  name:           React.PropTypes.string,

  onSelect:       React.PropTypes.func,

  autoFocus:      React.PropTypes.bool,
  disabled:       CustomPropTypes.disabled.acceptsArray,
  readOnly:       CustomPropTypes.readOnly,

  suggest:        Filter.propTypes.filter,

  busy:           React.PropTypes.bool,

  delay:          React.PropTypes.number,
  dropUp:         React.PropTypes.bool,
  duration:       React.PropTypes.number,

  placeholder:    React.PropTypes.string,

  messages:       React.PropTypes.shape({
    open:         CustomPropTypes.message,
    emptyList:    CustomPropTypes.message,
    emptyFilter:  CustomPropTypes.message
  })
};

@withRightToLeft
class ComboBox extends React.Component {

  static propTypes = propTypes;

  static defaultProps = {
    data: [],
    value: '',
    open: false,
    suggest: false,
    filter: false,
    delay: 500,

    messages: msgs(),
  };

  constructor(props, context) {
    super(props, context);

    this.inputId = instanceId(this, '_input')
    this.listId = instanceId(this, '_listbox')
    this.activeId = instanceId(this, '_listbox_active_option')

    this.handleScroll = createScrollManager(this)
    this.focusManager = createFocusManager(this, {
      willHandle: this.handleFocusWillChange,
      didHandle: this.handleFocusChanged,
    })

    this.state = {
      ...this.getStateFromProps(props),
      open: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    let isSuggesting = this.refs.input && this.refs.input.isSuggesting()
      , stateChanged = !_.isShallowEqual(nextState, this.state)
      , valueChanged = !_.isShallowEqual(nextProps, this.props)

    return isSuggesting || stateChanged || valueChanged
  }

  componentDidUpdate() {
    this.refs.list && validateList(this.refs.list)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps))
  }

  getStateFromProps(props) {
    let { value, data, filter, valueField, textField } = props;

    let index = dataIndexOf(data, value, valueField);
    let dataItem = index === -1 ? value : data[index]
    let itemText = dataText(dataItem, textField);

    let searchTerm
    // filter only when the value is not an item in the data list
    if (index === -1 || (this.refs.input && this.refs.input.isSuggesting())) {
      searchTerm = itemText
    }

    data = Filter.filter(data, { searchTerm, ...props })

    let focusedIndex = index
    // index may have changed after filtering
    if (index !== -1) {
      index = dataIndexOf(data, value, valueField)
      focusedIndex = index;
    }
    else {
      // value isn't a dataItem so find the close match
      focusedIndex = Filter.indexOf(data, {
        searchTerm,
        textField,
        filter: filter || true
      })
    }

    return {
      data: data,
      selectedItem: data[index],
      focusedItem: focusedIndex === -1 ? data[0] : data[focusedIndex]
    }
  }

  handleFocusWillChange = (focused) => {
    if (!focused && this.refs.input)
      this.refs.input.accept()
  };

  handleFocusChanged = (focused) => {
    if (!focused) this.close()
  };

  @widgetEditable
  handleSelect = (data) => {
    this.close()
    notify(this.props.onSelect, data)
    this.change(data)
    this.focus();
  };

  handleInputKeyDown = (e) => {
    this._deleting = e.key === 'Backspace' || e.key === 'Delete'
    this._isTyping = true
  };

  handleInputChange = (e) => {
    let suggestion = this.suggest(e.target.value);

    this.change(suggestion, true)
    this.open()
  };

  @widgetEditable
  handleKeyDown = (e) => {
    let self = this
      , key  = e.key
      , alt  = e.altKey
      , list = this.refs.list
      , focusedItem = this.state.focusedItem
      , selectedItem = this.state.selectedItem
      , isOpen = this.props.open;

    notify(this.props.onKeyDown, [e])

    if (e.defaultPrevented)
      return

    if (key === 'End') {
      e.preventDefault()
      if (isOpen) this.setState({ focusedItem: list.last() })
      else          select(list.last(), true)
    }
    else if (key === 'Home') {
      e.preventDefault()
      if (isOpen) this.setState({ focusedItem: list.first() })
      else        select(list.first(), true)
    }
    else if (key === 'Escape' && isOpen)
      this.close()

    else if (key === 'Enter' && isOpen) {
      e.preventDefault();
      select(this.state.focusedItem, true)
    }
    else if (key === 'Tab') {
      this.refs.input.accept();
    }
    else if (key === 'ArrowDown') {
      e.preventDefault()
      if (alt)
        this.open()
      else {
        if (isOpen) this.setState({ focusedItem: list.next(focusedItem) })
        else        select(list.next(selectedItem), true)
      }
    }
    else if ( key === 'ArrowUp' ) {
      e.preventDefault()
      if ( alt )
        this.close()
      else {
        if (isOpen) this.setState({ focusedItem: list.prev(focusedItem) })
        else        select(list.prev(selectedItem), true)
      }
    }

    function select(item, fromList) {
      if (!item)
        return self.change(compat.findDOMNode(self.refs.input).value, false)

      self.refs.input.accept();

      if (fromList)
        return self.handleSelect(item)

      self.change(item, false)
    }
  };

  renderInput() {
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
        role='combobox'
        name={name}
        id={this.inputId}
        autoFocus={autoFocus}
        tabIndex={tabIndex}
        suggest={suggest}
        disabled={disabled}
        readOnly={readOnly}
        aria-busy={!!busy}
        aria-owns={this.listId}
        aria-autocomplete={completeType}
        aria-activedescendant={open ? this.activeId : null}
        aria-expanded={open}
        aria-haspopup={true}
        placeholder={placeholder}
        value={dataText(valueItem, textField)}
        onChange={this.handleInputChange}
        onKeyDown={this.handleInputKeyDown}
      />
    )
  }

  renderList(List, messages) {
    let { activeId, inputId, listId } = this;
    let { open, data } = this.props;
    let { data: items, selectedItem, focusedItem } = this.state;

    let listProps = _.pickProps(this.props, List);

    return (
      <List ref="list"
        {...listProps}
        id={listId}
        activeId={activeId}
        data={items}
        selected={selectedItem}
        focused ={focusedItem}
        aria-hidden={!open}
        aria-labelledby={inputId}
        aria-live={open && 'polite'}
        onSelect={this.handleSelect}
        onMove={this.handleScroll}
        messages={{
          emptyList: data.length
            ? messages.emptyFilter
            : messages.emptyList
        }}
      />
    )
  }

  render() {
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

    List = List || (groupBy && GroupableList) || PlainList

    let elementProps = _.omitOwnProps(this, List);
    let shouldRenderPopup = open || isFirstFocusedRender(this);

    messages = msgs(messages)

    return (
      <Widget
        {...elementProps}
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        onKeyDown={this.handleKeyDown}
        className={cn(className, 'rw-combobox')}
      >
        <WidgetPicker
          open={open}
          dropUp={dropUp}
          focused={focused}
          disabled={disabled}
          readOnly={readOnly}
        >

          {this.renderInput()}

          <Select
            bordered
            busy={busy}
            icon='caret-down'
            onClick={this.toggle}
            disabled={disabled || readOnly}
            label={_.result(messages.open, this.props)}
          />
        </WidgetPicker>


        {shouldRenderPopup &&
          <Popup
            open={open}
            dropUp={dropUp}
            duration={duration}
            onOpening={() => this.refs.list.forceUpdate()}
          >
            <div>
              {this.renderList(List, messages)}
            </div>
          </Popup>
        }
      </Widget>
    )
  }

  focus() {
    this.refs.input &&
      this.refs.input.focus()
  }

  change(data, typing) {
    this._typedChange = !!typing
    notify(this.props.onChange, data)
  }

  open() {
    if (!this.props.open)
      notify(this.props.onToggle, true)
  }

  close() {
    if (this.props.open)
      notify(this.props.onToggle, false)
  }

  @widgetEditable
  toggle = () => {
    this.focus()

    this.props.open
      ? this.close()
      : this.open()
  };

  suggest(searchTerm) {
    let { textField, suggest, minLength } = this.props
    let { data } = this.state;

    if (!this._deleting)
      return Filter.suggest(data, {
        minLength,
        textField,
        searchTerm,
        filter: suggest,
        caseSensitive: false
      })

    return searchTerm
  }
}

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
