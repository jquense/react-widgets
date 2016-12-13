import React from 'react';
import Editor from '@monastic.panic/component-playground/Editor';


function CodeBlock(props) {
  return (
    <Editor
      {...props}
      mode="jsx"
      lineWrapping
      theme="one-light"
      readOnly="nocursor"
      className={'pg-code-section'}
    />
  );
}

export default CodeBlock;
