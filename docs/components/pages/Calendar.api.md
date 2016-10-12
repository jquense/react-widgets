<div className='alert alert-warning'>
 <i className='fa fa-exclamation-triangle'/>
 You must configure a <a href='#/i18n'>localizer</a> to use this component!
</div>
<--------------->

### value?{ type: '?Date', controllable: "onChange"}

${language.value}

<EditableExample codeText={require('../examples/valuePicker')(widgetName, ['new Date()'])}/>

### onChange?{ type: 'function(date: ?date)', controllable: "value"  }

${language.onChange}

<EditableExample codeText={require('../examples/onChangePicker')(widgetName, ['new Date()'])}/>

### onNavigate?{ type: 'function(date: ?Date, direction: string, view: string)' }

Callback fired when the Calendar navigates between views, or forward and backwards in time.

### min?{ type: 'Date' }

The minimum date that the Calendar can navigate from.

### max?{ type: 'Date' }

The maximum date that the Calendar can navigate to.

### currentDate?{ type: 'Date', default: 'new Date()', controllable: 'onCurrentDateChange' }

Default current date at which the calendar opens. If none is provided, opens at today's date or the `value` date (if any).

### onCurrentDateChange?{ type: 'function(date: ?Date)', controllable: "currentDate"  }

Change event Handler that is called when the currentDate is changed. The handler is called with the currentDate object

### footer?{ type: 'bool', default: 'false' }

Show or hide the Calendar footer.

<EditableExample codeText={require('../examples/prop')(widgetName, 'footer', 'true')}/>

### dayComponent?{ type: 'Component | function({ item: ?mixed }) -> ReactElement' }

Provide a custom component to render the days of the month. The Component is provided the following props

- `date`: a `Date` object for the day of the month to render
- `label`: a formatted `string` of the date to render. To adjust the format of the `label` string use the `dateFormat` prop, listed below.

<EditableExample codeText={require('../examples/dayComponent')(widgetName)}/>

### view?{ type: '"month"|"year"|"decade"|"century"', controllable: 'onViewChange' }

Controls the currently displayed calendar view. Use `defaultView` to set
a unique starting view.

<EditableExample codeText={require('../examples/view')(widgetName)}/>

### views?{ type: 'array<"month"|"year"|"decade"|"century">' }

Defines a list of views the Calendar can traverse through, starting with the
first in the list to the last.

<EditableExample codeText={require('../examples/views')(widgetName)}/>

### headerFormat?{ localizable: true }

A formatter for the header button of the month view

<EditableExample codeText={require('../examples/prop')(widgetName, 'headerFormat', '"MMM yy"')}/>

### footerFormat?{ localizable: true }

A formatter for the Calendar footer, formats Today's Date as a string.

<EditableExample codeText={require('../examples/prop')(widgetName, { footerFormat: "\"'today is:' dddd\"", footer: true })}/>

### dayFormat?{ localizable: true }

A formatter calendar days of the week, the default formats each day as a Narrow name: "Mo", "Tu", etc.

<EditableExample codeText={require('../examples/prop')(
widgetName, { dayFormat: "day => ['M', 'T','W','Th', 'F', '!', '!'][day.getDay()]" })}/>

### dateFormat?{ localizable: true }

A formatter for day of the month
<EditableExample codeText={require('../examples/prop')(
  widgetName, { dateFormat: "dt => dt.getDate()", footer: true })}/>

### monthFormat?{ localizable: true }

A formatter for month name.

<EditableExample codeText={require('../examples/prop')(
widgetName, { monthFormat: "'MMMM'", initialView: "'year'" })}/>

### yearFormat?{ localizable: true }

A formatter for the year.

<EditableExample codeText={require('../examples/prop')(
widgetName, { yearFormat: "'yy'", initialView: "'decade'" })}/>

### decadeFormat?{ localizable: true }

A formatter for decade, the default formats the first and last year of the decade like: 2000 - 2009.

### centuryFormat?{ localizable: true }

A formatter for century, the default formats the first and last year of the century like: 1900 - 1999.

### isRtl?{ type: 'bool', default: "false" }

${language.isRtl}

### messages?{ type: 'object' }

${language.messages}

### messages.moveBack?{ type: 'string', default: '"navigate back"' }

title and screen reader text for the left arrow button.

### messages.moveForward?{ type: 'string', default: '"navigate forward"' }

title and screen reader text for the right arrow button.


## Keyboard Navigation

- <kbd>ctrl + down arrow</kbd> navigate to next view
- <kbd>ctrl + up arrow</kbd> navigate to previous view
- <kbd>ctrl + left arrow</kbd> navigate to previous: month, year, decade, century
- <kbd>ctrl + right arrow</kbd> navigate to next: month, year, decade, century
- <kbd>left arrow</kbd> move focus to previous date
- <kbd>right arrow</kbd> move focus to next date
- <kbd>up arrow</kbd> move focus up within view
- <kbd>down arrow</kbd> move focus down within view
