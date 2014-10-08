var React = require('react')
  , _ = require('lodash')
  , Button = require('react-bootstrap/Button')
  , buttonGroup = require('react-bootstrap/ButtonGroup')
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
      placeholder: 'a placeholder...'
    }
  },

  render: function(){
    var allVals = this.state.value
      , disabled = this.state.disabled === true || _.isArray(this.state.disabled)
    // _.map(list, function(){ 
    //   return this.state.value
    // })
    // 
    console.log(disabled, this.state.disabled)

    //allVals.unshift({ id: false, label: 'none'});

    return (
      <div className='example'>
        <div className='row'>
          <div className='col-sm-8 demo'>
            <div className='form-group'>
              <RW.Select 
                  data={list}
                  value={this.state.value}
                  onChange={this._change}
                  textField='label'
                  valueField='id'
                  placeholder={this.state.placeholder}
                  disabled={disabled ? this.state.disabled : false}
                  readOnly={this.state.disabled === 'readonly'}
                  data={list}
                  duration={this.state.duration}
                  busy={this.state.busy}
                  onChange={this._change}
                  isRtl={this.state.isRtl}/>
            </div>
            <div className='form-group'>
              <label>Custom Rendering</label>
              <RW.Select 
                  data={list}
                  value={this.state.value}
                  onChange={this._change}
                  textField='label'
                  valueField='id'
                  placeholder={this.state.placeholder}
                  disabled={disabled ? this.state.disabled : false}
                  readOnly={this.state.disabled === 'readonly'}
                  data={list}
                  duration={this.state.duration}
                  itemComponent={itemComp}
                  tagComponent={itemComp}
                  busy={this.state.busy}
                  onChange={this._change}
                  isRtl={this.state.isRtl}/>
            </div>
          </div>
          <div className='col-sm-4 api-panel'>
            <div className='form-group'>
              <label className='checkbox-inline'>
                <input type='checkbox'
                  checked={this.state.isRtl}
                  onChange={_.partial(this._set, 'isRtl', !this.state.isRtl)}/>
                  Right to Left
              </label>
            </div>
            <div className='form-group'>
              <buttonGroup>
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
              </buttonGroup>
              <Button style={{ marginLeft: 10 }}
                active={this.state.busy}
                onClick={_.partial(this._set, 'busy', !this.state.busy)}>
                Busy
              </Button>
            </div>
            <div className='form-group'>
              <label className='form-label'>Disable Select Values</label>
              <RW.Select 
                  value={ _.isArray(this.state.disabled) ? this.state.disabled : [] } 
                  data={allVals}
                  textField='label'
                  valueField='id'
                  disabled={this.state.disabled === true}
                  messages={{ emptyList: "no values selected to the right"}}
                  onChange={_.partial(this._set, 'disabled')}/>
            </div>
            <div className='form-group'>
              <label className='form-label'>Placeholder</label>
              <input className='form-control' type='text'
                  value={this.state.placeholder} 
                  onChange={extract(_.partial(this._set, 'placeholder'))}/>
            </div>

            <div className='form-group'>
              <label className='form-label'>Duration</label>
              <RW.NumberPicker 
                  value={this.state.duration} 
                  step={200}
                  min={0}
                  max={1000}
                  onChange={_.partial(this._set, 'duration')}/>
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

    this._icon || (this._icon = icons[_.random(0, 2)])
    return (
      <span>
        <i className={'fa fa-' + this._icon}></i>
        { '  ' + this.props.item.label}
      </span>
    );
  }
});

