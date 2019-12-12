import { mount } from 'enzyme'
import React from 'react'
import List from '../src/Listbox'

describe('List', () => {
  var data = [
    { first: 'jimmy', last: 'smith', id: 0 },
    { first: 'sally', last: 'smith', id: 1 },
    { first: 'pat', last: 'jones', id: 2 },
    { first: 'jason', last: 'quense', id: 3 },
    { first: 'natalie', last: 'quense', id: 4 },
  ]

  let props = {
    data,
    textAccessor: v => v.first || '',
    dataKeyAccessor: v => v.id,
    isDisabled: () => false,
    renderItem: ({ item }) => item.first,
  }

  it('should set initial values', () => {
    let numItems = 5

    expect(
      mount(<List data={data} onChange={() => {}} {...props} />).find(
        '[role="option"]',
      ).length,
    ).to.equal(numItems)
  })

  it('should fire onSelect', () => {
    let selectSpy = sinon.spy()

    mount(
      <List data={data} onSelect={selectSpy} onChange={() => {}} {...props} />,
    )
      .find('[role="option"]')
      .first()
      .simulate('click')

    expect(selectSpy.calledOnce).to.equal(true)

    expect(selectSpy.getCall(0).args[0]).to.equal(data[0])
    expect(selectSpy.getCall(0).args[1].type).to.equal('click')
  })

  it('should use activeId', () => {
    let focusedItem = data[2]

    expect(
      mount(<List {...props} activeId="foo" focusedItem={focusedItem} />)
        .find('.rw-list-option')
        .at(2)
        .prop('id'),
    ).to.equal('foo')
  })

  it('should respect textField and dataKeys', () => {
    expect(
      mount(<List {...props} />)
        .find('[role="option"]')
        .first()
        .text(),
    ).to.equal('jimmy')
  })

  it('should render an empty list message', () => {
    expect(
      mount(<List {...props} data={[]} />)
        .assertSingle('.rw-list-empty')
        .text(),
    ).to.equal('There are no items in this list')
  })

  it('should use a Item template', () => {
    let renderItem = ({ item }) => <span>{'hello - ' + item.first}</span>

    expect(
      mount(<List {...props} renderItem={renderItem} />)
        .find('[role="option"]')
        .first()
        .text(),
    ).to.equal('hello - jimmy')
  })

  it('should use a Group template', () => {
    let renderGroup = ({ group }) => <span>{'hello - ' + group}</span>

    let groupBy = 'last'

    expect(
      mount(
        <List
          {...props}
          data={data}
          dataState={List.getDataState(data, { groupBy })}
          renderGroup={renderGroup}
          groupBy={groupBy}
        />,
      )
        .find('.rw-list-optgroup')
        .first()
        .text(),
    ).to.equal('hello - smith')
  })
})
