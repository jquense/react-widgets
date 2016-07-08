'use strict';
var React = require('react')
var Button      = require('react-bootstrap/lib/Button')
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup')
  , RW = require('../../../src/index');

var i = 0
  , list = [
    { id: i += 1, name: 'James' },
    { id: i += 1, name: 'Jan' },
    { id: i += 1, name: 'Jase' },
    { id: i += 1, name: 'Jason' },
    { id: i += 1, name: 'Jim' },
    { id: i += 1, name: 'Jimmy' },
    { id: i += 1, name: 'Jimmy Smith' },
    { id: i += 1, name: 'John' }
  ];

module.exports = React.createClass({

  getInitialState: function(){
    return {
      duration: 250,
      value: 1,
      suggest: true
    }
  },

  render: function(){
    var props;

    props = {
      data: list,
      defaultValue: 1,
      textField: 'name',
      valueField: 'id',
      suggest: this.state.suggest || false,
      filter: this.state.filter || false,
      disabled: this.state.disabled === 'disabled',
      readOnly: this.state.disabled === 'readonly',
      groupBy: this.state.groupBy,
      duration: this.state.duration,
      busy: this.state.busy,
      isRtl: this.state.isRtl
    }

    return (
      <div className='example' role='application'>
        <div className='row'>
          <div className='col-md-6 col-lg-7 demo'>
            <div className='form-group'>
              <RW.Combobox {...props}/>
            </div>
            <div className='form-group'>
              <label>Custom list Rendering</label>
              <RW.Combobox {...props} itemComponent={itemComp}/>
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
              <label className='checkbox-inline'>
                <input type='checkbox'
                  checked={this.state.groupBy}
                  onChange={this._set.bind(null, 'groupBy', !this.state.groupBy ? (item => item.name.substr(0,2)) : null )}/>
                  Group
              </label>
              <label className='checkbox-inline'>
                <input type='checkbox'
                  checked={this.state.suggest}
                  onChange={this._set.bind(null, 'suggest', !this.state.suggest)}/>
                  Suggestions
              </label>
            </div>

            <div className='row'>
              <div className='form-group col-xs-6'>
                <label className='form-label'>Filter</label>
                <RW.DropdownList
                    value={this.state.filter || false}
                    data={[false, 'startsWith', 'endsWith', 'contains']}
                    onChange={this._set.bind(null, 'filter')}/>
              </div>

              <div className='form-group  col-xs-6'>
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
  }
})

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
