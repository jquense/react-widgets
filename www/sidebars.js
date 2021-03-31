module.exports = {
  someSidebar: [
    'getting-started',
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: ['theming', 'localization', 'controllables', 'migration'],
    },
    {
      type: 'category',
      label: 'Inputs',
      collapsed: false,
      items: [
        'NumberPicker',
        {
          type: 'category',
          label: 'Dropdowns',
          collapsed: false,
          items: ['Dropdowns', 'Combobox', 'DropdownList', 'Multiselect'],
        },
        'Listbox',
        {
          type: 'category',
          label: 'Date and Time',
          collapsed: false,
          items: ['DatePicker', 'TimeInput', 'Calendar'],
        },
      ],
    },
  ],
}
