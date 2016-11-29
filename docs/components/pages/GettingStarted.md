---
name: Getting Started
---

# Getting Started <small className='pull-right' style={{marginTop: 10}}>current version {\_\_VERSION\_\_}</small>

react-widgets is a suite of high-quality input components built for React. Each component is built for ease of use,
accessibility, and the practical needs of complex (or simple) forms. The work great with complex data
structures and models, and in keeping with the [React approach](http://facebook.github.io/react/docs/forms.html#controlled-components) to form inputs,
each component's props can easily be [_controlled_ or _uncontrolled_](controllables).

A special shout-out to Kendo UI Core, and jQuery UI, whose original work inspired the this suite.

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

The npm build offers an additional advantage of allowing you to only require the individual widgets allowing code
bundlers like webpack and Browserify to only package up the pieces you use, saving you bytes.

## Setup

Stylesheets, images, and fonts are found in the `dist` directory. You can use webpack to `require()` the styles,
or include the css normally. The included icons are provided by - <a href="http://fontawesome.io">Font Awesome by Dave Gandy</a>

<TabbedCodeBlock>
  <Tab title="webpack">
    {\`
    import { render } from 'react-dom';
    import 'react-widgets/lib/less/react-widgets.less';
    import DropdownList from 'react-widgets/lib/DropdownList';

    render(<DropdownList />, document.getElementById('app-root'))
    \`}
  </Tab>
  <Tab title="browser globals">
    {\`
    <link href="dist/css/react-widgets.css" rel="stylesheet"/>

    <script src="http://fb.me/react-0.14.0.js"></script>
    <script src="http://fb.me/react-dom-0.15.0.js"></script>
    <script src='node_modules/react-widgets/dist/react-widgets.js'></script>
    <script>
      var DropdownList = ReactWidgets.DropDownlist;

      ReactDom.render(<DropdownList/>, document.getElementById('app-root'))
    </script>
    \`}
  </Tab>
</TabbedCodeBlock>

If are using webpack to handle styles in your application you are probably already configured
loaders to make it work with appropriate file extensions. If not, you will have to use
the `css-loader`, `style-loader`, `url-loader` and, optionally, the `less-loader` or
`scss-loader`.

Here's common configuration:

```js
loaders: [
  // for good ol' css
  { test: /\\.css$/,  loader: "style!css" },

  // if using less
  { test: /\\.less$/, loader: "style!css!less" },

  // if using scss
  { test: /\\.scss$/, loader: "style!css!scss" },

  // images and fonts
  { test: /\\.(gif|ttf|eot|svg)$/, loader: "url?name=[name].[ext]" },
  { test: /\\.woff2?(\?.*)?$/, loader: "url?name=[name].[ext]mimetype=application/font-woff" },
]
```

When using Less or Sass, you'll need to help webpack find the font and image folders.
Override corresponding variables from `variables` file.

<TabbedCodeBlock>
  <Tab title="Sass" lang="text/x-scss">
    {\`
    $rw-font-path: '~react-widgets/lib/fonts';
    $rw-img-path:  '~react-widgets/lib/img';

    @import '~react-widgets/lib/scss/react-widgets';
    \`}
  </Tab>
  <Tab title="Less" lang="text/x-less">
    {\`
    @import '~react-widgets/lib/less/react-widgets';

    @rw-font-path: '~react-widgets/lib/fonts';
    @rw-img-path:  '~react-widgets/lib/img';
    \`}
  </Tab>
</TabbedCodeBlock>

### I18n and Localization

If you want to use the `DateTimePicker` or `NumberPicker` widgets, you will also need to set up a *Localizer* to handle
date and number localization. Check out the [Localization page](i18n) for more information.

## Theming

Styling each widget should be a simple matter of adjusting the relevant LESS variables to suit your needs.
Included by default is a "Twitter Bootstrap" theme that mimics the look and feel of Twitter Bootstrap 3.0.
This is less an actual theme and more a neutral starting point for creating your own theme.

- Widget styles with LESS variables (see `./lib/less/variables.less` for reference).
- Icon fonts can be swapped out in the `./lib/less/icons.less` file

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

Rather than including an entire utility library, like underscore, react-widgets takes a hint from React itself,
and instead relies on es5 (and transpiled es6) functionality. For most browsers this is will not be an issue, as es5
is [very well supported](http://kangax.github.io/compat-table/es5/) by modern browsers.
However older browsers will need the required functionality polyfilled.
In most cases React already requires most of the needed shims ([see here](http://facebook.github.io/react/docs/working-with-the-browser.html#polyfills-needed-to-support-older-browsers)).
If you are already including [kriskowal's es5-shim](https://github.com/es-shims/es5-shim')
then you are already good to go.

For those interested in the specific polyfills needed by react-widgets they are:

- `Array.prototype.some`
- `Array.prototype.filter`
- `Array.prototype.reduce`

### Animation
react-widgets uses CSS animations which are not supported in older IE. If you want to replace the
default the animation method for these cases you can. The built in method follows the
jQuery `$.animate()` API closely so you can use it as a drop in replacement.

<TabbedCodeBlock>
  <Tab title="Configure module">
    {\`
    import configure from 'react-widgets/lib/configure';

    configure.setAnimate((element, props, duration, ease, callback) => {
      $(element).animate(props, duration, callback)
    })
    \`}
  </Tab>
  <Tab title="Main import">
    {\`
    <import ReactWidgets from 'react-widgets';

    ReactWidgets.setAnimate((element, props, duration, ease, callback) => {
      $(element).animate(props, duration, callback)
    })
    \`}
  </Tab>
</TabbedCodeBlock>
