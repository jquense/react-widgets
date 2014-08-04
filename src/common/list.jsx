var React   = require('react/addons')
  , filter  = require('../util/filter')
  , compose = require('../util/compose')
  , mergePropsInto = require('../util/transferProps')
  , cx = React.addons.classSet
  , $  =  require('zepto')
  , _  =  require('lodash');

var DefaultListItem = React.createClass({

  mixins: [ require('../mixins/DataHelpersMixin')],

  render: function(){
      var item = this.props.item;

      return this.transferPropsTo(<li>{ item ? this._dataText(item) : '' }</li>)
  }
})

module.exports = React.createClass({

  mixins: [ require('../mixins/DataHelpersMixin') ],

  propTypes: {
    data:          React.PropTypes.array,
    value:         React.PropTypes.any,
    listItem:      React.PropTypes.component,
    valueField:    React.PropTypes.string,
    textField:     React.PropTypes.string,
    delay:         React.PropTypes.number,
    filter:        React.PropTypes.string,
  },

	getInitialState: function(){
		return {
			hovering: null,
      searchTerm: '',
      selectedIndex: this._dataIndexOf(this.props.data, this.props.value),
      focused: 0
		}
	},

  getDefaultProps: function(){
    return {
      listItem: DefaultListItem,
      filter: 'startsWith',
      delay: 500
    }
  },

  componentDidUpdate: function(prevProps, prevState){
    console.log(this.state.selectedIndex, prevState.selectedIndex)
    if ( prevState.selectedIndex !== this.state.selectedIndex)
      this._setScrollPosition()
  },

  componentWillReceiveProps: function(nextProps) {
    //if the value changes reset views to the new one
    if ( !_.isEqual(nextProps.value, this.props.value))
      this.setState({
        selectedIndex: this._dataIndexOf(nextProps.data, nextProps.value)
      })
  },

	render: function(){
    var ListItem = this.props.listItem;

		return mergePropsInto(_.omit(this.props, 'data', 'selectedIndex'),
			<ul className="rw-list" tabIndex="-1" onKeyUp={this._keyUp} onKeyPress={this.search}>
        { _.map(this.props.data, (item, idx) => {
          return (
            <ListItem 
              item={item}
              textField={this.props.textField}
              valueField={this.props.valueField}
              className={cx({ 
                'rw-state-hover':    idx === this.state.hovering, 
                'rw-state-focus':    idx === this.state.focused,
                'rw-state-selected': idx === this.props.selectedIndex,
              })}
              onClick={_.partial(this.props.onSelect, item, idx)}
              onMouseEnter={_.partial(this._onHover, idx)}
              onMouseLeave={_.partial(this._onHover, null)} />
          )
        })}
			</ul>
		)
	},

  _keyUp: function(e){
    var key = e.key;

    if ( key === 'ArrowDown' ) 
      this.next()
    
    else if ( key === 'ArrowUp' )
      this.prev()

    else if ( key === 'Home' )
      this.setState({ focused: 0 })

    else if ( key === 'End' )
      this.setState({ focused: this.props.data.length - 1 })

    else if ( key === 'Enter')
      this.props.onSelect(
          this.props.data[this.state.focused]
        , this.state.focused)
  },

  next: function(){
    var nextIdx = this.state.focused + 1;

    if ( nextIdx >= this.props.data.length )
      nextIdx = 0;

    this.setState({
      focused: nextIdx
    })
  },

  prev: function(){
    var nextIdx = this.state.focused - 1;

    if ( nextIdx < 0 )
      nextIdx = this.props.data.length - 1;

    this.setState({
      focused: nextIdx
    })
  },

  search: function(e){
    var self = this
      , matches   = filter[this.props.filter]
      , character = String.fromCharCode(e.keyCode)
      , word      = (this.state.searchTerm + character).toLowerCase();
      
    clearTimeout(this.state.timer)

    this.setState({ 
      searchTerm: word,
      timer: setTimeout(function(){
          var index = _.findIndex(self.props.data, function(item, i) { 
                return i != self.state.focused 
                    && matches(self._dataText(item), word)
              });

          console.log(word, index)

          if ( index === -1 ) 
            index = self.state.focused

          self.setState({
            searchTerm: '',
            focused: index
          })

      }, this.props.delay)
    })    
  },

  _setScrollPosition: function(){
    var list = this.getDOMNode()
      , selected = $(list).children().eq(this.state.focused)[0]
      , scrollTop, listHeight, selectedTop, selectedHeight, bottom;

    if (!selected) return

    scrollTop   = list.scrollTop
    listHeight  = list.clientHeight
    selectedTop = selected.offsetTop
    selectedHeight = selected.offsetHeight
    bottom =  selectedTop + selectedHeight

    list.scrollTop = scrollTop > selectedTop
      ? selectedTop
      : bottom > (scrollTop + listHeight) 
          ? (bottom - listHeight)
          : scrollTop
  },

  _onHover: function(idx, e){
    this.setState({ hovering: idx })
  },

	_getAnchor: function(){
		return this.refs.input.getDOMNode()
	}
})