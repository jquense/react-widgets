var React = require('react')
  , EditableExample = require('../EditableExample')
  , DDButton = require('../../bootstrap').DropdownButton
  , MenuItem = require('../ApiMenuItem')
  , PropHeader = require('../PropHeader')
  , WidgetDemo = require('../demos/NumberPicker');

var widgetName = 'NumberPicker';

module.exports = React.createClass({
    mixins: [ require('../PageMixin')('numberpicker/') ],
    render: function(){
      return (
        <section {...this.props}>
          <h1 className="page-header">
            NumberPicker
            <span className='pull-right'>
              <DDButton title='props' bsStyle='link' pullRight={true}>
                <MenuItem>value</MenuItem>
<MenuItem>onChange</MenuItem>
<MenuItem>format</MenuItem>
<MenuItem>parse</MenuItem>
<MenuItem>min</MenuItem>
<MenuItem>max</MenuItem>
<MenuItem>step</MenuItem>
<MenuItem>isRtl</MenuItem>
<MenuItem>messages</MenuItem>
<MenuItem>messages.increment</MenuItem>
<MenuItem>messages.decrement</MenuItem>
              </DDButton>
            </span>
          </h1>
          <p>Spinner for selecting numbers. Supports multiple formats for display and editing through <a href="https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468">Globalize.js</a>.</p>

          <pre className='component-export'>
            <code>
              <div>Widget Suite:</div>
              NumberPicker = require(<span className='str'>'react-widgets'</span>).NumberPicker<br/>
              <div>Individual Component:</div>
              NumberPicker = require(<span className='str'>'react-widgets/lib/NumberPicker'</span>)
            </code>
          </pre>
          <WidgetDemo/>
          <h2>Props</h2>
          <PropHeader {...{ type: 'Number?', handler: "onChange", controllable: true }}>value</PropHeader><p>The current value of the {widgetName}.</p>
<EditableExample codeText={require('../examples/valuePicker')(widgetName, [1, null])}/>

<PropHeader {...{ type: 'Function(Number? value)' }}>onChange</PropHeader><p>Change event Handler that is called when the value is changed. The handler is called with the
current numeric value or null.</p>
<EditableExample codeText={require('../examples/onChangePicker')(widgetName, [1, null])}/>

<PropHeader {...{ type: 'Function(String str) | String', default: 'd' }}>format</PropHeader><p>A format string used to display the number value. For more information on prefined and custom number and currency formats visit the <a href="https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468#number-formatting&#39;">Globalize.js documentation</a> You provide a <code>{`Function`}</code> as a format if you wish to not use Globalize, or just want to provide some custom behavior.</p>
<PropHeader {...{ type: 'Function(String str, String culture) | Array<String>' }}>parse</PropHeader><p>Determines how the {widgetName} parses a number from the localized string representation. You can also provide a parser <code>{`Function`}</code> to pair with a custom <code>{`format`}</code>.</p>
<PropHeader {...{ type: 'Number', default: '-Infinity' }}>min</PropHeader><p>  The minimum number that the {widgetName} value.</p>
<EditableExample codeText={require('../examples/prop')(widgetName, 'min', 0)}/>

<PropHeader {...{ type: 'Number', default: 'Infinity' }}>max</PropHeader><p>The maximum number that the {widgetName} value.</p>
<EditableExample codeText={require('../examples/prop')(widgetName, 'max', 5)}/>

<PropHeader {...{ type: 'Number', default: '1' }}>step</PropHeader><p>Amount to increase or decrease value when using the spinner buttons.</p>
<EditableExample codeText={require('../examples/prop')(widgetName, 'step', 5)}/>

<PropHeader {...{ type: 'Boolean', default: 'false' }}>isRtl</PropHeader><p>mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through
a <code>{`childContext`}</code> prop (<code>{`isRtl`}</code>) this allows higher level application components to specify the direction.</p>
<PropHeader {...{ type: 'Object' }}>messages</PropHeader><p>Object hash containing display text and/or text for screen readers. Use the <code>{`messages`}</code> object to
localize widget text and increase accessibility.</p>
<PropHeader {...{ type: 'String', default: '"increment value"' }}>messages.increment</PropHeader><p>Number picker spinner up button text for screen readers</p>
<PropHeader {...{ type: 'String', default: '"decrement value"' }}>messages.decrement</PropHeader><p>Number picker spinner down button text for screen readers </p>
<h2 id="keyboard-navigation">Keyboard Navigation</h2>
<ul>
<li><kbd>down arrow</kbd> decrement value</li>
<li><p><kbd>up arrow</kbd> increment value</p>
</li>
<li><p><kbd>home</kbd> set value to minimum value if finite</p>
</li>
<li><kbd>end</kbd> set value to maximum value if finite</li>
</ul>

        </section>
      )
   }
})