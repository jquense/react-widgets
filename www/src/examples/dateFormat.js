import { stripIndent } from 'common-tags';

export default function(widgetName, prop, format, value, props) {
  return stripIndent`
    let { ${widgetName} } = ReactWidgets;

    let formatter = Globalize.dateFormatter(${format})

    let widget = (
      <${widgetName}
        ${prop}={${value || 'formatter'}} ${map(props, (k, v) => `
        ${k}=${wrap(v)}`)}
      />
    )

    ReactDOM.render(widget, mountNode);
  `
}

let wrap = v => v[0] === "'" || v[0] === '"' ? `${v}` : `{${v}}`

function map(o, fn) {
  if (!o) return ''
  return Object.keys(o).map(key => fn(key, o[key])).join('')
}
