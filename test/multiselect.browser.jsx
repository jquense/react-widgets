import React from 'react';
import { findDOMNode } from 'react-dom';

import Multiselect from '../src/Multiselect.jsx'
import TagList from '../src/MultiselectTagList.jsx'
import tsp from 'teaspoon'
import TestUtils from 'react-addons-test-utils'

var render = TestUtils.renderIntoDocument
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , findType = TestUtils.findRenderedComponentWithType
  , trigger = TestUtils.Simulate;


describe('Multiselect', function() {
  const ControlledMultiselect = Multiselect.ControlledComponent;

  var dataList = [
    { label: 'jimmy', id: 0 },
    { label: 'sally', id: 1 },
    { label: 'pat', id: 2 }
  ];

  it('should set initial values', function() {

    tsp(<Multiselect value={['hello']} onChange={()=>{}} />)

    tsp(<Multiselect value={['hello']} onChange={()=>{}} />)
      .render()
      .single(tsp.s`${TagList} li:textContent(hello)`)
  })

  it('should respect textField and valueFields', function(){
    tsp(<Multiselect defaultValue={[0]} data={dataList} textField='label' valueField='id' />)
    tsp(<Multiselect defaultValue={[0]} data={dataList} textField='label' valueField='id' />)
      .render()
      .single(tsp.s`${TagList} li:textContent(jimmy)`)
  })

  it('should start closed', () => {

    let inst = tsp(
      <ControlledMultiselect
        value={dataList.slice(0, 2)}
        data={dataList}
        textField='label'
        valueField='id'
      />
    )
    .shallowRender()

    expect(inst.props('open')).to.not.equal(true)
    expect(inst.find('Popup').props('open')).to.not.equal(true)

    inst.none('.rw-open')
    inst.single(tsp.s`MultiselectInput[aria-expanded=${false}]`)
  })

  it('should toggle add aria when open', () => {

    let inst = tsp(<ControlledMultiselect open />).shallowRender()

    expect(inst.props('open')).to.equal(true)
    expect(inst.find('Popup').props('open')).to.equal(true)

    inst.single('.rw-open')
    inst.single('MultiselectInput[aria-expanded]')
  })

  it('should foward props to Popup', () => {
    let props = tsp(<ControlledMultiselect open duration={2} dropUp />  )
      .shallowRender()
      .find('Popup')
      .props()

    expect(props.dropUp).to.equal(true)
    expect(props.open).to.equal(true)
    expect(props.duration).to.equal(2)
  })

  it('should open when focused', (done) => {
    let openSpy = sinon.spy();

    tsp(<ControlledMultiselect onToggle={openSpy} />)
      .render()
      .trigger('focus')

    setTimeout(() => {
      expect(openSpy.calledOnce).to.be(true);
      expect(openSpy.calledWith(true)).to.be(true);
      done()
    })
  })

  it('should not open when disabled', (done) => {
    let openSpy = sinon.spy();

    tsp(<ControlledMultiselect onToggle={openSpy} disabled />)
      .render()
      .trigger('focus')

    setTimeout(() => {
      expect(openSpy.called).to.be(false);
      done()
    })
  })

  it('should set id on list', () =>{
    expect(
      tsp(<ControlledMultiselect open />)
        .shallowRender()
        .find('List')
        .props('id')
      ).to.be.a('string');
  })

  it('should remove tag when clicked', function(){
    var del = sinon.spy()
    tsp(
      <TagList
        value={[dataList[0], dataList[1]]}
        data={dataList}
        textField='label'
        valueField='id'
        onDelete={del}/>
    )
    .render()
      .tap(inst => expect(inst.find('li').length).to.equal(2))
    .find('li:first-child > span')
    .trigger('click', {});

    expect(del.calledOnce).to.be(true)
    expect(del.calledWith(dataList[0])).to.be(true)
  })

  it('should change value when tag is clicked', function(){
    var change = sinon.spy()

    tsp(
      <Multiselect
        onChange={change}
        value={dataList.slice(0, 2)}
        data={dataList}
        textField='label'
        valueField='id'
      />
    )
    .render()
    .find(tsp.s`${TagList} li:first-child > span`)
    .trigger('click', {});

    expect(change.calledOnce).to.be(true)
    expect(change.getCall(0).args[0]).to.eql(dataList.slice(1, 2))
  })

  it('should trigger focus/blur events', function(done){
    var blur = sinon.spy()
      , focus = sinon.spy()

    tsp(<Multiselect onBlur={blur} onFocus={focus}/>)
      .render()
      .trigger('focus')
      .tap(inst => {
        setTimeout(() => {
          inst.trigger('blur')

          setTimeout(() => {
            expect(focus.calledOnce).to.be(true)
            expect(blur.calledOnce).to.be(true)
            done()
          })
        })
      });
  })

  it('should not trigger focus/blur events when disabled', function(done){
    var blur = sinon.spy()
      , focus = sinon.spy()

    tsp(<Multiselect disabled onBlur={blur} onFocus={focus}/>)
      .render()
      .trigger('focus')
      .tap(inst => {
        setTimeout(() => {
          inst.trigger('blur')

          setTimeout(() => {
            expect(focus.called).to.be(false)
            expect(blur.called).to.be(false)
            done()
          })
        })
      });
  })

  it('should trigger key events', function(){
    var kp = sinon.spy()
      , kd = sinon.spy()
      , ku = sinon.spy()

    tsp(
      <Multiselect
        onKeyPress={kp}
        onKeyUp={ku}
        onKeyDown={kd}
      />
    )
    .render()
    .trigger('keyPress')
    .trigger('keyDown')
    .trigger('keyUp')

    expect(kp.calledOnce).to.be(true)
    expect(kd.calledOnce).to.be(true)
    expect(ku.calledOnce).to.be(true)
  })


  it('should add correct markup when read-only', () => {
    let input = tsp(<ControlledMultiselect readOnly />)
      .render()
      .find('.rw-input')
      .dom()

    expect(input.hasAttribute('readonly')).to.be(true);
    expect(input.getAttribute('aria-readonly')).to.be('true');
  })

  it('should add correct markup when disabled', () => {
    let input = tsp(<ControlledMultiselect disabled />)
      .render()
      .find('.rw-input')
      .dom()

    expect(input.hasAttribute('disabled')).to.be(true);
    expect(input.getAttribute('aria-disabled')).to.be('true');
  })

  it('should disable only certain tags', function() {
    var change = sinon.spy()
    tsp(
      <Multiselect
        onChange={change}
        defaultValue={[0, 1]}
        data={dataList}
        disabled={[1]}
        textField='label'
        valueField='id'
      />
    )
    .render()
    .find(TagList)
    .single('li.rw-state-disabled > span')
    .trigger('click')

    expect(change.called).to.be(false)
  })

  it('should not remove tags when disabled', () => {
    let changeSpy = sinon.spy();

    tsp(
      <Multiselect
        disabled
        onChange={changeSpy}
        value={['jimmy']}
        data={dataList}
      />
    )
    .render()
    .find('.rw-tag-btn')
    .trigger('click')

    expect(changeSpy.called).to.be(false)
  })

  it('should not remove disabled tags', function() {
    var change = sinon.spy();
    tsp(
      <Multiselect
        onChange={change}
        defaultValue={[1, 0]}
        data={dataList}
        disabled={[1]}
        textField='label'
        valueField='id'
      />
    )
    .render()
    .first('.rw-tag-btn')
    .trigger('click')

    expect(change.called).to.be(false)
  })

  it('should not remove tags when readOnly', () => {
    let changeSpy = sinon.spy();

    tsp(
      <Multiselect
        readOnly
        onChange={changeSpy}
        value={['jimmy']}
        data={dataList}
      />
    )
    .render()
    .find('.rw-tag-btn')
    .trigger('click')

    expect(changeSpy.called).to.be(false)
  })

  it('should not remove readonly tags', function() {
    var change = sinon.spy();
    tsp(
      <Multiselect
        onChange={change}
        defaultValue={[1, 0]}
        data={dataList}
        readOnly={[1]}
        textField='label'
        valueField='id'
      />
    )
    .render()
    .first('.rw-tag-btn')
    .trigger('click')

    expect(change.called).to.be(false)
  })

  it('should call Select handler', function(done){
    var change = sinon.spy()
      , onSelect = sinon.spy()
      , instance = render(<Multiselect value={[dataList[1]]} data={dataList} onChange={change} onSelect={onSelect}/>)

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

  it('should clear searchTerm when an item is selected', () => {
    let searchSpy = sinon.spy();

    tsp(
      <Multiselect
        defaultOpen
        data={dataList}
        textField='label'
        valueField='id'
        defaultSearchTerm='ji'
        onSearch={searchSpy}
      />
    )
    .render()
    .trigger('keyDown', { key: 'Enter' })

    expect(searchSpy.calledOnce).to.be(true)
    expect(searchSpy.calledWith('')).to.be(true)
  })

  it('should not trigger form submission', function(){
    let spy;
    let select = tsp(
      <form action='/' onSubmit={() => { throw new Error('should not submit!') }}>
        <Multiselect searchTerm="jim" data={dataList} onSearch={()=>{}} onKeyDown={spy = sinon.spy()}/>
      </form>
    ).render();

    select.find('input')
      .trigger('keyDown', { key: 'Enter' })

    expect(spy.calledOnce).to.equal(true);
  })

  it('should show create tag correctly', function(){
    var select = tsp(
      <Multiselect
        searchTerm="custom tag"
        onCreate={()=>{}}
        data={dataList}
        onSearch={()=>{}}
        textField='label'
        valueField='id'
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
      .props('searchTerm', 'JIMMY')
      .tap(s => s
        .none('.rw-multiselect-create-tag')
      )
      .props({searchTerm: 'custom', onCreate: undefined })
      .tap(s => s
        .none('.rw-multiselect-create-tag')
      )
  })

  it('should show create tag correctly when caseSensitive', function(){
    tsp(
      <Multiselect
        searchTerm="Jimmy"
        onCreate={()=>{}}
        data={ dataList }
        onSearch={()=>{}}
        textField='label'
        valueField='id'
        caseSensitive={true}
      />
    )
    .render()
    .tap(s => s
      .single('.rw-multiselect-create-tag')
    )
    .props('searchTerm', 'jimmy')
    .tap(s => s
      .none('.rw-multiselect-create-tag')
    )
  })

  it('should call onCreate', function(){
    var create = sinon.spy()
      , select = render(<Multiselect
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
    select = render(<Multiselect open={true} searchTerm="custom tag" data={['custom tag time']}  onCreate={create} onSearch={()=>{}} onToggle={()=>{}}/>)
    create.reset()
    trigger.keyDown(findDOMNode(select), { key: 'Enter'})

    expect(create.called).to.be(false)

    trigger.keyDown(findDOMNode(select), { key: 'Enter', ctrlKey: true })

    expect(create.calledOnce).to.ok()
    expect(create.calledWith('custom tag')).to.ok()
  })

  it('should change values on key down', function(){
    var change = sinon.spy()
      , select = render(<Multiselect value={[0, 1, 2]} data={dataList} textField='label' valueField='id' onChange={change}/>)
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

    select = render(<Multiselect open value={[]} onToggle={()=>{}} data={dataList} textField='label' valueField='id' onChange={change}/>)
    list   = findClass(select, 'rw-list')

    trigger.keyDown(findDOMNode(select), { key: 'ArrowDown'})
    expect(list.children[1].className).to.match(/\brw-state-focus\b/)

    trigger.keyDown(findDOMNode(select), { key: 'End'})
    expect(list.children[2].className).to.match(/\brw-state-focus\b/)

    trigger.keyDown(findDOMNode(select), { key: 'Home'})
    expect(list.children[0].className).to.match(/\brw-state-focus\b/)
  })

})
