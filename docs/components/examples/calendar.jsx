'use strict';
var React = require('react')
  , _ = require('lodash')
  , Button = require('react-bootstrap/Button')
  , buttonGroup = require('react-bootstrap/ButtonGroup')
  , RW = require('../../../index');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      format: ''
    }
  },

  render: function(){

    return (
      <div className='example'>
        <div className='row'>
          <div className='col-sm-8'>
            <RW.Calendar 
                value={this.state.value}
                onChange={this._change}
                max={this.state.max}
                min={this.state.min}
                finalView={this.state.finalView}
                initialView={this.state.initialView}
                disabled={this.state.disabled === 'disabled'}
                readOnly={this.state.disabled === 'readonly'}
                isRtl={this.state.isRtl}/>
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
            </div>
            <div className='form-group'>
              <label className='form-label'>Initial View</label>
              <RW.DropDownlist 
                  value={this.state.initialView || 'month'} 
                  data={["month", "year", "decade", "century"]}
                  onChange={_.partial(this._set, 'initialView')}/>
            </div>
            <div className='form-group'>
              <label className='form-label'>Final View</label>
              <RW.DropDownlist 
                  value={this.state.finalView || 'century'} 
                  data={["month", "year", "decade", "century"]}
                  onChange={_.partial(this._set, 'finalView')}/>
            </div>
            <div className='form-group'>
              <label className='form-label'>min</label>
              <RW.DateTimePicker 
                  time={false}
                  format='MMM dd, yyyy'
                  value={this.state.min} 
                  onChange={_.partial(this._set, 'min')}/>
            </div>
            <div className='form-group'>
              <label className='form-label'>max</label>
              <RW.DateTimePicker 
                  time={false}
                  format='MMM dd, yyyy'
                  value={this.state.max} 
                  onChange={_.partial(this._set, 'max')}/>
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
    var val = this.state.disabled === 'disabled' ? false : 'disabled'
    this.setState({ disabled: val })
  },

})

          
