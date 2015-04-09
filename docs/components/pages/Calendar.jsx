'use strict';
var React = require('react')
  , EditableExample = require('../EditableExample')
  , DDButton = require('../../bootstrap').DropdownButton
  , MenuItem = require('../ApiMenuItem.jsx')
  , PropHeader = require('../PropHeader.jsx')
  , CalendarExample = require('../demos/calendar.jsx');

var prefix = 'calendar/'
var widgetName = "Calendar"
var Calendar = React.createClass({

  mixins: [ require('../PageMixin')(prefix) ],
  
  render: function() {
    return (
      <section {...this.props}>
        <h1 className="page-header">
          Calendar
          <span className='pull-right'>
            <DDButton title='props' bsStyle='link' pullRight={true}>
              <MenuItem>value</MenuItem>
              <MenuItem>onChange</MenuItem>
              <MenuItem divider/>
              <MenuItem>min</MenuItem>
              <MenuItem>max</MenuItem>
              <MenuItem>footer</MenuItem>
              <MenuItem>initialView</MenuItem>
              <MenuItem>finalView</MenuItem>

              <MenuItem divider/>
              <MenuItem>headerFormat</MenuItem>
              <MenuItem>dayFormat</MenuItem>
              <MenuItem>dateFormat</MenuItem>
              <MenuItem>monthFormat</MenuItem>
              <MenuItem>yearFormat</MenuItem>
              <MenuItem>decadeFormat</MenuItem>
              <MenuItem>centuryFormat</MenuItem>
              <MenuItem divider/>

              <MenuItem>duration</MenuItem>
              <MenuItem>isRtl</MenuItem>
              <MenuItem>messages</MenuItem>
              <MenuItem divider/>
              <MenuItem>Keyboard Navigation</MenuItem>
            </DDButton>
          </span>
        </h1>
        <pre className='component-export'>
          <code>
          <div>Widget Suite:</div>
          {` ${widgetName}`} = require(<span className='str'>'react-widgets'</span>){`.${widgetName}`}<br/>
          <div>Individual Component:</div>
          {` ${widgetName}`} = require(<span className='str'>{`'react-widgets/lib/${widgetName}'`}</span>)
          </code>
        </pre>
        <CalendarExample/>

        <h2>Props</h2>

        <PropHeader type='Date?' handler="onChange" controllable>value</PropHeader>
        <p>
          The current selected date, should be a Date object or null.
        </p>
        <EditableExample codeText={require('../examples/valuePicker')(widgetName, ['new Date()'])}/>

        <PropHeader type='Function( Date? date )'>onChange</PropHeader>
        <p>
          Change event Handler that is called when the value is changed. The handler is called with the Date object
        </p>
        <EditableExample codeText={require('../examples/onChangePicker')(widgetName, ['new Date()'])}/>

        <PropHeader type='Date'>min</PropHeader>
        <p>
          The minimum date that the Calendar can navigate from.
        </p>

        <PropHeader type='Date'>max</PropHeader>
        <p>
          The maximum date that the Calendar can navigate to.
        </p>
        <PropHeader type='Boolean' default='false'>footer</PropHeader>
        <p>
          Show or hide the Calendar footer.
        </p>
        <EditableExample codeText={require('../examples/prop')(widgetName, 'footer', 'true')}/>

        <PropHeader type='Enum' default='"month"'>initialView</PropHeader>
        <p>
          The starting and lowest level view the calendar can navigate down to.
        </p>
        <p>
          Acceptable values are:
          <code>"month"</code> <code>"year"</code> <code>"decade"</code> <code>"century"</code>
        </p>
        <EditableExample codeText={require('../examples/prop')(widgetName, 'initialView', '"year"')}/>

        <PropHeader type='Enum' default='"century"'>finalView</PropHeader>
        <p>
          The highest level view the calendar can navigate up to. This value should be higher
          than <code>initialView</code>
        </p>
        <p>
          Acceptable values are:
          <code>"month"</code> <code>"year"</code> <code>"decade"</code> <code>"century"</code>
        </p>
        <EditableExample codeText={require('../examples/prop')(widgetName, 'finalView', '"year"')}/>
      
        <PropHeader type='String | Function(Date? date)' default="'MMMM yyyy'">headerFormat</PropHeader>
        <p>
          A formatter for the header button of the month view
        </p>

        <EditableExample codeText={
          require('../examples/prop')(widgetName, 'headerFormat', '"MMM yy"')}/>
        <PropHeader type='String | Function(Date? date)' default="'D'">footerFormat</PropHeader>
        <p>
          A formatter for the Calendar footer, formats Today's Date as a string.
        </p>

        <EditableExample codeText={require('../examples/prop')(
          widgetName, { footerFormat: "\"'today is:' dddd\"", footer: true })}/>

        <PropHeader type='String | Function(Number dayOfTheWeek)' default="Function()">dayFormat</PropHeader>
        <p>
          A formatter calendar days of the week, the default formats each day as a Narrow name: "Mo", "Tu", etc.
        </p>
        <EditableExample codeText={require('../examples/prop')(
          widgetName, { dayFormat: "day => ['M', 'T','W','Th', 'F', '!', '!'][day]" })}/>

        <PropHeader type='String | Function(Date? date)' default="'dd'">dateFormat</PropHeader>
        <p>
          A formatter for day of the month
        </p>
        <EditableExample codeText={require('../examples/prop')(
          widgetName, { dateFormat: "dt => dt.getDate()", footer: true })}/>

        <PropHeader type='String | Function(Date? date)' default="'MMM'">monthFormat</PropHeader>
        <p>
          A formatter for month name.
        </p>
        <EditableExample codeText={require('../examples/prop')(
          widgetName, { monthFormat: "'MMMM'", initialView: "'year'" })}/>

        <PropHeader type='String | Function(Date? date)' default="'YYYY'">yearFormat</PropHeader>
        <p>
          A formatter for the year.
        </p>
        <EditableExample codeText={require('../examples/prop')(
          widgetName, { yearFormat: "'yy'", initialView: "'decade'" })}/>

        <PropHeader type='String | Function(Date? date)' default="Function()">decadeFormat</PropHeader>
        <p>
          A formatter for decade, the default formats the first and last year of the decade like: 2000 - 2009.
        </p>
        <PropHeader type='String | Function(Date? date)' default="Function()">centuryFormat</PropHeader>
        <p>
          A formatter for century, the default formats the first and last year of the century like: 1900 - 1999.
        </p>

        <PropHeader type='Boolean' default="false">isRtl</PropHeader>
        <p>
          mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through
          a <code>childContext</code> prop (<code>isRtl</code>) this allows higher level application components to specify the direction.
        </p>

        <PropHeader type='Object'>messages</PropHeader>
        <p>
          Object hash containing display text and/or text for screen readers. Use the <code>messages</code> object to
          localize widget text and increase accessibility.
        </p>

        <PropHeader type='String' default='"navigate back"'>messages.moveBack</PropHeader>
        <p>
          title and screen reader text for the left arrow button
        </p>

        <PropHeader type='String' default='"navigate forward"'>messages.moveForward</PropHeader>
        <p>
          title and screen reader text for the right arrow button
        </p>

        <h2 id={ prefix +"keyboard" }>Keyboard Navigation</h2>

        <ul className='list-unstyled keyboard-list'>
          <li><kbd>ctrl + down arrow</kbd> navigate to next view </li>
          <li><kbd>ctrl + up arrow</kbd> navigate to previous view </li>

          <li><kbd>ctrl + left arrow</kbd> navigate to previous: month, year, decade, century</li>
          <li><kbd>ctrl + right arrow</kbd> navigate to next: month, year, decade, century</li>

          <li><kbd>left arrow</kbd> move focus to previous date</li>
          <li><kbd>right arrow</kbd> move focus to next date</li>
          <li><kbd>up arrow</kbd> move focus up within view</li>
          <li><kbd>down arrow</kbd> move focus down within view</li>
        </ul>
      </section>
    );
  }

});

module.exports = Calendar;