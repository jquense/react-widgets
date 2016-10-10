var marked = require('marked')
  , Renderer = require('./jsx-renderer')
  , fs = require('fs')
  , path = require('path');

marked.setOptions({ xhtml: true })

module.exports = function(markdown) {
  var templatePath = path.join(__dirname, '../templates/md-component')
    , callback = this.async();

  if (this && this.cacheable)
    this.cacheable();

  var prefix = path.basename(this.resourcePath, '.md').toLowerCase() + '/'

  this.addDependency(templatePath);

  fs.readFile(templatePath, 'utf8', function(err, docPage){
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
    str = str.replace(new RegExp('\\${' + p + '}', 'g'), data[p]);
  return str;
}
