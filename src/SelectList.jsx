import React from 'react';
import _  from './util/_';
import cx from 'classnames';
import createUncontrolledWidget from 'uncontrollable';
import compat from './util/compat';

import CustomPropTypes  from './util/propTypes';
import PlainList        from './List';

import validateList from './util/validateListInterface';
import scrollTo from 'dom-helpers/util/scrollTo';

import { dataItem } from './util/dataHelpers';
import { widgetEditable, widgetEnabled } from './util/interaction';

import { instanceId, notify } from './util/widgetHelpers';
import {
    move, contains
  , isDisabled, isReadOnly
  , isDisabledItem, isReadOnlyItem } from './util/interaction';

let { omit, pick } = _;

let propTypes = {

    data:           React.PropTypes.array,
    value:          React.PropTypes.oneOfType([
                      React.PropTypes.any,
                      React.PropTypes.array
                    ]),
    onChange:       React.PropTypes.func,
    onMove:         React.PropTypes.func,

    multiple:       React.PropTypes.bool,

    itemComponent:  CustomPropTypes.elementType,
    listComponent:  CustomPropTypes.elementType,

    valueField:     React.PropTypes.string,
    textField:      CustomPropTypes.accessor,

    busy:           React.PropTypes.bool,

    filter:         React.PropTypes.string,
    delay:          React.PropTypes.number,

    disabled:       CustomPropTypes.disabled.acceptsArray,
    readOnly:       CustomPropTypes.readOnly.acceptsArray,

    messages:       React.PropTypes.shape({
      emptyList:    React.PropTypes.string
    })
  }


