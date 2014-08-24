react-widgets
=============

set of the basic ui widgets for React based on the excellent Kendo UI Core and jQuery UI.

- DropdownList
- ComboBox
- Select (multi select)
- DateTimePicker
- Calendar 
- NumberPicker 

### Install

`npm install react-widgets`

## Caveats
In order to not couple the library to any DOM library you will need to shim/externalize the `$` yourself when using widgets as 
CommonJS modules. Take a look at the included webpack configs for examples on how to, swap out jQuery with Zepto

### Docs

you can find docs [here](http://theporchrat.github.io/react-widgets/docs/)
Docs are a simple React app, you can build with gulp `gulp docs`