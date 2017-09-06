const { basename, extname } = require('path')
const jsxtremeMarkdown = require('@mapbox/jsxtreme-markdown');
const { stripIndent } = require('common-tags');
const visit = require('unist-util-visit');

module.exports = function loader(source) {
  const { resourcePath } = this;
  let name = basename(resourcePath, extname(resourcePath))
  name = name === 'index' ? 'React Widgets' : name;
  function template({ jsx: body }) {
    return stripIndent`
      var React = require('react')
      var Helmet = require('react-helmet').default
      var EditableExample = require('../components/EditableExample').default;
      var TabbedCodeBlock = require('../components/TabbedCodeBlock').default;

      const Tab = (props) => <div {...props} />

      module.exports = function Page({ scope, style, className }) {
        return (
          <section className={className} style={style}>
            <Helmet title="${name}" />
            ${body}
          </section>
        )
      }
    `;
  }

  let result = jsxtremeMarkdown.toComponentModule(source, {
    template: template,
    rehypePlugins: [
      require('@mapbox/rehype-prism'),
      () => (tree) => {
        visit(tree, 'element', (node, i, parent) => {
          if (!parent || parent.tagName !== 'pre' || node.tagName !== 'code') return;

          const classNames = (node.properties.className || [])
          if (classNames.some(cl => cl.startsWith('language-'))) {
            parent.properties.className = ['pg-code-section']
          }
        })
      }
    ]
  });

  return result;
};
