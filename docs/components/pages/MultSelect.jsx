'use strict';
var React = require('react')
  , Default = require('../default.jsx')
  , Example = require('../example.jsx')
  , DDButton = require('../../bootstrap').DropdownButton
  , MenuItem = require('../../bootstrap').MenuItem
  , MultiselectExample = require('../examples/Multiselect.jsx');

var prefix = 'multiselect/';
var widgetName = 'Multiselect'
var Multiselect = React.createClass({

  render: function() {
    return (
      <section {...this.props}>
        <h1 className="page-header">
          Multiselect
          <span className='pull-right'>
            <DDButton title='props' bsStyle='link' pullRight={true}>
              <MenuItem href={'#' + prefix + 'value'}>value</MenuItem>
              <MenuItem href={'#' + prefix + 'onChange'}>onChange</MenuItem>
              <MenuItem href={'#' + prefix + 'data'}>data</MenuItem>
              <MenuItem divider={true}></MenuItem>
              <MenuItem href={'#' + prefix + 'valueField'}>valueField</MenuItem>
              <MenuItem href={'#' + prefix + 'textField'}>textField</MenuItem>
              <MenuItem href={'#' + prefix + 'tagComponent'}>tagComponent</MenuItem>
              <MenuItem href={'#' + prefix + 'itemComponent'}>itemComponent</MenuItem>
              <MenuItem href={'#' + prefix + 'placeholder'}>placeholder</MenuItem>

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
          Multiple Multiselection widget.
        </p>
        <MultiselectExample/>
        <Example code={
          "render: function(){\n"+
          "  var Multiselect = require('react-widgets').Multiselect\n"+
          "  //... \n\n" +
          "  return (\n"+
          "    <Multiselect \n"+
          "      data={list}\n"+
          "      value={this.state.value}\n"+
          "      onChange={this._change}\n"+
          "      textField='label'\n"+
          "      valueField='id'/>\n"+
          "   )\n"+
          "}"
        }/>

        <h2>Props</h2>
        <h3 className='prop-header' id={ prefix +"value" }>
          value <small>Array?</small><strong>controllable (onChange, defaultValue)</strong></h3>
        <p>
          The current values of the Multiselect. The value should can <code>null</code>, or an array
          of <code>valieField</code> values, or an array of objects (such as a few items in the <code>data</code> array)
        </p>

        <h3 className='prop-header' id={ prefix +"onChange" }>
          onChange <small>{'Function(Any value)'}</small></h3>
        <p>
          change event Handler that is called when the value is changed. The handler will return an array of values
        </p>
        <strong>Note:</strong><span> Just like input tags, if you do not specify an <code>onChange</code> handler the widget
        becomes readonly</span>

        <h3 className='prop-header' id={ prefix +"data" }>
          data <small>Array</small></h3>
        <p>
          provide an array of possible values for the {widgetName}. If an array of <code>objects</code> is provided you
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
          This prop determines which data item field to display in the {widgetName} list andselected item This prop is
          unnecessary when an <code>itemComponent</code> and <code>tagComponent</code> are provided.
        </p>

        <h3 className='prop-header' id={ prefix +"tagComponent" }>
          tagComponent <small>Component</small></h3>
        <p>
          This component is used to render each selected item. The default component
          renders the text of the selected item (specified by <code>textfield</code>)
        </p>

        <h3 className='prop-header' id={ prefix +"itemComponent" }>
          itemComponent <small>Component</small></h3>
        <p>
          This component is used to render each possible item in the list. The default component
          renders the text of the selected item (specified by <code>textfield</code>)
        </p>

        <h3 className='prop-header' id={ prefix +"placeholder" }>
          placeholder <small>String</small></h3>
        <p>
          The same as an input placeholder, only works in browsers that support the placeholder attribute for inputs
        </p>

        <h3 className='prop-header' id={ prefix +"searchTerm" }>
          searchTerm <small>String</small><strong>controllable (onSearch, defaultSearchTerm)</strong>
        </h3>
        <p>
          The string value of the current search being typed into the {widgetName}. When
          unset (<code>undefined</code>) the {widgetName} will handle the filtering internally.
          The <code>defaultSearchTerm</code> prop can be used to {'set'} an initialization value for uncontrolled widgets.
        </p>
        <h3 className='prop-header' id={ prefix +"onSearch" }>
          onSearch <small>{"Function(String searchTerm)"}</small></h3>
        <p>
          Called when the value of the text box changes either from typing or a pasted value.&nbsp;
          <code>onSearch</code> should be used when the <code>searchTerm</code> prop
          is {'set'}.
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
        <h3 className='prop-header' id={ prefix +"duration" }>
          disabled <small>[Boolean, Array]</small></h3>
        <p>
          Disable the widget, If an <code>Array</code> of values is passed in only the tags specified will be disabled.
        </p>

        <h3 className='prop-header' id={ prefix +"duration" }>
          readOnly <small>[Boolean, Array]</small></h3>
        <p>
          Place the widget in a readonly mode, If an <code>Array</code> of values is passed in only the tags specified will be readonly.
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

        <h3>messages.emptyList <small>String<Default>"There are no items in this list"</Default></small></h3>
        <p>
          text to display when the <code>data</code> prop array is empty
        </p>
        <h3>messages.emptyFilter <small>String<Default>"The filter returned no results"</Default></small></h3>
        <p>
          text to display when the the current filter does not return any results
        </p>

        <h2 id={ prefix +"keyboard" }>Keyboard Navigation</h2>

        <ul className='list-unstyled keyboard-list'>
          <li><kbd>down arrow</kbd> open dropdown, and move focus to next item</li>
          <li><kbd>up arrow</kbd> move focus to previous item</li>
          <li><kbd>alt + up arrow</kbd> close dropdown</li>

          <li><kbd>left arrow</kbd> move focus to previous selected tag</li>
          <li><kbd>right arrow</kbd> move focus to previous selected tag</li>
          <li><kbd>delete</kbd> unselect focused tag</li>
          <li><kbd>backspace</kbd> remove next selected tag</li>

          <li><kbd>home</kbd> move focus to first item</li>
          <li><kbd>end</kbd> move focus to last item</li>

          <li><kbd>enter</kbd> select focused item</li>

          <li><kbd>any key</kbd> search list for item starting with key</li>
        </ul>
      </section>
    );
  }

});

module.exports = Multiselect;