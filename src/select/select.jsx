'use strict';
var React = require('react')
  , cx = require('../util/cx')
  , _     =  require('lodash')
  , $     =  require('../util/dom')
  , directions = require('../util/constants').directions
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , SelectInput = require('./search-input.jsx')
  , TagList = require('./tag-list.jsx')
  , Popup = require('../popup/popup.jsx')
  , List  = require('../common/list.jsx');

var btn = require('../common/btn.jsx')
  , propTypes = {
      data:           React.PropTypes.array,
      value:          React.PropTypes.array,
      onChange:       React.PropTypes.func,

      valueField:     React.PropTypes.string,
      textField:      React.PropTypes.string,

      tagComponent:   React.PropTypes.func,
      itemComponent:  React.PropTypes.func,

      duration:       React.PropTypes.number, //popup

      placeholder:    React.PropTypes.string,

      disabled:       React.PropTypes.oneOfType([
                        React.PropTypes.bool,
                        React.PropTypes.array,
                        React.PropTypes.oneOf(['disabled'])
                      ]),

      readOnly:       React.PropTypes.oneOfType([
                        React.PropTypes.bool,
                        React.PropTypes.array,
                        React.PropTypes.oneOf(['readonly'])
                      ]),

      messages:       React.PropTypes.shape({
        open:         React.PropTypes.string,
        emptyList:    React.PropTypes.string,
        emptyFilter:  React.PropTypes.string
      })
    };

