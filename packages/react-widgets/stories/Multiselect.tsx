import React from 'react'
import Multiselect from '../src/Multiselect'

let props = {
  data: generateNames(),
  dataKey: 'id',
  textField: 'fullName',
  onChange: console.log.bind(null, 'change'),
}

export const Default = () => (
  <Multiselect
    {...props}
    focusFirstItem
    showSelectedItemsInList
    placeholder="Hello there"
    defaultValue={props.data.slice(1, 4)}
  />
)
export const Long_Search = () => (
  <Multiselect
    {...props}
    allowCreate="onFilter"
    onCreate={console.log.bind(null, 'onCreate')}
    defaultValue={props.data.slice(1, 2)}
    searchTerm="longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong"
  />
)
export const Create_tags = () => (
  <Multiselect
    {...props}
    allowCreate="onFilter"
    onCreate={console.log.bind(null, 'onCreate')}
    defaultValue={props.data.slice(0, 2)}
  />
)
export const Create_tags_always = () => (
  <Multiselect
    {...props}
    allowCreate
    onCreate={console.log.bind(null, 'onCreate')}
    defaultValue={props.data.slice(0, 2)}
  />
)
export const open = () => <Multiselect {...props} open />
export const busy = () => (
  <Multiselect {...props} busy defaultValue={props.data.slice(0, 3)} />
)

export const disabled = () => (
  <Multiselect {...props} disabled defaultValue={props.data.slice(0, 3)} />
)
export const fieldset_disabled = () => (
  <fieldset disabled>
    <legend>disabled fieldset</legend>

    <Multiselect {...props} defaultValue={props.data.slice(0, 3)} />
  </fieldset>
)
export const disabled_tags = () => (
  <Multiselect
    {...props}
    disabled={props.data.slice(2, 3)}
    defaultValue={props.data.slice(0, 3)}
  />
)
export const readonly = () => (
  <Multiselect {...props} readOnly defaultValue={props.data.slice(0, 3)} />
)
export const showPlaceholderWithValues = () => (
  <Multiselect
    {...props}
    placeholder="Hello there"
    showPlaceholderWithValues
    defaultValue={props.data.slice(0, 3)}
  />
)
export const long_tags = () => (
  <Multiselect
    style={{ width: 200 }}
    defaultValue={['joe', 'john jacob jingleheimer schmidt']}
  />
)
export const tag_component = () => (
  <Multiselect
    {...props}
    renderTagValue={({ item }) => (
      <span>
        <strong>{item.first}</strong> <em>{item.last}</em>
      </span>
    )}
    defaultValue={props.data.slice(0, 3)}
  />
)
