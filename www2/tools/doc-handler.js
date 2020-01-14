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

module.exports = function defaultDescriptionsHandler(docs) {
  let widgetName = docs.get('displayName')

  docs._props.forEach((_, name) => {
    let desc = docs.getPropDescriptor(name)

    setDefaults(desc, name, widgetName)
  })
}
