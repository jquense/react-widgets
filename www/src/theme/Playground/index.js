import BasePlayground from '@theme-original/Playground'
import React from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

function Playground2(props) {
  return (
    <BasePlayground
      {...props}
      className={clsx(props.className, 'mb-4')}
      editorClassName={styles.editor}
      previewClassName={styles.preview}
    />
  )
}

export default Playground2
