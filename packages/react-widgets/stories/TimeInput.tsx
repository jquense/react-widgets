import React from 'react'
import TimeInput from '../src/TimeInput'
import Layout from '@4c/layout'


const change: any = (e) => console.log('change', e)

export const Basic = () => (
  <div className="flex-col space-y-4">
    <label>
      date and time of birth
      <input
        type="time"
        onChange={(e) => change(e.target.valueAsDate, e.target.value)}
      />
    </label>
    <label>
      Time is the label
      <TimeInput use12HourClock padValues={false} onChange={change} />
    </label>
    <TimeInput noClearButton onChange={change} />

    <Layout as="fieldset" direction="column" pad>
      <legend>Interaction</legend>
      <TimeInput use12HourClock disabled onChange={change} />
      <TimeInput use12HourClock readOnly onChange={change} />
    </Layout>

    <TimeInput onChange={change} />
    <TimeInput use12HourClock precision="milliseconds" onChange={change} />
    <TimeInput
      hoursAddon={<sub>h</sub>}
      minutesAddon={<sub>m</sub>}
      secondsAddon={<sub>s</sub>}
    />
  </div>
)
