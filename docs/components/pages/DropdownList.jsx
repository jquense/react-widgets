'use strict';
var React = require('react')
  , EditableExample = require('../EditableExample')
  , MenuItem = require('../ApiMenuItem.jsx')
  , DDButton = require('../../bootstrap').DropdownButton
  , PropHeader = require('../PropHeader.jsx')
  , DropdownListExample = require('../demos/DropdownList.jsx')

var prefix = 'dropdown-list/'
var widgetName = 'DropdownList'
var DropdownList = React.createClass({

  mixins: [ require('../PageMixin')(prefix) ],
  
  render: function() {
    return (
      <section {...this.props}>
        <h1 className="page-header">
          Dropdown List
          <span className='pull-right'>
            <DDButton title='props' bsStyle='link' pullRight>
              <MenuItem>value</MenuItem>
              <MenuItem>onChange</MenuItem>
              <MenuItem>onSelect</MenuItem>
              <MenuItem>data</MenuItem>
              <MenuItem divider/>
              <MenuItem>valueField</MenuItem>
              <MenuItem>textField</MenuItem>
              <MenuItem>valueComponent</MenuItem>
              <MenuItem>itemComponent</MenuItem>
              <MenuItem>groupComponent</MenuItem>
              <MenuItem>groupBy</MenuItem>

              <MenuItem>open</MenuItem>
              <MenuItem>onToggle</MenuItem>
              <MenuItem>step</MenuItem>

              <MenuItem>busy</MenuItem>
              <MenuItem>duration</MenuItem>
              <MenuItem>isRtl</MenuItem>
              <MenuItem>messages</MenuItem>
              <MenuItem divider/>
              <MenuItem>Keyboard Navigation</MenuItem>
            </DDButton>
          </span>
        </h1>
        <p>
          A <code>{'<select/>'}</code> tag replacement that offers additional functionality. the Dropdown list
        </p>
        <DropdownListExample/>

        <h2>Props</h2>

        <PropHeader type='Any' handler="onChange" controllable>value</PropHeader>
        <p>
          The current value of the {widgetName}. This can be an object (such as a member of the <code>data</code> array)
          or a primitive value, hinted to by the <code>valueField</code>. The widget value does not need to be in
          the <code>data</code> array; widgets can have values that are not in their list.
        </p>
        <EditableExample codeText={require('../examples/value')(widgetName)}/>

        <PropHeader type='Function(Any value)'>onChange</PropHeader>
        <p>
          Change event Handler that is called when the value is changed.
        </p>
        <EditableExample codeText={require('../examples/onChange')(widgetName)}/>

        <PropHeader type='Function(Any value)'>onSelect</PropHeader>
        <p>
          This handler fires when an item has been selected from the list. It fires before the <code>onChange</code> handler, and fires 
          regardless of whether the value has actually changed.
        </p>
        <EditableExample codeText={require('../examples/onSelect')(widgetName)}/>

        <PropHeader type='Array<Any>'>data</PropHeader>
        <p>
          provide an array of possible values for the DropdownList. If an array of <code>objects</code> is provided you
          should use the <code>valueField</code> and <code>textField</code> props, to specify which object
          properties comprise the value field (such as an id) and the field used to label the item.
        </p>

        <PropHeader type='String'>valueField</PropHeader>
        <p>
          A property name of a uniquely identifying field in the <code>data</code> array. If no valueField is provided,
          the widget will use strict equality checks to locate the data item, if it exists.
        </p>
        <EditableExample codeText={require('../examples/valueField')(widgetName)}/>

        <PropHeader type='String'>textField</PropHeader>
        <p>
          This prop determines which data item field to display in the combobox and selected item. The <code>textField</code> prop 
          may also also used as to find an item in the list as you type.
        </p>
        <EditableExample codeText={require('../examples/textField')(widgetName)}/>

        <PropHeader type='Component'>valueComponent</PropHeader>
        <p>
          This component is used to render the selected value of the combobox. The default component
          renders the text of the selected item (specified by <code>textfield</code>)
        </p>
        <EditableExample codeText={require('../examples/valueComponent')(widgetName)}/>

        <PropHeader type='Component'>itemComponent</PropHeader>
        <p>
          This component is used to render each possible item in the DropdownList. The default component
          renders the text of the selected item (specified by <code>textfield</code>)
        </p>
        <EditableExample codeText={require('../examples/itemComponent')(widgetName)}/>

        <PropHeader type='String | Function(Any dataItem)'>groupBy</PropHeader>
        <p>
          Determines how to group the {widgetName} dropdown list. Providing a <code>string</code> will group 
          the <code>data</code> array by that property. You can also provide a {'function'} which should return the group value.
        </p>
        <EditableExample codeText={require('../examples/groupby')(widgetName)}/>

        <PropHeader type='Component' >groupComponent</PropHeader>
        <p>
          This component is used to render each option group, when <code>groupBy</code> is specified. By 
          default the <code>groupBy</code> value will be used.
        </p>

        <EditableExample codeText={require('../examples/groupComponent')(widgetName)}/>

        <PropHeader type='Boolean'>open</PropHeader>
        <p>
          Whether or not the {widgetName} is open. When unset (<code>undefined</code>) the {widgetName} will handle the
          opening and closing internally. The <code>defaultOpen</code> prop can be used to {'set'} an
          initialization value for uncontrolled widgets.
        </p>
        <EditableExample codeText={require('../examples/open')(widgetName)}/>

        <PropHeader type='Function(Boolean isOpen)'>onToggle</PropHeader>
        <p>
          Called when the {widgetName} is about to open or close. <code>onToggle</code> should be used
          when the <code>open</code> prop is {'set'} otherwise the widget open buttons won't work.
        </p>

        <PropHeader type='Number' default="false">step</PropHeader>
        <p>
          `The amount of minutes between each entry in the time list.`
        </p>
        <EditableExample codeText={require('../examples/prop')(widgetName, { step: 90, open: 'time'})}/>

        <PropHeader type='Boolean' default="false">busy</PropHeader>
        <p>
          mark whether the widget is in a busy or loading state. If <code>true</code> the widget will display a spinner gif, useful
          when loading data via an ajax call.
        </p>
        <EditableExample codeText={require('../examples/busy')(widgetName)}/>

        <PropHeader type='Number' default="250">duration</PropHeader>
        <p>
          The speed, in milliseconds, of the dropdown animation.
        </p>

        <PropHeader type='Boolean' default="false">isRtl</PropHeader>
        <p>
          mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through
           a <code>childContext</code> prop (<code>isRtl</code>) this allows higher level application components to specify the direction.
        </p>
        <PropHeader type='Object'>messages</PropHeader>
        <p>
          Object hash containing display text and/or text for screen readers. Use the <code>messages</code> object to
          localize widget text and increase accessibility.
        </p>

        <PropHeader type='String' default='"Open Dropdown"'>messages.open</PropHeader>
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

