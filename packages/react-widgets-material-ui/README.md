`react-widgets-virtualized`
===

Provides a Higher Order Function for adding virtualization to react-widgets inputs with lists. Under the hood it uses
the excellent [`react-list`](https://github.com/orgsync/react-list).

## Install

```sh
  npm install react-widgets-virtualized --save
```

## Usage

```js
import DropdownList from 'react-widgets/lib/DropdownList';
import virtualize from 'react-widgets-virtualized';

let VirtualDropdownList = virtualize(DropdownList);

function MyExample() {
  return (
    <div>
      Here is a dropdown!

      <VirtualDropdownList
        data={bigList}
        type="uniform"
        itemSizeGetter={()=> 30}
      />
    </div>
  )
}
```

The HOC works with: `DropdownList`, `ComboBox`, `Multiselect`, and `SelectList`. Each component accepts all
the normal widget props as well as a few of the react-list props including

- `type`
- `pageSize`
- `threshold`
- `useStaticSize`
- `useTranslate3d`
- `itemSizeGetter`
- `itemSizeEstimator`

Note, that instead of the react-list `itemRenderer` you can continue to use `itemComponent` from react-widgets to
provide custom rendering of each list item.
