import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Container from './Container';
import DropdownList from 'react-widgets-virtualized/lib/DropdownList';

let generateNames = global.generateNames;

let props = {
  data: generateNames(1000),
  valueField: 'id',
  textField: 'fullName'
}


storiesOf('Virtualization', module)
  .add('DropdownList', () =>
    <Container>
      <DropdownList
        {...props}
        itemHeight={25}
      />
    </Container>
  )
  .add('DropdownList open', () =>
    <Container>
      <DropdownList
        {...props}
        open
        itemHeight={25}
      />
    </Container>
  );
