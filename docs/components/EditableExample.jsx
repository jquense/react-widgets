/*global JSXTransformer */
'use strict';

var React = require('react')
  , CodeMirrorEditor = require('./codemirror')
  , babel = require('babel/browser')
  , { whitelist, ...config } = require('../../package.json').babel
  , ReactWidgets = require('../../src/index')
  , MultiselectTagList = require('../../src/MultiselectTagList')
  , List = require('../../src/List')
  , genData = require('./generate-data');

function listOfPeople(){
  return genData(15)
}

function scopedEval(code, mountNode)  {
  var context = { ReactWidgets: { ...ReactWidgets, MultiselectTagList, List }, listOfPeople, mountNode, React }

  return (new Function( "with(this) { " + code + "}")).call(context);
}

module.exports = React.createClass({

  propTypes: {
    codeText: React.PropTypes.string.isRequired,
    transformer: React.PropTypes.func,
    renderCode: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      transformer: function(code) {
        return babel.transform(code, config).code;
      }
    };
  },

  getInitialState: function() {
    return {
      code: this.props.codeText
    };
  },

  handleCodeChange: function(value) {
    this.setState({code: value, error: null }, 
      () => this.executeCode());
    
  },

  compileCode: function() {
    return this.props.transformer(this.state.code);
  },

  render: function() {

    return (
      <div className="editable-example row">
        <div className='editable-rendered col-md-5 col-md-push-7'>
          <div ref="mount" />
        </div>
        <div className='editable-editor col-md-7 col-md-pull-5'>
          <CodeMirrorEditor key="jsx"
            onChange={this.handleCodeChange}
            value={this.state.code}/>
          { this.state.error &&
            <div className='text-danger editable-error'>{this.state.error}</div>
          }
        </div>
      </div>
      );
  },

  componentDidMount: function() {
    this.executeCode();
  },

  componentWillUpdate: function(nextProps, nextState) {
    clearTimeout(this.timeoutID);
    // execute code only when the state's not being updated by switching tab
    // this avoids re-displaying the error, which comes after a certain delay
    if (this.state.code !== nextState.code) 
      setTimeout(() => this.executeCode());
  },

  setTimeout: function() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  },

  componentWillUnmount: function() {
    var mountNode = this.refs.mount.getDOMNode();
    
    try {
      React.unmountComponentAtNode(mountNode);
    } 
    catch (e) { }
  },

  executeCode: function() {
    var mountNode = this.refs.mount.getDOMNode();

    try {
      React.unmountComponentAtNode(mountNode);
    } 
    catch (e) { }

    try {
      scopedEval(this.compileCode(), mountNode);
    } 
    catch (err) {
      this.setTimeout(() => {
        this.setState({ error: err.toString() })
      }, 1000);
    }
  }
});
