import React, { useState } from 'react'
import DatePicker from '../src/DatePicker'

export const Default = () => <DatePicker />
export const Formats = () => (
  <DatePicker
    defaultValue={new Date()}
    valueDisplayFormat={{ dateStyle: 'full' }}
    valueEditFormat={{ dateStyle: 'medium' }}
  />
)
export const open = () => (
  <DatePicker
    open
    timeInputProps={{ use12HourClock: true, noClearButton: true }}
  />
)

export const parsers = () => <DatePicker parse={(d) => new Date(d)} />

export const fieldset_disabled = () => (
  <fieldset disabled>
    <legend>disabled Fieldset</legend>

    <DatePicker defaultValue={new Date()} />
  </fieldset>
)

export const Current_date = () => {
  const [value, setValue] = useState<Date>()

  return (
    <>
      <DatePicker value={value} onChange={(d) => setValue(d)} />
      <button onClick={() => setValue(new Date())}>change date</button>
    </>
  )
}
