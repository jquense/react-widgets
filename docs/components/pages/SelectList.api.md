Creates a list of radio buttons or checkboxes bound to a data set.

<------------------------>

### value?{ type: 'mixed|array<mixed>', controllable: "onChange"  }

${language.valuePicker}

<EditableExample codeText={require('../examples/value')(widgetName, true)}/>

### onChange?{ type: 'Function(array<mixed>|value: ?mixed)', controllable: "value"  }

${language.onChange}

<EditableExample codeText={require('../examples/onChange')(widgetName, true)}/>

### data?{ type: 'array<mixed>' }

${language.data}

### valueField?{ type: 'string' }

${language.valueField}

<EditableExample codeText={require('../examples/valueField')(widgetName, true)}/>

### textField?{ type: 'string | function(dataItem: ?mixed) -> string' }

${language.textField}

<EditableExample codeText={require('../examples/textField')(widgetName, true)}/>

### multiple?{ type: 'bool' }

Whether or not the {widgetName} allows multiple selection or not. when `false` the {widgetName} will
render as a list of radio buttons, and checkboxes when `true`.

### itemComponent?{ type: 'Component | function({ item: ?mixed }) -> ReactElement' }

${language.itemComponent}

<EditableExample codeText={require('../examples/itemComponent')(widgetName, true)}/>

### groupBy?{ type: 'string | function(dataItem: ?mixed) -> bool' }

${language.groupBy}

<EditableExample codeText={require('../examples/groupby')(widgetName, true)}/>

### groupComponent?{ type: 'Component | function({ item: ?mixed }) -> ReactElement' }

${language.groupComponent}

<EditableExample codeText={require('../examples/groupComponent')(widgetName, true)}/>

### onMove?{ type: 'Function(list: HTMLElement, focusedNode: HTMLElement, focusedItem: ?mixed)' }

A handler called when focus shifts on the {widgetName}. Internally this is used to ensure the focused item is in view.
If you want to define your own "scrollTo" behavior or just disable the default one specify an `onMove` handler.
The handler is called with the relevant DOM nodes needed to implement scroll behavior: the list element,
the element that is currently focused, and a focused value.

### busy?{ type: 'bool', default: "false" }

${language.busy}

### disabled?{ type: 'bool | array<?mixed>' }

${language.disabledPicker}

<EditableExample codeText={require('../examples/disabled')(widgetName, 'disabled', { disableItems: true })}/>

### readOnly?{ type: 'bool' }

${language.readOnly}

<EditableExample codeText={require('../examples/disabled')(widgetName, 'readOnly')}/>


### isRtl?{ type: 'bool', default:"false" }

${language.isRtl}

### messages?{ type: 'object' }

${language.messages}

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
