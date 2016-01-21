require('../vendor/phantomjs-shim')

import { findDOMNode } from 'react-dom';

var React = require('react');
var Select = require('../src/Multiselect.jsx')
  , TagList = require('../src/MultiselectTagList.jsx')
  , $t = require('teaspoon');

var TestUtils = require('react-addons-test-utils');
var render = TestUtils.renderIntoDocument
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
      , tags   = findDOMNode(findType(select, TagList));

    expect($(tags).find('li:first-child > span').myText()).to.be('hello');
  })

  it('should respect textField and valueFields', function(){
    var select = render(<Select defaultValue={[0]} data={dataList} textField='label' valueField='id' />)
      , tags   = findDOMNode(findType(select, TagList));

    expect( $(tags).find('li:first-child > span').myText() ).to.be('jimmy');
  })

  it('should start closed', function(done){
    var select = render(<Select defaultValue={[0]} data={dataList} textField='label' valueField='id' />);
    var popup = findType(select, require('../src/Popup.jsx'));

    expect(select._values.open).to.not.be(true)
    expect(findDOMNode(select).className).to.not.match(/\brw-open\b/)
    expect(findClass(select, 'rw-input').getAttribute('aria-expanded')).to.be('false')

    setTimeout(function(){
      expect($(findDOMNode(popup)).css('display')).to.be('none')
      done()
    }, 0)
  })

  it('should open when focused', function(done){
    var select = render(<Select defaultValue={['jimmy']} data={dataList} duration={0}/>);
    var popup = findType(select, require('../src/Popup.jsx'))

    trigger.focus(findDOMNode(select))

    setTimeout(function() {
      expect(select._values.open).to.be(true)
      expect(findDOMNode(select).className).to.match(/\brw-open\b/)
      expect(findClass(select, 'rw-input').getAttribute('aria-expanded')).to.be('true')
      expect(popup.props.open).to.be(true)
      done()
    })
  })

  it('should set id on list', function(){
    var instance = render(<Select />)
      , list = findTag(instance, 'ul');

    expect(list.hasAttribute('id')).to.be(true);
  })

  it('should remove tag when clicked', function(){
    var del = sinon.spy()
      , tags = findDOMNode(render(
          <TagList value={[dataList[0], dataList[1]]} data={dataList} textField='label' valueField='id' onDelete={del}/>));

    expect($(tags).children().length).to.be(2)
    trigger.click(tags.children[1].children[1]) // click button

    expect(del.calledOnce).to.be(true)
    expect(del.calledWith(dataList[1])).to.be(true)
  })

  it('should change value when tag is clicked', function(){
    var change = sinon.spy()
      , select = render(<Select onChange={change} value={[dataList[0], dataList[1]]} data={dataList} textField='label' valueField='id' />)
      , tags   = findDOMNode(findType(select, TagList))

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

    trigger.focus(findDOMNode(select))

    setTimeout(() => {
      expect(focus.calledOnce).to.be(true)
      trigger.blur(findDOMNode(select))

      setTimeout(() => {
        expect(blur.calledOnce).to.be(true)
        done()
      })
    })
  })

  it('should trigger key events', function(){
    var kp = sinon.spy(), kd = sinon.spy(), ku = sinon.spy()
      , select = render(<Select onKeyPress={kp} onKeyUp={ku} onKeyDown={kd}/>)
      , input  = findDOMNode(findType(select, require('../src/MultiselectInput.jsx')));

    trigger.keyPress(input)
    trigger.keyDown(input)
    trigger.keyUp(input)

    expect(kp.calledOnce).to.be(true)
    expect(kd.calledOnce).to.be(true)
    expect(ku.calledOnce).to.be(true)
  })


  it('should do nothing when disabled', function(done){
    var select = render(<Select defaultValue={['jimmy']} data={dataList} duration={0} disabled={true}/>)
      , input  = findDOMNode(findType(select, require('../src/MultiselectInput.jsx')))
      , tags   = findDOMNode(findType(select, TagList));

    expect( input.hasAttribute('disabled')).to.be(true);
    expect( input.getAttribute('aria-disabled')).to.be('true');
    //expect( input.getAttribute('disabled')).to.be('');

    trigger.click(findClass(select, 'rw-tag-btn'))

    setTimeout(function() {
      expect(select._values.open).to.not.be(true)
      expect(tags.children.length).to.be(1)
      expect(findDOMNode(select).className).to.not.match(/\brw-state-focus\b/)
      done()
    }, 0)
  })

  it('should disable only certain tags', function(done){
    var select = render(<Select defaultValue={[0, 1]} data={dataList} disabled={[1]}  textField='label' valueField='id'/>)
      , tags   = findDOMNode(findType(select, TagList));

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
      , input  = findDOMNode(findType(select, require('../src/MultiselectInput.jsx')))
      , tags   = findDOMNode(findType(select, TagList));

    expect( input.hasAttribute('readonly')).to.be(true);
    expect( input.getAttribute('aria-readonly')).to.be('true');

    trigger.click(findClass(select, 'rw-tag-btn'))

    setTimeout(function() {
      expect(select._values.open).to.not.be(true)
      expect(tags.children.length).to.be(1)
      done()
    }, 0)
  })

  it('should readonly only certain tags', function(done){
    var select = render(<Select defaultValue={[0, 1]} data={dataList} readOnly={[1]}  textField='label' valueField='id'/>)
      , tags   = findDOMNode(findType(select, TagList));

    expect(tags.children.length).to.be(2)
    expect(tags.children[1].className).to.match(/\brw-state-readonly\b/);

    trigger.click(tags.children[1].children[1]) // click button

    setTimeout(function() {
      expect(tags.children.length).to.be(2)
      done()
    })
  })

  it('should call Select handler', function(done){
    var change = sinon.spy(), onSelect = sinon.spy()
      , instance = render(<Select value={[dataList[1]]} data={dataList} onChange={change} onSelect={onSelect}/>)

    findDOMNode(instance).focus()

    let list = findClass(instance, 'rw-list');

    setTimeout(function(){

      trigger.click(list.children[0])

      expect(onSelect.calledOnce).to.be(true)
      expect(change.calledAfter(onSelect)).to.be(true)

      onSelect.reset()
      change.reset()

      trigger.keyDown(findDOMNode(instance), { key: 'ArrowDown'}) //move to different value so change fires
      trigger.keyDown(findDOMNode(instance), { key: 'Enter'})

      expect(onSelect.calledOnce).to.be(true)
      expect(change.calledAfter(onSelect)).to.be(true)
      done()
    })
  })

  it('should clear SearchTerm when uncontrolled', function(){
    var select = render(<Select data={dataList} defaultSearchTerm='ji' open textField='label' valueField='id' onToggle={()=>{}}/>);

    var input = findType(select, Select.ControlledComponent)

    expect(input.props.searchTerm).to.be('ji')

    trigger.keyDown(findDOMNode(select), { key: 'Enter'})

    expect(input.props.searchTerm).to.be('')

  })


  it('should not clear SearchTerm when controlled', function(){
    var select = render(<Select searchTerm="jim" data={dataList} onSearch={()=>{}}/>);

    var input = findTag(select, 'input')
    trigger.keyDown(findDOMNode(select), { key: 'Enter'})

    expect(input.value).to.be('jim')
  })

  it('should not trigger form submission', function(){
    let spy;
    let select = $t(
      <form action='/' onSubmit={() => { throw new Error('should not submit!') }}>
        <Select searchTerm="jim" data={dataList} onSearch={()=>{}} onKeyDown={spy = sinon.spy()}/>
      </form>
    ).render();

    select.find('input')
      .trigger('keyDown', { key: 'Enter' })

    expect(spy.calledOnce).to.equal(true);
  })

  it('should show create tag correctly', function(){
    var select = $t(
      <Select
        searchTerm="custom tag"
        onCreate={()=>{}}
        data={dataList}
        onSearch={()=>{}}
      />
    );

    select
      .render()
      .tap(s => s
        .single('.rw-multiselect-create-tag')
      )
      .props('searchTerm', undefined)
      .tap(s => s
        .none('.rw-multiselect-create-tag')
      )
      .props({searchTerm: 'custom', onCreate: undefined })
      .tap(s => s
        .none('.rw-multiselect-create-tag')
      )
  })

  it('should call onCreate', function(){
    var create = sinon.spy()
      , select = render(<Select
          open={true}
          searchTerm="custom tag"
          data={dataList}
          onCreate={create}
          onSearch={()=>{}} onToggle={()=>{}}/>)

      , createLi = findClass(select, 'rw-multiselect-create-tag').children[0];

    trigger.click(createLi)

    expect(create.calledOnce).to.ok()
    expect(create.calledWith('custom tag')).to.ok()

    // only option is create
    create.reset()
    trigger.keyDown(findDOMNode(select), { key: 'Enter'})

    expect(create.calledOnce).to.ok()
    expect(create.calledWith('custom tag')).to.ok()

    // other values have focus
    select = render(<Select open={true} searchTerm="custom tag" data={['custom tag time']}  onCreate={create} onSearch={()=>{}} onToggle={()=>{}}/>)
    create.reset()
    trigger.keyDown(findDOMNode(select), { key: 'Enter'})

    expect(create.called).to.be(false)

    trigger.keyDown(findDOMNode(select), { key: 'Enter', ctrlKey: true })

    expect(create.calledOnce).to.ok()
    expect(create.calledWith('custom tag')).to.ok()
  })

  it('should change values on key down', function(){
    var change = sinon.spy()
      , select = render(<Select value={[0, 1, 2]} data={dataList} textField='label' valueField='id' onChange={change}/>)
      , tags   = findDOMNode(findType(select, TagList))
      , list   = findClass(select, 'rw-list');

    trigger.keyDown(findDOMNode(select), { key: 'ArrowLeft'})

    expect(tags.children[2].className).to.match(/\brw-state-focus\b/)
    expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/)

    trigger.keyDown(findDOMNode(select), { key: 'ArrowLeft'})

    expect(tags.children[1].className).to.match(/\brw-state-focus\b/)
    expect(tags.children[2].className).to.not.match(/\brw-state-focus\b/)

    trigger.keyDown(findDOMNode(select), { key: 'ArrowRight'})

    expect(tags.children[2].className).to.match(/\brw-state-focus\b/)
    expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/)

    trigger.keyDown(findDOMNode(select), { key: 'Home'})

    expect(tags.children[0].className).to.match(/\brw-state-focus\b/)
    expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/)

    trigger.keyDown(findDOMNode(select), { key: 'Delete'})

    expect(change.calledOnce).to.be(true)
    expect(change.args[0][0]).to.eql(dataList.slice(1, 3))
    change.reset()

    trigger.keyDown(findDOMNode(select), { key: 'End'})

    expect(tags.children[2].className).to.match(/\brw-state-focus\b/)
    expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/)

    trigger.keyDown(findDOMNode(select), { key: 'Backspace'})

    expect(change.calledOnce).to.be(true)
    expect(change.args[0][0]).to.eql(dataList.slice(0, 2))
    change.reset()

    trigger.keyDown(findDOMNode(select), { key: 'ArrowDown'})
    expect(select._values.open).to.be(true)

    select = render(<Select open value={[]} onToggle={()=>{}} data={dataList} textField='label' valueField='id' onChange={change}/>)
    list   = findClass(select, 'rw-list')

    trigger.keyDown(findDOMNode(select), { key: 'ArrowDown'})
    expect(list.children[1].className).to.match(/\brw-state-focus\b/)

    trigger.keyDown(findDOMNode(select), { key: 'End'})
    expect(list.children[2].className).to.match(/\brw-state-focus\b/)

    trigger.keyDown(findDOMNode(select), { key: 'Home'})
    expect(list.children[0].className).to.match(/\brw-state-focus\b/)
  })

})
