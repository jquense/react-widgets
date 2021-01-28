const visit = require('unist-util-flatmap')
const { init, parse } = require('es-module-lexer')

const parseProps = (node) => {
  return (
    node.meta &&
    node.meta.split(' ').reduce((acc, cur) => {
      if (cur.split('=').length > 1) {
        const t = cur.split('=')
        acc[t[0]] = t[1]
        return acc
      }

      acc[cur] = true
      return acc
    }, {})
  )
}

const reg = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g

module.exports = () => async (tree, file) => {
  await init

  let addImport = false
  let chunkName = 'examples'
  if (file?.history.length)
    chunkName += `-${file.history[0].replace(file.cwd, '').replace(/\//g, '-')}`

  visit(tree, (node) => {
    if (node.type !== 'code') return [node]
    const meta = parseProps(node) || {}

    if (!meta.live) {
      return [node]
    }

    let keys = ''
    for (let [str] of node.value.matchAll(reg)) {
      const [imports] = parse(str)
      let req = str.substring(imports[0].s, imports[0].e)
      keys += `"${req}": import(/* webpackChunkName: "${chunkName}" */ '${req}'),\n`
    }

    if (!keys.length) {
      return [node]
    }

    addImport = true
    return [
      {
        type: 'jsx',
        value: `<ImportContext imports={() => allValues({\n${keys}\n})}>`,
      },
      node,
      {
        type: 'jsx',
        value: '</ImportContext>',
      },
    ]
  })

  if (addImport) {
    tree.children.unshift({
      type: 'import',
      value: 'import ImportContext, { allValues } from "@theme/ImportContext";',
    })
  }

  return tree
}
