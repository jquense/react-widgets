/**
 * @jsx React.DOM
 */

var React = require('react')
  , Button = require('../../bootstrap').Button
  , ButtonGroup = require('../../bootstrap').ButtonGroup
  , Dropdown = require('../../../index').DropdownList
  , NumberPicker = require('../../../index').NumberPicker;

var valueComp = React.createClass({
  render: function() {

    return (<span><i className='fa fa-comment'></i>{ '  ' + this.props.item.label }</span>)
  }
});

var itemComp = React.createClass({
  render: function() {
    var icons =  ['bicycle', 'area-chart', 'anchor']

    this._icon || (this._icon = icons[getRandomInt(0, 2)])
    return (
      <div>
        <i className={'fa fa-' + this._icon}></i>
        { '  ' + this.props.item.label}
      </div>
    );
  }
});


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


var DropdownApi = React.createClass({

  getInitialState: function(){

    return {
      duration: 250,
    }
  },

  render: function() {
    var list = [
        { label: 'orange', id: 1 },
        { label: 'blue', id: 2 },
        { label: 'red', id: 3 },
      ];

    return (
      <div className='example'>
        <div className='row'>
          <div className='col-sm-8 demo'>
            <div className='form-group'>
              <Dropdown 
                disabled={this.state.disabled === 'disabled'}
                readOnly={this.state.disabled === 'readonly'}
                value={this.state.value || 1}
                data={list}
                duration={this.state.duration}
                busy={this.state.busy}
                onChange={this._change}
                isRtl={this.state.isRtl}
                valueField='id'
                textField='label'
                />
            </div>
            <div className='form-group'>
              <label>Custom Rendering</label>
              <Dropdown 
                disabled={this.state.disabled === 'disabled'}
                readOnly={this.state.disabled === 'readonly'}
                value={this.state.value || 1}
                valueComponent={valueComp}
                itemComponent={itemComp}
                data={list}
                duration={this.state.duration}
                busy={this.state.busy}
                onChange={this._change}
                isRtl={this.state.isRtl}
                valueField='id'
                textField='label'
                />
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
                onClick={_.partial(this._set, 'busy', !this.state.busy)}>
                Busy
              </Button>
            </div>
            <div className='form-group'>
              <label className='form-label'>Duration</label>
              <NumberPicker 
                  value={this.state.duration} 
                  step={200}
                  min={0}
                  max={1000}
                  onChange={_.partial(this._set, 'duration')}/>
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
    var val = this.state.disabled === 'disabled' ? false : 'disabled'
    this.setState({ disabled: val })
  },
});

module.exports = DropdownApi;

