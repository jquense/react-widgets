import { stripIndent } from 'common-tags'
import React, { useMemo, useState } from 'react'
import { CodeBlock } from '@docpocalypse/gatsby-theme'

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
  const prefix = useMemo(() => String(prefix++), [])
  const [activeIndex, setActiveIndex] = useState(0)

  const titles = []

  const panels = React.Children.map(children, ({ props }, idx) => {
    titles.push(props.title)
    return (
      <div
        key={idx}
        hidden={idx === activeIndex}
        role="tabpanel"
        aria-labelledby={`${prefix}-tab-${idx}`}
      >
        <CodeBlock
          className="pg-code-section"
          language={props.lang || 'tsx'}
          code={stripIndent([unescape(props.children)])}
        />
      </div>
    )
  })
  return (
    <div>
      <nav role="tablist">
        {titles.map((title, idx) => (
          <button
            type="button"
            role="tab"
            key={idx}
            aria-selected={idx === activeIndex}
            onClick={() => setActiveIndex(idx)}
            id={`${prefix}-tab-${idx}`}
          >
            {title}
          </button>
        ))}
      </nav>
      <div>{panels}</div>
    </div>
  )
}

export default TabbedCodeBlock
