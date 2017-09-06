const { stripIndent } = require('common-tags')

module.exports = {
  tabIndex: () => stripIndent`
    The HTML \`tabindex\` attribute, controls the order in which focus moves
    via the TAB key
  `,

  autoFocus: d => stripIndent`
    Pass focus to the ${d.name} when it mounts.
  `,
  culture: d => stripIndent`
    Set the culture of the ${d.name}, passed to the configured localizer.
  `,

  placeholder: () => stripIndent`
    Text to display in the input when the value is empty.
  `,

  value: d => stripIndent`
    Controls the current value of the ${d.name}.
  `,

  name: () => stripIndent`
    The HTML \`name\` attribute, passed directly to the input element.
  `,

  onFocus: d => stripIndent`
    The native \`onFocus\` event, called when focus enters the ${d.name}.
  `,

  onBlur: d => stripIndent`
    The native \`onBlur\` event, called when focus leaves the ${d.name} entirely.
  `,

  onKeyDown: () => stripIndent`
    The native \`onKeyDown\` event, called \`preventDefault\` will prevent any custom behavior, included keyboard shortcuts.
  `,

  onKeyPress: () => stripIndent`
    The native \`onKeyPress\` event, called \`preventDefault\` will stop any custom behavior.
  `,

  valuePicker: d => stripIndent`
    Controls the selected value of the ${d.name}. Values can primitive, like strings
    or more complex objects. Values are usually (but not required to be) members of
    \`data\`items, either referentially or identifiable by a \`valueField\`.
    Use \`defaultValue\` to set an initial value for uncontrolled widgets.
  `,

  listProps: () => stripIndent`
    An object of props that is passed directly to the underlying \`List\` component.
  `,

  inputProps: () => stripIndent`
    An object of props that is passed directly to the underlying input component.
  `,

  onChange: () => stripIndent`
    A callback fired when the current \`value\` changes.
  `,

  onSelect: () => stripIndent`
    This handler fires when an item has been selected from the list. It fires before the \`onChange\` handler and fires
    regardless of whether the value has actually changed.
  `,

  allowCreate: () => stripIndent`
    Enables the list option creation UI. \`onFilter\` will only the UI when
    actively filtering for a list item.
  `,

  onCreate: () => stripIndent`
    This handler fires when the user chooses to create a new list option.
    It is up to the widget parent to implement creation logic,
    a common implementation is shown below, where the new tag is selected
    and added to the data list.
  `,

  onSearch: () => stripIndent`
    A callback fired when the current \`searchTerm\` changes.
  `,

  data: d => stripIndent`
    An array of possible values for the ${d.name}.

    **Tip:** When \`data\` is an array of \`objects\` consider specifying
    \`textField\` and \`valueField\` as well.
  `,

  valueField: () => stripIndent`
    A property name that provides the value of the \`data\` items.
    This value is used to uniquely distinigush items from others in the \`data\` list.

    Generally, \`valueField\` points to an Id field, or other unique identifier.
    When not provided, the referential identity of each data item is used.
  `,

  textField: d => stripIndent`
    A property name, or accessor function, that provides the text content of the \`data\`
    items. The ${d.name} will filter data based on this value as well as use it as the
    default display value for list items and selected values.
  `,

  disabledPicker: d => stripIndent`
    Controls the disabled state of entire ${d.name}, or individual items.
  `,

  readOnly: d => stripIndent`
    Controls the read-only state of the ${d.name}.
  `,

  itemComponent: d => stripIndent`
    Customize the rendering of each ${d.name} list item.
  `,

  groupBy: () => stripIndent`
    To display grouped lists, specify a property name, or accesor function,
    whose value is used to group the \`data\` list.

    The \`groupBy\` value is also used as the text for group headings when \`groupComponent\`
    is not provided.
  `,

  groupComponent: () => stripIndent`
    Customize the rendering of the group headings when \`groupBy\` is active.
  `,

  filter: d => stripIndent`
    Enable and customize filtering behavior for the ${d.name}. Specify
    one of the built-in methods (\`"startsWith"\` \`"endsWith"\` \`"contains"\`)
    or provide a function that returns \`true\` or \`false\` for each passed in item
    (analogous to the [array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array/filter) builtin)

    You can explicitly disable filtering by setting \`filter\` to \`false\`.
  `,

  caseSensitive: d => stripIndent`
    Determines whether text case is ignored when filtering. Only applicable
    when \`filter\` is one of the built-in methods.
  `,

  minLength: d => stripIndent`
    The minimum number of search characters needed before filtering begins.
  `,

  searchTerm: d => stripIndent`
    Controls the value of the search text used to filter ${d.widgetName} items.
    \`searchTerm\` is only applicable when filtering is enabled.

    Use \`defaultSearchTerm\` instead to set an initial value for uncontrolled widgets.
  `,

  dropUp: d => stripIndent`
    Controls the opening direction of the ${d.name} popup.
  `,

  open: d => stripIndent`
    Controls the visibility of the ${d.name} popup. Use \`defaultOpen\`
    to set an initial value for uncontrolled widgets.
  `,

  onToggle: d => stripIndent`
    A callback fired with the ${d.name}'s popup visibility is about to change.

    Use in conjunction with the \`open\` prop to manually control the popup visibility.
  `,

  busy: () => stripIndent`
    Controls the loading/busy spinner visibility. Presentational only! Useful
    for providing visual feedback while data is being loaded.
  `,

  popupTransition: () => stripIndent`
    A \`Transition\` component from react-transition-group v2. The
    provided component will be used instead of the default \`SlideDownTransition\` for
    fully customizable animations. The transition component is also injected with a
    \`dropUp\` prop indicating the direction it should open.
  `,

  isRtl: d => stripIndent`
    Controls the read direction of the ${d.name}.

    **Tip:** You can also set the direction for all widgets at once, by exposing
    \`isRtl\` on [context](https://facebook.github.io/react/docs/context.html) in a
    common parent component, such as your application root.
  `,

  messages: () => stripIndent`
    Object hash containing display text and/or text for screen readers.
    Use the \`messages\` object to localize widget text or provide custom rendering.
  `,
}
