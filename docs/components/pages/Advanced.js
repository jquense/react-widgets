'use strict';
var React = require('react')
  , scriptjs = require('scriptjs');
var EditableExample = require('../EditableExample')

require('../examples/advanced/advanced.less')

var AdvancedPage = React.createClass({

  componentDidMount() {
    if( !this.state.momentLoaded)
      scriptjs('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment.min.js', () =>{
        this.setState({ momentLoaded: true })
      })
  },

  getInitialState() {
    return {
      momentLoaded: !!window.moment
    };
  },

  render(){

    return (
      <section {...this.props}>
        <EditableExample codeText={require('../examples/advanced/filterableDropdown.raw')}/>

        <h2>Extending Widgets</h2>
        <p>{`
          While we work to try and make react-widgets as useful as we can, definately can't cover everyone's use cases. To make that
          easier we do try to make the widgets as flexible and extensible as possible. To that end it is really easy to create 
          your own versions of the widgets (or compose a few into more specialized components). One of the easiest ways to do this 
          is to wrap components up, or compose them.
          `}
        </p>
        <h3>Setting some useful defaults</h3>
        <p>{`
          Often your appplication may want to enforce a set of default props, or configurations based sepcifically on your needs. it 
          can be tiresome (and error prone) to set those props every time you use a widget. For instance, Suppose we want to provide a custom 
          parsing function, and date format to the DateTimePicker.
          `}
        </p>
        { this.state.momentLoaded 
          ? <EditableExample codeText={require('../examples/advanced/defaultDatePicker')()}/>
          : <div><i className='rw-i rw-loading'/><em>{"Loading..."}</em></div>
        }
      
        <h3>Changing behavior for fun and profit</h3>
        <p>{`
          The power of the react approach to input state is that it makes changing component behavior trivial. Since 
          we control the state and not the component, it is always possible to change how that state is updated or stored and
          we don't need to change or break the original component in anyway. In the example below, we limit the setting of 
          values on the multiselect and instead redirect that value to another component (this case a tag list). Notice
          how little code is needed to make this change!
          `}
        </p>
        <EditableExample codeText={require('../examples/advanced/taglessMultiselect')()}/>
      </section>
    )
  }
})

module.exports = AdvancedPage