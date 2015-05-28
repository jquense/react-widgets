
Spinner for selecting numbers. Supports multiple formats for display and editing through [Globalize.js](https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468).

<--------------->

### value?{ type: 'Number?', handler: "onChange", controllable: true }

The current value of the {widgetName}.

<EditableExample codeText={require('../examples/valuePicker')(widgetName, [1, null])}/>

### onChange?{ type: 'Function(Number? value)' }

Change event Handler that is called when the value is changed. The handler is called with the
current numeric value or null.

<EditableExample codeText={require('../examples/onChangePicker')(widgetName, [1, null])}/>

### format?{ type: 'Function(String str) | String', default: 'd' }

A format string used to display the number value. For more information on prefined and custom number and currency formats visit the [Globalize.js documentation](https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468#number-formatting') You provide a `Function` as a format if you wish to not use Globalize, or just want to provide some custom behavior.

### parse?{ type: 'Function(String str, String culture) | Array<String>' }

Determines how the {widgetName} parses a number from the localized string representation. You can also provide a parser `Function` to pair with a custom `format`.

### min?{ type: 'Number', default: '-Infinity' }

  The minimum number that the {widgetName} value.

<EditableExample codeText={require('../examples/prop')(widgetName, 'min', 0)}/>

### max?{ type: 'Number', default: 'Infinity' }

The maximum number that the {widgetName} value.

<EditableExample codeText={require('../examples/prop')(widgetName, 'max', 5)}/>

### step?{ type: 'Number', default: '1' }

Amount to increase or decrease value when using the spinner buttons.

<EditableExample codeText={require('../examples/prop')(widgetName, 'step', 5)}/>

### isRtl?{ type: 'Boolean', default: 'false' }

mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through
a `childContext` prop (`isRtl`) this allows higher level application components to specify the direction.

### messages?{ type: 'Object' }

Object hash containing display text and/or text for screen readers. Use the `messages` object to
localize widget text and increase accessibility.

### messages.increment?{ type: 'String', default: '"increment value"' }

Number picker spinner up button text for screen readers

### messages.decrement?{ type: 'String', default: '"decrement value"' }
Number picker spinner down button text for screen readers 

## Keyboard Navigation

- <kbd>down arrow</kbd> decrement value
- <kbd>up arrow</kbd> increment value

- <kbd>home</kbd> set value to minimum value if finite
- <kbd>end</kbd> set value to maximum value if finite
