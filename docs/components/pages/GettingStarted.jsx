/**
 * @jsx React.DOM
 */

var React = require('react');

var GettingStarted = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <section>
        <h1 className="page-header">Getting Started</h1>
        <p>
          React-widgets offers a basic {'set'} UI widgets, based on the excellent Kendo UI Core, and jQuery UI, but created from stratch as true 
          React components, rather then as wrappers around these libraries. A big thanks to both of these libraries for solving all 
          of the hard work already.
        </p>
        <p>
          Each widget implements the same simple interface as other input elements: <code>value=x</code> and <code>onChange</code>. 
          For certain Widgets (dropdown list, combobox, select) there is an additional <code>data</code> prop that is an array of 
          possible values
        </p>
        <h2>Install</h2>
        <p>
          The prefered way is to use NPM <code>npm install react-widgets</code> and make use of something like Webpack or 
          Browserify to bundle the lib. 
          There is also a traditional browser build available for download in the <strong>browser</strong> folder. 
          It does not bundle any dependencies listed below, and 
          attaches itself to the <code>window</code> as <code>ReactWidgets</code>
        </p>
        <p>
          Compiled CSS, images, and fonts are found in the <code>dist</code> directory. 
          Included icons are provided by - <a href="http://fontawesome.io">Font Awesome by Dave Gandy</a>
        </p>
        <strong>
          Note: prior to 1.1.0 when requiring react-widgets as a CommonJS module you also need to transpile the 
          module from jsx. As of 1.1.0 the package comes precompiled :)
        </strong>

        <h2>External Dependencies</h2>
        <p>
          React-widgets expects <code>React</code> to be included in your page (duh). It has been tested with React 0.10.x but should 
          be fine with react 0.9 as well

          <ul>
            <li><a href="http://lodash.com/">lodash</a> (<a href="http://underscorejs.org/">underscore</a>  may also work--untested)</li>
            <li>
              <a href="https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468">Globalize</a> used 
              for date and number localization.
            </li>
          </ul>
        </p>

        <h2>Accessibility and Read Direction</h2>
        <p>
          React-widgets tries to be as inclusive and wide reaching as possible. Along with an included solution for date and number 
          localization, there is first class support for cultures and languages that read right to left (with the <code>isRtl</code> prop).
        </p>
        <p>
          Each widget also has appropriate ARIA roles and attributes for the benefit of screen readers and visually impaired users. 
          Keyboard only navigation of widgets is also supported, for those who prefer to not, or cannot use a mouse. 
          to help ensure maximum accessibility, every widget should have an <code>id</code> attribute.
        </p>

        <h2>Styling</h2>
        <p>
          Styling each widget should be a simple matter of adjusting the relevant LESS variables to suit your needs. 
          Included by default is a "Twitter Bootstrap" theme that mimics the look and feel of Twitter Bootstrap 3.0. This is less an actual 
          theme and more a neutral starting point for creating your own theme.
        </p>
      </section>
    );
  }

});

module.exports = GettingStarted;