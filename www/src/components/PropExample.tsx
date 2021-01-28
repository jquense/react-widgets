import PropTypes from 'prop-types'
import React from 'react'
import Playground from '@theme/Playground'
import generateData from '../generate-data'

const examples = require.context('../examples', false)
// const keys = examples.keys()

const scope = {
  listOfPeople: () => generateData(15),
}

const propTypes = {
  prop: PropTypes.object.isRequired,
  displayName: PropTypes.string.isRequired,
}

const resolver = () =>
  import('react-widgets').then((rw) => ({ 'react-widgets': rw }))

function PropExample({ prop, displayName }: any) {
  let example = prop.tags.find((t) => t.name === 'example')
  let exampleName = example
  let args

  if (typeof example === 'string') example = eval(example)

  if (Array.isArray(example)) {
    ;[exampleName, args] = example
  }

  if (exampleName === false) return null
  if (!exampleName) exampleName = prop.name
  if (!keys.includes(`./${exampleName}`)) return null

  args = args == null ? [] : [].concat(args)

  return (
    <Playground
      showImports
      language="jsx"
      scope={scope}
      resolveImports={resolver}
      code={examples(`./${exampleName}`).default(displayName, ...args) || ''}
    />
  )
}

PropExample.propTypes = propTypes

export default PropExample
