import React from 'react';
import cn from 'classnames';
import { autoFocus, timeoutManager }
  from 'react-component-managers';
import createUncontrolledWidget from 'uncontrollable';

import { find, splat }  from './util/_';
import compat from './util/compat';
import * as CustomPropTypes from './util/PropTypes';
import PlainList from './List';
import GroupableList from './ListGroupable';
import Widget from './Widget';
import createSelectListItem from './SelectListItem';
import * as Props from './util/Props';
import accessorManager from './util/accessorManager';
import focusManager from './util/focusManager';
import scrollManager from './util/scrollManager';
import withRightToLeft from './util/withRightToLeft';
import validateList from './util/validateListInterface';
import { widgetEditable, isDisabled, isReadOnly, contains } from './util/interaction';
import { instanceId, notify } from './util/widgetHelpers';



function getFirstValue(props) {
  let { data, value } = props
  value = splat(value);

  if (value.length)
    return find(data, d => this.accessors.indexOf(value, d) !== -1)
        || null

  return null
}

@withRightToLeft
class SelectList extends React.Component {
  static propTypes = {
    ...autoFocus.propTypes,

    data: React.PropTypes.array,
    value: React.PropTypes.oneOfType([
      React.PropTypes.any,
      React.PropTypes.array
    ]),
    onChange: React.PropTypes.func,
    onMove: React.PropTypes.func,

    multiple: React.PropTypes.bool,

    itemComponent: CustomPropTypes.elementType,
    listComponent: CustomPropTypes.elementType,

    valueField: React.PropTypes.string,
    textField: CustomPropTypes.accessor,

    busy: React.PropTypes.bool,

    filter: React.PropTypes.string,
    delay: React.PropTypes.number,

    disabled: CustomPropTypes.disabled.acceptsArray,
    readOnly: CustomPropTypes.disabled,
    listProps: React.PropTypes.object,
    messages: React.PropTypes.shape({
      emptyList: CustomPropTypes.message,
    })
  };

  static defaultProps = {
    delay: 250,
    value: [],
    data:  [],
    messages: {
      emptyList: 'There are no items in this list'
    }
  };

  constructor(...args) {
    super(...args);
    autoFocus(this);

    this.widgetId = instanceId(this, '_widget')
    this.listId = instanceId(this, '_listbox')
    this.activeId = instanceId(this, '_listbox_active_option')

    this.accessors = accessorManager(this)
    this.timeouts = timeoutManager(this);
    this.handleScroll = scrollManager(this, false);
    this.focusManager = focusManager(this, {
      didHandle: this.handleFocusChanged
    })

    this.ListItem = createSelectListItem(this)
    this.state = this.getDefaultState(this.props)
  }

  getDefaultState(props) {
    let { data, value, multiple } = props

    return {
      dataItems: multiple && splat(value)
        .map(item => this.accessors.find(data, item))
    }
  }

  componentWillReceiveProps(nextProps) {
    return this.setState(
      this.getDefaultState(nextProps)
    )
  }

  componentDidMount() {
    validateList(this.refs.list)
  }

  handleFocusChanged = (focused) => {
    // the rigamarole here is to avoid flicker went clicking an item and
    // gaining focus at the same time.
    if (focused !== this.state.focused) {
      if (!focused)
        this.setState({ focusedItem: null })
      else if (focused && !this._clicking)
        this.setState({
          focusedItem: getFirstValue(this.props)
        })
      this._clicking = false
    }
  };

  render() {
    let {
        className
      , tabIndex
      , busy
      , groupBy
      , disabled
      , listProps
      , itemComponent
      , listComponent: List } = this.props;

    List = List || (groupBy && GroupableList) || PlainList

    let elementProps = Props.pickElementProps(this);

    let { focusedItem, focused } = this.state
    let { value, text } = this.accessors;

    let ListItem = this.ListItem
    let items = this._data()

    focusedItem = focused
      && !isDisabled(this.props)
      && !isReadOnly(this.props)
      && focusedItem;

    return (
      <Widget
        {...elementProps}
        id={this.widgetId}
        onBlur={this.focusManager.handleBlur}
        onFocus={this.focusManager.handleFocus}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
        focused={focused}
        disabled={isDisabled(this.props)}
        readOnly={isReadOnly(this.props)}
        role="radiogroup"
        aria-busy={!!busy}
        aria-activedescendant={this.activeId}
        className={cn(
          className,
          'rw-select-list',
          'rw-widget-input',
          'rw-widget-container',
          busy && 'rw-loading-mask'
        )}
      >
        <List
          {...listProps}
          ref='list'
          role="radiogroup"
          tabIndex={tabIndex || '0'}
          id={this.listId}
          activeId={this.activeId}
          data={items}
          valueAccessor={value}
          textAccessor={text}
          disabled={disabled}
          focusedItem={focusedItem}
          optionComponent={ListItem}
          itemComponent={itemComponent}
          onMove={this.handleScroll}
        />
      </Widget>
    );
  }

