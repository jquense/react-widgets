var React       = require('react')
var Button      = require('react-bootstrap/lib/Button')
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup')
var RW          = require('react-widgets');

require('globalize/lib/cultures/globalize.culture.en-GB');
require('globalize/lib/cultures/globalize.culture.es');
require('globalize/lib/cultures/globalize.culture.fr');
require('globalize/lib/cultures/globalize.culture.ar-AE');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      format: '',
      footer: true
    }
  },

  render: function(){
    let cultures = ['en', 'en-GB', 'es', 'fr', 'ar-AE']

    return (
      <div className='example' role='application'>
        <div className='row'>
          <div className='col-md-6 col-lg-7 demo'>
            <RW.Calendar
                value={this.state.value}
                onChange={this._change}
                max={this.state.max}
                min={this.state.min}
                culture={this.state.culture}
                footer={this.state.footer}
                finalView={this.state.finalView}
                initialView={this.state.initialView}
                disabled={this.state.disabled === 'disabled'}
                readOnly={this.state.disabled === 'readonly'}
                isRtl={this.state.isRtl}/>
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
            </div>
            <div className="row">
              <div className='form-group col-xs-6'>
                <label className='control-label'>culture</label>
                <RW.DropdownList
                    value={this.state.culture || cultures[0]}
                    data={cultures}
                    onChange={this._set.bind(null, 'culture')}/>
              </div>
              <div className='form-group col-xs-6'>
                <label className='control-label'>&nbsp;</label>
                <div className='checkbox'>
                  <label>
                    <input type='checkbox'
                      checked={this.state.footer}
                      onChange={this._set.bind(null, 'footer', !this.state.footer)}/>
                    Footer
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className='form-group col-xs-6'>
                <label className='form-label'>Initial View</label>
                <RW.DropdownList
                    value={this.state.initialView || 'month'}
                    data={["month", "year", "decade", "century"]}
                    onChange={this._set.bind(null, 'initialView')}/>
              </div>
              <div className='form-group col-xs-6'>
                <label className='form-label'>Final View</label>
                <RW.DropdownList
                    value={this.state.finalView || 'century'}
                    data={["month", "year", "decade", "century"]}
                    onChange={this._set.bind(null, 'finalView')}/>
              </div>
            </div>
            <div className="row">
              <div className='form-group col-xs-6'>
                <label className='control-label'>min</label>
                <RW.DateTimePicker
                    time={false}
                    format='MMM dd, yyyy'
                    value={this.state.min}
                    onChange={this._set.bind(null, 'min')}/>
              </div>
              <div className='form-group col-xs-6'>
                <label className='control-label'>max</label>
                <RW.DateTimePicker
                    time={false}
                    format='MMM dd yyyy'
                    value={this.state.max}
                    onChange={this._set.bind(null, 'max')}/>
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
  },

})
