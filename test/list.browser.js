import React from 'react';
import ReactDOM from 'react-dom';
import tsp from 'teaspoon';

import List from '../src/List';

var TestUtils = require('react-addons-test-utils');
var render = TestUtils.renderIntoDocument;

describe('List', function(){
  var data = [
    { label: 'jimmy', id: 0 },
    { label: 'sally', id: 1 },
    { label: 'pat', id: 2 },
    { label: 'jason', id: 3 },
    { label: 'natalie', id: 4 }
  ];

  it('should set initial values', function(){
    let numItems = 5;

    expect(
      tsp(<List data={data} onChange={()=>{}} />)
        .render()
        .find('li')
        .length
    )
    .to.equal( numItems)
  })

  it('should use activeId', function(){
    let focused = data[2];

    expect(
      tsp(<List data={data} focused={focused} activeId="foo" />)
        .render()
        .find('.rw-list-option')
        .nth(2)
        .props('id')
    )
    .to.equal('foo');
  })

  it('should respect textField and valueFields', function(){
    var list = render(
          <List data={data} textField='label' valueField='id' />);

    expect($(ReactDOM.findDOMNode(list)).find('li:first-child').text())
      .to.be('jimmy');
  })

  it('should render an empty list message', function(){
    var list = render(<List data={[]} textField='label' valueField='id' />);

    expect($(ReactDOM.findDOMNode(list)).find('li').text())
      .to.be('There are no items in this list');
  })

  it('should use a Item template', function(){
    var Templ  = React.createClass({
      render: function() {
        return (<span>{'hello - ' + this.props.item.label}</span>);
      }
    });

    var list = render(<List data={data} itemComponent={Templ} />);

    expect($(ReactDOM.findDOMNode(list)).find('li:first-child').text()).to.be('hello - jimmy');
  })

  it('should implement first()', function(){
    var focused = data[2]
      , selected = data[1]
      , list = render(<List data={data} selected={selected} focused={focused} />);

    expect(list.first(focused)).to.be(data[0]);
  })

  it('should implement prev()', function(){
    var focused = data[4]
      , selected = data[3]
      , list = render(<List data={data} selected={selected} focused={focused} textField='label' />);

    expect(list.prev(selected)).to.be(data[2]);
    expect(list.prev(selected, 'sa')).to.be(data[1]);

    expect(list.prev(focused)).to.be(data[3]);
    expect(list.prev(focused, 'ji')).to.be(data[0]);
  })

  it('should implement next()', function(){
    var focused = data[2]
      , selected = data[1]
      , list = render(<List data={data} selected={selected} focused={focused} textField='label'/>);

    expect(list.next(selected)).to.be(data[2]);
    expect(list.next(selected, 'ja')).to.be(data[3]);

    expect(list.next(focused, 'na')).to.be(data[4]);
  })

  it('should implement last()', function(){
    var focused = data[2]
      , list = render(<List data={data} focused={focused} />);

    expect(list.last(focused)).to.be(data[4]);
  })
})
