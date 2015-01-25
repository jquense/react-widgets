'use strict';
var React   = require('react')
  , CustomPropTypes  = require('./util/propTypes')
  , cx = require('./util/cx')
  , _  = require('./util/_')
  , scrollTo  = require('./util/scroll');


module.exports = React.createClass({

  displayName: 'List',

  mixins: [ 
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
    textField:     React.PropTypes.string,

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


  componentDidMount(prevProps, prevState){
    this._setScrollPosition()
  },

  componentDidUpdate(prevProps, prevState){
    if ( prevState.focused !== this.props.focused)
      this._setScrollPosition()
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
        className={ (className + '') + ' rw-list' } 
        ref='scrollable'
        role='listbox'>
          { items }
			</ul>
		)
	},


  _data(){ 
    return this.props.data 
  },

  _setScrollPosition: function(){
    var list = this.getDOMNode()
      , idx  = this._data().indexOf(this.props.focused)
      , selected = list.children[idx]
      , handler  = this.props.onMove || scrollTo;

    if( !selected ) return 

    // timeout allows for element to become visible
    setTimeout(() => handler(selected, list))
  }

})
