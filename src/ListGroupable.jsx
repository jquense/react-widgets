import React   from 'react';
import ListOption from './ListOption';
import CustomPropTypes from './util/propTypes';
import compat from './util/compat';
import cn from 'classnames';
import _  from './util/_';
import warning from 'warning';
import { dataText, dataValue } from './util/dataHelpers';
import { instanceId, notify } from './util/widgetHelpers';

let optionId = (id, idx)=> `${id}__option__${idx}`;

export default React.createClass({

  displayName: 'List',

  mixins: [
    require('./mixins/ListMovementMixin'),
    require('./mixins/AriaDescendantMixin')()
  ],

  propTypes: {
    data:           React.PropTypes.array,
    onSelect:       React.PropTypes.func,
    onMove:         React.PropTypes.func,

    optionComponent: CustomPropTypes.elementType,
    itemComponent:   CustomPropTypes.elementType,
    groupComponent:  CustomPropTypes.elementType,

    selected:       React.PropTypes.any,
    focused:        React.PropTypes.any,

    valueField:     React.PropTypes.string,
    textField:      CustomPropTypes.accessor,

    optID:          React.PropTypes.string,

    groupBy:        CustomPropTypes.accessor,

    messages:       React.PropTypes.shape({
      emptyList:    CustomPropTypes.message
    })
  },


  getDefaultProps(){
    return {
      optID:         '',
      onSelect:      function(){},
      data:          [],
      optionComponent: ListOption,
      ariaActiveDescendantKey: 'groupedList',
      messages: {
        emptyList:   'There are no items in this list'
      }
    }
  },

  getInitialState() {
    var keys = [];

    return {
      groups: this._group(this.props.groupBy, this.props.data, keys),

      sortedKeys: keys
    };
  },

  componentWillReceiveProps(nextProps) {
    var keys = [];

    if (nextProps.data !== this.props.data || nextProps.groupBy !== this.props.groupBy)
      this.setState({
        groups: this._group(nextProps.groupBy, nextProps.data, keys),
        sortedKeys: keys
      })
  },

  componentDidMount(){
    this.move()
  },

  componentDidUpdate() {
    this.ariaActiveDescendant(this._currentActiveID)
    this.move()
  },

  render(){
    var {
        className, role, data
      , messages, onSelect, selectedIndex
      , ...props } = this.props
      , id = instanceId(this);

    let { sortedKeys, groups } = this.state;

    let items = []
      , idx = -1
      , group;

    this._currentActiveID = null;

    if (data.length) {
      items = sortedKeys
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
      items = <li className='rw-list-empty'>{ _.result(messages.emptyList, this.props) }</li>

    return (
      <ul
        ref='scrollable'
        id={id}
        tabIndex='-1'
        className={cn(className, 'rw-list', 'rw-list-grouped')}
        role={role === undefined ? 'listbox' : role }
        { ...props }
      >
        { items }
      </ul>
    )
  },

  _renderGroupHeader(group){
    var GroupComponent = this.props.groupComponent
      , id = instanceId(this);

    return (
      <li
        key={'item_' + group}
        tabIndex='-1'
        role="separator"
        id={id + '_group_' + group}
        className='rw-list-optgroup'
      >
        { GroupComponent ? <GroupComponent item={group}/> : group }
      </li>
    )
  },

  _renderItem(group, item, idx){
    let {
        focused, selected, onSelect
      , textField, valueField
      , itemComponent: ItemComponent
      , optionComponent: Option } = this.props

    let currentID = optionId(instanceId(this), idx);

    if (focused === item)
      this._currentActiveID = currentID;

    return (
      <Option
        key={'item_' + group + '_' + idx}
        id={currentID}
        dataItem={item}
        focused={focused === item}
        selected={selected === item}
        onClick={onSelect.bind(null, item)}
      >
        { ItemComponent
            ? <ItemComponent
                item={item}
                value={dataValue(item, valueField)}
                text={dataText(item, textField)}
              />
            : dataText(item, textField)
        }
      </Option>
    )
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

    notify(this.props.onMove, [ selected, compat.findDOMNode(this), this.props.focused ])
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
