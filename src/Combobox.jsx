import React from 'react';
import cx from 'classnames';
import _  from './util/_';
import filter from './util/filter';
import Popup           from './Popup';
import Btn             from './WidgetButton';
import Input           from './ComboboxInput';
import compat          from './util/compat';
import CustomPropTypes from './util/propTypes';
import PlainList       from './List';
import GroupableList   from './ListGroupable';
import validateList    from './util/validateListInterface';
import createUncontrolledWidget from 'uncontrollable';
import ifNotDisabled from './util/ifNotDisabled';

let defaultSuggest = f => f === true ? 'startsWith' : f ? f : 'eq'

let { omit, pick, result } = _;


let propTypes = {
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

      disabled:       React.PropTypes.oneOfType([
                        React.PropTypes.bool,
                        React.PropTypes.oneOf(['disabled'])
                      ]),

      readOnly:       React.PropTypes.oneOfType([
                        React.PropTypes.bool,
                        React.PropTypes.oneOf(['readOnly'])
                      ]),

      suggest:        CustomPropTypes.filter,
      filter:         CustomPropTypes.filter,

      busy:           React.PropTypes.bool,

      dropUp:         React.PropTypes.bool,
      duration:       React.PropTypes.number, //popup

      placeholder:    React.PropTypes.string,

      messages:       React.PropTypes.shape({
        open:         CustomPropTypes.message,
        emptyList:    CustomPropTypes.message,
        emptyFilter:  CustomPropTypes.message
      })
    };

