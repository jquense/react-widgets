import React from 'react';
import tsp from 'teaspoon';

import Multiselect from '../src/Multiselect.jsx';
import TagList from '../src/MultiselectTagList.jsx';


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

    inst.single('Popup[open]')
    inst.single('Widget[open]')
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

  it('should call Select handler', function(){
    let change = sinon.spy()
      , onSelect = sinon.spy();

    tsp(
      <ControlledMultiselect
        open
        onToggle={() =>{}}
        value={dataList.slice(1)}
        data={dataList}
        onChange={change}
        onSelect={onSelect}
      />
    )
    .shallowRender()
    .find('List')
      .trigger('select', dataList[1])

    expect(onSelect.calledOnce).to.be(true)
    expect(change.calledAfter(onSelect)).to.be(true)
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
    .trigger('keyDown', { keyCode: 13 })

    expect(searchSpy.calledOnce).to.be(true)
    expect(searchSpy.calledWith('')).to.be(true)
  })

  it('should not trigger form submission', function(){
    let spy = sinon.spy()

    tsp(
      <form
        action='/'
        onSubmit={() => {throw new Error('should not submit!')}}
      >
        <Multiselect
          searchTerm="jim"
          data={dataList}
          onSearch={()=>{}}
          onKeyDown={spy}
        />
      </form>
    )
    .render()
    .find('input')
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
    let create = sinon.spy()

    let assertOnCreateCalled = () => {
      expect(create.calledOnce).to.equal(true)
      expect(create.calledWith('custom tag')).to.equal(true)
      create.reset()
    };

    tsp(
      <Multiselect
        open
        searchTerm="custom tag"
        data={dataList}
        onCreate={create}
        onSearch={()=>{}}
        onToggle={()=>{}}
      />
    )
    .render()
    .find('.rw-create-list-option')
      .trigger('click')
      .tap(assertOnCreateCalled)
      .end()
    .trigger('keyDown', { keyCode: 13 })
      .tap(assertOnCreateCalled)
    .trigger('keyDown', { keyCode: 13, ctrlKey: true })
      .tap(assertOnCreateCalled)
  })

  it('should navigate tags list', function(){
    let change = sinon.spy();
    let listHead = dataList.slice(0, 2);

    let inst = tsp(
      <Multiselect
        value={[0, 1, 2]}
        data={dataList}
        textField='label'
        valueField='id'
        onChange={change}
      />
    )
    .render()

    let tags = inst.find(TagList).children();

    inst.trigger('keyDown', { key: 'ArrowLeft' })
    tags.last().is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'ArrowRight' })
    tags.nth(1).is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'Home' })
    tags.first().is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'End' })
    tags.last().is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'Delete' })

    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(listHead)).to.be(true)
    change.reset()

    inst.trigger('keyDown', { key: 'Backspace' })

    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(listHead)).to.be(true)
  })

  it('should open on ArrowDown', () => {
    let openSpy = sinon.spy();

    tsp(
      <Multiselect
        data={dataList}
        onToggle={openSpy}
      />
    )
    .render()
    .trigger('keyDown', { key: 'ArrowDown' })

    expect(openSpy.calledOnce).to.be(true)
    expect(openSpy.calledWith(true)).to.be(true)
  })

  it('should navigate list', function(){
    let change = sinon.spy();

    let inst = tsp(
      <Multiselect
        defaultOpen
        data={dataList}
        textField='label'
        valueField='id'
        onChange={change}
      />
    )
    .render()

    let listItems = inst.find('List').children();

    listItems.first().is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'ArrowDown' })
    listItems.nth(1).is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'ArrowUp' })
    listItems.first().is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'End' })
    listItems.last().is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'Home' })
    listItems.first().is('.rw-state-focus')
  })
})
