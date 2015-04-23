'use strict';
var React           = require('react')
  , cx              = require('classnames')
  , _               = require('./util/_')
  , filter          = require('./util/filter')
  , Popup           = require('./Popup')
  , Btn             = require('./WidgetButton')
  , Input           = require('./ComboboxInput')
  , compat          = require('./util/compat')
  , CustomPropTypes = require('./util/propTypes')
  , PlainList       = require('./List')
  , GroupableList   = require('./ListGroupable')
  , validateList    = require('./util/validateListInterface')
  , createUncontrolledWidget = require('uncontrollable');

var propTypes = {
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

      suggest:        React.PropTypes.bool,
      busy:           React.PropTypes.bool,

      dropUp:          React.PropTypes.bool,
      duration:       React.PropTypes.number, //popup

      placeholder:    React.PropTypes.string,

      messages:       React.PropTypes.shape({
        open:         React.PropTypes.string,
        emptyList:    React.PropTypes.string,
        emptyFilter:  React.PropTypes.string
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
    require('./mixins/RtlParentContextMixin')
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

      messages: {
        open: 'open combobox',
        emptyList:   "There are no items in this list",
        emptyFilter: "The filter returned no results"
      }
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
      , valueItem = rawIdx == -1 ? nextProps.value : nextProps.data[rawIdx]
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
    var { 
        className
      , ...props } = _.omit(this.props, Object.keys(propTypes))
      , valueItem = this._dataItem( this._data(), this.props.value )
      , items = this._data()
      , listID = this._id('_listbox')
      , optID  = this._id( '_option')
      , dropUp = this.props.dropUp
      , renderList = _.isFirstFocusedRender(this) || this.props.open
      , List   = this.props.listComponent || (this.props.groupBy && GroupableList) || PlainList
      , completeType = this.props.suggest
          ? this.props.filter ? 'both' : 'inline'
          : this.props.filter ? 'list' : '';

    return (
      <div {...props }
        ref="element"
        role='combobox'
        onKeyDown={this._keyDown}
        onFocus={this._focus.bind(null, true)}
        onBlur ={this._focus.bind(null, false)}
        tabIndex="-1"
        className={cx(className, 'rw-combobox', 'rw-widget', {
          'rw-state-focus':     this.state.focused,
          'rw-state-disabled':  this.props.disabled,
          'rw-state-readonly':  this.props.readOnly,
          'rw-rtl':             this.isRtl(),

          ['rw-open' + (dropUp ? '-up' : '')]: this.props.open
         })}>
        <Btn
          tabIndex='-1'
          className='rw-select'
          onClick={this.toggle}
          disabled={!!(this.props.disabled || this.props.readOnly)}>
          <i className={"rw-i rw-i-caret-down" + (this.props.busy ? ' rw-loading' : "")}>
            <span className="rw-sr">{ this.props.messages.open }</span>
          </i>
        </Btn>
        <Input
          ref='input'
          type='text'
          suggest={this.props.suggest}
          name={this.props.name}
          aria-owns={listID}
          aria-busy={!!this.props.busy}
          aria-autocomplete={completeType}
          aria-activedescendent={ this.props.open ? optID : undefined }
          aria-expanded={ this.props.open }
          aria-haspopup={true}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          readOnly={this.props.readOnly}
          className='rw-input'
          value={ this._dataText(valueItem) }
          onChange={this._inputTyping}
          onKeyDown={this._inputKeyDown}/>

        <Popup 
          {..._.pick(
              this.props
            , Object.keys(compat.type(Popup).propTypes))
          }
          onOpening={() => this.refs.list.forceUpdate()}
          onRequestClose={this.close}>
          <div>
            { renderList && 
              <List ref="list"
                {..._.pick(this.props, Object.keys(compat.type(List).propTypes))}
                id={listID}
                optID={optID}
                aria-hidden={ !this.props.open }
                aria-live={ completeType && 'polite' }
                data={items}
                selected={this.state.selectedItem}
                focused ={this.state.focusedItem}
                onSelect={this._onSelect}
                onMove={this._scrollTo}
                messages={{
                  emptyList: this.props.data.length
                    ? this.props.messages.emptyFilter
                    : this.props.messages.emptyList
                }}/>
            }
          </div>
        </Popup>
      </div>
    )
  },

  _onSelect: _.ifNotDisabled(function(data){
    this.close()
    this.notify('onSelect', data)
    this.change(data)
    this._focus(true);
  }),

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

  _focus: _.ifNotDisabled(true, function(focused, e){
    clearTimeout(this.timer)
    !focused && this.refs.input.accept() //not suggesting anymore

    this.timer = setTimeout(() =>{
      if(focused) this.refs.input.focus()
      else        this.close()

      if( focused !== this.state.focused){
        this.notify(focused ? 'onFocus' : 'onBlur', e)
        this.setState({ focused })
      }
    }, 0)
  }),

  _keyDown: _.ifNotDisabled(function(e){
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
      this.close()
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
        self.notify('onSelect', item)

      self.change(item, false)
    }
  }),

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

  toggle: _.ifNotDisabled(function(e){
    this._focus(true)

    this.props.open
      ? this.close()
      : this.open()
  }),

  suggest(data, value){
    var word = this._dataText(value)
      , matcher = filter.startsWith
      , suggestion = typeof value === 'string'
          ? _.find(data, finder, this)
          : value

    if ( suggestion && (!this.state || !this.state.deleting))
      return this._dataText(suggestion)

    return ''

    function finder(item){
      return matcher(
          this._dataText(item).toLowerCase()
        , word.toLowerCase())
    }
  },

  _data(){
    return this.state.processedData
  },

  process(data, values, searchTerm){
    if( this.props.filter && searchTerm)
      data = this.filter(data, searchTerm)

    return data
  }
})

module.exports = createUncontrolledWidget(
      ComboBox, { open: 'onToggle', value: 'onChange' });

module.exports.BaseComboBox = ComboBox