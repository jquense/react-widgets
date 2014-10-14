'use strict';
var React = require('react')
  , inputControl  = require('../util/inputControl')
  , dropdownlist  = require('../dropdowns/dropdown-list.jsx');

// var DropDownList = React.createClass({

module.exports = inputControl.createControlledClass(
  'DropDownList', dropdownlist, {
    open:  'onToggle',
    value: 'onChange'
  },
  {
    open: false,
    value: '',
  });