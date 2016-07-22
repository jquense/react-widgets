'use strict';
var React = require('react')
var Button      = require('react-bootstrap/lib/Button')
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup')
  , Dropdown = require('../../../src/index').DropdownList
  , RW = require('../../../src/index')
  , genData = require('../generate-data');

var valueComp = React.createClass({
  render() {

    return (<span><i className='fa fa-comment'></i>{ '  ' + this.props.item.name }</span>)
  }
});

var itemComp = React.createClass({
  render: function() {
    var icons =  ['bicycle', 'area-chart', 'anchor']

    this._icon || (this._icon = icons[getRandomInt(0, 2)])
    return (
      <div>
        <i className={'fa fa-' + this._icon}></i>
        { '  ' + this.props.item.name}
      </div>
    );
  }
});


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var list = genData(25);

var DropdownApi = React.createClass({

  getInitialState: function(){

    return {
      duration: 250
    }
  },

  render: function() {

    var props = {
      disabled: this.state.disabled === 'disabled',
      readOnly: this.state.disabled === 'readonly',
      groupBy: this.state.groupBy,
      defaultValue: 1,
      data: list,
      filter: this.state.filter || false,
      duration: this.state.duration,
      busy: this.state.busy,
      isRtl: this.state.isRtl,
      valueField: 'id',
      textField: 'name'
    }

    //let disabled = this.state.disabled === true || Array.isArray(this.state.disabled);

    return (
      <div className='example' role='application'>
        <div className='row'>
          <div className='col-md-6 col-lg-7 demo'>
            <div className='form-group'>
              <Dropdown {...props }/>
            </div>
            <div className='form-group'>
              <label>Custom Rendering</label>
              <Dropdown {...props }
                valueComponent={valueComp}
                itemComponent={itemComp}/>
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
              <label className='checkbox-inline'>
                <input type='checkbox'
                  checked={!!this.state.groupBy}
                  onChange={this._set.bind(null, 'groupBy', !this.state.groupBy ? 'lastName' : null )}/>
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
            <div className='row'>
              <div className='form-group col-xs-6'>
                <label className='form-label'>Filter</label>
                <RW.DropdownList
                    value={this.state.filter || false}
                    data={[false, 'startsWith', 'endsWith', 'contains']}
                    onChange={this._set.bind(null, 'filter')}/>
              </div>
              <div className='form-group col-xs-6'>
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
