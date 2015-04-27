'use strict';
var React = require('react');
var EditableExample = require('../EditableExample')
var { Link } = require('react-router')

var GettingStarted = React.createClass({

  mixins: [
    require('../PageMixin')('getting-started')
  ],

  render: function() {
    return (
      <section {...this.props}>
        <h1 className="page-header">Getting Started <small className='pull-right' style={{marginTop: 15}}>current version {__VERSION__}</small></h1>
        <p>
          React-widgets offers a {'set'} UI widgets, built from scratch with React. The suite is based on the excellent
           work done by Kendo UI Core, and jQuery UI, but built as true components, and not library wrappers. By
           building each widget entirely in React, it can leavage all of the benefits of the React ecosystem
           and <a href='http://facebook.github.io/react/blog/2013/11/05/thinking-in-react.html' target="_blank">
            philosophy <i className="fa fa-external-link"></i>
          </a>.
        </p>
        <p>
          A big thanks to both of these libraries for solving most of the difficult problems already, and providing an
          excellent reference for what works, and what does not, in ui inputs.
        </p>
        <p>
          In keeping with the&nbsp;
          <a href='http://facebook.github.io/react/docs/forms.html#controlled-components' target="_blank">
            React approach <i className="fa fa-external-link"></i>
          </a> to form input components, each widget can be <em>controlled</em> or <em>uncontrolled</em>. Like form inputs 
           the value/onChange prop pair provides the main interface for widget interaction. If a <code>value</code> prop 
           is {'set'} the widget's value is said to be <em>controlled</em>, meaning the parent is responsible for managing its 
           state. If the widget does not provide a <code>value</code> prop, the widget becomes <em>uncontrolled</em> or responsible 
           for managing its own value through internal state. To initialize an uncontrolled widget with a value you can use 
           the <code>defaultValue</code> prop. In addition to the <code>value</code> prop, widgets may allow other props 
           (such as <code>open</code> or <code>search</code>) to be controlled by the parent component. 
        </p>
        <p>
          Some widgets can also be "bound" to a {'set'} of data (traditionally an array of models) through
           a <code>data</code> prop. While they work just as well with data primitives such as strings, numbers, and
           arrays, they really shine through the use of the <code>valueField</code> and <code>textField</code> props,
           which offer a quick way to display complex data structures.
        </p>

        <h2 id='/getting-started/install' className='prop-header'>Install <a/></h2>
        <p>
          The prefered way to install is NPM (<code>npm install react-widgets</code>) and make use of something like Webpack or 
           Browserify to bundle the library. You can also install via Bower or use the traditional browser build available for 
           download in the <strong>dist</strong> folder. The browser build does not bundle any dependencies, and 
           attaches itself to the <code>window</code> as <code>ReactWidgets</code>
        </p>
        <p>
          Compiled CSS, images, and fonts are found in the <code>dist</code> directory.
           Included icons are provided by - <a href="http://fontawesome.io">Font Awesome by Dave Gandy</a>
        </p>
        <strong>
          Note: versions prior to 1.1.0 require a build step (transpilation from JSX) when using the NPM package.
           As of 1.1.0 the package comes precompiled, and no build step is needed.
        </strong>

        <h2 id='/getting-started/deps' className='prop-header'>External Dependencies</h2>
        <p>
          React-widgets <b>2.x</b> is compatible with React <b>0.12.0+</b>, while the <b>1.x</b> branch supports
           React <b>0.9.0</b> to <b>0.10.0</b>. Either branch expects React to be bundled by you. Consumers of the NPM package should note that 
           React is not listed as direct, 
           or peer dependency. This is to help reduce the friction that Peer Dependencies can cause. 
           This means that NPM will not warn you if you try to use react-widgets with an incompatible React version.
        </p>
        <p>
          If you use Browserify or Webpack to build your projects, the dependencies listed below will automatically be 
          included. They are listed for the sake of those who wish to externalize the lib dependencies to reduce 
          duplication, or wish to use a different, compatible, library.
        </p>
        <ul>
          <li>
            <a href="https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468" >Globalize</a>&nbsp;
            used for date and number localization. Requires a 0.x.x version (not the upcoming 1.0.0). 
          </li>
        </ul>
        <p>
          You need to ensure that your app or library only includes one instance of Globalize. In that sense it is a peer dependency 
          of react-widgets. However since peer dependencies cannot be optional, and your use of globalize is optional, it is not included as one. 
          see <Link to='/getting-started/configuration'>the section below</Link> for more info.
        </p>
        <strong>
          Note: As of verison <code>2.3.0</code> you can completely swap out the Globalize dependency for any localization 
          solution you wish through widget format and parse props.
        </strong>
        
        <h2 id='/getting-started/browser'>Older Browser Support</h2>
        <p>
          Rather than including an entire utility library, like underscore, react widgets takes a hint from React itself, 
          and instead relies on es5 (and transpiled es6) functionality. For most browsers this is will not be an issue, as es5 
          is <a href="http://kangax.github.io/compat-table/es5/">very well supported</a> by modern browsers. However older 
          browsers will need the required functionality polyfilled. In most clases React already requires most of the needed shims 
          (
            <a target="_blank" href="http://facebook.github.io/react/docs/working-with-the-browser.html#polyfills-needed-to-support-older-browsers">
            see here <i className="fa fa-external-link"></i>
          </a>). If you are already including <a href="https://github.com/es-shims/es5-shim">kriskowal's es5-shim</a> then 
          react-widgets propbably has everything it needs.

          For those interested in the specific additions needed by react-widgets they are:
          <ul>
            <li><code>Array.prototype.some</code></li>
            <li><code>Array.prototype.filter</code></li>
            <li><code>Array.prototype.reduce</code></li>
          </ul>

          You can use the excellent <a href="https://github.com/es-shims/es5-shim">kriskowal's es5-shim</a> for all of these.
        </p>

        <h2 id='/getting-started/access'>Accessibility and Read Direction</h2>
        <p>
          React-widgets tries to be as inclusive and wide reaching as possible. Along with an included solution for
          date and number localization, there is first {'class'} support for cultures and languages that read
          right to left (with the <code>isRtl</code> prop).
        </p>
        <p>
          Each widget also has appropriate ARIA roles and attributes for the benefit of screen readers and visually
          impaired users. Keyboard only navigation of widgets is also supported, for those who prefer to not,
          or cannot use a mouse. to help ensure maximum accessibility, every widget should have
          an <code>id</code> attribute. If you do not wish to provide an id attrbute, the widget will generate
          the necessary id's to properly label and annotate the widget ARIA.
        </p>

        <h2 id='/getting-started/style' className='prop-header'>Styling</h2>
        <p>
          Styling each widget should be a simple matter of adjusting the relevant LESS variables to suit your needs.
          Included by default is a "Twitter Bootstrap" theme that mimics the look and feel of Twitter Bootstrap 3.0.
          This is less an actual theme and more a neutral starting point for creating your own theme.

          <ul>
            <li>
              Widget styles with LESS variables (see <code>./lib/less/bootstrap-theme.less</code> for reference).
            </li>
            <li>
              Icon fonts can be swapped out in the <code>./lib/less/icons.less</code> file
            </li>
          </ul>
        </p>

        <h2 id='/getting-started/configuration' className='prop-header'>Configuration</h2>
        <p>
          There are a few configuration options designed to give both flexibility and increase ease of use. To set an option you can either use 
          the exported <code>configure</code> (<code>require('react-widgets').configure</code>) namespace or require 
          it directly: <code>require('react-widgets/lib/configure')</code>.
        </p>
        <h4>Globalize</h4>
        <p>
          Peer Dependencies can be a pain, and can't be optional, so we don't do use them. This means you will need to ensure that only one 
          instance is included in your app at a time. If you are using Browserify or Webpack, you can make use of their configuration options 
          to ensure this. You can also use <code>npm dedupe</code> to ensure only one copy is included, 
          or you can explicitly define the Globalize instance that the widgets should use.
        </p>
        <pre>
          <code className='js'>
          {`configure.setGlobalizeInstance(window.globalize)`}
          </code>
        </pre>

        <h4>Animation</h4>
        <p>
          By default, react-widgets uses CSS animations for everything. While this works great on modern browsers older IE does not support them. 
          If you want to swap out the animation method for these cases you can. The built in method mirrors the jQuery animate API closely so it 
          and easily be swapped out for jQuery.
        </p>
        <pre>
          <code className='js'>
          {`configure.setAnimate((element, props, duration, ease, callback) => $(element).animate(props, duration, callback))`}
          </code>
        </pre>
      </section>
    );
  }

});

module.exports = GettingStarted;