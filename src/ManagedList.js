import React   from 'react';
import ListOption from './ListOption';
import CustomPropTypes from './util/propTypes';
import compat from './util/compat';
import cn from 'classnames';
import { result }  from './util/_';
import * as Props from './util/Props';
import { dataText, dataValue } from './util/dataHelpers';
import { instanceId, notify } from './util/widgetHelpers';
import { isDisabledItem }  from './util/interaction';


export default class List extends React.Component {

  static propTypes =- {
    role: React.PropTypes.string,
    data: React.PropTypes.array,
    onSelect: React.PropTypes.func,
    onMove: React.PropTypes.func,

    optionComponent: CustomPropTypes.elementType,
    itemComponent: CustomPropTypes.elementType,

    activeId: React.PropTypes.string,
    selectedItem: React.PropTypes.any,
    focusedItem: React.PropTypes.any,
    value: React.PropTypes.func.isRequired,
    text: React.PropTypes.func.isRequired,

    disabled: React.PropTypes.array,

    messages: React.PropTypes.shape({
      emptyList: CustomPropTypes.message
    })
  }

  static defaultProps = {
    onSelect: ()=>{},
    optionComponent: ListOption,
    data: [],
    messages: {
      emptyList: 'There are no items in this list'
    }
  }

  componentDidMount() {
    this.move()
  }

  componentDidUpdate() {
    this.move()
  }

  render(){
    var {
        className
      , role
      , data
      , activeId
      , focusedItem
      , selectedItem
      , messages
      , onSelect
      , itemComponent: ItemComponent
      , optionComponent: Option } = this.props

    let id = instanceId(this)
      , items;

    let elementProps = Props.omitOwn(this);

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
              focusedItem={isFocused}
              selectedItem={selectedItem === item}
              onClick={isDisabled ? undefined : onSelect.bind(null, item)}
            >
              {ItemComponent
                ? <ItemComponent
                    item={item}
                    value={dataValue(item, valueField)}
                    text={dataText(item, textField)}
                    disabled={isDisabled}
                  />
                : dataText(item, textField)
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
  }

  move() {
    let list = compat.findDOMNode(this)
    let idx  = this._data().indexOf(this.props.focusedItem)
    let selectedItem = list.children[idx];

    if (!selectedItem ) return

    notify(this.props.onMove, [ selectedItem, list, this.props.focusedItem ])
  }
}
