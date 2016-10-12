
A select listbox alternative

<--------------->

### value?{ type: 'array<mixed>', controllable: "onChange" }

${language.valuePicker}

<EditableExample codeText={require('../examples/value')(widgetName, true)}/>

### onChange?{type:'function(array<mixed> values)', controllable: "value" }

${language.onChange}

<EditableExample codeText={require('../examples/onChange')(widgetName, true)}/>

### onSelect?{ type:'function(value: ?mixed)'}

This handler fires when an item has been selected from the list. It fires before the `onChange` handler, and fires
regardless of whether the value has actually changed.

### onCreate?{ type: 'function(searchTerm: string)'}

This handler fires when the user chooses to create a new tag, not in the data list. It is up to the widget parent to implement creation logic,
a common implementation is shown below, where the new tag is selected and added to the data list.

<EditableExample codeText={require('../examples/onCreate')(widgetName)}/>

### data?{ type: 'array'}

${language.data}

### valueField?{ type: 'string' }

${language.valueField}

<EditableExample codeText={require('../examples/valueField')(widgetName, true)}/>

### textField?{ type: 'string | function(dataItem: ?mixed) -> string' }

${language.textField}

<EditableExample codeText={require('../examples/textField')(widgetName, true)}/>

### tagComponent?{ type: 'Component | function({ item: ?mixed }) -> ReactElement' }

This component is used to render each selected item. The default component
renders the text of the selected item (specified by `textfield`)

<EditableExample codeText={require('../examples/tagComponent')(widgetName, true)}/>

### itemComponent?{ type: 'Component | function({ item: ?mixed }) -> ReactElement' }

${language.itemComponent}

<EditableExample codeText={require('../examples/itemComponent')(widgetName, true)}/>

### groupBy?{ type: 'string | function(dataItem: ?mixed) -> bool' }

${language.groupBy}

<EditableExample codeText={require('../examples/groupby')(widgetName, true)}/>

### groupComponent?{ type: 'Component | function({ item: ?mixed }) -> ReactElement' }

${language.groupComponent}

<EditableExample codeText={require('../examples/groupComponent')(widgetName, true)}/>

### placeholder?{ type: 'string' }

The same as an input placeholder, only works in browsers that support the placeholder attribute for inputs

### searchTerm?{ type: 'string', controllable: 'onSearch' }

The string value of the current search being typed into the {widgetName}. When
unset (`undefined`) the {widgetName} will handle the filtering internally.
The `defaultSearchTerm` prop can be used to set an initialization value for uncontrolled widgets.


### onSearch?{ type: 'function(searchTerm: string)', controllable: 'searchTerm' }

${language.onSearch}

### open?{ type: 'bool' }

${language.open}

<EditableExample codeText={require('../examples/open')(widgetName, true)}/>

### onToggle?{ type: 'function(isOpen: bool)' }

${language.onToggle}

### filter?{ type: 'string | function(dataItem: ?mixed, searchTerm: string) -> bool', default: 'startsWith' }

${language.filter}

<EditableExample codeText={require('../examples/filter')(widgetName)}/>

### caseSensitive?{ type: 'bool', default: 'false' }

${language.caseSensitive}

### minLength?{ type: 'number', default: '1' }

${language.minLength}

### busy?{ type: 'bool', default: "false" }

${language.busy}

### duration?{ type: 'number', default: "250" }

${language.duration}

### disabled?{ type: 'bool | array<?mixed>' }

${language.disabledPicker}

<EditableExample codeText={require('../examples/disabled')(widgetName, 'disabled', { disableItems: true, isArray: true })}/>

### readOnly?{ type: 'bool' }

${language.readOnly}

<EditableExample codeText={require('../examples/disabled')(widgetName, 'readOnly', { isArray: true })}/>

### isRtl?{ type: 'bool', default:"false" }

${language.isRtl}

### messages?{ type: 'object' }

${language.messages}

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
