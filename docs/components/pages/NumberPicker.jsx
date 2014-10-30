/**
 * @jsx React.DOM
 */

var React = require('react')
  , Default = require('../default.jsx')
  , Example = require('../example.jsx')
  , DDButton = require('react-bootstrap/DropdownButton')
  , MenuItem = require('react-bootstrap/MenuItem')
  , NumberPickerExample = require('../examples/numberpicker.jsx');

var prefix = 'number-picker/'
var NumberPicker = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <section>
        <h1 className="page-header">
          Number Picker
          <span className='pull-right'>
            <DDButton title='props' bsStyle='link' pullRight={true}>
              <MenuItem href={'#' + prefix + 'value'}>value</MenuItem>
              <MenuItem href={'#' + prefix + 'onChange'}>onChange</MenuItem>
              <MenuItem divider={true}></MenuItem>
              <MenuItem href={'#' + prefix + 'format'}>format</MenuItem>
              <MenuItem href={'#' + prefix + 'min'}>min</MenuItem>
              <MenuItem href={'#' + prefix + 'max'}>max</MenuItem>
              <MenuItem href={'#' + prefix + 'step'}>step</MenuItem>


              <MenuItem href={'#' + prefix + 'isRtl'}>isRtl</MenuItem>
              <MenuItem href={'#' + prefix + 'messages'}>messages</MenuItem>
              <MenuItem divider={true}></MenuItem>
              <MenuItem href={'#' + prefix + 'keyboard'}>Keyboard Navigation</MenuItem>
            </DDButton>
          </span>

        </h1>
        <p>
          Spinner for selecting numbers. Supports multiple formats for display and editing through Globalize.js
        </p>
        <NumberPickerExample/>
        <Example code={
          "render: function(){\n"+
          "  //... \n\n" +
          "  return (\n"+
          "    <NumberPicker \n"+
          "      value={this.state.value}\n"+
          "      onChange={this._change}\n"+
          "      min={2}\n"+
          "      max={10}/>\n\n"+
          "    <NumberPicker \n"+
          "      format='c'\n" +
          "      step={1.5}/>\n\n"+
          "  )\n"+
          "}"
        }/>
        <h2>Props</h2>
        <h3 className='prop-header' id={ prefix +"value" }>
          value <small>Number?</small><strong>controllable (onChange, defaultValue)</strong></h3>
        <p>
          The current value of the NumberPicker.
        </p>

        <h3 className='prop-header' id={ prefix +"onChange" }>
          onChange <small>{"Function(Number? value)"}</small></h3>
        <p>
          Change event Handler that is called when the value is changed. The handler is called with the
          current numeric value or null.
        </p>

        <h3 className='prop-header' id={ prefix +"format" }>
          format <small>String<Default>"d"</Default></small></h3>
        <p>
          A format string used to display the number value. For more information on prefined and custom number and
          currency formats visit the&nbsp;
          <a href='https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468#number-formatting'>
            Globalize.js documentation <i className="fa fa-external-link"></i>
          </a>.
        </p>

        <h3 className='prop-header' id={ prefix +"min" }>
          min <small>Number<Default>-Infinity</Default></small></h3>
        <p>
          The minimum number that the NumberPicker value.
        </p>

        <h3 className='prop-header' id={ prefix +"max" }>
          max <small>Number<Default>Infinity</Default></small></h3>
        <p>
          The maximum number that the NumberPicker value.
        </p>

        <h3 className='prop-header' id={ prefix +"step" }>
          step <small>Number<Default>1</Default></small></h3>
        <p>
          Amount to increase or decrease value when using the spinner buttons.
        </p>

        <h3 className='prop-header' id={ prefix +"isRtl" }>
          isRtl <small>Boolean<Default>false</Default></small></h3>
        <p>
          mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through
           a <code>childContext</code> prop (<code>isRtl</code>) this allows higher level application components to specify the direction.
        </p>

        <h3 className='prop-header' id={ prefix +"messages" }>
          messages <small>Object</small></h3>
        <p>
          Object hash containing display text and/or text for screen readers. Use the <code>messages</code> object to
          localize widget text and increase accessibility.
        </p>
        <h3>messages.increment <small>String<Default>"increment value"</Default></small></h3>
        <p>
          Number picker spinner up button text for screen readers
        </p>
        <h3>messages.decrement <small>String<Default>"decrement value"</Default></small></h3>
        <p>Number picker spinner down button text for screen readers </p>

        <h2 id={ prefix +"keyboard" }>Keyboard Navigation</h2>

        <ul className='list-unstyled keyboard-list'>
          <li><kbd>down arrow</kbd> decrement value</li>
          <li><kbd>up arrow</kbd> increment value</li>

          <li><kbd>home</kbd> {'set'} value to minimum value if finite</li>
          <li><kbd>end</kbd> {'set'} value to maximum value if finite</li>
        </ul>
      </section>
    );
  }

});

module.exports = NumberPicker;