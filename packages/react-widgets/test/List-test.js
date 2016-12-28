import React from 'react';
import ReactDOM from 'react-dom';
import tsp from 'teaspoon';

import List from '../src/List';
import listDataManager from '../src/util/listDataManager';

var TestUtils = require('react-addons-test-utils');
var render = TestUtils.renderIntoDocument;

describe('List', function(){
  var data = [
    { first: 'jimmy',   last: 'smith',  id: 0 },
    { first: 'sally',   last: 'smith',  id: 1 },
    { first: 'pat',     last: 'jones',  id: 2 },
    { first: 'jason',   last: 'quense', id: 3 },
    { first: 'natalie', last: 'quense', id: 4 },
  ];

  let accessors = {
    textAccessor: v => v.first || '',
    valueAccessor: v => v.id
  }

  it('should set initial values', function(){
    let numItems = 5;

    expect(
      tsp(<List data={data} onChange={()=>{}} {...accessors} />)
        .render()
        .find('li')
        .length
    )
    .to.equal(numItems)
  })

  it('should fire onSelect', function(){
    let selectSpy = sinon.spy()

    tsp(
      <List
        data={data}
        onSelect={selectSpy}
        onChange={()=>{}} {...accessors}
      />
    )
    .render()
    .first('li')
    .trigger('click')

    expect(selectSpy.calledOnce).to.equal(true)

    expect(selectSpy.getCall(0).args[0]).to.equal(data[0])
    expect(selectSpy.getCall(0).args[1].type).to.equal('click')
  })

  it('should use activeId', function(){
    let focusedItem = data[2];

    expect(
      tsp(
        <List
          data={data}
          activeId="foo"
          focusedItem={focusedItem}
          {...accessors}
        />
      )
      .render()
      .find('.rw-list-option')
      .nth(2)
      .props('id')
    )
    .to.equal('foo');
  })

  it('should respect textField and valueFields', function(){
    var list = render(
          <List data={data} {...accessors} />);

    expect($(ReactDOM.findDOMNode(list)).find('li:first-child').text())
      .to.be('jimmy');
  })

  it('should render an empty list message', function(){
    var list = render(<List data={[]} {...accessors} />);

    expect($(ReactDOM.findDOMNode(list)).find('li').text())
      .to.be('There are no items in this list');
  })

  it('should use a Item template', function(){
    var Templ  = React.createClass({
      render: function() {
        return (<span>{'hello - ' + this.props.item.first}</span>);
      }
    });

    var list = render(<List data={data} itemComponent={Templ} {...accessors} />);

    expect($(ReactDOM.findDOMNode(list)).find('li:first-child').text()).to.be('hello - jimmy');
  })

  it('should use a Group template', function(){
    function Item({ item }) {
      return <span>{'hello - ' + item}</span>
    }

    let groupBy = 'last';

    expect(
      tsp(
        <List
          data={data}
          dataState={List.getDataState(data, { groupBy })}
          groupComponent={Item}
          groupBy={groupBy}
          {...accessors}
        />
      )
      .render()
      .first('.rw-list-optgroup')
      .text()
    )
    .to.be('hello - smith');
  })


  // it('should implement first()', function(){
  //   var focusedItem = data[2]
  //     , selected = data[1]
  //     , list = render(<List data={data} selected={selected} focusedItem={focusedItem} />);
  //
  //   expect(list.first(focusedItem)).to.be(data[0]);
  // })
  //
  // it('should implement prev()', function(){
  //   var focusedItem = data[4]
  //     , selected = data[3]
  //     , list = render(<List data={data} selected={selected} focusedItem={focusedItem} textField='first' />);
  //
  //   expect(list.prev(selected)).to.be(data[2]);
  //   expect(list.prev(selected, 'sa')).to.be(data[1]);
  //
  //   expect(list.prev(focusedItem)).to.be(data[3]);
  //   expect(list.prev(focusedItem, 'ji')).to.be(data[0]);
  // })
  //
  // it('should implement next()', function(){
  //   var focusedItem = data[2]
  //     , selected = data[1]
  //     , list = render(<List data={data} selected={selected} focusedItem={focusedItem} textField='first'/>);
  //
  //   expect(list.next(selected)).to.be(data[2]);
  //   expect(list.next(selected, 'ja')).to.be(data[3]);
  //
  //   expect(list.next(focusedItem, 'na')).to.be(data[4]);
  // })
  //
  // it('should implement last()', function(){
  //   var focusedItem = data[2]
  //     , list = render(<List data={data} focusedItem={focusedItem} />);
  //
  //   expect(list.last(focusedItem)).to.be(data[4]);
  // })
})
