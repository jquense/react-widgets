var marked = require('marked')
var frontMatter = require('front-matter')
  , Renderer = require('./jsx-renderer');

let replace = require('./replace');
let language = require('../language');

marked.setOptions({
  xhtml: true
})


module.exports = function(content) {
  if (this && this.cacheable)
    this.cacheable();

  let template = this.query.template;

  this.addDependency(require.resolve('../language'));

  let props = [];
  let renderer = Object.assign(new Renderer(), {
    heading(text, level, raw) {
      let parts = text.split('?')
      let headingProps = Renderer.unescape(parts.slice(1).join('?'));

      text = parts[0].trim();

      if (level === 3 && headingProps) {
        if (text) props.push(text)
        return '<PropHeader {...' + headingProps + '}>' + text + '</PropHeader>'
      }

      return Renderer.prototype.heading.call(this, text, level, raw)
    }
  })

  let { attributes, body } = frontMatter(content);
  let heading = attributes.heading || '';

  delete attributes.heading

  let toHtml = md => marked(
    replace(md, Object.assign({ language }, attributes)), { renderer });

  let file = template({
    attributes,
    props,
    heading: toHtml(heading),
    body: toHtml(body),
  })

  return file
};
