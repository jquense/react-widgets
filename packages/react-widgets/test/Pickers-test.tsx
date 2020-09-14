import { DropdownList, Multiselect, Combobox } from '../src'
import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}

describe('Pickers', () => {
  let data = [
    { label: 'jimmy', id: 0 },
    { label: 'sally', id: 1 },
    { label: 'pat', id: 2 },
    { label: 'betsy', id: 3 },
  ]

  ;[DropdownList, Combobox].forEach((Widget) => {
    it(`${Widget.displayName}: should navigate list`, () => {
      let inst = mount(
        <Widget defaultOpen data={data} textField="label" dataKey="id" />,
      )

      let listItems = () => inst.update().find('ListOption > div')

      inst.simulate('keyDown', { key: 'ArrowDown' })
      listItems().first().is('.rw-state-focus')

      inst.simulate('keyDown', { key: 'ArrowDown' })
      expect(listItems().at(1).is('.rw-state-focus')).to.equal(true)

      inst.simulate('keyDown', { key: 'ArrowUp' })
      expect(listItems().first().is('.rw-state-focus')).to.equal(true)

      inst.simulate('keyDown', { key: 'End' })
      expect(listItems().last().is('.rw-state-focus')).to.equal(true)

      inst.simulate('keyDown', { key: 'Home' })
      expect(listItems().first().is('.rw-state-focus')).to.equal(true)

      inst.simulate('keyDown', { key: 'End' })
      expect(listItems().last().is('.rw-state-focus')).to.equal(true)

      inst.simulate('keyDown', { key: 'Home' })
      expect(listItems().first().is('.rw-state-focus')).to.equal(true)
    })

    it(`${Widget.displayName}: navigate disabled items`, () => {
      let inst = mount(
        <Widget
          defaultOpen
          data={data}
          textField="label"
          dataKey="id"
          disabled={[data[0], data[2]]}
        />,
      )

      let listItems = () => inst.update().find('ListOption > div')

      inst.simulate('keyDown', { key: 'ArrowDown' })

      expect(listItems().at(1).is('.rw-state-focus')).to.equal(true)

      inst.simulate('keyDown', { key: 'ArrowDown' })

      expect(listItems().at(3).is('.rw-state-focus')).to.equal(true)

      inst.simulate('keyDown', { key: 'ArrowUp' })
      expect(listItems().at(1).is('.rw-state-focus')).to.equal(true)

      inst.simulate('keyDown', { key: 'ArrowUp' })
      expect(listItems().at(1).is('.rw-state-focus')).to.equal(true)
    })

    it(`${Widget.displayName}: should default focus to the selected value`, function () {
      let change = sinon.spy()
      let inst = mount(
        <Widget
          open={true}
          data={data}
          value={data[2]}
          textField="label"
          dataKey="id"
          onChange={change}
          onToggle={noop}
        />,
      )

      expect(inst.find('ListOption > div').length).to.equal(4)

      expect(
        inst.find('ListOption > div').at(2).is('.rw-state-focus'),
      ).to.equal(true)

      inst.simulate('keyDown', { key: 'ArrowDown' })

      expect(
        inst.update().find('ListOption > div').at(2).is('.rw-state-focus'),
      ).to.equal(false)

      expect(
        inst.update().find('ListOption > div').at(3).is('.rw-state-focus'),
      ).to.equal(true)
    })
  })

  //
  //
  ;[DropdownList, Combobox, Multiselect].forEach((Widget) => {
    it(`${Widget.displayName}: does not focus anything`, () => {
      let inst = mount(
        <Widget defaultOpen data={data} textField="label" dataKey="id" />,
      )

      let listItems = () => inst.update().find('ListOption > div')

      expect(listItems().find('.rw-state-focus').length).to.equal(0)
    })

    it(`${Widget.displayName}: focuses first item`, () => {
      let inst = mount(
        <Widget
          defaultOpen
          data={data}
          focusFirstItem
          textField="label"
          dataKey="id"
        />,
      )

      let listItems = () => inst.update().find('ListOption > div')

      expect(listItems().at(0).is('.rw-state-focus')).to.equal(true)
    })

    it(`${Widget.displayName}: should open on ArrowDown`, () => {
      let openSpy = sinon.spy()

      mount(<Widget data={data} onToggle={openSpy} />).simulate('keyDown', {
        key: 'ArrowDown',
      })

      expect(openSpy.calledOnce).to.equal(true)
      expect(openSpy.calledWith(true)).to.equal(true)
    })

    it(`${Widget.displayName}: should call onSelect`, function () {
      let change = sinon.spy()
      let onSelect = sinon.spy()

      mount(
        <Widget
          open
          data={data}
          onToggle={noop}
          onChange={change}
          onSelect={onSelect}
        />,
      )
        .find('List')
        .act((_) => _.prop('onChange')(data[1], { originalEvent: 'foo' }))

      expect(onSelect.calledOnce).to.equal(true)
      expect(onSelect.getCall(0).args[1]).to.eql({ originalEvent: 'foo' })

      expect(change.calledAfter(onSelect)).to.equal(true)
    })

    it(`${Widget.displayName}: should toggle add aria when open`, () => {
      let inst = mount(<Widget open />)

      expect(inst.prop('open')).to.equal(true)

      inst.assertSingle('Popup[open]')
      inst.assertSingle('Widget[open]')
      inst.assertSingle(
        Widget === DropdownList ? 'div[aria-expanded]' : 'input[aria-expanded]',
      )
    })

    it('should simulate key events', function () {
      let kp = sinon.spy()
      let kd = sinon.spy()
      let ku = sinon.spy()

      mount(<Widget onKeyPress={kp} onKeyUp={ku} onKeyDown={kd} />)
        .simulate('keyPress')
        .simulate('keyDown')
        .simulate('keyUp')

      expect(kp.calledOnce).to.equal(true)
      expect(kd.calledOnce).to.equal(true)
      expect(ku.calledOnce).to.equal(true)
    })

    it('should set id on list', () => {
      expect(
        mount(<Widget open />)
          .find('List')
          .prop('id'),
      ).to.be.a('string')
    })
  })
})
