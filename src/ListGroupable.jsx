'use strict';
var React   = require('react')
  , warning = require('react/lib/warning')
  , CustomPropTypes  = require('./util/propTypes')
  , compat = require('./util/compat')
  , cx = require('classnames')
  , _  = require('./util/_');


module.exports = React.createClass({

  displayName: 'List',

  mixins: [ 
    require('./mixins/WidgetMixin'),
    require('./mixins/DataHelpersMixin'),
    require('./mixins/ListMovementMixin')
  ],

  propTypes: {
    data:           React.PropTypes.array,
    onSelect:       React.PropTypes.func,
    onMove:         React.PropTypes.func,

    itemComponent:  CustomPropTypes.elementType,
    groupComponent: CustomPropTypes.elementType,

    selected:       React.PropTypes.any,
    focused:        React.PropTypes.any,

    valueField:     React.PropTypes.string,
    textField:      CustomPropTypes.accessor,
 
    optID:          React.PropTypes.string,

    groupBy:        CustomPropTypes.accessor,

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

  componentWillReceiveProps(nextProps) {
    var keys = [];

    if(nextProps.data !== this.props.data || nextProps.groupBy !== this.props.groupBy)
      this.setState({ 
        groups: this._group(nextProps.groupBy, nextProps.data, keys),
        sortedKeys: keys
      })
  },

  componentDidMount(prevProps, prevState){
    this.move()
  },

  componentDidUpdate(prevProps) {
    this.move()
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
        className={ (className || '') + ' rw-list  rw-list-grouped' } 
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

    warning(typeof groupBy !== 'string' || !data.length || _.has(data[0], groupBy)
      , `[React Widgets] You are seem to be trying to group this list by a ` 
      + `property \`${groupBy}\` that doesn't exist in the dataset items, this may be a typo`)

    return data.reduce( (grps, item) => {
      var group = iter(item);

      _.has(grps, group) 
        ? grps[group].push(item)
        : (keys.push(group), grps[group] = [item])

      return grps
    }, {}) 
  },

  _data(){ 
    var groups = this.state.groups;

    return this.state.sortedKeys
      .reduce( (flat, grp) => flat.concat(groups[grp]), [])
  },

  move() {
    var selected = this.getItemDOMNode(this.props.focused);

    if( !selected ) return 

    this.notify('onMove', [ selected, compat.findDOMNode(this), this.props.focused ])
  },

  getItemDOMNode(item){
    var list = compat.findDOMNode(this)
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