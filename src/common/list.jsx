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
    delay:         React.PropTypes.number,

    //filter options
    filterType:    React.PropTypes.string,
    searchTerm:    React.PropTypes.string,
  },

	getInitialState: function(){
    return this.getDefaultState(this.props, this.props.searchTerm)
	},

  getDefaultState: function(props, refilter){

    if(  props.searchTerm === this.props.searchTerm 
      && props.value === this.props.value)
      return { filteredItems: props.data }
    
    var items = this.filter(props.data, props.searchTerm)
      , idx   = this._dataIndexOf(items, props.value)

    return {
      filteredItems: items,
      selectedIndex: idx,
      focused: idx === -1 ? 0 : idx,
    }
  },

  getDefaultProps: function(){
    return {
      listItem:   DefaultListItem,
      filterType: 'contains',
      delay: 500
    }
  },

  componentDidUpdate: function(prevProps, prevState){
    if ( prevState.focused !== this.state.focused)
      this._setScrollPosition()
  },

  componentWillReceiveProps: function(nextProps) {

    this.setState(
      this.getDefaultState(nextProps, nextProps.searchTerm !== this.props.searchTerm))
  },

	render: function(){
    var ListItem = this.props.listItem;
    console.log(this.state.filteredItems.length)
		return mergePropsInto(_.omit(this.props, 'data', 'selectedIndex'),
			<ul className="rw-list" tabIndex="-1" onKeyUp={this._keyUp} onKeyPress={this.search}>
        { _.map(this.state.filteredItems, (item, idx) => {
          return (
            <ListItem 
              item={item}
              textField={this.props.textField}
              valueField={this.props.valueField}
              className={cx({ 
                'rw-state-hover':    idx === this.state.hovering, 
                'rw-state-focus':    idx === this.state.focused,
                'rw-state-selected': idx === this.state.selectedIndex,
              })}
              onClick={_.partial(this.props.onSelect, item, idx)}
              onMouseEnter={_.partial(this._onHover, idx)}
              onMouseLeave={_.partial(this._onHover, null)} />
          )
        })}
			</ul>
		)
	},

  _keyUp: function(e){
    var key = e.key;

    if ( key === 'ArrowDown' ) 
      this.next()
    
    else if ( key === 'ArrowUp' )
      this.prev()

    else if ( key === 'Home' )
      this.setState({ focused: 0 })

    else if ( key === 'End' )
      this.setState({ focused: this.props.data.length - 1 })

    else if ( key === 'Enter')
      this.props.onSelect(
          this.props.data[this.state.focused]
        , this.state.focused)
    else
      this.search(String.fromCharCode(e.keyCode))
  },

  _setScrollPosition: function(){
    var list = this.getDOMNode()
      , selected = $(list).children().eq(this.state.focused)[0]
      , scrollTop, listHeight, selectedTop, selectedHeight, bottom;

    console.log(selected)
    if (!selected) return

    scrollTop   = list.scrollTop
    listHeight  = list.clientHeight
    selectedTop = selected.offsetTop
    selectedHeight = selected.offsetHeight
    bottom =  selectedTop + selectedHeight

    console.log(bottom, listHeight, scrollTop)

    list.scrollTop = scrollTop > selectedTop
      ? selectedTop
      : bottom > (scrollTop + listHeight) 
          ? (bottom - listHeight)
          : scrollTop
  },

  _onHover: function(idx, e){
    this.setState({ hovering: idx })
  },

	_getAnchor: function(){
		return this.refs.input.getDOMNode()
	},

  filter: function(items, searchTerm){
    var matches = filter[this.props.filterType];

    if ( !searchTerm || !searchTerm.trim() || searchTerm.length < 3)
      return items

    return _.filter(items, function(item){
      var val = this._dataText(item).toLowerCase();

      return matches(val, searchTerm.toLowerCase())
    }, this)
  }
})