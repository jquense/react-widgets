### value?{ type: 'Any', handler: "onChange", controllable: true }

The current value of the {widgetName}. This can be an object (such as a member of the `data` array) or a primitive value, hinted to by the `valueField`. The widget value does not need to be in the `data` array; widgets can have values that are not in their list.

<EditableExample codeText={require('../examples/value')(widgetName)}/>

### onChange?{ type: 'Function(Any value)' }

Change event Handler that is called when the value is changed.

<EditableExample codeText={require('../examples/onChange')(widgetName)}/>

### onSelect?{ type: 'Function(Any value)' }

This handler fires when an item has been selected from the list. It fires before the `onChange` handler, and fires
regardless of whether the value has actually changed.

<EditableExample codeText={require('../examples/onSelect')(widgetName)}/>

### data?{ type: 'Array<Any>' }

provide an array of possible values for the DropdownList. If an array of `objects` is provided you
should use the `valueField` and `textField` props, to specify which object
properties comprise the value field (such as an id) and the field used to label the item.

### valueField?{ type: 'String' }

A dataItem field name for uniquely identifying items in the `data` list. A `valueField` is required
when the `value` prop is not itself a dataItem. A `valueField` is useful when specifying the selected item, by
its `id` instead of using the model as the value.

When a `valueField` is not provided, the {widgetName} will use strict equality checks (`===`) to locate
the `value` in the `data` list.

<EditableExample codeText={require('../examples/valueField')(widgetName)}/>

### textField?{ type: 'String | Function(dataItem)' }

{`Specify which data item field to display in the ${widgetName} and selected item. The `}`textField`{`prop
may also also used as to find an item in the list as you type. Providing an accessor function allows for computed text values`}

<EditableExample codeText={require('../examples/textField')(widgetName)}/>

### valueComponent?{ type: 'Component' }

This component is used to render the selected value of the combobox. The default component
renders the text of the selected item (specified by `textfield`)

<EditableExample codeText={require('../examples/valueComponent')(widgetName)}/>

### itemComponent?{ type: 'Component' }

This component is used to render each possible item in the DropdownList. The default component
renders the text of the selected item (specified by `textfield`)

<EditableExample codeText={require('../examples/itemComponent')(widgetName)}/>

### groupBy?{ type: 'String | Function(Any dataItem)' }

Determines how to group the {widgetName} dropdown list. Providing a `string` will group
the `data` array by that property. You can also provide a function which should return the group value.

<EditableExample codeText={require('../examples/groupby')(widgetName)}/>

### groupComponent?{ type: 'Component' }

This component is used to render each option group, when `groupBy` is specified. By
default the `groupBy` value will be used.


<EditableExample codeText={require('../examples/groupComponent')(widgetName)}/>

### placeholder?{ type: 'String' }

Text to display when the value is empty.


### searchTerm?{ type: 'String', handler: 'onSearch', controllable: true }

The string value of the current search being typed into the {widgetName}. When
unset (`undefined`) the {widgetName} will handle the filtering internally.
The `defaultSearchTerm` prop can be used to set an initialization value for uncontrolled widgets. searchTerm is only
relevant when the `filter` prop is set.


### onSearch?{ type: 'Function(String searchTerm)' }

Called when the value of the filter input changes either from typing or a pasted value.&nbsp;
`onSearch` should be used when the `searchTerm` prop
is set.

### open?{ type: 'Boolean' }

Whether or not the {widgetName} is open. When unset (`undefined`) the {widgetName} will handle the
opening and closing internally. The `defaultOpen` prop can be used to set an
initialization value for uncontrolled widgets.

<EditableExample codeText={require('../examples/open')(widgetName)}/>

### onToggle?{ type: 'Function(Boolean isOpen)' }

Called when the {widgetName} is about to open or close. `onToggle` should be used
when the `open` prop is set otherwise the widget open buttons won't work.

### tetherPopup?{ type: 'Boolean' }

Flag the {widgetName} to tether its popup instead of positioning it absolutely. Big thanks to [tetherJS](http://github.hubspot.com/tether/).

*Note: This option replaces the drop-in animation with a fade do to fixed positioning.*

<EditableExample codeText={require('../examples/tetherPopup')(widgetName)}/>

### afterListComponent?{type: 'Component'}

Place a component after the list. Use for custom widget areas, adder buttons, and more.

The `DropdownList` passes the following props to the `afterListComponent`:
- value
- onChange
- data
- filter
- searchTerm

<EditableExample codeText={require('../examples/afterListComponent')(widgetName)}/>

### filter?{ type: '[String, Function(dataItem, searchTerm)]', default: 'false' }

Specify a filtering method used to reduce the items in the dropdown as you type. There are a few prebuilt filtering
methods that can be specified by passing the `String` name.

To handle custom filtering techniques provide a `function` that returns `true` or `false` for each passed in item
(analogous to the [array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) builtin)

Acceptable values for filter are: `false` `"startsWith"` `"endsWith"` `"contains"` `function(String item)`

<EditableExample codeText={require('../examples/filter')(widgetName)}/>

### caseSensitive?{ type: 'Boolean', default: 'false' }
Use in conjunction with the filter prop. Filter the list without regard for case. This only applies to non function values for `filter`

### minLength?{ type: 'Boolean', default: '1' }
Use in conjunction with the filter prop. Start filtering the list only after the value has reached a minimum length.

### busy?{ type: 'Boolean', default: "false" }

mark whether the widget is in a busy or loading state. If `true` the widget will display a spinner gif, useful
when loading data via an ajax call.

<EditableExample codeText={require('../examples/busy')(widgetName)}/>

### duration?{ type: 'Number', default: "250" }

The speed, in milliseconds, of the dropdown animation.


### isRtl?{ type: 'Boolean', default: "false" }

mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through
 a `childContext` prop (`isRtl`) this allows higher level application components to specify the direction.

### messages?{ type: 'Object' }

Object hash containing display text and/or text for screen readers. Use the `messages` object to
localize widget text and increase accessibility.

### messages.open?{ type: 'String | Function(props)', default: '"Open Dropdown"' }

Dropdown button text for screen readers.

### messages.filterPlaceholder?{ type: 'String | Function(props)' }

The placeholder text for the filter input.

### messages.emptyList?{ type: 'String | Function(props)', default: '"There are no items in this list"' }

Text to display when the `data` prop array is empty.

### messages.emptyFilter?{ type: 'String | Function(props)', default: '"The filter returned no results"' }

Text to display when the the current filter does not return any results.

## Keyboard Navigation

- <kbd>alt + down arrow</kbd> open dropdown
- <kbd>alt + up arrow</kbd> close dropdown
- <kbd>down arrow</kbd> move focus to next item
- <kbd>up arrow</kbd> move focus to previous item
- <kbd>home</kbd> move focus to first item
- <kbd>end</kbd> move focus to last item
- <kbd>enter</kbd> select focused item
- <kbd>any key</kbd> search list for item starting with key
