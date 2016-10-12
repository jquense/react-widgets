
Select an item from the list, or input a custom value. The {widgetName} can also make suggestions as you type.

<--------------->



## Props

### value?{ type: 'mixed', controllable: "onChange" }

${language.valuePicker}

<EditableExample codeText={require('../examples/value')(widgetName)}/>

### onChange?{ type: 'function(value: ?mixed)', controllable: "value" }

A callback fired when the current `value` changes. If the next value is a member of `data` items, the entire data item will be returned. If not present, the string value is returned.

<EditableExample codeText={require('../examples/onChange')(widgetName)}/>

### onSelect?{ type: 'function(value: ?mixed)' }

This handler fires when an item has been selected from the list. It fires before the `onChange` handler, and fires
regardless of whether the value has actually changed.

<EditableExample codeText={require('../examples/onSelect')(widgetName)}/>

### data?{ type: 'array<mixed>' }

${language.data}

### valueField?{ type: 'string' }

${language.valueField}

<EditableExample codeText={require('../examples/valueField')(widgetName)}/>

### textField?{ type: 'string | function(dataItem: ?mixed) -> string' }

${language.textField}

<EditableExample codeText={require('../examples/textField')(widgetName, false, true)}/>

### itemComponent?{ type: 'Component | function({ item: ?mixed }) -> ReactElement' }

${language.itemComponent}

<EditableExample codeText={require('../examples/itemComponent')(widgetName)}/>

### disabled?{ type: 'bool | array<mixed>' }

${language.disabledPicker}

<EditableExample codeText={require('../examples/disabled')(widgetName, 'disabled', { disableItems: true })}/>

### readOnly?{ type: 'bool' }

${language.readOnly}

<EditableExample codeText={require('../examples/disabled')(widgetName, 'readOnly')}/>

### groupBy?{ type: 'string | function(dataItem: string) -> string' }

${language.groupBy}

<EditableExample codeText={require('../examples/groupby')(widgetName)}/>

### groupComponent?{ type: 'Component | function({ item: ?mixed }) -> ReactElement' }

${language.groupComponent}

<EditableExample codeText={require('../examples/groupComponent')(widgetName)}/>

### suggest?{ type: 'bool', default: 'false' }

When `true` the {widgetName} will suggest, or fill in, values as you type. The suggestions
are always "startsWith", meaning it will search from the start of the `textField` property

### filter?{ type: 'bool | string | function(dataItem: ?mixed, searchTerm: string) -> bool', default: 'false' }

${language.filter}

<EditableExample codeText={require('../examples/filter')(widgetName)}/>

### caseSensitive?{ type: 'bool', default: 'false' }

${language.caseSensitive}

### minLength?{ type: 'number', default: '1' }

${language.minLength}

### open?{ type: 'bool' }

${language.open}

<EditableExample codeText={require('../examples/open')(widgetName)}/>

### onToggle?{ type: 'function(isOpen: bool)' }

${language.onToggle}

### busy?{ type: 'bool', default: "false" }

${language.busy}

<EditableExample codeText={require('../examples/busy')(widgetName)}/>

### duration?{ type: 'number', default: "250" }

${language.duration}

### isRtl?{ type: 'bool', default: "false" }

${language.isRtl}

### messages?{ type: 'object' }

${language.messages}

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
