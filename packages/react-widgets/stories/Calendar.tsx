import React, { useState } from 'react'
import Calendar from '../src/Calendar'

export const BASIC = () => <Calendar />

export const min = () => <Calendar min={new Date()} />

export const max = () => <Calendar max={new Date()} />

export const disabled = () => <Calendar disabled />

export const readOnly = () => <Calendar readOnly />

export const views = () => <Calendar views={['year', 'decade']} />

export const defaultView = () => <Calendar defaultView="decade" />

export const CurrentDate = () => {
  const [value, setValue] = useState<Date>()

  return (
    <>
      <Calendar value={value} onChange={setValue} />
      <button onClick={() => setValue(new Date())}>change date</button>
    </>
  )
}
