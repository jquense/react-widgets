react-widgets
=============

A set of the basic ui widgets built from scratch with React, based on the excellent Kendo UI Core and jQuery UI. 

- DropdownList
- ComboBox
- Select (multi select)
- DateTimePicker
- Calendar 
- NumberPicker 

__Demos and Documentation [here](http://theporchrat.github.io/react-widgets/docs/)__


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

