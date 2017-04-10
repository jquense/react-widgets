import React from 'react';
import PropTypes from 'prop-types';
import _  from './util/_';
import cn from 'classnames';
import createUncontrolledWidget from 'uncontrollable';
import compat from './util/compat';

import CustomPropTypes from './util/propTypes';
import PlainList from './List';
import GroupableList from './ListGroupable';
import ListOption from './ListOption';
import Widget from './Widget';

import validateList from './util/validateListInterface';
import scrollTo from 'dom-helpers/util/scrollTo';

import { dataItem, dataIndexOf } from './util/dataHelpers';
import { widgetEditable } from './util/interaction';

import { instanceId, notify } from './util/widgetHelpers';
import { isDisabled, isReadOnly, contains } from './util/interaction';

let { find } = _;

let propTypes = {

    data:           PropTypes.array,
    value:          PropTypes.oneOfType([
                      PropTypes.any,
                      PropTypes.array
                    ]),
    onChange:       PropTypes.func,
    onMove:         PropTypes.func,

    multiple:       PropTypes.bool,

    itemComponent:  CustomPropTypes.elementType,
    listComponent:  CustomPropTypes.elementType,

    valueField:     PropTypes.string,
    textField:      CustomPropTypes.accessor,

    busy:           PropTypes.bool,

    filter:         PropTypes.string,
    delay:          PropTypes.number,

    disabled:       CustomPropTypes.disabled.acceptsArray,
    readOnly:       CustomPropTypes.readOnly.acceptsArray,

    messages:       PropTypes.shape({
      emptyList:    PropTypes.string
    })
  }

function getFirstValue(props) {
  var { data, value, valueField } = props
  value = _.splat(value);

  if (value.length)
    return find(data, d => dataIndexOf(value, d, valueField) !== -1)
        || null

  return null
}

var SelectList = React.createClass({

  propTypes: propTypes,

  mixins: [
    require('./mixins/TimeoutMixin'),
    require('./mixins/AutoFocusMixin'),
    require('./mixins/RtlParentContextMixin'),
    require('./mixins/AriaDescendantMixin')(),
    require('./mixins/FocusMixin')({
      didHandle(focused) {
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
      }
    })
  ],

  getDefaultProps(){
    return {
      delay: 250,
      value: [],
      data:  [],
      ariaActiveDescendantKey: 'selectlist',
      messages: {
        emptyList: 'There are no items in this list'
      }
    }
  },

  getDefaultState(props) {
    var { data, value, valueField, multiple } = props

    return {
      dataItems: multiple &&
        _.splat(value).map(item => dataItem(data, item, valueField))
    }
  },

  getInitialState(){
    var state = this.getDefaultState(this.props)

    state.ListItem = getListItem(this)

    return state
  },

  componentWillReceiveProps(nextProps) {
    return this.setState(
      this.getDefaultState(nextProps)
    )
  },

  componentDidMount() {
    validateList(this.refs.list)
  },

  render() {
    let {
        className
      , tabIndex
      , busy
      , groupBy
      , listComponent: List } = this.props;

    List = List || (groupBy && GroupableList) || PlainList

    let elementProps = _.omitOwnProps(this, List);
    let listProps    = _.pickProps(this.props, List);

    let { ListItem, focusedItem, focused } = this.state;

    let items = this._data();

    focusedItem = focused
      && !isDisabled(this.props)
      && !isReadOnly(this.props)
      && focusedItem;

    return (
      <Widget
        {...elementProps}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
        disabled={isDisabled(this.props)}
        readOnly={isReadOnly(this.props)}
        role={'radiogroup'}
        aria-busy={!!busy}
        className={cn(
          className,
          'rw-selectlist',
          busy && 'rw-loading-mask'
        )}
      >
        <List
          {...listProps}
          ref='list'
          role="radiogroup"
          tabIndex={tabIndex || '0'}
          id={instanceId(this, '_listbox')}
          data={items}
          focused={focusedItem}
          optionComponent={ListItem}
          itemComponent={this.props.itemComponent}
          onMove={this._scrollTo}
        />
      </Widget>
    );
  },

  _scrollTo(selected, list) {
    var handler = this.props.onMove;

    if ( handler )
      handler(selected, list)
    else {
      this._scrollCancel && this._scrollCancel()
      // default behavior is to scroll the whole page not just the widget
      this._scrollCancel = scrollTo(selected)
    }
  },

  @widgetEditable
  handleKeyDown(e) {
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
  },

  @widgetEditable
  handleKeyPress(e) {
    notify(this.props.onKeyPress, [e])

    if (e.defaultPrevented)
      return

    this.search(String.fromCharCode(e.which))
  },

  focus() {
    compat.findDOMNode(this.refs.list).focus()
  },

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
      data = data.map(item => dataItem(this._data(), item, valueField))
    }

    notify(this.props.onChange, [data])
  },

  handleChange(item, checked) {
    var { multiple } = this.props
      , values = this.state.dataItems;

    multiple  = !!multiple

    this.clearTimeout('focusedItem')
    this.setState({ focusedItem: item })

    if (!multiple)
      return notify(this.props.onChange, checked ? item : null)

    values = checked
      ? values.concat(item)
      : values.filter( v => v !== item)

    notify(this.props.onChange, [values || []])
  },

  search(character) {
    var word = ((this._searchTerm || '') + character).toLowerCase()
      , list = this.refs.list
      , multiple = this.props.multiple;

    if (!character)
      return

    this._searchTerm = word

    this.setTimeout('search', () => {
      var focusedItem = list.next(this.state.focusedItem, word);

      this._searchTerm = ''

      if (focusedItem) {
        !multiple
          ? this.handleChange(focusedItem, true)
          : this.setState({ focusedItem })
      }
    }, this.props.delay)
  },

  _data() {
    return this.props.data
  },

  _values() {
    return this.props.multiple
      ? this.state.dataItems
      : this.props.value
  }

});


function getListItem(parent){

  return React.createClass({

    displayName: 'SelectItem',

    handleChange(e) {
      let { disabled, readonly, dataItem } = this.props;

      if (!disabled && !readonly)
        parent.handleChange(dataItem, e.target.checked)
    },

    handleMouseDown() {
      parent._clicking = true
    },

    render() {
      let {
          children
        , disabled
        , readonly
        , dataItem: item } = this.props;

      let {
        multiple,
        name = instanceId(parent, '_name')
      } = parent.props;

      let checked = contains(item, parent._values(), parent.props.valueField)
        , type = multiple ? 'checkbox' : 'radio';

      return (
        <ListOption
          {...this.props}
          role={type}
          aria-checked={!!checked}
        >
          <label onMouseDown={this.handleMouseDown}>
            <input
              name={name}
              type={type}
              tabIndex='-1'
              role='presentation'
              checked={checked}
              disabled={disabled || readonly}
              onChange={this.handleChange}
            />
              { children }
          </label>
        </ListOption>
      );


    }
  })
}

export default createUncontrolledWidget(
    SelectList, { value: 'onChange' }, ['selectAll', 'focus']);
