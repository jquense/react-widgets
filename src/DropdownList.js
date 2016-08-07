import React from 'react';
import activeElement from 'dom-helpers/activeElement';
import contains from 'dom-helpers/query/contains';
import cx from 'classnames';
import uncontrollable from 'uncontrollable';
import _  from './util/_';

import Widget from './Widget';
import WidgetPicker from './WidgetPicker';
import Select from './Select';
import DropdownListInput from './DropdownListInput';
import Popup           from './Popup';
import compat          from './util/compat';
import CustomPropTypes from './util/propTypes';
import PlainList       from './List';
import GroupableList   from './ListGroupable';

import autoFocus from './util/autoFocus';
import * as Filter from './util/Filter';
import createFocusManager from './util/focusManager';
import createMountManager from './util/mountManager'
import createScrollManager from './util/scrollManager';
import createTimeoutManager from './util/timeoutManager';
import shallowCompare from './util/shallowCompare';
import withRightToLeft from './util/withRightToLeft';

import { dataItem, dataIndexOf, valueMatcher } from './util/dataHelpers';
import { widgetEditable, isDisabled, isReadOnly } from './util/interaction';
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers';

let { result } = _;

class DropdownList extends React.Component {
  static propTypes = {
    ...Filter.propTypes,

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
    duration:       React.PropTypes.number,

    placeholder:    React.PropTypes.string,

    disabled:       CustomPropTypes.disabled.acceptsArray,
    readOnly:       CustomPropTypes.readOnly,

    messages:       React.PropTypes.shape({
      open:              CustomPropTypes.message,
      emptyList:         CustomPropTypes.message,
      emptyFilter:       CustomPropTypes.message,
      filterPlaceholder: CustomPropTypes.message
    })
  };

  static defaultProps = {
    delay: 500,
    value: '',
    open: false,
    data: [],
    searchTerm: '',
    minLength: 1,
    filter: true,
    caseSensitive: false,
    messages: msgs()
  };

  constructor(...args) {
    super(...args)

    autoFocus(this)

    this.inputId = instanceId(this, '_input')
    this.listId = instanceId(this, '_listbox')
    this.activeId = instanceId(this, '_listbox_active_option')

    this.mounted = createMountManager(this)
    this.timeouts = createTimeoutManager(this)
    this.handleScroll = createScrollManager(this)
    this.focusManager = createFocusManager(this, {
      didHandle: this.handleFocusChanged
    })

    this.state = this.getStateFromProps(this.props);
  }

  shouldComponentUpdate(...args) {
    return shallowCompare(this, ...args)
  }

  componentWillReceiveProps(props) {
    this.setState(
      this.getStateFromProps(props)
    )
  }

  getStateFromProps(props) {
    let {
        value
      , data
      , searchTerm, valueField
      , filter
      , textField
      , minLength
      , caseSensitive
    } = props;

    let initialIdx = dataIndexOf(data, value, valueField);

    data = Filter.filter(data, {
      filter,
      searchTerm,
      minLength,
      caseSensitive,
      textField
    })

    return {
      data,
      selectedItem: data[initialIdx],
      focusedItem: data[initialIdx] || data[0]
    }
  }

  handleFocusChanged = (focused) => {
    if (!focused) this.close()
  };

  renderFilter(messages) {
    return (
       <WidgetPicker
        ref='filterWrapper'
        className="rw-filter-input rw-input"
      >
        <Select component="span" icon='search' />
        <input
          ref='filter'
          value={this.props.searchTerm}
          className="rw-input-reset"
          placeholder={_.result(messages.filterPlaceholder, this.props)}
          onChange={e => notify(this.props.onSearch, e.target.value)}
        />
      </WidgetPicker>
    )
  }

