/**
 * @jsx React.DOM
 */

var React = require('react')
  , _  = require('lodash')
  , cx = require('../util/cx')
  , $  =  require('../util/dom')
  , scrollTo = require('../util/scroll')
  , controlledInput  = require('../util/controlledInput')
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps;

var propTypes = {
    data:          React.PropTypes.array,
    value:         React.PropTypes.oneOfType([
                    React.PropTypes.any,
                    React.PropTypes.array
                   ]),
    onChange:      React.PropTypes.func,

    multiple:      React.PropTypes.bool,
    itemComponent: React.PropTypes.component,
    
    valueField:    React.PropTypes.string,
    textField:     React.PropTypes.string,

    busy:           React.PropTypes.bool,

    delay:          React.PropTypes.number, 

    disabled:       React.PropTypes.oneOfType([
                        React.PropTypes.array,
                        React.PropTypes.bool,
                        React.PropTypes.oneOf(['disabled'])
                      ]),

    readOnly:       React.PropTypes.oneOfType([
                      React.PropTypes.bool,
                      React.PropTypes.array,
                      React.PropTypes.oneOf(['readonly'])
                    ]),

    messages:      React.PropTypes.shape({
      emptyList:   React.PropTypes.string
    }),
  }

var CheckboxList = React.createClass({

  propTypes: propTypes,

  mixins: [
    require('../mixins/WidgetMixin'),
    require('../mixins/TextSearchMixin'),
    require('../mixins/DataHelpersMixin'),
    require('../mixins/RtlParentContextMixin'),
    require('../mixins/DataIndexStateMixin')('focusedIndex', 'isDisabledItem')
  ],

  getDefaultProps: function(){
    return {
      delay: 250,
      value: [],
      data:  [],
      messages: {
        emptyList: 'There are no items in this list'
      }
    }
  },

  getInitialState: function(){
    var values = this.props.value == null ? []: [].concat(this.props.value)
      , idx = 0, data = this._data(), l = data.length;

    while( idx < l && this.isDisabledItem(data[idx])) idx++

    return {
      focusedIndex: idx <= l ? idx : -1,
      dataItems: _.map(values, function(item){
        return this._dataItem(this.props.data, item)
      }, this)
    }
  },

  componentDidUpdate: function(prevProps, prevState){
    if ( prevState.focusedIndex !== this.state.focusedIndex)
      this._setScrollPosition()
  },

  componentWillReceiveProps: function(nextProps) {
    var values = nextProps.value == null ? [] : [].concat(nextProps.value)
      //, idx = this._dataIndexOf(nextProps.data, values[0])
      //, data = nextProps.data, l = data.length;

    // idx = idx === -1 ? 0 : idx

    // while( idx < l && this.isDisabledItem(data[idx])) idx++

    this.setState({
      //focusedIndex: idx <= l ? idx : 0,
      dataItems: _.map(values, item => this._dataItem(nextProps.data, item))
    })
  },

  render: function() {
    var focus = this._maybeHandle(_.partial(this._focus, true), true)
      , optID = this._id('_selected_option')
      , blur  = _.partial(this._focus, false);

    return mergeIntoProps(
      _.omit(this.props, _.keys(propTypes)),
      <ul 
        onKeyDown={this._maybeHandle(this._keyDown)}
        onFocus={focus}
        onBlur ={blur}
        tabIndex='0'
        role='listbox'
        aria-busy={!!this.props.busy}
        aria-activedescendent={ this.state.focused ? optID : undefined }
        aria-disabled={ this.props.disabled }
        aria-readonly={ this.props.readOnly }
        className={cx({ 
          'rw-widget':         true,
          'rw-checkboxlist':   true,
          'rw-state-focus':    this.state.focused,
          'rw-state-disabled': this.isDisabled(),
          'rw-state-readonly': this.isReadOnly(),
          'rw-rtl':            this.isRtl()
        })}>
        { this._rows(optID)}
      </ul> 
    );
  },

  _rows: function(optID){
    var component = this.props.itemComponent
      , name = this._id('_name')
      , type = this.props.multiple ? 'checkbox' : 'radio';

    return _.map(this._data(), function(item, idx){
      var focused  = this.state.focused && this.state.focusedIndex === idx
        , text     = this._dataText(item)
        , checked  = this._contains(item, this._values())
        , change   = _.partial(this._change, item)
        , disabled = this.isDisabledItem(item)
        , readonly = this.isReadOnlyItem(item);

      return (<li 
        key={'item_' + idx}
        role='option'
        id={ focused ? optID : undefined }
        className={cx({ 'rw-state-focus': focused, 'rw-selectlist-item': true })}>
        <SelectListItem type={type} name={name} onChange={change} 
          checked={checked} 
          readOnly={readonly}
          disabled={disabled || readonly}>
          { component && component({ item: item }) || text }
        </SelectListItem>
      </li>)
    }, this)
  },

  _keyDown: function(e){
    var self = this
      , key = e.key
      , multiple = !!this.props.multiple;

    if ( key === 'End' ) {
      this.prev(this._data().length - 1)
      e.preventDefault()
    }
    else if ( key === 'Home' ) {
      this.next(0)
      e.preventDefault()
    }
    else if ( key === 'Enter' || key === ' ' ) {
      var item = this._data()[this.state.focusedIndex]
      this._change(item, !this._contains(item, this._values()))
      e.preventDefault()
    }
    else if ( key === 'ArrowDown' || key === 'ArrowRight' ) {
      if ( multiple ) this.setFocusedIndex(this.nextFocusedIndex())
      else            this._change(this._data()[this.nextFocusedIndex()])

      e.preventDefault()
    }
    else if ( key === 'ArrowUp' || key === 'ArrowLeft'  ) {
      if ( multiple ) this.setFocusedIndex(this.prevFocusedIndex())
      else            this._change(this._data()[this.prevFocusedIndex()])

      e.preventDefault()
    }
    else if (this.props.multiple && e.keyCode === 65 && e.ctrlKey ) {
      this._selectAll()
      e.preventDefault()
    }
    else
      this.search(
          String.fromCharCode(e.keyCode)
        , this._locate)
  },

  _selectAll: function(){
    var values = this.state.dataItems
      , disabled = this.props.disabled || this.props.readOnly
      , data = this._data()
      , blacklist;

    disabled = _.isArray(disabled) ? disabled : [];
    //disabled values that are not selected
    blacklist = _.reject(disabled, v => this._contains(v, values))
    data      = _.reject(data,     v => this._contains(v, blacklist))

    if ( data.length === values.length) {
      data = _.filter(disabled,    v => this._contains(v, values))
      data = _.map(data,           v => this._dataItem(this._data(), v))
    }

    this.notify('onChange', [data])
  },

  _change: function(item, checked){
    var multiple  = !!this.props.multiple
      , blacklist = this.props.disabled || this.props.readOnly 
      , values    = this.state.dataItems;

    blacklist = _.isArray(blacklist) ? blacklist : [];

    if(this._contains(item, blacklist)) return 

    if ( !multiple )
      return this.notify('onChange', checked ? item : null)

    values = checked 
      ? values.concat(item)
      : _.without(values, item)

    this._allSelected = false
    this.notify('onChange', [values || []])
  },

  _focus: function(focused, e){
    var self = this;

    clearTimeout(self.timer)

    self.timer = setTimeout(function(){
      if( focused) self.getDOMNode().focus()
      if( focused !== self.state.focused){
        self.setState({ focused: focused })
        !focused && self.next(0)
      }
    }, 0)
  },

  isDisabledItem: function(item) {
    return this.isDisabled() || this._contains(item, this.props.disabled)
  },

  isReadOnlyItem: function(item) {
    return this.isReadOnly() || this._contains(item, this.props.readOnly)
  },

  _locate: function(word){
    var idx = this.findNextWordIndex(word, this.state.focusedIndex);

    if ( idx !== -1) 
      this.setFocusedIndex(idx)
  },

  _data:function(){
    return this.props.data
  },

  _contains: function(item, values){
    return _.isArray(values) 
      ? _.any(values, _.partial(this._valueMatcher, item))
      : this._valueMatcher(item, values)
  },

  _values: function(){
    return !!this.props.multiple 
      ? this.state.dataItems
      : this.props.value
  },

  _setScrollPosition: function(){
    var list = this.getDOMNode()
      , selected = list.children[this.state.focusedIndex]
      , handler  = this.props.onMove || scrollTo;

    handler(selected)
  },

  next: function(nextIdx){
    var data = this._data()
      , l = data.length;

    while( nextIdx < l && this.isDisabledItem(data[nextIdx]) ) nextIdx++
    if ( nextIdx <= l ) this.setFocusedIndex(nextIdx)
  },

  prev: function(nextIdx){
    var data = this._data();

    while( nextIdx > -1 && this.isDisabledItem(data[nextIdx]) ) nextIdx--
    if ( nextIdx >= 0 ) this.setFocusedIndex(nextIdx)
  }
});

var SelectListItem = React.createClass({

  render: function() {
    var props = this.props;

    return (
      <label className={cx({ 
          'rw-state-disabled': props.disabled,
          'rw-state-readonly': props.readOnly
        })}>
        { mergeIntoProps(props, 
          <input tabIndex='-1' onChange={change} 
            disabled={props.disabled ||props.readOnly }
            aria-disabled={ props.disabled ||props.readOnly } />)
        }
        { this.props.children }
      </label>
    );

    function change(e){
      if( !props.disabled && !props.readOnly)
        props.onChange(e.target.checked)
    }
  },

})

module.exports = CheckboxList;