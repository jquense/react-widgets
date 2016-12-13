import React from 'react';
import cn from 'classnames';
import { autoFocus, timeoutManager }
  from 'react-component-managers';
import createUncontrolledWidget from 'uncontrollable';

import List from './List';
import Widget from './Widget';
import SelectListItem from './SelectListItem';

import { find, splat }  from './util/_';
import compat from './util/compat';
import * as Props from './util/Props';
import * as CustomPropTypes from './util/PropTypes';
import listDataManager from './util/listDataManager';
import accessorManager from './util/accessorManager';
import focusManager from './util/focusManager';
import scrollManager from './util/scrollManager';
import withRightToLeft from './util/withRightToLeft';
import { widgetEditable } from './util/interaction';
import { instanceId, notify } from './util/widgetHelpers';


function getFirstValue(data, values) {
  let firstValue = null;
  if (values.length)
    firstValue = find(data, d => ~values.indexOf(d))

  return firstValue || null
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
    listComponent: List,
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
    this.itemName = instanceId(this, '_name')

    this.list = listDataManager(this)
    this.accessors = accessorManager(this)
    this.timeouts = timeoutManager(this);
    this.handleScroll = scrollManager(this, false);
    this.focusManager = focusManager(this, {
      didHandle: this.handleFocusChanged
    })

    this.state = this.getStateFromProps(this.props)
  }

  getStateFromProps(props) {
    let { accessors, list } = this
    let { data, value } = props

    list.setData(data);

    return {
      dataItems: splat(value).map(item => accessors.findOrSelf(data, item))
    }
  }

  componentWillReceiveProps(nextProps) {
    return this.setState(
      this.getStateFromProps(nextProps)
    )
  }

  handleMouseDown = () => {
    this._clicking = true;
  }

  handleFocusChanged = (focused) => {
    let { data, disabled } = this.props
    let { dataItems } = this.state

    // the rigamarole here is to avoid flicker went clicking an item and
    // gaining focus at the same time.
    if (focused !== this.state.focused) {
      if (!focused)
        this.setState({ focusedItem: null })
      else if (focused && !this._clicking) {
        let allowed = Array.isArray(disabled)
          ? dataItems.filter(v => !this.accessors.find(disabled, v))
          : dataItems;

        this.setState({
          focusedItem:
            getFirstValue(data, allowed) || this.list.nextEnabled(data[0]),
        })
      }
      this._clicking = false
    }
  };

  @widgetEditable
  handleKeyDown = (e) => {
    let { list, accessors } = this;
    let { multiple } = this.props
    let { dataItems, focusedItem } = this.state;

    let key = e.key

    let change = (item) => {
      if (!item) return
      this.handleChange(item, multiple
          ? !accessors.find(dataItems, item) // toggle value
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

  renderListItem = (itemProps) => {
    const { name, multiple, readOnly } = this.props;
    const { dataItems } = this.state;
    return (
      <SelectListItem
        {...itemProps}
        name={name || this.itemName}
        type={multiple ? 'checkbox' : 'radio'}
        readOnly={readOnly}
        onChange={this.handleChange}
        onMouseDown={this.handleMouseDown}
        checked={!!this.accessors.find(dataItems, itemProps.dataItem)}
      />
    )
  }

  render() {
    let {
        className
      , tabIndex
      , busy } = this.props;

    let elementProps = Props.pickElementProps(this);

    let { focusedItem, focused } = this.state
    let { value, text } = this.accessors;

    let List = this.props.listComponent
    let listProps = this.list.defaultProps();

    let disabled = this.props.disabled === true
      , readOnly = this.props.readOnly === true

    focusedItem = focused
      && !disabled
      && !readOnly
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
        disabled={disabled}
        readOnly={readOnly}
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
          valueAccessor={value}
          textAccessor={text}
          focusedItem={focusedItem}
          onMove={this.handleScroll}
          optionComponent={this.renderListItem}
        />
      </Widget>
    );
  }

  focus() {
    compat.findDOMNode(this.refs.list).focus()
  }

  selectAll() {
    let { accessors } = this;

    let { data, disabled, onChange } = this.props
    let values = this.state.dataItems;

    disabled = Array.isArray(disabled) ? disabled : [];

    let disabledValues;
    let enabledData = data;

    if (disabled.length) {
      disabledValues = values.filter(v => accessors.find(disabled, v))
      enabledData = data.filter(v => !accessors.find(disabled, v))
    }

    let nextValues = (values.length >= enabledData.length)
      ? values.filter(v => accessors.find(disabled, v))
      : enabledData.concat(disabledValues)

    notify(onChange, [nextValues])
  }


  search(character) {
    let { _searchTerm, list } = this;

    let word = ((_searchTerm || '') + character).toLowerCase()
    let multiple = this.props.multiple;

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
}

export default createUncontrolledWidget(SelectList,
  {
    value: 'onChange'
  },
  ['selectAll', 'focus']
);
