import BasePlayground from '@theme-original/Playground'
import React from 'react'
import styles from './styles.module.css'

function Playground2(props) {
  const ref = React.useRef(null)
  const [inline, setInline] = React.useState(false)

  return (
    <BasePlayground
      inline={inline}
      {...props}
      className={props.className}
      editorClassName={styles.editor}
      previewClassName={styles.preview}
    />
  )
}

export default Playground2
