var React   = require('react/addons')
  , filter  = require('../util/filter')
  , compose = require('../util/compose')
  , mergePropsInto = require('../util/transferProps')
  , cx = React.addons.classSet
  , $  =  require('zepto')
  , _  =  require('lodash');

var DefaultListItem = React.createClass({

  mixins: [ require('../mixins/DataHelpersMixin')],

  render: function(){
      var item = this.props.item;

      return this.transferPropsTo(<li>{ item ? this._dataText(item) : '' }</li>)
  }
})

module.exports = React.createClass({

  mixins: [ 
    require('../mixins/DataHelpersMixin'), 
    require('../mixins/TextSearchMixin')('focused')
  ],

  propTypes: {
    data:          React.PropTypes.array,
    value:         React.PropTypes.any,
    listItem:      React.PropTypes.component,
    valueField:    React.PropTypes.string,
    textField:     React.PropTypes.string,
    //keyboard nav delay
    jumpToItem:    React.PropTypes.bool,
    delay:         React.PropTypes.number,

    //filter options
    filterType:    React.PropTypes.string,
    searchTerm:    React.PropTypes.string,
    caseSensitive: React.PropTypes.bool,
    minLength:     React.PropTypes.number,

    messages:      React.PropTypes.shape({
      emptyList:   React.PropTypes.string,
      emptyFilter: React.PropTypes.string
    }),
  },

	getInitialState: function(){
    return this.getDefaultState(this.props, this.props.searchTerm)
	},

  getDefaultState: function(props, refilter){
    var items = this.filter(props.data, props.searchTerm)
      , idx   = this._dataIndexOf(items, props.value)
    //console.log('state: ', idx, (this.state || {}).focused)
    return {
      filteredItems: items,
      selectedIndex: idx,
      focused: idx === -1 ? 0 : idx,
    }
  },

  getDefaultProps: function(){
    return {
      listItem:      DefaultListItem,
      jumpToItem:    true,
      filterType:    'contains',
      delay:         500,
      minLength:     1,
      caseSensitive: false,
      messages: {
        emptyList:   "There are no items in this list",
        emptyFilter: "The filter returned no results"
      }
    }
  },

  componentDidUpdate: function(prevProps, prevState){
    if ( prevState.focused !== this.state.focused)
      this._setScrollPosition()
  },

  componentWillReceiveProps: function(nextProps) {

    if(  nextProps.searchTerm !== this.props.searchTerm  
      || nextProps.value !== this.props.value)
      this.setState(
        this.getDefaultState(nextProps))
  },

	render: function(){
    var ListItem    = this.props.listItem
      , emptyList   = <li>{ this.props.messages.emptyList }</li>
      , emptyFilter = <li>{ this.props.messages.emptyFilter }</li>
      , items = _.map(this.state.filteredItems, (item, idx) => {
       
        return (
          <ListItem 
            item={item}
            textField={this.props.textField}
            valueField={this.props.valueField}
            unselectable='on'
            className={cx({ 
              'rw-state-focus':    idx === this.state.focused,
              'rw-state-selected': idx === this.state.selectedIndex,
            })}
            onClick={_.partial(this.props.onSelect, item, idx)}/>
        )
      });
    
		return mergePropsInto(_.omit(this.props, 'data', 'selectedIndex'),
			<ul className="rw-list" tabIndex="-1" onKeyDown={this._keyDown} onKeyPress={this.search}>
        { !this.props.data.length 
          ? emptyList 
          : !this.state.filteredItems.length
            ? emptyFilter
            : items  }
			</ul>
		)
	},

  _keyDown: function(e){
    var key = e.key
      , selected;

    if ( key === 'ArrowDown' ) 
      this.next()
    
    else if ( key === 'ArrowUp' )
      this.prev()

    else if ( key === 'Home' )
      this.focus(0)

    else if ( key === 'End' )
      this.focus(this.state.filteredItems.length - 1)

    else if ( key === 'Enter') {
      selected = this.state.filteredItems[this.state.focused]

      if ( selected)
        this.props.onSelect(
            selected, this.state.focused)
    }
    else if ( this.props.jumpToItem )
      this.search(String.fromCharCode(e.keyCode))
  },

  _setScrollPosition: function(){
    var list = this.getDOMNode()
      , selected = $(list).children().eq(this.state.focused)[0]
      , scrollTop, listHeight, selectedTop, selectedHeight, bottom;


    if (!selected) return

    scrollTop   = list.scrollTop
    listHeight  = list.clientHeight
    selectedTop = selected.offsetTop
    selectedHeight = selected.offsetHeight
    bottom =  selectedTop + selectedHeight

    list.scrollTop = scrollTop > selectedTop
      ? selectedTop
      : bottom > (scrollTop + listHeight) 
          ? (bottom - listHeight)
          : scrollTop
  },


  filter: function(items, searchTerm){
    var matches = filter[this.props.filterType];

    if ( !searchTerm || !searchTerm.trim() || searchTerm.length < (this.props.minLength || 1))
      return items

    if ( !this.props.caseSensitive)
      searchTerm = searchTerm.toLowerCase();

    return _.filter(items, function(item){
      var val = this._dataText(item);

      if ( !this.props.caseSensitive)
        val = val.toLowerCase();

      return matches(val, searchTerm.toLowerCase())
    }, this)
  }
})