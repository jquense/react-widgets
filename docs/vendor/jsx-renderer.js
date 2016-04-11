var inherits = require('util').inherits
  , marked = require('marked')


module.exports = JsxRenderer;

function JsxRenderer(){
  marked.Renderer.call(this)
}

inherits(JsxRenderer, marked.Renderer)

JsxRenderer.unescape = function unescape(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

JsxRenderer.prototype.link = function(href, title, text){
  return href.indexOf('http') !== -1
    ? marked.Renderer.prototype.link.call(this, href, title, text)
    : '<Link to="' + href + '" title="' + (title || '') + '">' + text + '</Link>'
}

JsxRenderer.prototype.codespan = function(text) {
  return '<code>{`' + JsxRenderer.unescape(text) + '`}</code>';
};

JsxRenderer.prototype.code = function(code, lang) {
  return '<Editor className="playgroundCode" mode="' + ('jsx') + '" '
      + ' theme="oceanicnext" scope={this.props.scope} codeText={`'+ code + '`} '
      + (lang === 'editable' ? '' : (' readOnly="nocursor" lineWrapping '))
      + (code.indexOf('React.render(') === -1 ? 'noRender' :'') + '/>\n\n'
};
