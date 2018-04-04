import React from 'react'
import { mount, shallow } from 'enzyme'

import Multiselect from '../src/Multiselect'
import MultiselectTag from '../src/MultiselectTag'
import MultiselectTagList from '../src/MultiselectTagList'

describe('Multiselect', function() {
  const ControlledMultiselect = Multiselect.ControlledComponent

  let dataList = [
    { label: 'jimmy', id: 0 },
    { label: 'sally', id: 1 },
    { label: 'pat', id: 2 },
  ]

  it('should set initial values', function() {
    mount(<Multiselect value={['hello']} onChange={() => {}} />)
      .find(MultiselectTag)
      .contains('hello')
  })

  it('should respect textField and valueFields', function() {
    mount(
      <Multiselect
        defaultValue={[0]}
        data={dataList}
        textField="label"
        valueField="id"
      />
    )
      .find(MultiselectTag)
      .contains('jimmy')

    mount(
      <Multiselect
        defaultValue={[0]}
        data={dataList}
        textField="label"
        valueField={i => i.id}
      />
    )
      .find(MultiselectTag)
      .contains('jimmy')
  })

  it('should start closed', () => {
    let wrapper = shallow(
      <ControlledMultiselect
        value={dataList.slice(0, 2)}
        data={dataList}
        textField="label"
        valueField="id"
      />
    )

    expect(wrapper.prop('open')).to.not.equal(true)
    expect(wrapper.find('Popup').prop('open')).to.not.equal(true)

    wrapper.assertNone('.rw-open')
    wrapper.assertSingle(`MultiselectInput[aria-expanded=false]`)
  })

  it('should toggle add aria when open', () => {
    let inst = shallow(<ControlledMultiselect open />)

    expect(inst.prop('open')).to.equal(true)

    inst.assertSingle('Popup[open]')
    inst.assertSingle('Widget[open]')
    inst.assertSingle('MultiselectInput[aria-expanded]')
  })

  it('should foward props to Popup', () => {
    let props = shallow(<ControlledMultiselect open dropUp />)
      .find('Popup')
      .props()

    expect(props.dropUp).to.equal(true)
    expect(props.open).to.equal(true)
  })

  it('should open when clicked', done => {
    let openSpy = sinon.spy()

    mount(<ControlledMultiselect onToggle={openSpy} />)
      .find('WidgetPicker')
      .simulate('click')

    setTimeout(() => {
      expect(openSpy.calledOnce).to.equal(true)
      expect(openSpy.calledWith(true)).to.equal(true)
      done()
    })
  })

  it('should not open when disabled', done => {
    let openSpy = sinon.spy()

    mount(<ControlledMultiselect onToggle={openSpy} disabled />).simulate(
      'focus'
    )

    setTimeout(() => {
      expect(openSpy.called).to.equal(false)
      done()
    })
  })

  it('should set id on list', () => {
    expect(
      shallow(<ControlledMultiselect open />)
        .find('List')
        .prop('id')
    ).to.be.a('string')
  })

  it('should remove tag when clicked', function() {
    let del = sinon.spy()
    mount(
      <MultiselectTagList
        id="list"
        activeId="list_active"
        data={dataList}
        onDelete={del}
        value={dataList.slice(0, 2)}
        valueAccessor={i => i.id}
        textAccessor={i => i.label}
      />
    )
      .tap(inst => expect(inst.find(MultiselectTag).length).to.equal(2))
      .find('.rw-multiselect-tag-btn')
      .first()
      .simulate('click', {})

    expect(del.calledOnce).to.equal(true)
    expect(del.calledWith(dataList[0])).to.equal(true)
  })

  it('should change value when tag is clicked', function() {
    let change = sinon.spy()

    mount(
      <Multiselect
        onChange={change}
        value={dataList.slice(0, 2)}
        data={dataList}
        textField="label"
        valueField="id"
      />
    )
      .find('.rw-multiselect-tag-btn')
      .first()
      .simulate('click', {})

    expect(change.calledOnce).to.equal(true)
    expect(change.getCall(0).args[0]).to.eql(dataList.slice(1, 2))
  })

  it('should simulate focus/blur events', function(done) {
    let blur = sinon.spy(),
      focus = sinon.spy()

    mount(<Multiselect onBlur={blur} onFocus={focus} />)
      .simulate('focus')
      .tap(inst => {
        setTimeout(() => {
          inst.simulate('blur')

          setTimeout(() => {
            expect(focus.calledOnce).to.equal(true)
            expect(blur.calledOnce).to.equal(true)
            done()
          })
        })
      })
  })

  it('should not simulate focus/blur events when disabled', function(done) {
    let blur = sinon.spy(),
      focus = sinon.spy()

    mount(<Multiselect disabled onBlur={blur} onFocus={focus} />)
      .simulate('focus')
      .tap(inst => {
        setTimeout(() => {
          inst.simulate('blur')

          setTimeout(() => {
            expect(focus.called).to.equal(false)
            expect(blur.called).to.equal(false)
            done()
          })
        })
      })
  })

  it('should simulate key events', function() {
    let kp = sinon.spy(),
      kd = sinon.spy(),
      ku = sinon.spy()

    mount(<Multiselect onKeyPress={kp} onKeyUp={ku} onKeyDown={kd} />)
      .simulate('keyPress')
      .simulate('keyDown')
      .simulate('keyUp')

    expect(kp.calledOnce).to.equal(true)
    expect(kd.calledOnce).to.equal(true)
    expect(ku.calledOnce).to.equal(true)
  })

  it('should add correct markup when read-only', () => {
    let input = mount(<ControlledMultiselect readOnly />)
      .assertSingle('.rw-input-reset')
      .getDOMNode()

    expect(input.hasAttribute('readonly')).to.equal(true)
    expect(input.getAttribute('aria-readonly')).to.equal('true')
  })

  it('should add correct markup when disabled', () => {
    let input = mount(<ControlledMultiselect disabled />)
      .assertSingle('.rw-input-reset')
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
        disabled={[1]}
        textField="label"
        valueField="id"
      />
    )
      .find(MultiselectTagList)
      .assertSingle('li.rw-state-disabled button.rw-multiselect-tag-btn')
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
      />
    )
      .find('button.rw-multiselect-tag-btn')
      .simulate('click')

    expect(changeSpy.called).to.equal(false)
  })

  it('should not remove disabled tags', function() {
    let change = sinon.spy()
    mount(
      <Multiselect
        onChange={change}
        defaultValue={[1, 0]}
        data={dataList}
        disabled={[1]}
        textField="label"
        valueField="id"
      />
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
      />
    )
      .find('button.rw-multiselect-tag-btn')
      .simulate('click')

    expect(changeSpy.called).to.equal(false)
  })

  it('should call onChange with event object from select', function() {
    let change = sinon.spy()
    let value = dataList.slice(0, 1)
    shallow(
      <ControlledMultiselect
        open
        searchTerm=""
        value={value}
        data={dataList}
        onChange={change}
        onToggle={() => {}}
      />
    )
      .find('List')
      .prop('onSelect')(dataList[1], 'foo')

    expect(change.getCall(0).args[1]).to.eql({
      originalEvent: 'foo',
      lastValue: value,
      dataItem: dataList[1],
      action: 'insert',
      searchTerm: '',
    })
  })

  it('should call onSearch with event object from select', function() {
    let search = sinon.spy()
    let value = dataList.slice(0, 1)
    let event = { target: { value: 'ba' } }

    shallow(
      <ControlledMultiselect
        open
        searchTerm="b"
        value={value}
        data={dataList}
        onSearch={search}
        onToggle={() => {}}
      />
    )
      .assertSingle('MultiselectInput')
      .simulate('change', event)

    expect(search.getCall(0).args[1]).to.eql({
      originalEvent: event,
      lastSearchTerm: 'b',
      action: 'input',
    })
  })

  it('should call Select handler', function() {
    let change = sinon.spy()
    let onSelect = sinon.spy()
    let value = dataList.slice(1)

    shallow(
      <ControlledMultiselect
        open
        onToggle={() => {}}
        value={value}
        data={dataList}
        onChange={change}
        onSelect={onSelect}
      />
    )
      .find('List')
      .simulate('select', dataList[1], 'foo')

    expect(onSelect.calledOnce).to.equal(true)
    expect(onSelect.getCall(0).args[1]).to.eql({ originalEvent: 'foo' })

    expect(change.calledAfter(onSelect)).to.equal(true)
  })

  it('should clear search on blur', done => {
    let onSearch = sinon.spy()

    mount(
      <Multiselect
        data={dataList}
        onSearch={onSearch}
        defaultSearchTerm="foo"
      />
    )
      .find('input')
      .simulate('blur')

    setTimeout(() => {
      expect(onSearch.calledOnce).to.equal(true)
      expect(onSearch.calledWith('')).to.equal(true)
      done()
    })
  })

  it('should clear searchTerm when an item is selected', () => {
    let searchSpy = sinon.spy()

    mount(
      <Multiselect
        defaultOpen
        data={dataList}
        textField="label"
        valueField="id"
        defaultSearchTerm="ji"
        onSearch={searchSpy}
      />
    ).simulate('keyDown', { keyCode: 13 })

    expect(searchSpy.calledOnce).to.equal(true)
    expect(searchSpy.calledWith('')).to.equal(true)
  })

  it('should not simulate form submission', function() {
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
      </form>
    )
      .find('input')
      .simulate('keyDown', { key: 'Enter' })

    expect(spy.calledOnce).to.equal(true)
  })

  it('should show create tag correctly', function() {
    mount(
      <Multiselect
        defaultOpen
        searchTerm="custom tag"
        onCreate={() => {}}
        data={dataList}
        onSearch={() => {}}
        textField="label"
        valueField="id"
      />
    )
      .tap(s => s.assertSingle('ul.rw-list-option-create'))
      .setProps({ searchTerm: undefined })
      .tap(s => s.assertNone('ul.rw-list-option-create'))
      .setProps({ searchTerm: 'JIMMY' })
      .tap(s => s.assertNone('ul.rw-list-option-create'))
      .setProps({ searchTerm: 'custom', onCreate: undefined })
      .tap(s => s.assertNone('ul.rw-list-option-create'))
  })

  it('should show create tag correctly when caseSensitive', function() {
    mount(
      <Multiselect
        defaultOpen
        searchTerm="Jimmy"
        onCreate={() => {}}
        data={dataList}
        onSearch={() => {}}
        textField="label"
        valueField="id"
        caseSensitive={true}
      />
    )
      .tap(s => s.assertSingle('ul.rw-list-option-create'))
      .setProps({ searchTerm: 'jimmy' })
      .tap(s => s.assertNone('ul.rw-list-option-create'))
  })

  it('should call onCreate', function() {
    let create = sinon.spy()

    let assertOnCreateCalled = () => {
      expect(create.calledOnce).to.equal(true)
      expect(create.calledWith('custom tag')).to.equal(true)
      create.resetHistory()
    }

    let wrapper = mount(
      <Multiselect
        open
        searchTerm="custom tag"
        data={dataList}
        onCreate={create}
        onSearch={() => {}}
        onToggle={() => {}}
      />
    )

    wrapper
      .find('.rw-list-option-create .rw-list-option')
      .simulate('click')
      .tap(assertOnCreateCalled)

    wrapper
      .simulate('keyDown', { keyCode: 13 })
      .tap(assertOnCreateCalled)
      .simulate('keyDown', { keyCode: 13, ctrlKey: true })
      .tap(assertOnCreateCalled)
  })

  it('should navigate tags list', function() {
    let change = sinon.spy()
    let listHead = dataList.slice(0, 2)

    let inst = mount(
      <Multiselect
        value={[0, 1, 2]}
        data={dataList}
        textField="label"
        valueField="id"
        onChange={change}
      />
    )

    let tags = inst.find('MultiselectTagList li')

    inst.simulate('keyDown', { key: 'ArrowLeft' })
    tags.last().is('.rw-state-focus')

    inst.simulate('keyDown', { key: 'ArrowRight' })
    tags.at(1).is('.rw-state-focus')

    inst.simulate('keyDown', { key: 'Home' })
    tags.first().is('.rw-state-focus')

    inst.simulate('keyDown', { key: 'End' })
    tags.last().is('.rw-state-focus')

    inst.simulate('keyDown', { key: 'Delete' })

    expect(change.calledOnce).to.equal(true)
    expect(change.calledWith(listHead)).to.equal(true)
    change.resetHistory()

    inst.simulate('keyDown', { key: 'Backspace' })

    expect(change.calledOnce).to.equal(true)
    expect(change.calledWith(listHead)).to.equal(true)
  })

  it('should open on ArrowDown', () => {
    let openSpy = sinon.spy()

    mount(<Multiselect data={dataList} onToggle={openSpy} />).simulate(
      'keyDown',
      { key: 'ArrowDown' }
    )

    expect(openSpy.calledOnce).to.equal(true)
    expect(openSpy.calledWith(true)).to.equal(true)
  })

  it('should navigate list', function() {
    let change = sinon.spy()

    let inst = mount(
      <Multiselect
        defaultOpen
        data={dataList}
        textField="label"
        valueField="id"
        onChange={change}
      />
    )

    let listItems = inst.find('List li')

    listItems.first().is('.rw-state-focus')

    inst.simulate('keyDown', { key: 'ArrowDown' })
    listItems.at(1).is('.rw-state-focus')

    inst.simulate('keyDown', { key: 'ArrowUp' })
    listItems.first().is('.rw-state-focus')

    inst.simulate('keyDown', { key: 'End' })
    listItems.last().is('.rw-state-focus')

    inst.simulate('keyDown', { key: 'Home' })
    listItems.first().is('.rw-state-focus')
  })
})