var SelectList = React.createClass({

  propTypes: propTypes,

  mixins: [
    require('./mixins/TimeoutMixin'),
    require('./mixins/RtlParentContextMixin'),
    require('./mixins/AriaDescendantMixin')()
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

  getDefaultState(props){
    var { data, value, valueField, multiple } = props
      , isRadio = !multiple
      , values  = _.splat(value)
      , first   = isRadio && dataItem(data, values[0], valueField)

    first = isRadio && first
      ? first
      : ((this.state || {}).focusedItem || null)

    return {
      focusedItem: first,
      dataItems:   !isRadio && values.map(item => dataItem(data, item, valueField))
    }
  },

  getInitialState(){
    var state = this.getDefaultState(this.props)

    state.ListItem = getListItem(this)

    return state
  },

  componentWillReceiveProps(nextProps) {
    return this.setState(this.getDefaultState(nextProps))
  },

  componentDidMount() {
    validateList(this.refs.list)
  },

  render() {
    let {
        className, tabIndex, busy
      , listComponent: List } = this.props;

    List = List ||  PlainList

    let elementProps = omit(this.props, Object.keys(propTypes));
    let listProps    = pick(this.props, Object.keys(List.propTypes));

    let { ListItem, focusedItem, focused } = this.state;

    let items = this._data()
      , listID = instanceId(this, '_listbox');

    focusedItem = focused
      && !isDisabled(this.props)
      && !isReadOnly(this.props)
      && focusedItem;

    return (
      <div {...elementProps}
        onKeyDown={this._keyDown}
        onFocus={this._focus.bind(null, true)}
        onBlur={this._focus.bind(null, false)}
        role={'radiogroup'}
        aria-busy={!!busy}
        aria-disabled={isDisabled(this.props)}
        aria-readonly={isReadOnly(this.props)}
        tabIndex={'-1'}
        className={cx(className, 'rw-widget', 'rw-selectlist', {
          'rw-state-focus':    focused,
          'rw-state-disabled': isDisabled(this.props),
          'rw-state-readonly': isReadOnly(this.props),
          'rw-rtl':            this.isRtl(),
          'rw-loading-mask':   busy
        })}
      >
        <List
          {...listProps}
          ref='list'
          id={listID}
          role={'radiogroup'}
          tabIndex={tabIndex || '0'}
          data={items}
          focused={focusedItem}
          optionComponent={ListItem}
          itemComponent={this.props.itemComponent}
          onMove={this._scrollTo}
        />
      </div>
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
  _keyDown(e) {
    var key = e.key
      , { valueField, multiple } = this.props
      , list = this.refs.list
      , focusedItem = this.state.focusedItem
      , props = this.props;


    let moveItem = (dir, item)=> move(dir, item, props, list);
    let change = (item) => {
      if (item)
        this._change(item, multiple
            ? !contains(item, this._values(), valueField) // toggle value
            : true)
    }

    notify(this.props.onKeyDown, [e])

    if (e.defaultPrevented)
      return

    if (key === 'End') {
      e.preventDefault()

      if (multiple) this.setState({ focusedItem: moveItem('prev', null) })
      else          change(moveItem('prev', null))
    }
    else if (key === 'Home' ) {
      e.preventDefault()

      if (multiple) this.setState({ focusedItem: moveItem('next', null) })
      else          change(moveItem('next', null))
    }
    else if (key === 'Enter' || key === ' ' ) {
      e.preventDefault()
      change(focusedItem)
    }
    else if (key === 'ArrowDown' || key === 'ArrowRight' ) {
      e.preventDefault()

      if (multiple) this.setState({ focusedItem: moveItem('next', focusedItem) })
      else          change(moveItem('next', focusedItem))
    }
    else if (key === 'ArrowUp' || key === 'ArrowLeft'  ) {
      e.preventDefault()

      if (multiple) this.setState({ focusedItem: moveItem('prev', focusedItem) })
      else          change(moveItem('prev', focusedItem))
    }
    else if (multiple && e.keyCode === 65 && e.ctrlKey ) {
      e.preventDefault()
      this.selectAll()
    }
    else
      this.search(String.fromCharCode(e.keyCode))
  },

  selectAll(){
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

  _change(item, checked){
    var { multiple } = this.props
      , values = this.state.dataItems;

    multiple  = !!multiple

    if ( !multiple )
      return notify(this.props.onChange, checked ? item : null)

    values = checked
      ? values.concat(item)
      : values.filter( v => v !== item)

    notify(this.props.onChange, [values || []])
  },

  @widgetEnabled
  _focus(focused, e) {

    if( focused) compat.findDOMNode(this.refs.list).focus()

    this.setTimeout('focus', () => {
      if( focused !== this.state.focused){
        notify(this.props[focused ? 'onFocus' : 'onBlur'], e)
        this.setState({ focused: focused })
      }
    })
  },

  search(character) {
    var word = ((this._searchTerm || '') + character).toLowerCase()
      , list = this.refs.list;

    this._searchTerm = word

    this.setTimeout('search', () => {
      var focusedItem = list.next(this.state.focusedItem, word);

      this._searchTerm = ''

      if ( focusedItem)
        this.setState({ focusedItem })

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

    render() {
      let {
          children, focused, selected
        , dataItem: item
        , ...props } = this.props;

      let { multiple, name = instanceId(parent, '_name') } = parent.props;

      let checked   = contains(item, parent._values(), parent.props.valueField)
        , change    = parent._change.bind(null, item)
        , disabled  = isDisabledItem(item, parent.props)
        , readonly  = isReadOnlyItem(item, parent.props)
        , type = multiple ? 'checkbox' : 'radio';

      return (
        <li
          {...props}
          tabIndex='-1'
          role={type}
          aria-checked={!!checked}
          aria-disabled={disabled || readonly}
          className={cx('rw-list-option', {
            'rw-state-focus':    focused,
            'rw-state-selected': selected,
            'rw-state-disabled': disabled,
            'rw-state-readonly': readonly
          })}
        >
          <label>
            <input
              name={name}
              tabIndex='-1'
              role='presentation'
              type={type}
              onChange={onChange}
              checked={checked}
              disabled={disabled || readonly}
            />
              { children }
          </label>
        </li>
      );

      function onChange(e){
        if (!disabled && !readonly)
          change(e.target.checked)
      }
    }
  })
}

export default createUncontrolledWidget(
    SelectList, { value: 'onChange' }, ['selectAll']);
