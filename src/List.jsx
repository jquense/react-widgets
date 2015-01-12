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
    data:          React.PropTypes.array,
    onSelect:      React.PropTypes.func,
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
      onSelect:      function(){},
      data:          [],
      messages: {
        emptyList:   "There are no items in this list"
      }
    }
  },

  getInitialState: function(){
    var data = this.props.data;

    return {
      selectedIndex: data.indexOf(this.props.selected),
      focusedIndex:  data.indexOf(this.props.focused),
    }
  },

  // componentWillReceiveProps: function(props){
  //   var data = props.data
  //     , focusIdx = data.indexOf(props.focused)
  //     , selectIdx = data.indexOf(props.selected);

  //   if( selectIdx !== -1) this.setSelectedIndex(selectIdx)
  //   if( focusIdx !== -1)  this.setFocusedIndex(focusIdx)
  // },

  componentDidMount: function(prevProps, prevState){
    this._setScrollPosition()
  },

  componentDidUpdate: function(prevProps, prevState){
    if ( prevState.focused !== this.props.focused)
      this._setScrollPosition()
  },

	render: function(){
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
    return this.props.data 
  },

  _findNextInstance: function(data, word, current, dir){
    var matcher = filter.startsWith;
      
    return _.find(this._data(), (item, i) => { 
      return (dir === 'next' ? i > current : i < current)
          && matcher(
              this._dataText.call(this, item).toLowerCase()
            , word.toLowerCase())
    });    
  },

  _setScrollPosition: function(){
    var list = this.getDOMNode()
      , idx  = this._data().indexOf(this.props.focused)
      , selected = list.children[idx];

    if( !selected ) return 

    // timeout allows for element to become visible
    setTimeout(() => scrollTo(selected, list))
  }

})
