import React from 'react'
import { mount } from 'enzyme'

import Month from '../src/Month'
import Provider from '../src/LocalizationProvider'

describe('Month Component', function() {
  it('should use the right format', () => {
    var date = new Date(2015, 1, 16, 0, 0, 0),
      formatter = sinon.spy(() => 'hi')

    const LocalizedMonth = Provider.withLocalizer(Month)
    mount(
      <LocalizedMonth
        value={date}
        focusedItem={date}
        onChange={() => {}}
        formats={{
          dayOfMonth: 'dd',
          dayFormat: 'd',
        }}
      />,
    )
      //.print()
      .tap(inst => expect(inst.first('td').contains('01')).to.equal(true))
      .setProps({
        formats: { dayOfMonth: '-d' },
      })
      .tap(inst => expect(inst.first('td').contains('-1')).to.equal(true))
      .setProps({
        formats: { dayOfMonth: formatter },
      })
      .tap(inst => expect(inst.first('td').contains('hi')).to.equal(true))

    expect(formatter.called).to.equal(true)
    expect(formatter.args[0].length).to.equal(2)
    expect(formatter.args[0][0]).to.be.a('Date')
    expect(formatter.args[0][1]).to.be.an('object')
  })
})
