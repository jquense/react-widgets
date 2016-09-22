
A select listbox alternative

<--------------->

### value?{ type: 'array<mixed>', handler: "onChange", controllable: true }

The current values of the {widgetName}. The value should can `null`, or an array
of `valueField` values, or an array of objects (such as a few items in the `data` array)

<EditableExample codeText={require('../examples/value')(widgetName, true)}/>

### onChange?{type:'function(array<mixed> values)'}

change event Handler that is called when the value is changed. The handler is called with an array of values

<EditableExample codeText={require('../examples/onChange')(widgetName, true)}/>

### onSelect?{ type:'function(value: ?mixed)'}

This handler fires when an item has been selected from the list. It fires before the `onChange` handler, and fires
regardless of whether the value has actually changed.

### onCreate?{ type: 'function(searchTerm: string)'}

This handler fires when the user chooses to create a new tag, not in the data list. It is up to the widget parent to implement creation logic,
a common implementation is shown below, where the new tag is selected and added to the data list.

<EditableExample codeText={require('../examples/onCreate')(widgetName)}/>

### data?{ type: 'array'}

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

Specify which data item field to display in the ${widgetName} and selected item. The `textField` prop
may also also used as to find an item in the list as you type. Providing an accessor function allows for computed text values

<EditableExample codeText={require('../examples/textField')(widgetName, true)}/>

### tagComponent?{ type: 'Component | function({ item: ?any }) -> ReactElement' }

This component is used to render each selected item. The default component
renders the text of the selected item (specified by `textfield`)

<EditableExample codeText={require('../examples/tagComponent')(widgetName, true)}/>

### itemComponent?{ type: 'Component | function({ item: ?any }) -> ReactElement' }

This component is used to render each possible item in the list. The default component
renders the text of the selected item (specified by `textfield`)

<EditableExample codeText={require('../examples/itemComponent')(widgetName, true)}/>

### groupBy?{ type: 'string | function(dataItem: ?mixed) -> bool' }

Determines how to group the {widgetName} values. Providing a `string` will group
the `data` array by that property. You can also provide a 'function' which should return the group value.

<EditableExample codeText={require('../examples/groupby')(widgetName, true)}/>

### groupComponent?{ type: 'Component | function({ item: ?any }) -> ReactElement' }

This component is used to render each option group, when `groupBy` is specified. By
default the `groupBy` value will be used.

<EditableExample codeText={require('../examples/groupComponent')(widgetName, true)}/>

### placeholder?{ type: 'string' }

The same as an input placeholder, only works in browsers that support the placeholder attribute for inputs

### searchTerm?{ type: 'string', handler: 'onSearch', controllable: true }

The string value of the current search being typed into the {widgetName}. When
unset (`undefined`) the {widgetName} will handle the filtering internally.
The `defaultSearchTerm` prop can be used to set an initialization value for uncontrolled widgets.


### onSearch?{ type: 'function(searchTerm: string)' }

Called when the value of the text box changes either from typing or a pasted value. `onSearch` should
be used when the `searchTerm` prop is set.

### open?{ type: 'bool' }

Whether or not the {widgetName} is open. When unset (`undefined`) the {widgetName} will handle the
opening and closing internally. The `defaultOpen` prop can be used to set an
initialization value for uncontrolled widgets.

<EditableExample codeText={require('../examples/open')(widgetName, true)}/>

### onToggle?{ type: 'function(isOpen: bool)' }
Called when the {widgetName} is about to open or close. `onToggle` should be used
when the `open` prop is set otherwise the widget will never open or close.

### filter?{ type: 'string | function(dataItem: ?mixed, searchTerm: string) -> bool', default: 'startsWith' }

Specify a filtering method used to reduce the items in the dropdown as you type. There are a few built-in filtering
methods that can be specified by passing the `string` name. You can explicitly opt out of filtering by
setting filter to `false`

To handle custom filtering techniques provide a `function` that returns `true` or `false` for each passed in item
(analogous to the [`array.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) builtin)

Acceptable values for filter are: `false` `"startsWith"` `"endsWith"` `"contains"` `function(string item)`

<EditableExample codeText={require('../examples/filter')(widgetName)}/>

### caseSensitive?{ type: 'bool', default: 'false' }
Use in conjunction with the filter prop. Filter the list without regard for case. This only applies to non function values for `filter`

### minLength?{ type: 'number', default: '1' }
Use in conjunction with the filter prop. Start filtering the list only after the value has reached a minimum length.

### busy?{ type: 'bool', default: "false" }

mark whether the widget is in a busy or loading state. If `true` the widget will display a spinner gif, useful
when loading data via an ajax call.

### duration?{ type: 'number', default: "250" }

The speed, in milliseconds, of the dropdown animation.

### disabled?{ type: 'bool | array<?mixed>' }

Disable the widget, If an `Array` of values is passed in only the tags specified will be disabled.

<EditableExample codeText={require('../examples/disabled')(widgetName, 'disabled')}/>

### readOnly?{ type: 'bool | array<?mixed>' }

Place the widget in a readonly mode, If an `Array` of values is passed in only the tags specified will be readonly.

<EditableExample codeText={require('../examples/disabled')(widgetName, 'readOnly')}/>

### isRtl?{ type: 'bool', default:"false" }

mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through
a `childContext` prop (`isRtl`) this allows higher level application components to specify the direction.


### messages?{ type: 'object' }

Object hash containing display text and/or text for screen readers. Use the `messages` object to
localize widget text and increase accessibility.


### messages.createNew?{type: 'string | function(props) -> node', default: '"(create new tag)"' }

The text label for creating new tags

### messages.emptyList?{ type: 'string | function(props) -> node', default: '"There are no items in this list"' }

Text to display when the `data` prop array is empty

### messages.emptyFilter?{ type: 'string | function(props) -> node', default: '"The filter returned no results"' }

Text to display when the the current filter does not return any results

## Keyboard shortcuts

* <kbd>down arrow</kbd> open dropdown, and move focus to next item
* <kbd>up arrow</kbd> move focus to previous item
* <kbd>alt + up arrow</kbd> close dropdown

* <kbd>left arrow</kbd> move focus to previous selected tag
* <kbd>right arrow</kbd> move focus to previous selected tag
* <kbd>delete</kbd> unselect focused tag
* <kbd>backspace</kbd> remove next selected tag

* <kbd>home</kbd> move focus to first item
* <kbd>end</kbd> move focus to last item

* <kbd>enter</kbd> select focused item
* <kbd>ctrl + enter</kbd> create new tag from current search term

* <kbd>any key</kbd> search list for item starting with key
