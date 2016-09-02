import React from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';

const propTypes = {
  code: React.PropTypes.string.isRequired
};

function CodeBlock({ code, lang = 'jsx' }) {
  let syntax = Prism.languages[lang];
  let highlighted = Prism.highlight(code, syntax);

  return (
    <pre className='prism-block prism-theme-one-light'>
      <code dangerouslySetInnerHTML={{ __html: highlighted}} />
    </pre>
  );
}

CodeBlock.propTypes = propTypes;

export default CodeBlock;
