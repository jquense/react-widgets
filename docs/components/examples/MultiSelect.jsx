'use strict';
var React = require('react')
  , Button = require('../../bootstrap').Button
  , ButtonGroup = require('../../bootstrap').ButtonGroup
  , RW = require('../../../index');

var chance = new (require('chance'))

var list = new Array(100)

for(var i = 0; i < list.length; i++)
  list[i] = { id: i + 1, label: chance.name() }


module.exports = React.createClass({

  getInitialState: function(){
    return {
      duration: 250,
      value: [],
      suggest: true,
      allowCustom: true,
      placeholder: 'a placeholder...'
    }
  },

  render: function(){
    var allVals = this.state.value
      , disabled = this.state.disabled === true || Array.isArray(this.state.disabled);

    function onCreate(tag){
      var tag = { id: list.length + 1, label: tag }

      //list.push(tag)
      this.setState({
        value: [].concat(this.state.value, tag),
      })
    }

    return (
      <div className='example'>
        <div className='row'>
          <div className='col-sm-8 demo'>
            <div className='form-group'>
              <RW.Multiselect 
                  data={list}
                  value={this.state.value}
                  onChange={this._change}
                  textField='label'
                  valueField='id'
                  placeholder={this.state.placeholder}
                  disabled={disabled ? this.state.disabled : false}
                  readOnly={this.state.disabled === 'readonly'}
                  onCreate={this.state.allowCustom && onCreate.bind(this)}
                  duration={this.state.duration}
                  busy={this.state.busy}
                  isRtl={this.state.isRtl}/>
            </div>
            <div className='form-group'>
              <label>Custom Rendering</label>
              <RW.Multiselect 
                  data={list}
                  value={this.state.value}
                  onChange={this._change}
                  textField='label'
                  valueField='id'
                  placeholder={this.state.placeholder}
                  disabled={disabled ? this.state.disabled : false}
                  readOnly={this.state.disabled === 'readonly'}
                  onCreate={this.state.allowCustom && onCreate.bind(this)}
                  duration={this.state.duration}
                  itemComponent={itemComp}
                  tagComponent={itemComp}
                  busy={this.state.busy}
                  isRtl={this.state.isRtl}/>
            </div>
          </div>
          <div className='col-sm-4 api-panel'>
            <div className='form-group'>
              <label className='checkbox-inline'>
                <input type='checkbox'
                  checked={this.state.isRtl}
                  onChange={this._set.bind(null, 'isRtl', !this.state.isRtl)}/>
                  Right to Left
              </label>
            </div>
            <div className='form-group'>
              <label className='checkbox-inline'>
                <input type='checkbox'
                  checked={this.state.allowCustom}
                  onChange={this._set.bind(null, 'allowCustom', !this.state.allowCustom)}/>
                  Allow custom tags
              </label>
            </div>
            <div className='form-group'>
              <ButtonGroup>
                <Button
                  active={this.state.disabled === 'disabled'}
                  onClick={this.disabled}>
                  Disable
                </Button>
                <Button
                  active={this.state.disabled === 'readonly'}
                  onClick={this.readOnly}>
                  Readonly
                </Button>
              </ButtonGroup>
              <Button style={{ marginLeft: 10 }}
                active={this.state.busy}
                onClick={this._set.bind(null, 'busy', !this.state.busy)}>
                Busy
              </Button>
            </div>
            <div className='form-group'>
              <label className='form-label'>Disable Multiselect Values</label>
              <RW.Multiselect 
                  value={ Array.isArray(this.state.disabled) ? this.state.disabled : [] } 
                  data={allVals}
                  textField='label'
                  valueField='id'
                  disabled={this.state.disabled === true}
                  messages={{ emptyList: "no values selected to the right"}}
                  onChange={this._set.bind(null, 'disabled')}/>
            </div>
            <div className='form-group'>
              <label className='form-label'>Placeholder</label>
              <input className='form-control' type='text'
                  value={this.state.placeholder} 
                  onChange={extract(this._set.bind(null, 'placeholder'))}/>
            </div>

            <div className='form-group'>
              <label className='form-label'>Duration</label>
              <RW.NumberPicker 
                  value={this.state.duration} 
                  step={200}
                  min={0}
                  max={1000}
                  onChange={this._set.bind(null, 'duration')}/>
            </div>
            
          </div>
        </div>
      </div>
    )
  },

  _change: function(val){
    this.setState({ value: val })
  },

  _set: function(field, value){
    var obj = {}
    obj[field] = value
    this.setState(obj)
  },

  readOnly: function(){
    var val = this.state.disabled === 'readonly' ? false : 'readonly'
    this.setState({ disabled: val })
  },

  disabled: function(){
    var val = this.state.disabled === true ? false : true
    this.setState({ disabled: val })
  },

})

function extract(fn){
  return function(e){
    return fn(e.target.value)
  }
}

var itemComp = React.createClass({
  render: function() {
    var icons =  ['bicycle', 'area-chart', 'anchor']

    this._icon || (this._icon = icons[getRandomInt(0, 2)])
    return (
      <span>
        <i className={'fa fa-' + this._icon}></i>
        { '  ' + this.props.item.label}
      </span>
    );
  }
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
