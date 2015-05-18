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
          </a>. A big thanks to both of these libraries for solving most of the difficult problems already.
        </p>
        <p>
          In keeping with the&nbsp;
          <a href='http://facebook.github.io/react/docs/forms.html#controlled-components' target="_blank">
            React approach <i className="fa fa-external-link"></i>
          </a> to form input components, each widget can be <em>controlled</em> or <em>uncontrolled</em>. If a <code>value</code> prop 
           is {'set'} the widget's value is said to be <em>controlled</em>, meaning the parent is responsible for managing its 
           state. If the widget does not provide a <code>value</code> prop, the widget becomes <em>uncontrolled</em> or responsible 
           for managing its own value with no other input, you can set a starting value for an uncontrolled widget with 
           the <code>defaultValue</code> prop. In addition to the <code>value</code> prop, widgets may allow other props 
           (such as <code>open</code> or <code>search</code>) to be controlled as well. 
        </p>
        <p>
          Some widgets can also be "bound" to a {'set'} of data (traditionally an array of models) through
           a <code>data</code> prop. While they work just as well with data primitives such as strings, numbers, and
           arrays, they really shine through the use of the <code>valueField</code> and <code>textField</code> props,
           which offer a quick way to display complex data structures.
        </p>

        <h2 id='/getting-started/install' className='prop-header'>Install <a/></h2>

        <pre className='component-export'>
          <code>
          <div>npm</div>
          {` npm install react-widgets --save`}<br/>
          <div>Bower</div>
          {` bower install react-widgets --save`}<br/>
          <div>Old School</div>
          {` <script src='globalize.js'></script>
 <script src='react-widgets.js'></script>
 <script>
   ReactWidgets.DropdownList
 </script>`}
          <br/>
          </code>
        </pre>

        <p>
          The npm build offers an additional advantage of allowing you to only require the individual widgets allowing front end bundlers like Webpack 
          and Browserify to only package up the pieces you use saving you bytes. The global browser build will also need to 
          include <a href="https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468" >Globalize</a>&nbsp;, a library for handling 
          number and date localization (see the <Link to='i18n'>Localization page</Link> for more info on Globalize, or using other libraries).
        </p>
        <p>
          Stylesheets, images, and fonts are found in the <code>dist</code> directory. You can use webpack to <code>require()</code> the styles,
          or include the css normally. The included icons are provided by - <a href="http://fontawesome.io">Font Awesome by Dave Gandy</a>
        </p>
        <pre className='component-export'>
          <code>
          <div>Browser</div>
          {` <link href="dist/css/react-widgets.css" rel="stylesheet"/>`}<br/>
          <div>Webpack css</div>
          {` require('react-widgets/dist/react-widgets.css')`}<br/>
          <div>Webpack LESS</div>
          {` require('react-widgets/lib/react-widgets.less')`}<br/>
          </code>
        </pre>

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

          You can use the excellent <a href="https://github.com/es-shims/es5-shim">kriskowal's es5-shim</a> for all of these. If you want 
          to support animation in browsers that do not support CSS transitions you can replace the default animation utility to a more robust solution.
        </p>
        <h4>Animation</h4>
          <p>
            react-widgets uses CSS animations which are not supported in older IE. If you want to replace the default the animation method 
            for these cases you can. The built in method mirrors the jQuery animate API closely so it 
            and easily be swapped out for jQuery.
          </p>
          <pre>
            <code className='component-export'>
            <div>With the Configure module</div>
            {` require('react-widgets/lib/configure') \n` +
             `   .setAnimate((element, props, duration, ease, callback) => $(element).animate(props, duration, callback))`}<br/>
            <div>From the main export</div>
            {` require('react-widgets').configure \n` +
             `   .setAnimate((element, props, duration, ease, callback) => $(element).animate(props, duration, callback))`}<br/>
            </code>
          </pre>

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
      </section>
    );
  }

});

module.exports = GettingStarted;