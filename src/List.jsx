'use strict';
var React   = require('react')
  , CustomPropTypes  = require('./util/propTypes')
  , filter = require('./util/filter')
  , cx = require('./util/cx')
  , _  = require('./util/_');


module.exports = React.createClass({

  displayName: 'List',

  mixins: [ 
    require('./mixins/DataHelpersMixin'),

    require('./mixins/DataIndexStateMixin')('focusedIndex'),
    require('./mixins/DataIndexStateMixin')('selectedIndex')
  ],

  propTypes: {
    data:          React.PropTypes.array,
    onSelect:      React.PropTypes.func,
    listItem:      CustomPropTypes.elementType,

    selectedIndex: React.PropTypes.number,
    focusedIndex:  React.PropTypes.number,
    valueField:    React.PropTypes.string,
    textField:     React.PropTypes.string,

    optID:         React.PropTypes.string,

    messages:      React.PropTypes.shape({
      emptyList:   React.PropTypes.string
    }),
  },


  getDefaultProps: function(){
    return {
      optID:         '',
      onSelect:      function(){},
      data:          [],
      messages: {
        emptyList:   "There are no items in this list"
      }
    }
  },

  getInitialState: function(){
    var data = this.props.data;

    return {
      selectedIndex: data.indexOf(this.props.selected),
      focusedIndex:  data.indexOf(this.props.focused),
    }
  },

  componentWillReceiveProps: function(props){
    var data = props.data;

    this.setSelectedIndex(data.indexOf(props.selected))
    this.setFocusedIndex(data.indexOf(props.focused))
  },

  componentDidMount: function(prevProps, prevState){
    this._setScrollPosition()
  },

  componentDidUpdate: function(prevProps, prevState){
    if ( prevState.focusedIndex !== this.state.focusedIndex)
      this._setScrollPosition()
  },

	render: function(){
    var { className, ...props } = _.omit(this.props, ['data'])
      , ItemComponent = this.props.listItem
      , items;
    

    items = !this.props.data.length 
      ? <li>{ this.props.messages.emptyList }</li>
      : this.props.data.map((item, idx) =>{
          var focused = this.state.focusedIndex === idx;

          return (<li 
            key={'item_' + idx}
            role='option'
            id={ focused ? this.props.optID : undefined }
            aria-selected={ idx === this.state.selectedIndex }
            className={cx({ 
              'rw-state-focus':    focused,
              'rw-state-selected': idx === this.state.selectedIndex,
            })}
            onClick={this.props.onSelect.bind(null, item)}>
            { ItemComponent
                ? <ItemComponent item={item}/>
                : this._dataText(item)
            }
          </li>)
        });
    
		return (
			<ul { ...props } 
        className={ className + ' rw-list' } 
        ref='scrollable'
        role='listbox'>
          { items }
			</ul>
		)
	},

  first(){
    return this.props.data[0]
  },

  last(){
    return this.props.data[this.props.data.length -1]
  },

  nextSelected(word){
    return this.props.data[word 
      ? this._findNextWordIndex(word, this.state.selectedIndex, 'next')
      : this.nextSelectedIndex()]
  },

  prevSelected(word){
    return this.props.data[ word
      ? this._findNextWordIndex(word, this.state.selectedIndex, 'next')
      : this.prevSelectedIndex()]
  },

  nextFocused(word){
    return this.props.data[word
      ? this._findNextWordIndex(word, this.state.focusedIndex, 'next')
      : this.nextFocusedIndex()]
  },

  prevFocused(word){
    return this.props.data[word
      ? this._findNextWordIndex(word, this.state.focusedIndex, 'prev')
      : this.prevFocusedIndex()]
  },

  _data(){ 
    return this.props.data 
  },

  _findNextWordIndex: function(word, current, dir){
    var matcher = filter.startsWith
      , self    = this;
      
    return _.findIndex(self._data(), (item, i) => { 
      return (dir === 'next' ? i >= current : i <= current)
          && matcher(
              this._dataText.call(self, item).toLowerCase()
            , word.toLowerCase())
    });    
  },

  _setScrollPosition: function(){
    var list = this.getDOMNode()
      , selected = list.children[this.state.focusedIndex]
      , scrollTop, listHeight, selectedTop, selectedHeight, bottom;

    if( !selected ) return 

    scrollTop   = list.scrollTop
    listHeight  = list.clientHeight

    selectedTop =  selected.offsetTop
    selectedHeight = selected.offsetHeight

    bottom =  selectedTop + selectedHeight

    list.scrollTop = scrollTop > selectedTop
      ? selectedTop
      : bottom > (scrollTop + listHeight) 
          ? (bottom - listHeight)
          : scrollTop
  }

})