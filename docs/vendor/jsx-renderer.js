
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

JsxRenderer.prototype.heading = function (text, level) {
  var escapedText = text.toLowerCase().trim().replace(/[^\w]+/g, '-');

  return '<h' + level + '><a name="' + escapedText + '" class="anchor" href="#' 
    + escapedText + '"><span className="header-link"></span>' + text + '</a></h' + level + '>';
},

JsxRenderer.prototype.link = function(href, title, text){
  return href.indexOf('http') !== -1 
    ? marked.Renderer.prototype.link.call(this, href, title, text)
    : '<Link to="' + href + '" title="' + (title || '') + '">' + text + '</Link>'
}

JsxRenderer.prototype.codespan = function(text) {
  return '<code>{`' + unescape(text) + '`}</code>';
};

JsxRenderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out.replace(/class/g, 'className');
    }
  }

  return lang === 'editable' 
    ? '<Playground lang="js" theme="neo" scope={this.props.scope} codeText={`'+ code +'`} ' 
        + (code.indexOf('React.render(') === -1 ? 'noRender' :'') + '/>\n\n'
    : '<pre><code className="' + (lang || '') + '">'+ (escaped ? code : '{`' + escape(code, true) + '`}') + '\n</code></pre>\n';
};


function escape(html) {
  return html
    .replace(/`/g, '&quot;');
}


