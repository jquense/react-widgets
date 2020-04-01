const { types, descriptions } = require('../doc-defaults')
const {
  cleanTags,
} = require('@docpocalypse/gatsby-theme-core/plugins/react-docgen/doclets')

function setDefaults(desc, name, widgetName) {
  let type = desc.type
  let typeName = type && type.raw && type.raw.replace('CustomPropTypes.', '')

  if (type && type.name === 'shape' && type.value) {
    Object.keys(type.value).forEach(key => {
      type.value[key] = setDefaults(
        { type: type.value[key] },
        key,
        widgetName,
      ).type
    })
  }

  if (types[typeName]) {
    desc.type = Object.assign({}, type, types[typeName])
  }

  if (descriptions[name]) {
    let dft = descriptions[name]
    if (!cleanTags(desc.description)) {
      desc.description =
        dft({ name: widgetName }) + '\n' + desc.description || ''
    }
  }

  return desc
}

function buildExample(prop, name, widgetName) {
  let exampleTag = prop.tags.find(t => t.name === 'example')
  let exampleName = exampleTag
  let args = []

  if (typeof exampleTag === 'string') exampleTag = eval(exampleTag)

  if (Array.isArray(exampleTag)) {
    ;[exampleName, args] = exampleTag
  }

  if (exampleName === false) return null
  if (!exampleName) exampleName = name

  let example
  try {
    example = require(`./prop-examples/${exampleName}`)
  } catch (err) {
    return null
  }

  args = args == null ? [] : [].concat(args)

  prop.description +=
    '\n\n```jsx live\n' + example(widgetName, ...args) + '\n```'

  // console.log('H:', prop.description)
}

module.exports = function defaultDescriptionsHandler(docs) {
  let widgetName = docs.get('displayName')

  docs._props.forEach((_, name) => {
    let desc = docs.getPropDescriptor(name)

    setDefaults(desc, name, widgetName)
    buildExample(desc, name, widgetName)
  })
}
