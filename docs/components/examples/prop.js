import { stripIndent } from 'common-tags';

export default function(widgetName, prop, value) {
  var props = prop;

  if (arguments.length === 3)
    props = { [prop]: value }

  return stripIndent`
    let { ${widgetName} } = ReactWidgets;

    let widget = (
      <${widgetName} ${map(props, (k, v) => `
        ${k}={${v}}`)}
      />
    )

    ReactDOM.render(widget, mountNode);
  `
}


function map(o,fn) {
  for (var key in o) if ( o.hasOwnProperty(key) )
    fn(key, o[key])
}
