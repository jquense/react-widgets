import { mount } from 'enzyme'
import React from 'react'
import Multiselect from '../src/Multiselect'
import MultiselectTag from '../src/MultiselectTag'
import MultiselectTagList from '../src/MultiselectTagList'

describe('Multiselect', function () {
  let dataList = [
    { label: 'jimmy', id: 0 },
    { label: 'sally', id: 1 },
    { label: 'pat', id: 2 },
  ]

  it('should set initial values', function () {
    mount(<Multiselect value={['hello']} onChange={() => {}} />)
      .find(MultiselectTag)
      .contains('hello')
  })

  it('should respect textField and dataKeys', function () {
    mount(
      <Multiselect
        defaultValue={[0]}
        data={dataList}
        textField="label"
        dataKey="id"
      />,
    )
      .find(MultiselectTag)
      .contains('jimmy')

    mount(
      <Multiselect
        defaultValue={[0]}
        data={dataList}
        textField="label"
        dataKey={(i) => i.id}
      />,
    )
      .find(MultiselectTag)
      .contains('jimmy')
  })

  it('should start closed', () => {
    let wrapper = mount(
      <Multiselect
        value={dataList.slice(0, 2)}
        data={dataList}
        textField="label"
        dataKey="id"
      />,
    )

    expect(wrapper.prop('open')).to.not.equal(true)
    expect(wrapper.find('Popup').prop('open')).to.not.equal(true)

    wrapper.assertNone('.rw-open')
    wrapper.assertSingle(`MultiselectInput[aria-expanded=false]`)
  })

  it('should toggle add aria when open', () => {
    let inst = mount(<Multiselect open />)

    expect(inst.prop('open')).to.equal(true)

    inst.assertSingle('Popup[open]')
    inst.assertSingle('Widget[open]')
    inst.assertSingle('MultiselectInput[aria-expanded]')
  })

  it('should foward props to Popup', () => {
    let props = mount(<Multiselect open dropUp />)
      .find('Popup')
      .props()

    expect(props.dropUp).to.equal(true)
    expect(props.open).to.equal(true)
  })

  it('should open when clicked', (done) => {
    let openSpy = sinon.spy()

    mount(<Multiselect onToggle={openSpy} />)
      .find('WidgetPicker')
      .simulate('click')

    setTimeout(() => {
      expect(openSpy.calledOnce).to.equal(true)
      expect(openSpy.calledWith(true)).to.equal(true)
      done()
    })
  })

  it('should not open when disabled', (done) => {
    let openSpy = sinon.spy()

    mount(<Multiselect onToggle={openSpy} disabled />).simulate('focus')

    setTimeout(() => {
      expect(openSpy.called).to.equal(false)
      done()
    })
  })

  it('should set id on list', () => {
    expect(
      mount(<Multiselect open />)
        .find('List')
        .prop('id'),
    ).to.be.a('string')
  })

  it('should remove tag when clicked', function () {
    let del = sinon.spy()
    mount(
      <MultiselectTagList
        id="list"
        activeId="list_active"
        data={dataList}
        onDelete={del}
        value={dataList.slice(0, 2)}
        dataKeyAccessor={(i) => i.id}
        textAccessor={(i) => i.label}
      />,
    )
      .tap((inst) => expect(inst.find(MultiselectTag).length).to.equal(2))
      .find('.rw-multiselect-tag-btn')
      .first()
      .simulate('click', {})

    expect(del.calledOnce).to.equal(true)
    expect(del.calledWith(dataList[0])).to.equal(true)
  })

  it('should change value when tag is clicked', function () {
    let change = sinon.spy()

    mount(
      <Multiselect
        onChange={change}
        value={dataList.slice(0, 2)}
        data={dataList}
        textField="label"
        dataKey="id"
      />,
    )
      .find('.rw-multiselect-tag-btn')
      .first()
      .simulate('click', {})

    expect(change.calledOnce).to.equal(true)
    expect(change.getCall(0).args[0]).to.eql(dataList.slice(1, 2))
  })

  it('should simulate focus/blur events', () => {
    let blur = sinon.spy(),
      focus = sinon.spy()

    mount(<Multiselect onBlur={blur} onFocus={focus} />)
      .simulateWithTimers('focus')
      .simulateWithTimers('blur')

    expect(focus.calledOnce).to.equal(true)
    expect(blur.calledOnce).to.equal(true)
  })

  it('should not simulate focus/blur events when disabled', function () {
    let blur = sinon.spy(),
      focus = sinon.spy()

    mount(<Multiselect disabled onBlur={blur} onFocus={focus} />)
      .simulateWithTimers('focus')
      .simulateWithTimers('blur')

    expect(focus.called).to.equal(false)
    expect(blur.called).to.equal(false)
  })

  it('should add correct markup when read-only', () => {
    let input = mount(<Multiselect readOnly />)
      .assertSingle('.rw-multiselect-input')
      .getDOMNode()

    expect(input.hasAttribute('readonly')).to.equal(true)
    expect(input.getAttribute('aria-readonly')).to.equal('true')
  })

  it('should add correct markup when disabled', () => {
    let input = mount(<Multiselect disabled />)
      .assertSingle('.rw-multiselect-input')
      .getDOMNode()

    expect(input.hasAttribute('disabled')).to.equal(true)
    expect(input.getAttribute('aria-disabled')).to.equal('true')
  })

  it('should disable only certain tags', () => {
    let change = sinon.spy()
    mount(
      <Multiselect
        onChange={change}
        defaultValue={[0, 1]}
        data={dataList}
        disabled={[dataList[1]]}
        textField="label"
        dataKey="id"
      />,
    )
      .find('MultiselectTagList')
      .assertSingle('div.rw-state-disabled button.rw-multiselect-tag-btn')
      .simulate('click')

    expect(change.called).to.equal(false)
  })

  it('should not remove tags when disabled', () => {
    let changeSpy = sinon.spy()

    mount(
      <Multiselect
        disabled
        onChange={changeSpy}
        value={['jimmy']}
        data={dataList}
      />,
    )
      .find('button.rw-multiselect-tag-btn')
      .simulate('click')

    expect(changeSpy.called).to.equal(false)
  })

  it('should not remove disabled tags', function () {
    let change = sinon.spy()
    mount(
      <Multiselect
        onChange={change}
        defaultValue={[1, 0]}
        data={dataList}
        disabled={[dataList[1]]}
        textField="label"
        dataKey="id"
      />,
    )
      .find('button.rw-multiselect-tag-btn')
      .first()
      .simulate('click')

    expect(change.called).to.equal(false)
  })

  it('should not remove tags when readOnly', () => {
    let changeSpy = sinon.spy()

    mount(
      <Multiselect
        readOnly
        onChange={changeSpy}
        value={['jimmy']}
        data={dataList}
      />,
    )
      .find('button.rw-multiselect-tag-btn')
      .simulate('click')

    expect(changeSpy.called).to.equal(false)
  })

  //  .tap(i => console.log(i.debug()))

  it('should call onChange with event object from select', function () {
    let change = sinon.spy()
    let value = dataList.slice(0, 1)

    mount(
      <Multiselect
        open
        searchTerm=""
        value={value}
        data={dataList}
        onChange={change}
        onToggle={() => {}}
      />,
    )
      .find('List')
      .act((_) => _.prop('onChange')(dataList[1], { originalEvent: 'foo' }))

    expect(change.getCall(0).args[1]).to.eql({
      originalEvent: 'foo',
      lastValue: value,
      dataItem: dataList[1],
      action: 'insert',
      searchTerm: '',
    })
  })

  it('should call onSearch with event object from select', function () {
    let search = sinon.spy()
    let value = dataList.slice(0, 1)
    let event = { target: { value: 'ba' } }

    mount(
      <Multiselect
        open
        searchTerm="b"
        value={value}
        data={dataList}
        onSearch={search}
        onToggle={() => {}}
      />,
    )
      .assertSingle('MultiselectInput')
      .simulate('change', event)

    const { lastSearchTerm, action } = search.getCall(0).args[1]

    expect(lastSearchTerm).to.equal('b')
    expect(action).to.equal('input')
  })

  it('should clear search on blur', () => {
    let onSearch = sinon.spy()

    mount(
      <Multiselect
        data={dataList}
        onSearch={onSearch}
        defaultSearchTerm="foo"
      />,
    )
      .find('input')
      .simulateWithTimers('blur')

    expect(onSearch.calledOnce).to.equal(true)
    expect(onSearch.calledWith('')).to.equal(true)
  })

  it('should clear searchTerm when an item is selected', () => {
    let searchSpy = sinon.spy()

    mount(
      <Multiselect
        defaultOpen
        data={dataList}
        textField="label"
        dataKey="id"
        focusFirstItem
        defaultSearchTerm="ji"
        onSearch={searchSpy}
      />,
    )
      .simulate('keyDown', { key: 'ArrowDown' })
      .simulate('keyDown', { keyCode: 13 })

    expect(searchSpy.calledOnce).to.equal(true)
    expect(searchSpy.calledWith('')).to.equal(true)
  })

  it('should not simulate form submission', function () {
    let spy = sinon.spy()

    mount(
      <form
        action="/"
        onSubmit={() => {
          throw new Error('should not submit!')
        }}
      >
        <Multiselect
          searchTerm="jim"
          data={dataList}
          onSearch={() => {}}
          onKeyDown={spy}
        />
      </form>,
    )
      .find('input')
      .simulate('keyDown', { key: 'Enter' })

    expect(spy.calledOnce).to.equal(true)
  })

  it('should show create tag correctly', function () {
    mount(
      <Multiselect
        defaultOpen
        allowCreate="onFilter"
        searchTerm="custom tag"
        data={dataList}
        onSearch={() => {}}
        textField="label"
        dataKey="id"
      />,
    )
      .tap((s) => s.assertSingle('div.rw-list-option-create'))
      .setProps({ searchTerm: undefined })
      .tap((s) => s.assertNone('div.rw-list-option-create'))
      .setProps({ searchTerm: 'JIMMY' })
      .tap((s) => s.assertNone('div.rw-list-option-create'))
      .setProps({ searchTerm: 'custom', allowCreate: false })
      .tap((s) => s.assertNone('div.rw-list-option-create'))
  })

  it('should call onCreate', function () {
    let create = sinon.spy()

    let assertOnCreateCalled = () => {
      expect(create.calledOnce).to.equal(true)
      expect(create.calledWith('custom tag')).to.equal(true)
      create.resetHistory()
    }

    let wrapper = mount(
      <Multiselect
        open
        allowCreate
        searchTerm="custom tag"
        data={dataList}
        onCreate={create}
        onSearch={() => {}}
        onToggle={() => {}}
      />,
    )

    wrapper
      .find('div.rw-list-option-create')
      .simulate('click')
      .tap(assertOnCreateCalled)

    wrapper
      .simulate('keyDown', { key: 'ArrowDown' })
      .simulate('keyDown', { keyCode: 13 })
      .tap(assertOnCreateCalled)
      .simulate('keyDown', { keyCode: 13, ctrlKey: true })
      .tap(assertOnCreateCalled)
  })

  it('should navigate tags list', function () {
    let change = sinon.spy()
    let listHead = dataList.slice(0, 2)

    let inst = mount(
      <Multiselect
        value={[0, 1, 2]}
        data={dataList}
        textField="label"
        dataKey="id"
        onChange={change}
      />,
    )

    let tags = () => inst.update().find('MultiselectTagList div')

    inst = inst.simulate('keyDown', { key: 'ArrowLeft' })
    expect(tags().last().is('.rw-state-focus')).to.equal(true)

    inst.simulate('keyDown', { key: 'ArrowLeft' })

    expect(tags().at(2).is('.rw-state-focus')).to.equal(true)

    inst = inst.simulate('keyDown', { key: 'ArrowRight' })
    expect(tags().last().is('.rw-state-focus')).to.equal(true)

    inst.simulate('keyDown', { key: 'Delete' })

    expect(change.calledOnce).to.equal(true)
    expect(change.calledWith(listHead)).to.equal(true)
    change.resetHistory()

    inst.simulate('keyDown', { key: 'Backspace' })

    expect(change.calledOnce).to.equal(true)
    expect(change.calledWith(listHead)).to.equal(true)
  })
})
