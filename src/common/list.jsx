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

  displayName: 'List',

  mixins: [ 
    require('../mixins/DataHelpersMixin')
  ],

  propTypes: {
    data:          React.PropTypes.array,
    value:         React.PropTypes.any,
    listItem:      React.PropTypes.component,
    valueField:    React.PropTypes.string,
    textField:     React.PropTypes.string,

    optID:         React.PropTypes.string,

    messages:      React.PropTypes.shape({
      emptyList:   React.PropTypes.string
    }),
  },


  getDefaultProps: function(){
    return {
      listItem:      DefaultListItem,
      delay:         500,
      optID:         '',
      messages: {
        emptyList:   "There are no items in this list"
      }
    }
  },

  componentDidUpdate: function(prevProps, prevState){
    if ( prevProps.focusedIndex !== this.props.focusedIndex)
      this._setScrollPosition()
  },


	render: function(){
    var ListItem    = this.props.listItem
      , emptyList   = <li>{ this.props.messages.emptyList }</li>
      , emptyFilter = <li>{ this.props.messages.emptyFilter }</li>
      , items = _.map(this.props.data, (item, idx) => {
        var focused = idx === this.props.focusedIndex;

        return (
          <ListItem 
            item={item}
            role='option'
            id={ focused ? this.props.optID : '' }
            aria-selected={ idx === this.props.selectedIndex }
            textField={this.props.textField}
            valueField={this.props.valueField}
            unselectable='on'
            className={cx({ 
              'rw-state-focus':    focused,
              'rw-state-selected': idx === this.props.selectedIndex,
            })}
            onClick={_.partial(this.props.onSelect, item, idx)}/>
        )
      });
    
		return mergePropsInto(_.omit(this.props, 'data', 'selectedIndex'),
			<ul 
        className="rw-list" 
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
      , selected = $(list).children().eq(this.props.focusedIndex)[0]
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
  }

})