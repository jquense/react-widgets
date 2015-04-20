'use strict';
require('../src/less/react-widgets.less')

//require('react-a11y')();

var React = require('react/addons')
var index = require('../src')
var DropdownList = require('../src/DropdownList.jsx')
var Select = require('../src/Multiselect.jsx')
var Calendar = require('../src/Calendar.jsx')
var DatePicker = require('../src/DateTimePicker.jsx')
var NumberPicker = require('../src/NumberPicker.jsx')
var ComboBox = require('../src/Combobox.jsx')
var SelectList = require('../src/SelectList.jsx')
var List = require('../src/List.jsx')
var configure = require('../src/configure')
var chance = new (require('chance'))
var _ = require('lodash')

var { ModalTrigger, Modal } = require('react-bootstrap')

window.Globalize.culture('en-GB');

configure.setGlobalizeInstance(window.Globalize);

var FilterList = React.createClass({

  propTypes: {
    open: React.PropTypes.bool,
    ...List.type.propTypes,
  },

  componentDidUpdate(prevProps){
    if (!prevProps.open && this.props.open)
      setTimeout(() => this.refs.input.getDOMNode().focus())
  },

  render(){

    return (
      <div>
        <input ref='input' type='text' onClick={ e => e.stopPropagation()}/>
        <List ref='list' {...this.props}/>
      </div>
    )
  },

  first(...args){
    return this.refs.list.first(...args)
  },

  last(...args){
    return this.refs.list.last(...args)
  },

  next(...args){
    return this.refs.list.next(...args)
  },

  prev(...args){
    return this.refs.list.prev(...args)
  }

})


var DisabledList = React.createClass({

  // proptypes tell the parent widget what to pass into it
  // the DropdownList will inspect propTypes and _.pick() those keys to pass in
  propTypes: {
    disabledItems: React.PropTypes.array,
    ...List.type.propTypes,
  },

  componentWillMount(){
    var parent = this

    // we need to use a closure to allow the list item to know whether its disabled or not
    // do this infrequently though b/c it is costly, hence we save it in state
    this.setState({
      listItem: React.createClass({
        render() {
          // add css rules to make it look "disabled"
          var classes = parent.isDisabled(this.props.item) ? 'rw-state-disabled' : ''

          return <div className={classes}>{this.props.item.name}</div>
        }
      })
    })
  },

  render() {
    return (
      <List {...this.props} 
        ref='list' 
        itemComponent={this.state.listItem}
        onSelect={ item => {
          if (!this.isDisabled(item))
            this.props.onSelect(item) // only allow selection of non-disabled items
        }}
      />
    )
  },

  isDisabled(item){
    return this.props.disabledItems 
      && this.props.disabledItems.some( id => id === item.id )
  },

  // Get the next item in teh sequence, but keep going if the next one is disabled
  move(dir, item){
    var stop = dir === 'next' ? this.refs.list.last() : this.refs.list.first()
      , next = this.refs.list[dir](item);
    
    while( next !== stop && this.isDisabled(next)) 
      next = this.refs.list[dir](next)

    return this.isDisabled(next) ? item  : next
  },


  // -- These are the basic List methods that must be implemented
  first() {
    this.move('next', null)
  },

  last() {
    this.move('prev', null)
  },

  next(...args){
    var item = this.refs.list.next(...args)

    return this.move('next', item)
  },

  prev(...args){
    var item = this.refs.list.prev(...args)

    return this.move('prev', item)
  }

})

var MyDropdownList = React.createClass({

  render(){
    var disabled = this.props.disabled && !Array.isArray(this.props.disabled)
      , items = Array.isArray(this.props.disabled) ? this.props.disabled : [];
      
    return (
      <DropdownList {...this.props}
        filter='startsWith'
        disabled={disabled}
        listComponent={DisabledList} 
        disabledItems={items}
      />
    )
  }
})

var App = React.createClass({

  getInitialState: function(){
    var list = generateList()
    return {
      data: list,
      suggestdata: suggestList(),
      dropdownValue: list[0],
      comboboxValue: 1,
      //comboboxValue: list[0],
      selectValues: [3,4,5,2],
      calDate: new Date(),
      numberValue: 1,
      open: false
    }
  },

  render: function(){
    var self = this;

    function change(field, data) {
      var obj = {}

      if(field === 'selectValues' && Array.isArray(data))
        data = _.pluck(data, 'id')

      if(field === 'open') console.log(field, data)

      obj[field] = _.has(data, 'id') ? data.id : data

      self.setState(obj)
      //console.log('example: set field: ' + field, data)
    }

    function create(tag){
      var data;

      tag = { id: self.state.data.length + 1, name: tag }
      data = self.state.data.concat(tag)

      self.setState({
        data: data,
        selectValues: []
          .concat(self.state.selectValues)
          .concat(tag.id)
      })
    }

    return (
      <div style={{ fontSize: 14 }}>
        <div style={{ maxWidth: 600, height: 1500 }}>
          <section className="example" style={{ marginBottom: 20 }}>
            <DropdownList
              placeholder='hi...'
              filter='contains'
              valueField='id'
              textField='name'
              data={this.state.data}
            />
          </section>
        </div>
      </div>
    )
  },


})

React.render(<App/>, document.body);



function generateList(){
  var arr = new Array(100)

  for(var i = 0; i < arr.length; i++){
    var first = chance.first(), last = chance.last()
    arr[i] = { id: i + 1, name: `${first} ${last}`, first, surname: last }
  }

  return arr
}

function suggestList(){
  var i = 0;

  return [
    { id: i += 1, name: "james" },
    { id: i += 1, name: "jan" },
    { id: i += 1, name: "jase" },
    { id: i += 1, name: "jason" },
    { id: i += 1, name: "jim" },
    { id: i += 1, name: "jimmy" },
    { id: i += 1, name: "jimmy smith" },
    { id: i += 1, name: "john" }
  ]
}