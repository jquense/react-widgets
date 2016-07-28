# Getting Started <small className='pull-right' style={{marginTop: 15}}>current version {\_\_VERSION\_\_}</small>

React-widgets offers a set of html form inputs, built from scratch with React. The suite is based on the excellent
work done by Kendo UI Core, and jQuery UI, but built as true components, and not library wrappers. By
building each widget entirely in React, it can leverage all of the benefits of the React ecosystem
and [philosophy](http://facebook.github.io/react/docs/thinking-in-react.html). A big thanks to both of these libraries for solving most of the difficult problems already.

In keeping with the [React approach](http://facebook.github.io/react/docs/forms.html#controlled-components) to
form input components, each widget can be [_controlled_ or _uncontrolled_](controllables).

Some widgets can also be "bound" to a set of data (traditionally an array of models) through a `data` prop.
While they work just as well with data primitives such as strings, numbers, and arrays, they really shine
through the use of the `valueField` and `textField` props, which offer a quick way to display complex data structures.

## Install

<div className='row'>
<div className='col-sm-6'>
<h4>npm (recommended)</h4>
<pre><code>
npm install react-widgets --save
</code></pre>
</div>
<div className='col-sm-6'>
<h4>bower</h4>
<pre><code>
bower install react-widgets --save
</code></pre>
</div>
</div>

The npm build offers an additional advantage of allowing you to only require the individual widgets allowing frontend
bundlers like Webpack and Browserify to only package up the pieces you use saving you bytes.

## Setup

Stylesheets, images, and fonts are found in the `dist` directory. You can use Webpack to `require()` the styles,
or include the css normally. The included icons are provided by - <a href="http://fontawesome.io">Font Awesome by Dave Gandy</a>

#### Webpack

```js
import { render } from 'react-dom';

import 'react-widgets/lib/less/react-widgets.less';

import DropdownList from 'react-widgets/lib/DropdownList';

render(<DropdownList/>, document.getElementById('app-root'))
```

If are using Webpack to handle styles in your application you are probably already configured
loaders to make it work with appropriate file extensions. If not, you will have to use
the `css-loader`, `style-loader`, `file-loader`, `url-loader` and, optionally, the `less-loader` or
`scss-loader`.

Below is a common configuration:

```js
loaders: [
  { test: /\\.css$/,  loader: "style-loader!css-loader" },
  { test: /\\.less$/, loader: "style-loader!css-loader!less-loader" }, // using less
  // { test: /\\.scss$/, loader: "style-loader!css-loader!scss-loader" }, // using scss
  { test: /\\.gif$/, loader: "url-loader?mimetype=image/png" },
  { test: /\\.woff(2)?(\\?v=[0-9]+\\.[0-9]+\\.[0-9]+)?$/, loader: "url-loader?mimetype=application/font-woff" },
  { test: /\\.(ttf|eot|svg)(\\?v=[0-9]+\\.[0-9]+\\.[0-9]+)?$/, loader: "file-loader?name=[name].[ext]" },
]
```

Also you can encounter problems including `react-widgets` stylesheets if you are managing them with
Webpack. In case you having problems providing correct path to `fonts` and `img` folders, you can
override corresponding variables from `variables` file. In case of `scss` it should look similar to:

```scss
$rw-font-path: '~react-widgets/lib/fonts';
$rw-img-path:  '~react-widgets/lib/img';

@import '~react-widgets/lib/scss/react-widgets';
```

#### Global Build

```html
<link href="dist/css/react-widgets.css" rel="stylesheet"/>
<script src="http://fb.me/react-0.14.0.js"></script>
<script src="http://fb.me/react-dom-0.14.0.js"></script>
<script src='node_modules/react-widgets/dist/react-widgets.js'></script>
<script>
  var DropdownList = ReactWidgets.DropDownlist;

  ReactDom.render(<DropdownList/>, document.getElementById('app-root'))
</script>
```

### I18n and Localization

If you want to use the `DateTimePicker` or `NumberPicker` widgets, you will also need to set up a *Localizer* to handle
date and number localization. Check out the [Localization page](i18n) for more information.

## Accessibility and Read Direction

React-widgets tries to be as inclusive and wide reaching as possible. Along with an included solution for
date and number localization, there is first class support for cultures and languages that read
right to left (with the `isRtl` prop).

Each widget also has appropriate ARIA roles and attributes for the benefit of screen readers and visually
impaired users. Keyboard only navigation of widgets is also supported, for those who prefer to not,
or cannot use a mouse. to help ensure maximum accessibility, every widget should have
an `id` attribute. If you do not wish to provide an id attribute, the widget will generate
the necessary id's to properly label and annotate the widget ARIA.

## Older Browser Support

Rather than including an entire utility library, like underscore, react widgets takes a hint from React itself,
and instead relies on es5 (and transpiled es6) functionality. For most browsers this is will not be an issue, as es5
is [very well supported](http://kangax.github.io/compat-table/es5/) by modern browsers.
However older browsers will need the required functionality polyfilled.
In most cases React already requires most of the needed shims ([see here](http://facebook.github.io/react/docs/working-with-the-browser.html#polyfills-needed-to-support-older-browsers)).
If you are already including [kriskowal's es5-shim](https://github.com/es-shims/es5-shim')
then react-widgets probably has everything it needs.

For those interested in the specific additions needed by react-widgets they are:

- `Array.prototype.some`
- `Array.prototype.filter`
- `Array.prototype.reduce`

#### Animation
react-widgets uses CSS animations which are not supported in older IE. If you want to replace the
default the animation method for these cases you can. The built in method follows the
jQuery `$.animate()` API closely so you can use it as a drop in replacement.

##### With the Configure module
```js
require('react-widgets/lib/configure')
  .setAnimate(function (element, props, duration, ease, callback) {
    $(element).animate(props, duration, callback)
  })
```
##### From the main export
```js
require('react-widgets')
  .setAnimate(function (element, props, duration, ease, callback) {
    $(element).animate(props, duration, callback)
  })
```

## Theming

Styling each widget should be a simple matter of adjusting the relevant LESS variables to suit your needs.
Included by default is a "Twitter Bootstrap" theme that mimics the look and feel of Twitter Bootstrap 3.0.
This is less an actual theme and more a neutral starting point for creating your own theme.

- Widget styles with LESS variables (see `./lib/less/bootstrap-theme.less` for reference).
- Icon fonts can be swapped out in the `./lib/less/icons.less` file
