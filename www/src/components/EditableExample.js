import Globalize from 'globalize'
import React from 'react'
import ReactDOM from 'react-dom'
// import Playground from '@monastic.panic/component-playground/Playground';
import * as ReactWidgets from 'react-widgets'
import MultiselectTagList from 'react-widgets/lib/MultiselectTagList'
import List from 'react-widgets/lib/List'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

import genData from './generate-data'

let scope = {
  Globalize,
  ReactWidgets: { ...ReactWidgets, MultiselectTagList, List },
  listOfPeople() {
    return genData(15)
  },
  React,
  ReactDOM,
}

export default function EditableExample({ codeText, ...props }) {
  return (
    <div className="pg-code-section">
      <LiveProvider
        code={codeText.trim()}
        scope={scope}
        mountStylesheet={false}
        noInline={codeText.includes('render(')}
        className="playground"
      >
        <div className="playground-preview">
          <LivePreview />
          <LiveError />
        </div>
        <div className="playground-editor">
          <LiveEditor />
        </div>
      </LiveProvider>
    </div>
  )
}
