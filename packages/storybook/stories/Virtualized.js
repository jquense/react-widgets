import React from 'react';
import { storiesOf } from '@kadira/storybook';

import _DropdownList from 'react-widgets/lib/DropdownList';
import withVirtualList from 'react-widgets-virtualized';

import Container from './Container';

import 'react-widgets-virtualized/lib/styles.css';

let DropdownList = withVirtualList(_DropdownList);

let generateNames = global.generateNames;

let props = {
  data: generateNames(2000),
  valueField: 'id',
  textField: 'fullName',
  filter: true,
}


storiesOf('Virtualization', module)
  .add('DropdownList', () =>
    <Container>
      <DropdownList
        {...props}
        defaultOpen
      />
    </Container>
  )
  .add('DropdownList open', () =>
    <Container>
      <DropdownList
        {...props}
        open
      />
    </Container>
  )
  .add('DropdownList groupBy', () =>
    <Container>
      <DropdownList
        {...props}
        defaultOpen
        groupBy="last"
      />
    </Container>
  )
  .add('Uniform type', () =>
    <Container>
      <DropdownList
        {...props}
        type="uniform"
      />
    </Container>
  )
  .add('Static item height', () =>
    <Container>
      <DropdownList
        {...props}
        defaultOpen
        itemSizeGetter={() => 25}
      />
    </Container>
  )
  .add('Variable item height', () =>
    <Container>
      <DropdownList
        {...props}
        itemComponent={({ item, index }) => (
          <div>
            {item.fullName}
            {index % 2 === 0
              ? <div><em>subtitle</em></div>
              : null
            }
          </div>
        )}
      />
    </Container>
  );
