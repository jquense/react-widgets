'use strict';
var React   = require('react')
  , CustomPropTypes  = require('./util/propTypes')
  , filter = require('./util/filter')
  , cx = require('./util/cx')
  , _  = require('./util/_')
  , scrollTo  = require('./util/scroll');


module.exports = React.createClass({

  displayName: 'List',

  mixins: [ 
    require('./mixins/DataHelpersMixin')
  ],

  propTypes: {
    data:           React.PropTypes.array,
    onSelect:       React.PropTypes.func,

    ItemComponent:  CustomPropTypes.elementType,
    GroupComponent: CustomPropTypes.elementType,

    selected:       React.PropTypes.any,
    focused:        React.PropTypes.any,

    valueField:     React.PropTypes.string,
    textField:      React.PropTypes.string,
 
    optID:          React.PropTypes.string,

    groupBy:        React.PropTypes.oneOfType([
                     React.PropTypes.func,
                     React.PropTypes.string
                    ]),

    messages:       React.PropTypes.shape({
      emptyList:    React.PropTypes.string
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

  getInitialState: function() {
    var keys = [];

    return {
      groups: this._group(this.props.groupBy, this.props.data, keys),

      sortedKeys: keys
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var keys = [];

    if(nextProps.data !== this.props.data || nextProps.groupBy !== this.props.groupBy)
      this.setState({ 
        groups: this._group(nextProps.groupBy, nextProps.data, keys),
        sortedKeys: keys
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
      items = this.state.sortedKeys
        .reduce( (items, key) => {
          group = groups[key]
          items.push(this._renderGroupHeader(key))

          for (var itemIdx = 0; itemIdx < group.length; itemIdx++) 
            items.push(
              this._renderItem(key, group[itemIdx], ++idx))

          return items
        }, [])
    }
    else 
      items = <li>{ this.props.messages.emptyList }</li>

    return (
      <ul { ...props }
        className={ (className + '') + ' rw-list  rw-list-grouped' } 
        ref='scrollable'
        role='listbox'>
        { items }
      </ul>
    )
  },

  _renderGroupHeader(group){
    var ItemComponent = this.props.groupComponent;

    return (<li 
      key={'item_' + group}
      tabIndex='-1'
      role="separator"
      className='rw-list-optgroup'>
        { ItemComponent ? <ItemComponent item={group}/> : group }
    </li>)
  },

  _renderItem(group, item, idx){
    var focused  = this.props.focused  === item
      , selected = this.props.selected === item
      , ItemComponent = this.props.itemComponent;

    //console.log('hi')
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

  _group(groupBy, data, keys){
    var iter = typeof groupBy === 'function' ? groupBy : item => item[groupBy]

    // the keys array ensures that groups are rendered in the order they came in
    // which means that if you sort the data array it will render sorted, 
    // so long as you also sorted by group
    keys = keys || []

    return data.reduce( (grps, item) => {
      var group = iter(item);

      _.has(grps, group) 
        ? grps[group].push(item)
        : (keys.push(group), grps[group] = [item])

      return grps
    }, {}) 
  },

  first(){
    return this._data()[0]
  },

  last(){
    var data = this._data()
    return data[data.length-1]
  },

  prev(state, word){
    var data = this._data()
      , idx  = data.indexOf(this.props[state])

    return word 
      ? this._findNextInstance(data, word, idx, 'prev')
      : --idx < 0 ? data[0] : data[idx]
  },

  next(state,word){
    var data = this._data()
      , idx  = data.indexOf(this.props[state])

    return word 
      ? this._findNextInstance(data, word, idx, 'next')
      : ++idx === data.length ? data[data.length - 1] : data[idx]
  },

  _data(){ 
    var groups = this.state.groups;

    return this.state.sortedKeys
      .reduce( (flat, grp) => flat.concat(groups[grp]), [])
  },

  _findNextInstance: function(data, word, current, dir){
    var matcher = filter.startsWith;
      
    return _.find(data, (item, i) => { 
      return (dir === 'next' ? i > current : i < current)
          && matcher(
              this._dataText.call(this, item).toLowerCase()
            , word.toLowerCase())
    });    
  },

  _setScrollPosition: function(){
    var list = this.getDOMNode()
      , selected = this.getItemDOMNode(this.props.focused);

    if( !selected ) return 

    setTimeout(() => scrollTo(selected, list))
  },

  getItemDOMNode(item){
    var list = this.getDOMNode()
      , groups = this.state.groups
      , idx = -1
      , itemIdx, child;

    this.state.sortedKeys.some(group => {
      itemIdx = groups[group].indexOf(item)
      idx++;

      if( itemIdx !== -1) 
        return !!(child = list.children[idx + itemIdx + 1])

      idx += groups[group].length
    })

    return child
  }

})