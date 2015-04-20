'use strict';
var React   = require('react')
  , CustomPropTypes  = require('./util/propTypes')
  , compat = require('./util/compat')
  , cx = require('classnames')
  , _  = require('./util/_')
  , $  = require('./util/dom');


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
      emptyList:   React.PropTypes.string
    }),
  },


  getDefaultProps: function(){
    return {
      optID:         '',
      onSelect:      ()=>{},
      data:          [],
      messages: {
        emptyList:   "There are no items in this list"
      }
    }
  },

  getInitialState(){
    return {}
  },


  componentDidMount(){
    this.move()
  },

  componentDidUpdate(prevProps){
    this.move()
  },

  render(){
    var { className, ...props } = _.omit(this.props, ['data'])
      , ItemComponent = this.props.itemComponent
      , items;
    
    items = !this.props.data.length 
      ? <li>{ this.props.messages.emptyList }</li>
      : this.props.data.map((item, idx) =>{
          var focused  = item === this.props.focused 
            , selected = item === this.props.selected;

          return (<li 
            tabIndex='-1'
            key={'item_' + idx}
            role='option'
            id={ focused ? this.props.optID : undefined }
            aria-selected={selected}
            className={cx({ 
              'rw-list-option':    true,
              'rw-state-focus':    focused,
              'rw-state-selected': selected,
            })}
            onClick={this.props.onSelect.bind(null, item)}>
            { ItemComponent
                ? <ItemComponent item={item}/>
                : this._dataText(item)
            }
          </li>)
        });
    
    return (
      <ul { ...props } 
        className={ (className || '') + ' rw-list' } 
        ref='scrollable'
        role='listbox'>
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