  renderList(List, messages) {
    let { open, filter, data } = this.props;
    let { selectedItem, focusedItem } = this.state;

    let listProps = _.pickProps(this.props, List);
    let items = this._data();

    return (
      <div>
        {filter &&
          this.renderFilter(messages)
        }
        <List
          {...listProps}
          ref="list"
          id={this.listId}
          activeId={this.activeId}
          data={items}
          aria-live={open && 'polite'}
          aria-labelledby={this.inputId}
          aria-hidden={!this.props.open}
          selected={selectedItem}
          focused ={open ? focusedItem : null}
          onSelect={this.handleSelect}
          onMove={this.handleScroll}
          messages={{
            emptyList: data.length
              ? messages.emptyFilter
              : messages.emptyList
          }}/>
      </div>
    )
  }

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
      , placeholder
      , value
      , open
      , valueComponent
      , listComponent: List } = this.props;

    List = List || (groupBy && GroupableList) || PlainList

    let { focused } = this.state;

    let disabled = isDisabled(this.props)
      , readOnly = isReadOnly(this.props)
      , valueItem = dataItem(data, value, valueField) // take value from the raw data

    let shouldRenderPopup = open || isFirstFocusedRender(this);

    let elementProps = Object.assign(_.omitOwnProps(this, List), {
      name: undefined,
      role: 'combobox',
      id: this.inputId,
      tabIndex: tabIndex || 0,
      'aria-owns': this.listID,
      'aria-activedescendant': open ? this.activeId : null,
      'aria-expanded': !!open,
      'aria-haspopup': true,
      'aria-busy': !!busy,
      'aria-live': !open && 'polite',
      'aria-autocomplete': 'list',
      'aria-disabled': disabled,
      'aria-readonly': readOnly
    });

    messages = msgs(messages)

    return (
      <Widget
        {...elementProps}
        ref="input"
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
        className={cx(className, 'rw-dropdown-list')}
      >
        <WidgetPicker
          open={open}
          dropUp={dropUp}
          focused={focused}
          disabled={disabled}
          readOnly={readOnly}
          className="rw-widget-input"
        >
          <DropdownListInput
            value={valueItem}
            textField={textField}
            placeholder={placeholder}
            valueComponent={valueComponent}
          />
          <Select
            busy={busy}
            icon="caret-down"
            role="presentational"
            aria-hidden="true"
            disabled={disabled || readOnly}
            label={result(messages.open, this.props)}
          />
        </WidgetPicker>
        {shouldRenderPopup &&
          <Popup
            open={open}
            dropUp={dropUp}
            duration={duration}
            onOpen={() => this.focus()}
            onOpening={() => this.refs.list.forceUpdate()}
          >
            {this.renderList(List, messages)}
          </Popup>
        }
      </Widget>
    )
  }

  @widgetEditable
  handleSelect = (data) => {
    this.close()
    notify(this.props.onSelect, data)
    this.change(data)
    this.focus(this)
  };

  @widgetEditable
  handleClick = (e) => {
    var wrapper = this.refs.filterWrapper

    if( !this.props.filter || !this.props.open )
      this.toggle()

    else if( !contains(compat.findDOMNode(wrapper), e.target))
      this.close()

    notify(this.props.onClick, e)
  };

  @widgetEditable
  handleKeyDown = (e) => {
    var key = e.key
      , alt = e.altKey
      , list = this.refs.list
      , filtering = this.props.filter
      , focusedItem = this.state.focusedItem
      , selectedItem = this.state.selectedItem
      , isOpen = this.props.open
      , closeWithFocus = () => {
        this.close(),
        compat.findDOMNode(this).focus()
      };

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
    else if (
      (key === 'Enter' ||
      (key === ' ' && !filtering)) &&
      isOpen
    ) {
      e.preventDefault();
      change(this.state.focusedItem, true)
    }
    else if (key === ' ' && !isOpen) {
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
  };

  @widgetEditable
  handleKeyPress = (e) => {
    notify(this.props.onKeyPress, [e])

    if (e.defaultPrevented)
      return

    if (!(this.props.filter && this.props.open))
      this.search(String.fromCharCode(e.which), item => {
        this.mounted() && this.props.open
          ? this.setState({ focusedItem: item })
          : item && this.change(item)
      })
  };

  change(data) {
    if (!valueMatcher(data, this.props.value, this.props.valueField)) {
      notify(this.props.onChange, data)
      notify(this.props.onSearch, '')
      this.close()
    }
  }

  focus(target) {
    let { filter, open } = this.props;
    let inst = target || (filter && open ? this.refs.filter : this.refs.input);

    inst = compat.findDOMNode(inst);

    if (activeElement() !== inst)
      inst.focus()
  }

  _data() {
    return this.state.data
  }

  search(character, cb) {
    var word = ((this._searchTerm || '') + character).toLowerCase();

    if (!character)
      return

    this._searchTerm = word

    this.timeouts.set('search', () => {
      var list = this.refs.list
        , key  = this.props.open ? 'focusedItem' : 'selectedItem'
        , item = list.next(this.state[key], word);

      this._searchTerm = ''
      if (item) cb(item)

    }, this.props.delay)
  }

  open() {
    notify(this.props.onToggle, true)
  }

  close() {
    notify(this.props.onToggle, false)
  }

  toggle() {
    this.props.open
      ? this.close()
      : this.open()
  }
}

function msgs(msgs){
  return {
    open: 'open dropdown',
    filterPlaceholder: '',
    emptyList:   'There are no items in this list',
    emptyFilter: 'The filter returned no results',
    ...msgs
  }
}

DropdownList = uncontrollable(
  DropdownList, {
    open: 'onToggle',
    value: 'onChange',
    searchTerm: 'onSearch'
  },
  ['focus']
);

DropdownList = withRightToLeft(DropdownList)

export default DropdownList
