import React from 'react'
import Numberpicker from '../src//NumberPicker'

let props = {
  onChange: console.log.bind(null, 'change'),
}

export const Default = () => <Numberpicker {...props} />

export const format = () => (
  <Numberpicker {...props} min={250} format="d" defaultValue={2405.43534} />
)

export const min = () => (
  <Numberpicker {...props} min={250} defaultValue={2405} />
)

export const disabled = () => (
  <Numberpicker {...props} disabled defaultValue={2405} />
)

export const fieldset_disabled = () => (
  <fieldset disabled>
    <legend>disabled Fieldset</legend>

    <Numberpicker {...props} defaultValue={2405} />
  </fieldset>
)

export const readonly = () => (
  <Numberpicker {...props} readOnly defaultValue={2405} />
)
