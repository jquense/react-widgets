var React = require('react')
  , _ = require('lodash')
  , Button = require('react-bootstrap/Button')
  , buttonGroup = require('react-bootstrap/ButtonGroup')
  , RW = require('../../../index');

module.exports = React.createClass({

  getInitialState: function(){
    return {
      duration: 250,
      value: 1,
      suggest: true
    }
  },

  render: function(){
    var i = 0
      , list = [
        { id: i += 1, name: "James" },
        { id: i += 1, name: "Jan" },
        { id: i += 1, name: "Jase" },
        { id: i += 1, name: "Jason" },
        { id: i += 1, name: "Jim" },
        { id: i += 1, name: "Jimmy" },
        { id: i += 1, name: "Jimmy Smith" },
        { id: i += 1, name: "John" }
      ]

    return (
      <div className='example'>
        <div className='row'>
          <div className='col-sm-8'>
            <RW.Combobox 
                data={list}
                value={this.state.value}
                onChange={this._change}
                textField='name'
                valueField='id'
                suggest={this.state.suggest || false}
                filter={this.state.filter || false}
                disabled={this.state.disabled === 'disabled'}
                readOnly={this.state.disabled === 'readonly'}
                data={list}
                duration={this.state.duration}
                busy={this.state.busy}
                onChange={this._change}
                isRtl={this.state.isRtl}/>
          </div>
          <div className='col-sm-4 api-panel'>
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
              <Button style={{'marginLeft': 10}} 
                  active={this.state.busy} 
                  onClick={_.partial(this._set, 'busy', !this.state.busy)}>
                  Busy
              </Button>
            </div>
            <div className='form-group'>
              <div className='checkbox'>
                <label>
                  <input type='checkbox' 
                    checked={this.state.isRtl}
                    onChange={_.partial(this._set, 'isRtl', !this.state.isRtl)}/>
                    Right to Left
                </label>
              </div>
            </div>
            <div className='form-group'>
              <label className='form-label'>Suggest</label>
              <RW.DropDownlist 
                  value={this.state.suggest} 
                  data={[false, true]}
                  onChange={_.partial(this._set, 'suggest')}/>
            </div>
            <div className='form-group'>
              <label className='form-label'>Filter</label>
              <RW.DropDownlist 
                  value={this.state.filter || false} 
                  data={[false, 'startsWith', 'endsWith', 'contains']}
                  onChange={_.partial(this._set, 'filter')}/>
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
    var val = this.state.disabled === 'disabled' ? false : 'disabled'
    this.setState({ disabled: val })
  },

})

