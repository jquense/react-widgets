'use strict';
var React = require('react')
  
  , EditableExample = require('../EditableExample')
  , MenuItem = require('../ApiMenuItem.jsx')
  , DDButton = require('../../bootstrap').DropdownButton
  , PropHeader = require('../PropHeader.jsx')
  , SelectListExample = require('../demos/selectlist.jsx');

var prefix = 'selectlist/'
var widgetName = 'SelectList'
var SelectList = React.createClass({

  mixins: [ require('../PageMixin')(prefix) ],
  
  render: function() {
    return (
      <section {...this.props}>
        <h1 className="page-header">
          Select List
          <span className='pull-right'>
            <DDButton title='props' bsStyle='link' pullRight={true}>
              <MenuItem prefix={prefix}>value</MenuItem>
              <MenuItem prefix={prefix}>onChange</MenuItem>
              <MenuItem prefix={prefix}>data</MenuItem>
              <MenuItem divider/>
              <MenuItem prefix={prefix}>valueField</MenuItem>
              <MenuItem prefix={prefix}>textField</MenuItem>
              <MenuItem prefix={prefix}>itemComponent</MenuItem>

              <MenuItem prefix={prefix}>multiple</MenuItem>
              <MenuItem prefix={prefix}>onMove</MenuItem>
              <MenuItem prefix={prefix}>busy</MenuItem>
              <MenuItem prefix={prefix}>disabled</MenuItem>
              <MenuItem prefix={prefix}>readonly</MenuItem>

              <MenuItem prefix={prefix}>isRtl</MenuItem>
              <MenuItem divider/>
              <MenuItem prefix={prefix}>Keyboard Navigation</MenuItem>
            </DDButton>
          </span>
        </h1>
        <p>
          Creates a list of radio buttons or checkboxes bound to a dataset.
        </p>
        <pre className='component-export'>
          <code>
          <div>Widget Suite:</div>
          {` ${widgetName}`} = require(<span className='str'>'react-widgets'</span>){`.${widgetName}`}<br/>
          <div>Individual Component:</div>
          {` ${widgetName}`} = require(<span className='str'>{`'react-widgets/lib/${widgetName}'`}</span>)
          </code>
        </pre>
        <SelectListExample/>
        <h2>Props</h2>

        <PropHeader type='Any|Array<Any>' handler="onChange" controllable>value</PropHeader>
        <p>
          The current value or values of the {widgetName}. This can be an object (such as a member of the <code>data</code> array)
          or a primitive value, hinted to by the <code>valueField</code>. The widget value does not need to be in
          the <code>data</code> array; widgets can have values that are not in their list.
        </p>
        <EditableExample codeText={require('../examples/value')(widgetName, true)}/>

        <PropHeader type='Function(Array<Any>|Any values)'>onChange</PropHeader>
        <p>
          Change event handler that is called when the value is changed. <code>values</code> will be an array 
          when <code>multiple</code> prop is set.
        </p>
        <EditableExample codeText={require('../examples/onChange')(widgetName, true)}/>

        <PropHeader type='Array<Any>'>data</PropHeader>
        <p>
          provide an array of possible values for the {widgetName}. If an array of <code>objects</code> is provided you
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
        <EditableExample codeText={require('../examples/valueField')(widgetName, true)}/>

        <PropHeader type='String | Function(dataItem)'>textField</PropHeader>
        <p>
          {`Specify which data item field to display in the ${widgetName} and selected item. The `}<code>textField</code>{`prop 
          may also also used as to find an item in the list as you type. Providing an accessor function allows for computed text values`}
        </p>
        <EditableExample codeText={require('../examples/textField')(widgetName, true)}/>

        <PropHeader type='Component'>itemComponent</PropHeader>
        <p>
          This component is used to render each item in the {widgetName}. The default component
          renders the text of the selected item (specified by <code>textfield</code>)
        </p>
        <EditableExample codeText={require('../examples/itemComponent')(widgetName, true)}/>

        <PropHeader type='Boolean'>multiple</PropHeader>
        <p>
          Whether or not the {widgetName} allows multiple selection or not. when <code>false</code> the {widgetName} will 
          render as a list of radio buttons, and checkboxes when <code>true</code>.
        </p>

        <PropHeader type='Function(HTMLElement list, HTMLElement focusedNode, Any focusedItem)'>onMove</PropHeader>
        <p>
          A handler called when focus shifts on the {widgetName}. Internally this is used to ensure the focused item is in view.
          If you want to define your own "scrollTo" behavior or just disable the default one specify an <code>onMove</code> handler. 
          The handler is called with the relevant DOM nodes needed to implement scroll behavior: the list element, 
          the element that is currently focused, and a focused value.
        </p>

        <PropHeader type='Boolean' default="false">busy</PropHeader>
        <p>
          mark whether the widget is in a busy or loading state. If <code>true</code> the widget will display a spinner gif, useful
          when loading data via an ajax call.
        </p>

        <PropHeader type='[Boolean, Array]'>disabled</PropHeader>
        <p>
          Disable the widget, if an <code>Array</code> of values is passed in only those values will be disabled.
        </p>
        <EditableExample codeText={require('../examples/disabled')(widgetName, 'disabled')}/>

        <PropHeader type='[Boolean, Array]'>readOnly</PropHeader>
        <p>
          Place the {widgetName} in a readonly mode, If an <code>Array</code> of values is passed in only those values will be readonly.
        </p>
        <EditableExample codeText={require('../examples/disabled')(widgetName, 'readOnly')}/>
        
        <PropHeader type='Boolean' default="false">isRtl</PropHeader>
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
          <li><kbd>ctrl + a</kbd> toggle select all/select none</li>
          <li><kbd>any key</kbd> search list for item starting with key</li>
        </ul>
      </section>
    );
  }

});

module.exports = SelectList;