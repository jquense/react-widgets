var stripIndent = require('common-tags').stripIndent

module.exports = {
  value: stripIndent`
    Controls the current value of the {widgetName}.
  `,
  
  valuePicker: stripIndent`
    Controls the selected value of the {widgetName}. Values can primitive, like strings
    or more complex objects. Values are usually (but not required to be) members of
    \`data\`items, either referentially or identifiable by a \`valueField\`.
    Use \`defaultValue\` to set an initial value for uncontrolled widgets.
  `,

  onChange: stripIndent`
    A callback fired when the current \`value\` changes.
  `,

  onSearch: stripIndent`
    A callback fired when the current \`searchTerm\` changes.
  `,

  data: stripIndent`
    An array of possible values for the \${widgetName}.

    **Tip:** When \`data\` is an array of \`objects\` consider specifying
    \`textField\` and \`valueField\` as well.
  `,

  valueField: stripIndent`
    A property name that provides the value of the \`data\` items.
    This value is used to uniquely distinigush items from others in the \`data\` list.

    Generally, \`valueField\` points to an Id field, or other unique identifier.
    When not provided, the referential identity of each data item is used.
  `,

  textField: stripIndent`
    A property name, or accessor function, that provides the text content of the \`data\`
    items. The \${widgetName} will filter data based on this value as well as use it as the
    default display value for list items and selected values.
  `,

  disabledPicker: stripIndent`
    Controls the disabled state of entire \${widgetName}, or individual items.
  `,

  readOnly: stripIndent`
    Controls the read-only state of the \${widgetName}.
  `,

  itemComponent:
    'Customize the rendering of each ${widgetName} list item.',

  groupBy: stripIndent`
    To display grouped lists, specify a property name, or accesor function,
    whose value is used to group the \`data\` list.

    The \`groupBy\` value is also used as the text for group headings when \`groupComponent\`
    is not provided.
  `,

  groupComponent: stripIndent`
    Customize the rendering of the group headings when \`groupBy\` is active.
  `,

  filter: stripIndent`
    Enable and customize filtering behavior for the \${widgetName}. Specify
    one of the built-in methods (\`"startsWith"\` \`"endsWith"\` \`"contains"\`)
    or provide a function that returns \`true\` or \`false\` for each passed in item
    (analogous to the [array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array/filter) builtin)

    You can explicitly disable filtering by setting \`filter\` to \`false\`.
  `,

  caseSensitive: stripIndent`
    Determines wether text case is ignored when filtering. Only applicable
    when \`filter\` is one of the built-in methods.
  `,

  minLength: stripIndent`
    The minimum number of search characters needed before filtering begins.
  `,

  open: stripIndent`
    Controls the visibility of the \${widgetName} popup. Use \`defaultOpen\`
    to set an initial value for uncontrolled widgets.
  `,

  onToggle: stripIndent`
    A callback fired with the \${widgetName}'s popup visibility is about to change.

    Use in conjunction with the \`open\` prop to manually control the popup visibility.
  `,

  busy: stripIndent`
    Controls the loading/busy spinner visibility. Presentational only! Useful
    for providing visual feedback while data is being loaded.
  `,

  duration:
    'The speed, in milliseconds, of the popup animation. Set to `0` to disable animation.',

  isRtl: stripIndent`
    Controls the read direction of the \${widgetName}.

    **Tip:** You can also set the direction for all widgets at once, by exposing
    \`isRtl\` on [context](https://facebook.github.io/react/docs/context.html) in a
    common parent component, such as your application root.
  `,

  messages: stripIndent`
    Object hash containing display text and/or text for screen readers.
    Use the \`messages\` object to localize widget text or provide custom rendering.
  `
}
