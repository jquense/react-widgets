"use strict";
var marked = require('marked')
  , Renderer = require('./jsx-renderer')
  , fs = require('fs')
  , prism = require('./prism')
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

module.exports = function(markdown) {
  var templatePath = __dirname + '/../templates/md-component'
    , callback = this.async();

  if (this && this.cacheable)
    this.cacheable();

  var prefix = path.basename(this.resourcePath, '.md').toLowerCase() + '/'

  this.addDependency(templatePath);

  fs.readFile(templatePath, 'utf8', function(err, docPage){
    var headers = [], i = 0;

    if ( err ) return callback(err)

    var file = t(docPage, { 
      html: marked(markdown, { renderer: new Renderer() }),
      prefix: prefix
    })

    callback(null, file)
  })
};


function t(str, data){
  for(var p in data) 
    str = str.replace(new RegExp('\\${' + p + '}','g'), data[p]);
  return str;
}
