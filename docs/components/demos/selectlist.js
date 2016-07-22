'use strict';
var React = require('react')
var Button      = require('react-bootstrap/lib/Button')
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup')
  , RW = require('../../../src/index');


var list = [
        { label: 'orange', id: 1 },
        { label: 'blue',   id: 2 },
        { label: 'red',    id: 3 },
        { label: 'maroon', id: 4 },
        { label: 'purple', id: 5 },
        { label: 'mauve',  id: 6 }
      ];

var SelectListApi = React.createClass({

  getInitialState: function(){

    return {
      duration: 250,
      value: list[0]
    }
  },

  render: function() {
    var disabled = this.state.disabled === true || Array.isArray(this.state.disabled);

    return (
      <div className='example' role='application'>
        <div className='row'>
          <div className='col-md-6 col-lg-7 demo'>
            <div className='form-group'>
              <RW.SelectList
                disabled={disabled ? this.state.disabled : false}
                readOnly={this.state.disabled === 'readonly'}
                value={this.state.value}
                data={list}
                multiple={this.state.multiple}
                busy={this.state.busy}
                onChange={this._change}
                isRtl={this.state.isRtl}
                valueField='id'
                textField='label'
              />
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
                  checked={!!this.state.multiple}
                  onChange={this._set.bind(null, 'multiple', !this.state.multiple)}/>
                  Is Multiple
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
              <label className='form-label'>Disable Values</label>
              <RW.Multiselect
                  value={ Array.isArray(this.state.disabled) ? this.state.disabled : [] }
                  data={list}
                  textField='label'
                  valueField='id'
                  disabled={this.state.disabled === true}
                  onChange={this._set.bind(null, 'disabled')}/>
            </div>
          </div>
        </div>
      </div>
    );
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
  }
});

module.exports = SelectListApi;
