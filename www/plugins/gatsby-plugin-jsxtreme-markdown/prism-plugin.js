const visit = require(`unist-util-visit`)
const prism = require(`./prism`)

module.exports = () => tree => {
  visit(tree, `code`, node => {
    let language = node.lang
    let languageName = `text`
    if (language) languageName = language.toLowerCase()

    node.type = `html`
    node.value = `<code class="language-${languageName}">${prism(
      node.value,
      language
    )}</code>`
  })

  // visit(tree, `inlineCode`, node => {
  //   let languageName = `text`

  //   const className = `${classPrefix}${languageName}`

  //   node.type = `html`
  //   node.value = `<code class="${className}">${prism(
  //     node.value,
  //     languageName
  //   )}</code>`
  // })
}
