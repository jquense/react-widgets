---
name: Getting Started
---

# Getting Started

react-widgets is a suite of high-quality input components built for React. Each component is built for ease of use,
accessibility, and the practical needs of complex (or simple) forms. The work great with complex data
structures and models, and in keeping with the [React approach](http://facebook.github.io/react/docs/forms.html#controlled-components) to form inputs,
each component's props can easily be [_controlled_ or _uncontrolled_](/react-widgets/controllables/).

A special shout-out to Kendo UI Core, and jQuery UI, whose original work inspired this suite.

<div className='row'>
<div className='col-sm-6'>
<h4>Install: npm (recommended)</h4>
<pre><code>npm install react-widgets --save</code></pre>
</div>
<div className='col-sm-6'>
<h4>bower</h4>
<pre><code>bower install react-widgets --save</code></pre>
</div>
</div>

The npm build offers an additional advantage of allowing you to only require the individual widgets allowing code
bundlers like webpack and Browserify to only package up the pieces you use, saving you bytes.

## Setup

Stylesheets, images, and fonts are found in the `dist` directory. You can use webpack to `require()` the styles,
or include the css normally. The included icons are provided by - [Font Awesome by Dave Gandy]("http://fontawesome.io">)

{{ <TabbedCodeBlock>
  <Tab title="webpack">
    {`
    // Add the css styles...
    import 'react-widgets/dist/css/react-widgets.css';

    // ...Or if you prefer to use the Less or Sass files directly
    // import 'react-widgets/lib/less/react-widgets.less';
    // import 'react-widgets/lib/scss/react-widgets.scss';

    import { render } from 'react-dom';
    import DropdownList from 'react-widgets/lib/DropdownList';

    render(<DropdownList />, document.getElementById('app-root'))
    `}
  </Tab>
  <Tab title="browser globals">
    {`
    <link href="dist/css/react-widgets.css" rel="stylesheet"/>

    <script src="http://fb.me/react-15.5.5.js"></script>
    <script src="http://fb.me/react-dom-15.5.0.js"></script>
    <script src='node_modules/react-widgets/dist/react-widgets.js'></script>
    <script>
      var DropdownList = ReactWidgets.DropDownlist;

      ReactDOM.render(<DropdownList/>, document.getElementById('app-root'))
    </script>
    `}
  </Tab>
</TabbedCodeBlock> }}


> **Hey!** Date and number components need a *Localizer* configured in order to work!
> Check out the [Localization page](../localization/) for more information.

If are using webpack to handle styles in your application you are probably already configured
loaders to make it work with appropriate file extensions. If not, you will have to use
the `css-loader`, `style-loader`, `url-loader` and, optionally, the `less-loader` or
`scss-loader`.

Here's a common configuration:

```js
module: {
  loaders: [
    // for good ol' css
    { test: /\\.css$/,  use: ['style-loader', 'css-loader'] },
    // OR if using less
    { test: /\\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
    // OR if using scss
    { test: /\\.scss$/, use: ['style-loader', 'css-loader', 'scss-loader'] },

    // images and fonts
    { test: /\\.(gif|ttf|eot|svg|woff2?)$/, use: 'url-loader?name=[name].[ext]'},
  ]
}
```

When using Less or Sass, you'll need to help webpack find the font and image folders.
Override corresponding variables from `variables` file.

{{ <TabbedCodeBlock>
  <Tab title="Sass" lang="text/x-scss">
    {`
    $font-path: '~react-widgets/lib/fonts';
    $img-path:  '~react-widgets/lib/img';

    @import '~react-widgets/lib/scss/react-widgets';
    `}
  </Tab>
  <Tab title="Less" lang="text/x-less">
    {`
    @import '~react-widgets/lib/less/react-widgets';

    @font-path: '~react-widgets/lib/fonts';
    @img-path:  '~react-widgets/lib/img';
    `}
  </Tab>
</TabbedCodeBlock> }}

## Accessibility and Read Direction

React-widgets tries to be as inclusive and wide reaching as possible. Along with an included solution for
date and number localization, there is first class support for cultures and languages that read
right to left (with the `isRtl` prop).

Each widget also has appropriate ARIA roles and attributes for the benefit of screen readers and visually
impaired users. Keyboard-only navigation of widgets is also supported, for those who prefer to not,
or cannot use a mouse. To help ensure maximum accessibility, every widget should have
an `id` attribute. If you do not wish to provide an id attribute, the component will generate
the necessary id's to properly label and annotate the widget ARIA.

> **Note:** Because of how server-side rendering works, using auto generated `id`s may
> cause checksum mismatches. Always provide `id` props to your components to avoid this possible pitfall.

