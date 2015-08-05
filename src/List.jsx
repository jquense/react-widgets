'use strict';
var React   = require('react')
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
    data:          React.PropTypes.array,
    onSelect:      React.PropTypes.func,
    onMove:        React.PropTypes.func,
    itemComponent: CustomPropTypes.elementType,

    selectedIndex: React.PropTypes.number,
    focusedIndex:  React.PropTypes.number,
    valueField:    React.PropTypes.string,
    textField:     CustomPropTypes.accessor,

    optID:         React.PropTypes.string,

    messages:      React.PropTypes.shape({
      emptyList:   CustomPropTypes.message
    })
  },


  getDefaultProps: function(){
    return {
      optID:         '',
      onSelect:      ()=>{},
      data:          [],
      messages: {
        emptyList:   'There are no items in this list'
      }
    }
  },

  getInitialState(){
    return {}
  },


  componentDidMount(){
    this.move()
  },

  componentDidUpdate(){
    this.move()
  },

  render(){
    var { className, role, ...props } = _.omit(this.props, ['data'])
      , ItemComponent = this.props.itemComponent
      , id = this.props.id || this._id('_list')
      , optID = this.props.optID
      , items;

    items = !this.props.data.length
      ? <li className='rw-list-empty'>{ _.result(this.props.messages.emptyList, this.props) }</li>
      : this.props.data.map((item, idx) =>{
          var focused  = item === this.props.focused
            , selected = item === this.props.selected
            , defaultOptID = id + '_option_' + idx;

          optID = optID || defaultOptID;

          return (<li
            tabIndex='-1'
            key={'item_' + idx}
            role={role === 'listbox' ? 'option' : 'presentation'}
            id={focused ? optID : defaultOptID}
            aria-selected={selected || void 0}
            className={cx({
              'rw-list-option':    true,
              'rw-state-focus':    focused,
              'rw-state-selected': selected
            })}
            onClick={this.props.onSelect.bind(null, item)}>
            { ItemComponent
                ? <ItemComponent item={item} value={this._dataValue(item)} text={this._dataText(item)}/>
                : this._dataText(item)
            }
          </li>)
        });

    return (
      <ul { ...props }
        tabIndex={props.tabIndex || '-1'}
        className={ (className || '') + ' rw-list' }
        ref='scrollable'
        role={role !== undefined ? role : 'listbox'}
       // aria-activedescendant={optID ? optID : undefined}
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
