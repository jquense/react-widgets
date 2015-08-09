'use strict';
/*global it, describe, expect, sinon*/
var React = require('react/addons');
var Month = require('../src/Month.jsx');

var TestUtils = React.addons.TestUtils
  , render = TestUtils.renderIntoDocument;

describe('Month Component', function(){

  it('should use the right format', () => {
    var date   = new Date(2015, 1, 16, 0, 0, 0)
      , formatter = sinon.spy(() => 'hi')
      , picker = render(<Month value={date} focused={date} onChange={()=>{}} dateFormat='dd' dayFormat='d'/>)
      , first  = () => $(picker.getDOMNode()).find('td:first');

    expect(first().text()).to.equal('01')

    picker = render(<Month value={date} focused={date} onChange={()=>{}} dateFormat='-d' dayFormat='d'/>)

    expect(first().text()).to.equal('-1')

    picker = render(<Month value={date} focused={date} onChange={()=>{}} dateFormat={formatter} culture='en' dayFormat='d'/>)

    expect(formatter.called).to.be.ok();

    expect(formatter.args[0].length).to.equal(3);
    expect(formatter.args[0][0]).to.be.a(Date);
    expect(formatter.args[0][1]).to.be.a('string').and.to.equal('en');

    expect(first().text()).to.equal('hi')
  })
})
