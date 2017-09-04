import { stripIndent } from 'common-tags';
import React from 'react';
import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Editor from '@monastic.panic/component-playground/Editor';


function unescape(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

let count = 0;
function TabbedCodeBlock({ children }) {
  return (
    <Tabs defaultActiveKey={0} id={`tab-code-block-${count++}`}>
      {React.Children.map(children, ({ props }, idx) => {
        return (
          <Tab title={props.title} eventKey={idx}>
            <Editor
              code={stripIndent([unescape(props.children)])}
              mode={props.lang || 'jsx'}
              editorOptions={{
                linewrapping: true,
              }}
              theme="one-light"
              readOnly="nocursor"
              className={'pg-code-section'}
            />
          </Tab>
        )
      })}
    </Tabs>
  );
}

export default TabbedCodeBlock;
