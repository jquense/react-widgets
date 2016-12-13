const { stripIndent } = require('common-tags');

module.exports = function({ body }) {

  return stripIndent`
    var React = require('react')
      , EditableExample = require('../EditableExample')
      , CodeBlock = require('../CodeBlock')
      , TabbedCodeBlock = require('../TabbedCodeBlock')
      , { Link } = require('react-router');

    const Tab = (props) => <div {...props} />

    module.exports = function Page({ scope, style, className }) {
      return (
        <section className={className} style={style}>
          ${body || ''}
        </section>
      )
    }
  `;
}
