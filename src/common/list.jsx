var React   = require('react')
  , filter  = require('../util/filter')
  , compose = require('../util/compose')
  , transferProps  = require('../util/transferProps')
  , mergeIntoProps = transferProps.mergeIntoProps
  , cloneWithProps = transferProps.cloneWithProps
  , cx = require('../util/cx')
  , _  = require('lodash');

var DefaultListItem = React.createClass({

  mixins: [ 
    require('../mixins/DataHelpersMixin'),
    require('../mixins/RtlChildContextMixin')
  ],

  render: function(){
      var item = this.props.item;

      return this.transferPropsTo(<li>{ item ? this._dataText(item) : '' }</li>)
  }
})

module.exports = React.createClass({

  displayName: 'List',

  mixins: [ 
    require('../mixins/DataHelpersMixin')
  ],

  propTypes: {
    data:          React.PropTypes.array,
    onSelect:      React.PropTypes.func,
    listItem:      React.PropTypes.component,
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
      delay:         500,
      optID:         '',
      onSelect:      _.noop,
      data:          [],
      messages: {
        emptyList:   "There are no items in this list"
      }
    }
  },

  componentDidMount: function(prevProps, prevState){
    this._setScrollPosition()
  },

  componentDidUpdate: function(prevProps, prevState){
    if ( prevProps.focusedIndex !== this.props.focusedIndex)
      this._setScrollPosition()
  },

	render: function(){
    var emptyList   = <li>{ this.props.messages.emptyList }</li>
      , emptyFilter = <li>{ this.props.messages.emptyFilter }</li>
      , items;

    
    items = _.map(this.props.data, function(item, idx){
      var focused = this.props.focusedIndex === idx;

      return (<li 
        key={'item_' + idx}
        role='option'
        id={ focused ? this.props.optID : undefined }
        aria-selected={ idx === this.props.selectedIndex }
        className={cx({ 
          'rw-state-focus':    focused,
          'rw-state-selected': idx === this.props.selectedIndex,
        })}
        onClick={_.partial(this.props.onSelect, item, idx)}>
        { this.props.listItem 
            ? this.props.listItem({ item: item })
            : this._dataText(item)
         }
      </li>)
    }, this);
    
		return mergeIntoProps(
      _.omit(this.props, 'data', 'selectedIndex'),
			<ul 
        className="rw-list" 
        ref='scrollable'
        role='listbox'
        tabIndex="-1" 
        onKeyDown={this._keyDown}
        onKeyPress={this.search}>
        { !this.props.data.length 
          ? emptyList 
          : items }
			</ul>
		)
	},

  _setScrollPosition: function(){
    var list = this.getDOMNode()
      , selected = list.children[this.props.focusedIndex]
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