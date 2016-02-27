
<div className='alert alert-warning'>
 <i className='fa fa-exclamation-triangle'/>
 You must configure a <a href='#/i18n'>localizer</a> to use this component!
</div>

Manipulate different parts of a JavaScript `Date` object with ease.
Date formats are <em>highly</em> localized, and localization is hard, rather than provide a half baked
solution react-widgets requires that you specify a __localizer__ in order for the widget to work. You can read more
about localizers here: [localization](i18n).

Dates are never mutated but always return and operate on a new Date instance.
When the `date` prop is used the ${widgetName} will pass through the relevant
props to the Calendar Widget and Calendar keyboard navigation keys will also work.
<--------------->

### value?{ type: 'Date?', handler: "onChange", controllable: true }

The current selected date, should be a `Date` instance or `null`.

<EditableExample codeText={require('../examples/valuePicker')(widgetName, ['new Date()', null])}/>

### onChange?{ type: 'Function(Date? date, String dateStr)' }

change event Handler that is called when the value is changed. The handler is called with both the
current `Date` object (or null if it was not parseable), and the second argument is
a `string` representation of the date value, formated by the `format` prop.

<EditableExample codeText={require('../examples/onChangePicker')(widgetName, ['new Date()', null])}/>

### onSelect?{ type: 'Function(Date? value)' }

This handler fires when an item has been selected from the list or calendar. It fires before the `onChange` handler, and fires regardless of whether the value has actually changed.

<EditableExample codeText={require('../examples/onSelectPicker')(widgetName)}/>

### calendar?{ type: 'Boolean', default: 'true' }

Whether to show the date picker button.

<EditableExample codeText={require('../examples/prop')(widgetName, 'calendar', false)}/>

### time?{ type: 'Boolean', default: 'true' }

Whether to show the time picker button.

<EditableExample codeText={require('../examples/prop')(widgetName, 'time', false)}/>

### min?{ type: 'Date', default: 'Date(1900, 0, 1)' }

The minimum Date that can be selected. Min only limits selection, it doesn't constrain the date values that
can be typed or pasted into the widget. If you need this behavior you can constrain values via
the `onChange` handler.

<EditableExample codeText={require('../examples/prop')(widgetName, 'min', 'new Date()')}/>

### max?{ type: 'Date', default: 'Date(2099, 11, 31)' }

The maximum Date that can be selected. Max only limits selection, it doesn't constrain the date values that
can be typed or pasted into the widget. If you need this behavior you can constrain values via
the `onChange` handler.

<EditableExample codeText={require('../examples/prop')(widgetName, 'max', 'new Date()')}/>

### currentDate?{ type: 'Date', default: 'Date()', handler: 'onCurrentDateChange', controllable: true }

Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).

### onCurrentDateChange?{ type: 'Function( Date? date )' }

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

### step?{ type: 'Number', default: "false" }

The amount of minutes between each entry in the time list.

<EditableExample codeText={require('../examples/prop')(widgetName, { step: 90 })}/>

### parse?{ type: '[Function(String str), Array<String>]' }

Determines how the widget parses the typed date string into a Date object. You can provide an array of formats to try,
or provide a function that returns a date to handle parsing yourself. When `parse` is unspecified and
the `format` prop is a `String` parse will automatically use that format as its default

<EditableExample codeText={require('../examples/parse')(widgetName)}/>

### initialView?{ type: 'Enum', default: '"month"' }

The starting and lowest level view the calendar can navigate down to.

Acceptable values are: `"month"` `"year"` `"decade"` `"century"`

<EditableExample codeText={require('../examples/prop')(widgetName, 'initialView', '"year"')}/>

### finalView?{ type: 'Enum', default: '"century"' }

The highest level view the calendar can navigate up to. This value should be higher
than `initialView`

Acceptable values are:
`"month"` `"year"` `"decade"` `"century"`

<EditableExample codeText={require('../examples/prop')(widgetName, 'finalView', '"year"')}/>

### open?{ type: '[Boolean, String]', default: 'false', controllable: true, handler: 'onToggle' }

Whether or not the {widgetName} is open. When unset (`undefined`) the {widgetName} will handle the
opening and closing internally. The `defaultOpen` prop can be used to set an
initialization value for uncontrolled widgets.

Acceptable values are: `false` `"calendar"` `"time"`

<EditableExample codeText={require('../examples/openDateTime')(widgetName)}/>

### onToggle?{ type: 'Function(Boolean isOpen)' }

Called when the {widgetName} is about to open or close. `onToggle` should be used
when the `open` prop is set otherwise the widget will never open or close.

### duration?{ type: 'Number', default: "250" }

The speed, in milliseconds, of the either dropdown animation.

### isRtl?{ type: 'Boolean', default: "false" }

mark whether the widget should render right-to-left. This property can also be implicitly passed to the
widget through a `childContext` prop (`isRtl`) this allows higher level application components to specify the direction.

### messages?{ type: 'Object' }

Object hash containing display text and/or text for screen readers. Use the `messages` object to
localize widget text and increase accessibility.

### messages.calendarButton?{ type: 'String', default: '"Select Date"' }

title and screen reader text for the left arrow button.


### messages.timeButton?{ type: 'String', default: '"Select Time"' }

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
