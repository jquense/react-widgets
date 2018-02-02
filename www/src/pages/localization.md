# Localization

In order to handle the complex international differences in number and date formats `react-widgets` relies on third party
parsing and formatting libraries via an integration layer of "localizers". We maintain and support localizers
for __Globalize.js__, __Moment.js__ and a simple number localizer, but you can easily write
your own for whichever library you are using.

Localization sensitive widgets have `format` props that passed directly to your chosen localizer. The type and shape
of these format props is determined by the api of the backing i18n library. Moment.js, for instance,
uses string based date formats like: `MMM dd YYYY` whereas the newer Globalize.js may take an object like:
`{ skeleton: GyMMMd }`. Regardless of the localizer, formats **always** accept `function` values for doing on-the-fly custom
formatting.

### Globalize.js (recommended) <small>date, number</small>

```sh
npm install globalize react-widgets-globalize --save
```

Globalize can be a bit of a challenge to set up correctly so please consult the [globalize docs](https://github.com/jquery/globalize#getting-started) for a lot of info on setting up
Globalize and integrating into lots of different app environments.

The Globalize localizer handles both __number__ and __date__ localization so there is no need for any additional
localizers.

_Note: the examples below are for Globalize `>= v1.0.0`, however the localizer supports `v0.1.0` as well._

{{ <TabbedCodeBlock>
  <Tab title="webpack globalize plugin">
    {`
    import Globalize from 'globalize';
    import globalizeLocalizer from 'react-widgets-globalize';
    import DateTimePicker from 'react-widgets/lib/DateTimePicker';

    Globalize.locale('en')

    globalizeLocalizer()

    render(<DateTimePicker />, document.getElementById('app-root'))
    `}
  </Tab>
  <Tab title="browser globals">
    {`
    <script src='node_modules/react-widgets/dist/react-widgets.js'></script>
    <script src='node_modules/react-widgets-globalize/dist/react-widgets-globalize.js'></script>
    <script>
      var DateTimePicker = ReactWidgets.DateTimePicker;

      ReactDOM.render(<DateTimePicker />, document.getElementById('app-root'))
    </script>
    `}
  </Tab>
</TabbedCodeBlock> }}

While you _can_ use option objects and raw pattern strings directly as `format`s with react-widgets. It's [recommended](https://github.com/globalizejs/globalize#compilation-and-the-runtime-modules) that you
use _statically_ determinable formatter functions instead. These can be extracted as part of your application's
build step and compiled, ensuring applications only include exactly the i18n data needed.

```jsx
// dates
let monthYearFormatter = Globalize.dateFormatter({ raw: 'mmm YY' });
let monthYearParser = Globalize.dateParser({ raw: 'mmm YY' });

// numbers
let percentFormatter = Globalize.numberFormatter({
  style: 'percent',
  maximumFractionDigits: 2
});
let percentParser = Globalize.numberParser({
  style: 'percent',
  maximumFractionDigits: 2
});

return (
  <div>
    <DateTimePicker
      format={monthYearFormatter}
      parse={monthYearParser}
    />
    <NumberPicker
      format={percentFormatter}
      parse={percentParser}
    />

    {/* this is also supported but leads to much larger bundles */}
    <DateTimePicker format="mmm YY" />
    <NumberPicker format=#{{ currency: 'USD', style: 'accounting' }} />
  </div>
)
```

### Moment.js <small>date</small>

```sh
npm install moment react-widgets-moment --save
```

Again see the official [Moment docs](http://momentjs.com/) for information on integrating Moment into your build
pipeline effectively.

Moment only provides __date__ localization, if you also need Number localization consider
the __simple-number__ localizer below, or Globalize.js.

{{<TabbedCodeBlock>
  <Tab title="webpack">
    {`
    import Moment from 'moment'
    import momentLocalizer from 'react-widgets-moment';
    import DateTimePicker from 'react-widgets/lib/DateTimePicker';

    Moment.locale('en')
    momentLocalizer()

    render(<DateTimePicker />, document.getElementById('app-root'))
    `}
  </Tab>
  <Tab title="browser globals">
    {`
    <script src='node_modules/react-widgets/dist/react-widgets.js'></script>
    <script src='node_modules/react-widgets-moment/dist/react-widgets-moment.js'></script>
    <script>
      var DateTimePicker = ReactWidgets.DateTimePicker;

      ReactDOM.render(<DateTimePicker />, document.getElementById('app-root'))
    </script>
    `}
  </Tab>
</TabbedCodeBlock>}}


Moment [format](http://momentjs.com/docs/#/displaying/format/) props accept `string`s

```jsx

<DateTimePicker format='mmm YYY' />

```

### Simple Number <small>number</small>

The `simple-number` localizer provides a minimal number formatting and parsing strategy. Its best when you don't need
robust locale support for currencies, and numbers;

```js
var numberLocalizer = require('react-widgets/lib/localizers/simple-number')

numberLocalizer();
```

Or

```html
<script src='node_modules/react-widgets/dist/react-widgets.js'></script>
<script src='node_modules/react-widgets/dist/react-widgets-simple-number.js'></script>
```

{{<TabbedCodeBlock>
  <Tab title="webpack globalize plugin">
    {`
    import simpleNumberLocalizer from 'react-widgets-simple-number';
    import NumberPicker from 'react-widgets/lib/NumberPicker';

    simpleNumberLocalizer()

    render(<NumberPicker />, document.getElementById('app-root'))
    `}
  </Tab>
  <Tab title="browser globals">
    {`
    <script src='node_modules/react-widgets/dist/react-widgets.js'></script>
    <script src='node_modules/react-widgets-simple-number/dist/react-widgets-simple-number.js'></script>
    <script>
      var NumberPicker = ReactWidgets.NumberPicker;

      ReactDOM.render(<NumberPicker />, document.getElementById('app-root'))
    </script>
    `}
  </Tab>
</TabbedCodeBlock>}}

Check out the documentation for [format-number-with-string](https://www.npmjs.com/package/format-number-with-string) for
a complete guide to its format syntax.

```jsx
<NumberPicker format='-$#,###.00' />
```

## Creating a Localizer

Creating a localizer is as easy as providing `react-widgets` an localizer options object.
Localizers must provide `parse()` and `format()` functions as well as provide default values for all the
required formats the widgets need.

Formats can be whatever type your localization strategy requires (strings, objects, etc), however functions are
always valid. The default formats, for example, can be strings or functions.
If you wanted to use the built-in `Intl` api's for formatting, formats might be an options object to
pass to `Intl.DateTimeFormat()`. Function formats are called automatically by the localizer with the `value`,
the `culture` string and the localizer instance.

```jsx
var localizer = {

  formats: {
    day: 'DD',
    month: 'mmm',
    // function formats are useful for more advanced formatting, such as a
    // year 'range' to represent a decade e.g "2000 - 2009".
    // Notice the localizer instance is the third argument, which can be
    // used to format or parse as needed.
    decade: (date, cultureStr, localizer) => {
      return (
        localizer.format(date, 'YYYY') + ' - ' +
        localizer.format(lastYearOfDecade(date), 'YYYY')
      )
    }
  },

  parse(value, format, cultureStr) {
    return parsedDate
  },

  format(value, format, cultureStr) {
    return formattedDatestring
  }
}

ReactWidgets.setDateLocalizer(localizer)
```

## Localizer Api

### `DateLocalizer`

An Object implementing the following api.

```js
type Localizer = {
  propType: PropType?
  firstOfWeek: (culture: string) => number
  parse: (date: string, format: string|object, culture: string?)=> Date | null
  format: (date: Date, format: string|object, culture: string?)=> string
  formats: {
    default: string | object | function
    date: string | object | function
    time: string | object | function
    header: string | object | function
    footer: string | object | function
    weekday: string | object | function
    dayOfMonth: string | object | function
    month: string | object | function
    year: string | object | function
    decade: string | object | function
    century: string | object | function
  }
}
```

#### required formats
_Localizers must provide default values for each required format._

- `default`: the default date display format, generally a "long" format showing both date and time
- `date`: A date only format
- `time`: A time only format
- `header`: The heading of the Calendar month view, contextualizes the current month, e.g. "Jan 2014"
- `footer`: The Calendar footer format, for displaying Today's date
- `dayOfMonth`: The day of the month
- `month`: Month name, used in the Year view of the Calendar
- `year`: year format, used in the Decade view of the Calendar
- `decade`: a decade format, used in the Century view of the Calendar, eg. "2010 - 2019"
- `century`: A century format, used the in the Calendar heading


#### `propType` (optional)
A React PropType that is used to validate the Date formats

#### `parse`
Convert a locale formatted string to a JavaScript Date object.

```js
function(
  value: string,
  format: string|object,
  culture: ?string
): Date | null
```

#### `format`
Convert a Date object to a locale specific string

```js
function(
  value: Date,
  format: string|object,
  culture: ?string
): string
```

#### `firstOfWeek`

Return the locale specific first day of the week from 0 (Sunday) to 6 (Saturday).

```js
function(
  culture: ?string
): number
```

### `NumberLocalizer`

An Object implementing the following api.

```js
{
  propType: ?PropType,
  formats: {
    default: string|object;
  };
  parse: (num: string, format: string|object, culture: ?string)=> number | null;
  format: (num: number, format: string|object, culture: ?string)=> string;
  precision: (format: ?string|object) => number;
  decimalChar: (format: string|object, culture: ?string) => string;
}
```

#### required formats
_Localizers must provide default values for each required format._

- `default` The number picker display format.

#### `propType` (optional)
A React PropType that is used to validate the number formats.

#### `parse`
Convert a locale specific string to a JavaScript Number.

```
function(
 value: number,
 culture: ?string
): number | null
```

#### `format`

Convert a Number to a locale specific string.

```
function(
  value: number,
  format: string|object,
  culture: ?string
): string
```

#### `decimalChar` (default: `'.'`)

Return the decimal separator character.

```
function(
 format: string|object;
 culture: ?string
): string
```

#### `precision`

Return the decimal precision for a given format or culture. Necessary for dealing with the quirks of floating point math.

```
function(
 format: string|object;
 culture: ?string
): number | null
```
