const { basename, extname } = require('path')
const jsxtremeMarkdown = require('@mapbox/jsxtreme-markdown');
const { stripIndent } = require('common-tags');
const Prism = require('prismjs');
const visit = require('unist-util-visit');

var javascript = Prism.util.clone(Prism.languages.javascript);

Prism.languages.jsx = Prism.languages.extend('markup', javascript);
Prism.languages.jsx.tag.pattern= /<\/?[\w\.:-]+\s*(?:\s+(?:[\w\.:-]+(?:=(?:("|')(\\?[\s\S])*?\1|[^\s'">=]+|(\{[\s\S]*?\})))?|\{\.{3}\w+\}))*\s*\/?>/i;

Prism.languages.jsx.tag.inside['attr-value'] = {
  pattern: /=(?!\{)(?:('|")[\s\S]*?(\1)|[^\s>]+)/i,
  inside: {
    punctuation: /[="'{}]/
  }
}

Prism.languages.insertBefore('inside', 'attr-name', {
	'spread': {
		pattern: /\{\.{3}\w+\}/,
		inside: {
			'punctuation': /\{|\}|\./,
			'attr-value': /\w+/
		}
	}
}, Prism.languages.jsx.tag);

var jsxExpression = Prism.util.clone(Prism.languages.jsx);

delete jsxExpression.punctuation

jsxExpression = Prism.languages.insertBefore('jsx', 'operator', {
  'punctuation': /=(?={)|[{}[\];(),.:]/
}, { jsx: jsxExpression });

Prism.languages.insertBefore('inside', 'attr-value', {
	'script': {
		// Allow for one level of nesting
		pattern: /=(\{(?:\{[^}]*\}|[^}])+\})/i,
		inside: jsxExpression,
		'alias': 'language-javascript'
	}
}, Prism.languages.jsx.tag);

Prism.languages.insertBefore('jsx', {
  identifier: /\b[a-zA-Z0-9_]+/g,
});




module.exports = function loader(source) {
  const { resourcePath } = this;
  let name = basename(resourcePath, extname(resourcePath))
  name = name === 'index' ? 'React Widgets' : name;
  function template({ jsx: body }) {
    return stripIndent`
      var React = require('react')
      var Helmet = require('react-helmet').default
      var EditableExample = require('../components/EditableExample').default;
      var CodeBlock = require('../components/CodeBlock').default;
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
