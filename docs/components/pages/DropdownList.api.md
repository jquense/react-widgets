### value?{ type: 'mixed', controllable: "onChange" }

${language.valuePicker}

<EditableExample codeText={require('../examples/value')(widgetName)}/>

### onChange?{ type: 'function(value: ?mixed)', controllable: 'value' }

${language.onChange}

<EditableExample codeText={require('../examples/onChange')(widgetName)}/>

### onSelect?{ type: 'function(value: ?mixed)' }

This handler fires when an item has been selected from the list. It fires before the `onChange` handler and fires
regardless of whether the value has actually changed.

<EditableExample codeText={require('../examples/onSelect')(widgetName)}/>

### data?{ type: 'array<mixed>' }

${language.data}

### valueField?{ type: 'string' }

${language.valueField}

<EditableExample codeText={require('../examples/valueField')(widgetName)}/>

### textField?{ type: 'string | function(dataItem: ?mixed) -> string' }

${language.textField}

<EditableExample codeText={require('../examples/textField')(widgetName)}/>

### valueComponent?{ type: 'Component | function({ item: ?mixed }) -> ReactElement' }

This component is used to render the selected value of the ${widgetName}. The default component
renders the text of the selected item (specified by `textField`)

<EditableExample codeText={require('../examples/valueComponent')(widgetName)}/>

### itemComponent?{ type: 'Component | function({ item: ?mixed }) -> ReactElement' }

${language.itemComponent}

<EditableExample codeText={require('../examples/itemComponent')(widgetName)}/>

### disabled?{ type: 'bool | array<mixed>' }

${language.disabledPicker}

<EditableExample codeText={require('../examples/disabled')(widgetName, 'disabled', { disableItems: true })}/>

### readOnly?{ type: 'bool' }

${language.readOnly}

<EditableExample codeText={require('../examples/disabled')(widgetName, 'readOnly')}/>

### groupBy?{ type: 'string | function(dataItem: ?mixed) -> bool' }

${language.groupBy}

<EditableExample codeText={require('../examples/groupby')(widgetName)}/>

### groupComponent?{ type: 'Component | function({ item: ?mixed }) -> ReactElement' }

${language.groupComponent}

<EditableExample codeText={require('../examples/groupComponent')(widgetName)}/>

### placeholder?{ type: 'string' }

Text to display when the value is empty.

### searchTerm?{ type: 'string', controllable: 'onSearch' }

Controls the value of the search text used to filter ${widgetName} items.
`searchTerm` is only applicable when filtering is enabled.

Use `defaultSearchTerm` instead to set an initial value for uncontrolled widgets.

### onSearch?{ type: 'function(searchTerm: string)', controllable: 'searchTerm' }

A callback fired when the current `searchTerm` changes.

### open?{ type: 'bool' }

${language.open}

<EditableExample codeText={require('../examples/open')(widgetName)}/>

### onToggle?{ type: 'function(isOpen: bool)' }

${language.onToggle}


### filter?{ type: 'string | function(dataItem: ?mixed, searchTerm: string) -> bool', default: 'false' }

${language.filter}

<EditableExample codeText={require('../examples/filter')(widgetName)}/>

### caseSensitive?{ type: 'bool', default: 'false' }

${language.caseSensitive}

### minLength?{ type: 'number', default: '1' }

${language.minLength}

### busy?{ type: 'bool', default: "false" }

${language.busy}

<EditableExample codeText={require('../examples/busy')(widgetName)}/>

### duration?{ type: 'number', default: "250" }

${language.duration}

### isRtl?{ type: 'bool', default: "false" }

${language.isRtl}

### messages?{ type: 'object' }

${language.messages}

### messages.open?{ type: 'string | function(props) -> node', default: '"Open Dropdown"' }

Dropdown button text for screen readers.

### messages.filterPlaceholder?{ type: 'string | function(props) -> node' }

The placeholder text for the filter input.

### messages.emptyList?{ type: 'string | function(props) -> node', default: '"There are no items in this list"' }

Text to display when the `data` prop array is empty.

### messages.emptyFilter?{ type: 'string | function(props) -> node', default: '"The filter returned no results"' }

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
