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
        'Calendar',
        'TimeInput',
        'DatePicker',
        'NumberPicker',
        'Listbox',

        {
          type: 'category',
          label: 'Dropdowns',
          collapsed: false,
          items: ['Dropdowns', 'Combobox', 'DropdownList', 'Multiselect'],
        },
      ],
    },
  ],
}
