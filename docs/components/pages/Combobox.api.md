
Select an item from the list, or input a custom value. The {widgetName} can also make suggestions as you type.

<--------------->

### value?{ type: 'mixed', handler: "onChange", controllable: true }

The current value of the {widgetName}. This can be an object (such as a member of the `data` array)
or a primitive value, hinted to by the `valueField`. The widget value does not need to be in
the `data`, widgets can have values that are not in their list.

<EditableExample codeText={require('../examples/value')(widgetName)}/>

### onChange?{ type: 'function(value: ?mixed)' }

Called when the value is changed. If the value is one of the `data` members
that item will be returned. In the case of a value not being found in the `data` array
the string value of the {widgetName} will be returned.

<EditableExample codeText={require('../examples/onChange')(widgetName)}/>

### onSelect?{ type: 'function(value: ?mixed)' }

This handler fires when an item has been selected from the list. It fires before the `onChange` handler, and fires
regardless of whether the value has actually changed.

<EditableExample codeText={require('../examples/onSelect')(widgetName)}/>

### data?{ type: 'array<mixed>' }

An array of possible values for the {widgetName}. If an array of `objects` is provided you
should use the `valueField` and `textField` props, to specify which object
properties comprise the value field (such as an id) and the field used to label the item.

### valueField?{ type: 'string' }

A dataItem field name for uniquely identifying items in the `data` list. A `valueField` is required
when the `value` prop is not itself a dataItem. A `valueField` is useful when specifying the selected item, by
its `id` instead of using the model as the value.


When a `valueField` is not provided, the {widgetName} will use strict equality checks (`===`) to locate
the `value` in the `data` list.

<EditableExample codeText={require('../examples/valueField')(widgetName)}/>

### textField?{ type: 'string | function(dataItem: ?mixed) -> string' }

Specify which data item field to display in the ${widgetName} and selected item. The textField` prop
may also also used as to find an item in the list as you type. Providing an accessor function allows for computed text values

<EditableExample codeText={require('../examples/textField')(widgetName, false, true)}/>

### itemComponent?{ type: 'Component | function({ item: ?mixed }) -> ReactElement' }

This component is used to render each possible item in the ${widgetName}. The default component
renders the text of the selected item (specified by `textfield`)

<EditableExample codeText={require('../examples/itemComponent')(widgetName)}/>

### disabled?{ type: 'bool | array' }

Disable the widget, if an Array of values is passed in only those values will be disabled.

<EditableExample codeText={require('../examples/disabled')(widgetName, 'disabled', false)}/>

### readOnly?{ type: 'bool | array' }

Place the {widgetName} in a read-only mode, If an `Array` of values is passed in only those values will be read-only.

<EditableExample codeText={require('../examples/disabled')(widgetName, 'readOnly', false)}/>

### groupBy?{ type: 'string | function(dataItem: string) -> string' }

Determines how to group the {widgetName}. Providing a `string` will group
the `data` array by that property. You can also provide a function which should return the group value.

<EditableExample codeText={require('../examples/groupby')(widgetName)}/>

### groupComponent?{ type: 'Component | function({ item: ?mixed }) -> ReactElement' }

This component is used to render each option group, when `groupBy` is specified. By
default the `groupBy` value will be used.

<EditableExample codeText={require('../examples/groupComponent')(widgetName)}/>

### suggest?{ type: 'bool', default: 'false' }

When `true` the {widgetName} will suggest, or fill in, values as you type. The suggestions
are always "startsWith", meaning it will search from the start of the `textField` property

### filter?{ type: 'bool | string | function(dataItem: ?mixed, searchTerm: string) -> bool', default: 'false' }

Specify a filtering method used to reduce the items in the dropdown as you type. It can be used in conjunction with
the `suggest` prop or instead of it. There are a few built-in filtering methods that can be specified
by passing the `string` name. You can explicitly opt out of filtering by setting filter
to `false`

To handle custom filtering techniques provide a `function` that returns `true` or `false` for each passed in item
(analogous to the [array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array/filter) builtin)

Acceptable values for filter are: `false` `"startsWith"` `"endsWith"` `"contains"` `function(string item)`

<EditableExample codeText={require('../examples/filter')(widgetName)}/>

### caseSensitive?{ type: 'bool', default: 'false' }
Use in conjunction with the filter prop. Filter the list without regard for case. This only applies to non function values for `filter`

### minLength?{ type: 'number', default: '1' }
Use in conjunction with the filter prop. Start filtering the list only after the value has reached a minimum length.

### open?{ type: 'bool' }

Whether or not the {widgetName} is open. When unset (`undefined`) the {widgetName} will handle the
opening and closing internally. The `defaultOpen` prop can be used to set an
initialization value for uncontrolled widgets.

<EditableExample codeText={require('../examples/open')(widgetName)}/>

### onToggle?{ type: 'function(isOpen: bool)' }

Called fires when the {widgetName} is about to open or close. `onToggle` should be used
when the `open` prop is set otherwise the widget will never open or close.


### busy?{ type: 'bool', default: "false" }

Mark whether the widget is in a busy or loading state. If `true` the widget will display a spinner gif, useful
when loading data via an ajax call.

<EditableExample codeText={require('../examples/busy')(widgetName)}/>

### duration?{ type: 'number', default: "250" }

The speed, in milliseconds, of the dropdown animation.


### isRtl?{ type: 'bool', default: "false" }

mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through
 a `childContext` prop (`isRtl`) this allows higher level application components to specify the direction.

### messages?{ type: 'object' }

Object hash containing display text and/or text for screen readers. Use the `messages` object to
localize widget text and increase accessibility.

### messages.open?{ type: 'string | function(props) -> node', default: '"Open Combobox"' }

{widgetName} button text for screen readers

### messages.emptyList?{ type: 'string | function(props) -> node', default: '"There are no items in this list"' }

text to display when the `data` prop array is empty

### messages.emptyFilter?{ type: 'string | function(props) -> node', default: '"The filter returned no results"' }

text to display when the the current filter does not return any results

## Keyboard Navigation

- <kbd>alt + down arrow</kbd> open dropdown
- <kbd>alt + up arrow</kbd> close dropdown
- <kbd>down arrow</kbd> move focus to next item
- <kbd>up arrow</kbd> move focus to previous item
- <kbd>home</kbd> move focus to first item
- <kbd>end</kbd> move focus to last item
- <kbd>enter</kbd> select focused item
- <kbd>any key</kbd> search list for item starting with key
