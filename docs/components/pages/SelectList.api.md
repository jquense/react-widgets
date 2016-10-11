Creates a list of radio buttons or checkboxes bound to a data set.

<------------------------>

### value?{ type: 'mixed|array<mixed>', handler:"onChange", controllable: true }

The current value or values of the {widgetName}. This can be an object (such as a member of the `data` array)
or a primitive value, hinted to by the `valueField`. The widget value does not need to be in
the `data` array; widgets can have values that are not in their list.

<EditableExample codeText={require('../examples/value')(widgetName, true)}/>

### onChange?{ type: 'Function(array<mixed>|value: ?mixeds)' }

Change event handler that is called when the value is changed. `values` will be an array
when `multiple` prop is set.

<EditableExample codeText={require('../examples/onChange')(widgetName, true)}/>

### data?{ type: 'array<mixed>' }

provide an array of possible values for the {widgetName}. If an array of `objects` is provided you
should use the `valueField` and `textField` props, to specify which object
properties comprise the value field (such as an id) and the field used to label the item.

### valueField?{ type: 'string' }

A dataItem field name for uniquely identifying items in the `data` list. A `valueField` is required
when the `value` prop is not itself a dataItem. A `valueField` is useful when specifying the selected item, by
its `id` instead of using the model as the value.

When a `valueField` is not provided, the {widgetName} will use strict equality checks (`===`) to locate
the `value` in the `data` list.

<EditableExample codeText={require('../examples/valueField')(widgetName, true)}/>

### textField?{ type: 'string | function(dataItem: ?mixed) -> string' }

Specify which data item field to display in the ${widgetName} and selected item. The `textField` prop may also also
used as to find an item in the list as you type. Providing an accessor function allows for computed text values

<EditableExample codeText={require('../examples/textField')(widgetName, true)}/>

### multiple?{ type: 'bool' }

Whether or not the {widgetName} allows multiple selection or not. when `false` the {widgetName} will
render as a list of radio buttons, and checkboxes when `true`.

### itemComponent?{ type: 'Component | function({ item: ?mixed }) -> ReactElement' }

This component is used to render each item in the {widgetName}. The default component
renders the text of the selected item (specified by `textfield`)

<EditableExample codeText={require('../examples/itemComponent')(widgetName, true)}/>

### groupBy?{ type: 'string | function(dataItem: ?mixed) -> bool' }

Determines how to group the {widgetName} dropdown list. Providing a `string` will group
the `data` array by that property. You can also provide a 'function' which should return the group value.

<EditableExample codeText={require('../examples/groupby')(widgetName, true)}/>

### groupComponent?{ type: 'Component | function({ item: ?mixed }) -> ReactElement' }

This component is used to render each option group, when `groupBy` is specified. By
default the `groupBy` value will be used.

<EditableExample codeText={require('../examples/groupComponent')(widgetName, true)}/>


### onMove?{ type: 'Function(list: HTMLElement, focusedNode: HTMLElement, focusedItem: ?mixed)' }

A handler called when focus shifts on the {widgetName}. Internally this is used to ensure the focused item is in view.
If you want to define your own "scrollTo" behavior or just disable the default one specify an `onMove` handler.
The handler is called with the relevant DOM nodes needed to implement scroll behavior: the list element,
the element that is currently focused, and a focused value.


### busy?{ type: 'bool', default: "false" }

mark whether the widget is in a busy or loading state. If `true` the widget will display a spinner gif, useful
when loading data via an ajax call.

### disabled?{ type: 'bool | array<?mixed>' }

Disable the widget, if an `Array` of values is passed in only those values will be disabled.

<EditableExample codeText={require('../examples/disabled')(widgetName, 'disabled')}/>

### readOnly?{ type: 'bool | array<?mixed>' }

Place the {widgetName} in a read-only mode, If an `Array` of values is passed in only those values will be read-only.

<EditableExample codeText={require('../examples/disabled')(widgetName, 'readOnly')}/>


### isRtl?{ type: 'bool', default:"false" }

mark whether the {widgetName} should render right-to-left. This property can also be implicitly passed to the widget through a `childContext` prop (`isRtl`) this allows higher level application components to specify the direction.

### messages?{ type: 'object' }

Object hash containing display text and/or text for screen readers. Use the `messages` object to
localize widget text and increase accessibility.

### messages.emptyList?{ type: 'string | function(props) -> node', default: '"There are no items in this list"' }

Text to display when the `data` prop array is empty

## Keyboard Navigation

- <kbd>down arrow</kbd> move focus to or select next item
- <kbd>up arrow</kbd> move focus to or select previous item

- <kbd>home</kbd> move focus to or select first item
- <kbd>end</kbd> move focus to or select last item

- <kbd>spacebar</kbd> <kbd>enter</kbd> toggle focused item
- <kbd>ctrl + a</kbd> toggle select all/select none
- <kbd>any key</kbd> search list for item starting with key
