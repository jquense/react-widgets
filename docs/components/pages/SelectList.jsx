/**
 * @jsx React.DOM
 */

var React = require('react')
  , Default = require('../default.jsx')
  , Example = require('../example.jsx')
  , MenuItem = require('react-bootstrap/MenuItem')
  , DDButton = require('react-bootstrap/DropdownButton')
  , DropdownListExample = require('../examples/selectlist.jsx');

var prefix = 'selectlist/'
var widgetName = 'SelectList'
var SelectList = React.createClass({

  render: function() {
    return this.transferPropsTo(
      <section>
        <h1 className="page-header">
          Select List
          <span className='pull-right'>
            <DDButton title='props' bsStyle='link' pullRight={true}>
              <MenuItem href={'#' + prefix + 'value'}>value</MenuItem>
              <MenuItem href={'#' + prefix + 'onChange'}>onChange</MenuItem>
              <MenuItem href={'#' + prefix + 'data'}>data</MenuItem>
              <MenuItem divider={true}></MenuItem>
              <MenuItem href={'#' + prefix + 'valueField'}>valueField</MenuItem>
              <MenuItem href={'#' + prefix + 'textField'}>textField</MenuItem>
              <MenuItem href={'#' + prefix + 'itemComponent'}>itemComponent</MenuItem>

              <MenuItem href={'#' + prefix + 'multiple'}>multiple</MenuItem>
              <MenuItem href={'#' + prefix + 'busy'}>busy</MenuItem>

              <MenuItem href={'#' + prefix + 'isRtl'}>isRtl</MenuItem>
              <MenuItem divider={true}></MenuItem>
              <MenuItem href={'#' + prefix + 'keyboard'}>Keyboard Navigation</MenuItem>
            </DDButton>
          </span>
        </h1>
        <p>
          Creates a list of radio buttons or checkboxes bound to a {'set'} of data.
        </p>
        <DropdownListExample/>
        <Example code={
          "render: function(){\n"+
          "  var SelectList = require('react-widgets').SelectList\n"+
          "    , list = [\n"+
          "      { label: 'orange', id: 1 },\n"+
          "      { label: 'blue', id: 2 },\n"+
          "      { label: 'red', id: 3 },\n"+
          "    ]\n"+
          "  return (\n"+
          "    <SelectList \n"+
          "      multiple\n" +
          "      data={list}\n"+
          "      value={this.state.value}\n"+
          "      onChange={this._change}\n"+
          "      textField='label'\n"+
          "      valueField='id'/>\n"+
          "  )\n"+
          "},\n\n"+
          "_change: function(value){\n"+
          "  this.setState({\n"+
          "    value: value\n"+
          "  })\n"+
          "}\n"
        }/>

        <h2>Props</h2>
        <h3 className='prop-header' id={ prefix +"value" }>
          value <small>{"Any|Array<Any>"}</small><strong>controllable (onChange, defaultValue)</strong>
        </h3>
        <p>
          The current value or values of the {widgetName}. This can be an object (such as a member of the <code>data</code> array)
          or a primitive value, hinted to by the <code>valueField</code>. The widget value does not need to be in
          the <code>data</code> array; widgets can have values that are not in their list.
        </p>

        <h3 className='prop-header' id={ prefix +"onChange" }>
          onChange <small>{"Function(Array<Any>|Any values)"}</small></h3>
        <p>
          Change event handler that is called when the value is changed. <code>values</code> will be an array 
          when <code>multiple</code> prop is set.
        </p>

        <h3 className='prop-header' id={ prefix +"data" }>
          data <small>Array - mixed</small></h3>
        <p>
          provide an array of possible values for the {widgetName}. If an array of <code>objects</code> is provided you
          should use the <code>valueField</code> and <code>textField</code> props, to specify which object
          properties comprise the value field (such as an id) and the field used to label the item.
        </p>
        <h3 className='prop-header' id={ prefix +"valueField" }>
          valueField <small>String</small></h3>
        <p>
          A property name of a uniquely identifying field in the <code>data</code> array. If no valueField is provided,
          the {widgetName} will use strict equality checks to locate the data item, if it exists.
        </p>
        <h3 className='prop-header' id={ prefix +"textField" }>
          textField <small>String</small></h3>
        <p>
          This prop determines which data item field to display in the {widgetName}.
        </p>

        <h3 className='prop-header' id={ prefix +"itemComponent" }>
          itemComponent <small>Component</small></h3>
        <p>
          This component is used to render each item in the {widgetName}. The default component
          renders the text of the selected item (specified by <code>textfield</code>)
        </p>

        <h3 className='prop-header' id={ prefix +"multiple" }>
          multiple <small>Boolean<Default>false</Default></small>
        </h3>
        <p>
          Whether or not the {widgetName} allows multiple selection or not. when <code>false</code> the {widgetName} will 
          render as a list of radio buttonsand checkboxes when <code>true</code>.
        </p>


        <h3 className='prop-header' id={ prefix +"busy" }>
          busy <small>Boolean</small></h3>
        <p>
          mark whether the widget is in a busy or loading state. If <code>true</code> the widget will display a spinner gif, useful
          when loading data via an ajax call.
        </p>
        <h3 className='prop-header' id={ prefix +"duration" }>
          duration <small>Number<Default>250</Default></small></h3>
        <p>
          The speed, in milliseconds, of the dropdown animation.
        </p>
        <h3 className='prop-header' id={ prefix +"isRtl" }>
          isRtl <small>Boolean<Default>false</Default></small></h3>
        <p>
          mark whether the {widgetName} should render right-to-left. This property can also be implicitly passed to the widget through
           a <code>childContext</code> prop (<code>isRtl</code>) this allows higher level application components to specify the direction.
        </p>


        <h2 id={ prefix +"keyboard" }>Keyboard Navigation</h2>

        <ul className='list-unstyled keyboard-list'>
          <li><kbd>down arrow</kbd> move focus to or select next item</li>
          <li><kbd>up arrow</kbd> move focus to or select previous item</li>

          <li><kbd>home</kbd> move focus to or select first item</li>
          <li><kbd>end</kbd> move focus to or select last item</li>

          <li><kbd>spacebar</kbd> <kbd>enter</kbd> toggle focused item</li>

          <li><kbd>any key</kbd> search list for item starting with key</li>
        </ul>
      </section>
    );
  }

});

module.exports = SelectList;