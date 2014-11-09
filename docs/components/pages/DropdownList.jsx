'use strict';
var React = require('react')
  , Default = require('../default.jsx')
  , Example = require('../example.jsx')
  , MenuItem = require('../../bootstrap').MenuItem
  , DDButton = require('../../bootstrap').DropdownButton
  , DropdownListExample = require('../examples/DropdownList.jsx');

var prefix = 'DropdownList/'
var widgetName = 'DropdownList'
var DropdownList = React.createClass({

  render: function() {
    return (
      <section {...this.props}>
        <h1 className="page-header">
          Dropdown List
          <span className='pull-right'>
            <DDButton title='props' bsStyle='link' pullRight={true}>
              <MenuItem href={'#' + prefix + 'value'}>value</MenuItem>
              <MenuItem href={'#' + prefix + 'onChange'}>onChange</MenuItem>
              <MenuItem href={'#' + prefix + 'data'}>data</MenuItem>
              <MenuItem divider={true}></MenuItem>
              <MenuItem href={'#' + prefix + 'valueField'}>valueField</MenuItem>
              <MenuItem href={'#' + prefix + 'textField'}>textField</MenuItem>
              <MenuItem href={'#' + prefix + 'valueComponent'}>valueComponent</MenuItem>
              <MenuItem href={'#' + prefix + 'itemComponent'}>itemComponent</MenuItem>

              <MenuItem href={'#' + prefix + 'open'}>open</MenuItem>
              <MenuItem href={'#' + prefix + 'onToggle'}>onToggle</MenuItem>

              <MenuItem href={'#' + prefix + 'busy'}>busy</MenuItem>
              <MenuItem href={'#' + prefix + 'duration'}>duration</MenuItem>
              <MenuItem href={'#' + prefix + 'isRtl'}>isRtl</MenuItem>
              <MenuItem href={'#' + prefix + 'messages'}>messages</MenuItem>
              <MenuItem divider={true}></MenuItem>
              <MenuItem href={'#' + prefix + 'keyboard'}>Keyboard Navigation</MenuItem>
            </DDButton>
          </span>
        </h1>
        <p>
          A <code>{'<select/>'}</code> tag replacement that offers additional functionality. the Dropdown list
        </p>
        <DropdownListExample/>
        <Example code={
          "render: function(){\n"+
          "  var DropdownList = require('react-widgets').DropdownList\n"+
          "    , list = [\n"+
          "      { label: 'orange', id: 1 },\n"+
          "      { label: 'blue', id: 2 },\n"+
          "      { label: 'red', id: 3 },\n"+
          "    ]\n"+
          "  return (\n"+
          "    <DropdownList \n"+
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
          value <small>Any</small><strong>controllable (onChange, defaultValue)</strong>
        </h3>
        <p>
          The current value of the DropdownList. This can be an object (such as a member of the <code>data</code> array)
          or a primitive value, hinted to by the <code>valueField</code>. The widget value does not need to be in
          the <code>data</code> array; widgets can have values that are not in their list.
        </p>

        <h3 className='prop-header' id={ prefix +"onChange" }>
          onChange <small>{"Function(Any value)"}</small></h3>
        <p>
          Change event Handler that is called when the value is changed.
        </p>

        <h3 className='prop-header' id={ prefix +"data" }>
          data <small>Array - mixed</small></h3>
        <p>
          provide an array of possible values for the DropdownList. If an array of <code>objects</code> is provided you
          should use the <code>valueField</code> and <code>textField</code> props, to specify which object
          properties comprise the value field (such as an id) and the field used to label the item.
        </p>
        <h3 className='prop-header' id={ prefix +"valueField" }>
          valueField <small>String</small></h3>
        <p>
          A property name of a uniquely identifying field in the <code>data</code> array. If no valueField is provided,
          the widget will use strict equality checks to locate the data item, if it exists.
        </p>
        <h3 className='prop-header' id={ prefix +"textField" }>
          textField <small>String</small></h3>
        <p>
          This prop determines which data item field to display in the combobox and selected item. This prop is
          unnecessary when an <code>itemComponent</code>  and <code>valueComponent</code> are provided.
        </p>

        <h3 className='prop-header' id={ prefix +"valueComponent" }>
          valueComponent <small>Component</small></h3>
        <p>
          This component is used to render the selected value of the combobox. The default component
          renders the text of the selected item (specified by <code>textfield</code>)
        </p>

        <h3 className='prop-header' id={ prefix +"itemComponent" }>
          itemComponent <small>Component</small></h3>
        <p>
          This component is used to render each possible item in the DropdownList. The default component
          renders the text of the selected item (specified by <code>textfield</code>)
        </p>

        <h3 className='prop-header' id={ prefix +"open" }>
          open <small>Boolean<Default>false</Default></small><strong>controllable (onToggle, defaultOpen)</strong>
        </h3>
        <p>
          Whether or not the {widgetName} is open. When unset (<code>undefined</code>) the {widgetName} will handle the
          opening and closing internally. The <code>defaultOpen</code> prop can be used to {'set'} an
          initialization value for uncontrolled widgets.
        </p>
        <h3 className='prop-header' id={ prefix +"onToggle" }>
          onToggle <small>{"Function(Boolean isOpen)"}</small></h3>
        <p>
          Called when the {widgetName} is about to open or close. <code>onToggle</code> should be used
          when the <code>open</code> prop is {'set'} otherwise the widget will never open or close.
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
          mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through
           a <code>childContext</code> prop (<code>isRtl</code>) this allows higher level application components to specify the direction.
        </p>
        <h3 className='prop-header' id={ prefix +"messages" }>
          messages <small>Object</small></h3>
        <p>
          Object hash containing display text and/or text for screen readers. Use the <code>messages</code> object to
          localize widget text and increase accessibility.
        </p>
        <h3>messages.open <small>String<Default>"Open Dropdown"</Default></small></h3>
        <p>
          Dropdown button text for screen readers
        </p>

        <h2 id={ prefix +"keyboard" }>Keyboard Navigation</h2>

        <ul className='list-unstyled keyboard-list'>
          <li><kbd>alt + down arrow</kbd> open dropdown</li>
          <li><kbd>alt + up arrow</kbd> close dropdown</li>
          <li><kbd>down arrow</kbd> move focus to next item</li>
          <li><kbd>up arrow</kbd> move focus to previous item</li>

          <li><kbd>home</kbd> move focus to first item</li>
          <li><kbd>end</kbd> move focus to last item</li>

          <li><kbd>enter</kbd> select focused item</li>

          <li><kbd>any key</kbd> search list for item starting with key</li>
        </ul>
      </section>
    );
  }

});

module.exports = DropdownList;