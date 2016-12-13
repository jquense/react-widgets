import React from 'react';
import ReactDOM from 'react-dom';
import Playground from '@monastic.panic/component-playground/Playground';
import ReactWidgets from 'react-widgets';
import MultiselectTagList from 'react-widgets/lib/MultiselectTagList';
import List from 'react-widgets/lib/List';
import genData from './generate-data';

let scope = {
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
        codeText={codeText.trim()}
        mode='jsx'
        theme='one-light'
        scope={scope}
        babelConfig={{
          presets: ['es2015-loose', 'react', 'stage-0']
        }}
      />
    </div>
  );
}
