import React from 'react'
import Combobox from '../src/Combobox'

let props = {
  data: generateNames(),
  dataKey: 'id',
  textField: 'fullName',
}

function Disabled() {
  const [disabled, setDisabled] = React.useState(false)
  return (
    <>
      <Combobox {...props} disabled={disabled} defaultValue={props.data[1]} />
      <button onClick={() => setDisabled((s) => !s)}>toggle</button>
    </>
  )
}

export const Default = () => (
  <Combobox {...props} defaultValue={props.data[3]} filter="contains" />
)

export const busy = () => (
  <Combobox {...props} busy defaultValue={props.data[1]} />
)

export const hideCaret = () => <Combobox {...props} hideCaret />

export const disabled = () => <Disabled />

export const fieldsetDisabled = () => (
  <fieldset disabled>
    <legend>disabled Fieldset</legend>

    <Combobox {...props} defaultValue={props.data[1]} />
  </fieldset>
)

export const disabledItems = () => (
  <Combobox
    {...props}
    open
    disabled={[props.data[2]]}
    defaultValue={props.data[1]}
  />
)

export const disabled_item_first_focused = () => (
  <Combobox {...props} open disabled={props.data.slice(0, 2)} />
)

export const readOnly = () => (
  <Combobox {...props} readOnly defaultValue={props.data[1]} />
)