var ComboBox = React.createClass({

  displayName: 'ComboBox',

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/TimeoutMixin'),
    require('./mixins/DataFilterMixin'),
    require('./mixins/DataHelpersMixin'),
    require('./mixins/PopupScrollToMixin'),
    require('./mixins/RtlParentContextMixin'),
    require('./mixins/AriaDescendantMixin')('input')
  ],

  propTypes: propTypes,

  getInitialState(){
    var items = this.process(this.props.data, this.props.value)
      , idx   = this._dataIndexOf(items, this.props.value);

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
    var rawIdx = this._dataIndexOf(nextProps.data, nextProps.value)
      , valueItem = rawIdx === -1 ? nextProps.value : nextProps.data[rawIdx]
      , isSuggesting = this.refs.input.isSuggesting()
      , items = this.process(
          nextProps.data
        , nextProps.value
        , (rawIdx === -1 || isSuggesting) && this._dataText(valueItem) )

      , idx = this._dataIndexOf(items, nextProps.value)
      , focused = this.filterIndexOf(items, this._dataText(valueItem));

    this._searchTerm = '';

    this.setState({
      processedData:  items,
      selectedItem:   items[idx],
      focusedItem:    items[idx === -1
        ? focused !== -1 ? focused : 0 // focus the closest match
        : idx]
    })
  },

  render(){
    let {
        className, tabIndex, filter, suggest
      , groupBy, messages, data, busy, dropUp, name
      , placeholder, value, open, disabled, readOnly
      , listComponent: List } = this.props;

    List = List || (groupBy && GroupableList) || PlainList

    let elementProps = omit(this.props, Object.keys(propTypes));
    let listProps    = pick(this.props, Object.keys(compat.type(List).propTypes));
    let popupProps   = pick(this.props, Object.keys(compat.type(Popup).propTypes));

    let { focusedItem, selectedItem, focused } = this.state;

    let items = this._data()
      , valueItem = this._dataItem(data, value) // take value from the raw data
      , inputID = this._id('_input')
      , listID = this._id('_listbox')
      , completeType = this.props.suggest
          ? this.props.filter ? 'both' : 'inline'
          : this.props.filter ? 'list' : '';

    let shouldRenderList = _.isFirstFocusedRender(this) || open;

    messages = msgs(messages)

    return (
      <div
        {...elementProps}
        ref="element"
        onKeyDown={this._keyDown}
        onFocus={this._focus.bind(null, true)}
        onBlur ={this._focus.bind(null, false)}
        tabIndex={'-1'}
        className={cx(className, 'rw-combobox', 'rw-widget', {
          'rw-state-focus':     focused,
          'rw-state-disabled':  disabled,
          'rw-state-readonly':  readOnly,
          'rw-rtl':             this.isRtl(),

          ['rw-open' + (dropUp ? '-up' : '')]: open
         })}
      >
        <Btn
          tabIndex='-1'
          className='rw-select'
          onClick={this.toggle}
          disabled={!!(this.props.disabled || this.props.readOnly)}
        >
          <i className={cx('rw-i rw-i-caret-down', {'rw-loading': busy})}>
            <span className="rw-sr">
              { _.result(messages.open, this.props) }
            </span>
          </i>
        </Btn>
        <Input
          ref='input'
          id={inputID}
          tabIndex={tabIndex}
          suggest={suggest}
          name={name}
          role='combobox'
          aria-owns={listID}
          aria-busy={!!busy}
          aria-autocomplete={completeType}
          aria-expanded={open}
          aria-haspopup={true}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className='rw-input'
          value={ this._dataText(valueItem) }
          onChange={this._inputTyping}
          onKeyDown={this._inputKeyDown}
        />
        <Popup
          {...popupProps}
          onOpening={() => this.refs.list.forceUpdate()}
          onRequestClose={this.close}
        >
          <div>
            { shouldRenderList &&
              <List ref="list"
                {...listProps}
                id={listID}
                data={items}
                selected={selectedItem}
                focused ={focusedItem}
                aria-hidden={!open}
                aria-labelledby={inputID}
                aria-live={open && 'polite'}
                onSelect={this._onSelect}
                onMove={this._scrollTo}
                messages={{
                  emptyList: data.length
                    ? messages.emptyFilter
                    : messages.emptyList
                }}/>
            }
          </div>
        </Popup>
      </div>
    )
  },

  @ifNotDisabled
  _onSelect(data){
    this.close()
    this.notify('onSelect', data)
    this.change(data)
    this.focus();
  },

  _inputKeyDown(e){
    this._deleting = e.key === 'Backspace' || e.key === 'Delete'
    this._isTyping = true
  },

  _inputTyping(e){
    var self = this
      , shouldSuggest = !!this.props.suggest
      , strVal  = e.target.value
      , suggestion, data;

    suggestion = this._deleting || !shouldSuggest
      ? strVal : this.suggest(this._data(), strVal)

    suggestion = suggestion || strVal

    data = _.find(self.props.data,
      item => this._dataText(item).toLowerCase() === suggestion.toLowerCase())

    this.change(!this._deleting && data
      ? data
      : strVal, true)

    this.open()
  },

  focus() {
    this.refs.input.focus()
  },

  @ifNotDisabled(true)
  _focus(focused, e){

    !focused && this.refs.input.accept() //not suggesting anymore

    this.setTimeout('focus', () => {

      if( !focused) this.close()

      if( focused !== this.state.focused) {
        this.notify(focused ? 'onFocus' : 'onBlur', e)
        this.setState({ focused: focused })
      }
    })
  },

  @ifNotDisabled
  _keyDown(e){
    var self = this
      , key  = e.key
      , alt  = e.altKey
      , list = this.refs.list
      , focusedItem = this.state.focusedItem
      , selectedItem = this.state.selectedItem
      , isOpen = this.props.open;

    if ( key === 'End' )
      if ( isOpen ) this.setState({ focusedItem: list.last() })
      else          select(list.last(), true)

    else if ( key === 'Home' )
      if ( isOpen ) this.setState({ focusedItem: list.first() })
      else          select(list.first(), true)

    else if ( key === 'Escape' && isOpen )
      this.close()

    else if ( key === 'Enter' && isOpen ) {
      select(this.state.focusedItem, true)
    }

    else if ( key === 'ArrowDown' ) {
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

    this.notify('onKeyDown', [e])

    function select(item, fromList) {
      if(!item)
        return self.change(compat.findDOMNode(self.refs.input).value, false)

      self.refs.input.accept(true); //removes caret

      if(fromList)
        return self._onSelect(item)

      self.change(item, false)
    }
  },

  change(data, typing){
    this._typedChange = !!typing
    this.notify('onChange', data)
  },

  open(){
    if ( !this.props.open )
      this.notify('onToggle', true)
  },

  close(){
    if ( this.props.open )
      this.notify('onToggle', false)
  },

  @ifNotDisabled
  toggle(){
    this.focus()

    this.props.open
      ? this.close()
      : this.open()
  },

  suggest(data, value) {
    var word = this._dataText(value)
      , suggest = defaultSuggest(this.props.suggest)
      , suggestion;

    if ( !(word || '').trim() || word.length < (this.props.minLength || 1))
      return ''

    suggestion = typeof value === 'string'
        ? _.find(data, getFilter(suggest, word, this))
        : value

    if ( suggestion && (!this.state || !this.state.deleting))
      return this._dataText(suggestion)

    return ''
  },

  _data() {
    return this.state.processedData
  },

  process(data, values, searchTerm) {
    if( this.props.filter && searchTerm)
      data = this.filter(data, searchTerm)

    return data
  }
})

function msgs(msgs){
  return {
    open: 'open combobox',
    emptyList:   'There are no items in this list',
    emptyFilter: 'The filter returned no results',
    ...msgs
  }
}

function getFilter(suggest, word, ctx){
  return typeof suggest === 'string'
      ? item => filter[suggest](ctx._dataText(item).toLowerCase(), word.toLowerCase())
      : item => suggest(item, word)
}

let UncontrolledComboBox = createUncontrolledWidget(
      ComboBox, { open: 'onToggle', value: 'onChange' });

UncontrolledComboBox.BaseComboBox = ComboBox

export default UncontrolledComboBox;
