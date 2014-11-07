react-widgets
=============
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]

A set of the basic ui widgets built from scratch with React, based on the excellent Kendo UI Core and jQuery UI. 

- DropdownList
- ComboBox
- Select (multi select)
- DateTimePicker
- Calendar 
- NumberPicker 

__Demos and Documentation [here](http://jquense.github.io/react-widgets/docs/)__

### Migration

__Required Shims__

Es5 shims.

- Array.prototype.filter
- Array.prototype.some
- Array.prototype.reduce

find/replace
__Exported Widget Names__

- `require('react-widgets').DropDownlist` -> `require('react-widgets').Dropdownlist`
- `require('react-widgets').Select`       -> `require('react-widgets').Multiselect`

__Require Paths__
If you require widgets individually from the `lib` directory then most widgets have moved and changed names slightly

- `react-widgets/lib/select/select`           -> `react-widgets/lib/Multiselect`
- `react-widgets/lib/calendar/calendar`       -> `react-widgets/lib/Calendar`
- `react-widgets/lib/pickers/datepicker`      -> `react-widgets/lib/DateTimePicker`
- `react-widgets/lib/pickers/numberpicker`    -> `react-widgets/lib/NumberPicker`
- `react-widgets/lib/dropdowns/dropdown-list` -> `react-widgets/lib/DropdownList`
- `react-widgets/lib/dropdowns/combobox`      -> `react-widgets/lib/Combobox`

__CSS__

Some CSS class names have changed.

- `rw-dropdown-list`  -> `rw-dropdownlist`
- `rw-number-picker`  -> `rw-numberpicker`
- `rw-date-picker`    -> `rw-datetimepicker`
- `rw-select-list`    -> `rw-multiselect`
- `rw-select-wrapper` -> `rw-multiselect-wrapper`
- `rw-tag-list`       -> `rw-multiselect-taglist`


### Install

`npm install react-widgets`

### Building local docs

The docs are a simple React app hosted on gh-pages, you build and run locally with `gulp` and the command `gulp doc-server` which will webpack start up a server on localhost:8081.

### Contributing 

Patches welcome! Please try to match the style of the repo (comma first, 2 spaces, etc), squash large pull requests (a few commits is fine), and provide tests if relevant. It is also a good idea to open an issue and start a conversation before implementing new features or widgets.

### Old Browser Support

The goal is to support IE8+, but currently it is difficult for me to test a wide variety of browsers so there is no guarantee 
it will work (patches welcome!).

One aspect that is definately true is that animation is not supported for browsers that do not support CSS Transitions.


[npm-image]: https://img.shields.io/npm/v/react-widgets.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-widgets
[downloads-image]: http://img.shields.io/npm/dm/react-widgets.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-widgets
