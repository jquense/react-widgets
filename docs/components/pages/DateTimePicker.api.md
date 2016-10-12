
<div className='alert alert-warning'>
 <i className='fa fa-exclamation-triangle'/>
 You must configure a <a href='#/i18n'>localizer</a> to use this component!
</div>

<--------------->

### value?{ type: '?Date', controllable: "onChange" }

${language.value}

<EditableExample codeText={require('../examples/valuePicker')(widgetName, ['new Date()', null])}/>

### onChange?{ type: 'function(date: ?Date, dateStr: string)', controllable: 'value' }

${language.onChange}

<EditableExample codeText={require('../examples/onChangePicker')(widgetName, ['new Date()', null])}/>

### onSelect?{ type: 'function(value: ?Date)' }

This handler fires when an item has been selected from the list or calendar. It fires before the `onChange` handler, and fires regardless of whether the value has actually changed.

<EditableExample codeText={require('../examples/onSelect')(widgetName)}/>

### calendar?{ type: 'bool', default: 'true' }

Whether to show the date picker button.

<EditableExample codeText={require('../examples/prop')(widgetName, 'calendar', false)}/>

### time?{ type: 'bool', default: 'true' }

Whether to show the time picker button.

<EditableExample codeText={require('../examples/prop')(widgetName, 'time', false)}/>

### min?{ type: 'Date', default: 'new Date(1900, 0, 1)' }

The minimum Date that can be selected. Min only limits selection, it doesn't constrain the date values that
can be typed or pasted into the widget. If you need this behavior you can constrain values via
the `onChange` handler.

<EditableExample codeText={require('../examples/prop')(widgetName, 'min', 'new Date()')}/>

### max?{ type: 'Date', default: 'new Date(2099, 11, 31)' }

The maximum Date that can be selected. Max only limits selection, it doesn't constrain the date values that
can be typed or pasted into the widget. If you need this behavior you can constrain values via
the `onChange` handler.

<EditableExample codeText={require('../examples/prop')(widgetName, 'max', 'new Date()')}/>

### currentDate?{ type: 'Date', default: 'new Date()', controllable: 'onCurrentDateChange' }

Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).

### onCurrentDateChange?{ type: 'function(date: ?Date)', controllable: 'currentDate' }

Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object

### format?{ localizable: true }

A string format used to display the date value. For more information about formats
visit the [Localization page](i18n)

<EditableExample codeText={require('../examples/prop')(widgetName, 'format', '"MMM dd yyyy"')}/>

### editFormat?{ localizable: true }

A string format to be used while the date input has focus. Useful for showing a simpler format for inputing.
For more information about formats visit the [Localization page](i18n)

<EditableExample codeText={require('../examples/prop')(widgetName, { defaultValue: 'new Date()', editFormat: '"d"', format: '"MMM dd yyyy"'})}/>

### timeFormat?{ localizable: true }

A string format used by the time dropdown to render times. For more information about formats visit
the [Localization page](i18n)

### step?{ type: 'number', default: "false" }

The amount of minutes between each entry in the time list.

<EditableExample codeText={require('../examples/prop')(widgetName, { step: 90 })}/>

### parse?{ type: 'function(string str) | array<string>' }

Determines how the widget parses the typed date string into a Date object. You can provide an array of formats to try,
or provide a function that returns a date to handle parsing yourself. When `parse` is unspecified and
the `format` prop is a `string` parse will automatically use that format as its default

<EditableExample codeText={require('../examples/parse')(widgetName)}/>


### open?{ type: 'false | "calendar" | "time"', default: 'false', controllable: 'onToggle' }

${language.open}

<EditableExample codeText={require('../examples/openDateTime')(widgetName)}/>

### onToggle?{ type: 'function(isOpen: bool)', controllable: 'open' }

${language.onToggle}

### duration?{ type: 'number', default: "250" }

${language.duration}

### isRtl?{ type: 'bool', default: "false" }

${language.isRtl}

### messages?{ type: 'object' }

${language.messages}

### messages.calendarButton?{ type: 'string', default: '"Select Date"' }

title and screen reader text for the left arrow button.

### messages.timeButton?{ type: 'string', default: '"Select Time"' }

title and screen reader text for the right arrow button.

## Keyboard Navigation

- __All Calendar keyboard navigation work here as well__
- <kbd>alt + down arrow</kbd> open calendar or times
- <kbd>alt + up arrow</kbd> close calendar or times
- <kbd>down arrow</kbd> move focus to next time
- <kbd>up arrow</kbd> move focus to previous time
- <kbd>home</kbd> move focus to first time
- <kbd>end</kbd> move focus to last time
- <kbd>enter</kbd> select focused item
- <kbd>any key</kbd> search list for time starting with key
