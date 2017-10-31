import Globalize from 'globalize';
import React from 'react';
import ReactDOM from 'react-dom';
import Playground from '@monastic.panic/component-playground/Playground';
import * as ReactWidgets from 'react-widgets';
import MultiselectTagList from 'react-widgets/lib/MultiselectTagList';
import List from 'react-widgets/lib/List';

import genData from './generate-data';

let scope = {
  Globalize,
  ReactWidgets: { ...ReactWidgets, MultiselectTagList, List },
  listOfPeople(){
    return genData(15)
  },
  React,
  ReactDOM
}

export default function EditableExample({ codeText, ...props }) {
  return (
    <div className="pg-code-section">
      <Playground
        {...props}
        code={codeText.trim()}
        mode='jsx'
        editorOptions={{
          theme: 'one-light'
        }}
        scope={scope}
        babelConfig={{
          presets: ['es2015-loose', 'react', 'stage-0']
        }}
      />
    </div>
  );
}
