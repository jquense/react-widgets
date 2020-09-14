import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import DropdownList from '../src/DropdownList'

describe('DropdownList', function () {
  let data = [
    { label: 'jimmy', id: 0 },
    { label: 'sally', id: 1 },
    { label: 'pat', id: 2 },
  ]

  it('should set initial values', function () {
    expect(
      mount(<DropdownList value={'hello'} />)
        .find('.rw-dropdown-list-input')
        .text(),
    ).to.equal('hello')
  })

  it('should respect textField and dataKeys', function () {
    expect(
      mount(
        <DropdownList
          defaultValue={0}
          data={data}
          textField={(i) => i.label}
          dataKey="id"
        />,
      )
        .find('.rw-dropdown-list-input')
        .text(),
    ).to.equal('jimmy')
  })

  it('should open when clicked', () => {
    let openSpy = sinon.spy()

    mount(<DropdownList onToggle={openSpy} />)
      .find('.rw-widget-picker')
      .simulate('click')

    expect(openSpy.calledOnce).to.equal(true)
    expect(openSpy.calledWith(true)).to.equal(true)
  })

  it.skip('should respect autoFocus', (done) => {
    const wrapper = mount(<DropdownList autoFocus />)

    setTimeout(() => {
      expect(wrapper.getDOMNode()).to.equal(document.activeElement)
      done()
    }, 50)
  })

  it('should not open when clicked while disabled or readOnly', () => {
    let openSpy = sinon.spy()

    mount(<DropdownList onToggle={openSpy} disabled />).simulate('click')

    mount(<DropdownList onToggle={openSpy} readOnly />).simulate('click')

    expect(openSpy.called).to.equal(false)
  })

  it('should start closed', () => {
    let inst = mount(
      <DropdownList
        value={data[0]}
        data={data}
        textField="label"
        dataKey="id"
      />,
    )

    expect(inst.prop('open')).to.not.equal(true)
    expect(inst.find('Popup').prop('open')).to.not.equal(true)

    inst.assertNone('.rw-open')
    inst.is(`[aria-expanded=false]`)
  })

  it('should toggle add aria when open', () => {
    let inst = mount(<DropdownList open />)

    expect(inst.prop('open')).to.equal(true)

    inst.is('[aria-expanded]')
    inst.assertSingle('Popup[open]')
    inst.assertSingle('Widget[open]')
  })

  it('should foward props to Popup', () => {
    let props = mount(<DropdownList open dropUp />)
      .find('Popup')
      .props()

    expect(props.dropUp).to.equal(true)
    expect(props.open).to.equal(true)
  })

  it('should simulate focus/blur events', () => {
    let blur = sinon.spy(),
      focus = sinon.spy()

    mount(<DropdownList onBlur={blur} onFocus={focus} />)
      .simulateWithTimers('focus')
      .simulateWithTimers('blur')

    expect(focus.calledOnce).to.equal(true)
    expect(blur.calledOnce).to.equal(true)
  })

  it('should not simulate focus/blur events when disabled', () => {
    let blur = sinon.spy(),
      focus = sinon.spy()

    mount(<DropdownList disabled onBlur={blur} onFocus={focus} />)
      .simulateWithTimers('focus')
      .simulateWithTimers('blur')

    expect(focus.called).to.equal(false)
    expect(blur.called).to.equal(false)
  })

  it('should simulate key events', function () {
    let kp = sinon.spy(),
      kd = sinon.spy(),
      ku = sinon.spy()

    mount(<DropdownList onKeyPress={kp} onKeyUp={ku} onKeyDown={kd} />)
      .simulate('keyPress')
      .simulate('keyDown')
      .simulate('keyUp')

    expect(kp.calledOnce).to.equal(true)
    expect(kd.calledOnce).to.equal(true)
    expect(ku.calledOnce).to.equal(true)
  })

  it('should add correct markup when read-only', () => {
    let input = mount(<DropdownList readOnly />).getDOMNode()

    expect(input.getAttribute('aria-readonly')).to.equal('true')
  })

  it('should add correct markup when disabled', () => {
    let input = mount(<DropdownList disabled />).getDOMNode()

    expect(input.getAttribute('aria-disabled')).to.equal('true')
  })

  it('should use a value template', function () {
    function ValueComponent({ item }) {
      return <span>{'hello - ' + item}</span>
    }

    expect(
      mount(
        <DropdownList defaultValue={'jimmy'} renderValue={ValueComponent} />,
      )
        .find('.rw-dropdown-list-value')
        .text(),
    ).to.equal('hello - jimmy')
  })

  it('should call onChange with event object from select', function () {
    let change = sinon.spy()

    act(() => {
      mount(
        <DropdownList
          open
          data={data}
          value={data[0]}
          searchTerm="foooo"
          onChange={change}
          onToggle={() => {}}
        />,
      )
        .find('List')
        .act((_) => _.prop('onChange')(null, { originalEvent: 'foo' }))
    })

    expect(change.getCall(0).args[1]).to.eql({
      originalEvent: 'foo',
      lastValue: data[0],
      searchTerm: 'foooo',
    })
  })

  it('should search values on typing when not filtering', () => {
    let change = sinon.spy()

    let inst = mount(
      <DropdownList
        open
        filter={false}
        value={data[0]}
        data={data}
        onChange={change}
        textField="label"
      />,
    ).simulateWithTimers('keyPress', { which: 80, key: 'p' })

    expect(inst.update().find('[data-rw-focused]').text()).to.equal(
      data[2].label,
    )
  })

  it('should search values on typing when not filtering - back direction', () => {
    let change = sinon.spy()

    let inst = mount(
      <DropdownList
        open
        delay={0}
        filter={false}
        value={data[2]}
        data={data}
        onChange={change}
        textField="label"
      />,
    ).simulateWithTimers('keyPress', { which: 74, key: 'j' })

    expect(
      inst.update().find('List').find('[data-rw-focused]').text(),
    ).to.equal(data[0].label)
  })
})
