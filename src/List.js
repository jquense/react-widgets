import React   from 'react';
import ListOption from './ListOption';
import CustomPropTypes from './util/propTypes';
import compat from './util/compat';
import cn from 'classnames';
import _  from './util/_';
import { dataText, dataValue } from './util/dataHelpers';
import { instanceId, notify } from './util/widgetHelpers';
import { isDisabledItem }  from './util/interaction';


export default React.createClass({

  displayName: 'List',

  mixins: [
    require('./mixins/ListMovementMixin')
  ],

  propTypes: {
    data: React.PropTypes.array,
    onSelect: React.PropTypes.func,
    onMove: React.PropTypes.func,

    optionComponent: CustomPropTypes.elementType,
    itemComponent: CustomPropTypes.elementType,

    activeId: React.PropTypes.string,
    selected: React.PropTypes.any,
    focused: React.PropTypes.any,
    valueField: CustomPropTypes.accessor,
    textField: CustomPropTypes.accessor,

    disabled: CustomPropTypes.disabled.acceptsArray,

    messages: React.PropTypes.shape({
      emptyList: CustomPropTypes.message
    })
  },


  getDefaultProps(){
    return {
      onSelect: ()=>{},
      optionComponent: ListOption,
      ariaActiveDescendantKey: 'list',
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
      , textField
      , valueField
      , focused
      , selected
      , messages
      , onSelect
      , itemComponent: ItemComponent
      , optionComponent: Option } = this.props

    let id = instanceId(this)
      , items;

    let elementProps = _.omitOwnProps(this);

    items = !data.length
      ? (
        <li className='rw-list-empty'>
          {_.result(messages.emptyList, this.props)}
        </li>
      ) : data.map((item, idx) => {
          let isDisabled = isDisabledItem(item, this.props);
          let isFocused = focused === item;
          let id = isFocused ? activeId : undefined;

          return (
            <Option
              id={id}
              key={'item_' + idx}
              dataItem={item}
              disabled={isDisabled}
              focused={isFocused}
              selected={selected === item}
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
  },

  _data(){
    return this.props.data
  },

  move() {
    var list = compat.findDOMNode(this)
      , idx  = this._data().indexOf(this.props.focused)
      , selected = list.children[idx];

    if( !selected ) return

    notify(this.props.onMove, [ selected, list, this.props.focused ])
  }

})
