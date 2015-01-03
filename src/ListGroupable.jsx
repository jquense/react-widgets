'use strict';
var React   = require('react')
  , CustomPropTypes  = require('./util/propTypes')
  , cx = require('./util/cx')
  , _  = require('./util/_');


module.exports = React.createClass({

  displayName: 'List',

  mixins: [ 
    require('./mixins/DataHelpersMixin')
  ],

  propTypes: {
    data:          React.PropTypes.array,
    onSelect:      React.PropTypes.func,
    listItem:      CustomPropTypes.elementType,

    selected:      React.PropTypes.any,
    focused:       React.PropTypes.any,

    selectedIndex: React.PropTypes.number,
    focusedIndex:  React.PropTypes.number,

    valueField:    React.PropTypes.string,
    textField:     React.PropTypes.string,

    optID:         React.PropTypes.string,

    groupBy:       React.PropTypes.oneOfType([
                    React.PropTypes.func,
                    React.PropTypes.string
                   ]),

    messages:      React.PropTypes.shape({
      emptyList:   React.PropTypes.string
    }),
  },


  getDefaultProps: function(){
    return {
      delay:         500,
      optID:         '',
      onSelect:      function(){},
      data:          [],
      messages: {
        emptyList:   "There are no items in this list"
      }
    }
  },

  getInitialState: function() {
    return {
      groups: this._group(this.props.groupBy, this.props.data)
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.data !== this.props.data || nextProps.groupBy !== this.props.groupBy)
      this.setState({ 
        groups: this._group(nextProps.groupBy, nextProps.data)
      })
  },

  componentDidMount: function(prevProps, prevState){
    this._setScrollPosition()
  },

  componentDidUpdate: function(prevProps, prevState){
    if ( prevProps.focused !== this.props.focused)
      this._setScrollPosition()
  },

  render: function(){
    var { 
        className
      , ...props } = _.omit(this.props, ['data', 'selectedIndex'])
      , groups = this.state.groups
      , items = []
      , idx = -1
      , group;
    
    if ( this.props.data.length ){
      for( var key in groups ) if ( groups.hasOwnProperty( key)){
        //idx++;
        group = groups[key]

        items.push(this._renderGroupHeader(key))

        for (var itemIdx = 0; itemIdx < group.length; itemIdx++) 
          items.push(
            this._renderItem(key, group[itemIdx], ++idx))
      } 
    }
    else 
      items = <li>{ this.props.messages.emptyList }</li>

    return (
      <ul { ...props }
        className={ className + ' rw-list' } 
        ref='scrollable'
        role='listbox'
        onKeyDown={() => console.log('did it')}
        tabIndex="-1">
        { items }
      </ul>
    )
  },

  _renderGroupHeader(group){
    var ItemComponent = this.props.groupItem;

    return (<li 
      key={'item_' + group}
      role='presentation'
      tabIndex='-1'

      className='rw-list-optgroup'>
        { ItemComponent ? <ItemComponent item={group}/> : group }
    </li>)
  },

  _renderItem(group, item, idx){
    var focused  = this.props.focused  === item
      , selected = this.props.selected === item
      , ItemComponent = this.props.listItem;

    return (
      <li 
        key={'item_' + group + '_' + idx}
        role='option'
        id={ focused ? this.props.optID : undefined }
        aria-selected={selected}
        onClick={this.props.onSelect.bind(null, item)}
        className={cx({ 
          'rw-state-focus':    focused,
          'rw-state-selected': selected,
          'rw-list-option':    true
        })}>
          { ItemComponent
              ? <ItemComponent item={item}/>
              : this._dataText(item)
          }
      </li>)
  },

  _isIndexOf(idx, item){
    return this.props.data[idx] === item
  },

  _group(groupBy, data){
    var iter = typeof groupBy === 'function' ? groupBy : item => item[groupBy]
    return data.reduce( (grps, item) => {
      var group = iter(item);

      _.has(grps, group) 
        ? grps[group].push(item)
        : (grps[group] = [item])

      return grps
    }, {}) 
  },

  _setScrollPosition: function(){
    var list = this.getDOMNode()
      , selected = this.getItemDOMNode(this.props.focused)
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
  },

  getItemDOMNode(item){
    var list = this.getDOMNode()
      , groups = this.state.groups
      , itemIdx, idx = -1;

    for( var group in groups ) if ( groups.hasOwnProperty( group)) {
      itemIdx = groups[group].indexOf(item)
      idx++;

      if( itemIdx !== -1) 
        return list.children[idx + itemIdx + 1]

      idx += groups[group].length
    }
  }

})