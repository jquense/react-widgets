import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Container from './Container';
import DropdownList from '../src/DropdownList';

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
  .add('filter', () =>
    <Container>
      <DropdownList
        {...props}
        open
        filter="contains"
      />
    </Container>
  )
  .add('drop up', () =>
    <Container>
      <DropdownList
        {...props}
        open
        dropUp
        filter={false}
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
        defaultOpen
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
  .add('disabled items', () =>
    <Container>
      <DropdownList
        {...props}
        open
        disabled={[props.data[2]]}
        defaultValue={props.data[1]}
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
