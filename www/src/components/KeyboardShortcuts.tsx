import React from 'react'
import { stylesheet } from 'astroturf'

const styles = stylesheet`
  .grid {
    display: grid;
    grid-template-columns: auto auto;
    margin: 0 auto;
    column-gap: 1rem;
  }

  .keys  {
    text-align: right;
  }
`

interface Props {
  shortcuts: [string, string][]
}

function KeyboardShortcuts({ shortcuts }: Props) {
  return (
    <div className={styles.grid}>
      {shortcuts.map(([keys, desc]) => (
        <React.Fragment key={keys}>
          <div className={styles.keys}>
            <kbd>{keys}</kbd>
          </div>
          <div>{desc}</div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default KeyboardShortcuts
