import React from 'react';
import activeElement from 'dom-helpers/activeElement';
import contains from 'dom-helpers/query/contains';
import cn from 'classnames';
import { autoFocus, mountManager, timeoutManager }
  from 'react-component-managers';
import uncontrollable from 'uncontrollable';

import Widget from './Widget';
import WidgetPicker from './WidgetPicker';
import Select from './Select';
import Popup from './Popup';
import List from './List';
import DropdownListInput from './DropdownListInput';
import { getMessages } from './messages';

import * as Props from './util/Props';
import * as Filter from './util/Filter';
import compat from './util/compat';
import focusManager from './util/focusManager';
import listDataManager from './util/listDataManager';
import * as CustomPropTypes from './util/PropTypes';
import accessorManager from './util/accessorManager';
import scrollManager from './util/scrollManager';
import withRightToLeft from './util/withRightToLeft';
import shallowCompare from './util/shallowCompare';
import { widgetEditable } from './util/interaction';
import { instanceId, notify, isFirstFocusedRender } from './util/widgetHelpers';

@withRightToLeft
class DropdownList extends React.Component {
  static propTypes = {
    ...Filter.propTypes,

    //-- controlled props -----------
    value: React.PropTypes.any,
    onChange: React.PropTypes.func,
    open: React.PropTypes.bool,
    onToggle: React.PropTypes.func,
    //------------------------------------

    data: React.PropTypes.array,
    valueField: CustomPropTypes.accessor,
    textField: CustomPropTypes.accessor,

    valueComponent: CustomPropTypes.elementType,
    itemComponent: CustomPropTypes.elementType,
    listComponent: CustomPropTypes.elementType,

    groupComponent: CustomPropTypes.elementType,
    groupBy: CustomPropTypes.accessor,

    onSelect: React.PropTypes.func,
    searchTerm: React.PropTypes.string,
    onSearch: React.PropTypes.func,
    busy: React.PropTypes.bool,

    delay: React.PropTypes.number,
    dropUp: React.PropTypes.bool,
    duration: React.PropTypes.number,

    placeholder: React.PropTypes.string,

    disabled: CustomPropTypes.disabled.acceptsArray,
    readOnly: CustomPropTypes.disabled,

    listProps: React.PropTypes.object,

    messages: React.PropTypes.shape({
      open: React.PropTypes.string,
      emptyList: CustomPropTypes.message,
      emptyFilter: CustomPropTypes.message,
      filterPlaceholder: React.PropTypes.string,
    })
  };

  static defaultProps = {
    delay: 500,
    value: '',
    open: false,
    data: [],
    searchTerm: '',
    minLength: 1,
    filter: false,
    caseSensitive: false,
    listComponent: List,
  };

  constructor(...args) {
    super(...args)

    autoFocus(this)
    this.messages = getMessages(this.props.messages)

    this.inputId = instanceId(this, '_input')
    this.listId = instanceId(this, '_listbox')
    this.activeId = instanceId(this, '_listbox_active_option')

    this.list = listDataManager(this)
    this.mounted = mountManager(this)
    this.timeouts = timeoutManager(this)
    this.accessors = accessorManager(this)
    this.handleScroll = scrollManager(this)
    this.focusManager = focusManager(this, {
      didHandle: this.handleFocusChanged,
    })

    this.state = this.getStateFromProps(this.props);
  }

  shouldComponentUpdate(...args) {
    return shallowCompare(this, ...args)
  }

  componentWillReceiveProps(nextProps) {
    this.messages = getMessages(nextProps.messages)
    this.setState(
      this.getStateFromProps(nextProps)
    )
  }

