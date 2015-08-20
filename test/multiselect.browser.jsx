'use strict';
/*global it, describe, expect, sinon, $ */
require('../vendor/phantomjs-shim')

var React = require('react/addons');
var Select = require('../src/Multiselect.jsx')
  , TagList = require('../src/MultiselectTagList.jsx');

var TestUtils = React.addons.TestUtils
  , render = TestUtils.renderIntoDocument
  , findTag = TestUtils.findRenderedDOMComponentWithTag
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , findType = TestUtils.findRenderedComponentWithType
  , trigger = TestUtils.Simulate;


$.fn.myText = function(){
  return this.contents().filter(function(){ return this.nodeType === 3; })[0].nodeValue
}


describe('Multiselect', function(){
  var dataList = [
        { label: 'jimmy', id: 0 },
        { label: 'sally', id: 1 },
        { label: 'pat', id: 2 }
      ];

  it('should set initial values', function(){
    var select = render(<Select value={['hello']} onChange={()=>{}} />)
      , tags   = findType(select, TagList).getDOMNode();

    expect($(tags).find('li:first-child > span').myText()).to.be('hello');
  })

  it('should respect textField and valueFields', function(){
    var select = render(<Select defaultValue={[0]} data={dataList} textField='label' valueField='id' />)
      , tags   = findType(select, TagList).getDOMNode();

    expect( $(tags).find('li:first-child > span').myText() ).to.be('jimmy');
  })

  it('should start closed', function(done){
    var select = render(<Select defaultValue={[0]} data={dataList} textField='label' valueField='id' />);
    var popup = findType(select, require('../src/Popup.jsx'));

    expect(select.state.open).to.not.be(true)
    expect(select.getDOMNode().className).to.not.match(/\brw-open\b/)
    expect(findClass(select, 'rw-input').getDOMNode().getAttribute('aria-expanded')).to.be('false')

    setTimeout(function(){
      expect($(popup.getDOMNode()).css('display')).to.be('none')
      done()
    }, 0)
  })

  it('should open when focused', function(done){
    var select = render(<Select defaultValue={['jimmy']} data={dataList} duration={0}/>);
    var popup = findType(select, require('../src/Popup.jsx'))

    trigger.focus(select.getDOMNode())

    setTimeout(function() {
      expect(select.state.open).to.be(true)
      expect(select.getDOMNode().className).to.match(/\brw-open\b/)
      expect(findClass(select, 'rw-input').getDOMNode().getAttribute('aria-expanded')).to.be('true')
      expect(popup.props.open).to.be(true)
      done()
    })
  })

  it('should set id on list', function(){
    var instance = render(<Select />)
      , list = React.findDOMNode(findTag(instance, 'ul'));

    expect(list.hasAttribute('id')).to.be(true);
  })

  it('should remove tag when clicked', function(){
    var del = sinon.spy()
      , tags = render(
          <TagList value={[dataList[0], dataList[1]]} data={dataList} textField='label' valueField='id' onDelete={del}/>)
          .getDOMNode();

    expect($(tags).children().length).to.be(2)
    trigger.click(tags.children[1].children[1]) // click button

    expect(del.calledOnce).to.be(true)
    expect(del.calledWith(dataList[1])).to.be(true)
  })

  it('should change value when tag is clicked', function(){
    var change = sinon.spy()
      , select = render(<Select onChange={change} value={[dataList[0], dataList[1]]} data={dataList} textField='label' valueField='id' />)
      , tags   = findType(select, TagList).getDOMNode()

    expect($(tags).children().length).to.be(2)
    trigger.click(tags.children[1].children[1]) // click button

    expect(change.calledOnce).to.be(true)
    expect(change.args[0][0]).to.eql([ dataList[0] ])
  })

  it('should trigger focus/blur events', function(done){
    var blur = sinon.spy()
      , focus = sinon.spy()
      , select = render(<Select onBlur={blur} onFocus={focus}/>);

    expect(focus.calledOnce).to.be(false)
    expect(blur.calledOnce).to.be(false)

    trigger.focus(select.getDOMNode())

    setTimeout(() => {
      expect(focus.calledOnce).to.be(true)
      trigger.blur(select.getDOMNode())

      setTimeout(() => {
        expect(blur.calledOnce).to.be(true)
        done()
      })
    })
  })

  it('should trigger key events', function(){
    var kp = sinon.spy(), kd = sinon.spy(), ku = sinon.spy()
      , select = render(<Select onKeyPress={kp} onKeyUp={ku} onKeyDown={kd}/>)
      , input  = findType(select, require('../src/MultiselectInput.jsx')).getDOMNode();

    trigger.keyPress(input)
    trigger.keyDown(input)
    trigger.keyUp(input)

    expect(kp.calledOnce).to.be(true)
    expect(kd.calledOnce).to.be(true)
    expect(ku.calledOnce).to.be(true)
  })


  it('should do nothing when disabled', function(done){
    var select = render(<Select defaultValue={['jimmy']} data={dataList} duration={0} disabled={true}/>)
      , input  = findType(select, require('../src/MultiselectInput.jsx')).getDOMNode()
      , tags   = findType(select, TagList).getDOMNode();

    expect( input.hasAttribute('disabled')).to.be(true);
    expect( input.getAttribute('aria-disabled')).to.be('true');
    //expect( input.getAttribute('disabled')).to.be('');

    trigger.click(findClass(select, 'rw-tag-btn').getDOMNode())

    setTimeout(function() {
      expect(select.state.open).to.not.be(true)
      expect(tags.children.length).to.be(1)
      expect(select.getDOMNode().className).to.not.match(/\brw-state-focus\b/)
      done()
    }, 0)
  })

  it('should disable only certain tags', function(done){
    var select = render(<Select defaultValue={[0, 1]} data={dataList} disabled={[1]}  textField='label' valueField='id'/>)
      , tags   = findType(select, TagList).getDOMNode();

    expect(tags.children.length).to.be(2)
    expect(tags.children[1].className).to.match(/\brw-state-disabled\b/);

    trigger.click(tags.children[1].children[1]) // click button

    setTimeout(function() {
      expect(tags.children.length).to.be(2)
      done()
    }, 0)
  })

  it('should do nothing when readonly', function(done){
    var select = render(<Select defaultValue={['jimmy']} data={dataList} duration={0} readOnly={true}/>)
      , input  = findType(select, require('../src/MultiselectInput.jsx')).getDOMNode()
      , tags   = findType(select, TagList).getDOMNode();

    expect( input.hasAttribute('readonly')).to.be(true);
    expect( input.getAttribute('aria-readonly')).to.be('true');

    trigger.click(findClass(select, 'rw-tag-btn').getDOMNode())

    setTimeout(function() {
      expect(select.state.open).to.not.be(true)
      expect(tags.children.length).to.be(1)
      done()
    }, 0)
  })

  it('should readonly only certain tags', function(done){
    var select = render(<Select defaultValue={[0, 1]} data={dataList} readOnly={[1]}  textField='label' valueField='id'/>)
      , tags   = findType(select, TagList).getDOMNode();

    expect(tags.children.length).to.be(2)
    expect(tags.children[1].className).to.match(/\brw-state-readonly\b/);

    trigger.click(tags.children[1].children[1]) // click button

    setTimeout(function() {
      expect(tags.children.length).to.be(2)
      done()
    })
  })

  it('should call Select handler', function(done){
    var change = sinon.spy(), select = sinon.spy()
      , ms = render(<Select value={[dataList[1]]} data={dataList} onChange={change} onSelect={select}/>)
      , list = findClass(ms, 'rw-list');

    ms.getDOMNode().focus()

    setTimeout(function(){

      trigger.click(list.getDOMNode().children[0])

      expect(select.calledOnce).to.be(true)
      expect(change.calledAfter(select)).to.be(true)

      select.reset()
      change.reset()

      trigger.keyDown(ms.getDOMNode(), { key: 'ArrowDown'}) //move to different value so change fires
      trigger.keyDown(ms.getDOMNode(), { key: 'Enter'})

      expect(select.calledOnce).to.be(true)
      expect(change.calledAfter(select)).to.be(true)
      done()
    })
  })

  it('should clear SearchTerm when uncontrolled', function(){
    var ms = render(<Select data={dataList} defaultSearchTerm='ji' open textField='label' valueField='id' onToggle={()=>{}}/>);

    var input = findType(ms, Select.BaseMultiselect)

    expect(input.props.searchTerm).to.be('ji')

    trigger.keyDown(ms.getDOMNode(), { key: 'Enter'})

    expect(input.props.searchTerm).to.be('')

  })


  it('should not clear SearchTerm when controlled', function(){
    var ms = render(<Select searchTerm="jim" data={dataList} onSearch={()=>{}}/>);

    var input = findTag(ms, 'input').getDOMNode()
    trigger.keyDown(ms.getDOMNode(), { key: 'Enter'})

    expect(input.value).to.be('jim')
  })


  it('should show create tag correctly', function(){
    var ms = render(<Select searchTerm="custom tag" onCreate={()=>{}} data={dataList} onSearch={()=>{}}/>);

    expect(function err() {
      findClass(ms, 'rw-multiselect-create-tag') }).to.not.throwException()

    ms.setProps({ searchTerm: '' })

    expect(function err() {
      findClass(ms, 'rw-multiselect-create-tag') }).to.throwException()

    ms.setProps({ onCreate: null })

    expect(function err() {
      findClass(ms, 'rw-multiselect-create-tag') }).to.throwException()

    ms.setProps({ onCreate: null, searchTerm: 'asfasfas' })

    expect(function err() {
      findClass(ms, 'rw-multiselect-create-tag') }).to.throwException()
  })

  it('should call onCreate', function(){
    var create = sinon.spy()
      , ms = render(<Select
          open={true}
          searchTerm="custom tag"
          data={dataList}
          onCreate={create}
          onSearch={()=>{}} onToggle={()=>{}}/>)

      , createLi = findClass(ms, 'rw-multiselect-create-tag').getDOMNode().children[0];

    trigger.click(createLi)

    expect(create.calledOnce).to.ok()
    expect(create.calledWith('custom tag')).to.ok()

    // only option is create
    create.reset()
    trigger.keyDown(ms.getDOMNode(), { key: 'Enter'})

    expect(create.calledOnce).to.ok()
    expect(create.calledWith('custom tag')).to.ok()

    // other values have focus
    ms = render(<Select open={true} searchTerm="custom tag" data={['custom tag time']}  onCreate={create} onSearch={()=>{}} onToggle={()=>{}}/>)
    create.reset()
    trigger.keyDown(ms.getDOMNode(), { key: 'Enter'})

    expect(create.called).to.be(false)

    trigger.keyDown(ms.getDOMNode(), { key: 'Enter', ctrlKey: true })

    expect(create.calledOnce).to.ok()
    expect(create.calledWith('custom tag')).to.ok()
  })

  it('should change values on key down', function(){
    var change = sinon.spy()
      , select = render(<Select value={[0, 1, 2]} data={dataList} textField='label' valueField='id' onChange={change}/>)
      , tags   = findType(select, TagList).getDOMNode()
      , list   = findClass(select, 'rw-list').getDOMNode();

    trigger.keyDown(select.getDOMNode(), { key: 'ArrowLeft'})

    expect(tags.children[2].className).to.match(/\brw-state-focus\b/)
    expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/)

    trigger.keyDown(select.getDOMNode(), { key: 'ArrowLeft'})

    expect(tags.children[1].className).to.match(/\brw-state-focus\b/)
    expect(tags.children[2].className).to.not.match(/\brw-state-focus\b/)

    trigger.keyDown(select.getDOMNode(), { key: 'ArrowRight'})

    expect(tags.children[2].className).to.match(/\brw-state-focus\b/)
    expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/)

    trigger.keyDown(select.getDOMNode(), { key: 'Home'})

    expect(tags.children[0].className).to.match(/\brw-state-focus\b/)
    expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/)

    trigger.keyDown(select.getDOMNode(), { key: 'Delete'})

    expect(change.calledOnce).to.be(true)
    expect(change.args[0][0]).to.eql(dataList.slice(1, 3))
    change.reset()

    trigger.keyDown(select.getDOMNode(), { key: 'End'})

    expect(tags.children[2].className).to.match(/\brw-state-focus\b/)
    expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/)

    trigger.keyDown(select.getDOMNode(), { key: 'Backspace'})

    expect(change.calledOnce).to.be(true)
    expect(change.args[0][0]).to.eql(dataList.slice(0, 2))
    change.reset()

    trigger.keyDown(select.getDOMNode(), { key: 'ArrowDown'})
    expect(select.state.open).to.be(true)

    select.setProps({ open: true, value:[], onToggle: ()=>{} })

    trigger.keyDown(select.getDOMNode(), { key: 'ArrowDown'})
    expect(list.children[1].className).to.match(/\brw-state-focus\b/)

    trigger.keyDown(select.getDOMNode(), { key: 'End'})
    expect(list.children[2].className).to.match(/\brw-state-focus\b/)

    trigger.keyDown(select.getDOMNode(), { key: 'Home'})
    expect(list.children[0].className).to.match(/\brw-state-focus\b/)
  })

})
