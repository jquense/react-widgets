import React from 'react';
import { storiesOf } from '@storybook/react';

import { action } from './helpers'
import Container from './Container';
import DropdownList from 'react-widgets/lib/DropdownList';

let generateNames = global.generateNames;

let props = {
  data: generateNames(),
  valueField: 'id',
  textField: 'fullName'
}

storiesOf('DropdownList', module)
  .add('DropdownList', () =>
    <Container>
      <DropdownList
        {...props}
        filter="contains"
      />
    </Container>
  )
  .add('open', () =>
    <Container>
      <DropdownList
        {...props}
        open
        filter="contains"
      />
    </Container>
  )
  .add('Create option', () => (
    <Container>
      <DropdownList
        {...props}
        filter
        allowCreate="onFilter"
        onCreate={action('onCreate')}
      />
    </Container>
  ))
  .add('Create option: always', () => (
    <Container>
      <DropdownList
        {...props}
        allowCreate
        onCreate={action('onCreate')}
      />
    </Container>
  ))
  .add('no filter', () =>
    <Container>
      <DropdownList
        {...props}
        open
        filter={false}
      />
    </Container>
  )
  .add('drop up', () =>
    <Container>
      <DropdownList
        {...props}
        dropUp
        open
        filter
      />
    </Container>
  )
  .add('busy', () =>
    <Container>
      <DropdownList
        {...props}
        busy
        defaultValue={props.data[1]}
      />
    </Container>
  )
  .add('right to left', () =>
    <Container>
      <DropdownList
        {...props}
        isRtl
        busy
        defaultValue={props.data[1]}
      />
    </Container>
  )
  .add('ellipsis', () =>
    <Container>
      <DropdownList
        {...props}
        style={{ width: 80 }}
        defaultValue={props.data[1]}
      />
    </Container>
  )
  .add('grouped', () =>
    <Container>
      <DropdownList
        {...props}
        open
        defaultValue={props.data[1]}
        groupBy="last"
      />
    </Container>
  )
  .add('disabled', () =>
    <Container>
      <DropdownList
        {...props}
        disabled
        defaultValue={props.data[1]}
      />
    </Container>
  )
  .add('fieldset disabled', () =>
    <Container>
      <fieldset disabled>
        <legend>disabled Fieldset</legend>

        <DropdownList
          {...props}
          defaultValue={props.data[1]}
        />
      </fieldset>
    </Container>
  )
  .add('disabled items', () =>
    <Container>
      <DropdownList
        {...props}
        defaultOpen
        filter
        disabled={[props.data[2]]}
        defaultValue={props.data[1]}
      />
    </Container>
  )
  .add('disabled item, first focused', () =>
    <Container>
      <DropdownList
        {...props}
        defaultOpen
        disabled={props.data.slice(0, 2)}
      />
    </Container>
  )
  .add('readonly', () =>
    <Container>
      <DropdownList
        {...props}
        readOnly
        defaultValue={props.data[1]}
      />
    </Container>
  )