  getStateFromProps(props) {
    let {
        value
      , data
      , searchTerm
      , filter
      , minLength
      , caseSensitive
    } = props;

    let { accessors, list } = this;
    let initialIdx = accessors.indexOf(data, value);

    data = Filter.filter(data, {
      filter,
      searchTerm,
      minLength,
      caseSensitive,
      textField: this.accessors.text,
    })

    list.setData(data);

    let selectedItem = data[initialIdx];

    return {
      data,
      selectedItem: list.nextEnabled(selectedItem),
      focusedItem: list.nextEnabled(selectedItem || data[0]),
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
        <Select icon='search' role="presentation" aria-hidden="true" />
        <input
          ref='filter'
          value={this.props.searchTerm}
          className="rw-input-reset"
          placeholder={messages.filterPlaceholder(this.props)}
          onChange={e => notify(this.props.onSearch, e.target.value)}
        />
      </WidgetPicker>
    )
  }

  renderList(messages) {
    let { open, filter, data } = this.props;
    let { selectedItem, focusedItem } = this.state;
    let { value, text } = this.accessors;

    let List = this.props.listComponent
    let props = this.list.defaultProps()

    return (
      <div>
        {filter &&
          this.renderFilter(messages)
        }
        <List
          {...props}
          ref="list"
          id={this.listId}
          activeId={this.activeId}
          valueAccessor={value}
          textAccessor={text}
          selectedItem={selectedItem}
          focusedItem={open ? focusedItem : null}
          onSelect={this.handleSelect}
          onMove={this.handleScroll}
          aria-live={open && 'polite'}
          aria-labelledby={this.inputId}
          aria-hidden={!this.props.open}
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
      , textField
      , data
      , busy
      , dropUp
      , placeholder
      , value
      , open
      , valueComponent } = this.props;

    let { focused } = this.state;

    let disabled = this.props.disabled === true
      , readOnly = this.props.readOnly === true
      , valueItem = this.accessors.findOrSelf(data, value)

    let shouldRenderPopup = open || isFirstFocusedRender(this);

    let elementProps = Object.assign(Props.pickElementProps(this), {
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

    let messages = this.messages

    return (
      <Widget
        {...elementProps}
        ref="input"
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
        className={cn(className, 'rw-dropdown-list')}
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
            label={messages.openDropdown(this.props)}
          />
        </WidgetPicker>
        {shouldRenderPopup &&
          <Popup
            open={open}
            dropUp={dropUp}
            duration={duration}
            onOpened={this.focus}
            onOpening={() => this.refs.list.forceUpdate()}
          >
            {this.renderList(messages)}
          </Popup>
        }
      </Widget>
    )
  }

  @widgetEditable
  handleSelect = (data, originalEvent) => {
    this.close()

    notify(this.props.onSelect, [data, {
      originalEvent
    }])

    this.change(data, originalEvent)
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
    let key = e.key
      , alt = e.altKey
      , list = this.list
      , filtering = this.props.filter
      , focusedItem = this.state.focusedItem
      , selectedItem = this.state.selectedItem
      , isOpen = this.props.open

    let closeWithFocus = () => {
      this.close();
      compat.findDOMNode(this).focus()
    }

    notify(this.props.onKeyDown, [e])

    let change = (item, fromList) => {
      if(item == null) return
      fromList
        ? this.handleSelect(item, e)
        : this.change(item, e)
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
          : item && this.change(item, e)
      })
  };

  change(nextValue, originalEvent) {
    let { onChange, onSearch, searchTerm, value: lastValue } = this.props;

    if (!this.accessors.matches(nextValue, lastValue)) {
      notify(onChange, [nextValue, {
        originalEvent,
        lastValue,
        searchTerm,
      }])

      notify(onSearch, ['', originalEvent])
      this.close()
    }
  }

  focus = (target) => {
    let { filter, open } = this.props;
    let inst = target || (filter && open ? this.refs.filter : this.refs.input);

    inst = compat.findDOMNode(inst);

    if (inst && activeElement() !== inst)
      inst.focus()
  }

  search(character, cb) {
    var word = ((this._searchTerm || '') + character).toLowerCase();

    if (!character)
      return

    this._searchTerm = word

    this.timeouts.set('search', () => {
      var list = this.list
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

export default uncontrollable(
  DropdownList, {
    open: 'onToggle',
    value: 'onChange',
    searchTerm: 'onSearch'
  },
  ['focus']
);
