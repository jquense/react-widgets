# react-widgets-tailwind

A TailwindCSS plugin for react-widgets as an alternative to Sass

## Usage

```
npm i react-widgets-tailwind --save-dev
```

In your `tailwind.config.js` file:

```js
const ppath = require('path')

module.exports = {
  content: [
    // point the JIT to the fully compiled css file to ensure all classes are included
    require.resolve('react-widgets/styles.css'),
  ],

  /* ... */
  plugins: [require('react-widgets-tailwind')],
}
```

The additional config of `content` is required for tailwind v3 in order to inform tailwind what classes are
actually in use.

### Controling which components you include

Relying on the Tailwind JIT to only include used styles doesn't work for react component libraries. This
is because the JIT only looks at source files, not which components you've actually used in your app.

To limit which component styles are included you can customize the plugin with the components you want:

```js
const ppath = require('path')

module.exports = {
  content: [
    // point the JIT to the fully compiled css file to ensure all classes are included
    require.resolve('react-widgets/styles.css'),
  ],

  /* ... */
  plugins: [
    require('react-widgets-tailwind')({
      components: [
        'Listbox',
        'DropdownList',
        'Combobox',
        'Multiselect',
        'DatePicker',
        'Calendar',
        'TimeInput',
        'NumberPicker',
      ],
    }),
  ],
}
```
