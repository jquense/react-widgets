import React from 'react';
import cn from 'classnames';
import { autoFocus, timeoutManager }
  from 'react-component-managers';
import createUncontrolledWidget from 'uncontrollable';

import List from './List';
import Widget from './Widget';
import SelectListItem from './SelectListItem';
import { getMessages } from './messages';

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
  };

  constructor(...args) {
    super(...args);
    autoFocus(this);

    this.messages = getMessages(this.props.messages)

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
    this.messages = getMessages(nextProps.messages)
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
  handleKeyDown = (event) => {
    let { list, accessors } = this;
    let { multiple } = this.props
    let { dataItems, focusedItem } = this.state;

    let { keyCode, key, ctrlKey } = event

    let change = (item) => {
      if (!item) return

      let checked = multiple
        ? !accessors.find(dataItems, item) // toggle value
        : true

      this.handleChange(item, checked, event)
    }

    notify(this.props.onKeyDown, [event])

    if (event.defaultPrevented)
      return

    if (key === 'End') {
      event.preventDefault()
      focusedItem = list.last()

      this.setState({ focusedItem })
      if (!multiple) change(focusedItem)
    }
    else if (key === 'Home' ) {
      event.preventDefault()
      focusedItem = list.first()

      this.setState({ focusedItem })
      if (!multiple) change(focusedItem)
    }
    else if (key === 'Enter' || key === ' ' ) {
      event.preventDefault()
      change(focusedItem)
    }
    else if (key === 'ArrowDown' || key === 'ArrowRight' ) {
      event.preventDefault()
      focusedItem = list.next(focusedItem)

      this.setState({ focusedItem })
      if (!multiple) change(focusedItem)
    }
    else if (key === 'ArrowUp' || key === 'ArrowLeft'  ) {
      event.preventDefault()
      focusedItem = list.prev(focusedItem)

      this.setState({ focusedItem })
      if (!multiple) change(focusedItem)
    }
    else if (multiple && keyCode === 65 && ctrlKey ) {
      event.preventDefault()
      this.selectAll()
    }
  };

  @widgetEditable
  handleKeyPress = (event) => {
    notify(this.props.onKeyPress, [event])

    if (event.defaultPrevented)
      return

    this.search(String.fromCharCode(event.which), event)
  };

  handleChange = (item, checked, originalEvent) => {
    let { multiple, onChange } = this.props
    let lastValue = this.state.dataItems;

    this.setState({ focusedItem: item })

    if (!multiple)
      return notify(onChange, [checked ? item : null, {
        originalEvent,
        lastValue,
        checked,
      }])

    let nextValue = checked
      ? lastValue.concat(item)
      : lastValue.filter( v => v !== item)

    notify(onChange, [nextValue || [], {
      checked,
      lastValue,
      originalEvent,
      dataItem: item,
    }])
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
          messages={{ emptyList: this.messages.emptyList }}
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


  search(character, originalEvent) {
    let { _searchTerm, list } = this;

    let word = ((_searchTerm || '') + character).toLowerCase()
    let multiple = this.props.multiple;

    if (!multiple) originalEvent.persist()

    if (!character)
      return

    this._searchTerm = word

    this.timeouts.set('search', () => {
      let focusedItem = list.next(this.state.focusedItem, word);

      this._searchTerm = ''

      if (focusedItem) {
        !multiple
          ? this.handleChange(focusedItem, true, originalEvent)
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
