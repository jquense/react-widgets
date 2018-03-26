import { stripIndent } from 'common-tags'
import React from 'react'
import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import prism from '../../plugins/gatsby-plugin-jsxtreme-markdown/prism'

function unescape(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

let count = 0
function TabbedCodeBlock({ children }) {
  return (
    <Tabs defaultActiveKey={0} id={`tab-code-block-${count++}`}>
      {React.Children.map(children, ({ props }, idx) => {
        return (
          <Tab title={props.title} eventKey={idx}>
            <pre className="pg-code-section">
              <code
                dangerouslySetInnerHTML={{
                  __html: prism(
                    stripIndent([unescape(props.children)]),
                    props.lang || 'jsx'
                  ),
                }}
              />
            </pre>
          </Tab>
        )
      })}
    </Tabs>
  )
}

export default TabbedCodeBlock
