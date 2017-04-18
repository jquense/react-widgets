import React from 'react';
import PropTypes from 'prop-types';
import activeElement from 'dom-helpers/activeElement';
import contains from 'dom-helpers/query/contains';
import cx from 'classnames';
import _  from './util/_';

import Widget from './Widget';
import Input from './Input';
import Select from './Select';
import DropdownListInput from './DropdownListInput';
import Popup           from './Popup';
import compat          from './util/compat';
import CustomPropTypes from './util/propTypes';
import PlainList       from './List';
import GroupableList   from './ListGroupable';
import validateList    from './util/validateListInterface';
import createUncontrolledWidget from 'uncontrollable';

import { dataItem, dataIndexOf, valueMatcher } from './util/dataHelpers';
import { widgetEditable, isDisabled, isReadOnly } from './util/interaction';
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers';

let { result } = _;

var propTypes = {
  ...Popup.propTypes,

  //-- controlled props -----------
  value:          PropTypes.any,
  onChange:       PropTypes.func,
  open:           PropTypes.bool,
  onToggle:       PropTypes.func,
  //------------------------------------

  data:           PropTypes.array,
  valueField:     PropTypes.string,
  textField:      CustomPropTypes.accessor,

  valueComponent: CustomPropTypes.elementType,
  itemComponent:  CustomPropTypes.elementType,
  listComponent:  CustomPropTypes.elementType,

  groupComponent: CustomPropTypes.elementType,
  groupBy:        CustomPropTypes.accessor,

  onSelect:       PropTypes.func,
  searchTerm:     PropTypes.string,
  onSearch:       PropTypes.func,
  busy:           PropTypes.bool,
  delay:          PropTypes.number,
  dropUp:         PropTypes.bool,
  duration:       PropTypes.number, //popup

  disabled:       CustomPropTypes.disabled.acceptsArray,
  readOnly:       CustomPropTypes.readOnly.acceptsArray,

  messages:       PropTypes.shape({
    open:              CustomPropTypes.message,
    emptyList:         CustomPropTypes.message,
    emptyFilter:       CustomPropTypes.message,
    filterPlaceholder: CustomPropTypes.message
  })
};

