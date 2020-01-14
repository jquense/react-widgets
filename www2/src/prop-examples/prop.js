import { stripIndent } from 'common-tags'

export default function(widgetName, prop, value) {
  var props = prop

  if (arguments.length === 3) props = { [prop]: value }

  return stripIndent`
    import { ${widgetName} } from 'react-widgets';

    let widget = (
      <${widgetName} ${map(
    props,
    (k, v) => `
        ${k}=${wrap(v)}`
  )}
      />
    )

    render(widget);
  `
}

let wrap = v => (v[0] === "'" || v[0] === '"' ? `${v}` : `{${v}}`)

function map(o, fn) {
  return Object.keys(o)
    .map(key => fn(key, o[key]))
    .join('')
}
