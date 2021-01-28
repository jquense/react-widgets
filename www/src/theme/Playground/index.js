import BasePlayground from '@theme-original/Playground'
import React from 'react'
import { Context } from '../ImportContext'
import styles from './styles.module.css'

function Playground(props) {
  const ref = React.useRef(null)
  const [inline, setInline] = React.useState(false)
  const resolveImports = React.useContext(Context)

  React.useLayoutEffect(() => {
    let observer = new ResizeObserver(([entry]) => {
      const box = entry.contentRect
      const hasSpace = box.width > 900

      setInline(hasSpace)
    })

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <BasePlayground
      ref={ref}
      inline={inline}
      showImports={false}
      resolveImports={resolveImports}
      {...props}
      className={props.className}
      editorClassName={styles.editor}
      previewClassName={styles.preview}
    />
  )
}

export default Playground
