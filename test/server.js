'use strict';
/*global it, describe */

require('babel-core/register')()

var assert = require('assert')
var React = require('react');

var components = [
      'Calendar', 
      'Combobox', 
      'DateTimePicker', 
      'DropdownList', 
      'Multiselect', 
      'SelectList', 
      'List',
      'ListGroupable',
      'ReplaceTransitionGroup', 
      'NumberPicker',
    ];

describe('server rendering', function() {
  this.timeout(5000)

  components.forEach(function(file){

    it('should render: ' + file, function(){
      var Type = require('../src/' + file + '.jsx')

      assert.doesNotThrow(function(){
        var comp = React.renderToString( React.createElement(Type) );

        assert.ok(typeof comp === 'string')
      })

    }.bind(null, file))

  })

  it('should render: Popup', function(){
    var Type = require('../src/Popup.jsx')

    assert.doesNotThrow(function(){
      var comp = React.renderToString( 
        React.createElement(Type, { onRequestClose: function(){} },  
          React.createElement('div')
        ) 
      )  
      
      assert.ok(typeof comp === 'string')
    })
  })
})