var DropdownList = React.createClass({

  displayName: 'DropdownList',

  mixins: [
    require('./mixins/TimeoutMixin'),
    require('./mixins/AutoFocusMixin'),
    require('./mixins/PureRenderMixin'),
    require('./mixins/DataFilterMixin'),
    require('./mixins/PopupScrollToMixin'),
    require('./mixins/RtlParentContextMixin'),
    require('./mixins/AriaDescendantMixin')(),
    require('./mixins/FocusMixin')({
      didHandle(focused) {
        if (!focused) this.close()
      }
    })
  ],

  propTypes: propTypes,

  getDefaultProps(){
    return {
      delay: 500,
      value: '',
      open: false,
      data: [],
      searchTerm: '',
      messages: msgs(),
      ariaActiveDescendantKey: 'dropdownlist'
    }
  },

  getInitialState(){
    let { open, filter, value, data, searchTerm, valueField } = this.props;

    var processed = filter ? this.filter(data, searchTerm) : data
      , initialIdx = dataIndexOf(data, value, valueField);

    return {
      filteredData: (open && filter) ? processed : null,
      selectedItem: processed[initialIdx],
      focusedItem:  processed[initialIdx] || data[0]
    }
  },

  componentDidUpdate() {
    this.refs.list
        && validateList(this.refs.list)
  },

  componentWillReceiveProps(props){
    let { open, filter, value, data, searchTerm, valueField } = props;

    var processed = filter ? this.filter(data, searchTerm) : data
      , idx = dataIndexOf(data, value, valueField);

    this.setState({
      filteredData: (open && filter) ? processed : null,
      selectedItem: processed[idx],
      focusedItem:  processed[!~idx ? 0 : idx]
    })
  },

  renderFilter(messages){
    return (
      <div ref='filterWrapper' className='rw-filter-input'>
        <Select component='span' icon='search' />
        <Input
          ref='filter'
          value={this.props.searchTerm}
          placeholder={_.result(messages.filterPlaceholder, this.props)}
          onChange={e => notify(this.props.onSearch, e.target.value)}
        />

      </div>
    )
  },

  renderList(List, id, messages) {
    let { open, filter, data } = this.props;
    let { selectedItem, focusedItem } = this.state;

    let listProps = _.pickProps(this.props, List);
    let items = this._data();

    return (
      <div>
        { filter && this.renderFilter(messages) }

        <List
          {...listProps}
          ref="list"
          id={id}
          data={items}
          aria-live={open && 'polite'}
          aria-labelledby={instanceId(this)}
          aria-hidden={!this.props.open}
          selected={selectedItem}
          focused ={open ? focusedItem : null}
          onSelect={this.handleSelect}
          onMove={this._scrollTo}
          messages={{
            emptyList: data.length
              ? messages.emptyFilter
              : messages.emptyList
          }}/>
      </div>
    )
  },

  render() {
    let {
        className
      , tabIndex
      , duration
      , valueField
      , textField
      , groupBy
      , messages
      , data
      , busy
      , dropUp
      , placeholder, value, open
      , valueComponent
      , listComponent: List } = this.props;

    List = List || (groupBy && GroupableList) || PlainList

    let { focused } = this.state;

    let disabled = isDisabled(this.props)
      , readOnly = isReadOnly(this.props)
      , valueItem = dataItem(data, value, valueField) // take value from the raw data
      , listID = instanceId(this, '__listbox');

    let elementProps = Object.assign(_.omitOwnProps(this, List), {
      role: 'combobox',
      tabIndex: tabIndex || 0,
      'aria-owns': listID,
      'aria-expanded': !!open,
      'aria-haspopup': true,
      'aria-busy': !!busy,
      'aria-live': !open && 'polite',
      'aria-autocomplete': 'list',
      'aria-disabled': disabled,
      'aria-readonly': readOnly
    });

    let shouldRenderPopup = open || isFirstFocusedRender(this);

    messages = msgs(messages)

    return (
      <Widget
        {...elementProps}
        ref="input"
        className={cx(className, 'rw-dropdownlist')}
        open={open}
        dropUp={dropUp}
        focused={focused}
        disabled={disabled}
        readOnly={readOnly}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
      >
        <Select
          busy={busy}
          icon="caret-down"
          component='span'
          className="rw-dropdownlist-picker"
          label={result(messages.open, this.props)}
        />
        <DropdownListInput
          value={valueItem}
          textField={textField}
          placeholder={placeholder}
          valueComponent={valueComponent}
        />

        {shouldRenderPopup &&
          <Popup
            open={open}
            dropUp={dropUp}
            duration={duration}
            onOpen={() => this.focus()}
            onOpening={() => this.refs.list.forceUpdate()}
          >
            {this.renderList(List, listID, messages)}
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
    this.focus(this)
  },

  @widgetEditable
  handleClick(e){
    var wrapper = this.refs.filterWrapper

    if( !this.props.filter || !this.props.open )
      this.toggle()

    else if( !contains(compat.findDOMNode(wrapper), e.target))
      this.close()

    notify(this.props.onClick, e)
  },

  @widgetEditable
  handleKeyDown(e){
    var key = e.key
      , alt = e.altKey
      , list = this.refs.list
      , filtering = this.props.filter
      , focusedItem = this.state.focusedItem
      , selectedItem = this.state.selectedItem
      , isOpen = this.props.open
      , closeWithFocus = () => { this.close(), compat.findDOMNode(this).focus()};

    notify(this.props.onKeyDown, [e])

    let change = (item, fromList) => {
      if(item == null) return
      fromList
        ? this.handleSelect(item)
        : this.change(item)
    }

    if (e.defaultPrevented)
      return

    if (key === 'End') {
      e.preventDefault()

      if (isOpen) this.setState({ focusedItem: list.last() })
      else        change(list.last())
    }
    else if (key === 'Home') {
      e.preventDefault()

      if (isOpen) this.setState({ focusedItem: list.first() })
      else        change(list.first())
    }
    else if (key === 'Escape' && isOpen) {
      e.preventDefault();
      closeWithFocus()
    }
    else if ((key === 'Enter' || (key === ' ' && !filtering)) && isOpen ) {
      e.preventDefault();
      change(this.state.focusedItem, true)
    }
    else if (key === ' ' && !filtering && !isOpen) {
      e.preventDefault();
      this.open()
    }
    else if (key === 'ArrowDown') {
      if (alt)         this.open()
      else if (isOpen) this.setState({ focusedItem: list.next(focusedItem) })
      else             change(list.next(selectedItem))
      e.preventDefault()
    }
    else if (key === 'ArrowUp') {
      if (alt)         closeWithFocus()
      else if (isOpen) this.setState({ focusedItem: list.prev(focusedItem) })
      else             change(list.prev(selectedItem))
      e.preventDefault()
    }
  },

  @widgetEditable
  handleKeyPress(e) {
    notify(this.props.onKeyPress, [e])

    if (e.defaultPrevented)
      return

    if (!(this.props.filter && this.props.open))
      this.search(String.fromCharCode(e.which), item => {
        this.isMounted() && this.props.open
          ? this.setState({ focusedItem: item })
          : item && this.change(item)
      })
  },

  change(data){
    if (!valueMatcher(data, this.props.value, this.props.valueField)) {
      notify(this.props.onChange, data)
      notify(this.props.onSearch, '')
      this.close()
    }
  },

  focus(target){
    let { filter, open } = this.props;
    let inst = target || (filter && open ? this.refs.filter : this.refs.input);

    inst = compat.findDOMNode(inst);

    if (activeElement() !== inst)
      inst.focus()
  },

  _data() {
    return this.state.filteredData || this.props.data.concat()
  },

  search(character, cb) {
    var word = ((this._searchTerm || '') + character).toLowerCase();

    if (!character)
      return

    this._searchTerm = word

    this.setTimeout('search', () => {
      var list = this.refs.list
        , key  = this.props.open ? 'focusedItem' : 'selectedItem'
        , item = list.next(this.state[key], word);

      this._searchTerm = ''
      if (item) cb(item)

    }, this.props.delay)
  },

  open() {
    notify(this.props.onToggle, true)
  },

  close() {
    notify(this.props.onToggle, false)
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

export default createUncontrolledWidget(
    DropdownList, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' }, ['focus']);
