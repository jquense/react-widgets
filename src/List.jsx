import React   from 'react';
import ListOption from './ListOption';
import CustomPropTypes from './util/propTypes';
import compat from './util/compat';
import cn from 'classnames';
import _  from './util/_';


export default React.createClass({

  displayName: 'List',

  mixins: [
    require('./mixins/WidgetMixin'),
    require('./mixins/DataHelpersMixin'),
    require('./mixins/ListMovementMixin')
  ],

  propTypes: {
    data:          React.PropTypes.array,
    onSelect:      React.PropTypes.func,
    onMove:        React.PropTypes.func,

    optionComponent: CustomPropTypes.elementType,
    itemComponent:   CustomPropTypes.elementType,

    selectedIndex: React.PropTypes.number,
    focusedIndex:  React.PropTypes.number,
    valueField:    React.PropTypes.string,
    textField:     CustomPropTypes.accessor,

    optID:         React.PropTypes.string,

    messages:      React.PropTypes.shape({
      emptyList:   CustomPropTypes.message
    })
  },


  getDefaultProps(){
    return {
      optID:  '',
      onSelect: ()=>{},
      optionComponent: ListOption,
      data: [],
      messages: {
        emptyList:   'There are no items in this list'
      }
    }
  },

  componentDidMount(){
    this.move()
  },

  componentDidUpdate(){
    this.move()
  },

  render(){
    var {
        className, role, data, optID, id = this._id('_list')
      , focused, selected, messages, onSelect
      , itemComponent: ItemComponent
      , optionComponent: Option
      , ...props  } = this.props
      , items;


    items = !data.length
      ? (
        <li className='rw-list-empty'>
          {_.result(messages.emptyList, this.props)}
        </li>
      ) : data.map((item, idx) =>{
          var defaultOptID = id + '_option_' + idx;

          return (
            <Option
              key={'item_' + idx}
              id={item === focused ? (optID || defaultOptID) : defaultOptID}
              dataItem={item}
              focused={focused === item}
              selected={selected === item}
              onClick={onSelect.bind(null, item)}
            >
              { ItemComponent
                ? <ItemComponent item={item} value={this._dataValue(item)} text={this._dataText(item)}/>
                : this._dataText(item)
              }
            </Option>
          )
        });

    return (
      <ul
        tabIndex='-1'
        className={cn(className, 'rw-list')}
        role={role === undefined ? 'listbox' : role}
        { ...props }
      >
        { items }
      </ul>
    )
  },

  _data(){
    return this.props.data
  },

  move(){
    var list = compat.findDOMNode(this)
      , idx  = this._data().indexOf(this.props.focused)
      , selected = list.children[idx];

    if( !selected ) return

    this.notify('onMove', [ selected, list, this.props.focused ])
  }

})
