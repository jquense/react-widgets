### value?{ type: 'Date?', handler: "onChange", controllable: true }

The current selected date, should be a Date object or null.

<EditableExample codeText={require('../examples/valuePicker')(widgetName, ['new Date()'])}/>

### onChange?{ type: 'Function( Date? date )' }

Change event Handler that is called when the value is changed. The handler is called with the Date object

<EditableExample codeText={require('../examples/onChangePicker')(widgetName, ['new Date()'])}/>

### min?{ type: 'Date' }

The minimum date that the Calendar can navigate from.


### max?{ type: 'Date' }

The maximum date that the Calendar can navigate to.

### footer?{ type: 'Boolean', default: 'false' }

Show or hide the Calendar footer.

<EditableExample codeText={require('../examples/prop')(widgetName, 'footer', 'true')}/>

### initialView?{ type: 'Enum', default: '"month"' }

The starting and lowest level view the calendar can navigate down to.

Acceptable values are:
`"month"` `"year"` `"decade"` `"century"`

<EditableExample codeText={require('../examples/prop')(widgetName, 'initialView', '"year"')}/>

### finalView?{ type: 'Enum', default: '"century"' }

The highest level view the calendar can navigate up to. This value should be higher
than `initialView`

Acceptable values are: `"month"` `"year"` `"decade"` `"century"`

<EditableExample codeText={require('../examples/prop')(widgetName, 'finalView', '"year"')}/>

### headerFormat?{ type: 'String | Function(Date? date)', default: "'MMMM yyyy'" }

A formatter for the header button of the month view

<EditableExample codeText={require('../examples/prop')(widgetName, 'headerFormat', '"MMM yy"')}/>

### footerFormat?{ type: 'String | Function(Date? date)', default: "'D'" }

A formatter for the Calendar footer, formats Today's Date as a string.

<EditableExample codeText={require('../examples/prop')(widgetName, { footerFormat: "\"'today is:' dddd\"", footer: true })}/>

### dayFormat?{ type: 'String | Function(Number dayOfTheWeek)', default: "Function()" }

A formatter calendar days of the week, the default formats each day as a Narrow name: "Mo", "Tu", etc.

<EditableExample codeText={require('../examples/prop')(
widgetName, { dayFormat: "day => ['M', 'T','W','Th', 'F', '!', '!'][day]" })}/>

### dateFormat?{ type: 'String | Function(Date? date)', default: "'dd'" }

A formatter for day of the month
<EditableExample codeText={require('../examples/prop')(
  widgetName, { dateFormat: "dt => dt.getDate()", footer: true })}/>

### monthFormat?{ type: 'String | Function(Date? date)', default: "'MMM'" }

A formatter for month name.

<EditableExample codeText={require('../examples/prop')(
widgetName, { monthFormat: "'MMMM'", initialView: "'year'" })}/>

### yearFormat?{ type: 'String | Function(Date? date)', default: "'YYYY'" }

A formatter for the year.

<EditableExample codeText={require('../examples/prop')(
widgetName, { yearFormat: "'yy'", initialView: "'decade'" })}/>

### decadeFormat?{ type: 'String | Function(Date? date)', default: "Function()" }

A formatter for decade, the default formats the first and last year of the decade like: 2000 - 2009.

### centuryFormat?{ type: 'String | Function(Date? date)', default: "Function()" }

A formatter for century, the default formats the first and last year of the century like: 1900 - 1999.


### isRtl?{ type: 'Boolean', default: "false" }

mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through
a `childContext` prop (`isRtl`) this allows higher level application components to specify the direction.


### messages?{ type: 'Object' }

Object hash containing display text and/or text for screen readers. Use the `messages` object to
localize widget text and increase accessibility.


### messages.moveBack?{ type: 'String', default: '"navigate back"' }

title and screen reader text for the left arrow button


### messages.moveForward?{ type: 'String', default: '"navigate forward"' }

title and screen reader text for the right arrow button

## Keyboard Navigation

- <kbd>ctrl + down arrow</kbd> navigate to next view
- <kbd>ctrl + up arrow</kbd> navigate to previous view
- <kbd>ctrl + left arrow</kbd> navigate to previous: month, year, decade, century
- <kbd>ctrl + right arrow</kbd> navigate to next: month, year, decade, century
- <kbd>left arrow</kbd> move focus to previous date
- <kbd>right arrow</kbd> move focus to next date
- <kbd>up arrow</kbd> move focus up within view
- <kbd>down arrow</kbd> move focus down within view
