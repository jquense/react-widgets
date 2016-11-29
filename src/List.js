import React   from 'react';
import ListOption from './ListOption';
import * as CustomPropTypes from './util/PropTypes';
import compat from './util/compat';
import cn from 'classnames';
import { result }  from './util/_';
import * as Props from './util/Props';
import { instanceId, notify } from './util/widgetHelpers';
import { isDisabledItem }  from './util/interaction';

import ListMovementMixin from './mixins/ListMovementMixin';

export default React.createClass({

  displayName: 'List',

  mixins: [
    ListMovementMixin
  ],

  propTypes: {
    role: React.PropTypes.string,
    data: React.PropTypes.array,
    onSelect: React.PropTypes.func,
    onMove: React.PropTypes.func,

    optionComponent: CustomPropTypes.elementType,
    itemComponent: CustomPropTypes.elementType,

    activeId: React.PropTypes.string,
    selectedItem: React.PropTypes.any,
    focusedItem: React.PropTypes.any,
    valueAccessor: React.PropTypes.func.isRequired,
    textAccessor: React.PropTypes.func.isRequired,

    disabled: CustomPropTypes.disabled.acceptsArray,

    messages: React.PropTypes.shape({
      emptyList: CustomPropTypes.message
    })
  },


  getDefaultProps(){
    return {
      onSelect: ()=>{},
      optionComponent: ListOption,
      data: [],
      messages: {
        emptyList:   'There are no items in this list'
      }
    }
  },

  componentDidMount() {
    this.move()
  },

  componentDidUpdate() {
    this.move()
  },

  render(){
    var {
        className
      , role
      , data
      , activeId
      , textAccessor
      , valueAccessor
      , focusedItem
      , selectedItem
      , messages
      , onSelect
      , itemComponent: ItemComponent
      , optionComponent: Option } = this.props

    let id = instanceId(this)
      , items;

    let elementProps = Props.pickElementProps(this);

    items = !data.length
      ? (
        <li className='rw-list-empty'>
          {result(messages.emptyList, this.props)}
        </li>
      ) : data.map((item, idx) => {
          let isDisabled = isDisabledItem(item, this.props);
          let isFocused = focusedItem === item;
          let id = isFocused ? activeId : undefined;

          return (
            <Option
              id={id}
              key={'item_' + idx}
              dataItem={item}
              disabled={isDisabled}
              focused={isFocused}
              selected={selectedItem === item}
              onClick={isDisabled ? undefined : onSelect.bind(null, item)}
            >
              {ItemComponent
                ? <ItemComponent
                    item={item}
                    value={valueAccessor(item)}
                    text={textAccessor(item)}
                    disabled={isDisabled}
                  />
                : textAccessor(item)
              }
            </Option>
          )
        });

    return (
      <ul
        id={id}
        tabIndex='-1'
        className={cn(className, 'rw-list')}
        role={role === undefined ? 'listbox' : role}
        {...elementProps}
      >
        { items }
      </ul>
    )
  },

  _data(){
    return this.props.data
  },

  move() {
    var list = compat.findDOMNode(this)
      , idx  = this._data().indexOf(this.props.focusedItem)
      , selected = list.children[idx];

    if( !selected ) return

    notify(this.props.onMove, [selected, list, this.props.focusedItem])
  }

})
