/* global it, describe, expect */
'use strict';
require('../vendor/phantomjs-shim')

var React = require('react/addons');
var List = require('../src/List.jsx')
  , _ = require('lodash');

//console.log(sinon)
var TestUtils = React.addons.TestUtils
  , render = TestUtils.renderIntoDocument
  , findTag = TestUtils.findRenderedDOMComponentWithTag
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , findAllTag = TestUtils.scryRenderedDOMComponentsWithTag
  , findAllClass = TestUtils.scryRenderedDOMComponentsWithClass
  , findType = TestUtils.findRenderedComponentWithType
  , findAllType = TestUtils.scryRenderedComponentWithType
  , trigger = TestUtils.Simulate;

describe('List', function(){
  var data = [
    { label: 'jimmy', id: 0 },
    { label: 'sally', id: 1 },
    { label: 'pat', id: 2 },
    { label: 'jason', id: 3 },
    { label: 'natalie', id: 4 }
  ];

  it('should set initial values', function(){
    var list = render(
          <List data={data} onChange={_.noop} />);

    expect( list.getDOMNode().children.length).to.be(5);
  })

  it('should respect textField and valueFields', function(){
    var list = render(
          <List data={data} textField='label' valueField='id' />);

    expect(list.getDOMNode().children[0].textContent)
      .to.be('jimmy');
  }) 

  it('should render an empty list message', function(){
    var list = render(<List data={[]} textField='label' valueField='id' />);

    expect(findTag(list, 'li').getDOMNode().textContent)
      .to.be('There are no items in this list');
  }) 

  it('should use a Item template', function(){
    var templ  = React.createClass({
      render: function() {
        return (<span>{"hello - " + this.props.item.label}</span>);
      }
    });
    
    var list = render(<List data={data} listItem={templ} />);

    expect( list.getDOMNode().children[0].textContent).to.be('hello - jimmy');
  })

  it('should implement first()', function(){
    var list = render(<List data={data} selected={data[1]} focused={data[2]} />);

    expect(list.first('focused')).to.be(data[0]);
  })

  it('should implement prev()', function(){
    var list = render(<List data={data} selected={data[3]} focused={data[4]} textField='label' />);

    expect(list.prev('selected')).to.be(data[2]);
    expect(list.prev('selected', 'sa')).to.be(data[1]);

    expect(list.prev('focused')).to.be(data[3]);
    expect(list.prev('focused', 'ji')).to.be(data[0]);
  })

  it('should implement next()', function(){
    var list = render(<List data={data} selected={data[1]} focused={data[2]} textField='label'/>);

    expect(list.next('selected')).to.be(data[2]);
    expect(list.next('selected', 'ja')).to.be(data[3]);

    expect(list.next('focused', 'na')).to.be(data[4]);
    expect(list.next('focused', 'na')).to.be(data[4]);
  })

  it('should implement last()', function(){
    var list = render(<List data={data} selected={data[1]} focused={data[2]} />);

    expect(list.last('focused')).to.be(data[4]);
  })
})