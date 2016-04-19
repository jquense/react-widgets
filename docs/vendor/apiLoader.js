"use strict";
var marked = require('marked')
  , Renderer = require('./jsx-renderer')
  , prism = require('./prism')
  , fs = require('fs')
  , path = require('path');


prism.languages.insertBefore('javascript', 'keyword', {
  'var': /\b(this)\b/g,
  'block-keyword': /\b(if|else|while|for|function)\b/g,
  'primitive': /\b(true|false|null|undefined)\b/g,
  'function': prism.languages.function,
});

prism.languages.insertBefore('javascript', {
  'qualifier': /\b[A-Z][a-z0-9_]+/g,
});

marked.setOptions({
  xhtml: true,
  highlight: function(code) {
    return prism.highlight(code, prism.languages.javascript);
  }
})


var renderer = new Renderer()
  , props;

renderer.heading = function (text, level, raw) {
  var parts = parsePropHeader(text);

  if ( level === 3 && parts.props ){
    if ( parts.text )
      props.push(parts.text)

    return '<PropHeader {...' + parts.props + '}>' + parts.text + '</PropHeader>'
  }

  return Renderer.prototype.heading.call(this, text, level, raw)
},


module.exports = function(markdown) {
  var templatePath = __dirname + '/../templates/doc-page'
    , callback = this.async();

  if (this && this.cacheable)
    this.cacheable();

  var widgetName = path.basename(this.resourcePath, '.api.md')
    , prefix = widgetName.toLowerCase() + '/'

  this.addDependency(templatePath);

  fs.readFile(templatePath, 'utf8', function(err, docPage){
    var desc;

    if ( err ) return callback(err)

    props = []

    var match = markdown.match(/<-+>/g)
      , idx = match ? markdown.indexOf(match[0]) : -1

    if ( idx !== -1){
      desc = marked(markdown.substr(0, idx), { renderer: renderer })
      markdown = markdown.substr(idx + match[0].length)
    }

    var file = t(docPage, {
      html: marked(markdown, { renderer: renderer }),
      desc: desc || '',
      prefix: prefix,
      widgetName: widgetName,
      props: props.map(function(p){
        return '<MenuItem>' + p + '</MenuItem>'
      }).join('\n')
    })

    callback(null, file)
  })
};

function parsePropHeader(text){
  var parts = text.split('?')
    , props = Renderer.unescape(parts.slice(1).join('?'));

  return { props: props, text: parts[0].trim() }
}


function t(str, data){
  for(var p in data)
    str = str.replace(new RegExp('\\${' + p + '}', 'g'), data[p]);
  return str;
}
