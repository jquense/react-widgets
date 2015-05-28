# Getting Started <small className='pull-right' style={{marginTop: 15}}>current version {\_\_VERSION\_\_}</small>

React-widgets offers a set of html form inputs, built from scratch with React. The suite is based on the excellent 
work done by Kendo UI Core, and jQuery UI, but built as true components, and not library wrappers. By 
building each widget entirely in React, it can leavage all of the benefits of the React ecosystem 
and [philosophy](http://facebook.github.io/react/blog/2013/11/05/thinking-in-react.html). A big thanks to both of these libraries for solving most of the difficult problems already.

In keeping with the [React approach](http://facebook.github.io/react/docs/forms.html#controlled-components) to form input components, each widget can be <em>controlled</em> or <em>uncontrolled</em>. If a `value` prop 
is set the widget's value is said to be <em>controlled</em>, meaning the parent is responsible for managing its 
state. If the widget does not provide a `value` prop, the widget becomes <em>uncontrolled</em> or responsible for managing its own value with no other input, you can set a starting value for an uncontrolled widget with the `defaultValue` prop. In addition to the `value` prop, widgets may allow other props (such as `open` or `search`) to be controlled as well. 

Some widgets can also be "bound" to a set of data (traditionally an array of models) through a `data` prop. While they work just as well with data primitives such as strings, numbers, and arrays, they really shine through the use of the 
`valueField` and `textField` props, which offer a quick way to display complex data structures.

## Install

##### npm (recommended)
```sh
npm install react-widgets --save
```

##### Bower
```sh
bower install react-widgets --save
```

##### Script Tag
```html
<script src='globalize.js'></script>
<script src='react-widgets.js'></script>
<script>
  ReactWidgets.DropdownList
</script>
```

The npm build offers an additional advantage of allowing you to only require the individual widgets allowing front end bundlers like Webpack 
and Browserify to only package up the pieces you use saving you bytes. The global browser build will also need to 
include [Globalize.js](https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468), a library for handling number and date localization (see the [Localization page](i18n) for more info on Globalize, or using other libraries).

Stylesheets, images, and fonts are found in the `dist` directory. You can use webpack to `require()` the styles,
or include the css normally. The included icons are provided by - <a href="http://fontawesome.io">Font Awesome by Dave Gandy</a>


##### Browser

```html
 <link href="dist/css/react-widgets.css" rel="stylesheet"/>
```

##### Webpack css

```js
 require('react-widgets/dist/react-widgets.css')
```

##### Webpack LESS

```js
 require('react-widgets/lib/react-widgets.less')
```

## Accessibility and Read Direction

React-widgets tries to be as inclusive and wide reaching as possible. Along with an included solution for
date and number localization, there is first class support for cultures and languages that read
right to left (with the `isRtl` prop).

Each widget also has appropriate ARIA roles and attributes for the benefit of screen readers and visually
impaired users. Keyboard only navigation of widgets is also supported, for those who prefer to not,
or cannot use a mouse. to help ensure maximum accessibility, every widget should have
an `id` attribute. If you do not wish to provide an id attrbute, the widget will generate
the necessary id's to properly label and annotate the widget ARIA.

## Older Browser Support

Rather than including an entire utility library, like underscore, react widgets takes a hint from React itself, 
and instead relies on es5 (and transpiled es6) functionality. For most browsers this is will not be an issue, as es5 
is [very well supported](http://kangax.github.io/compat-table/es5/) by modern browsers. However older browsers will need the required functionality polyfilled. In most cases React already requires most of the needed shims ([see here](http://facebook.github.io/react/docs/working-with-the-browser.html#polyfills-needed-to-support-older-browsers)). If you are already including [kriskowal's es5-shim](https://github.com/es-shims/es5-shim') then react-widgets propbably has everything it needs.

For those interested in the specific additions needed by react-widgets they are:

- `Array.prototype.some`
- `Array.prototype.filter`
- `Array.prototype.reduce`

#### Animation
react-widgets uses CSS animations which are not supported in older IE. If you want to replace the default the animation method for these cases you can. The built in method follows the jQuery `$.animate()` API closely so you can use it as a dropin replacement.

##### With the Configure module
```js
require('react-widgets/lib/configure')
  .setAnimate((element, props, duration, ease, callback) => $(element).animate(props, duration, callback))
```
##### From the main export
```js
require('react-widgets').configure
  .setAnimate((element, props, duration, ease, callback) => $(element).animate(props, duration, callback))
```

## Theming

Styling each widget should be a simple matter of adjusting the relevant LESS variables to suit your needs.
Included by default is a "Twitter Bootstrap" theme that mimics the look and feel of Twitter Bootstrap 3.0.
This is less an actual theme and more a neutral starting point for creating your own theme.

- Widget styles with LESS variables (see `./lib/less/bootstrap-theme.less` for reference).
- Icon fonts can be swapped out in the `./lib/less/icons.less` file
