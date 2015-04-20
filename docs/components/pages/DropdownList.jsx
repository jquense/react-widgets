'use strict';
var React = require('react')
  , EditableExample = require('../EditableExample')
  , MenuItem = require('../ApiMenuItem.jsx')
  , DDButton = require('../../bootstrap').DropdownButton
  , PropHeader = require('../PropHeader.jsx')
  , DropdownListExample = require('../demos/dropdownlist.jsx')

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

              <MenuItem>placeholder</MenuItem>

              <MenuItem>searchTerm</MenuItem>
              <MenuItem>onSearch</MenuItem>

              <MenuItem>open</MenuItem>
              <MenuItem>onToggle</MenuItem>

              <MenuItem divider></MenuItem>
              <MenuItem>filter</MenuItem>
              <MenuItem>caseSensitive</MenuItem>
              <MenuItem>minLength</MenuItem>
              <MenuItem divider></MenuItem>

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
          A <code>{'<select/>'}</code> tag replacement that offers additional functionality.
        </p>
        <pre className='component-export'>
          <code>
          <div>Widget Suite:</div>
          {` ${widgetName}`} = require(<span className='str'>'react-widgets'</span>){`.${widgetName}`}<br/>
          <div>Individual Component:</div>
          {` ${widgetName}`} = require(<span className='str'>{`'react-widgets/lib/${widgetName}'`}</span>)
          </code>
        </pre>
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
          A dataItem field name for uniquely identifying items in the <code>data</code> list. A <code>valueField</code> is required 
          when the <code>value</code> prop is not itself a dataItem. A <code>valueField</code> is useful when specifying the selected item, by
          its <code>id</code> instead of using the model as the value.
        </p>
        <p>
          When a <code>valueField</code> is not provided, the {widgetName} will use strict equality checks (<code>===</code>) to locate 
          the <code>value</code> in the <code>data</code> list.
        </p>
        <EditableExample codeText={require('../examples/valueField')(widgetName)}/>

        <PropHeader type='String | Function(dataItem)'>textField</PropHeader>
        <p>
          {`Specify which data item field to display in the ${widgetName} and selected item. The `}<code>textField</code>{`prop 
          may also also used as to find an item in the list as you type. Providing an accessor function allows for computed text values`}
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

        <PropHeader type='String'>placeholder</PropHeader>
        <p>
          Text to display when the value is empty.
        </p>

        <PropHeader type='String' handler='onSearch' controllable>searchTerm</PropHeader>
        <p>
          The string value of the current search being typed into the {widgetName}. When
          unset (<code>undefined</code>) the {widgetName} will handle the filtering internally.
          The <code>defaultSearchTerm</code> prop can be used to {'set'} an initialization value for uncontrolled widgets. searchTerm is only
          relevant when the <code>filter</code> prop is set.
        </p>

        <PropHeader type='Function(String searchTerm)'>onSearch</PropHeader>
        <p>
          Called when the value of the filter input changes either from typing or a pasted value.&nbsp;
          <code>onSearch</code> should be used when the <code>searchTerm</code> prop
          is {'set'}.
        </p>

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

        <PropHeader type='[String, Function(dataItem, searchTerm)]' default='false'>filter</PropHeader>
        <p>
          Specify a filtering method used to reduce the items in the dropdown as you type. There are a few prebuilt filtering 
          methods that can be specified by passing the <code>String</code> name.
        </p>
        <p>
          To handle custom filtering techniques provide
          a <code>{'function'}</code> that returns <code>true</code> or <code>false</code> for each passed in item
          (analogous to the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter">
          array.filter</a> builtin)
        </p>
        <p>
          Acceptable values for filter are:&nbsp;
          <code>false</code> <code>"startsWith"</code> <code>"endsWith"</code> <code>"contains"</code>&nbsp;
          <code>{'function(String item)'}</code>
        </p>
        <EditableExample codeText={require('../examples/filter')(widgetName)}/>

        <PropHeader type='Boolean' default='false'>caseSensitive</PropHeader>
        <p>{`Use in conjunction with the filter prop. Filter the list without regard for case. This only applies to non function values for `}<code>filter</code></p>

        <PropHeader type='Boolean' default='1'>minLength</PropHeader>
        <p>{`Use in conjunction with the filter prop. Start filtering the list only after the value has reached a minimum length.`}</p>


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

        <PropHeader type='String'>messages.filterPlaceholder</PropHeader>
        <p>
          The placeholder text for the filter input.
        </p>

        <PropHeader type='String' default='"There are no items in this list"'>messages.emptyList</PropHeader>
        <p>
          Text to display when the <code>data</code> prop array is empty
        </p>

        <PropHeader type='String' default='"The filter returned no results"'>messages.emptyFilter</PropHeader>
        <p>
          Text to display when the the current filter does not return any results
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

