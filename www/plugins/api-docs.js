module.exports = () => async (tree) => {
  const specifiers = tree.children
    .filter((n) => n.type === 'import' && n.value.includes('@react-metadata'))
    .map((n) => {
      const [, g] = n.value.match(
        /import\s+(\w+)\s+from\s+['"]@react-metadata\/.+['"]/,
      )
      return g
    })

  if (specifiers.length) {
    tree.children.push({
      type: 'jsx',
      value: `
          <>
            {(()=> {
              const api = toc?.find(t => t.id === 'api')
              if (!api) return
              api.children = ${specifiers[0]}.props.sort((a,b) => a.name > b.name ? 1 : -1).map((p) => ({
                id: p.name,
                value: p.name,
                children: []
              }))
            })()}
          </>
        `,
    })
  }

  return tree
}
