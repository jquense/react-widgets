const { stripIndent } = require('common-tags')

module.exports = function(widgetName, prop, format, value, props) {
  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let formatter = Globalize.dateFormatter(${format})


    <${widgetName}
      ${prop}={${value || 'formatter'}} ${map(
    props,
    (k, v) => `
      ${k}=${wrap(v)}`,
  )}
    />
  `
}

let wrap = v => (v[0] === "'" || v[0] === '"' ? `${v}` : `{${v}}`)

function map(o, fn) {
  if (!o) return ''
  return Object.keys(o)
    .map(key => fn(key, o[key]))
    .join('')
}
