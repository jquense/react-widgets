import React from 'react';
import tsp from 'teaspoon';

import List from '../src/List';


describe('List', () => {
  var data = [
    { first: 'jimmy',   last: 'smith',  id: 0 },
    { first: 'sally',   last: 'smith',  id: 1 },
    { first: 'pat',     last: 'jones',  id: 2 },
    { first: 'jason',   last: 'quense', id: 3 },
    { first: 'natalie', last: 'quense', id: 4 },
  ];


  let props = {
    data,
    textAccessor: v => v.first || '',
    valueAccessor: v => v.id,
    isDisabled: () => false,
    renderItem: ({ item }) => item.first,
  }

  it('should set initial values', () => {
    let numItems = 5;

    expect(
      tsp(<List data={data} onChange={()=>{}} {...props} />)
        .render()
        .find('li')
        .length
    )
    .to.equal(numItems)
  })

  it('should fire onSelect', () => {
    let selectSpy = sinon.spy()

    tsp(
      <List
        data={data}
        onSelect={selectSpy}
        onChange={()=>{}} {...props}
      />
    )
    .render()
    .first('li')
    .trigger('click')

    expect(selectSpy.calledOnce).to.equal(true)

    expect(selectSpy.getCall(0).args[0]).to.equal(data[0])
    expect(selectSpy.getCall(0).args[1].type).to.equal('click')
  })

  it('should use activeId', () => {
    let focusedItem = data[2];

    expect(
      tsp(
        <List
          {...props}
          activeId="foo"
          focusedItem={focusedItem}
        />
      )
      .render()
      .find('.rw-list-option')
      .nth(2)
      .props('id')
    )
    .to.equal('foo');
  })

  it('should respect textField and valueFields', () => {
    expect(
      tsp(<List {...props} />)
        .render()
        .first('li')
        .text()
    )
    .to.equal('jimmy');
  })

  it('should render an empty list message', () => {
    expect(
      tsp(<List {...props} data={[]} />)
        .render()
        .single('li')
        .text()
    )
    .to.equal('There are no items in this list');
  })

  it('should use a Item template', () => {
    let renderItem = ({ item }) => (
      <span>{'hello - ' + item.first}</span>
    );

    expect(
      tsp(<List {...props} renderItem={renderItem}  />)
        .render()
        .first('li')
        .text()
    )
    .to.equal('hello - jimmy');
  })

  it('should use a Group template', () => {
    let renderGroup = ({ group }) => (
      <span>{'hello - ' + group}</span>
    );

    let groupBy = 'last';

    expect(
      tsp(
        <List
          {...props}
          data={data}
          dataState={List.getDataState(data, { groupBy })}
          renderGroup={renderGroup}
          groupBy={groupBy}
        />
      )
      .render()
      .first('.rw-list-optgroup')
      .text()
    )
    .to.equal('hello - smith');
  })

})
