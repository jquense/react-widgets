import React from 'react'
import DropdownList from '../src/DropdownList'

let props = {
  data: generateNames(),
  dataKey: 'id',
  textField: 'fullName',
}

// export const states = ['NJ', 'NY']

export const default_example = () => (
  <DropdownList {...props} filter="contains" />
)

export const open = () => <DropdownList {...props} open filter="contains" />

export const Create_option = () => (
  <DropdownList
    {...props}
    filter
    allowCreate="onFilter"
    onCreate={console.log.bind(null, 'onCreate')}
  />
)

export const Create_option_always = () => (
  <DropdownList
    {...props}
    allowCreate
    onCreate={console.log.bind(null, 'onCreate')}
  />
)

export const no_filter = () => <DropdownList {...props} filter={false} />

export const drop_up = () => <DropdownList {...props} dropUp open filter />

export const busy = () => (
  <DropdownList {...props} busy defaultValue={props.data[1]} />
)

export const ellipsis = () => (
  <DropdownList {...props} style={{ width: 80 }} defaultValue={props.data[1]} />
)

export const grouped = () => (
  <DropdownList {...props} open defaultValue={props.data[1]} groupBy="last" />
)

export const disabled = () => (
  <DropdownList {...props} disabled defaultValue={props.data[1]} />
)

export const fieldset_disabled = () => (
  <fieldset disabled>
    <legend>disabled Fieldset</legend>

    <DropdownList {...props} defaultValue={props.data[1]} />
  </fieldset>
)

export const disabled_items = () => (
  <DropdownList
    {...props}
    defaultOpen
    filter
    disabled={[props.data[2]]}
    defaultValue={props.data[1]}
  />
)

export const disabled_item_first_focused = () => (
  <DropdownList
    {...props}
    defaultOpen
    focusFirstItem
    disabled={props.data.slice(0, 2)}
  />
)

export const readonly = () => (
  <DropdownList {...props} readOnly defaultValue={props.data[1]} />
)

export const autofill = () => (
  <form>
    <div>
      <label>
        Name
        <input name="name" />
      </label>
    </div>
    <div>
      <label>
        Address
        <input name="line" />
      </label>
    </div>
    <div>
      <label>
        State
        <DropdownList name="state" data={['NJ', 'MA', 'NY', 'AL', 'CA']} />
        {/* <select>
              <option value=""> </option>
              <option value="NJ">New Jersey</option>
              <option value="NY">New York</option>
            </select> */}
      </label>
    </div>
    <div>
      <label>
        Country
        <input name="country" />
      </label>
    </div>
    <div>
      <label>
        City
        <input name="city" />
        {/* <DropdownList name="city" {...props} /> */}
      </label>
    </div>
    <div>
      <label>
        Zip
        <input name="postalCode" />
      </label>
    </div>
  </form>
)
