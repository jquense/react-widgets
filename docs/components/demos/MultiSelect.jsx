'use strict';
var React = require('react')
var Button      = require('react-bootstrap/lib/Button')
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup')
  , RW = require('../../../src/index')
  , genData = require('../generate-data');

var list = genData(50);

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
    var disabled = this.state.disabled === true || Array.isArray(this.state.disabled);

    var props = {
      data: list,
      value: this.state.value,
      onChange: this._change,
      textField: 'name',
      valueField: 'id',
      placeholder: this.state.placeholder,
      disabled: disabled ? this.state.disabled : false,
      readOnly: this.state.disabled === 'readonly',
      onCreate: this.state.allowCustom && onCreate.bind(this),
      groupBy: this.state.groupBy,
      duration: this.state.duration,
      busy: this.state.busy,
      isRtl: this.state.isRtl
    }

    function onCreate(tag){
      var parts = tag.split(' ')
      //list.push(tag)
      this.setState({
        value: [].concat(this.state.value, {
          id: list.length + 1,
          name: tag,
          first: parts[0],
          last: parts[1]
        })
      })
    }

    return (
      <div className='example' role='application'>
        <div className='row'>
          <div className='col-md-6 col-lg-7 demo'>
            <div className='form-group'>
              <RW.Multiselect {...props}/>
            </div>
            <div className='form-group'>
              <label>Custom Rendering</label>
              <RW.Multiselect {...props }
                  itemComponent={itemComp}
                  tagComponent={itemComp}/>
            </div>
          </div>
          <div className='col-md-6 col-lg-5 api-panel'>
            <div className='form-group'>
              <label className='checkbox-inline'>
                <input type='checkbox'
                  checked={!!this.state.isRtl}
                  onChange={this._set.bind(null, 'isRtl', !this.state.isRtl)}/>
                  Right to Left
              </label>
            </div>
            <div className='form-group'>
              <label className='checkbox-inline'>
                <input type='checkbox'
                  checked={!!this.state.allowCustom}
                  onChange={this._set.bind(null, 'allowCustom', !this.state.allowCustom)}/>
                  Allow custom tags
              </label>
              <label className='checkbox-inline'>
                <input type='checkbox'
                  checked={!!this.state.groupBy}
                  onChange={this._set.bind(null, 'groupBy', !this.state.groupBy ? 'last' : null )}/>
                  Group
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
                  data={list}
                  textField='name'
                  valueField='id'
                  disabled={this.state.disabled === true}
                  messages={{ emptyList: "no values selected to the right"}}
                  onChange={this._set.bind(null, 'disabled')}/>
            </div>
            <div className='row'>
              <div className='form-group col-xs-7'>
                <label className='control-label'>Placeholder</label>
                <input className='form-control' type='text'
                    value={this.state.placeholder}
                    onChange={extract(this._set.bind(null, 'placeholder'))}/>
              </div>

              <div className='form-group col-xs-5'>
                <label className='control-label'>Duration</label>
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
        { '  ' + this.props.item.name}
      </span>
    );
  }
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