module.exports = React.createClass({

  displayName: 'Select',

  mixins: [
    require('../mixins/WidgetMixin'),
    require('../mixins/DataFilterMixin'),
    require('../mixins/DataHelpersMixin'),
    require('../mixins/RtlParentContextMixin'),
    require('../mixins/DataIndexStateMixin')('focusedIndex')
  ],

  propTypes: propTypes,

  getDefaultProps: function(){
    return {
      data: [],
      filter: 'startsWith',

      messages: {
        emptyList:   "There are no items in this list",
        emptyFilter: "The filter returned no results"
      }
    }
  },

  getInitialState: function(){
    var values = this.props.value == null
               ? []
               : [].concat(this.props.value)

    return {
      open:  false,
      processedData: this.process(this.props.data, this.props.value, ''),
      focusedIndex:  0,
      dataItems: _.map(values, function(item){
        return this._dataItem(this.props.data, item)
      }, this)
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var values = nextProps.value == null ? [] : [].concat(nextProps.value)
      , items = this.process(
          nextProps.data
        , nextProps.value
        , this.state.searchTerm)

    this.setState({
      //searchTerm: '',
      processedData: items,
      dataItems: _.map(values, function(item){
        return this._dataItem(nextProps.data, item)
      }, this)
    })
  },

  render: function(){
    var enabled = !(this.props.disabled === true || this.props.readOnly === true)
      , listID  = this._id('_listbox')
      , optID   = this._id('_option')
      , items   = this._data()
      , values  = this.state.dataItems;

    return mergeIntoProps(
      _.omit(this.props, _.keys(propTypes)),
      <div ref="element"
           onKeyDown={this._maybeHandle(this._keyDown)}
           onFocus={this._maybeHandle(_.partial(this._focus, true), true)}
           onBlur ={_.partial(this._focus, false)}
           tabIndex="-1"
           className={cx({
              'rw-select-list':    true,
              'rw-widget':         true,
              'rw-state-focus':    this.state.focused,
              'rw-state-disabled': this.props.disabled === true,
              'rw-state-readonly':  this.props.readOnly === true,
              'rw-open':           this.state.open,
              'rw-rtl':            this.isRtl()
            })}>
        <div className='rw-select-wrapper' onClick={this._maybeHandle(this._click)}>
          { this.props.busy &&
            <i className="rw-i rw-loading"></i>
          }
          { !!values.length &&
            <TagList
              ref='tagList'
              value={values}
              textField={this.props.textField}
              valueField={this.props.valueField}
              valueComponent={this.props.tagComponent}
              disabled={this.props.disabled}
              readOnly={this.props.readOnly}
              onDelete={this._delete}/>
          }
          <SelectInput
            ref='input'
            aria-activedescendent={ this.state.open ? optID : undefined }
            aria-expanded={ this.state.open }
            aria-busy={!!this.props.busy}
            aria-owns={listID}
            aria-haspopup={true}
            value={this.state.searchTerm}
            disabled={this.props.disabled === true}
            readOnly={this.props.readOnly === true}
            placeholder={this._placeholder()}
            onChange={this._typing}/>
        </div>
        <Popup open={this.state.open} onRequestClose={this.close} duration={this.props.duration}>
          <div>
            <List ref="list"
              id={listID}
              optID={optID}
              aria-autocomplete='list'
              aria-hidden={ !this.state.open }
              style={{ maxHeight: 200, height: 'auto' }}
              data={items}
              textField={this.props.textField}
              valueField={this.props.valueField}
              focusedIndex={this.state.focusedIndex}
              onSelect={this._maybeHandle(this._onSelect)}
              listItem={this.props.itemComponent}
              messages={{
                emptyList: this.props.data.length
                  ? this.props.messages.emptyFilter
                  : this.props.messages.emptyList
              }}/>
          </div>
        </Popup>
      </div>
    )
  },

  _data: function(){
    return this.state.processedData
  },

  _delete: function(value){
    this._focus(true)
    this.change(
      _.without(this.state.dataItems, value))
  },

  _click: function(e){
    this._focus(true)
    !this.state.open && this.open()
  },

  _focus: function(focused, e){
    var self = this;

    if (this.props.disabled === true )
      return

    clearTimeout(self.timer)

    self.timer = setTimeout(function(){
      if(focused) self.refs.input.focus()
      else        {
        self.close()
        self.refs.tagList && self.refs.tagList.clear()
      }

      if( focused !== self.state.focused)
        self.setState({ focused: focused })
    }, 0)
  },

  _typing: function(e){
    var items = this.process(this.props.data, this.props.value, e.target.value);

    this.setState({
      searchTerm: e.target.value,
      processedData: items,
      open: this.state.open || (this.state.open === false),
      focusedIndex: items.length >= this.state.focusedIndex
        ? 0
        : this.state.focusedIndex
    })
  },

  _onSelect: function(data){
    if( data === undefined )
      return //handle custom tags maybe here?

    this.change(this.state.dataItems.concat(data))
    this.close()
    this._focus(true)
  },

  _keyDown: function(e){
    var key = e.key
      , alt = e.altKey
      , searching = !!this.state.searchTerm
      , isOpen  = this.state.open
      , tagList = this.refs.tagList;

    if ( key === 'ArrowDown') {
      if ( isOpen ) this.setFocusedIndex(this.nextFocusedIndex())
      else          this.open()
    }
    else if ( key === 'ArrowUp') {
      if ( alt)          this.close()
      else if ( isOpen ) this.setFocusedIndex(
        this.prevFocusedIndex())
    }
    else if ( key === 'End'){
      if ( isOpen ) this.setFocusedIndex(this._data().length - 1)
      else          tagList && tagList.last()
    }
    else if (  key === 'Home'){
      if ( isOpen ) this.setFocusedIndex(0)
      else          tagList && tagList.first()
    }
    else if ( isOpen && key === 'Enter' )
      this._onSelect(this._data()[this.state.focusedIndex])

    else if ( key === 'Escape')
      isOpen ? this.close() : this.refs.tagList.clear()

    else if ( !searching && key === 'ArrowLeft')
     tagList && tagList.prev()

    else if ( !searching && key === 'ArrowRight')
      tagList && tagList.next()

    else if ( !searching && key === 'Delete')
      tagList && tagList.removeCurrent()

    else if ( !searching && key === 'Backspace')
      tagList && tagList.removeNext()
  },

  change: function(data){
    var change = this.props.onChange

    if ( change )
      change(data)
  },

  open: function(){
    if (!(this.props.disabled === true || this.props.readOnly === true))
      this.setState({ open: true })
  },

  close: function(){
    this.setState({ open: false })
  },

  toggle: function(e){
    this.state.open
      ? this.close()
      : this.open()
  },

  process: function(data, values, searchTerm){
    var items = _.reject(data, function(i){
        return _.any(
            values
          , _.partial(this._valueMatcher, i)
          , this)
      }, this)

    if( searchTerm)
      items = this.filter(items, searchTerm)

    return items
  },

  _placeholder: function(){
    return (this.props.value || []).length
      ? ''
      : (this.props.placeholder || '')
  }

})

