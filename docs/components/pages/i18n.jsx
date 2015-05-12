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
          Localization
        </h1>
        <p>
          In order to handle the international differences in number and date 
          formats <code>react-widgets</code> uses Globalize.js as the default localization strategy. 
          Globalize handles both numbers and dates making it a great fit for a library offering 
          both number and date pickers. Of course not everyone needs as robust localization support, so you 
          are free to swap out Globalize for whatever tool you wish.
        </p>
        <h2>Localizers</h2>
        <p>
          All localization functionality is contained in "Localizers", making it easy to swap out 
          different localization strategies. There are two types of 
          localizers: <code>DateLocalizer</code> and <code>NumberLocalizer</code>. Localizers are used to handle 
          the <em>parsing</em>, converting a string into a proper type, and <em>formating</em>, converting a type 
          to a string representation. Localizers also provide a way to set all localization specific widget props at once, 
          through "formats".
        </p>
        <h2>Creating a Localizer</h2>
        <p>
          Creating a localizer is as easy as providing <code>react-widgets</code> an localizer options object. 
          Localizers must provide <code>parse()</code> and <code>format()</code> functions as well as provide default values for all the 
          required formats the widgets need.
        </p>
        <p>
          Formats can be whatever type your localization strategy requires (strings, objects, etc), however functions are always valid. 
          The default formats, for example, can be strings or functions. If you wanted to use 
          the builtin <code>Intl</code> apis for formating, formats might be an options object 
          to pass to <code>Intl.DateTimeFormat()</code>. Function formats are called 
          automatically by the localizer with the <code>value</code>, the <code>culture</code> string and the localizer instance.
        </p>
        <strong>
          For a practical example of creating a Localizer check out <a href="https://github.com/jquense/react-widgets-moment-adapter">this MomentJs Localizer</a>
        </strong>
        <br/><br/>
        <pre>
          <code>
{`var localizer = {

  formats: {
    day: 'DD',
    month: 'mmm',

    // we always pass a function for more advanced formats such as returning a year 'range' 
    // to represent a decade e.g "2000 - 2009". Notice the localizer instance is the third argument, 
    // which can be used to format or parse as needed.
    decade: (date, culture, localizer) => {
      return localizer.format(date, 'YYYY') + ' - ' + localizer.format(lastYearOfDecade(date), 'YYYY')
    }
    ...
  },

  parse(value, format, cultureStr){
    return parsedDate
  },

  format(value, format, cultureStr){
    return formattedDateString
  }
}
`}
          </code>
        </pre>
        <h2>Using Localizers</h2>
        <p>
          <code>react-widgets</code> provides a <code>setDateLocalizer</code> and <code>setNumberLocalizer</code> functions for 
          swapping localizers. Depending on if you are consuming widgets via the main module export (<code>require('react-widgets')</code>), 
          or requiring each widget individually, you can get access to this API in two ways. Each method will validate your localizer object to 
          make sure it conforms to the expected api.
        </p>
        <pre>
          <code>
{`
// From the main export
var configure = require('react-widgets').configure 

// Alternatively 
configure = require('react-widgets/lib/configure')

var myDateLocalizer = {...}
var myNumberLocalizer = {...}

// Pass the Localizer options object
configure.setDateLocalizer(myDateLocalizer)

configure.setNumberLocalizer(myNumberLocalizer)
`}
          </code>
        </pre>
        <h3>Bundling Caveats</h3>
        <p>
          Handling optional frontend dependancies is hard, and unfortunately there isn't a good way for library authors to make it 
          easier. Because we want to make sure the there is a robust localization strategy included in react-widgets, Globalize is 
          included as a direct dependancy. Practically this means that if you want to replace it you should also take care to exclude it 
          from your builds, when using a frontend bundling tool.
        </p>
        <h4>Webpack</h4>
        <p>If you are using webpack you can ignore Globalize using the <code>IgnorePlugin</code></p>
        <pre>
          <code>
{`// in your webpack config
{
  plugins: [
    new webpack.IgnorePlugin(/globalize$/)
  ]
}
`}
          </code>
        </pre>
        <h4>Browserify</h4>
        <p>You can make use of the <code>ignore</code> option to exclude globalize from builds.</p>
        <pre>
          <code>browserify --ignore globalize --ignore-missing</code>
        </pre>
<pre>
<code>{`{
  //...
  ignore: ['globalize']
}
`}</code>
</pre>
        <h2>Localizer Api</h2>
        <h3><code>DateLocalizer</code></h3>
        <p>An Object implementing the following api.</p>
<pre><code>
{`{
  propType: PropType?,
  formats: object,
  firstOfWeek: function,
  parse: function,
  format: function
}
`}
</code></pre>
        <h4>required formats</h4>
        <em>Localizers must provide default values for each required format.</em>
        <ul>
          <li><code>default</code> the default date pattern, generally a "long" format showing both date and time</li>
          <li><code>date</code> Just the date part of the <code>Date</code> object</li>
          <li><code>time</code> Just the time part of the <code>Date</code> object</li>
          <li><code>header</code> The heading of the month view of the Calendar widget</li>
          <li><code>footer</code> The footer of the Calendar widget</li>
          <li><code>dayOfMonth</code> disaply the day of the month, in the Calendar</li>
          <li><code>month</code> Short Month name</li>
          <li><code>year</code> format for displaying the year</li>
          <li><code>decade</code> format for displaying the decade</li>
          <li><code>century</code> format for displaying the century</li>
        </ul>
        <h4><code>propType</code> (optional)</h4>
        <p>A React PropType that is used to validate the nuDatember formats</p>
        <h4><code>parse</code></h4>
        <p>Convert a locale formatted string to a JavaScript Date object.</p>
<pre><code>
{`function(
  value: string,
  format: string|object,
  culture: string?
) -> Date?
`}
</code></pre>
          <h4><code>format</code></h4>
          <p>Convert a Date object to a locale specific string</p>
<pre><code>
{`function(
  value: Date?,
  format: string|object,
  culture: string?
) -> string
`}
</code></pre>
          <h4><code>firstOfWeek</code></h4>
          <p>Return the locale specific first day of the week from 0 (Sunday) to 6 (Saturday).</p>
<pre><code>
{`function(
  culture: string?
) -> number (0 -6)
`}
</code></pre>
        <h3><code>NumberLocalizer</code></h3>
        <p>An Object implementing the following api.</p>
<pre><code>
{`{
  propType: PropType?,
  formats: object,
  parse: function,
  format: function
}
`}
</code></pre>
        <h4>required formats</h4>
        <em>Localizers must provide default values for each required format.</em>
        <ul>
          <li><code>default</code> The number picker display format</li>
        </ul>
        <h4><code>propType</code> (optional)</h4>
        <p>A React PropType that is used to validate the number formats</p>
        <h4><code>parse</code></h4>
        <p>Convert a locale specific string to a JavaScript Number</p>
<pre><code>
{`function(
  value: string,
  culture: string?
) -> Date?
`}
</code></pre>
          <h4><code>format</code></h4>
          <p>Convert a Number to a locale specific string</p>
<pre><code>
{`function(
  value: Date?,
  format: string|object,
  culture: string?
) -> string
`}
</code></pre>

      </section>
    );
  }

});

module.exports = Calendar;