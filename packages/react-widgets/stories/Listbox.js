import React from 'react'
import Listbox from '../src/Listbox'

let generateNames = global.generateNames

let data = generateNames()
let props = {
  data,
  dataKey: 'id',
  textField: 'fullName',
  onChange: console.log.bind(null, 'change'),
}

export default {
  title: 'Listbox 222',
}

export const Default = () => (
  <>
    <input />
    <Listbox {...props} />
  </>
)

export const multiple = () => (
  <Listbox {...props} multiple defaultValue={props.data.slice(0, 3)} />
)
export const disabled = () => (
  <Listbox {...props} disabled defaultValue={props.data.slice(0, 3)} />
)
export const fieldset_disabled = () => (
  <fieldset disabled>
    <legend>disabled fieldset</legend>

    <Listbox {...props} defaultValue={props.data.slice(0, 3)} />
  </fieldset>
)
export const disabled_items = () => (
  <Listbox
    {...props}
    multiple
    defaultValue={[data[3]]}
    disabled={[data[3], data[5]]}
  />
)
export const readonly = () => (
  <Listbox {...props} readOnly defaultValue={props.data.slice(0, 3)} />
)
export const Item_Component = () => (
  <Listbox
    {...props}
    defaultValue={props.data.slice(0, 3)}
    renderItem={({ item }) => (
      <div>
        <div>{item.first}</div>
        <div>{item.last}</div>
      </div>
    )}
  />
)
