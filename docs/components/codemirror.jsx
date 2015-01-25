'use strict';
var React = require('react');

var IS_MOBILE = (
  navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
);

var CodeMirrorEditor = React.createClass({

  componentDidMount: function() {
    if (IS_MOBILE) return;

    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {
      mode: 'javascript',
      lineNumbers: false,
      lineWrapping: true,
      smartIndent: false,  // javascript mode does bad things with jsx indents
      matchBrackets: true,
      theme: 'neo',
      tabSize: 2,
      readOnly: this.props.readOnly
    });

    this.editor.on('change', this.handleChange);
    //setTimeout( () => this.editor.refresh() )
  },

  componentDidUpdate: function() {
    this.editor.refresh()

    if (this.props.readOnly) {
      this.editor.setValue(this.props.codeText);
    }
  },

  handleChange: function() {
    if (!this.props.readOnly) {
      this.props.onChange && this.props.onChange(this.editor.getValue());
    }
  },

  render: function() {
    var editor = IS_MOBILE 
      ? <pre style={{overflow: 'scroll'}}>{this.props.value}</pre>
      : <textarea ref="editor" defaultValue={this.props.value} />;

    return (
      <div style={this.props.style} className={this.props.className}>
        {editor}
      </div>
    );
  }
});

module.exports = CodeMirrorEditor;