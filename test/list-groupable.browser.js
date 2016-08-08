import React from 'react';
import tsp from 'teaspoon';

import List from '../src/ListGroupable';

describe('Groupable List', function(){
  let data = [
    { first: 'jimmy',   last: 'smith',  id: 0 },
    { first: 'sally',   last: 'smith',  id: 1 },
    { first: 'pat',     last: 'jones',  id: 2 },
    { first: 'jason',   last: 'quense', id: 3 },
    { first: 'natalie', last: 'quense', id: 4 },
    { first: 'steve',   last: 'miller', id: 5 }
  ];

  it('should set initial values', function(){
    let numGroups = 4;
    let numItems = 6;

    expect(
      tsp(<List data={data} onChange={()=>{}} groupBy='last' />)
        .render()
        .find('li')
        .length
    )
    .to.equal(numGroups + numItems)
  })

  it('should respect textField and valueFields', function(){
    let items = tsp(
      <List
        data={data}
        textField='first'
        valueField='id'
        groupBy='last'
      />
    )
    .render()
    .find('li')

    expect(items.nth(0).text()).to.be('smith')
    expect(items.nth(1).text()).to.be('jimmy')
  })

  it('should render an empty list message', function(){
    expect(
      tsp(
        <List
          data={[]}
          textField='first'
          valueField='id'
          groupBy='last'
        />
      )
      .render()
      .first('li')
      .text()
    )
      .to.be('There are no items in this list');
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

  it('should use a Item template', function(){
    function Item({ item }) {
      return <span>{'hello - ' + item.first}</span>
    }

    expect(
      tsp(<List data={data} itemComponent={Item} />)
        .render()
        .first('.rw-list-option')
        .text()
    )
    .to.be('hello - jimmy');
  })

  it('should use a Group template', function(){
    function Item({ item }) {
      return <span>{'hello - ' + item}</span>
    }

    expect(
      tsp(<List data={data} groupComponent={Item} groupBy="last" />)
        .render()
        .first('.rw-list-optgroup')
        .text()
    )
    .to.be('hello - smith');
  })

  it('should implement first()', function(){
    let focused = data[2]

    let list = tsp(<List data={data} selected={data[1]} focused={focused} />)
      .render().unwrap();

    expect(list.first(focused)).to.be(data[0]);
  })

  it('should implement prev()', function(){
    let focused = data[4]
      , selected = data[3]

    let list = tsp(<List data={data} selected={selected} focused={focused} textField='first' />)
      .render().unwrap();

    expect(list.prev(selected)).to.be(data[2]);
    expect(list.prev(selected, 'sa')).to.be(data[1]);

    expect(list.prev(focused)).to.be(data[3]);
    expect(list.prev(focused, 'ji')).to.be(data[0]);
  })

  it('should implement next()', function(){
    let focused = data[2]
      , selected = data[1]

    let list = tsp(<List data={data} selected={selected} focused={focused} textField='first' />)
      .render().unwrap();

    expect(list.next(selected)).to.be(data[2]);
    expect(list.next(selected, 'ja')).to.be(data[3]);

    expect(list.next(focused, 'na')).to.be(data[4]);
    expect(list.next(focused, 'na')).to.be(data[4]);
  })

  it('should implement last()', function(){
    let focused = data[2]
    let list = tsp(<List data={data} selected={data[1]} focused={focused} />)
      .render().unwrap();

    expect(list.last()).to.be(data[5]);
  })
})
