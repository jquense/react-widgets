/* global it, describe, expect */
'use strict';
require('../vendor/phantomjs-shim')

var React = require('react/addons');
var List = require('../src/ListGroupable.jsx');

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

describe('Groupable List', function(){
  var data = [
    { first: 'jimmy',   last: 'smith',  id: 0 },
    { first: 'sally',   last: 'smith',  id: 1 },
    { first: 'pat',     last: 'jones',  id: 2 },
    { first: 'jason',   last: 'quense', id: 3 },
    { first: 'natalie', last: 'quense', id: 4 },
    { first: 'steve',   last: 'miller', id: 5 }
  ];

  it('should set initial values', function(){
    var list = render(<List data={data} onChange={()=>{}} groupBy='last' />);

    //children with the headers
    expect( list.getDOMNode().children.length).to.be(6 + 4);
  })

  it('should respect textField and valueFields', function(){
    var list = render(<List data={data} textField='first' valueField='id' groupBy='last'/>)
      , children = list.getDOMNode().children;

    expect($(children[0]).text()).to.be('smith');
    expect($(children[1]).text()).to.be('jimmy');
  })

  it('should render an empty list message', function(){
    var list = render(<List data={[]} textField='first' valueField='id' />);

    expect($(list.getDOMNode()).find('li').text())
      .to.be('There are no items in this list');
  })

  it('should generate ids', function(){
    var focused = data[2]
      , list = render(<List data={data} focused={focused} />);

    let seen = [];

    $(React.findDOMNode(list)).children().each(
      function(){
        expect(this.hasAttribute('id')).to.equal(true);
        expect(seen.indexOf(this.id)).to.equal(-1);
        seen.push(this.id);
      })
  })

  it('should use a Item template', function(){
    var templ  = React.createClass({
      render: function() {
        return (<span>{'hello - ' + this.props.item.first}</span>);
      }
    });

    var list = render(<List data={data} itemComponent={templ} />)
      , children = list.getDOMNode().children;

    expect($(children[1]).text()).to.be('hello - jimmy');
  })

  it('should use a Group template', function(){
    var templ  = React.createClass({
      render: function() {
        return (<span>{'hello - ' + this.props.item}</span>);
      }
    });

    var list = render(<List data={data} groupComponent={templ} groupBy='last' />)
      , children = list.getDOMNode().children;

    expect($(children[0]).text()).to.be('hello - smith');
  })

  it('should implement first()', function(){
    var focused = data[2]
      , list = render(<List data={data} selected={data[1]} focused={focused} />);

    expect(list.first(focused)).to.be(data[0]);
  })

  it('should implement prev()', function(){
    var focused = data[4]
      , selected = data[3]
      , list = render(<List data={data} selected={selected} focused={focused} textField='first' />);

    expect(list.prev(selected)).to.be(data[2]);
    expect(list.prev(selected, 'sa')).to.be(data[1]);

    expect(list.prev(focused)).to.be(data[3]);
    expect(list.prev(focused, 'ji')).to.be(data[0]);
  })

  it('should implement next()', function(){
    var focused = data[2]
      , selected = data[1]
      , list = render(<List data={data} selected={selected} focused={focused} textField='first' />);

    expect(list.next(selected)).to.be(data[2]);
    expect(list.next(selected, 'ja')).to.be(data[3]);

    expect(list.next(focused, 'na')).to.be(data[4]);
    expect(list.next(focused, 'na')).to.be(data[4]);
  })

  it('should implement last()', function(){
    var focused = data[2]
      , list = render(<List data={data} selected={data[1]} focused={focused} />);

    expect(list.last()).to.be(data[5]);
  })
})