  @widgetEditable
  handleKeyDown = (e) => {
    var key = e.key
      , { valueField, multiple } = this.props
      , list = this.refs.list
      , focusedItem = this.state.focusedItem;

    let change = (item) => {
      if (item)
        this.handleChange(item, multiple
            ? !contains(item, this._values(), valueField) // toggle value
            : true)
    }

    notify(this.props.onKeyDown, [e])

    if (e.defaultPrevented)
      return

    if (key === 'End') {
      e.preventDefault()
      focusedItem = list.last()

      this.setState({ focusedItem })
      if (!multiple) change(focusedItem)
    }
    else if (key === 'Home' ) {
      e.preventDefault()
      focusedItem = list.first()

      this.setState({ focusedItem })
      if (!multiple) change(focusedItem)
    }
    else if (key === 'Enter' || key === ' ' ) {
      e.preventDefault()
      change(focusedItem)
    }
    else if (key === 'ArrowDown' || key === 'ArrowRight' ) {
      e.preventDefault()
      focusedItem = list.next(focusedItem)

      this.setState({ focusedItem })
      if (!multiple) change(focusedItem)
    }
    else if (key === 'ArrowUp' || key === 'ArrowLeft'  ) {
      e.preventDefault()
      focusedItem = list.prev(focusedItem)

      this.setState({ focusedItem })
      if (!multiple) change(focusedItem)
    }
    else if (multiple && e.keyCode === 65 && e.ctrlKey ) {
      e.preventDefault()
      this.selectAll()
    }
  };

  @widgetEditable
  handleKeyPress = (e) => {
    notify(this.props.onKeyPress, [e])

    if (e.defaultPrevented)
      return

    this.search(String.fromCharCode(e.which))
  };

  handleChange = (item, checked) => {
    var { multiple } = this.props
      , values = this.state.dataItems;

    multiple  = !!multiple

    this.setState({ focusedItem: item })

    if (!multiple)
      return notify(this.props.onChange, checked ? item : null)

    values = checked
      ? values.concat(item)
      : values.filter( v => v !== item)

    notify(this.props.onChange, [values || []])
  };

  focus() {
    compat.findDOMNode(this.refs.list).focus()
  }

  selectAll() {
    var { disabled, readOnly, valueField } = this.props
      , values = this.state.dataItems
      , data = this._data()
      , blacklist;

    disabled = disabled || readOnly
    disabled = Array.isArray(disabled) ? disabled : [];
    //disabled values that are not selected
    blacklist = disabled.filter(v => !contains(v, values, valueField))
    data      = data.filter( v => !contains(v, blacklist, valueField))

    if (data.length === values.length) {
      data = disabled.filter(item => contains(item, values, valueField))
      data = data.map(item => this.accessors.find(this._data(), item))
    }

    notify(this.props.onChange, [data])
  }


  search(character) {
    var word = ((this._searchTerm || '') + character).toLowerCase()
      , list = this.refs.list
      , multiple = this.props.multiple;

    if (!character)
      return

    this._searchTerm = word

    this.timeouts.set('search', () => {
      var focusedItem = list.next(this.state.focusedItem, word);

      this._searchTerm = ''

      if (focusedItem) {
        !multiple
          ? this.handleChange(focusedItem, true)
          : this.setState({ focusedItem })
      }
    }, this.props.delay)
  }

  _data() {
    return this.props.data
  }

  _values() {
    return this.props.multiple
      ? this.state.dataItems
      : this.props.value
  }
}

export default createUncontrolledWidget(SelectList,
  {
    value: 'onChange'
  },
  ['selectAll', 'focus']
);
